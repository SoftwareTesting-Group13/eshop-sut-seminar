# KẾ HOẠCH DEMO CHI TIẾT — T07: CI/CD & TEST HARNESS ENGINEERING
**Mục đích:** Tài liệu nội bộ — Cơ sở để soạn `User_Guide.md` và chuẩn bị Live Demo tại buổi báo cáo.
**SUT:** EShop Backend (Node.js / Express / SQLite3 file-based)

> Đây là tài liệu kỹ thuật chi tiết. Nội dung tóm tắt được trình bày trong `Proposal.md` (Mục 3/4/5).
> Các kịch bản ở đây chưa phải kết quả cuối cùng — sẽ được cập nhật sau Phase 2 (thực nghiệm thực tế).

---

## 1. GITHUB ACTIONS — PIPELINE CI/CD

### 1.1. Thuật ngữ cốt lõi cần giải thích trong Demo
- **Workflow:** File YAML trong `.github/workflows/`, định nghĩa toàn bộ pipeline.
- **Event & Triggers:** Sự kiện kích hoạt (`push`, `pull_request` → nhánh `main`).
- **Runner:** Máy ảo Ubuntu sạch do GitHub khởi tạo cho mỗi lần chạy.
- **Fail-Fast:** Ngắt pipeline ngay khi có ca Unit Test đầu tiên thất bại.
- **Test Coverage Gate:** Chặn merge nếu line coverage module coupon ≤ 70% trong CI demo.
- **PR Annotations:** Gắn cờ trực tiếp dòng code lỗi trên giao diện Pull Request.
- **Branch Protection Rules (Required Status Checks):** Cơ chế bảo vệ nhánh chính (`main`), bắt buộc toàn bộ Unit Test và rào chắn Coverage phải PASS thì nút Merge Pull Request trên GitHub UI mới được mở khóa.

### 1.2. Sơ đồ luồng pipeline
```
[Lập trình viên tạo / cập nhật Pull Request]
                    │
                    ▼
[GitHub Actions Engine khởi tạo Runner Ubuntu sạch]
                    │
                    ├─ Bước 1: actions/checkout
                    ├─ Bước 2: actions/setup-node & actions/cache (Node.js 20 + cache)
                    ├─ Bước 3: npm run lint
                    ├─ Bước 4: npm test -- --coverage
                    │          ├─ Jest thực thi test suite trên database.sqlite
                    │          ├─ Thu thập LCOV Coverage Report
                    │          └─ Xuất JUnit XML Report
                    ├─ Bước 5: Quality Gate Check
                    │          ├─ 100% Unit Tests Passed? (Exit Code 0)
                    │          └─ Coupon line coverage > 70%?
                    │               ├─ ĐẠT: Status check "Xanh" → cho phép merge
                    │               └─ KHÔNG ĐẠT: Exit Code 1, Fail-Fast, chặn merge
                    ├─ Bước 6: Upload Artifacts (LCOV HTML, JUnit XML)
                    └─ Bước 7: [Nếu fail] Kích hoạt AI Log Triage script
```

### 1.3. File workflow mẫu (`eshop-ci.yml`)
```yaml
name: EShop CI Pipeline

on:
  push:
    branches: [main]
    paths: ['backend/**']
  pull_request:
    branches: [main]
    paths: ['backend/**']

defaults:
  run:
    working-directory: ./backend

jobs:
  unit-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run Unit Tests with Coverage
        run: npm test -- --ci --coverage --reporters=default --reporters=jest-junit

      - name: Upload Coverage Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report-node-${{ matrix.node-version }}
          path: backend/coverage/

      - name: AI Log Triage (on failure)
        if: failure()
        env:
          LLM_API_KEY: ${{ secrets.LLM_API_KEY }}
        run: python3 ../.github/scripts/ai_triage.py
```

### 1.4. Kịch bản Demo (3 kịch bản)

**Demo 1 — Setup Pipeline CI/CD & Cache Optimization:**
- Khởi tạo `.github/workflows/eshop-ci.yml` từ đầu.
- Demo cache hit vs miss: lần đầu install ~60s → lần sau ~5s.
- Minh chứng pipeline trigger khi push vào backend.

