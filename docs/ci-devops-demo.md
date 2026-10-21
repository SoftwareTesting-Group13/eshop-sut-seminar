# EShop CI demo cho môn DevOps

## Flow đang triển khai

```text
Push bất kỳ branch / Pull Request vào main
  └─ Gitleaks: quét secret trong Git history → eshop-gitleaks
       ├─ Có secret: dừng; Test/Quality Gate/Build đều skip
       └─ Sạch: 2 unit test coupon → Jest + coverage + log → eshop-coverage
            ├─ Quality Gate: 2/2 test pass + coupon line coverage > 70% + LCOV
            │    └─ Xanh → Build → eshop-build
            └─ PR có Test đỏ: AI đọc log → comment trên PR + eshop-ai-triage
               (nếu có key; push thông thường không chạy AI)

Pipeline Summary luôn chạy và xuất eshop-ci-audit.
```

Build tạo artifact để bàn giao. Repo chưa có môi trường triển khai, nên flow này
là **CI + build**, chưa tự động deploy. Gitleaks chỉ phát hiện secret/token bị
lộ trong Git, không phải công cụ quét toàn bộ lỗ hổng ứng dụng hay dependency.
Coverage trong CI demo chỉ đo `backend/coupon-discount.js`, **không đại diện cho
độ phủ toàn bộ backend**. Lệnh `npm run test:ci` vẫn chạy full suite khi nhóm
muốn kiểm tra rộng hơn; workflow dùng `npm run test:ci:demo`.
Khi Gitleaks fail, không có test result mới; `eshop-ci-audit` ghi Gitleaks
`failure` và các job sau `skipped`.

## Cấu hình GitHub trước demo

1. Push workflow lên branch demo. Actions chạy trên mỗi `push`, kể cả branch có
   dấu `/`; PR vào `main` hoặc `master` cũng được kiểm tra.
2. Nếu muốn AI phân tích thật, thêm `GEMINI_API_KEY` vào **Settings → Secrets
   and variables → Actions → Repository secrets**. Job CI dùng cố định model
   `gemini-3.5-flash-lite`; không cần tạo `GEMINI_MODEL`. Không commit API key.
3. Sau khi tên check mới xuất hiện trong Actions, cập nhật Branch Protection
   trên `main` để yêu cầu ba check: `Quality Gate (Tests & Coverage > 70%)`,
   `Gitleaks Secret Scan`, `Build (web, admin, backend package)`.
   Script `.github/scripts/configure-branch-protection.sh --dry-run` cho xem
   payload; việc áp dụng cần quyền admin repo.

## Kịch bản baseline xanh → branch demo đỏ → sửa xanh

1. Merge PR #7 với công thức coupon **đúng** vào `main` sau khi CI xanh. Đây là
   baseline: 2/2 unit test pass, line coverage coupon 100%, Build có artifact.
2. Tạo branch demo **mới từ `main` đã merge**. Cố ý đổi công thức percent trong
   `backend/coupon-discount.js` thành `Math.floor(totalAmount * (1 - coupon.discount_value))`.
   Không sửa test; commit và push branch này, rồi mở PR vào `main`.
3. Trên PR demo, CI chạy đúng 2 unit test: percent 10% của 1.000.000 phải giảm
   100.000 (**fail**, nhận -9.000.000) và fixed 50.000 (**pass**). Coupon module
   vẫn đạt 100% line coverage nhưng Quality Gate đỏ vì **1/2 test fail**; Build
   skip. AI chỉ ở run PR, comment gợi ý trên PR và lưu artifact `eshop-ai-triage`.
4. Đọc comment AI và log Jest, xác minh trên source rồi sửa công thức về
   `Math.floor(totalAmount * coupon.discount_value / 100)`. Commit và push
   tiếp trên branch demo.
5. Run PR mới dự kiến 2/2 pass, coupon line coverage 100%, Gitleaks sạch,
   Build xanh và artifact `eshop-build` xuất hiện. Đối chiếu hai `run_id` và
   commit trong `eshop-ci-audit`.

Các số đỏ/xanh ở bước 3–5 đã được kiểm tra local. PR run #18 cũ dùng full suite
(30/39, 78.16%), không phải run của kịch bản 2-test. Cần xác nhận CI xanh của
baseline trên GitHub trước khi merge và chạy demo branch mới.

## Chạy local

```bash
cd backend
npm ci
set -o pipefail
npm run test:ci:demo 2>&1 | tee coverage/jest-console.log
cd ..
node .github/scripts/quality-gate.js
gitleaks git --redact=100 .
```

Full suite (`npm run test:ci`) dùng SQLite `:memory:` ở `NODE_ENV=test`, tránh
xóa dữ liệu trong `backend/database.sqlite` khi kiểm thử. Demo 2 unit test
coupon không truy cập SQLite. Nếu chưa có Gemini key, có thể xem
đầu vào mà script sẽ gửi bằng:

```bash
python3 .github/scripts/ai_triage.py \
  --log-file backend/coverage/jest-console.log --dry-run
```

Không đưa log chứa secret lên artifact hoặc gửi cho AI. Khi phát hiện secret,
thu hồi/đổi key và xử lý lịch sử Git; báo cáo Gitleaks luôn bật `--redact=100`.
