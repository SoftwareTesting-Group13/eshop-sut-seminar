# KẾ HOẠCH THỰC HIỆN SEMINAR T07: CI/CD & TEST-HARNESS ENGINEERING
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu
**Giảng viên phụ trách:** TS. Lâm Quang Vũ, TS. Trần Duy Hoàng, ThS. Trương Phước Lộc, ThS. Hồ Tuấn Thanh 
**Nhóm thực hiện:** Nhóm 13 (4 thành viên)
- **23120102** — Nguyễn Ngọc Minh Tuấn
- **23120223** — Dương Nhật Cường
- **23120225** — Trần Gia Cường
- **23120273** — Nguyễn Gia Huy

**Hệ thống được kiểm thử (SUT):** EShop System (Node.js/Express Backend, SQLite3, Jest Unit/API Testing)  
**Bộ công cụ thực nghiệm:**
* **Công cụ trọng tâm:** GitHub Actions CI/CD Pipeline đóng vai trò là **Hạ tầng kiểm thử tự động (Automated Test Harness)** — tự động khởi tạo runner sạch, tối ưu bộ nhớ đệm (`actions/cache`), áp đặt rào chắn **Quality Gates** (100% test được chọn pass, line coverage module coupon > 70%, Fail-Fast) và bảo vệ nhánh thông qua cơ chế **Branch Protection Rules trên Pull Request**.
* **Công cụ hỗ trợ 1 (Kiểm thử thực thi):** Jest Test Engine — Thực thi Unit Testing và Data-Driven Testing (`test.each`) cho backend, kiểm soát xung đột tài nguyên dùng chung của SQLite file-based qua cờ tuần tự `--runInBand` (giải quyết Failure Mode 1 & 2).
* **Công cụ hỗ trợ 2:** AI-Augmented Log Triage (Script Python `ai_triage.py` trong `.github/scripts/`) — Được kích hoạt có điều kiện khi pipeline thất bại (`if: failure()`), tự động quét log lỗi, dựng Cây giả thuyết (Hypothesis Tree) và xuất báo cáo tóm tắt trên GitHub Step Summary hỗ trợ gỡ lỗi nhanh.

> **Phạm vi CI demo hiện hành:** PR chạy 23 unit test nghiệp vụ trong `coupon-discount.js`; Quality Gate yêu cầu 23/23 pass, **line coverage > 70% của module này** và LCOV. `npm run test:ci` vẫn chạy full backend suite riêng (kiểm tra local 22/10/2026: 58/58 pass, 78.81% line coverage toàn backend). AI Triage chỉ chạy khi PR có Backend Test fail và comment gợi ý trên PR. Chưa có GitHub run mới cho thay đổi chưa commit/push; không trình bày 100% coverage module coupon như độ phủ toàn backend.


---

## 1. TỔNG QUAN LỘ TRÌNH 3 PHASE TINH GỌN

Toàn bộ quy trình 8 giai đoạn chuẩn (**Stage S1 → S8**) từ Đề cương môn học được gộp gọn thành **3 Phase hành động trực tiếp**, tập trung cao độ vào mục tiêu **hoàn thành 90% khối lượng seminar ngay trong Tuần 6**:

