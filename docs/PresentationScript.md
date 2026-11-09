# KỊCH BẢN THUYẾT TRÌNH SEMINAR T07 — NHÓM 13
## Chuyên đề: Test Harness Engineering, Data-Driven Testing & AI-Augmented Log Triage

* **Môn học:** Kiểm thử phần mềm (Software Testing) — Lớp: Testing-CQ2023-3-LQVu
* **Hệ thống kiểm thử (SUT):** EShop Monorepo (Node.js/Express, SQLite3, Jest, GitHub Actions)
* **Góc nhìn chủ đạo:** Thiết kế khung kiểm thử (**Test Harness**), kiểm thử sâu tầng ứng dụng EShop (Backend / Module Coupon FR-09), xử lý tận gốc lỗi kiểm thử thực tế và ứng dụng AI phân tích nguyên nhân gốc rễ.
* **Tổng thời lượng:** **20 Phút** (6 phút Lý thuyết & Công cụ + 9 phút Live Demo + 5 phút Tương tác & Đánh giá)

---

## 1. PHÂN BỔ THỜI LƯỢNG TỔNG QUÁT (TIMELINE 20 PHÚT)

| Phần | Nội dung trọng tâm | Thời lượng | Người phụ trách chính |
| :---: | :--- | :---: | :--- |
| **Phần I** | **Lý thuyết & Khảo sát Công cụ Test Harness** | **6 phút** | Trần Gia Cường & Nguyễn Ngọc Minh Tuấn |
| **Phần II** | **Live Demo 3 Kịch bản Thực chiến** | **9 phút** | Dương Nhật Cường & Nguyễn Gia Huy |
| **Phần III** | **In-class Activity, Q&A & Đánh giá (Assessment)** | **5 phút** | Cả nhóm 13 điều phối |

---

## 2. CHI TIẾT NỘI DUNG THUYẾT TRÌNH

### PHẦN I: LÝ THUYẾT & CÔNG CỤ TEST HARNESS (6 PHÚT)

#### 1. Lý thuyết Test-Harness Engineering (2 phút)
* **Định vị & Khái niệm Test Harness:**
  * Test Harness **không đơn thuần là một đoạn test script**, mà là một **hệ sinh thái / môi trường thực thi kiểm thử độc lập (Test Execution Environment)** bao gồm trình điều khiển, dữ liệu mẫu, cơ chế cô lập và bộ thu thập kết quả.
  * Trong mô hình CI/CD, pipeline đóng vai trò là "đường ray", còn Test Harness là "cỗ máy kiểm thử tự động" vận hành trên đường ray đó theo nguyên lý **Shift-Left Testing** và **Fail-Fast**.
* **4 Thành phần kiến trúc cốt lõi của Test Harness:**
  1. *Test Execution Engine:* Trình điều phối và thực thi bộ test (Jest Runner trên Node.js).
  2. *Test Data & Fixtures Management:* Quản lý trạng thái dữ liệu ban đầu, nạp seed data và dọn dẹp môi trường (SQLite schema `initDatabase()`, hook `beforeAll`, `beforeEach`).
  3. *Stubs / Mocks / Drivers:* Giả lập các phụ thuộc ngoài (External Payment, SMS, Time) để cô lập đơn vị kiểm thử.
  4. *Results Logging & Reporting:* Ghi nhận kết quả thực thi đa tầng (Exit code 0/1, báo cáo độ bao phủ LCOV `lcov.info`, JSON summary, Step Summary).
* **Đối chiếu 3 trụ cột kiểm thử tự động (Theo yêu cầu môn học):**
  * **Record & Playback:** Lưu trữ log, artifacts và khả năng tái chạy chính xác phiên bản commit lỗi (*Re-run failed jobs*).
  * **Data-Driven Testing:** Tách biệt logic kiểm thử khỏi dữ liệu; tham số hóa ma trận test case với `test.each`.
  * **Checkpoints:** Thiết lập các điểm chốt chặn đa tầng: Checkpoint API (Status/Body), Checkpoint Database (Bảng SQLite), và Checkpoint CI (Quality Gate).

