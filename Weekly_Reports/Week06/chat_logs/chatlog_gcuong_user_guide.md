# NHẬT KÝ TRAO ĐỔI VỚI AI (PROMPT / CHAT LOG) — TUẦN 6
**Họ và tên:** Trần Gia Cường  
**Mã số sinh viên (MSSV):** 23120225  
**GitHub Username:** `trancuonG05`  
**Công cụ AI sử dụng:** Antigravity IDE Assistant (Google DeepMind)  
**Phiên bản Model:** Gemini 3.8 Flash (High / Medium)  
**Nhiệm vụ chính:** Biên soạn tài liệu `User_Guide.md` tiếng Anh, phân tích 3 Mandatory Failure Modes, thiết kế sơ đồ kiến trúc Mermaid, quản lý chất lượng theo `Checklist.md`.

---

## 1. MỤC TIÊU CÔNG VIỆC CẦN AI HỖ TRỢ TRONG TUẦN 6
1. **Thiết lập kế hoạch hành động cá nhân:** Soạn thảo file `Seminar_CI-CD/Me/MyPlanW6.md` theo phương pháp Commit-Driven, chia nhỏ giai đoạn thực hiện và tích hợp đối soát 5 Quality Gates của `Plan/Checklist.md`.
2. **Khởi tạo khung tài liệu `User_Guide.md`:** Xây dựng mục lục tiếng Anh chuẩn 7 phần theo Rubric môn học, tích hợp checklist đối soát chéo với các thành viên trong nhóm.
3. **Phân tích kỹ thuật chuyên sâu Failure Mode 1:** Làm rõ nguyên nhân lỗi `SQLITE_BUSY: database is locked`, đối chiếu giữa cơ chế multi-worker của Jest và cơ chế file lock POSIX/Windows của SQLite; phân tích ý nghĩa và giải pháp sử dụng cờ `--runInBand` (`-i`).
4. **Phân tích kỹ thuật chuyên sâu Failure Mode 2:** Phân tích lỗi toán học của công thức tính giảm giá phần trăm (`discount_amount` bị âm, đội giá đơn hàng gấp 10 lần) trong `backend/server.js`, xây dựng kịch bản Data-Driven Unit Testing (`test.each`) và kỹ thuật chặn cận (defensive boundary clamping).
5. **Kiểm tra tính chuẩn tắc Markdown & Rà soát ngữ pháp tiếng Anh:** Đảm bảo không dùng ký tự LaTeX math `$...$` gây lỗi render trên GitHub, dùng ký tự Unicode chuẩn (`≥`, `≤`, `→`).

---

## 2. CÁC CÂU PROMPT TIÊU BIỂU (PROMPTS LOG)

### Prompt 1 (Lập Kế hoạch cá nhân Tuần 6):
> *"Viết c:\04_KTPM\CSC13003-CQ-Software Testing-CT4-VN\Seminar_CI-CD\Me\MyPlanW6.md cho tôi"*

### Prompt 2 (Phân tích sự phụ thuộc & thiết lập nhánh Git):
> *"Viết user_guide có liên quan/phụ thuộc đến công việc của người khác không. Thực hiện bước 1.1 nhưng đặt tên nhánh là gcuong"*

### Prompt 3 (Triển khai Giai đoạn 1 & Khung User Guide):
> *"thực hiện giai đoạn 1 THIẾT KẾ KHUNG TÀI LIỆU User_Guide.md và push lên."*  
> *Yêu cầu bổ sung:* *"Đầu file thêm checklist các phần cần xem lại khi các thành viên khác đã hoàn thành. Viết ngắn gọn"*

### Prompt 4 (Soạn thảo Failure Mode 1):
> *"Soạn thảo Failure Mode 1 — SQLite Concurrency Lock"*

### Prompt 5 (Hỏi sâu về cờ lệnh kỹ thuật Jest):
> *"Thêm cờ --runInBand (hoặc -i) để làm gì?"*

### Prompt 6 (Soạn thảo Failure Mode 2 & Quản lý hồ sơ tuần):
> *"Soạn thảo Failure Mode 2 — Coupon Percent Formula Bug. Tạo file chatlogs. Điền các file liên quan mỗi ghi thực hiện xong 1 bước/commit nào đó."*

---

## 3. NHẬT KÝ TRAO ĐỔI CHI TIẾT (AI RESPONSE LOG)

### 3.1. Về Kế hoạch cá nhân và Tính phụ thuộc công việc:
- **Tư vấn của AI:** `User_Guide.md` là tài liệu "xương sống tri thức" kết nối cả nhóm:
  - Mục 4 & 5 liên quan đến workflow CI/CD và kịch bản video screencast của Dương Nhật Cường.
  - Mục 6.2 đồng bộ 21 test Data-Driven coupon và slide của Nguyễn Ngọc Minh Tuấn.
  - Mục 5.3 & 6.3 liên quan đến script `ai_triage.py` và số liệu đo Flake rate của Nguyễn Gia Huy.
  - Tuy nhiên, sinh viên hoàn toàn có thể chủ động viết độc lập trước toàn bộ khung, 3 failure modes và các sơ đồ kiến trúc; chỉ cần đối soát lại ở bước Review cuối cùng.