```
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│               PHASE 1                │     │               PHASE 2                │     │               PHASE 3                │
│       (Stage S1 - S2 - S3)           │ ──► │          (Stage S4 - S5)             │ ──► │       (Stage S6 - S7 - S8)           │
│   NGHIÊN CỨU & THỰC NGHIỆM SUT       │     │     ĐÓNG GÓI BỘ DELIVERABLES         │     │     BÁO CÁO LIVE & AI AUDIT          │
│        (Tuần 5 – Tuần 6)             │     │      (MỐC 90% TẠI TUẦN 6)            │     │       (Tuần 7 – Tuần 11)             │
├──────────────────────────────────────┤     ├──────────────────────────────────────┤     ├──────────────────────────────────────┤
│ • Proposal.md & toolSurvey.md        │     │ • User_Guide.md (≥6 mục, tiếng Anh)  │     │ • Pre-share trước buổi báo cáo ≥ 3d  │
│ • Setup .github/workflows/ci.yml     │     │ • Demo_Screencast.mp4 (5-8m, EN)     │     │ • Thuyết trình Live 45m (TBD)        │
│ • Jest tests backend + --runInBand   │     │ • Activity_Worksheet.md + Answer Key │     │ • Thu thập Minute Paper (S7)         │
│ • Tái hiện 3 Failure Modes kỹ thuật  │     │ • Seminar_Slides.pptx (≤15 slides)   │     │ • Nộp bộ AI Audit Pack [AI-02..04]   │
│ • Script AI Triage & Đo Metrics      │     │ • Đóng gói link Pre-share sẵn sàng   │     │   trong vòng 5 ngày sau báo cáo      │
└──────────────────────────────────────┘     └──────────────────────────────────────┘     └──────────────────────────────────────┘
```

---

## 2. CHI TIẾT CÁC PHASE & PHÂN CHIA NHIỆM VỤ CỤ THỂ

### PHASE 1: NGHIÊN CỨU KỸ THUẬT & THỰC NGHIỆM TRÊN SUT ESHOP (STAGE S1 – S3 | TUẦN 5 – TUẦN 6)
*Mục tiêu: Hoàn tất phê duyệt đề cương, xây dựng pipeline CI/CD thực tế cho EShop Backend, cài đặt rào chắn Quality Gates, tái hiện 3 Failure Modes và đo đạc số liệu thực nghiệm.*

#### Phân chia đầu việc chi tiết cho 4 thành viên:
1. **Nguyễn Ngọc Minh Tuấn (Lead Lý thuyết & Khảo sát):**
   - **Task 1.1:** Soạn thảo, chuẩn hóa và duy trì file [Proposal.md](./Proposal.md) theo chuẩn khung sườn tinh gọn.
   - **Task 1.2:** Hoàn thiện báo cáo khảo sát [toolSurvey.md](./toolSurvey.md) so sánh định lượng 5 công cụ qua 5 tiêu chí chuẩn.
   - **Task 1.3:** Nộp đề cương lên Moodle (Stage S1) và theo dõi phản hồi phê duyệt từ Giảng viên/TA (Stage S2).
2. **Dương Nhật Cường (Lead CI/CD Pipeline & Hạ tầng):**
   - **Task 1.4:** Khởi tạo thư mục `.github/workflows/` và xây dựng file cấu hình pipeline `eshop-ci.yml` trên runner Ubuntu với Node.js 20.
   - **Task 1.5:** Cấu hình bộ nhớ đệm `actions/cache` cho thư mục `backend/node_modules` dựa trên hash của `package-lock.json`; đo đạc thời gian tối ưu hóa (từ ~60s xuống ~5s).
   - **Task 1.6:** Thiết lập rào chắn **Quality Gate & Branch Protection**: Kiểm tra 100% unit test được chọn pass (Exit Code 0), đo line coverage module coupon bằng LCOV (ngưỡng > 70%), xuất kết quả Jest JSON và LCOV, áp dụng cơ chế Fail-Fast và cấu hình chặn merge PR (Required Status Checks) khi có vi phạm.
3. **Trần Gia Cường (Lead Test Harness Engine & Backend Testing):**
   - **Task 1.7:** Cấu hình Jest Test Engine trong `backend/package.json`, xử lý biến môi trường và thiết lập chạy tuần tự `--runInBand` để khắc phục lỗi **Failure Mode 1: SQLite Concurrency Lock (`SQLITE_BUSY`)**.
   - **Task 1.8:** Viết bộ kiểm thử hướng dữ liệu (Data-Driven Testing với `test.each`) cho API mã giảm giá `POST /api/apply-coupon`.
   - **Task 1.9:** Tái hiện và kiểm chứng **Failure Mode 2: Lỗi nghiệp vụ thực tế trong `backend/server.js`** (công thức coupon percent sai làm số tiền giảm giá âm).
