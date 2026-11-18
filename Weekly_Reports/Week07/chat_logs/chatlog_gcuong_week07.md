# NHẬT KÝ TRAO ĐỔI VỚI AI (PROMPT / CHAT LOG) — TUẦN 7
**Họ và tên:** Trần Gia Cường  
**Mã số sinh viên (MSSV):** 23120225  
**GitHub Username:** `trancuonG05`  
**Công cụ AI sử dụng:** Antigravity IDE Assistant (Google DeepMind)  
**Phiên bản Model:** Gemini (Flash / Thinking)  
**Nhiệm vụ chính:** Hoàn thiện kịch bản thuyết trình phân vai 20 phút (`docs/PresentationScript.md`), rà soát kỹ thuật 2 điểm đổi mới (Database Checkpoint & AI-Triage PR comment), chuẩn hóa và đồng bộ các tài liệu báo cáo tuần 7 (`Weekly_Report_Week07.md`, `Git Commit Log Total.md`, `AI Usage Declaration.md`).

---

## 1. MỤC TIÊU CÔNG VIỆC CẦN AI HỖ TRỢ TRONG TUẦN 7

1. **Format và rà soát Kịch bản Thuyết trình Phân vai (`docs/PresentationScript.md`):**
   * Định dạng chuẩn cấu trúc Markdown, chia timeline chi tiết 20 phút cho 4 thành viên.
   * Phân định rõ phạm vi nội dung giữa 2 nhóm seminar trên lớp (Nhóm 10: Nền tảng & Hạ tầng CI/CD vs Nhóm 13: Test Harness Engineering, Data-Driven Testing, Concurrency Bug & AI-Triage).
   * Giữ nguyên vẹn 100% nội dung phần hoạt động tương tác chung trên lớp (*Joint In-class Activity: Pipeline Postmortem*).
2. **Đánh giá phản biện kỹ thuật (Assessment) cho 2 điểm đổi mới:**
   * *Điểm 1 (Database Checkpoint trên bảng `coupon_usage` trong SQLite):* Đánh giá tính khả thi khi kiểm thử phân hệ coupon (Feature 09) và khuyến nghị chiến lược trình bày lai (hybrid approach) để tránh lỗi phụ thuộc DB khi live demo.
   * *Điểm 2 (AI-Triage tự động gửi nhận định lên GitHub Pull Request):* Đánh giá giá trị thực tế của cơ chế dùng bot AI comment trực tiếp dưới PR, đề xuất phương án dự phòng (fallback) khi demo trực tiếp.
3. **Đồng bộ hóa mã nguồn & rà soát thay đổi từ `main`:**
   * Kéo nhánh `main` mới nhất về local sau khi Pull Request #18 của Dương Nhật Cường (`cuogne`) được merge.
   * Phân tích, tổng hợp chi tiết các nội dung mới trong `docs/new-report.md` và các ảnh minh chứng.
4. **Lược bỏ các giới hạn slide (≤ 15 slides):**
   * Rà soát và loại bỏ triệt để các đề cập cứng về giới hạn 15 slide trong `docs/Report.md` và `docs/seminar_slide.md` để nhóm chủ động mở rộng bài thuyết trình.
5. **Soạn thảo và chuẩn hóa hồ sơ báo cáo tiến độ Tuần 7:**
   * Khởi tạo và cập nhật `Weekly_Report_Week07.md` theo phong cách vắn tắt, bám sát các đầu việc thực tế sau mốc 90%.
   * Quản lý nhật ký Git trong `Git Commit Log Total.md`, cập nhật commit SHA `15e6440` thực tế và xác nhận việc rà soát nội bộ của Nguyễn Ngọc Minh Tuấn và Nguyễn Gia Huy.
   * Hoàn thiện bản kê khai sử dụng AI `AI Usage Declaration.md` cho các thành viên.

---

## 2. CÁC CÂU PROMPT TIÊU BIỂU (PROMPTS LOG)

