# SỔ TAY TIÊU CHUẨN ĐÓNG GÓI & NGHIỆM THU CÔNG VIỆC
### (DEFINITION OF DONE — DoD & QUALITY CHECKLIST)

> [!IMPORTANT]
> **HƯỚNG DẪN SỬ DỤNG:**  
> Tài liệu này là **bộ quy chuẩn chung** dành cho tất cả thành viên trong nhóm. Khi bất kỳ ai hoàn thành xong một đầu việc được giao, hãy mở tài liệu này ra và **tự đối soát (self-review)** qua các cổng kiểm tra bên dưới trước khi tạo Pull Request và báo cáo với nhóm.  
> ⚠️ **LƯU Ý:** **Không ai tích (check) hay chỉnh sửa trực tiếp vào file này.** Mọi trạng thái hoàn thành cá nhân được ghi nhận tại file Kế hoạch tuần (`WeekXXPlan.md`) và Báo cáo tuần (`Weekly_Report_WeekXX.md`).

---

## 1. CỔNG 1: CHẤT LƯỢNG MÃ NGUỒN & KIỂM THỬ (CODE & TEST QUALITY GATE)

Trước khi đóng gói công việc, thành viên phụ trách code/script cần tự xác nhận:

1. **Mã nguồn sạch & tuân thủ chuẩn chung:**
   - Không để lại các câu lệnh `console.log`, `print` rác hoặc đoạn mã nháp (commented-out code) không còn sử dụng.
   - Giữ nguyên các chú thích kiến trúc và docstring hiện có của codebase.
2. **Kiểm thử tự động chạy PASS nội bộ (Local Test Pass):**
   - Chạy lệnh kiểm thử toàn diện tại thư mục `backend/`:
     ```powershell
     npm test
     ```
   - Đảm bảo các test suites của mình **PASS 100%** và **không làm gãy (break)** các test suite sẵn có của các thành viên khác.
   - Nếu công việc liên quan đến script riêng (ví dụ: `ai_triage.py` hoặc `npm run test:flaky`), hãy chạy lệnh kiểm thử riêng và đảm bảo không có ngoại lệ (unhandled exception) bất ngờ.
3. **Vệ sinh thư mục làm việc Git (Clean Working Tree):**
   - Chạy lệnh: `git status`
   - Tuyệt đối **không commit các file rác**: thư mục `node_modules/`, `coverage/`, `.env`, file cache OS (`.DS_Store`, `Thumbs.db`).
   - Nếu trong quá trình chạy test SQLite sinh dữ liệu tạm làm thay đổi file nhị phân `backend/database.sqlite`, hãy khôi phục lại trạng thái ban đầu (`git restore backend/database.sqlite`) trước khi commit, trừ trường hợp đầu việc yêu cầu cập nhật database schema chính thức.

---

## 2. CỔNG 2: THU THẬP MINH CHỨNG THỰC NGHIỆM (EVIDENCE GATE)

Theo quy định bắt buộc của môn học, mọi công việc đều phải có minh chứng thực nghiệm đi kèm:

1. **Ảnh chụp màn hình (Screenshots):**
   - **Vị trí lưu trữ:** Bắt buộc lưu vào thư mục `Weekly_Reports/WeekXX/screenshots/`.
   - **Quy tắc chụp:** Ảnh phải hiển thị rõ câu lệnh thực thi trong terminal/browser và kết quả trả về (thông báo Pass/Fail, mã lỗi HTTP, thời gian chạy).
   - **Quy tắc đặt tên file (Bắt buộc có tiền tố tên thành viên):**  
     Để tránh xung đột trùng lặp số thứ tự khi các thành viên cùng gộp (merge) ảnh về thư mục chung `screenshots/`, **mọi file ảnh đều phải có tiền tố tên của thành viên phụ trách**:  
     `[tên-thành-viên]_[stt]_[nội-dung-minh-chứng].png`
     * Bảng tiền tố chuẩn của 4 thành viên:
       * `gcuong_` (Trần Gia Cường — ví dụ: `gcuong_01_sqlite_busy.png`, `gcuong_02_jest_run_in_band.png`)
       * `ncuong_` (Dương Nhật Cường)
       * `mtuan_` (Nguyễn Ngọc Minh Tuấn)
       * `ghuy_` (Nguyễn Gia Huy)
     * *Tuyệt đối không đặt tên không có tiền tố tên người phụ trách hoặc tên chung chung như `image.png`, `untitled.png`, `screenshot1.png`.*