4. **Nguyễn Gia Huy (Lead AI Log Triage & Phân tích Thực nghiệm):**
   - **Task 1.10:** Viết script Python `ai_triage.py` đặt trong `.github/scripts/`, cấu hình bước chạy có điều kiện `if: failure()`, nạp API Key qua GitHub Secrets và xuất Cây giả thuyết (Hypothesis Tree) ra GitHub Step Summary.
   - **Task 1.11:** Xây dựng kịch bản tái hiện **Failure Mode 3: Flaky Test do độ trễ bất đồng bộ (sleep-based)**, cấu hình chạy lặp lại 10 lần trên GitHub Actions để đo Flake Rate.
   - **Task 1.12:** Thu thập bảng số liệu metrics thực nghiệm: Setup Time, Cache Speedup, Flake Rate, AI Triage Value vs. Noise (thời gian chẩn đoán ~15s vs ~2 phút đọc log thủ công).

---

### PHASE 2: ĐÓNG GÓI BỘ SẢN PHẨM DELIVERABLES — MỐC 90% (STAGE S4 – S5 | TUẦN 6)
*Mục tiêu: Đóng gói toàn bộ tri thức kỹ thuật thành tài liệu chuẩn mực, video demo và slide báo cáo, đạt mốc 90% hoàn thành seminar trước khi kết thúc Tuần 6.*

#### Phân chia đầu việc chi tiết cho 4 thành viên:
1. **Trần Gia Cường (Lead Biên soạn User Guide):**
   - **Task 2.1:** Soạn thảo tài liệu `User_Guide.md` bằng Tiếng Anh, đảm bảo tối thiểu 7 mục chuẩn:
     1. Introduction (CI/CD & Test Harness trong EShop).
     2. Prerequisites & Setup (Node.js 20, Git, GitHub Secrets).
     3. First Test Walkthrough (Hướng dẫn từng bước chạy pipeline Jest).
     4. Advanced Usage & CI Integration (Quality Gate line coverage > 70% cho module coupon, AI Triage; nêu rõ full suite chạy riêng).
     5. Troubleshooting (Cache miss, SQLite permission, Timeout).
     6. **Mandatory Failure Modes:** Phân tích chuyên sâu 3 lỗi kỹ thuật thực tế (SQLite concurrency, Coupon logic, Flaky test race condition).
     7. References & AI Disclosure Statement.
   - **Task 2.2:** Tự rà soát kiểm tra lỗi chính tả, câu từ kỹ thuật tiếng Anh và đảm bảo không sử dụng ký tự LaTeX gây lỗi format.
2. **Dương Nhật Cường (Lead Sản xuất Demo Screencast):**
   - **Task 2.3:** Lập kịch bản video chi tiết (Storyboard) độ dài đúng chuẩn **5 – 8 phút**, thao tác 100% trên terminal/IDE/GitHub (tuyệt đối không chiếu slide).
   - **Task 2.4:** Tiến hành quay màn hình (1080p, 60fps) và thu âm thuyết minh rõ ràng, không nhạc nền:
     - `00:00 – 01:30` (1.5m): Cấu trúc Monorepo EShop, kiến trúc Test Harness và workflow GitHub Actions (`actions/cache` warm run vs cold run).
     - `01:30 – 04:00` (2.5m): Developer mở Pull Request chứa lỗi nghiệp vụ coupon percent $\rightarrow$ CI pipeline tự động kích hoạt $\rightarrow$ Chạy Data-Driven Unit Tests $\rightarrow$ Kích hoạt Fail-Fast tại Quality Gate $\rightarrow$ Nút Merge PR bị **KHÓA CỨNG (Blocked)** do Branch Protection Rules.
     - `04:00 – 05:15` (1.25m): AI Log Triage can thiệp (phụ trợ chuyên biệt): Step Summary hiển thị Cây giả thuyết (Hypothesis Tree) tóm tắt nguyên nhân lỗi coupon formula và gợi ý giải pháp sửa chữa.
     - `05:15 – 07:30` (2.25m): Developer sửa lỗi coupon (giải pháp SQLite `--runInBand` trình bày riêng) → Push commit mới lên PR → CI chạy lại, 23/23 unit test pass, line coverage module coupon > 70% → Upload LCOV artifact → Required Status Checks xanh; PR còn cần 1 review approve để merge.
   - **Task 2.5:** Biên tập và nén video tối ưu hóa dung lượng **≤ 100MB** bằng Handbrake/ffmpeg; lưu file `Demo_Screencast.mp4`.
