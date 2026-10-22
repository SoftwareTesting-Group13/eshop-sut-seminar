# Kiểm chứng cuối — Nguyễn Gia Huy, 22/10/2026

Đây là log local thật do Codex chạy trong lượt rà soát W6-16–20. Không thay thế
log CI, không cộng các lượt local vào mẫu 10 runs. Không có lần gọi API mới.

| File | Lệnh / nguồn | Exit code |
| :--- | :--- | ---: |
| `ghuy_backend_current.txt` | `npm test` tại backend nhánh tài liệu `f0cadc4` | 0 |
| `ghuy_backend_main.txt` | `npm test` tại backend snapshot main `634c131` | 0 |
| `ghuy_triage_offline.txt` | `python -B -m unittest discover -s .github/scripts/tests -v` trên nhánh tài liệu | 0 |
| `ghuy_triage_main.txt` | Cùng unittest trên snapshot main (10 tests), không sửa source/test | 1 |
| `ghuy_triage_dry_run.txt` | `python -B .github/scripts/ai_triage.py --log-file Weekly_Reports/Week05/coupon_failure_mode2_huy.txt --dry-run` | 0 |
| `ghuy_flaky_fast.txt` | `npm run test:flaky`, `FLAKY_PROFILE=fast` | 0 |
| `ghuy_flaky_slow.txt` | Cùng lệnh, `FLAKY_PROFILE=slow`; sleep fail dự kiến | 1 |
| `ghuy_metrics_recomputed.txt` | `python -B .github/scripts/ghuy_summarize_metrics.py Materials/Empirical_Metrics/ghuy-20261022-110838` | 0 |
| `ghuy_final_checks.json` | Đối chiếu checksum raw/metrics, dòng excerpt/source từ Git, mã câu, ảnh PNG, mẫu secret, protected hashes và thống kê commit | 0 |
| `ghuy_link_checks.json` | Kiểm tra đích 167 link nội bộ trong 14 tài liệu; 4 đích thiếu đã có từ trước ngoài phần Huy | Không phải test pass toàn bộ link |
| `ghuy_backend_integrated.txt` | `npm test` sau tích hợp main `32e1178` tại merge `92d8e41`: 7 suites/61 tests pass | 0 |
| `ghuy_triage_integrated.txt` | Python unittest sau tích hợp: 8/10; cùng hai assertion Windows fail trên baseline | 1 |
| `ghuy_triage_integrated_dry_run.txt` | CLI `ai_triage.py --log-file Weekly_Reports/Week05/coupon_failure_mode2_huy.txt --dry-run` sau tích hợp | 0 |
| `ghuy_publish_checks.json` | Rà lại checksum/source/ảnh, mẫu secret và snapshot 10 commit không merge trước xuất bản Draft PR | 0 |

Snapshot baseline được dựng từ blob `origin/main` bằng `git ls-tree`/`git show`
trong `ci-artifacts/ghuy-w6-final-review/baseline`, dùng junction tới dependency
backend đã cài. Package-lock giống nhau giữa hai revision; không sửa main,
không cài thêm hoặc đổi phiên bản dependency. Môi trường lượt rà soát:
Windows, Node v24.22.0, npm 11.19.1, Python 3.12.10.

Output được redirect stdout/stderr bằng PowerShell, sao chép nguyên byte, không
lược bỏ failure. `*.txt -text -whitespace` giữ newline/whitespace và checksum;
thời gian suite trong output chỉ thuộc lượt local. Hai test main fail vì
assertion dùng Windows Path còn output dùng `as_posix()`, không kết luận lỗi
transport hoặc chẩn đoán API. Có npm update notice trong raw, không chạy update.

`ghuy_final_checks.json` ghi 9 commit đã tồn tại qua HEAD `f0cadc4`, không cộng
file pending. Các `protected_hashes` là hash chụp trước test và đã được đối chiếu
lại sau test. Quét secret chỉ theo mẫu trong file text thuộc phạm vi thay đổi,
không phải chứng nhận an toàn tuyệt đối. Không đọc hay xuất giá trị biến API key.

Các file tạm/baseline/dependencies không thuộc gói stage. Lịch sử chat không
có bản xuất đầy đủ; không dùng các log công cụ này để dựng hội thoại nguyên văn.

`ghuy_link_checks.json` là snapshot trước khi sinh viên xóa file tổng hợp
rà soát riêng; không coi đây là kết quả kiểm tra link mới sau khi tinh gọn.
