# EShop CI demo cho môn DevOps

## Flow đang triển khai

```text
Push bất kỳ branch / Pull Request vào main
  └─ Gitleaks: quét secret trong Git history → eshop-gitleaks
       ├─ Có secret: dừng; Test/Quality Gate/Build đều skip
       └─ Sạch: Test → Jest + coverage + log → eshop-coverage
            ├─ Quality Gate: 100% test pass + line coverage > 70% + LCOV
            │    └─ Xanh → Build → eshop-build
            └─ Nếu Test đỏ: AI triage đọc log → eshop-ai-triage (nếu có key)

Pipeline Summary luôn chạy và xuất eshop-ci-audit.
```

Build tạo artifact để bàn giao. Repo chưa có môi trường triển khai, nên flow này
là **CI + build**, chưa tự động deploy. Gitleaks chỉ phát hiện secret/token bị
lộ trong Git, không phải công cụ quét toàn bộ lỗ hổng ứng dụng hay dependency.
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

## Kịch bản đỏ → xanh

1. Push branch demo đang có bug trong `backend/coupon-discount.js`. Unit test
   `backend/tests/coupon-discount.unit.test.js` và API test coupon sẽ fail.
2. Trong Actions, mở job `Backend Test`, tải artifact `eshop-coverage` để xem
   `jest-console.log`, `jest-results.json`, `lcov.info`; mở artifact
   `eshop-lcov-report` để xem `quality-gate-report.md`. Nếu Gemini đã cấu
   hình, xem `ai-triage.md` trong artifact `eshop-ai-triage`.
3. Chỉ ra rằng line coverage đã **78.16% > 70%** nhưng Quality Gate vẫn đỏ vì
   9 test fail. Build bị skip, `eshop-ci-audit/ci-audit.json` ghi từng job.
4. Dev sửa duy nhất công thức percent trong `calculateDiscount`: chiết khấu
   bằng `totalAmount * coupon.discount_value / 100`, làm tròn xuống như test.
   Commit và push lại cùng branch.
5. Xem lần chạy mới: 39/39 test pass, line coverage 78.16%, Gitleaks sạch,
   Build xanh và artifact `eshop-build` xuất hiện. Hai lần chạy có `run_id`
   và `commit` khác nhau trong audit record.

Các số ở bước 3–5 là kết quả đo local trên bản hiện tại và một bản sao chỉ sửa
công thức. Kiểm tra lại trên GitHub Actions trước ngày trình bày.

## Chạy local

```bash
cd backend
npm ci
set -o pipefail
npm run test:ci 2>&1 | tee coverage/jest-console.log
cd ..
node .github/scripts/quality-gate.js
gitleaks git --redact=100 .
```

Jest dùng SQLite `:memory:` ở `NODE_ENV=test`, tránh xóa dữ liệu trong
`backend/database.sqlite` khi kiểm thử. Nếu chưa có Gemini key, có thể xem
đầu vào mà script sẽ gửi bằng:

```bash
python3 .github/scripts/ai_triage.py \
  --log-file backend/coverage/jest-console.log --dry-run
```

Không đưa log chứa secret lên artifact hoặc gửi cho AI. Khi phát hiện secret,
thu hồi/đổi key và xử lý lịch sử Git; báo cáo Gitleaks luôn bật `--redact=100`.