**Demo 2 — Unit Test Failure chặn merge (Quality Gate & Branch Protection qua PR):**
- Lập trình viên mở Pull Request trên nhánh tính năng chứa commit lỗi nghiệp vụ coupon percent (`discount_amount` âm).
- GitHub Actions tự động kích hoạt trên PR → Jest Unit Test fail (Exit Code 1) → Kích hoạt cơ chế Fail-Fast.
- Nút "Merge Pull Request" trên giao diện GitHub UI bị **KHÓA CỨNG (Blocked)** do vi phạm Branch Protection Rules.
- Bước AI Log Triage can thiệp: hiển thị Cây giả thuyết (Hypothesis Tree) tóm tắt lỗi trực tiếp trên GitHub Step Summary.
- Sửa mã nguồn coupon → push commit mới lên PR → CI chạy lại pass 100% → Nút Merge được mở khóa màu xanh (Allowed).

**Demo 3 — Matrix Testing & Branch Protection:**
- Chạy song song trên Node 18 và Node 20.
- Cấu hình Branch Protection Rules: yêu cầu status check pass.
- Demo force push bị chặn khi chưa qua CI.

---

## 2. JEST — UNIT TEST ENGINE

### 2.1. Thực trạng kỹ thuật EShop (đã phân tích code)

QUAN TRỌNG — Phát hiện thực tế:
`database.js` của EShop dùng SQLite file-based (`database.sqlite`), KHÔNG phải `:memory:`.
Hàm `initDatabase()` drop và tạo lại toàn bộ bảng mỗi lần gọi — không có cơ chế cô lập test worker.
→ Nếu nhiều test worker cùng chạy, sẽ gây SQLITE_BUSY (File Lock Conflict).
→ Đây là Failure Mode thực tế của nhóm để demo.

### 2.2. Lỗi logic nghiệp vụ thực tế (đã xác nhận qua phân tích code)
Phân tích `server.js` (dòng 398–401):
```js
// CODE HIỆN TẠI (SAI):
discount_amount = Math.floor(total_amount * (1 - coupon.discount_value));
// Với SAVE10: discount_value = 10 (integer)
// → total_amount * (1 - 10) = total_amount * (-9) → số âm!

// CODE ĐÚNG:
discount_amount = Math.floor(total_amount * coupon.discount_value / 100);
```

### 2.3. Kịch bản Demo (3 kịch bản)

**Demo 1 — Cấu hình Jest & Test Isolation:**
- Cài `jest`, `supertest` vào `backend/package.json`.
- Cấu hình Jest chạy `--runInBand` (tuần tự) để tránh SQLITE_BUSY.
- Thiết lập `beforeAll` / `afterAll` trong mỗi test suite.

**Demo 2 — Data-Driven Testing phát hiện lỗi coupon:**
```javascript
// tests/coupon.test.js
const request = require('supertest');
const app = require('../server');

test.each([
  { code: 'SAVE10', total_amount: 1000000, expectedDiscount: 100000, desc: '10% off hop le' },
  { code: 'BIGBUY', total_amount: 600000, expectedDiscount: 50000, desc: 'Fixed 50k off' },
  { code: 'EXPIRED', total_amount: 500000, expectedStatus: 400, desc: 'Coupon het han' },
])('Coupon test: $desc', async ({ code, total_amount, expectedDiscount, expectedStatus }) => {
  const res = await request(app)
    .post('/api/apply-coupon')
    .send({ code, total_amount });
  if (expectedStatus) {
    expect(res.status).toBe(expectedStatus);
  } else {
    expect(res.status).toBe(200);
    expect(res.body.discount_amount).toBe(expectedDiscount); // Se FAIL voi code hien tai
  }
});
```
→ Minh chứng pipeline phát hiện lỗi logic nghiệp vụ thực tế.

**Demo 3 — Flaky Test (SQLITE_BUSY):**
- Bỏ `--runInBand`, Jest chạy song song (mặc định).
- Nhiều test file cùng gọi DB → SQLITE_BUSY error.
- Fix: thêm `--runInBand` hoặc `maxWorkers: 1` trong jest.config.

