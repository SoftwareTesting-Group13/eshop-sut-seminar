# Chat Log — Cấu hình Jest Test Engine & Xử lý Lỗi SQLite Concurrency Lock
**Thành viên:** Trần Gia Cường — MSSV: 23120225  
**Tuần:** Week 05 — Chủ đề Seminar T07: CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo (backend Express + SQLite)  
**Công cụ AI sử dụng:** Antigravity IDE (Gemini)  
**Ngày thực hiện:** 15/10/2026 – 16/10/2026
**File minh chứng sinh ra:** 
* `backend/package.json` (cấu hình devDependencies & script test)
* `backend/server.js` (export `app` & kiểm tra `NODE_ENV !== 'test'`)
* `backend/tests/health.test.js`, `backend/tests/auth.test.js`, `backend/tests/orders.test.js`, `backend/tests/coupons.test.js`
* Ảnh minh chứng: `Weekly_Reports/Week05/screenshots/01_sqlite_busy_failure_mode.png`, `02_jest_run_in_band_success.png`

---

## 1. MỤC TIÊU CÔNG VIỆC

1. Thiết lập nền tảng kiểm thử backend Express với Jest và Supertest.
2. Tái cấu trúc file `backend/server.js` để có thể import trong môi trường kiểm thử mà không bị xung đột chiếm cổng mạng HTTP (`EADDRINUSE`).
3. Xây dựng các test suites mẫu bao phủ các API đọc (`GET`) và ghi dữ liệu (`POST`).
4. Tái hiện và giải thích chi tiết nguyên nhân gốc rễ (Root Cause) của sự cố tranh chấp tài nguyên SQLite khi chạy kiểm thử song song đa tiến trình (`--maxWorkers=4`), dẫn đến lỗi:
   `Error: SQLITE_BUSY: database is locked`
5. Thiết lập giải pháp tuần tự hóa an toàn bằng cờ cấu hình `--runInBand` trong `package.json`, bảo đảm 100% test suites vượt qua thành công trên môi trường local và CI/CD runner.
6. Tuân thủ quy trình Git chuyên nghiệp: làm việc trên nhánh tính năng `feature/giacuong-setup-jest`, mở Pull Request chuẩn mực trên GitHub Organization và cập nhật đầy đủ hồ sơ báo cáo Tuần 5.

---

## 2. CÁC PROMPT TIÊU BIỂU ĐÃ SỬ DỤNG

### Prompt 1 — Thiết lập Jest & cấu trúc Express App
> *"Thực hiện GIAI ĐOẠN 2: THIẾT LẬP JEST TEST ENGINE & EXPORT EXPRESS APP theo kế hoạch MyPlanW5.md"*
* **Mục đích:** Cài đặt các thư viện kiểm thử cần thiết (`jest`, `supertest`), đóng gói `app.listen()` trong điều kiện môi trường kiểm thử và export `app` cho Supertest.

### Prompt 2 — Thắc mắc về việc không thấy lỗi SQLite Lock
> *"tôi đã chạy npx jest --maxWorkers=4 và nhận được kết quả như trong hình đã chụp @[01_sqlite_busy_failure_mode.png]. Sao không thấy lỗi: Error: SQLITE_BUSY: database is locked"*
* **Mục đích:** Tìm hiểu nguyên nhân vì sao lần chạy song song đầu tiên cả 2 file test đều Pass mà không phát sinh lỗi khóa file như lý thuyết dự đoán.

### Prompt 3 — Kiểm chứng lỗi thực nghiệm & ảnh chụp minh chứng
> *"Nếu chạy lệnh npx jest --maxWorkers=4: Test Suites: 3 failed, 1 passed, 4 total; Tests: 6 passed, 6 total; Snapshots: 0 total; Time: 5.62 s thì đúng chưa? Ảnh jest_run_in_band_success đã hợp lệ chưa"*
* **Mục đích:** Đánh giá tính chính xác của kết quả thực nghiệm lỗi sau khi bổ sung các test suite có transaction ghi, và đối soát chất lượng ảnh minh chứng thành công.

### Prompt 4 — Xử lý điều hướng Pull Request trên GitHub
> *"Nếu tôi lỡ create pull request ở repo giảng viên như trước đó thì nên làm gì? Mặc dù Merge bị blocked."*
* **Mục đích:** Nhờ tư vấn cách xử lý tình huống tạo nhầm PR về upstream repository của giảng viên (`ttbhanh/eshop-sut`).

---

## 3. NHẬT KÝ CHI TIẾT QUÁ TRÌNH TƯƠNG TÁC (AI RESPONSE LOG)

### Lượt 1 — Cài đặt Test Engine & Tách cổng Server
* **Tư vấn của AI:**
  * Thêm `jest` và `supertest` vào `devDependencies` trong `backend/package.json`.
  * Trong `backend/server.js`, bao bọc lệnh `app.listen()` bằng điều kiện:
    ```javascript
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    }
    module.exports = app;
    ```
  * Tạo file `.gitignore` loại trừ thư mục `node_modules/`, `coverage/`, file log và biến môi trường.
