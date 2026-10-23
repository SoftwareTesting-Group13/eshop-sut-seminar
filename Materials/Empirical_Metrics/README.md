# Dữ liệu thực nghiệm — Nguyễn Gia Huy, W6-20

Báo cáo tổng hợp: [Empirical Metrics](../../Empirical_Metrics.md).
Protocol trước dispatch: [ghuy_protocol.md](ghuy_protocol.md).

Batch duy nhất: `ghuy-20261022-110838`, SHA CI
`ba4b02b86b94c329a8b0614a5053bb7d7b161f67`.

- [dispatches.json](ghuy-20261022-110838/dispatches.json): 10 yêu cầu dispatch được GitHub chấp nhận.
- [runs.json](ghuy-20261022-110838/runs.json): 10 run URL/ID/attempt, SHA và trạng thái thật.
- [invocations.csv](ghuy-20261022-110838/invocations.csv): 20 lượt chọn test, thời gian UTC, duration, kết quả và đường dẫn raw.
- [observations.json](ghuy-20261022-110838/observations.json): toàn bộ quan sát, điều kiện, lý do tính/không tính vào mẫu.
- [summary.json](ghuy-20261022-110838/summary.json): tỷ lệ, điều kiện so sánh và số đo cache/AI được tính lại offline.
- Mỗi thư mục run: `jobs.json`, `job-logs/`, `artifacts/`, `download-complete.json`.
- [Đối chiếu AI](ghuy-20261022-110838/evaluation/ai_reference_review.md): đánh giá của Codex trên phản hồi thật, không phải nhóm đã duyệt.
- [checksums.sha256](ghuy-20261022-110838/checksums.sha256): SHA-256 của 97 file trong batch sau chuẩn hóa LF, không gồm chính manifest checksum.

10 workflow runs, mỗi run có hai invocation before/after; không phải 20 workflow
runs độc lập. Tất cả 20 lượt hợp lệ, giữ đủ 5 test failure. Không có lượt thay thế.
Các job test cố ý báo failure khi before fail để history thể hiện đúng kết quả.

Raw giữ stdout rồi stderr với nhãn, không dựng lại thứ tự hai stream. Job logs
giữ cả timestamp và output runner; metadata API và text artifacts tải qua REST,
chuẩn hóa UTF-8/LF. Credential không lưu vào đây; chỉ có dấu che có sẵn hoặc
thay thế token nếu phát hiện. Whitespace raw được giữ nguyên, checksum kiểm
tra file sau chuẩn hóa LF. Không có log local được trộn vào mẫu CI.

Giới hạn quan trọng: profile fast/slow được chọn trước theo thiết kế demo;
hosted image khác nhau giữa các runs nhưng khớp trong từng cặp; cache một cặp;
AI một lần gọi. Các giới hạn không được dùng để loại những lượt test hợp lệ.

Tái tính bằng `.github/scripts/ghuy_summarize_metrics.py` theo lệnh trong báo cáo.
Ảnh history/metrics cần sinh viên chụp thật; thư mục này không tạo ảnh giả.