2. **File nhật ký kết xuất (Raw Log / Text Output):**
   - Nếu công việc có kết quả chạy dài (như log phát hiện bug, log flaky test), lưu file dạng `.txt` vào thư mục `Weekly_Reports/WeekXX/` và cũng phải gắn tiền tố tên thành viên:  
     `[tên-thành-viên]_[nội-dung-log].txt` (ví dụ: `huy_coupon_failure_mode2.txt`, `huy_flaky_slow.txt`).
3. **Video clip demo (nếu có yêu cầu):**
   - Đối với các tuần có yêu cầu quay video thao tác, lưu file video clip định dạng `.mp4` vào thư mục `Weekly_Reports/WeekXX/videos/`:  
     `[tên-thành-viên]_[chủ-đề-video].mp4` (hoặc video chung của nhóm theo đề bài).

---

## 3. CỔNG 3: CẬP NHẬT HỒ SƠ BÁO CÁO TUẦN (WEEKLY DOCUMENTATION GATE)

Đây là bước cực kỳ quan trọng để đảm bảo tính minh bạch và ghi nhận công sức cá nhân. Mỗi thành viên khi xong việc phải cập nhật thông tin của mình vào **4 vị trí tài liệu bắt buộc**:

### 📄 3.1. File `Weekly_Reports/WeekXX/AI Usage Declaration.md`
* **Mục 1 (Bảng tổng hợp):** Cập nhật đúng hàng tên của mình:
  * Trạng thái: `Có dùng` hoặc `Tôi xác nhận không sử dụng AI trong tuần này`.
  * Tên công cụ AI cụ thể (ChatGPT, Claude, Gemini, Copilot, Antigravity,...).
  * Ước lượng tỷ lệ đóng góp của AI vào kết quả (%).
* **Mục 2 (Nhật ký chi tiết 2.x):** Điền đầy đủ:
  * Mục đích sử dụng AI.
  * Câu Prompt tiêu biểu thật đã dùng trong phiên làm việc.
  * Đánh giá tính chính xác của câu trả lời do AI sinh ra.
  * Mô tả cách thức bạn tự đọc hiểu, kiểm chứng và sửa lỗi thủ công.
* **Mục 3 (Danh mục Chat Log):** Gắn liên kết tới file chat log cá nhân của mình.
* **Mục 4 (Cam kết liêm chính):** Ghi rõ trạng thái xác nhận `Đã ký` kèm ngày ký thực tế (`dd/mm/yyyy`).

### 💬 3.2. File `Weekly_Reports/WeekXX/chat_logs/chatlog_<ten>_<nhiem_vu>.md`
* Tạo riêng một file markdown lưu lại toàn bộ lịch sử trao đổi với AI theo đúng mẫu chuẩn của nhóm.
* Cấu trúc tối thiểu gồm 4 phần:
  1. *Mục tiêu công việc.*
  2. *Các câu Prompt tiêu biểu.*
  3. *Nhật ký chi tiết phản hồi của AI (AI Response Log).*
  4. *Quá trình tự kiểm chứng và biên tập thủ công của sinh viên.*

### 📊 3.3. File `Weekly_Reports/WeekXX/Git Commit Log Total.md`
* **Mục 1 (Bảng định danh):** Đảm bảo Git/GitHub Username và Email đăng ký Git ánh xạ chính xác với MSSV và Họ tên đầy đủ của bạn.
* **Mục 3 & Mục 4 (Commit Log cá nhân):** Chạy lệnh `git log` để trích xuất commit hash thật của mình và dán vào danh sách.
* **Mục 5 (Bảng thống kê đóng góp):** Cập nhật đúng số lượng commit, số dòng code/tài liệu thêm (+) và xóa (-) dựa trên lệnh `git log --stat` hoặc `git shortlog`.