* **Đánh giá của sinh viên:** Hướng dẫn chính xác, giúp Supertest có thể khởi tạo app Express trong bộ nhớ tạm thời của tiến trình kiểm thử mà không mở socket mạng vật lý gây xung đột cổng 3000.

### Lượt 2 — Phân tích Cơ chế Khóa SQLite (Shared vs Exclusive Lock)
* **Giải thích của AI:**
  1. SQLite là file database nhị phân đơn lẻ (`database.sqlite`).
  2. Truy vấn ĐỌC (`SELECT`) chỉ yêu cầu **Shared Lock**; SQLite cho phép không giới hạn số lượng tiến trình đọc đồng thời mà không hề xảy ra xung đột.
  3. Truy vấn GHI (`INSERT`, `UPDATE`, `DELETE`, `BEGIN EXCLUSIVE`) yêu cầu **Exclusive Lock**. Tại một thời điểm chỉ duy nhất 1 tiến trình được phép ghi.
  4. Lần chạy đầu tiên không gặp lỗi vì `health.test.js` chỉ gồm các truy vấn đọc 100%, còn `auth.test.js` chỉ ghi 2 dòng trong thời gian cực ngắn (< 3ms) nên 2 worker không trùng khớp thời điểm ghi.
  5. Để kích hoạt đúng Failure Mode 1, cần có các test suites mô phỏng nghiệp vụ thực tế có transaction ghi (`orders.test.js` checkout đơn hàng và `coupons.test.js` cập nhật chiến dịch).
* **Đánh giá của sinh viên:** Lời giải thích có cơ sở khoa học máy tính vững chắc, chỉ ra đúng bản chất của sự cố race condition trong hệ thống file-based database.

### Lượt 3 — Kiểm chứng lỗi Failure Mode 1 & Giải pháp `--runInBand`
* **Kết quả khi chạy song song (`npx jest --maxWorkers=4`):**
  * Các worker tranh chấp ghi vào file `database.sqlite`.
  * Terminal báo lỗi đỏ:
    ```text
    FAIL tests/health.test.js
      ● Test suite failed to run
        SQLITE_BUSY: database is locked
    FAIL tests/auth.test.js
      ● Test suite failed to run
        SQLITE_BUSY: database is locked
    Test Suites: 3 failed, 1 passed, 4 total
    ```
* **Kết quả khi áp dụng giải pháp tuần tự (`npm test` với `--runInBand`):**
  * Cấu hình trong `package.json`: `"test": "jest --runInBand --detectOpenHandles --forceExit"`
  * Jest thực thi tuần tự từng test suite trên 1 single worker process, loại trừ hoàn toàn việc tranh chấp khóa file vật lý.
  * Toàn bộ các test suites đều **PASS 100% (4 passed, 4 total)** trong thời gian nhanh hơn đáng kể.
* **Đánh giá của sinh viên:** Kết quả đối chứng trực quan, giải quyết triệt để vấn đề mà không cần can thiệp phức tạp vào cấu trúc cơ sở dữ liệu.

### Lượt 4 — Khắc phục lỗi PR nhầm sang Repo Giảng viên
* **Tư vấn của AI:**
  * Giải thích cơ chế fork repo: khi tạo PR từ giao diện so sánh mặc định, GitHub thường trỏ về upstream repository gốc (`ttbhanh/eshop-sut`).
  * Hướng dẫn sinh viên truy cập link PR cá nhân và bấm nút **"Close pull request"** kèm lời nhắn lịch sự.
  * Cung cấp đường dẫn trực tiếp đã cấu hình đúng `base repository` là `SoftwareTesting-Group13/eshop-sut-seminar` và `compare branch` là `feature/giacuong-setup-jest`.
* **Đánh giá của sinh viên:** Xử lý tình huống kịp thời, bảo đảm không làm phiền đến repository chính của giảng viên môn học.

---

## 4. KIỂM CHỨNG & BIÊN TẬP THỦ CÔNG CỦA SINH VIÊN

1. **Thực thi lệnh độc lập:** Toàn bộ các câu lệnh cài đặt (`npm install`), chạy test song song (`npx jest --maxWorkers=4`), và chạy kiểm thử tuần tự (`npm test`) đều do sinh viên trực tiếp chạy trong PowerShell terminal local.
2. **Tự chụp ảnh minh chứng:** Sinh viên tự theo dõi màn hình terminal, chụp lại đúng thời điểm xuất hiện thông báo đỏ `SQLITE_BUSY: database is locked` và lưu vào `screenshots/01_sqlite_busy_failure_mode.png`; chụp ảnh kết quả xanh Pass 100% và lưu vào `screenshots/02_jest_run_in_band_success.png`.
3. **Thao tác Git có kiểm soát:** Sinh viên tự kiểm tra `git status`, `git diff` trước khi commit; tự tay tạo và merge Pull Request trên giao diện web của GitHub Organization.
4. **Bảo toàn dữ liệu báo cáo:** Sinh viên yêu cầu giữ nguyên cấu trúc chuẩn, không tự ý bịa đặt số liệu của các thành viên khác, chỉ cập nhật chính xác số liệu và nhật ký cá nhân.
