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

### Prompt 5 (Soạn thảo Failure Mode 2 & Quản lý hồ sơ tuần):
> *"Soạn thảo Failure Mode 2 — Coupon Percent Formula Bug. Tạo file chatlogs. Điền các file liên quan mỗi ghi thực hiện xong 1 bước/commit nào đó."*

### Prompt 6 (Soạn thảo Failure Mode 3 & Đổi tên chat log):
> *"Soạn thảo Failure Mode 3 — Flaky Test do Async Delay (sleep vs await). Đổi tên chatlog thành chatlog_gcuong_user_guide.md. Git commit và push."*

### Prompt 7 (Thiết kế Sơ đồ 1 - Kiến trúc Monorepo & Test Harness):
> *"Thiết kế Sơ đồ 1 — Kiến trúc Tổng thể Monorepo & Test Harness: Thể hiện rõ các thành phần React Frontend, Express Backend API, SQLite3 Storage, và Jest Test Harness Engine kết nối với GitHub Actions. Cú pháp Mermaid graph TD rõ ràng, có phân nhóm subgraph."*

### Prompt 8 (Thiết kế Sơ đồ 2 - Luồng CI/CD Pipeline & Quality Gate Fail-Fast):
> *"Thiết kế Sơ đồ 2 — Luồng CI/CD Pipeline & Quality Gate Fail-Fast"*  
### Prompt 9 (Thiết kế Sơ đồ 3 - Cơ chế SQLite Concurrency File-Locking):
> *"Thiết kế Sơ đồ 3 — Cơ chế SQLite Concurrency File-Locking"*  
> *Khắc phục lỗi render:* Xử lý lỗi Parse error Mermaid do dấu ngoặc đơn `(Write)` trong nhãn cạnh và ký hiệu `<->`.

### Prompt 10 (Hiệu chỉnh nội dung User Guide trước Giai đoạn 4):
> *"Hãy chỉnh sửa những nội dung @User_Guide.md trước giai đoạn 4 nếu có."*  
> *Nội dung hiệu chỉnh:* Đồng bộ toàn diện các mục 1.3.2 (cây thư mục), 2.1–2.5 (setup, lệnh seed database, biến môi trường), 3.2–3.4 (danh mục 6 test suites, bảng coverage), 4.1–4.2 (nguyên lý CI pipeline, cache dependency), 4.4 (kịch bản cấu hình Branch Protection Rules), 5.1–5.3 (LCOV, matrix build, AI log triage Gemini).

### Prompt 11 (Triển khai Giai đoạn 4 - Step-by-Step Reproduction Guide & Thực nghiệm Local):
> *"thực hiện giai đoạn 4 BIÊN SOẠN STEP-BY-STEP REPRODUCTION GUIDE & THỰC NGHIỆM LOCAL"*  
> *Nội dung triển khai:* Soạn Section 7 gồm 8 mục con chi tiết (Bước A–G) hướng dẫn kiểm tra môi trường, cài đặt, chạy baseline, tái hiện 3 Failure Modes, và quan sát Quality Gate Fail-Fast trên GitHub Actions PR; chạy kiểm chứng thực tế tại terminal local (`npm test`, `test:ci:demo`, `quality-gate`, `test:flaky`), thực hiện Git Commit `74e02da` và push origin `gcuong`.

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

### 3.6. Về Sơ đồ 1 (Kiến trúc Tổng thể Monorepo & Test Harness):
- Thiết kế sơ đồ Mermaid cú pháp `flowchart TB` phân chia 4 phân nhóm `subgraph` rõ ràng:
  1. *Presentation Layer (Clients):* React Customer Web Portal, React Admin Dashboard, Mobile Client.
  2. *Application Layer (Backend SUT):* Express.js Core Server, REST API Controllers, SQLite3 Relational Database (`database.sqlite`).
  3. *Automated Test Harness:* Jest Engine (`--runInBand`, `--forceExit`), Supertest Agent, Test Suites (`health`, `auth`, `coupon`), Coverage Engine (LCOV).
  4. *CI/CD Infrastructure:* GitHub Actions Runner, Dependency Cache (`~/.npm`), Quality Gate Check (Pass 100%, Coverage ≥ 80%), Branch Protection (Hard-Lock Merge Button), AI Log Triage Assistant (`ai_triage.py` + Gemini API).
