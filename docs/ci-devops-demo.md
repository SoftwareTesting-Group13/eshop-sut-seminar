# EShop CI demo cho môn DevOps

## Flow đang triển khai

```text
Push bất kỳ branch / Pull Request vào main
  └─ Gitleaks: quét secret trong Git history → eshop-gitleaks
       ├─ Có secret: dừng; Test/Quality Gate/Build đều skip
       └─ Sạch: 23 unit test nghiệp vụ coupon → Jest + coverage + log → eshop-coverage
            ├─ Quality Gate: 23/23 test pass + coupon line coverage > 70% + LCOV
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

1. Review, commit và push baseline đúng trên `ncuong` trước. Actions chạy trên
   mỗi `push`, kể cả branch có dấu `/`; PR vào `main` hoặc `master` cũng được
   kiểm tra. Đợi run 23-test mới xanh rồi mới merge và tạo branch lỗi demo.
2. Nếu muốn AI phân tích thật, thêm `GEMINI_API_KEY` vào **Settings → Secrets
   and variables → Actions → Repository secrets**. Job CI dùng cố định model
   `gemini-3.5-flash-lite`; không cần tạo `GEMINI_MODEL`. Không commit API key.
3. Sau khi tên check mới xuất hiện trong Actions, cập nhật Branch Protection
   trên `main` để yêu cầu ba check: `Quality Gate (Tests & Coverage > 70%)`,
   `Gitleaks Secret Scan`, `Build (web, admin, backend package)`.
   Script `.github/scripts/configure-branch-protection.sh --dry-run` cho xem
   payload; việc áp dụng cần quyền admin repo.

## Kịch bản baseline xanh → branch demo đỏ → sửa xanh

1. Push cấu hình CI mới cùng công thức coupon **đúng** trên `ncuong`, xem run
   23/23 unit test, line coverage coupon và Build trên GitHub. Khi required
   checks thực sự xanh và hoàn tất review, merge vào `main` làm baseline.
2. Tạo branch demo **mới từ `main` đã merge**. Cố ý đổi công thức percent trong
   `backend/coupon-discount.js` thành `Math.floor(totalAmount * (1 - coupon.discount_value))`.
   Không sửa test; commit và push branch này, rồi mở PR vào `main`.
3. Trên PR demo, CI chạy 23 unit test: các ca percent **fail**
   (ví dụ 10% của 1.000.000 nhận -9.000.000 thay vì 100.000), các ca fixed
   và điều kiện áp mã vẫn **pass**. Coupon module vẫn đạt 100% line coverage
   nhưng Quality Gate đỏ vì **5/23 test fail**; Build skip. AI chỉ ở run PR,
   comment gợi ý trên PR và lưu artifact `eshop-ai-triage` nếu có key/quyền.
4. Đọc comment AI và log Jest, xác minh trên source rồi sửa công thức về
   `Math.floor(totalAmount * coupon.discount_value / 100)`. Commit và push
   tiếp trên branch demo.
5. Run PR mới dự kiến 23/23 pass, coupon line coverage 100%, Gitleaks sạch,
   Build xanh và artifact `eshop-build` xuất hiện. Đối chiếu hai `run_id` và
   commit trong `eshop-ci-audit`.

Các số đỏ/xanh ở bước 3–5 là kỳ vọng của cấu hình mới; cần đối chiếu log của
run GitHub Actions sau khi push. PR run #18 cũ dùng full suite (30/39,
78.16%), không phải run của kịch bản unit test data-driven.

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
xóa dữ liệu trong `backend/database.sqlite` khi kiểm thử. Demo 23 unit test
coupon không truy cập SQLite. Nếu chưa có Gemini key, có thể xem
đầu vào mà script sẽ gửi bằng:

```bash
python3 .github/scripts/ai_triage.py \
  --log-file backend/coverage/jest-console.log --dry-run
```

Không đưa log chứa secret lên artifact hoặc gửi cho AI. Khi phát hiện secret,
thu hồi/đổi key và xử lý lịch sử Git; báo cáo Gitleaks luôn bật `--redact=100`.
