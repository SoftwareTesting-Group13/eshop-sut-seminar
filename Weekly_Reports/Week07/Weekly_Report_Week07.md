# BÁO CÁO TIẾN ĐỘ TUẦN 7 (WEEKLY REPORT — WEEK 07)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo (Node.js/Express, SQLite3, Jest, GitHub Actions)  
**GitHub Repository chính thức:** [SoftwareTesting-Group13/eshop-sut-seminar](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar)  
**Nhóm thực hiện:** Nhóm 13 (4 thành viên)
- **23120102** — Nguyễn Ngọc Minh Tuấn
- **23120223** — Dương Nhật Cường
- **23120225** — Trần Gia Cường
- **23120273** — Nguyễn Gia Huy

---

## 1. TỔNG KẾT TÌNH HÌNH TUẦN 7

1. **Bối cảnh dự án:**
   - Tại mốc Tuần 6, nhóm đã hoàn thành **90% khối lượng công việc** của toàn bộ đề tài seminar (đã đóng gói đầy đủ gói sản phẩm Pre-share: User Guide tiếng Anh, bộ slide thuyết trình, video demo screencast, kịch bản tương tác lớp học và hồ sơ kiểm chứng thực nghiệm).
   - Do đó, khối lượng công việc trong Tuần 7 chủ yếu tập trung vào: **bảo trì, rà soát tính nhất quán tài liệu, chuẩn bị diễn tập kịch bản thuyết trình phân vai và tinh chỉnh các chi tiết kỹ thuật cho buổi báo cáo chính thức**.

2. **Các kết quả trọng tâm trong tuần:**
   - **Tài liệu Báo cáo Seminar mới:** Dương Nhật Cường hoàn thiện bản báo cáo tổng kết chuẩn hóa [docs/new-report.md](../../docs/new-report.md) (356 dòng, chuẩn hóa cấu trúc lý thuyết DevOps/CI/CD, bảng so sánh công cụ và phân tích 3 kịch bản thực nghiệm SUT), đã hợp nhất vào nhánh `main` qua **Pull Request #18**.
   - **Kịch bản Thuyết trình Phân vai:** Trần Gia Cường hoàn thiện tài liệu [docs/PresentationScript.md](../../docs/PresentationScript.md) (phân bổ thời lượng chi tiết 20 phút cho 4 thành viên, phân định rõ phạm vi giữa hai nhóm seminar, tích hợp hoạt động Joint In-class Activity và phân tích 2 điểm kỹ thuật đổi mới).
   - **Rà soát Slide:** Lược bỏ toàn bộ các ràng buộc/đề cập về giới hạn số lượng slide trong toàn bộ tài liệu dự án để nhóm chủ động linh hoạt cấu trúc nội dung trình chiếu.

---

## 2. BẢNG TIẾN ĐỘ CÔNG VIỆC TUẦN 7 (PHÂN CÔNG VẮN TẮT)

| Thành viên | Nhiệm vụ chính Tuần 7 | Trạng thái | Đánh giá kết quả |
| :--- | :--- | :---: | :--- |
| **Nguyễn Ngọc Minh Tuấn** | Rà soát bộ Slide thuyết trình & kịch bản phân vai seminar | Hoàn thành | Đã rà soát các slide kỹ thuật và khớp nối timeline thuyết trình |
| **Dương Nhật Cường** | Hoàn thiện Báo cáo Seminar mới (`docs/new-report.md`) & rà soát video demo | Hoàn thành | Đã biên soạn và merge thành công PR #18 vào `main` (kèm 10 diagram/evidence assets) |
| **Trần Gia Cường** | Hoàn thiện kịch bản thuyết trình (`docs/PresentationScript.md`), đối soát 2 điểm kỹ thuật đổi mới, chuẩn hóa hồ sơ tuần | Hoàn thành | Hoàn tất kịch bản 20m; đối soát kỹ thuật DB checkpoint & AI PR comment; rà soát bỏ giới hạn slide |
| **Nguyễn Gia Huy** | Rà soát hoạt động tương tác Joint In-class Activity & dữ liệu thực nghiệm | Hoàn thành | Đã rà soát phương án phối hợp điều phối ca thực hành phân tích log với Nhóm bạn |

---

## 3. NỘI DUNG CHI TIẾT 2 ĐIỂM KỸ THUẬT ĐỔI MỚI TRONG KỊCH BẢN THUYẾT TRÌNH

Kịch bản thuyết trình mới tại [docs/PresentationScript.md](../../docs/PresentationScript.md) tập trung làm nổi bật 2 điểm cải tiến kỹ thuật thực chiến so với các kịch bản sơ khai:

