# BÁO CÁO TIẾN ĐỘ TUẦN 5 (WEEKLY REPORT — WEEK 05)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo  
**GitHub Repository chính thức:** [SoftwareTesting-Group13/eshop-sut](https://github.com/SoftwareTesting-Group13/eshop-sut)  
**Nhóm thực hiện:** Nhóm 13 (4 thành viên)
- **23120102** — Nguyễn Ngọc Minh Tuấn
- **23120223** — Dương Nhật Cường
- **23120225** — Trần Gia Cường
- **23120273** — Nguyễn Gia Huy

---

## 1. TỔNG KẾT KẾT QUẢ ĐẠT ĐƯỢC TRONG TUẦN 5

*(Ghi nhận tóm tắt kết quả thực tế nhóm đã hoàn thành trong tuần)*

1. **Về mặt tài liệu & đề cương:**
   - `[Điền kết quả rà soát Proposal.md và toolSurvey.md]`
2. **Về mặt thiết lập CI/CD Pipeline:**
   - `[Điền kết quả tạo workflow GitHub Actions, cấu hình cache npm]`
3. **Về mặt Test Harness & Backend Testing:**
   - `[Điền kết quả cấu hình Jest, --runInBand SQLite, test coupon API]`
4. **Về mặt AI Log Triage & Kịch bản Flaky Test:**
   - Đã viết `ai_triage.py`, kiểm tra offline đạt 6/6 test và đọc được log coupon qua dry run; kết nối Gemini thật chưa được kiểm chứng thành công.
   - Đã tạo demo async delay trong `backend/demos/` với lệnh `npm run test:flaky`. Codex chạy đối chứng fast/slow và quan sát hai lượt random có kết quả pass/fail khác nhau; ca await hoàn tất tác vụ đều pass. Nguyễn Gia Huy đã tự chạy fast (2 passed), slow (1 failed, 1 passed) và lưu hai ảnh minh chứng; benchmark CI để tuần 6.

---

## 2. BẢNG TIẾN ĐỘ THỰC HIỆN CỦA 4 THÀNH VIÊN TRONG TUẦN 5

| Thành viên | Nhiệm vụ chính được giao | Trạng thái (Chưa làm / Đang làm / Hoàn thành) | Đánh giá kết quả thực tế |
| :--- | :--- | :---: | :--- |
| **Nguyễn Ngọc Minh Tuấn** | Viết Data-Driven test coupon API, bắt lỗi `server.js` | `[...]` | `[...]` |
| **Dương Nhật Cường** | Viết workflow GitHub Actions, setup cache, gom Weekly Report | `[...]` | `[...]` |
| **Trần Gia Cường** | Rà soát Proposal & toolSurvey, cấu hình Jest `--runInBand` | Hoàn thành | Đã hoàn thành rà soát tài liệu đề cương; cấu hình thành công Jest test engine với Supertest; tái hiện lỗi SQLITE_BUSY và xử lý triệt để bằng cờ --runInBand (Pass 100%) |
| **Nguyễn Gia Huy** | Viết script `ai_triage.py`, xây dựng kịch bản Flaky test | Đang làm | Hoàn thành kịch bản Flaky tuần 5, đã tự chạy fast/slow và lưu ảnh. AI Triage đã có mã, kiểm tra offline và dry run; còn kiểm chứng Gemini thật. |

---

## 3. DANH MỤC CÁC TÀI LIỆU VÀ FILE BÁO CÁO LIÊN QUAN

* **Bản kê khai sử dụng AI:** [AI Usage Declaration.md](./AI%20Usage%20Declaration.md) *(kèm bản xuất PDF / HTML)*.
* **Nhật ký commit Git tổng hợp:** [Git Commit Log Total.md](./Git%20Commit%20Log%20Total.md) *(kèm bản xuất PDF / HTML)*.
* **Kế hoạch hành động 2 ngày tới:** [Week5Plan.md](../../Plan/Week5Plan.md).
* **Đề cương Proposal:** [Proposal.md](../../Proposal/Proposal.md).
* **Báo cáo khảo sát công cụ:** [toolSurvey.md](../../Proposal/toolSurvey.md).
* **Kế hoạch các Phase Seminar:** [Seminar_Phases_Plan.md](../../Plan/Seminar_Phases_Plan.md).

---

## 4. KHU VỰC MINH CHỨNG TRỰC QUAN (VISUAL EVIDENCE)

### 4.1. Ảnh chụp màn hình ứng dụng & pipeline (Screenshots)
*(Lưu các file ảnh chụp màn hình thực tế vào thư mục `Weekly_Reports/Week05/screenshots/` và chèn link vào danh sách bên dưới)*

1. **Minh chứng 1: Giao diện Pipeline GitHub Actions**
   - File: `screenshots/[Tên_file_anh_1]`
   - Mô tả: `[Mô tả ảnh chụp màn hình 1]`
2. **Minh chứng 2: Tối ưu hóa Cache Dependencies / Test Run**
   - File: `screenshots/[Tên_file_anh_2]`
   - Mô tả: `[Mô tả ảnh chụp màn hình 2]`
3. **Minh chứng 3: Kết quả thực thi kiểm thử Jest Backend & Xử lý SQLite Lock**
   - File 1 (Lỗi chạy song song đa tiến trình): [01_sqlite_busy_failure_mode.png](./screenshots/01_sqlite_busy_failure_mode.png)
   - File 2 (Thành công khi chạy tuần tự --runInBand): [02_jest_run_in_band_success.png](./screenshots/02_jest_run_in_band_success.png)
   - Mô tả: Thực nghiệm đối chứng giữa việc chạy test song song (`--maxWorkers=4`) gây xung đột khóa file SQLite (`SQLITE_BUSY: database is locked`) và giải pháp cấu hình `--runInBand` giúp 100% test suites vượt qua thành công.
4. **Minh chứng 4: Kiểm tra offline và dry run của AI Log Triage**
   - Kiểm tra offline: [04_ai_triage_offline_tests.png](./screenshots/04_ai_triage_offline_tests.png).
   - Log đầu vào: [04_ai_triage_input_log.png](./screenshots/04_ai_triage_input_log.png).
   - Dry run: [04_ai_triage_dry_run_02.png](./screenshots/04_ai_triage_dry_run_02.png).
   - Mô tả: Bộ kiểm tra offline đạt 6/6 test; script đọc được log coupon thực tế qua dry run. Chưa có kết quả phân tích thành công từ Gemini API thật.
5. **Minh chứng 5: Flaky Test do async delay (Failure Mode 3)**
   - Fast: [05_flaky_test_fast_pass.png](./screenshots/05_flaky_test_fast_pass.png).
   - Slow: [05_flaky_test_slow_fail.png](./screenshots/05_flaky_test_slow_fail.png).
   - Mô tả: Thành viên tự chạy tác vụ 20 ms và 200 ms với thời gian chờ sleep cố định 100 ms. Fast có 2 ca pass; slow có ca sleep fail, còn ca await pass. Đây là đối chứng có kiểm soát; chưa đo flake rate trên CI.

### 4.2. Video Demo minh chứng kết quả làm việc
*(Lưu video clip quay màn hình thực tế vào thư mục `Weekly_Reports/Week05/videos/`)*
* **Tên file video:** `videos/[Tên_file_video_demo]`
* **Thời lượng:** `[...]`
* **Mô tả nội dung video:** `[Mô tả ngắn gọn nội dung thao tác trong video]`

---

## 5. ĐÁNH GIÁ RỦI RO VÀ KẾ HOẠCH HÀNH ĐỘNG TUẦN TIẾP THEO

- **Khó khăn / Rủi ro gặp phải trong tuần:**
  - `[Ghi nhận khó khăn thực tế của nhóm nếu có]`
- **Giải pháp xử lý:**
  - `[Ghi nhận hướng khắc phục]`
- **Kế hoạch hành động Tuần 6 (Mốc hoàn thành 90% seminar):**
  - Viết tài liệu `User_Guide.md` (tiếng Anh, ≥ 6 mục + 3 Failure Modes).
  - Sản xuất video `Demo_Screencast.mp4` (5–8 phút, tiếng Anh, 1080p, ≤ 100MB).
  - Thiết kế `Activity_Worksheet.md` (Pipeline Postmortem ~20-25m có answer key).
  - Soạn thảo `Seminar_Slides.pptx` (≤ 15 slides).
  - Đóng gói link Pre-share sẵn sàng nộp trước buổi báo cáo.
