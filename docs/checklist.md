# Checklist đối soát slide với mã nguồn SUT

**Phạm vi:** các nội dung trong deck `seminar_slide_sut_aligned.pptx` và Markdown `seminar_slide_sut_aligned.md` đã đối chiếu được trực tiếp với mã nguồn SUT.

| # | Slide | Hạng mục đã xác nhận khớp | Bằng chứng trong SUT |
|---:|---:|---|---|
| 1 | 3 | Kiến trúc dùng React/Vite cho web và admin, React Native/Expo cho mobile, backend Express/Node.js và SQLite; phạm vi seminar là coupon FR-09. | `backend/server.js`, `backend/package.json`, `frontend-web/package.json`, `frontend-admin/package.json`, `frontend-mobile/package.json` |
| 2 | 4, 7 | Jest được gọi với `--runInBand`; nội dung đã phân biệt hooks ở full suite với coupon CI unit suite. | `backend/package.json`, `backend/tests/coupons.test.js`, `backend/jest.demo.config.js` |
| 3 | 4 | Coupon CI unit test kiểm tra hàm thuần, không dùng mock; cấu hình reporter có text, LCOV và JSON. | `backend/tests/coupon-discount.unit.test.js`, `backend/jest.config.js` |
| 4 | 5, 7, 14, 15 | Workflow dùng `ubuntu-latest` và Node.js 22; chạy Gitleaks, test, Quality Gate và build; không có bước deploy. | `.github/workflows/eshop-ci.yml` |
| 5 | 5 | Quality Gate yêu cầu test pass, line coverage của `coupon-discount.js` lớn hơn 70% và có LCOV. | `.github/scripts/quality-gate.js`, `.github/workflows/eshop-ci.yml` |
| 6 | 7, 14 | Flaky demo hiện tại mô phỏng độ trễ bất đồng bộ, không phải demo SQLite_BUSY. | `backend/demos/flaky-delay.demo.js`, `backend/package.json` |
| 7 | 7, 11, 14 | AI triage được gọi khi PR có Backend Test thất bại; script dùng `GEMINI_API_KEY`, đọc tối đa 100 dòng log theo mặc định và ghi GitHub Step Summary. | `.github/workflows/eshop-ci.yml`, `.github/scripts/ai_triage.py` |
| 8 | 8, 10 | Có API coupon suite trong `backend/tests/coupon.test.js` và CI demo chọn unit suite `backend/tests/coupon-discount.unit.test.js` qua cấu hình riêng. | `backend/tests/coupon.test.js`, `backend/tests/coupon-discount.unit.test.js`, `backend/jest.demo.config.js` |
| 9 | 9 | Công thức giảm giá hiện tại chia `discount_value` cho 100 và làm tròn xuống; công thức fault injection được nêu như kịch bản trong test/comment, không phải implementation đang chạy. | `backend/coupon-discount.js`, `backend/tests/coupon.test.js` |
| 10 | 10 | API suite có 21 scenario; unit suite được CI demo chọn có 23 test. Hai con số thuộc hai suite khác nhau. | `backend/tests/coupon.test.js`, `backend/tests/coupon-discount.unit.test.js`, `backend/jest.demo.config.js` |
| 11 | 13 | Endpoint `POST /api/apply-coupon` không gắn `authenticateToken`; request có thể truyền `user_id` trong body. | `backend/server.js`, `backend/tests/coupon.test.js` |
| 12 | 13 | Cấu hình coverage xuất LCOV tại `backend/coverage/lcov.info`. | `backend/jest.config.js`, `.github/workflows/eshop-ci.yml` |

**Kết luận:** các mục trong bảng là những điểm đã xác nhận từ source SUT.
