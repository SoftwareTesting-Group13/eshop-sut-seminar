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
   - `[Điền kết quả script ai_triage.py và kịch bản test delay]`

---

## 2. BẢNG TIẾN ĐỘ THỰC HIỆN CỦA 4 THÀNH VIÊN TRONG TUẦN 5

| Thành viên | Nhiệm vụ chính được giao | Trạng thái (Chưa làm / Đang làm / Hoàn thành) | Đánh giá kết quả thực tế |
| :--- | :--- | :---: | :--- |
| **Nguyễn Ngọc Minh Tuấn** | Viết Data-Driven test coupon API, bắt lỗi `server.js` | `[...]` | `[...]` |
| **Dương Nhật Cường** | Viết workflow GitHub Actions, setup cache, gom Weekly Report | `[...]` | `[...]` |
| **Trần Gia Cường** | Rà soát Proposal & toolSurvey, cấu hình Jest `--runInBand` | `[...]` | `[...]` |
| **Nguyễn Gia Huy** | Viết script `ai_triage.py`, xây dựng kịch bản Flaky test | `[...]` | `[...]` |

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
3. **Minh chứng 3: Kết quả thực thi kiểm thử Jest Backend**
   - File: `screenshots/[Tên_file_anh_3]`
   - Mô tả: `[Mô tả ảnh chụp màn hình 3]`
4. **Minh chứng 4: Script AI Log Triage phân tích lỗi**
   - File: `screenshots/[Tên_file_anh_4]`
   - Mô tả: `[Mô tả ảnh chụp màn hình 4]`

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
