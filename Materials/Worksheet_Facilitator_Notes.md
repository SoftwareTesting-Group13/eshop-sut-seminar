# Pipeline Postmortem — Ghi chú điều phối

**Nguyễn Gia Huy · W6-16 · Bản thiết kế cập nhật 22/10/2026**

Tài liệu này dành cho người tổ chức, tách khỏi
[phiếu sinh viên](../Activity_Worksheet.md). Đây không phải Answer Key.

## 1. Trạng thái và điều kiện trước khi phát bài

- Worksheet đã có lịch 23 phút, câu hỏi cốt lõi, chỗ trả lời và thang điểm 10.
- Đã có 6 raw CI logs kèm run/commit tại [Sample Logs](./Sample_Logs/README.md):
  coupon/cache và cặp SQLite demo parallel fail / serial pass trên nhánh riêng.
  Hồ sơ async hiện chỉ có nguồn local; cần ghi rõ loại nguồn khi phát bộ hồ sơ.
- Đã có [Answer Key và barem chi tiết](../Activity_Worksheet_AnswerKey.md)
  W6-17: mỗi câu 1 điểm, chia điểm từng ý, tổng 10. Đây là barem đề xuất,
  chưa có xác nhận nhóm duyệt. Đã rà soát nguồn, đề/đáp án và có ảnh preview
  barem; chưa thử chấm với sinh viên.
- Đã có hai ảnh preview Worksheet và bộ ảnh CI A/B/D. Chưa thử hoạt động với
  nhóm sinh viên hoặc chấm bài thử; 23 phút vẫn là thời lượng thiết kế.

## 2. Chuẩn bị bộ hồ sơ A–D

Mỗi hồ sơ cần một trích đoạn đủ đọc trong 1 phút, số dòng để trích dẫn và nguồn
raw để kiểm tra. Khi chốt nguồn, đặt trích đoạn ngay trước câu hỏi tương ứng
trong bản phát hoặc in thành thẻ A/B/C/D phát cùng phiếu. Không buộc sinh viên
tìm thông tin qua nhiều liên kết hay mở cả log dài trong giờ làm bài.

| Hồ sơ | Trích đoạn cần đặt cạnh câu hỏi | Kiểm tra trước khi dùng |
| :--- | :--- | :--- |
| A — SQLite | Hai excerpt A1/A2, transaction, busyTimeout và source demo cùng SHA | Một tiến trình/hai kết nối; không mô tả như lỗi SUT do nhiều Jest worker. |
| B — Coupon | Input coupon/tổng đơn, Expected/Received, đoạn tính giảm giá ở đúng phiên bản sự cố | Log và code phải khớp commit; không dùng source đã fix để mô tả như vẫn đang lỗi. |
| C — Async | Log sleep/await với độ trễ và trạng thái, đoạn code kiểm tra readiness | Ghi rõ demo có can thiệp độ trễ; không dùng một lượt fail để khẳng định flake rate. |
| D — Cache | Cache hit/miss, install step và kết quả test/gate có thứ tự rõ | Không dựng tình huống rằng cache miss tự động làm test fail. |

Mỗi hồ sơ ghi run URL/ID, commit SHA, job/step, môi trường và phạm vi trích từ
raw log. Phân biệt dòng log gốc với số dòng đánh lại trong thẻ bài tập.
Nếu che secret, ghi rõ phần đã che; không thay đổi số đo, thứ tự hoặc pass/fail.

### Nguồn tham khảo trong lúc soạn nháp

SQLite, coupon và cache đã có nguồn CI trong index W6-18; dùng cặp A1/A2 cùng
source demo cho SQLite. Dùng trích đoạn B cho coupon,
D3 (install fail) làm tình huống cache chính, D1/D2 làm đối chiếu miss/hit pass.
Snapshot coupon trong bộ hồ sơ khớp commit `6129c98`. Các nguồn local dưới đây
chỉ để tham khảo bổ sung, **không đổi nhãn log local thành CI**:

- A: [Ảnh SQLite tuần 5](../Weekly_Reports/Week05/screenshots/01_sqlite_busy_failure_mode.png).
- B: [Log coupon local tuần 5](../Weekly_Reports/Week05/coupon_failure_mode2_huy.txt).
  Đối chiếu mã lỗi tại `backend/server.js` ở commit `6129c98`.
  Main hiện tại đã dùng `backend/coupon-discount.js` với công thức được sửa.
- C: [Log demo slow local](../Weekly_Reports/Week05/flaky_slow_huy.txt) và
  [mã demo](../backend/demos/flaky-delay.demo.js).
- D: [Workflow hiện tại](../.github/workflows/eshop-ci.yml); cần chọn log CI phù hợp.

## 3. Điều phối trong 23 phút