### Prompt 1 (Đồng bộ và phân tích thay đổi từ remote main):
> *"pull main về. Cho tôi biết có gì mới"*

### Prompt 2 (Định hướng kịch bản thuyết trình và lược bỏ giới hạn slide):
> *"Tôi muốn kịch bản 2 như Seminar_CI-CD/Me/PresentationScript.md không sửa lại. Bỏ các giới hạn số slides ở docs/ (Bỏ tức là không nhắc đến). Phân công ghi vắn tắt. Tôi vừa chuyển Seminar_CI-CD/EShop/docs/PresentationScript.md vào docs/. Tạo sẵn 2 file AI Usage Declaration.md và GitCommitLogTotal"*

### Prompt 3 (Cập nhật hiện trạng commit và công tác rà soát của các thành viên):
> *"2 thành viên Huy và Tuấn tuần này không có commits. Việc rà soát là có."*

### Prompt 4 (Thực hiện commit và push lên nhánh cá nhân):
> *"git commit và push"*

### Prompt 5 (Chuẩn hóa commit log và kiểm tra điều kiện nghiệm thu):
> *"Sửa lại Git Commit Log Total.md . Scan lại Weekly_Reports/Week07 đã đủ điều kiện để nộp chưa."*

### Prompt 6 (Quy tắc chỉnh sửa và chuẩn hóa tài liệu):
> *"ok không cần hỏi tôi mới sửa khi tôi đã kêu bạn ("Sửa lại..."). không cần chat_logs/ tuần này, tôi sẽ xuất pdf sau, không cần quan tâm"*

### Prompt 7 (Tạo chatlog và cập nhật báo cáo AI cho 2 thành viên):
> *"tạo chatlog week7 cho tôi. Đã có chatlog của ncuong. Cập nhật báo cáo cho cả 2. AI Usage Declaration.md"*

---

## 3. NHẬT KÝ TRAO ĐỔI VÀ TỰ KIỂM CHỨNG CỦA SINH VIÊN

1. **Về Kịch bản Thuyết trình Phân vai (`docs/PresentationScript.md`):**
   * *Quá trình làm việc với AI:* AI hỗ trợ định dạng lại các đề mục, bảng phân bổ thời lượng 20 phút (Phần I: 6m, Phần II: 9m, Phần III: 5m) và bảng đánh giá kỹ thuật (Assessment).
   * *Kiểm chứng và hiệu chỉnh thủ công:* Sinh viên trực tiếp yêu cầu giữ nguyên 100% phần nội dung Joint In-class Activity (từ phút 0:25 đến 0:40) và giữ nguyên toàn bộ kịch bản 2 về Feature 09; sinh viên loại bỏ các câu hỏi trắc nghiệm/bài tập do AI tự sinh thừa trước đó để đảm bảo kịch bản đúng trọng tâm.
2. **Về việc rà soát mã nguồn & Workflow CI:**
   * Sinh viên tự kiểm tra đối chiếu mã nguồn `backend/tests/coupon.test.js` (dòng 181–207) và `.github/workflows/eshop-ci.yml` (dòng 166–190) để xác thực tính khả thi của 2 điểm mới trước khi đưa vào báo cáo và kịch bản.
3. **Về việc loại bỏ giới hạn slide:**
   * Sinh viên đã rà soát toàn bộ các file trong thư mục `docs/`, yêu cầu AI chỉ xóa cụm từ `"≤ 15 trang"` / `"15 slides"` mà không làm thay đổi các bảng biểu, số liệu thực nghiệm hay cấu trúc của `docs/Report.md` và `docs/seminar_slide.md`.
4. **Về Báo cáo Tiến độ Tuần 7:**
   * Sinh viên kiểm soát chặt chẽ thông tin: không suy diễn nhiệm vụ hay số giờ của các thành viên khác; chỉ ghi nhận công việc thực tế (Dương Nhật Cường merge PR #18, Trần Gia Cường hoàn thiện kịch bản thuyết trình, Tuấn và Huy tham gia rà soát nội bộ và không phát sinh commit trên Git).
