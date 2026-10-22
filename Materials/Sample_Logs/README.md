# Sample Logs — Pipeline Postmortem

**Trạng thái:** danh mục chuẩn bị cho Worksheet; chưa phải bộ log CI nghiệm thu W6-18.

Worksheet bản nháp: [Activity_Worksheet.md](../../Activity_Worksheet.md).
Chỉ lưu raw log được trích từ run thật; tách rõ log CI, log local và ví dụ minh họa.

| Hồ sơ | Nguồn cần thu thập ở W6-18 | Nguồn local hiện có để soạn bản nháp |
| :--- | :--- | :--- |
| A — SQLite lock | GitHub Actions run có lỗi lock, cấu hình worker và database | [Ảnh tuần 5](../../Weekly_Reports/Week05/screenshots/01_sqlite_busy_failure_mode.png); chưa có raw CI log ở đây |
| B — Coupon percent | Run fail có input và commit sự cố; đối chiếu run sau fix nếu có | [Log tuần 5](../../Weekly_Reports/Week05/coupon_failure_mode2_huy.txt); tham chiếu mã lỗi ở `6129c98` |
| C — Async delay | Log runner của demo random/sleep/await, kèm profile và độ trễ | [Log slow do Codex chạy tuần 5](../../Weekly_Reports/Week05/flaky_slow_huy.txt); chưa phải log CI |
| D — Cache cold/warm | Hai run tương ứng, cache key/hit, install step, thời gian, kết quả test/gate | Chưa chọn nguồn; cache miss cần được đánh giá tách khỏi nguyên nhân test fail |

Với mỗi nguồn CI, điền đủ thông tin trước khi đưa vào bài tập:

```text
Tên hồ sơ / tên file:
Loại nguồn: GitHub Actions raw log / trích đoạn / local / minh họa
Run URL và run ID / attempt:
Commit SHA / branch:
Ngày giờ chạy và múi giờ:
Job / step và trạng thái:
Runner, Node.js, cấu hình liên quan:
Phạm vi dòng trích từ raw log:
Nội dung đã che (nếu có):
Người trích xuất / ngày trích xuất:
```

- Đặt tên file có tiền tố `ghuy_`; raw log dùng `.txt` để được lưu trong Git.
- Giữ lỗi, assertion và thứ tự dòng thực tế. Nếu che secret/thông tin riêng, ghi
  rõ cách che; không sửa số đo hoặc đổi pass/fail trong bản trích đoạn.
- Không bịa run ID, URL, timestamp, số lần fail hoặc thời gian cache.
- Chưa có nguồn thì ghi chờ thu thập; không coi ảnh hoặc log local là CI log.
- Không tạo liên kết tới file log chưa có; bổ sung vào bảng khi đã lấy được nguồn.