### 📋 3.4. File `Weekly_Reports/WeekXX/Weekly_Report_WeekXX.md`
* **Mục 2 (Bảng tiến độ):** Chuyển trạng thái nhiệm vụ của mình từ `Đang làm` sang `Hoàn thành`.
* Ghi ngắn gọn đánh giá kết quả thực tế đạt được (1–2 câu súc tích).
* **Mục 4.1 (Minh chứng trực quan):** Điền đường dẫn file ảnh minh chứng vừa chụp vào đúng mục tương ứng.

---

## 4. CỔNG 4: QUY TRÌNH GIT COMMIT & PULL REQUEST (GIT WORKFLOW GATE)

Tuyệt đối tuân thủ quy trình Git chuyên nghiệp của nhóm trên GitHub Organization:

1. **Quy tắc làm việc trên nhánh (Branching Strategy):**
   - **Tuyệt đối không push code tính năng trực tiếp lên nhánh `main`.**
   - Thường xuyên Pull main về khi có cập nhật.
   - Các công việc test feature phải được thực hiện trên nhánh riêng có tên chuẩn:
     * `feature/<ten-thanh-vien>-<noi-dung>` (ví dụ: `feature/giacuong-setup-jest`)
     * `test/<ten-thanh-vien>-<noi-dung>` (ví dụ: `test/tuan-coupon-test`)
2. **Quy tắc Commit Message:**
   - Commit ngắn gọn, đúng chuẩn Conventional Commits:
     * `feat:` thêm tính năng mới
     * `test:` thêm/chỉnh sửa ca kiểm thử
     * `fix:` sửa lỗi
     * `docs:` cập nhật tài liệu, kế hoạch, báo cáo
     * `ci:` chỉnh sửa workflow CI/CD
3. **Quy tắc Tạo Pull Request (PR):**
   - Khi tạo PR trên GitHub, **phải kiểm tra kỹ 2 thông số nhánh**:
     * `base repository`: Phải là repo của nhóm (`SoftwareTesting-Group13/eshop-sut-seminar`).
     * `base branch`: `main` $\leftarrow$ `compare branch`: `<nhanh_tinh_nang_cua_ban>`.
   - **Tiêu đề PR:** Đặt rõ ràng (ví dụ: `[Task 1.7] Setup Jest Backend & Fix SQLite Concurrency Lock`).
   - **Mô tả PR:** Tóm tắt ngắn gọn các thay đổi chính, danh sách file thêm mới và kết quả test.
4. **Hậu Merge (Post-Merge Sync):**
   - Sau khi PR được review và merge thành công vào nhánh `main`:
     ```powershell
     git checkout main
     git pull origin main
     ```
   - Kiểm tra đảm bảo local `main` đã đồng bộ hoàn toàn với GitHub trước khi bắt đầu nhiệm vụ mới.

---

## 5. BẢNG TÓM TẮT NHANH: "QUY TẮC 5 PHÚT TRƯỚC KHI BÁO XONG"

Trước khi thông báo với Nhóm trưởng hoặc trong nhóm chat là bạn đã hoàn thành nhiệm vụ, hãy tự hỏi nhanh 5 câu sau:

```
[?] 1. Code/test của tôi đã chạy thử trên local và PASS 100% chưa?
[?] 2. Tôi đã chụp ảnh màn hình terminal/giao diện làm minh chứng và lưu vào thư mục screenshots chưa?
[?] 3. Tôi đã kê khai AI, ký tên và tạo file trong thư mục chat_logs chưa?
[?] 4. Tôi đã cập nhật bảng định danh Git, commit hash và số dòng đóng góp vào Git Commit Log chưa?
[?] 5. Tôi đã tạo Pull Request về đúng nhánh main của Organization SoftwareTesting-Group13 chưa?
```