### 2.4. Checkpoints mẫu
```javascript
// Checkpoint API:
expect(res.status).toBe(200);
expect(res.body.discount_amount).toBe(100000);

// Checkpoint Database:
const couponUsage = await db.get(
  'SELECT * FROM coupon_usage WHERE coupon_id = ?', [couponId]
);
expect(couponUsage).toBeDefined();

// Checkpoint Order:
const order = await db.get('SELECT * FROM orders WHERE user_id = ?', [userId]);
expect(order.status).toBe('pending');
```

---

## 3. AI LOG TRIAGE — SCRIPT ĐƠN GIẢN HOÁ

### 3.1. Thiết kế đơn giản hoá
Không dùng Composite GitHub Action riêng biệt.
Thay vào đó: một Python script nhỏ đặt trong `.github/scripts/ai_triage.py`, gọi trực tiếp từ workflow khi step thất bại.

### 3.2. Script AI Triage mẫu
```python
# .github/scripts/ai_triage.py
import os, sys, json, urllib.request

API_KEY = os.environ.get('LLM_API_KEY', '')

# Doc log tu stdin (duoc pipe tu GitHub Actions)
log_lines = sys.stdin.read() if not sys.stdin.isatty() else ''
relevant_log = '\n'.join(log_lines.splitlines()[-100:])  # Chi lay 100 dong cuoi

prompt = f"""You are a software testing expert. Analyze this CI test failure log and:
1. Identify the root cause in 1-2 sentences
2. List 3 possible fixes ranked by likelihood
3. Point to the specific file and line if visible

LOG:
{relevant_log}"""

payload = json.dumps({
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": prompt}],
    "max_tokens": 500
}).encode()

req = urllib.request.Request(
    'https://api.openai.com/v1/chat/completions',
    data=payload,
    headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'}
)
with urllib.request.urlopen(req) as resp:
    result = json.loads(resp.read())
    analysis = result['choices'][0]['message']['content']

summary_file = os.environ.get('GITHUB_STEP_SUMMARY', '')
if summary_file:
    with open(summary_file, 'a') as f:
        f.write(f"\n## AI Log Triage Analysis\n\n{analysis}\n")
else:
    print(analysis)
```

### 3.3. Kịch bản Demo (3 kịch bản)

**Demo 1 — Tích hợp `if: failure()` trong workflow:**
- Thêm step `ai_triage.py` với điều kiện `if: failure()`.
- Config `LLM_API_KEY` trong GitHub Secrets (dùng OpenAI gpt-4o-mini hoặc Gemini API).
- Minh chứng script không chạy khi pipeline xanh.

**Demo 2 — AI tóm tắt lỗi Unit Test logic:**
- Trigger lỗi coupon → pipeline fail với log dài.
- AI xuất kết quả trong GitHub Step Summary.
- So sánh: đọc log thủ công (2 phút) vs AI triage (15 giây).

**Demo 3 — AI chẩn đoán Flaky Test (SQLITE_BUSY):**
- Trigger SQLITE_BUSY Flaky Test → log mơ hồ.
- AI gợi ý `--runInBand` / `maxWorkers: 1`.
- Đánh giá: AI đúng nhưng kỹ sư cần xác nhận ngữ cảnh (hallucination risk).

---

## 4. LƯU Ý CHUNG KHI THỰC HIỆN DEMO LIVE

1. **Chuẩn bị 2 nhánh:** `demo/pass` (test xanh) và `demo/fail` (test đỏ) — không làm trực tiếp trên `main`.
2. **API Key:** Chuẩn bị trong GitHub Secrets trước. Có thể dùng Gemini API miễn phí.
3. **Thời gian runner:** Lần đầu không cache ~2 phút, sau cache ~30 giây.
4. **Fallback:** Nếu GitHub Actions chậm → chuẩn bị sẵn video recording backup.
5. **Thứ tự demo:** GitHub Actions trước (pipeline tổng thể) → Jest (test failures) → AI Triage (phân tích log).
