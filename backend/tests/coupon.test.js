const request = require('supertest');
const app = require('../server');
const db = require('../database');

const dbGet = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row))),
  );
const dbRun = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.run(sql, params, function (err) {
      err ? reject(err) : resolve(this);
    }),
  );

const applyCoupon = (body) => request(app).post('/api/apply-coupon').send(body);

// database.js DROP + seed lại mỗi lần được require, nên chờ seed xong trước khi test.
beforeAll(async () => {
  for (let i = 0; i < 50; i++) {
    try {
      const row = await dbGet("SELECT COUNT(*) AS c FROM coupons WHERE code = 'SAVE10'");
      if (row && row.c === 1) return;
    } catch (e) {
      /* bảng chưa được tạo, thử lại */
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('Seed data chưa sẵn sàng sau 5s');
});

describe('POST /api/apply-coupon — Data-Driven (test.each)', () => {
  // ------------------------------------------------------------------
  // 1. Coupon hợp lệ: kiểm tra discount_amount và final_amount
  // ------------------------------------------------------------------
  describe('Coupon hợp lệ (C1, C2, C3 đều thỏa)', () => {
    test.each([
      { code: 'SAVE10', total: 1000000, discount: 100000, final: 900000, note: 'percent 10%, đơn 1,000,000 [BUG FM2]' },
      { code: 'SAVE10', total: 500000, discount: 50000, final: 450000, note: 'percent 10%, đơn 500,000 [BUG FM2]' },
      { code: 'SAVE10', total: 300000, discount: 30000, final: 270000, note: 'percent, ĐÚNG ngưỡng tối thiểu [BUG biên >=]' },
      { code: 'BIGBUY', total: 600000, discount: 50000, final: 550000, note: 'fixed 50,000, đơn 600,000' },
      { code: 'BIGBUY', total: 500000, discount: 50000, final: 450000, note: 'fixed, ĐÚNG ngưỡng tối thiểu [BUG biên >=]' },
      { code: 'VIP100', total: 400000, discount: 100000, final: 300000, note: 'fixed 100,000, đơn 400,000' },
      { code: 'VIP100', total: 300000, discount: 100000, final: 200000, note: 'fixed, ĐÚNG ngưỡng tối thiểu [BUG biên >=]' },
    ])('$code với đơn $total → giảm $discount, còn $final ($note)', async ({ code, total, discount, final }) => {
      const res = await applyCoupon({ code, total_amount: total });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.discount_amount).toBe(discount);
      expect(res.body.final_amount).toBe(final);
    });
  });

  // ------------------------------------------------------------------
  // 2. Coupon hết hạn (C2)
  // ------------------------------------------------------------------
  describe('Coupon hết hạn (C2)', () => {
    test.each([
      { code: 'EXPIRED', total: 200000 },
      { code: 'EXPIRED', total: 5000000 },
    ])('$code với đơn $total → 400 "hết hạn"', async ({ code, total }) => {
      const res = await applyCoupon({ code, total_amount: total });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/hết hạn/);
    });
  });

  // ------------------------------------------------------------------
  // 3. Đơn hàng chưa đủ giá trị tối thiểu (C3)
  // ------------------------------------------------------------------
  describe('Đơn chưa đủ ngưỡng tối thiểu (C3)', () => {
    test.each([
      { code: 'SAVE10', total: 299999, min: 300000 },
      { code: 'SAVE10', total: 0, min: 300000 },
      { code: 'BIGBUY', total: 499999, min: 500000 },
      { code: 'VIP100', total: 100000, min: 300000 },
    ])('$code với đơn $total (< $min) → 400 "chưa đủ giá trị tối thiểu"', async ({ code, total }) => {
      const res = await applyCoupon({ code, total_amount: total });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/chưa đủ giá trị tối thiểu/);
    });
  });

  // ------------------------------------------------------------------
  // 4. Đầu vào không hợp lệ (C1)
  // ------------------------------------------------------------------
  describe('Mã không hợp lệ (C1)', () => {
    test.each([
      { name: 'thiếu trường code', body: { total_amount: 500000 }, status: 400, msg: /Vui lòng nhập mã giảm giá/ },
      { name: 'code rỗng', body: { code: '', total_amount: 500000 }, status: 400, msg: /Vui lòng nhập mã giảm giá/ },
      { name: 'code không tồn tại', body: { code: 'NOPE', total_amount: 500000 }, status: 404, msg: /không tồn tại/ },
      { name: 'sai chữ hoa/thường (save10)', body: { code: 'save10', total_amount: 500000 }, status: 404, msg: /không tồn tại/ },
    ])('$name → $status', async ({ body, status, msg }) => {
      const res = await applyCoupon(body);

      expect(res.status).toBe(status);
      expect(res.body.error).toMatch(msg);
    });

    it('code có is_active = 0 → 404 (bị vô hiệu hóa)', async () => {
      await dbRun(
        "INSERT INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active) VALUES ('INACTIVE1', 'fixed', 10000, 0, '2099-12-31', 0)",
      );
      try {
        const res = await applyCoupon({ code: 'INACTIVE1', total_amount: 500000 });
        expect(res.status).toBe(404);
      } finally {
        await dbRun("DELETE FROM coupons WHERE code = 'INACTIVE1'");
      }
    });
  });
});

// ======================================================================
// FAILURE MODE 2 — Tái hiện lỗi công thức percent (coupon-discount.js)
//
//   discount_amount = Math.floor(total_amount * (1 - coupon.discount_value));
//
// SAVE10 có discount_value = 10 nên (1 - 10) = -9:
//   total = 1,000,000 → discount_amount = -9,000,000, final_amount = 10,000,000 (SAI)
//   Đúng theo FR-09:    discount_amount =    100,000, final_amount =    900,000
//
// Cả hai nhánh API dùng chung hàm tính discount, nên test cả 2 nhánh.
// Các test dưới đây kiểm tra BẤT BIẾN (invariant) thay vì một con số cụ thể:
//   0 <= discount_amount <= total  và  0 <= final_amount <= total
// ======================================================================
describe('Failure Mode 2 — discount_amount âm với coupon percent', () => {
  const total = 1000000;

  test.each([
    { branch: 'không có user_id', body: { code: 'SAVE10', total_amount: total } },
    { branch: 'có user_id', body: { code: 'SAVE10', total_amount: total, user_id: 2 } },
  ])('SAVE10 — nhánh $branch: discount_amount không được âm', async ({ body }) => {
    const res = await applyCoupon(body);

    expect(res.status).toBe(200);
    expect(res.body.discount_amount).toBeGreaterThanOrEqual(0);
    expect(res.body.discount_amount).toBeLessThanOrEqual(total);
    expect(res.body.final_amount).toBeGreaterThanOrEqual(0);
    expect(res.body.final_amount).toBeLessThanOrEqual(total);
  });

  it('SAVE10 — final_amount phải nhỏ hơn tổng đơn (coupon phải làm GIẢM giá)', async () => {
    const res = await applyCoupon({ code: 'SAVE10', total_amount: total });

    expect(res.status).toBe(200);
    expect(res.body.final_amount).toBeLessThan(total);
  });
});
