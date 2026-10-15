# BẢN KÊ KHAI SỬ DỤNG AI — TUẦN 5 (WEEK 5 AI USAGE DECLARATION)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System  
**Nhóm thực hiện:** Nhóm 13  
**Giai đoạn:** Tuần 5

---

## 1. BẢNG TỔNG HỢP KÊ KHAI SỬ DỤNG AI THEO TỪNG THÀNH VIÊN

> [!IMPORTANT]
> **Quy định môn học:** Mỗi thành viên đều phải tự khai báo minh bạch công cụ AI mình đã dùng trong tuần. **Nếu thành viên không sử dụng bất kỳ công cụ AI nào trong tuần làm việc, bắt buộc phải ghi rõ: *"Tôi xác nhận không sử dụng AI trong tuần này"*.**

| STT | Họ và tên sinh viên | Mã số sinh viên (MSSV) | Trạng thái sử dụng (Có dùng / Không dùng) | Các công cụ AI đã sử dụng | Tỷ lệ đóng góp của AI vào kết quả (%) |
| :---: | :--- | :---: | :---: | :--- | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | 23120102 | | | |
| 2 | Dương Nhật Cường | 23120223 | | | |
| 3 | Trần Gia Cường | 23120225 | Có dùng | Antigravity IDE (Gemini) | 35% |
| 4 | Nguyễn Gia Huy | 23120273 | | | |

---

## 2. NHẬT KÝ CHI TIẾT QUÁ TRÌNH SỬ DỤNG AI CỦA TỪNG THÀNH VIÊN

### 2.1. Sinh viên 1: Nguyễn Ngọc Minh Tuấn (MSSV: 23120102)
- **Tình trạng sử dụng:** `[Có sử dụng / Tôi xác nhận không sử dụng AI trong tuần này]`
- **Công cụ:** `[Tên công cụ AI hoặc ghi "Không có"]`
- **Mục đích:** `[Mô tả mục đích sử dụng AI]`
- **Câu Prompt tiêu biểu:**
  > `[Dán prompt tiêu biểu tại đây]`
- **Đánh giá kết quả sinh ra:** `[Đánh giá tính chính xác, hữu ích của câu trả lời]`
- **Kiểm chứng & Biên tập thủ công:** `[Mô tả cách thức bạn tự kiểm chứng, sửa lỗi của AI]`

---

### 2.2. Sinh viên 2: Dương Nhật Cường (MSSV: 23120223)
- **Tình trạng sử dụng:** `[Có sử dụng / Tôi xác nhận không sử dụng AI trong tuần này]`
- **Công cụ:** `[Tên công cụ AI hoặc ghi "Không có"]`
- **Mục đích:** `[Mô tả mục đích sử dụng AI]`
- **Câu Prompt tiêu biểu:**
  > `[Dán prompt tiêu biểu tại đây]`
- **Đánh giá kết quả sinh ra:** `[Đánh giá tính chính xác, hữu ích của câu trả lời]`
- **Kiểm chứng & Biên tập thủ công:** `[Mô tả cách thức bạn tự kiểm chứng, sửa lỗi của AI]`

---

### 2.3. Sinh viên 3: Trần Gia Cường (MSSV: 23120225)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** Antigravity IDE (Gemini)
- **Mục đích:** 
  - Tham khảo kiến trúc cấu hình Jest Test Runner và Supertest cho Express backend.
  - Phân tích cơ chế khóa file SQLite (`SQLITE_BUSY: database is locked`) khi chạy kiểm thử song song đa tiến trình (`--maxWorkers=4`).
  - Hướng dẫn giải pháp cấu hình cờ `--runInBand` trong `package.json` để thực thi kiểm thử tuần tự an toàn.
- **Câu Prompt tiêu biểu:**
  > *"Tôi đã chạy npx jest --maxWorkers=4 và nhận được kết quả như trong hình đã chụp. Sao không thấy lỗi: Error: SQLITE_BUSY: database is locked"*
