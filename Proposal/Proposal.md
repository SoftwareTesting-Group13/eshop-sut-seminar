# PROPOSAL SEMINAR: CI/CD & TEST HARNESS ENGINEERING
**Chủ đề:** T07 — CI/CD & Test Harness Engineering  
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu
**Giảng viên phụ trách:** TS. Lâm Quang Vũ, TS. Trần Duy Hoàng, ThS. Trương Phước Lộc, ThS. Hồ Tuấn Thanh 
**Hệ thống kiểm thử (SUT):** EShop System (Node.js/Express Backend, SQLite3, Vite/React Frontend)  

### Thông tin nhóm sinh viên thực hiện:
* **23120102** — Nguyễn Ngọc Minh Tuấn
* **23120223** — Dương Nhật Cường
* **23120225** — Trần Gia Cường
* **23120273** — Nguyễn Gia Huy

---

# MỤC LỤC
1. [Nội dung lý thuyết liên quan đến chủ đề Seminar](#1-nội-dung-lý-thuyết-liên-quan-đến-chủ-đề-seminar)
   * 1.1. DevOps và mối liên hệ với CI/CD
   * 1.2. Nguyên lý hoạt động của CI/CD
   * 1.3. Kiến trúc Test Harness Engineering trong quy trình kiểm thử
   * 1.4. Thiết lập Quality Gates tự động trong Pipeline
   * 1.5. Thách thức cốt lõi: Vấn nạn Flaky Test và chi phí gỡ lỗi (Triage)
   * 1.6. Ba trụ cột kiểm thử tự động trong môi trường CI/CD
2. [Khảo sát và So sánh, Đánh giá các công cụ](#2-khảo-sát-và-so-sánh-đánh-giá-các-công-cụ)
   * 2.1. Danh mục các công cụ khảo sát
   * 2.2. Khung tiêu chí đánh giá chuẩn môn học
   * 2.3. Tóm tắt kết quả đánh giá và so sánh
   * 2.4. Đề xuất bộ công cụ chủ đạo và phân vai
3. [Trình bày chi tiết, Hướng dẫn sử dụng và Kịch bản Demo 3 công cụ chính](#3-trình-bày-chi-tiết-hướng-dẫn-sử-dụng-và-kịch-bản-demo-3-công-cụ-chính)
   * 3.1. Công cụ trọng tâm: GitHub Actions (Nền tảng CI/CD Pipeline & Tự động hóa Unit Testing)
   * 3.2. Công cụ hỗ trợ 1: Jest (Test Engine thực thi Unit Testing trong CI/CD)
   * 3.3. Công cụ hỗ trợ 2: AI-Augmented Log Triage (Hỗ trợ phân tích log lỗi kiểm thử trên CI/CD)
4. [Minh họa chi tiết 3 thành phần kiểm thử: Record & Playback, Data-Driven, Checkpoints](#4-minh-họa-chi-tiết-3-thành-phần-kiểm-thử-record--playback-data-driven-checkpoints)
5. [Khả năng áp dụng AI, Tính tổng quát hóa và Khả năng tái sử dụng](#5-khả-năng-áp-dụng-ai-tính-tổng-quát-hóa-và-khả-năng-tái-sử-dụng)

---

## 1. NỘI DUNG LÝ THUYẾT LIÊN QUAN ĐẾN CHỦ ĐỀ SEMINAR

### 1.1. DevOps và mối liên hệ với CI/CD
* Khái niệm DevOps
* Vòng đời DevOps (DevOps Lifecycle): Plan → Code → Build → Test → Release → Deploy → Operate → Monitor
* Mối liên hệ kỹ thuật giữa DevOps và CI/CD
* **Định vị trong môn Kiểm thử phần mềm (Testing vs. DevOps):** Khác với môn DevOps tập trung vào hạ tầng và triển khai (Build, Docker, Deploy, Kubernetes), trong phạm vi môn Kiểm thử phần mềm, **CI/CD đóng vai trò là hạ tầng điều phối kiểm thử tự động (Automated Test Harness Infrastructure)**. Hệ thống CI/CD tự động khởi tạo môi trường runner sạch, nạp dữ liệu kiểm thử (fixtures), cô lập môi trường và điều phối thực thi các bộ test.
* **Unit Testing — Rào chắn chất lượng đầu tiên (First Quality Gate):** Unit Testing là nội dung kiểm thử thực thi cốt lõi (testing payload) được tích hợp trực tiếp vào CI/CD workflow theo nguyên lý *Shift-Left Testing*. Thay vì đợi kiểm thử thủ công ở giai đoạn sau, Unit Test đóng vai trò là rào chắn chất lượng tự động ngăn chặn lỗi phát sinh ngay từ từng commit/pull request của lập trình viên.


### 1.2. Nguyên lý hoạt động của CI/CD
* Vấn đề thực tế: Bài toán "Integration Hell"
* Continuous Integration (CI — Tích hợp liên tục)
* Vai trò trung tâm của Unit Testing trong CI (Shift-Left Testing, Fail-Fast)
* Continuous Delivery (CD — Chuyển giao liên tục)
* Continuous Deployment (CD — Triển khai liên tục)

### 1.3. Kiến trúc Test Harness Engineering trong quy trình kiểm thử
* Định nghĩa và vai trò của Test Harness
* 4 Thành phần kiến trúc cốt lõi của Test Harness:
  1. Test Execution Engine (Bộ điều phối & thực thi kiểm thử)
  2. Test Data Repository & Fixtures Management (Quản lý dữ liệu kiểm thử & Fixtures)
  3. Stubs & Mocks (Thành phần giả lập phụ thuộc)
  4. Results Logging & Reporting (Ghi nhận kết quả & Báo cáo)

### 1.4. Thiết lập Quality Gates tự động trong Pipeline
* Khái niệm và nguyên lý hoạt động của Quality Gates
* Các tiêu chí Quality Gates tiêu biểu trong CI/CD:
  * Code Quality & Linting
  * Unit Test Pass Rate (100% Pass)
  * Code Coverage Threshold (≥ 80% Lines/Branches)
  * Security Vulnerability Scan

### 1.5. Thách thức cốt lõi: Vấn nạn Flaky Test và chi phí gỡ lỗi (Triage)
* Bản chất của Flaky Test
* Các nguyên nhân kỹ thuật gây Flaky Test:
  * Async / Timing Issues
  * Concurrency & Race Condition
  * Shared State & Data Leakage
  * External Network Dependencies
* Hậu quả thực tế: Giảm độ tin cậy của Test Suite và chi phí Triage log lỗi

### 1.6. Ba trụ cột kiểm thử tự động trong môi trường CI/CD
1. **Record and Playback (Ghi nhận và Phát lại):** Execution Recording, Snapshot Testing, Artifacts & Trace Log
2. **Data-driven Testing (Kiểm thử hướng dữ liệu):** Tách biệt Test Logic và Test Datasets tham số hóa
3. **Checkpoints (Điểm kiểm định chất lượng):** Assertions, Coverage Checkpoints, Quality Gate Status Checks

---

## 2. KHẢO SÁT VÀ SO SÁNH, ĐÁNH GIÁ CÁC CÔNG CỤ

> [!NOTE]
> Toàn bộ nội dung khảo sát chi tiết, bảng ma trận đánh giá 5 công cụ qua 5 tiêu chí chuẩn và phân tích ưu/nhược điểm chuyên sâu được tách riêng tại file: [toolSurvey.md](./toolSurvey.md).

### 2.1. Danh mục các công cụ khảo sát
* **Nhóm công cụ truyền thống (Traditional CI/CD & Test Framework):**
  * `GitHub Actions`: Nền tảng CI/CD cloud-native chủ đạo (Trọng tâm cốt lõi).
  * `Jenkins`: Nền tảng CI/CD mã nguồn mở self-hosted.
  * `Jest`: Test Engine thực thi Unit Testing trong môi trường Node.js (Công cụ hỗ trợ).
* **Nhóm công cụ ứng dụng AI (AI-Augmented Testing & Triage):**
  * `Datadog Flaky Test Management (FTM)`: Giám sát telemetry và phát hiện flaky test dựa trên dữ liệu lịch sử.
  * `Launchable / Sealights`: Ứng dụng Machine Learning để tối ưu hóa việc chọn test case (Test Impact Analysis).
  * `LLM-Powered Log Triage Action`: Tiện ích mở rộng sử dụng LLM API tự động phân tích log lỗi, xây dựng cây giả thuyết và gợi ý sửa code trên PR (Công cụ hỗ trợ).

### 2.2. Khung tiêu chí đánh giá chuẩn môn học
1. Chi phí bản quyền (Licence Cost)
2. Độ dốc học tập (Learning Curve)
3. Mức độ phù hợp với hệ thống EShop (EShop Fit)
4. Năng lực ứng dụng AI (AI Capability)
5. Cộng đồng & Hệ sinh thái (Ecosystem & Community)

### 2.3. Tóm tắt kết quả đánh giá và so sánh
* **GitHub Actions vs. Jenkins:** GitHub Actions vượt trội về khả năng tích hợp sẵn có với repo GitHub của EShop, không tốn chi phí hạ tầng, cấu hình YAML trực quan và hỗ trợ ma trận kiểm thử linh hoạt; trong khi Jenkins đòi hỏi chi phí bảo trì và quản trị máy chủ phức tạp.
* **Datadog FTM / Launchable vs. LLM Log Triage Action:** Các giải pháp doanh nghiệp (Datadog/Launchable) đắt đỏ và cần dữ liệu lịch sử lớn; trong khi LLM Log Triage Action có chi phí cực thấp, triển khai tức thì, đọc hiểu ngữ cảnh log lỗi sâu và trực tiếp gợi ý đoạn mã sửa lỗi cho sinh viên.

### 2.4. Đề xuất bộ công cụ chủ đạo và phân vai
* **Công cụ trọng tâm:** `GitHub Actions` — Nền tảng điều phối Pipeline CI/CD và áp đặt rào chắn Quality Gates tự động.
* **Công cụ hỗ trợ 1:** `Jest` — Test Engine thực thi toàn bộ Unit Testing cho phân hệ Backend Node.js/Express của EShop.
* **Công cụ hỗ trợ 2:** `LLM-Powered Log Triage Action` — Tiện ích mở rộng AI tự động chẩn đoán log lỗi khi pipeline thất bại.  
*(Chi tiết ma trận so sánh định lượng và lý do lựa chọn xem tại [toolSurvey.md](./toolSurvey.md))*

---

## 3. TRÌNH BÀY CHI TIẾT, HƯỚNG DẪN SỬ DỤNG VÀ KỊCH BẢN DEMO 3 CÔNG CỤ CHÍNH

> [!NOTE]
> Chi tiết kịch bản demo, sơ đồ pipeline, code mẫu và script AI Triage xem tại: [Demo_Plan.md](./Demo_Plan.md).

### 3.1. CÔNG CỤ TRỌNG TÂM: GITHUB ACTIONS (Nền tảng CI/CD Pipeline & Tự động hóa Unit Testing)

* **Vai trò:** "Trung tâm chỉ huy" điều phối toàn bộ pipeline — khởi tạo runner sạch, cài đặt môi trường, chạy Unit Test tự động, áp đặt Quality Gates, upload artifacts và kích hoạt AI Log Triage khi pipeline thất bại.
* **Cơ chế rào chắn Branch Protection & Pull Request Gate:** GitHub Actions không chỉ chạy script kiểm thử đơn thuần mà hoạt động như một chốt chặn bảo vệ mã nguồn qua cơ chế **Branch Protection Rules (Required Status Checks)**. Khi lập trình viên mở một Pull Request (PR), toàn bộ bộ Unit Test suites và ngưỡng kiểm tra Code Coverage (Quality Gate) bắt buộc phải vượt qua (Status: Green). Nếu có bất kỳ test case nào thất bại hoặc vi phạm độ bao phủ, nút `Merge Pull Request` sẽ bị **khóa cứng (Blocked)**, ngăn chặn triệt để mã nguồn lỗi được hòa trộn vào nhánh chính (`main`).
* **Thuật ngữ cốt lõi sẽ trình bày:** Workflow, Event/Trigger, Runner, Fail-Fast Mechanism, Test Coverage Gate (≥ 80% — đề xuất nhóm), PR Annotations, Branch Protection Rules.
* **Kế hoạch 3 kịch bản Demo:**
  * *Demo 1:* Khởi tạo workflow `eshop-ci.yml`, demo cache optimization (60s → 5s).
  * *Demo 2:* Commit lỗi Unit Test → pipeline chặn merge → sửa lỗi → pipeline xanh.
  * *Demo 3:* Matrix Testing (Node 18, Node 20) + Branch Protection Rules thực tế.
* **Điểm yếu cần đề cập:**
  * Phụ thuộc hạ tầng GitHub (downtime ảnh hưởng pipeline).
  * Giới hạn tài nguyên runner miễn phí (2 vCPU, 7GB RAM).

---

### 3.2. CÔNG CỤ HỖ TRỢ 1: JEST (Test Engine thực thi Unit Testing trong CI/CD)

* **Vai trò:** Test Engine nội bộ chạy trên Backend Node.js/Express của EShop, cung cấp kết quả Unit Test và Coverage Report cho Quality Gate của GitHub Actions.
* **Đặc điểm kỹ thuật thực tế trên EShop:**
  * Database dùng SQLite file-based (`database.sqlite`); hàm `initDatabase()` reset toàn bộ dữ liệu khi gọi.
  * Phải cấu hình `--runInBand` (chạy tuần tự) để tránh lỗi `SQLITE_BUSY` (File Lock Conflict) — đây là Failure Mode thực tế nhóm sẽ demo.
* **Lỗi nghiệp vụ thực tế phát hiện qua phân tích code:**
  * Hàm tính coupon `percent` trong `server.js` dùng công thức sai (`total_amount * (1 - discount_value)` thay vì `total_amount * discount_value / 100`), dẫn đến `discount_amount` âm. Phát hiện và minh chứng qua Data-Driven Testing với `test.each()`.
* **Kế hoạch 3 kịch bản Demo:**
  * *Demo 1:* Cấu hình Jest + `--runInBand` + `beforeAll`/`afterAll` cho test isolation.
  * *Demo 2:* Data-Driven Testing (`test.each`) phát hiện lỗi coupon thực tế → pipeline fail → fix → xanh.
  * *Demo 3:* Tái hiện Flaky Test (SQLITE_BUSY) bằng cách bỏ `--runInBand` → chạy 10 lần → đo tỷ lệ fail ngẫu nhiên.
* **Điểm yếu:** Jest chỉ chạy ở tầng mã nguồn; cần CI/CD quản lý môi trường và bảo vệ nhánh.

---

### 3.3. CÔNG CỤ HỖ TRỢ 2: AI-AUGMENTED LOG TRIAGE (Hỗ trợ phân tích log lỗi kiểm thử trên CI/CD)

* **Vai trò:** Script Python nhỏ (`ai_triage.py`) đặt trong `.github/scripts/`, được kích hoạt bởi `if: failure()` trong workflow — gửi 100 dòng log lỗi cuối đến LLM API, nhận lại phân tích nguyên nhân và gợi ý sửa lỗi, xuất ra GitHub Step Summary.
* **Thiết kế:** Không dùng Composite Action riêng biệt — chỉ là 1 Python script trong repo EShop, gọi trực tiếp qua `run: python3`.
* **Thuật ngữ cốt lõi:** Log Triage, Hypothesis Tree (Hiện tượng → Nguyên nhân → Hướng khắc phục), Root Cause Analysis.
* **Kế hoạch 3 kịch bản Demo:**
  * *Demo 1:* Tích hợp `if: failure()` + GitHub Secrets cho API Key.
  * *Demo 2:* AI tóm tắt lỗi coupon: so sánh đọc log thủ công (~2 phút) vs AI triage (~15 giây).
  * *Demo 3:* AI chẩn đoán SQLITE_BUSY Flaky → gợi ý `--runInBand`. Đánh giá độ chính xác vs nguy cơ hallucination.
* **Điểm yếu:** Nếu log bị cắt xén thiếu ngữ cảnh, AI có thể đoán sai nguyên nhân.

---

## 4. MINH HỌA CHI TIẾT 3 THÀNH PHẦN KIỂM THỬ: RECORD & PLAYBACK, DATA-DRIVEN, CHECKPOINTS

### 4.1. Record and Playback — áp dụng trong CI/CD EShop
* **Cơ chế 1 — CI Execution Logs & Artifacts:** GitHub Actions ghi lại toàn bộ log thực thi mỗi lần chạy. Kỹ sư có thể "phát lại" (Re-run with debug logging) để tái hiện lỗi chập chờn.
* **Cơ chế 2 — Jest Snapshot Testing:** Ghi nhận (record) cấu trúc response API vào file `.snap`; mỗi lần CI chạy (playback) tự động so khớp với snapshot đã lưu.

### 4.2. Data-Driven Testing — áp dụng trong EShop
* Dùng `test.each()` của Jest để kiểm thử API `POST /api/apply-coupon` với nhiều bộ dữ liệu (coupon hợp lệ, hết hạn, không đủ điều kiện) mà không cần viết lại logic test.
* Phát hiện lỗi công thức `discount_amount` thực tế trong `server.js` — minh chứng rõ nét giá trị của kiểm thử tham số hóa.

### 4.3. Checkpoints — áp dụng đa tầng trong EShop
* **Tầng API:** `expect(res.status).toBe(200)` và kiểm tra response body.
* **Tầng Database:** Truy vấn SQLite xác nhận bản ghi được ghi đúng (bảng `coupon_usage`, `orders`).
* **Tầng CI/CD:** Quality Gate là Checkpoint cao nhất — toàn bộ pipeline bị chặn nếu bất kỳ tầng dưới vi phạm.

---

## 5. KHẢ NĂNG ÁP DỤNG AI, TÍNH TỔNG QUÁT HÓA VÀ KHẢ NĂNG TÁI SỬ DỤNG

### 5.1. Khả năng áp dụng AI trong CI/CD & Test Harness
* **Bài toán AI giải quyết:** Giảm thời gian điều tra log lỗi (triage) — từ đọc thủ công hàng nghìn dòng xuống phân tích tự động trong vài giây.
* **Giá trị vs Hạn chế:** AI gợi ý chính xác khi log đủ ngữ cảnh; nguy cơ hallucination khi log bị cắt hoặc lỗi quá đặc thù.

### 5.2. Tính tổng quát hóa
* Script `ai_triage.py` hoạt động trên **stdout/stderr log chuẩn** + báo cáo JUnit XML — không phụ thuộc ngôn ngữ hay framework cụ thể.
* Có thể áp dụng cho Python/PyTest, Java/JUnit, C#/.NET xUnit — không chỉ Node.js/Jest.

### 5.3. Khả năng tái sử dụng
* Script đặt trong `.github/scripts/` của repo EShop — bất kỳ dự án nào fork repo hoặc copy file script đều có thể dùng lại.
* Cấu hình chỉ cần thêm 1 step `if: failure()` vào workflow hiện có — không cần thay đổi codebase.