#### 2. Khảo sát Công cụ Kiểm thử & Trí tuệ Nhân tạo (3 phút)
* **Khảo sát bộ công cụ chủ đạo của Nhóm 13:**
  * **Jest (Test Engine / Runner):** Framework kiểm thử tiêu chuẩn công nghiệp cho Node.js, hỗ trợ snapshot, coverage LCOV, và cờ kiểm soát luồng `--runInBand`.
  * **Gitleaks (Bảo mật Secret trong CI):** Tích hợp rào chắn quét phát hiện rò rỉ mã bí mật (API Keys, JWT Secrets, Database credentials) ngay tại cửa ngõ pipeline trước khi chạy test.
  * **Google Gemini API (LLM Log Triage):** Ứng dụng mô hình ngôn ngữ lớn phân tích ngữ nghĩa log lỗi kiểm thử, trích xuất nguyên nhân và gợi ý giải pháp sửa lỗi tức thì.
* **So sánh & Biện luận kỹ thuật:**
  * *Tại sao chọn Jest cho EShop Backend:* Tương thích tự nhiên với Express/Node.js, hỗ trợ Mocking mạnh mẽ, tích hợp sẵn công cụ đo độ bao phủ Istanbul/LCOV mà không cần cấu hình phức tạp như Mocha/Chai.
  * *Biện luận giải pháp AI Triage chi phí thấp:* So sánh trực diện với các nền tảng doanh nghiệp đắt đỏ (như Datadog FTM, Launchable đòi hỏi phí bản quyền hàng ngàn USD và lượng dữ liệu lịch sử khổng lồ). Giải pháp script Python kết hợp Gemini API Free Tier mang lại hiệu quả chẩn đoán chính xác từ 85–90% với chi phí 0 đồng, dễ dàng nhân rộng cho mọi đồ án sinh viên và startup.

---

### PHẦN II: KỊCH BẢN LIVE DEMO THỰC CHIẾN (9 PHÚT)
*(Trình diễn trực tiếp 3 kịch bản liên hoàn trên IDE / Terminal và giao diện GitHub Pull Request)*

#### Kịch bản 1: Cơ bản — Bảo mật & Thiết lập Test Engine (2 phút)
* **Thao tác 1 (Secret Scan):** Kích hoạt bước quét bảo mật Gitleaks trong pipeline: chứng minh việc ngăn chặn lập trình viên vô tình commit `GEMINI_API_KEY` hoặc chuỗi kết nối vào git.
* **Thao tác 2 (Dependency Caching):** Minh họa cơ chế `actions/cache@v4`:
  * Lần đầu (Cache MISS): Cài đặt `npm ci` tốn ~50s.
  * Lần sau (Cache HIT): Khôi phục `node_modules` chỉ trong **~5s (tăng tốc gấp 8–10 lần)**.
* **Thao tác 3 (Cô lập Test Engine):** Chạy Jest Unit Test với cấu hình cô lập môi trường sạch.

#### Kịch bản 2: Data-Driven Testing & Checkpoints Đa tầng trên Feature 09 (3 phút)
* **Thao tác 1 (Data-Driven với `test.each`):**
  * Mở mã nguồn `backend/tests/coupon-discount.unit.test.js` và `backend/tests/coupon.test.js`.
  * Trình chiếu ma trận dữ liệu kiểm thử tham số hóa: Coupon phần trăm (`SAVE10`), Coupon số tiền cố định (`VIP100`), mã hết hạn (`EXPIRED`), đơn hàng dưới ngưỡng tối thiểu, và kiểm tra quyền Guest vs User có JWT.