| Phút | Việc của điều phối |
| :--- | :--- |
| 0–2 | Chia nhóm 3–4 người, phát phiếu và hồ sơ A–D; nhắc chỉ đọc dữ liệu, ghi lệnh đề xuất. |
| 2–7 | Nhắc nhóm bám dòng log của A, không đoán nguyên nhân chỉ từ tên hồ sơ. |
| 7–12 | Nhắc dùng input và code cùng phiên bản trong B. |
| 12–17 | Cho nhóm chỉ thứ tự sự kiện trong C trước khi đề xuất cách chờ. |
| 17–20 | Làm D, hoàn thiện bảng tóm tắt và chọn 2 nhóm trình bày hai tình huống khác nhau. |
| 20–23 | 2 nhóm × 60 giây; khoảng 30 giây chuyển lượt/phản hồi và 30 giây thu phiếu. |

- Mọi nhóm nộp phiếu; không yêu cầu tất cả nhóm trình bày trong 3 phút cuối.
- Nếu cần 20 phút: A/B/C mỗi phần còn 4 phút; giữ 3 phút cuối.
- Nếu có 25 phút: thêm 2 phút phản biện sau hai lượt trình bày.
- Không cài dependency, chạy lại CI, yêu cầu API key hoặc sửa database trên lớp.
  Người điều phối chuẩn bị các lần tái hiện trước buổi học trên bản repo kiểm thử.
- Nếu sinh viên đề xuất lệnh chưa chạy, yêu cầu ghi đó là dự kiến kiểm tra,
  không ghi như kết quả đã quan sát.

### Phát bài và sử dụng Answer Key

- Chỉ phát phiếu sinh viên và hồ sơ A/B/C/D; giữ Answer Key trong phần tài liệu
  của người hướng dẫn, không chiếu đáp án khi nhóm đang làm. Nếu phát tài liệu
  số, tách bộ hồ sơ bài tập khỏi thư mục/link chứa đáp án và rubric nội bộ.
- Phát kèm metadata bước cache/install/test của D3 để phân biệt success,
  failure và skipped. Với C, ghi rõ local demo, source kiểm tra ở `575e6be`,
  log cũ không lưu SHA; không đổi thành CI evidence.
- Hướng dẫn phân biệt dữ kiện quan sát, giả thuyết và cách xác nhận. Không
  giải thích nguyên nhân hay đưa số tiền đúng trước khi nhóm trả lời B.
- Barem 10 điểm là phương án của nhóm soạn; xin nhóm thống nhất trước buổi
  học. Chấp nhận giải khác có bằng chứng hợp lệ, không bắt buộc câu chữ mẫu.
- Khi chấm, chỉ tính các ý được hỏi; phần file/hàm/revision và sửa/xác nhận
  trong Answer Key dùng hỗ trợ phản biện, không thêm điểm hoặc yêu cầu ngầm.
- Sau khi thu bài, dùng cặp SQLite fail/pass, bảng số tiền coupon và thứ tự
  completion/assertion để giải thích. Nếu có ý kiến khác, yêu cầu chỉ nguồn
  cụ thể trước khi kết luận; chưa có phép chạy sau sửa thì ghi hướng đề xuất.

## 4. Câu hỏi mở rộng khi còn thời gian

Các câu dưới đây không thuộc 10 điểm hoặc thời lượng bắt buộc. Chọn tối đa một
câu cho phần phản biện; không đưa lại toàn bộ vào phiếu sinh viên.

- A: Kết quả nào trong phép so sánh song song/tuần tự ủng hộ hoặc bác bỏ giả thuyết?
- B: Dòng stack trace là nơi phát hiện lỗi hay nơi gây lỗi? Phân biệt assertion
  kiểm tra bất biến với kiểm tra giá trị cụ thể.
- C: Vì sao tăng sleep hoặc thêm `--runInBand` chưa chứng minh đã chờ đúng tác vụ?
  Nếu đo 10 lượt trên CI, cần giữ/ghi lại những điều kiện nào và phân loại lỗi môi trường ra sao?
- D: Coverage cao có đủ để chấp nhận run đang có assertion fail không?
  Phải kiểm soát điều kiện nào khi so sánh cache cold/warm?

## 5. Chốt tài liệu và minh chứng

1. Thu thập CI logs thật, kiểm tra nguồn và gắn trích đoạn cạnh câu hỏi.
2. Đối chiếu Answer Key và barem: A/B/C mỗi phần 3 điểm, D 1 điểm; phần trình
   bày tổng hợp không cộng điểm, câu mở rộng không làm thay đổi thang 10.
3. Nhờ nhóm rà soát, thử bấm giờ để điều chỉnh độ khó; chưa coi 23 phút dự kiến
   là thời lượng đã thực nghiệm.
4. Mở Markdown Preview và chụp ảnh thật
   `Weekly_Reports/Week06/screenshots/ghuy_01_worksheet_preview.png`.
5. Đối soát [Checklist](../Plan/Checklist.md), cập nhật hồ sơ trước khi nghiệm thu
   hoặc tạo PR. Không chỉnh trực tiếp Checklist và không tự push lên main.