3. **Nguyễn Gia Huy (Lead Thiết kế Hoạt động Lớp học Worksheet):**
   - **Task 2.6:** Soạn thảo tài liệu `Activity_Worksheet.md` cho hoạt động lớp học mang tên **"Pipeline Postmortem: Triaging Flaky CI Runs & Root Cause Analysis"** (thời lượng 20–25 phút).
   - **Task 2.7:** Chuẩn bị sẵn đoạn trích xuất log lỗi CI thực tế và file `workflow.yml` mẫu cho các nhóm sinh viên trong lớp phân tích.
   - **Task 2.8:** Xây dựng phần **Answer Key & Scoring Rubric** (barem chấm điểm nhanh cho nhóm điều phối hoạt động).
4. **Nguyễn Ngọc Minh Tuấn (Lead Slide Thuyết trình & Pre-share):**
   - **Task 2.9:** Thiết kế bộ slide thuyết trình song song cả 2 định dạng: `Seminar_Slides.pptx` (trình chiếu tại lớp) và `Seminar_Slides.md` (tra cứu trực tiếp trên GitHub), tuân thủ nghiêm ngặt quy định: **Tối đa 15 slides**, phong cách thiết kế **chữ đen nền trắng** trang nhã, tương phản cao, ưu tiên sơ đồ kiến trúc, bảng biểu và ảnh chụp thực tế. Đối với video demo, tạo slide tóm tắt các điểm then chốt kèm đường link gắn trực tiếp tới file video.
   - **Task 2.10:** Tổng hợp, kiểm tra tính nhất quán giữa Slide, User Guide, Demo Plan và Worksheet.
   - **Task 2.11:** Đóng gói toàn bộ 4 tài liệu vào link Google Drive / thư mục Moodle sẵn sàng cho việc Pre-share trước buổi báo cáo.

> [!IMPORTANT]
> **ĐÁNH GIÁ MỐC CUỐI TUẦN 6:** Khi hoàn tất Phase 2, nhóm đã sở hữu đầy đủ toàn bộ sản phẩm kỹ thuật và hồ sơ báo cáo (đạt **90% khối lượng toàn bộ seminar**), hoàn toàn chủ động trước bất kỳ lịch báo cáo nào của Giảng viên từ Tuần 7 đến Tuần 11.

---

### PHASE 3: BÁO CÁO TRỰC TIẾP TẠI LỚP & HOÀN TẤT HỒ SƠ (STAGE S6 – S8 | TUẦN 7 – TUẦN 11)
*Mục tiêu: Thực hiện bài báo cáo trực tiếp 45 phút cuốn hút, điều phối hoạt động lớp học đúng giờ, thu thập đánh giá và nộp hồ sơ AI Audit Pack trong vòng 5 ngày làm việc.*

#### 1. Khung chương trình báo cáo trực tiếp 45 phút (Stage S6):
| Thời lượng | Nội dung thực hiện | Trách nhiệm phân vai |
| :--- | :--- | :--- |
| **00:00 – 10:00 (10m)** | **The Pitch:** Đặt vấn đề, phân định CI/CD trong Kiểm thử (Test Harness) vs DevOps thông thường, Unit Test đóng vai trò Quality Gate trên Pull Request. | **Chưa phân công (TBD)** |
| **10:00 – 20:00 (10m)** | **Live Tool Demo:** Thao tác trực tiếp trên PR GitHub: Cache hit $\rightarrow$ Unit Test fail $\rightarrow$ PR Blocked $\rightarrow$ AI Triage tóm tắt log $\rightarrow$ Sửa mã & giải quyết SQLite lock với `--runInBand` $\rightarrow$ PR Green & upload coverage. | **Chưa phân công (TBD)** |
| **20:00 – 40:00 (20m)** | **Class Activity Facilitation:** Điều phối bài tập "Pipeline Postmortem", phát log lỗi cho các nhóm, hướng dẫn làm cây giả thuyết và đối chiếu AI. | **Chưa phân công (TBD)** |
| **40:00 – 45:00 (05m)** | **Wrap-up & Q&A:** Tổng kết thông điệp, trả lời phản biện của Giảng viên và câu hỏi từ các nhóm sinh viên. | **Chưa phân công (TBD)** |


