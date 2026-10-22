# BÁO CÁO TIẾN ĐỘ TUẦN 6 (WEEKLY REPORT — WEEK 06)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo (Express, SQLite3, Jest, React, GitHub Actions)  
**GitHub Repository chính thức:** [SoftwareTesting-Group13/eshop-sut-seminar](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar)  
**Nhóm thực hiện:** Nhóm 13 (4 thành viên)
- **23120102** — Nguyễn Ngọc Minh Tuấn
- **23120223** — Dương Nhật Cường
- **23120225** — Trần Gia Cường
- **23120273** — Nguyễn Gia Huy

---

## 1. TỔNG KẾT KẾT QUẢ ĐẠT ĐƯỢC TRONG TUẦN 6 (MỐC 90% HOÀN THÀNH DỰ ÁN)

*(Ghi nhận tóm tắt kết quả thực tế nhóm đã hoàn thành trong Tuần 6 nhằm đóng gói trọn vẹn gói sản phẩm Pre-share)*

1. **Về mặt Tài liệu Hướng dẫn Chuyên sâu (`User_Guide.md`):**
   - Đã biên soạn tài liệu hoàn toàn bằng tiếng Anh chuẩn học thuật với 7 phần trọng tâm theo đúng rubric môn học.
   - Hoàn thành phân tích kỹ thuật chuyên sâu **3 Mandatory Failure Modes**: SQLite File Lock (`SQLITE_BUSY`) với giải pháp `--runInBand`, lỗi coupon percent `discount_amount` âm với bộ test Data-Driven, và Flaky test do async delay (`sleep` vs `await`).
   - Tích hợp hệ thống sơ đồ kiến trúc và luồng CI/CD bằng cú pháp Mermaid render trực tiếp trên GitHub.

2. **Về mặt Bộ Slide Thuyết trình (`Seminar_Slides.pptx` & `Seminar_Slides.md`):**
   - Đã hoàn thiện đồng bộ cả hai định dạng: file trình chiếu `Seminar_Slides.pptx` và file tài liệu `Seminar_Slides.md` hiển thị trực quan trên GitHub repo.
   - Tuân thủ quy định tối đa 15 slides, tập trung vào sơ đồ trực quan, phân tích Failure Mode 2 và bảng số liệu thực nghiệm đo đạc.

3. **Về mặt Video Demo Screencast (`Demo_Screencast.mp4`):**
   - Đã quay trực tiếp màn hình thao tác IDE/Terminal/GitHub Actions thật (không dùng slide).
   - Thuyết minh 100% bằng tiếng Anh (English Narration) rõ ràng, không nhạc nền; thời lượng đạt chuẩn 5 – 8 phút; dung lượng file nén đạt chuẩn **≤ 100MB** ở độ phân giải 1080p.

4. **Về mặt Bài tập Tương tác trên lớp (`Activity_Worksheet.md` & `Activity_Worksheet_AnswerKey.md`):**
   - Đã tạo bản nháp [Activity_Worksheet.md](../../Activity_Worksheet.md) với lịch 23 phút, hồ sơ SQLite/coupon/async, phần thảo luận cache và thang điểm 10.
   - [Danh mục nguồn log](../../Materials/Sample_Logs/README.md) phân biệt tài liệu local tuần 5 với raw CI logs còn chờ thu thập. Chưa nghiệm thu W6-16; Answer Key và barem chi tiết W6-17 chưa soạn trong phiên này.

5. **Về mặt Đo đạc Thực nghiệm (Empirical Metrics) & AI Triage:**
   - Phần việc W6-19/W6-20 của Nguyễn Gia Huy chưa có kết quả Gemini thật hoặc bộ số liệu 10 lượt CI được bổ sung trong phiên ngày 22/10/2026.
   - Mã AI Triage và demo Flaky kế thừa từ tuần 5; chưa dùng chúng để khẳng định đã hoàn thành kiểm chứng API hoặc benchmark của tuần 6.

6. **Về mặt Đóng gói & Pre-share:**
   - Đóng gói toàn bộ sản phẩm mốc 90% lên Google Drive và GitHub Releases sẵn sàng nộp và chia sẻ cho lớp trước buổi báo cáo ít nhất 3 ngày làm việc.

---

## 2. BẢNG TIẾN ĐỘ THỰC HIỆN CỦA 4 THÀNH VIÊN TRONG TUẦN 6

