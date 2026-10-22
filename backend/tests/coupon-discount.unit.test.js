const {
  calculateDiscount,
  validateCoupon,
  buildCouponResult,
} = require('../coupon-discount');

const percentCoupon = {
  id: 1,
  type: 'percent',
  discount_value: 10,
  min_order_amount: 300_000,
  expired_at: '2099-12-31',
  is_active: 1,
  max_uses_per_user: 1,
};
const fixedCoupon = {
  ...percentCoupon,
  id: 2,
  type: 'fixed',
  discount_value: 50_000,
  min_order_amount: 500_000,
};
const now = new Date('2026-01-01T00:00:00Z');

describe('calculateDiscount', () => {
  test.each([
    { name: 'percent 10% of 1,000,000', total: 1_000_000, type: 'percent', value: 10, expected: 100_000 },
    { name: 'percent 10% of 500,000', total: 500_000, type: 'percent', value: 10, expected: 50_000 },
    { name: 'percent 25% of 600,000', total: 600_000, type: 'percent', value: 25, expected: 150_000 },
    { name: 'fixed 50,000 off 600,000', total: 600_000, type: 'fixed', value: 50_000, expected: 50_000 },
    { name: 'fixed 100,000 off 400,000', total: 400_000, type: 'fixed', value: 100_000, expected: 100_000 },
  ])('$name → $expected', ({ total, type, value, expected }) => {
    expect(calculateDiscount(total, { type, discount_value: value })).toBe(expected);
  });

  it('rounds a fractional percent discount down to whole đồng', () => {
    expect(calculateDiscount(301_001, { type: 'percent', discount_value: 10 }))
      .toBe(30_100);
  });
});

describe('validateCoupon', () => {
  test.each([undefined, '', null])('rejects missing code %p', (code) => {
    expect(validateCoupon({ code })).toEqual({
      status: 400,
      error: 'Vui lòng nhập mã giảm giá',
    });
  });

  test.each([
    { name: 'unknown', coupon: null },
    { name: 'inactive', coupon: { ...percentCoupon, is_active: 0 } },
  ])('rejects $name coupon', ({ coupon }) => {
    expect(validateCoupon({ code: 'SAVE10', totalAmount: 500_000, coupon, now }))
      .toMatchObject({ status: 404, error: expect.stringMatching(/không tồn tại|vô hiệu hóa/) });
  });

  test.each([
    { name: 'one đồng below the minimum', totalAmount: 299_999 },
    { name: 'missing total', totalAmount: undefined },
    { name: 'non-numeric total', totalAmount: 'abc' },
  ])('rejects $name', ({ totalAmount }) => {
    expect(validateCoupon({ code: 'SAVE10', totalAmount, coupon: percentCoupon, now }))
      .toMatchObject({ status: 400, error: expect.stringMatching(/chưa đủ giá trị tối thiểu/) });
  });

  it('accepts an order exactly at the minimum', () => {
    expect(validateCoupon({ code: 'SAVE10', totalAmount: 300_000, coupon: percentCoupon, now }))
      .toBeNull();
  });

  it('rejects an expired coupon', () => {
    expect(validateCoupon({
      code: 'SAVE10', totalAmount: 500_000,
      coupon: { ...percentCoupon, expired_at: '2020-01-01' }, now,
    })).toEqual({ status: 400, error: 'Mã giảm giá đã hết hạn' });
  });

  it('accepts a coupon with a future expiry', () => {
    expect(validateCoupon({ code: 'SAVE10', totalAmount: 500_000, coupon: percentCoupon, now }))
      .toBeNull();
  });
});

describe('buildCouponResult', () => {
  it('returns discount and final amount for a percent coupon', () => {
    expect(buildCouponResult({ totalAmount: 1_000_000, coupon: percentCoupon, userId: 2, usageCount: 0 }))
      .toEqual({
        status: 200,
        body: {
          success: true,
          coupon_id: 1,
          discount_amount: 100_000,
          final_amount: 900_000,
          message: 'Áp dụng thành công! Giảm 10%',
        },
      });
  });

  it('returns discount and final amount for a fixed coupon', () => {
    expect(buildCouponResult({ totalAmount: 600_000, coupon: fixedCoupon, userId: 2, usageCount: 0 }))
      .toMatchObject({ status: 200, body: { discount_amount: 50_000, final_amount: 550_000 } });
  });

  test.each([
    { name: 'at the limit', usageCount: 1 },
    { name: 'over the limit', usageCount: 2 },
  ])('rejects a user $name', ({ usageCount }) => {
    expect(buildCouponResult({ totalAmount: 500_000, coupon: percentCoupon, userId: 2, usageCount }))
      .toMatchObject({ status: 400, body: { error: expect.stringMatching(/đã đạt giới hạn/) } });
  });

  it('allows a user below a two-use limit', () => {
    expect(buildCouponResult({
      totalAmount: 600_000,
      coupon: { ...fixedCoupon, max_uses_per_user: 2 },
      userId: 2,
      usageCount: 1,
    }).status).toBe(200);
  });

  it('uses the existing no-user path without a usage count', () => {
    expect(buildCouponResult({ totalAmount: 500_000, coupon: percentCoupon }).status)
      .toBe(200);
  });
});