> *Nguyên tắc phân công phần thuyết trình:* Chưa gán tên thành viên cụ thể ở thời điểm hiện tại. Toàn bộ 4 thành viên cùng tham gia chuẩn bị chuyên môn và sẽ họp thống nhất phân vai (người nói, người demo, người điều phối) trước ngày báo cáo chính thức.

#### 2. Thu thập phản hồi lớp học (Stage S7):
- Phổ biến form khảo sát Minute Paper (Google Form / giấy) thu thập đánh giá:
  1. *Một điều tâm đắc nhất học được từ bài seminar?*
  2. *Một điểm kỹ thuật vẫn còn băn khoăn?*
  3. *Đánh giá mức độ hữu ích (thang điểm 1 – 5).*
- Tổng hợp thành file `Audience_Feedback_Aggregated.md`.

#### 3. Hoàn tất Hồ sơ Kiểm toán AI — AI Audit Pack (Stage S8 | Trong vòng 5 ngày sau báo cáo):
- **Nguyễn Ngọc Minh Tuấn:** Chủ trì soạn thảo `[AI-02] AI_Audit_Report.md` (tối thiểu 600 từ, đủ 5 phần: Tool Usage Log, Value Assessment, Risk Mitigation, Critical Review, Compliance Declaration).
- **Cả 4 thành viên:** Ký tên vào bản cam kết minh bạch `[AI-03] AI_Disclosure_Signed.pdf`.
- **Mỗi thành viên (Tuấn, D.N.Cường, T.G.Cường, Huy):** Tự viết 1 bài phản tư cá nhân ~300 từ bằng Tiếng Anh (tập hợp thành `[AI-04] Reflective_Statements.md`).
- **Dương Nhật Cường:** Kiểm tra, đóng gói thư mục `AI_Audit_Pack/` và nộp lên hệ thống Moodle.

---

## 3. CHECKLIST TỔNG HỢP TIẾN ĐỘ & NGHIỆM THU CHI TIẾT

Bảng checklist dưới đây được sử dụng xuyên suốt để theo dõi tiến độ, đánh dấu các công việc đã hoàn thành và lưu trữ ghi chú nghiệm thu:

| STT | Mã Task | Hạng mục công việc chi tiết | Người phụ trách | Hạn chót | Trạng thái | Ghi chú / Sản phẩm nghiệm thu |
| :---: | :---: | :--- | :---: | :---: | :---: | :--- |
| **I** | **PHASE 1** | **NGHIÊN CỨU & THỰC NGHIỆM SUT ESHOP** | | **Tuần 5–6** | | |
| 1 | `T1.1` | Soạn thảo và chuẩn hóa khung sườn Proposal | N.N.M.Tuấn | Tuần 5 | [x] | File [Proposal.md](./Proposal.md) đã clean (194 dòng) |
| 2 | `T1.2` | Báo cáo khảo sát & so sánh 5 công cụ qua 5 tiêu chí | N.N.M.Tuấn | Tuần 5 | [x] | File [toolSurvey.md](./toolSurvey.md) hoàn thiện |
| 3 | `T1.3` | Nộp Moodle Stage S1 & nhận phê duyệt Stage S2 | N.N.M.Tuấn | Tuần 5 | [ ] | Đang chờ phản hồi phê duyệt chính thức |
| 4 | `T1.4` | Khởi tạo workflow GitHub Actions `eshop-ci.yml` | D.N.Cường | Tuần 5 | [ ] | Chạy trên runner Ubuntu, Node.js 20 |
| 5 | `T1.5` | Thiết lập npm cache optimization cho monorepo backend | D.N.Cường | Tuần 5 | [ ] | Đo thời gian chạy (target: rút ngắn từ ~60s xuống ~5s) |
| 6 | `T1.6` | Cấu hình Quality Gate & Branch Protection (23/23 unit test pass, coupon line coverage > 70%, PR check) | D.N.Cường | Tuần 6 | [ ] | Jest JSON, LCOV artifact & PR check |
| 7 | `T1.7` | Cấu hình Jest backend, fix lỗi SQLite Concurrency Lock | T.G.Cường | Tuần 5 | [ ] | Failure Mode 1: Thêm `--runInBand` |
| 8 | `T1.8` | Viết Data-Driven tests (`test.each`) cho coupon API | T.G.Cường | Tuần 5 | [ ] | Test suite `coupon.test.js` trên backend |
| 9 | `T1.9` | Tái hiện & minh chứng lỗi coupon percent trong `server.js` | T.G.Cường | Tuần 6 | [ ] | Failure Mode 2: Bắt lỗi số tiền âm |
| 10 | `T1.10` | Viết script Python AI Log Triage (`ai_triage.py`) | N.G.Huy | Tuần 5 | [ ] | Đặt tại `.github/scripts/`, chạy khi `if: failure()` |
| 11 | `T1.11` | Tái hiện Flaky Test (async delay), chạy lặp lại 10 lần | N.G.Huy | Tuần 6 | [ ] | Failure Mode 3: Đo đạc Flake Rate trên CI |
| 12 | `T1.12` | Tổng hợp bảng số liệu Metrics (Setup, Flake, AI value) | N.G.Huy | Tuần 6 | [ ] | Bảng số liệu đưa vào slide & User Guide |
| **II**| **PHASE 2** | **ĐÓNG GÓI BỘ DELIVERABLES (MỐC 90% TẠI TUẦN 6)** | | **Cuối Tuần 6** | | |
| 13 | `T2.1` | Viết tài liệu `User_Guide.md` (tiếng Anh, ≥ 7 mục) | T.G.Cường | Tuần 6 | [ ] | Bắt buộc có mục 6: Mandatory Failure Modes |
| 14 | `T2.2` | Rà soát chất lượng ngôn ngữ, format Markdown User Guide | T.G.Cường | Tuần 6 | [ ] | Không dùng cú pháp LaTeX |
| 15 | `T2.3` | Soạn kịch bản Storyboard cho Video Screencast (5–8m) | D.N.Cường | Tuần 6 | [ ] | Thao tác 100% trên IDE/terminal thật |
| 16 | `T2.4` | Quay video & thu âm thuyết minh | D.N.Cường | Tuần 6 | [ ] | 1080p, giọng đọc rõ ràng, không nhạc nền |
| 17 | `T2.5` | Biên tập & nén video `Demo_Screencast.mp4` ≤ 100MB | D.N.Cường | Tuần 6 | [ ] | Sử dụng Handbrake / ffmpeg để nén |
| 18 | `T2.6` | Thiết kế bài tập lớp `Activity_Worksheet.md` (20–25m) | N.G.Huy | Tuần 6 | [ ] | Hoạt động "Pipeline Postmortem" |
| 19 | `T2.7` | Chuẩn bị log lỗi CI mẫu và file workflow cho lớp làm | N.G.Huy | Tuần 6 | [ ] | Trích xuất log lỗi thực tế từ EShop |
| 20 | `T2.8` | Xây dựng Answer Key & Barem chấm điểm Worksheet | N.G.Huy | Tuần 6 | [ ] | Tài liệu cho nhóm điều phối hoạt động |
| 21 | `T2.9` | Soạn bộ slide song song Seminar_Slides (`.pptx` & `.md` ≤ 15 trang) | N.N.M.Tuấn | Tuần 6 | [ ] | Chữ đen nền trắng, tóm tắt & gán link video |
| 22 | `T2.10`| Rà soát tính nhất quán giữa Slide, Guide và Demo | N.N.M.Tuấn | Tuần 6 | [ ] | Thống nhất thuật ngữ & số liệu đo đạc |
| 23 | `T2.11`| Đóng gói gói tài liệu Pre-share (Moodle / Google Drive) | N.N.M.Tuấn | Tuần 6 | [ ] | Đạt mốc **90% hoàn thành seminar** |
| **III**| **PHASE 3** | **BÁO CÁO TRỰC TIẾP & HOÀN TẤT HỒ SƠ** | | **Tuần 7–11** | | |
| 24 | `T3.1` | Pre-share tài liệu cho lớp trước buổi báo cáo ≥ 3 ngày | Cả nhóm | Trước Live ≥3d | [ ] | Đăng thông báo Moodle kèm link tài liệu |
| 25 | `T3.2` | Thuyết trình Live 45 phút tại lớp học (Pitch, Demo, Activity) | **TBD (Chưa phân công)** | Ngày Live | [ ] | Phân vai cụ thể trước ngày báo cáo |
| 26 | `T3.3` | Thu thập và tổng hợp Minute Papers từ các nhóm bạn | Cả nhóm | Ngày Live | [ ] | File `Audience_Feedback_Aggregated.md` |
| 27 | `T3.4` | Lập báo cáo kiểm toán AI `[AI-02] AI_Audit_Report.md` | N.N.M.Tuấn | +3 ngày sau Live | [ ] | Tối thiểu 600 từ, đầy đủ 5 mục bắt buộc |
| 28 | `T3.5` | Ký cam kết minh bạch AI `[AI-03] AI_Disclosure_Signed.pdf` | Cả 4 thành viên | +4 ngày sau Live | [ ] | Đầy đủ 4 chữ ký xác nhận |
| 29 | `T3.6` | Viết 4 bài phản tư `[AI-04] Reflective_Statements.md` | Cả 4 thành viên | +4 ngày sau Live | [ ] | Mỗi bạn viết riêng 300 từ bằng Tiếng Anh |
| 30 | `T3.7` | Kiểm tra, đóng gói thư mục `AI_Audit_Pack/` và nộp Moodle | D.N.Cường | +5 ngày sau Live | [ ] | Nộp trước hạn 5 ngày làm việc |