| Thành viên | Nhiệm vụ chính được giao | Giờ (Hours) | Trạng thái | Đánh giá kết quả thực tế |
| :--- | :--- | :---: | :---: | :--- |
| **Nguyễn Ngọc Minh Tuấn** | Lead soạn bộ Slide (pptx & md ≤ 15 trang), mở rộng test suites coupon & cấu hình LCOV coverage | 17.0h | Đang làm | Thiết kế khung Slide pptx/md 15 trang; bổ sung 21 ca test Data-Driven cho coupon; cấu hình Jest HTML coverage. |
| **Dương Nhật Cường** | Lead sản xuất Video Screencast (1080p, ≤ 100MB, English narration), Quality Gate CI, đóng gói Pre-share | 18.0h | Đang làm | Lập kịch bản Storyboard, quay màn hình thao tác thật, thu âm tiếng Anh, nén video ffmpeg ≤ 100MB, đóng gói Drive. **Quality Gate CI (W6-07) đã xong**: workflow có job `Quality Gate (100% Tests & Coverage >= 80%)` kiểm tra 100% suite pass + ngưỡng coverage 80% + xuất LCOV, Branch Protection Rules đã bật trên `main` (PR #7 đang ở trạng thái `blocked` — đúng cơ chế Fail-Fast cần demo). |
| **Trần Gia Cường** | Lead biên soạn `User_Guide.md` tiếng Anh, phân tích 3 Failure Modes, vẽ sơ đồ Mermaid, Step-by-Step Guide | 17.5h | Đang làm | Hoàn thành khung 7 mục User Guide tiếng Anh, phân tích sâu 3 Failure Modes, tích hợp sơ đồ Mermaid, kiểm tra liên kết. |
| **Nguyễn Gia Huy** | Lead thiết kế `Activity_Worksheet.md` & Answer Key, nâng cấp AI Triage Gemini API, đo đạc Metrics Flake Rate | 18.0h | Đang làm | W6-16: đã có bản nháp Worksheet 23 phút và danh mục nguồn log; chờ rà soát nội dung, thu thập raw CI logs và ảnh preview. W6-17 đến W6-20 chưa nghiệm thu. 18.0h là giờ kế hoạch. |

---

## 3. DANH MỤC CÁC TÀI LIỆU VÀ FILE BÁO CÁO LIÊN QUAN

* **Kế hoạch hành động Tuần 6:** [Week6Plan.md](../../Plan/Week6Plan.md).
* **Sổ tay tiêu chuẩn nghiệm thu & checklist:** [Checklist.md](../../Plan/Checklist.md).
* **Bản kê khai sử dụng AI Tuần 6:** [AI Usage Declaration.md](./AI%20Usage%20Declaration.md).
* **Nhật ký commit Git tổng hợp Tuần 6:** [Git Commit Log Total.md](./Git%20Commit%20Log%20Total.md).
* **Thư mục Chat Logs với AI:** [chat_logs/](./chat_logs/).
* **Thư mục Ảnh chụp minh chứng:** [screenshots/](./screenshots/).
* **Thư mục Video Demo:** [videos/](./videos/).
* **Tài liệu User Guide chuyên sâu:** [User_Guide.md](../../User_Guide.md) *(hoặc tại thư mục nghiệm thu)*.
* **Bộ Slide thuyết trình:** `Seminar_Slides.pptx` & `Seminar_Slides.md`.
* **Bài tập tương tác trên lớp:** [Activity_Worksheet.md](../../Activity_Worksheet.md) (bản nháp); `Activity_Worksheet_AnswerKey.md` chưa soạn trong phiên này.

---

## 4. KHU VỰC MINH CHỨNG TRỰC QUAN (VISUAL EVIDENCE)

> [!NOTE]
> Mọi file ảnh minh chứng được lưu trong thư mục `Weekly_Reports/Week06/screenshots/` và tuân thủ quy tắc tiền tố tên thành viên.

### 4.1. Minh chứng nhóm Nguyễn Ngọc Minh Tuấn (`mtuan_`)
1. **Minh chứng mtuan-1: Giao diện Slide trình chiếu và file Markdown**
   - File: `mtuan_01_slide_preview.png`
   - Mô tả: Giao diện bộ slide 15 trang (`Seminar_Slides.pptx`) và bản hiển thị `Seminar_Slides.md` trên GitHub.
2. **Minh chứng mtuan-2: Báo cáo Code Coverage LCOV & Bộ test Data-Driven coupon**
   - File: `mtuan_02_coupon_extended_tests.png`, `mtuan_03_lcov_coverage.png`
   - Mô tả: Kết quả thực thi 21 test cases coupon và báo cáo độ bao phủ mã nguồn backend đạt chuẩn.

### 4.2. Minh chứng nhóm Dương Nhật Cường (`ncuong_`)
1. **Minh chứng ncuong-1: Kịch bản Storyboard & Quality Gate CI/CD**
   - File: `ncuong_01_video_storyboard.png`, `ncuong_02_ci_quality_gate.png`
   - Mô tả: Bảng phân cảnh video 5-8 phút và kết quả workflow GitHub Actions kiểm soát Quality Gate.
   - *Ghi chú chụp ảnh:* ảnh `ncuong_02_ci_quality_gate.png` nên chụp ở tab **Checks** của PR #7 (job `Quality Gate (100% Tests & Coverage >= 80%)` đang đỏ) kèm nút **Merge** bị khoá mờ, và ảnh **Settings → Branches** hiển thị Required Status Check.
2. **Minh chứng ncuong-2: Thông số kỹ thuật Video Demo Screencast**
   - File: `ncuong_04_mp4_properties.png`
   - Mô tả: File Properties của `Demo_Screencast.mp4` chứng minh dung lượng ≤ 100MB, thời lượng 5-8 phút, độ phân giải 1080p.

### 4.3. Minh chứng nhóm Trần Gia Cường (`gcuong_`)
1. **Minh chứng gcuong-1: Bố cục User Guide tiếng Anh & 3 Failure Modes**
   - File: `gcuong_01_user_guide_toc.png`, `gcuong_02_failure_modes_diff.png`
   - Mô tả: Mục lục 7 phần của `User_Guide.md` và các code block phân tích sâu 3 lỗi kỹ thuật.
2. **Minh chứng gcuong-2: Sơ đồ kỹ thuật Mermaid & Hướng dẫn tái hiện**
   - File: `gcuong_03_mermaid_diagrams.png`, `gcuong_04_reproduction_run.png`
   - Mô tả: Render sơ đồ kiến trúc Mermaid trên GitHub và log tái hiện thành công kịch bản chạy demo.

### 4.4. Minh chứng nhóm Nguyễn Gia Huy (`ghuy_`)
1. **Minh chứng ghuy-1: Giao diện Bài tập Worksheet & Answer Key**
   - File: `ghuy_01_worksheet_preview.png`, `ghuy_02_answerkey_rubric.png`
   - Trạng thái: Tên file dự kiến, chưa có ảnh được cung cấp trong phiên này. Sau khi rà soát bản nháp, chụp preview Worksheet; ảnh Answer Key bổ sung khi làm W6-17.
2. **Minh chứng ghuy-2: Kết quả chạy AI Triage Gemini API & Thống kê 10 runs Flake Rate**
   - File: `ghuy_04_ai_triage_gemini_output.png`, `ghuy_05_flake_rate_10runs.png`
   - Trạng thái: Minh chứng cần thu thập ở W6-19/W6-20; chưa có output Gemini thật hoặc bảng 10 lượt CI được bổ sung trong phiên này.

---

## 5. ĐÁNH GIÁ RỦI RO VÀ KẾ HOẠCH HÀNH ĐỘNG TUẦN TIẾP THEO

- **Khó khăn / Rủi ro chính trong Tuần 6:**
  - Khối lượng công việc lớn do phải hoàn thành trọn bộ 5 sản phẩm đầu ra chính đạt mốc 90%.
  - Việc thu âm thuyết minh tiếng Anh đòi hỏi phát âm rõ ràng, không lẫn tạp âm, khớp thời gian với thao tác màn hình.
  - Cần đảm bảo dung lượng video `Demo_Screencast.mp4` nghiêm ngặt dưới 100MB mà vẫn giữ chất lượng hiển thị sắc nét văn bản dòng lệnh ở 1080p.
- **Giải pháp xử lý:**
  - Áp dụng triệt để quy chuẩn commit-driven, hoàn thành từng task nhỏ và tự đối soát qua `Checklist.md`.
  - Sử dụng ffmpeg với bộ mã hóa H.264 (CRF 22–24, audio AAC 128kbps) để tối ưu dung lượng video.
  - Tổ chức họp rà soát chéo giữa các thành viên trước khi nén gói Pre-share Package.
- **Kế hoạch hành động Tuần 7 (Giai đoạn Báo cáo trực tiếp tại lớp):**
  - Đăng tải thông báo Pre-share lên Moodle và chia sẻ link Drive cho lớp trước ngày seminar ít nhất 3 ngày làm việc.
  - Tổ chức tổng duyệt (Dry Run) toàn bộ 45 phút báo cáo: Pitch (10m) + Live Demo (10m) + Activity Worksheet (20m) + Q&A (5m).
  - Chuẩn bị sẵn máy dự phòng và môi trường offline đề phòng sự cố mạng trong buổi báo cáo trực tiếp.