### 3.1. Điểm mới 1: Database Checkpoint trên bảng `coupon_usage` (SQLite — Feature 09)
* **Bản chất kỹ thuật:** Trong kiểm thử tự động tầng Backend, việc chỉ dừng lại ở Checkpoint API (kiểm tra HTTP Status 200/400 và JSON body) là chưa đủ. Một Test Harness vững chắc cần xác thực tính bền vững của dữ liệu (**Database Persistence Checkpoint**).
* **Ứng dụng trên EShop:**
  * Kiểm tra việc ghi nhận lượt sử dụng coupon của người dùng vào bảng `coupon_usage` trong cơ sở dữ liệu SQLite sau khi đơn hàng được áp dụng thành công.
  * Xác thực quy tắc bất biến nghiệp vụ: Mỗi người dùng chỉ được sử dụng mã giảm giá giới hạn số lần cho phép (ngăn chặn tái sử dụng mã `SAVE10` khi đã chạm giới hạn).
  * Kết hợp kiểm thử tham số hóa **Data-Driven Testing với `test.each`** để bao phủ toàn bộ ma trận ca kiểm thử (coupon percent, fixed amount, mã hết hạn, đơn hàng dưới ngưỡng).

### 3.2. Điểm mới 2: Tự động xuất bản nhận định AI Triage trực tiếp lên GitHub Pull Request
* **Bản chất kỹ thuật:** Khác với việc chỉ in log ra terminal hoặc ghi file báo cáo cục bộ, hệ thống CI/CD được nâng cấp để bot AI tự động phân tích và phản hồi trực tiếp vào giao diện làm việc của lập trình viên.
* **Cơ chế triển khai trong CI:**
  * Khi job kiểm thử `backend-test` thất bại trên Pull Request, workflow GitHub Actions tự động kích hoạt job `ai-triage`.
  * Script `.github/scripts/ai_triage.py` gửi log kiểm thử trích xuất và ngữ cảnh mã nguồn liên quan về Google Gemini API (`gemini-3.5-flash-lite`).
  * Action `actions/github-script@v8` với quyền `pull-requests: write` tự động tìm kiếm hoặc khởi tạo comment trên PR (nhận diện qua marker ẩn `<!-- eshop-ai-triage -->`) để cung cấp:
    1. *Tóm tắt lỗi (Failure Summary)*
    2. *Cây giả thuyết nguyên nhân gốc rễ (Hypothesis Tree)*
    3. *Đoạn mã đề xuất sửa lỗi (Suggested Fix Diff)*
* **Lợi ích thực tế:** Giúp người kiểm thử và lập trình viên nhận diện ngay nguyên nhân rớt test mà không cần tốn thời gian tải hay đọc hàng ngàn dòng log thô trong tab GitHub Actions.

---

## 4. DANH MỤC TÀI LIỆU LIÊN QUAN TRONG TUẦN 7

* **Tài liệu Báo cáo Seminar mới:** [docs/new-report.md](../../docs/new-report.md)
* **Kịch bản Thuyết trình Phân vai chi tiết:** [docs/PresentationScript.md](../../docs/PresentationScript.md)
* **Bản kê khai sử dụng AI Tuần 7:** [AI Usage Declaration.md](./AI%20Usage%20Declaration.md)
* **Nhật ký commit Git tổng hợp Tuần 7:** [Git Commit Log Total.md](./Git%20Commit%20Log%20Total.md)
* **Workflow CI tích hợp AI PR Comment:** [.github/workflows/eshop-ci.yml](../../.github/workflows/eshop-ci.yml)
* **Thư mục ảnh minh chứng:** [screenshots/](./screenshots/)

---

## 5. KHU VỰC MINH CHỨNG TRỰC QUAN (VISUAL EVIDENCE)

> [!NOTE]
> Mọi file ảnh minh chứng được lưu trữ tại thư mục `Weekly_Reports/Week07/screenshots/` phục vụ cho việc đối soát và nghiệm thu tiến độ Tuần 7.

1. **Minh chứng Kế hoạch Phối hợp Seminar giữa 2 Nhóm:**
   * **File:** [screenshots/coordinationPlan.png](./screenshots/coordinationPlan.png)
   * **Mô tả:** Ảnh chụp bảng phân định ranh giới nội dung và kịch bản phối hợp giữa Nhóm 10 (Nền tảng & Hạ tầng CI/CD) và Nhóm 13 (Test Harness Engineering, Data-Driven Testing, Concurrency Bug và AI-Triage PR comment).
2. **Minh chứng Kịch bản Thuyết trình Phân vai Chi tiết (20 phút):**
   * **File:** [screenshots/presentationScript.png](./screenshots/presentationScript.png)
   * **Mô tả:** Ảnh chụp giao diện tài liệu kịch bản thuyết trình phân vai ([docs/PresentationScript.md](../../docs/PresentationScript.md)) với phân bổ thời lượng chi tiết từng phút cho 4 thành viên và hoạt động tương tác Joint In-class Activity.
