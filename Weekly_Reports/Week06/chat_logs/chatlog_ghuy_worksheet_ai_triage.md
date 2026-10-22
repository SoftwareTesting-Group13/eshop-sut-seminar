# Chat Log — Worksheet Pipeline Postmortem, Tuần 6

- **Thành viên:** Nguyễn Gia Huy — MSSV 23120273.
- **Công cụ:** OpenAI Codex; không xác định thêm tên phiên bản model từ phiên làm việc.
- **Thời điểm:** 22/10/2026, Asia/Saigon.
- **Nhánh:** `feature/giahuy-week6-worksheet`.
- **Phạm vi phiên hiện tại:** bản nháp W6-16 và danh mục nguồn để chuẩn bị W6-18.

## 1. Mục tiêu công việc

Đọc kế hoạch tuần 6, bắt đầu với Worksheet 20–25 phút cho hoạt động lớp
"Pipeline Postmortem". Chuẩn bị câu hỏi, phân công, lịch hoạt động, chỗ trả lời
và nguồn tham khảo; không coi bản nháp là bộ đề đã có log CI và đáp án hoàn chỉnh.

## 2. Prompt tiêu biểu thực tế

Người thực hiện:

> hãy đọc nhiệm vụ tuần 6 của tôi

> bắt đầu từ đâu đây kkk

Codex đề xuất bắt đầu với phác thảo Worksheet, rồi chọn log CI, viết Answer Key,
kiểm chứng Gemini và đo 10 lượt Flaky. Trước khi sửa file, chuẩn bị nhánh riêng.

Người thực hiện đồng ý:

> ok

Đây là các lời nhắn thực tế và phần tóm tắt phản hồi, không phải bản xuất đầy đủ
mọi thao tác công cụ hoặc một prompt kỹ thuật được dựng lại.

## 3. Nhật ký phản hồi AI và sản phẩm

1. Đọc `Plan/Week6Plan.md`, `Plan/Checklist.md`, hồ sơ tuần 6 và mã hiện tại.
2. Kiểm tra repo sạch, fetch và xác nhận local main đồng bộ `origin/main` tại
   `f50f68e`; tạo nhánh riêng cho Worksheet.
3. Phát hiện `backend/coupon-discount.js` đã dùng công thức percent được sửa.
   Đối chiếu mã lỗi cũ tại `6129c98` để tránh mô tả log tuần 5 như lỗi hiện tại.
4. Soạn `Activity_Worksheet.md`: lịch 23 phút, ba hồ sơ SQLite/coupon/async,
   phần cache, 10 điểm và bảng postmortem để nhóm sinh viên điền.
5. Tạo `Materials/Sample_Logs/README.md` ghi nguồn đã có, nguồn CI còn thiếu và
   metadata cần thu thập. Không tạo log, run ID, số đo hoặc URL CI giả.
6. Cập nhật phần kê khai của Huy theo kết quả của phiên này; bỏ mô tả sẵn về
   việc đã dùng SDK Gemini cũ/sửa SDK vì không có bằng chứng cho hoạt động đó.

**Commit bản nháp:** `a2cb8c4` — `docs(worksheet): draft Pipeline Postmortem classroom activity`.

## 4. Kiểm chứng và biên tập thủ công

### Kiểm tra Codex đã thực hiện

- Các liên kết file nội bộ của Worksheet và danh mục nguồn đều trỏ tới file có thật.
- Các code fence Markdown có đủ cặp mở/đóng; `git diff --check` không báo lỗi.
- Phân bổ lịch 2 + 5 + 5 + 5 + 3 + 3 = 23 phút, có cách điều chỉnh về 20 hoặc 25 phút.
- Thang điểm câu hỏi 3 + 3 + 3 + 1 = 10; phần trình bày không cộng thêm điểm.
- Chưa thay đổi mã nguồn hoặc chạy toàn bộ test backend trong bước soạn tài liệu.

### Phần người thực hiện còn cần đối chiếu

- Đọc bản nháp và điều chỉnh độ khó/ngôn ngữ cho lớp; chưa có xác nhận đã rà
  soát hoặc trao đổi thống nhất với các thành viên khác trong phiên này.
- Thu thập log GitHub Actions thật và metadata để chốt câu hỏi, đặc biệt hồ sơ
  SQLite và cache. Log local hiện có chỉ là tài liệu tham khảo khi soạn nháp.
- Mở Markdown Preview, kiểm tra bố cục và lưu ảnh thật
  `Weekly_Reports/Week06/screenshots/ghuy_01_worksheet_preview.png`.
- Soạn Answer Key ở W6-17; chỉ nghiệm thu W6-16 sau khi đủ nội dung, nguồn và
  bằng chứng theo checklist. Chưa tạo PR, chưa push trong bước bản nháp.

## 5. Trạng thái các phần tiếp theo

W6-17 đến W6-20 chưa được thực hiện trong phiên này. Chưa dùng API key, chưa
gọi Gemini, chưa chạy benchmark 10 lượt, chưa tạo đáp án hoặc tự ký xác nhận mới.