- **Đánh giá kết quả sinh ra:** 
  - AI giải thích chính xác nguyên lý phân biệt giữa Shared Lock (khi đọc) và Exclusive Lock (khi ghi) của SQLite, chỉ ra lý do test suite ban đầu không kích hoạt lỗi lock.
  - Hướng dẫn cấu hình cờ `--runInBand --detectOpenHandles --forceExit` chính xác, giúp toàn bộ 4 test suites đều PASS 100%.
- **Kiểm chứng & Biên tập thủ công:** 
  - Tự chạy thực nghiệm trong terminal PowerShell để đối chiếu 2 kịch bản: chạy song song (`npx jest --maxWorkers=4` - 3 suites fail vì lỗi lock) và chạy tuần tự (`npm test` - 4 suites pass).
  - Tự tay chụp ảnh màn hình terminal minh chứng lưu vào thư mục `screenshots/` và tự kiểm tra, commit mã nguồn lên GitHub Organization.

---

### 2.4. Sinh viên 4: Nguyễn Gia Huy (MSSV: 23120273)
- **Tình trạng sử dụng:** `[Có sử dụng / Tôi xác nhận không sử dụng AI trong tuần này]`
- **Công cụ:** `[Tên công cụ AI hoặc ghi "Không có"]`
- **Mục đích:** `[Mô tả mục đích sử dụng AI]`
- **Câu Prompt tiêu biểu:**
  > `[Dán prompt tiêu biểu tại đây]`
- **Đánh giá kết quả sinh ra:** `[Đánh giá tính chính xác, hữu ích của câu trả lời]`
- **Kiểm chứng & Biên tập thủ công:** `[Mô tả cách thức bạn tự kiểm chứng, sửa lỗi của AI]`

---

## 3. LƯU TRỮ VÀ ĐÍNH KÈM CHAT LOG VỚI AI

Lưu các file xuất lịch sử trò chuyện (Chat Log / Prompt Log) chi tiết với các công cụ AI tại thư mục:
* Thư mục lưu trữ: `Weekly_Reports/Week05/chat_logs/`
  * `[Tên file chat log của thành viên 1]`
  * `[Tên file chat log của thành viên 2]`
  * `[Tên file chat log của thành viên 3]`
  * `[Tên file chat log của thành viên 4]`

---

## 4. CAM KẾT LIÊM CHÍNH HỌC THUẬT

Chúng tôi cam đoan những thông tin kê khai trên là hoàn toàn trung thực. Toàn bộ mã nguồn, tài liệu và phân tích kỹ thuật do AI hỗ trợ (nếu có) đều đã được các thành viên trong nhóm trực tiếp đọc hiểu, kiểm chứng bằng thực nghiệm và chịu trách nhiệm hoàn toàn về tính chính xác.

**Xác nhận của các thành viên trong nhóm:**

| Họ và tên | Chữ ký số / Xác nhận điện tử | Ngày ký |
| :--- | :---: | :---: |
| **Nguyễn Ngọc Minh Tuấn** | `[Chưa ký / Đã ký]` | `[dd/mm/yyyy]` |
| **Dương Nhật Cường** | `[Chưa ký / Đã ký]` | `[dd/mm/yyyy]` |
| **Trần Gia Cường** | `Đã ký` | `15/10/2026` |
| **Nguyễn Gia Huy** | `[Chưa ký / Đã ký]` | `[dd/mm/yyyy]` |

---

## 5. HƯỚNG DẪN XUẤT TÀI LIỆU SANG PDF / HTML / SLIDE

1. **Xuất sang PDF:** 
   - Mở file trên editor, dùng tính năng Print (`Ctrl + P`) → chọn **Save as PDF**.
   - Đặt tên file: `AI_Usage_Declaration_Week05.pdf`.
2. **Xuất sang HTML:**
   - Dùng lệnh markdown converter hoặc preview editor Save as HTML.
3. **Đính kèm Slide:**
   - Đưa nội dung bảng kê khai mục 1 vào slide báo cáo tiến độ tuần của nhóm.
