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
| 2 | Dương Nhật Cường | 23120223 | Có dùng | OpenCode | 40% |
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
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** OpenCode
- **Mục đích:** 
  - Quét toàn bộ cấu trúc repo EShop (monorepo 4 thành phần) để xác định runtime và cách chạy backend test suite.
  - Thiết kế và sinh file cấu hình CI/CD `eshop-ci.yml` cho GitHub Actions (runner `ubuntu-latest`, Node.js 22).
  - Hướng dẫn tích hợp `actions/cache` cho thư mục `backend/node_modules` và cách băm cache key theo `backend/package-lock.json`.
  - Giải thích lý do không được chạy `npm ci` khi cache HIT (vì `npm ci` sẽ xóa `node_modules`) và cách dùng điều kiện `if: steps.cache.outputs.cache-hit != 'true'`.
  - Review và chẩn đoán lỗi pipeline CI thất bại ở bước `npm ci` (`npm error code EUSAGE`), chỉ ra nguyên nhân gốc là `backend/package-lock.json` bị khuyết entry `@emnapi/core` / `@emnapi/runtime` so với `package.json`.
  - Hướng dẫn khắc phục bằng cách sinh lại lock (`npm install --package-lock-only`) và kiểm chứng lại luồng `npm ci` + `npm test` trên đúng phiên bản Node.js/npm của runner.
- **Câu Prompt tiêu biểu:**
  > *"Bạn là 1 chuyên gia DevOps với kinh nghiệm build các CI/CD Pipeline hoàn chỉnh. Task: Quét toàn bộ repo này, khởi tạo thư mục `.github/workflows/` trong repo EShop, xây dựng file cấu hình `eshop-ci.yml` chạy trên runner `ubuntu-latest` với Node.js 22, tích hợp `actions/cache` cho thư mục `backend/node_modules` và ghi nhận hiệu quả tăng tốc (từ ~60s xuống ~5s)."* (sau đó điều chỉnh runtime từ Node.js 20 lên Node.js 22 vì Node.js 20 hiện đã quá cũ và ít được support nữa)
  > *"Pipeline CI bị lỗi như hình, review và report lại giúp tôi."* (kèm ảnh chụp log GitHub Actions thất bại ở bước `Install dependencies (npm ci)`)
- **Đánh giá kết quả sinh ra:** 
  - AI quét repo chính xác: nhận diện đúng `backend/package.json` (script test `jest --runInBand --detectOpenHandles --forceExit`), sự tồn tại của `backend/package-lock.json` và 4 test suites, đồng thời chỉ ra repo chưa có thư mục `.github/`.
  - File workflow sinh ra đúng yêu cầu, đặc biệt cảnh báo chính xác cạm bẫy "`npm ci` luôn xóa `node_modules`" — nguyên nhân khiến cache mất tác dụng nếu dùng sai.
  - Với lỗi pipeline: AI chẩn đoán đúng, **không đổ lỗi cho code/test**, mà chỉ ra `package-lock.json` thiếu entry `@emnapi/core` và `@emnapi/runtime` (transitive của Jest 30 qua `@unrs/resolver-binding-wasm32-wasi`, nền tảng `wasm32`), đồng thời truy đúng commit `c7e7d81` làm lock bị lệch.
- **Kiểm chứng & Biên tập thủ công:** 
  - Review file chat log `chatlog_cuong_workflow_cache.md` và commit lên GitHub Organization.
  - Tự tái hiện lỗi `npm ci` bằng Node.js `22.17.0` / npm `10.9.2` (khớp runner) để xác nhận thông báo `EUSAGE`.
  - Tự đối chiếu lock file (đếm package, kiểm tra sự tồn tại của `@emnapi/core` và `@emnapi/runtime`) để xác nhận nguyên nhân do AI nêu.
  - Tự chạy lại `npm ci` (exit 0) và `npm test` (4 suites / 6 tests passed) trên lock file đã sinh, rồi tự commit `backend/package-lock.json` và push để pipeline chạy lại.
  - Tự kích hoạt lại workflow CI/CD trên GitHub Actions để kiểm chứng cache HIT và chụp ảnh màn hình minh chứng lưu vào thư mục `screenshots/`.

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
  * `chatlog_cuong_workflow_cache.md` (CI/CD Workflow & Dependency Cache — Dương Nhật Cường; gồm cả phiên điều tra & sửa lỗi pipeline `npm ci` EUSAGE)
  * `[Tên file chat log của thành viên 3]`
  * `[Tên file chat log của thành viên 4]`

---

## 4. CAM KẾT LIÊM CHÍNH HỌC THUẬT

Chúng tôi cam đoan những thông tin kê khai trên là hoàn toàn trung thực. Toàn bộ mã nguồn, tài liệu và phân tích kỹ thuật do AI hỗ trợ (nếu có) đều đã được các thành viên trong nhóm trực tiếp đọc hiểu, kiểm chứng bằng thực nghiệm và chịu trách nhiệm hoàn toàn về tính chính xác.

**Xác nhận của các thành viên trong nhóm:**

| Họ và tên | Chữ ký số / Xác nhận điện tử | Ngày ký |
| :--- | :---: | :---: |
| **Nguyễn Ngọc Minh Tuấn** | `[Chưa ký / Đã ký]` | `[dd/mm/yyyy]` |
| **Dương Nhật Cường** | `Đã ký` | `16/10/2026` |
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