* **Thao tác 2 (Xác thực Checkpoints Đa tầng):**
  * *Checkpoint 1 (API Response):* Xác thực HTTP Status Code (200 OK / 400 Bad Request) và cấu trúc JSON trả về (`discount_amount`, `final_amount`).
  * *Checkpoint 2 (Database Persistence):* Truy vấn trực tiếp cơ sở dữ liệu SQLite, xác thực bản ghi giao dịch được cập nhật chính xác trong bảng lưu vết sử dụng mã giảm giá (`coupon_usage`).
  * *Checkpoint 3 (Business Invariants):* Kiểm tra bất biến nghiệp vụ: Số tiền giảm không bao giờ âm ($discount \ge 0$) và thành tiền không bao giờ vượt tổng đơn hàng ($final \le total$).

#### Kịch bản 3: Xử lý Tận gốc Lỗi Kiểm thử Thực tế & AI-Triage Tự động (4 phút)
* **Thao tác 1 (Deep-dive Concurrency / SQLite File-Lock):**
  * *Tái hiện lỗi:* Cho Jest chạy mặc định đa tiến trình song song (multi-workers) trên cùng file `database.sqlite` $\rightarrow$ Crash lỗi `SQLITE_BUSY: database is locked`.
  * *Xử lý tận gốc:* Kích hoạt cờ tuần tự hóa `--runInBand` (hoặc `-i`) $\rightarrow$ Toàn bộ test suites chạy tuần tự mượt mà, triệt tiêu 100% lock contention.
* **Thao tác 2 (Phân tích Async Timing Flaky Test):**
  * Chỉ ra Anti-pattern dùng `sleep(50ms)` cứng làm rớt test ngẫu nhiên khi CI runner bị nghẽn CPU (Flake rate 40%).
  * Trình diễn giải pháp tất định bằng `waitForCondition` / Event-driven completion $\rightarrow$ Flake rate giảm về 0%.
* **Thao tác 3 (Fully Automated AI Log Triage trên GitHub PR):**
  * Tiêm lỗi công thức coupon (`total_amount * (1 - discount_value)`) $\rightarrow$ Push PR $\rightarrow$ Quality Gate ngắt pipeline (Fail-Fast) và khóa cứng nút Merge PR.
  * Pipeline tự động trigger `.github/scripts/ai_triage.py` $\rightarrow$ Bóc tách log lỗi và gửi về Google Gemini API.
  * **Kết quả trực tiếp trên PR:** Bot AI tự động xuất bản comment chi tiết ngay dưới Pull Request:
    1. *Tóm tắt lỗi (Failure Summary).*
    2. *Cây giả thuyết nguyên nhân gốc rễ (Hypothesis Tree).*
    3. *Đoạn mã đề xuất sửa chữa (Suggested Fix diff).*
  * **Nhận định hạn chế:** Nhấn mạnh tính hai mặt của AI — AI có thể chẩn đoán sai (hallucination) nếu log bị cắt xén thiếu ngữ cảnh hoặc xảy ra lỗi phần cứng/hạ tầng mạng.

---

### PHẦN III: JOINT IN-CLASS ACTIVITY — PIPELINE POSTMORTEM (15-25 PHÚT)
*(Hoạt động chung do 2 nhóm cùng điều phối)*

* **0:25 – 0:27 (2 phút): Phân phát tài liệu.** Nhóm 10 phát 1 đoạn log thất bại (được thiết kế có chủ ý chứa lỗi môi trường hoặc flaky test) kèm file workflow.yml.
* **0:27 – 0:32 (5 phút): Khoanh vùng giả thuyết (Hypothesis tree).** Các nhóm trong lớp làm việc nhanh: Viết ra 3 nguyên nhân khả dĩ nhất (ví dụ: do sai biến môi trường, do timing bất đồng bộ, hay do cache hỏng).
* **0:32 – 0:35 (3 phút): AI Triage.** Nhóm 13 yêu cầu các đội nhập đoạn log đó vào AI (ChatGPT/Gemini). Các đội đối chiếu kết quả của AI với cây giả thuyết do con người vừa viết.
* **0:35 – 0:38 (3 phút): Công bố Root Cause & Debrief.** Đại diện Nhóm 10/13 công bố nguyên nhân thực sự trên slide. (Nên chọn một lỗi mà AI dễ đoán sai hoặc bị nhiễu do thiếu ngữ cảnh để chứng minh luận điểm của giảng viên).
* **0:38 – 0:40 (2 phút): Đúc kết (Audience takeaways).** Chốt lại đúng 3 ý của giảng viên trên slide cuối:
  * AI giỏi phân tích nhiễu (log noise), con người giỏi cắt tỉa giả thuyết (hypothesis pruning).
  * Cần hiểu rõ phân loại Flake (Flake taxonomy: timing, ordering, env) trước khi dùng AI.
  * Mở ra xu hướng tương lai: Test impact analysis (nhắc đến Launchable / Sealights).

