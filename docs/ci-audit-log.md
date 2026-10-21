# CI implementation audit log

Ngày: 2026-10-21. Phạm vi: cấu hình CI và demo lỗi coupon trên branch hiện tại.

| Thay đổi | Lý do / bằng chứng |
| --- | --- |
| Push trigger cho mọi branch, giữ PR và manual dispatch | Demo được từ branch riêng, không cần sửa `main`. |
| Phase Test: Jest, coverage, console log artifact | Dev tải được test result, LCOV và log khi test đỏ. |
| Quality Gate line coverage > 70% và 100% test pass | Giữ gate cũ, áp dụng tiêu chí mới của đồ án. Statements, branches, functions vẫn được báo cáo. |
| AI triage khi test fail | Dùng lại `.github/scripts/ai_triage.py` của nhóm; chạy ở job riêng sau khi log được upload, không làm chậm Quality Gate. Chỉ gọi Gemini khi repo có secret. |
| Gitleaks CLI v8.30.1 trên Git history | Không cần license của `gitleaks-action` cho repo thuộc GitHub organization; report redacted. |
| Phase Build sau Quality Gate và Gitleaks | Build web/admin, đóng gói backend, upload artifact. |
| CI audit artifact | Ghi run ID, commit, ref, event, thời điểm và kết quả từng job. |
| SQLite in-memory trong Jest | Không xóa file database được track khi chạy test local. |
| Một defect coupon percent được giữ lại | Cho demo phát hiện lỗi, phân tích log, dev sửa một dòng và push lại. |

Điều chỉnh thứ tự: Gitleaks chạy trước. Nếu scan fail, Test/Quality Gate/Build
đều skip; Quality Gate không báo lỗi thiếu artifact giả. Nếu scan pass, Test
chạy rồi tách nhánh Quality Gate và AI Triage khi có lỗi. Build chỉ chạy sau
Quality Gate xanh. Audit Summary ghi đủ trạng thái, gồm cả `ai_triage`.

## Kiểm chứng local

- Trạng thái bug: 30/39 test pass, 9 fail; line coverage **78.16%**; Quality
  Gate fail vì test, coverage và LCOV pass.
- Bản sao tạm chỉ sửa một dòng công thức percent: **39/39 test pass**, line
  coverage **78.16%**, Quality Gate pass. Bản sao ở `/private/tmp`; source trong
  repo vẫn giữ defect phục vụ demo.
- `frontend-web` và `frontend-admin`: lần preflight cuối chạy đúng `npm ci` +
  `npm run build`, cả hai pass. `npm ci` báo 19 advisory cho mỗi frontend;
  các advisory này chưa được xử lý và Gitleaks không quét dependency.
- Gitleaks CLI local: 0 finding trong Git history ở thời điểm kiểm tra.
- AI triage: 6/6 offline tests pass; dry run thấy các dòng Expected/Received.
  Chưa gọi Gemini API thật vì không có API key trong phiên này.
- Chưa có workflow run GitHub cho thay đổi chưa được commit/push; cần đối chiếu
  artifact và check trên Actions sau khi push.

## Preflight trước khi push demo

- `actionlint` v1.7.12 kiểm tra `.github/workflows/eshop-ci.yml`: pass.
- Quality Gate với fixture 70.00% line coverage: fail; 71.00%: pass. Điều kiện
  được thực thi đúng là **lớn hơn** 70%, không phải lớn hơn hoặc bằng.
- Jest với defect còn nguyên: 30/39 pass, 9 fail. Bản sao tạm sửa đúng một
  dòng: 39/39 pass, Quality Gate pass. Số hiển thị coverage của Jest và Gate
  đều là 78.16% sau khi đồng bộ cách định dạng.
- Gitleaks native CLI: 0 finding trên lịch sử Git đã commit. Docker daemon trên
  máy local không chạy, nên lệnh container chưa được thử local. Workflow dùng
  cùng UID/GID với checkout để tránh lỗi Git `unsafe repository` trong container.
- Branch Protection trên GitHub chưa được đọc hoặc cập nhật trong phiên này.
  Bản ghi cũ của nhóm dùng tên check 80%; trước khi demo nút Merge mở khóa,
  cần xác nhận required checks đã đổi sang ba tên mới trong script cấu hình.

## Điều chỉnh phạm vi CI demo ngày 22/10/2026

Theo yêu cầu demo ngắn, workflow chuyển sang `npm run test:ci:demo`: chỉ chạy 2
unit test của `coupon-discount.js` (percent 10% và fixed 50.000). Jest demo
chỉ đo coverage của module coupon, không đo toàn backend; full suite vẫn có ở
`npm run test:ci` để kiểm tra riêng.

Kiểm chứng local khi công thức còn sai: **1/2 test pass**, line coverage coupon
**100%**, Quality Gate fail do test. Bản sao tạm sửa duy nhất công thức percent:
**2/2 pass**, coverage coupon **100%**, Quality Gate pass. `actionlint` và
`git diff --check` pass. Chưa có PR run mới cho phạm vi 2-test này; số liệu
30/39 và 78.16% phía trên thuộc run full-suite trước đó.

## Baseline xanh để merge trước demo

Theo yêu cầu mới, công thức percent trong `backend/coupon-discount.js` được sửa
đúng (`totalAmount * coupon.discount_value / 100`) trên branch `ncuong` trước
khi merge. Kịch bản demo chuyển sang tạo branch mới từ `main` đã merge, cố ý
đưa lại lỗi một dòng, mở PR để thấy CI đỏ/AI comment, rồi sửa về công thức
đúng để CI xanh. Không đưa lỗi demo vào baseline `main`.

Preflight local trên source chuẩn bị push: 2/2 unit test demo pass, line coverage
coupon 100%, Quality Gate pass, cả `frontend-web` và `frontend-admin` build pass,
`actionlint` và `git diff --check` pass. Kết quả GitHub Actions cần xác nhận sau
khi push commit này.