- Thể hiện đầy đủ các luồng tương tác: HTTP REST calls, Supertest in-memory calls ảo, SQLite file locks tuần tự, và Quality Gate hai trạng thái PASS/FAIL.
- Tối ưu kích thước chữ: in đậm các tựa đề khối chức năng, giữ tựa đề subgraph gọn gàng và điều chỉnh khoảng cách phân tầng `rankSpacing` tránh đè chữ.

### 3.7. Về Sơ đồ 2 (Luồng CI/CD Pipeline & Quality Gate Fail-Fast):
- Thiết kế sơ đồ Mermaid quy chuẩn 5 giai đoạn thực thi trong CI/CD:
  1. *Stage 1 (Trigger & Clean-Room):* Developer Push / Pull Request $\rightarrow$ Kích hoạt GitHub Actions event $\rightarrow$ Khởi tạo VM container độc lập sạch sẽ (`ubuntu-latest`) $\rightarrow$ Checkout mã nguồn (`actions/checkout@v4`).
  2. *Stage 2 (Dependency Cache & Test Harness):* Kiểm tra checksum hash `package-lock.json` phân nhánh **Cache HIT (~8s)** từ local `~/.npm` vs **Cache MISS (~45s)** từ npm Registry $\rightarrow$ Chạy `JestRunner` (`--runInBand --coverage`) $\rightarrow$ Xuất báo cáo JUnit XML & LCOV `lcov.info`.
  3. *Stage 3 (Quality Gate Dual-Check):* Khối hình thoi thẩm định đồng thời: **100% Tests Pass (Exit 0)** VÀ **Coverage $\ge$ 80%**.
  4. *Stage 4A (Success Pathway - Nhánh Xanh):* Trạng thái `PASS` $\rightarrow$ Upload Artifacts $\rightarrow$ Đáp ứng Branch Protection $\rightarrow$ Mở khóa nút **"Merge pull request"**.
  5. *Stage 4B (Fail-Fast Pathway - Nhánh Đỏ):* Trạng thái `FAIL` $\rightarrow$ Ngắt pipeline tức thì (**Fail-Fast**) để tiết kiệm quota runner $\rightarrow$ Khóa cứng nút Merge $\rightarrow$ Khởi chạy `ai_triage.py` (Gemini API) phân tích log lỗi $\rightarrow$ Comment Hypothesis Tree và hướng dẫn khắc phục lên PR.
- **Kỹ thuật xử lý giao diện Mermaid:** Bổ sung điểm neo vô hình (`sp2[ ]:::spacer` với `~~~ CacheEval`) và thuộc tính `white-space: nowrap;` để đẩy hình thoi xuống thấp hơn 1 tầng, giải quyết dứt điểm hiện tượng đỉnh nhọn của hình thoi chèn lên tựa đề nhóm; tăng độ dày nét mũi tên bằng `linkStyle default stroke-width: 2.5px`.

### 3.8. Về Sơ đồ 3 (Cơ chế SQLite Concurrency File-Locking):
- Xây dựng mô hình đối sánh trực quan song song (Side-by-Side Comparison) giữa hai trạng thái kiến trúc:
  - *Nhánh A (Xung đột Concurrency đa luồng không có `--runInBand`):* Khi Jest chạy đa luồng mặc định (`--maxWorkers=4`), Worker 1 thực thi `auth.test.js` chiếm giữ `EXCLUSIVE Lock`. Cùng lúc đó, Worker 2 thực thi `coupon.test.js` gửi thao tác ghi. Hệ điều hành (thông qua cơ chế file lock `fcntl` / `LockFile`) lập tức từ chối vì timeout = 0ms $\rightarrow$ Quăng lỗi `SQLITE_BUSY: database is locked` $\rightarrow$ Pipeline ngắt với Exit Code 1.
  - *Nhánh B (Tuần tự hóa In-Band với cờ `--runInBand` / `-i`):* Bắt buộc Jest chạy đơn luồng trên Main Process. Suite 1 chạy xong, commit và nhả lock thì Suite 2 mới bắt đầu chiếm lock $\rightarrow$ Chu kỳ lock (`UNLOCKED` $\leftrightarrow$ `EXCLUSIVE`) diễn ra nhịp nhàng, triệt tiêu race condition $\rightarrow$ 100% Deterministic Pass với Exit Code 0.
- **Xử lý lỗi Parse Error cú pháp Mermaid:** Khắc phục lỗi parser do dấu ngoặc đơn chưa đóng gói `(Write)` trong nhãn cạnh bằng cách chuẩn hóa sang `1. BEGIN IMMEDIATE - Write`, và thay chuỗi `<->` bằng ký tự Unicode `↔`.