- **Thực thi Git:** AI tự động chạy các lệnh `git checkout main`, `git pull origin main`, `git checkout -b gcuong` và cập nhật toàn bộ tên nhánh trong `MyPlanW6.md`.

### 3.2. Về Khung tài liệu `User_Guide.md`:
- AI khởi tạo đầy đủ 7 mục theo Rubric, có Table of Contents với anchor links điều hướng.
- Bổ sung khối Alert `> [!IMPORTANT]` tóm tắt checklist đối soát chéo với Tuấn, D.N. Cường và Huy ngay đầu tài liệu theo chỉ đạo của sinh viên.
- Đã commit `2cb8b4c` và push lên nhánh `gcuong` tại GitHub repository.

### 3.3. Về Failure Mode 1 (SQLite Concurrency Lock):
- AI diễn giải chi tiết 5 trạng thái khóa của SQLite: `UNLOCKED` → `SHARED` → `RESERVED` → `PENDING` → `EXCLUSIVE`.
- Phân tích nguyên nhân Jest worker pool (`CPUs - 1`) cùng truy cập ghi vào `database.sqlite` gây lỗi `SQLITE_BUSY`.
- Diễn giải bản chất cờ `--runInBand` (`-i`): bắt buộc Jest chạy tuần tự từng test suite trên single process, triệt tiêu tranh chấp lock.
- Bổ sung bảng ma trận so sánh 4 giải pháp: `--runInBand`, `PRAGMA busy_timeout`, `WAL mode`, và In-Memory `:memory:`.

### 3.4. Về Failure Mode 2 (Coupon Percent Formula Bug):
- Mổ xẻ chi tiết 2 nhánh code lỗi trong `backend/server.js` (dòng 398–401 và 418–421):
  - Nhầm lẫn tỷ lệ thập phân `0.10` với số nguyên `10`: `(1 - 10) = -9`.
  - Phép nhân `1,000,000 * (-9) = -9,000,000` dẫn đến `final_amount = 10,000,000` (đội giá 10 lần thay vì giảm 10%).
- Trích xuất bộ test Data-Driven kiểm tra invariant: `discount_amount >= 0`, `discount_amount <= total`, và `final_amount < total`.
- Đưa ra giải pháp chuẩn: sửa công thức thành `(total_amount * coupon.discount_value) / 100` kèm kỹ thuật phòng vệ chặn cận `Math.min` và `Math.max`.

### 3.5. Về Failure Mode 3 (Flaky Test do Async Delay - `sleep` vs `await`):
- Phân tích bản chất Flaky test: kết quả bất định do phán đoán thời gian hoàn thành (`sleep(100)`) thay vì đồng bộ tất định.
- So sánh sự khác biệt môi trường: máy local (chạy nhanh, 20ms xong) nên sleep(100ms) pass; trong khi runner CI (GitHub Actions) bị nghẽn CPU/IO (mất 200ms) dẫn đến assertion kiểm tra sớm và fail ngẫu nhiên (Flake rate 40-50%).
- Đối chiếu kịch bản synthetic test `backend/demos/flaky-delay.demo.js` với 3 profile `fast`, `slow`, `random`.
- Đề xuất 3 mẫu thiết kế bất đồng bộ tất định (Deterministic Asynchronous Patterns): `await Promise`, `events.once`, và polling điều kiện `waitForCondition`.

---

## 4. ĐÁNH GIÁ & HIỆU CHỈNH THỦ CÔNG CỦA SINH VIÊN (HUMAN VERIFICATION)

Trong quá trình làm việc cùng AI, tôi đã trực tiếp kiểm tra, phản biện và hiệu chỉnh các điểm sau:
1. **Quy chuẩn đặt tên nhánh Git:** AI ban đầu đề xuất tên nhánh dài `docs/user-guide-and-failure-modes`, tôi đã yêu cầu rút gọn thành `gcuong` để thao tác nhanh và đồng bộ với các thành viên khác trong nhóm.
2. **Loại bỏ cú pháp LaTeX math:** Phát hiện AI có chèn cú pháp dạng `$\ge 80\%$` trong file Markdown, tôi đã yêu cầu rà soát và chuyển toàn bộ sang ký tự Unicode thuần túy (`≥ 80%`, `→`) để GitHub render không bị vỡ giao diện.
3. **Bổ sung Checklist đầu file:** Nhận thấy tài liệu User Guide có nhiều điểm giao thoa với công việc của Tuấn, D.N. Cường và Huy, tôi đã yêu cầu thêm ngay một bảng checklist đối soát ngắn gọn ở đầu file để tiện theo dõi khi các bạn đẩy code/script lên.
4. **Kiểm chứng mã nguồn thực tế:** Tôi đã tự đối chiếu các dòng code trong `backend/server.js` và `backend/tests/coupon.test.js` để đảm bảo số dòng và logic lỗi được phân tích trong User Guide khớp 100% với mã nguồn hiện tại của dự án.

---

**Xác nhận của sinh viên:**  
*Tôi cam kết toàn bộ nội dung trong tài liệu `User_Guide.md` và kế hoạch tuần đã được tôi tự đọc hiểu, kiểm chứng mã nguồn thực nghiệm và biên tập cẩn thận trước khi xuất bản.*  
**Người khai:** Trần Gia Cường (Ký ngày: 22/10/2026)