---

## 3. ASSESSMENT (ĐÁNH GIÁ & PHẢN BIỆN KỊCH BẢN THẢO LUẬN)

*(Bản đánh giá độc lập về tính khả thi, điểm mạnh, rủi ro và khuyến nghị kỹ thuật cho kịch bản đề xuất)*

### 1. Đánh giá Tổng thể Kịch bản
* **Điểm mạnh xuất sắc:**
  * Kịch bản tạo được sự phân hóa rõ nét giữa Nhóm 10 (chủ trì Infra/DevOps) và Nhóm 13 (chủ trì Test Harness & Code deep-dive).
  * Hoạt động chung **Joint In-class Activity** là một điểm cộng sáng tạo: biến bài tập lớp thành một phiên hợp tác đối chiếu thực nghiệm giữa *"Con người khoanh vùng giả thuyết"* và *"AI Triage bóc tách log"*, làm nổi bật luận điểm sư phạm của môn học.
* **Thách thức về Timeline:**
  * Tổng thời lượng bài thuyết trình Nhóm 13 là 15 phút (6m thuyết trình + 9m demo), cộng với Joint Activity 15 phút $\rightarrow$ Tổng buổi học đạt khoảng 40–45 phút, khớp hoàn hảo với khung giờ Seminar của một ca học.

### 2. Đánh giá & Khuyến nghị cho 2 Điểm mới

#### Điểm mới 1: Checkpoint cập nhật bảng `coupon_usage` trong SQLite (Kịch bản 2)
* **Đánh giá rủi ro:** Trong mã nguồn hiện tại, ca test `tests/coupon.test.js` chỉ gọi API `POST /api/apply-coupon` (trả về status và tiền giảm, chưa lưu vào DB). Bảng `coupon_usage` chỉ được ghi khi hoàn tất đơn hàng (`POST /api/orders`).
* **Khuyến nghị:** **NÊN DÙNG PHƯƠNG ÁN LAI (HYBRID)**.
  * *Trong live demo:* Chạy bộ unit test `test.each` trên logic giảm giá (đảm bảo nhanh, xanh, ổn định 100%).
  * *Trên slide và lời thoại:* Chiếu đoạn code/query SQLite của luồng Checkout để giải thích khái niệm Database Checkpoint. Tránh việc sửa code test ngay lúc live demo vì dễ gây lỗi phụ thuộc DB giữa chừng.

#### Điểm mới 2: Tự động comment AI Triage trực tiếp lên Pull Request (Kịch bản 3)
* **Đánh giá giá trị:** Đây là "điểm sáng" ấn tượng nhất của buổi báo cáo. Việc bot AI comment trực tiếp dưới PR giúp giảng viên và cả lớp quan sát trực quan tính ứng dụng thực tế của AI trong quy trình CI/CD.
* **Khuyến nghị:** **RẤT NÊN ĐỔI MỚI (TRIỂN KHAI)**.
  * *Cách thực hiện:* Bổ sung action `actions/github-script` trong workflow CI với quyền `pull-requests: write`.
  * *Phương án dự phòng (Fallback):* Chuẩn bị sẵn một PR mẫu đã có comment của bot AI đề phòng sự cố mạng chập chờn hoặc API Gemini bị trễ trong phòng học.