### 3.9. Về Hiệu chỉnh nội dung User Guide trước Giai đoạn 4:
- Thực hiện rà soát chéo toàn bộ các mục từ 1 đến 5 sau khi merge nhánh `main`:
  - Cập nhật cây thư mục 1.3.2 phản ánh chính xác các script mới (`quality-gate.js`, `configure-branch-protection.sh`, `coupon-discount.js`, `jest.config.js`).
  - Sửa lệnh `npm run seed:db` thành `node database.js` vì `package.json` không có script `seed:db`.
  - Thay thế toàn bộ các placeholder `*(To be detailed...)*` trong Mục 4.1 (Nguyên lý Pipeline CI/CD), 4.2 (Chiến lược Cache dependency), 4.4 (Branch Protection Rules & script CLI), 5.1 (LCOV artifact), 5.2 (Node.js runtime matrix), và 5.3 (AI Log Triage Gemini API).

### 3.10. Về Biên soạn Step-by-Step Reproduction Guide & Thực nghiệm Local:
- Soạn thảo Mục 7 trong `User_Guide.md` với bảng tổng kết ma trận quy trình thực nghiệm và 7 bước chi tiết (Bước A–G).
- Thực thi chuỗi lệnh kiểm chứng thực tế tại terminal local:
  - `npm test`: 7/7 test suites pass, 61/61 test cases pass, thời gian chạy ~29.4s, độ bao phủ tổng đạt 78.81% (vượt ngưỡng 70%).
  - `npm run test:ci:demo`: chạy riêng bộ unit test coupon trong 1.2s, độ bao phủ 100%, ghi file `coverage/jest-results.json`.
  - `npm run quality-gate`: kiểm chứng script `quality-gate.js` tại local, xuất kết quả `VERDICT: ✅ QUALITY GATE PASSED`.
  - `npm run test:flaky`: kiểm chứng ca test Flaky với 3 profiles (`fast` pass cả 2, `slow` fail sleep pass await, `random` chứng minh tỷ lệ Flake Rate).
- Thực hiện Git Commit 4 (`74e02da`) và đẩy thành công lên nhánh `gcuong`.

---

## 4. ĐÁNH GIÁ & HIỆU CHỈNH THỦ CÔNG CỦA SINH VIÊN (HUMAN VERIFICATION)

Trong quá trình làm việc cùng AI, tôi đã trực tiếp kiểm tra, phản biện và hiệu chỉnh các điểm sau:
1. **Quy chuẩn đặt tên nhánh Git:** AI ban đầu đề xuất tên nhánh dài `docs/user-guide-and-failure-modes`, tôi đã yêu cầu rút gọn thành `gcuong` để thao tác nhanh và đồng bộ với các thành viên khác trong nhóm.
2. **Loại bỏ cú pháp LaTeX math:** Phát hiện AI có chèn cú pháp dạng `$\ge 80\%$` trong file Markdown, tôi đã yêu cầu rà soát và chuyển toàn bộ sang ký tự Unicode thuần túy (`≥ 80%`, `→`) để GitHub render không bị vỡ giao diện.
3. **Bổ sung Checklist đầu file:** Nhận thấy tài liệu User Guide có nhiều điểm giao thoa với công việc của Tuấn, D.N. Cường và Huy, tôi đã yêu cầu thêm ngay một bảng checklist đối soát ngắn gọn ở đầu file để tiện theo dõi khi các bạn đẩy code/script lên.
4. **Kiểm chứng mã nguồn thực tế:** Tôi đã tự đối chiếu các dòng code trong `backend/server.js` và `backend/tests/coupon.test.js` để đảm bảo số dòng và logic lỗi được phân tích trong User Guide khớp 100% với mã nguồn hiện tại của dự án.
5. **Thực nghiệm chuỗi lệnh local:** Trực tiếp chạy và kiểm tra kết quả terminal của `npm test`, `npm run test:ci:demo`, `npm run quality-gate`, `npm run test:flaky` đảm bảo mọi câu lệnh và thông số ghi trong User Guide đều chính xác 100%.

---

**Xác nhận của sinh viên:**  
*Tôi cam kết toàn bộ nội dung trong tài liệu `User_Guide.md` và kế hoạch tuần đã được tôi tự đọc hiểu, kiểm chứng mã nguồn thực nghiệm và biên tập cẩn thận trước khi xuất bản.*  
**Người khai:** Trần Gia Cường (Ký ngày: 23/10/2026)