---

## 4. CHECKLIST CẢNH BÁO CÁC LỖI TRỪ ĐIỂM TỰ ĐỘNG (AUTO-PENALTY WARNINGS)

1. **Thiếu mục Failure Modes trong User Guide:** Bắt buộc phải có phân tích sâu tối thiểu 3 lỗi kỹ thuật thực tế (Nếu thiếu sẽ bị trừ trực tiếp 2 điểm).
2. **Video Demo gian lận / Quá thời lượng:** Video demo phải chạy trên môi trường dòng lệnh/IDE thật, không dùng slide để câu giờ, thời lượng bắt buộc trong khoảng **5 – 8 phút**, dung lượng **≤ 100MB**.
3. **Nộp tài liệu Pre-share trễ:** Phải chia sẻ tài liệu trước buổi báo cáo ít nhất **3 ngày làm việc** (Nộp trễ bị phạt 10% tổng điểm seminar).
4. **Slide thuyết trình quá dài:** Số lượng slide tối đa là **15 slides** (vượt quá số trang sẽ bị trừ điểm theo rubric).
5. **Thiếu chữ ký trong AI Disclosure:** Mọi thành viên trong nhóm đều phải ký tên vào form cam kết minh bạch AI `[AI-03]`.
6. **Lỗi định dạng ký tự:** Tuyệt đối dùng ký tự Unicode chuẩn (`→`, `≥`, `≤`), không sử dụng cú pháp LaTeX (`$...$`) trong Markdown để đảm bảo tính tương thích khi sao chép và xuất báo cáo.
