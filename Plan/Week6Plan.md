# WEEK 6 PLAN
**Chủ đề:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo (Express, SQLite3, Jest, React, GitHub Actions)  
**GitHub Repository:** [SoftwareTesting-Group13/eshop-sut-seminar](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar)  
**Nhóm thực hiện:** Nhóm 13 (4 thành viên)  
* **23120102** — Nguyễn Ngọc Minh Tuấn  
* **23120223** — Dương Nhật Cường  
* **23120225** — Trần Gia Cường  
* **23120273** — Nguyễn Gia Huy  

---

## 1. MỤC TIÊU CỐT LÕI

Mục tiêu trọng tâm của Tuần 6 là **đóng gói trọn vẹn toàn bộ sản phẩm đầu ra (Deliverables)** của Seminar T07 để đạt mốc **90% hoàn thành dự án**, sẵn sàng chia sẻ gói tài liệu (Pre-share Package) cho lớp và giảng viên trước buổi báo cáo trực tiếp:

1. **Bộ tài liệu hướng dẫn chuyên sâu (`User_Guide.md`):** Viết hoàn toàn bằng tiếng Anh, tối thiểu 7 phần theo rubric, phân tích sâu sắc **3 Mandatory Failure Modes**.
2. **Video Demo Screencast (`Demo_Screencast.mp4`):** Thời lượng chuẩn **5 – 8 phút**, độ phân giải 1080p, thuyết minh tiếng Anh, dung lượng **≤ 100MB**, thao tác trên terminal/IDE/GitHub Actions thật (không chiếu slide câu giờ).
3. **Bài tập tương tác trên lớp (`Activity_Worksheet.md`):** Kịch bản "Pipeline Postmortem" (20 – 25 phút), có log lỗi mẫu và file đáp án chi tiết (`Activity_Worksheet_AnswerKey.md`).
4. **Bộ slide thuyết trình (`Seminar_Slides.pptx` & `Seminar_Slides.md`):** Tối đa **15 slides** đúng quy định, phong cách thiết kế chuẩn mực **chữ đen nền trắng** trực quan, tương phản cao, dễ theo dõi; có slide tóm tắt các phân đoạn chính của video demo kèm đường link truy cập trực tiếp tới video. **Bắt buộc hoàn thiện đồng thời cả 2 phiên bản**:
   * Bản trình chiếu PowerPoint (`Seminar_Slides.pptx`) phục vụ báo cáo trực tiếp tại lớp.
   * Bản tài liệu Markdown (`Seminar_Slides.md`) hiển thị trực quan, tra cứu trực tiếp trên GitHub repository.
5. **Bộ số liệu thực nghiệm đo đạc (Empirical Metrics):** Số liệu đo Cache speedup (cold vs warm), tỉ lệ Flake rate (chạy lặp 10 lần), hiệu quả AI Log Triage.
6. **Đóng gói link Pre-share:** Đưa toàn bộ tài liệu lên Google Drive / GitHub Release sẵn sàng nộp trước ngày báo cáo ít nhất 3 ngày làm việc.

---

## 2. BẢNG TỔNG HỢP CÔNG VIỆC CHÍNH CỦA 4 THÀNH VIÊN

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             MA TRẬN PHÂN CÔNG NHIỆM VỤ TUẦN 6 (MỐC 90%)                            │
├──────────────────────┬──────────────────────┬──────────────────────┬───────────────────────────────┤
│ N.N. Minh Tuấn       │ Dương Nhật Cường     │ Trần Gia Cường       │ Nguyễn Gia Huy                │
│ (Lead Slides & SUT)  │ (Lead Video & CI/CD) │ (Lead User Guide)    │ (Lead Worksheet & Metrics)    │
├──────────────────────┼──────────────────────┼──────────────────────┼───────────────────────────────┤
│ • Soạn Slide pptx/md │ • Kịch bản Video     │ • Soạn User_Guide.md │ • Thiết kế Activity Worksheet │
│   (chuẩn ≤15 trang)  │ • Quay video 1080p   │ • Viết 3 Failure     │ • Soạn Answer Key & Barem     │
│ • Chuẩn hóa demo SUT │ • Nén MP4 ≤ 100MB    │   Modes tiếng Anh    │ • Đo đạc Flake Rate (10 runs) │
│ • Rà soát số liệu    │ • Setup Quality Gate │ • Sơ đồ kiến trúc    │ • Kiểm chứng Gemini API thật  │
│ • Kịch bản thuyết    │ • Đóng gói Pre-share │   Mermaid Diagrams   │ • Tổng hợp bảng Metrics       │
│   trình báo cáo      │   trọn gói mốc 90%   │ • Reproduction Guide │   thực nghiệm toàn seminar    │
└──────────────────────┴──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

## 3. DANH SÁCH CHI TIẾT NHIỆM VỤ CỦA TỪNG THÀNH VIÊN (MỖI NGƯỜI ≥ 5 TASKS)

> [!NOTE]
> **Yêu cầu đối với từng task:**
> Mỗi task được định nghĩa chuẩn hóa gồm 3 phần bắt buộc:
> 1. **Mô tả chi tiết (Task Description):** Nội dung nghiệp vụ kỹ thuật cần giải quyết và tiêu chí hoàn thành.
> 2. **Thời gian ước tính (Hours):** Số giờ lao động kỹ thuật dự kiến.
> 3. **Minh chứng nghiệm thu bắt buộc (Evidence):** Ảnh chụp tin nhắn trao đổi nhóm, ảnh chụp Git commits (commit hash/diff), test run logs, và file sản phẩm đầu ra hoàn chỉnh.

### 3.1. Nguyễn Ngọc Minh Tuấn (Phụ trách Bộ Slide pptx/md & Kịch bản Nghiệp vụ SUT)

* [x] **Task Tuấn 1: Thiết kế cấu trúc & biên soạn bộ Slide song song (`Seminar_Slides.pptx` & `Seminar_Slides.md`)**
  * **Task Description:** Xây dựng khung cấu trúc và nội dung bộ slide thuyết trình tuân thủ nghiêm ngặt quy định **tối đa 15 slides**. Định dạng phong cách thiết kế chuẩn mực **chữ đen nền trắng (clean, high-contrast)** trang nhã, tập trung sơ đồ kiến trúc trực quan, biểu đồ số liệu thực nghiệm, hạn chế tối đa text dày đặc. Đối với video demo (`Demo_Screencast.mp4`), thiết kế slide tóm tắt ngắn gọn các mốc nội dung chính và đính kèm đường link dẫn trực tiếp tới video. Hoàn thành đồng bộ cả **2 phiên bản**: file trình chiếu `Seminar_Slides.pptx` và file tài liệu hóa `Seminar_Slides.md` hiển thị trực tiếp trên GitHub repository.
  * **Hours:** 4.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi thống nhất dàn ý 15 slides với nhóm trong Messenger/Discord.
    * *Git commits:* Commit thêm 2 file `Seminar_Slides.pptx` và `Seminar_Slides.md` kèm commit hash rõ ràng trên GitHub.
    * *Artifacts:* Ảnh preview giao diện file `Seminar_Slides.md` trên GitHub và file PPTX hoàn chỉnh đúng 15 trang chữ đen nền trắng có link video.

* [x] **Task Tuấn 2: Soạn nội dung Slide chuyên sâu về Failure Mode 2 & Data-Driven Testing**
  * **Task Description:** Biên soạn 2 slide chi tiết phân tích lỗi nghiệp vụ coupon percent (`discount_amount` tính ra số âm khi số tiền giảm lớn hơn tổng đơn hàng trong `server.js`). Trình bày giải pháp Data-Driven Testing (`test.each`) với 21 ca kiểm thử bao phủ toàn bộ miền giá trị biên và trường hợp dị thường.
  * **Hours:** 3.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi với Trần Gia Cường để đồng bộ phân tích Failure Mode 2 giữa Slide và User Guide.
    * *Git commits:* Commit cập nhật nội dung slide Failure Mode 2 trên nhánh làm việc kèm hash commit.
    * *Artifacts:* Screenshot slide hiển thị rõ ràng code snippet before/after fix và bảng ma trận 21 ca kiểm thử.

* [x] **Task Tuấn 3: Bổ sung ca kiểm thử mở rộng nhánh coupon & cấu hình xuất báo cáo LCOV**
  * **Task Description:** Viết thêm các test cases kiểm tra phân quyền (role user vs guest khi áp mã coupon) trong `coupon.test.js`. Cấu hình script npm test xuất báo cáo độ bao phủ mã nguồn định dạng LCOV và HTML reporter (`backend/coverage/lcov-report/index.html`).
  * **Hours:** 4.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp thảo luận kỹ thuật với nhóm về các trường hợp biên của coupon.
    * *Git commits:* Commit thêm các test cases mới và cấu hình script coverage trong `backend/package.json`.
    * *Test logs:* Terminal log chạy Jest test pass 100% kèm ảnh chụp bảng HTML Code Coverage đạt chỉ tiêu.

* [x] **Task Tuấn 4: Rà soát và kiểm tra chéo tính nhất quán (Consistency Cross-Check)**
  * **Task Description:** Đối soát chéo từng thuật ngữ kỹ thuật, tên hàm, mã lỗi, đường dẫn file, tham số dòng lệnh giữa bộ Slide (`.pptx` / `.md`), tài liệu `User_Guide.md` và mã nguồn SUT thực tế để đảm bảo không có bất kỳ điểm mâu thuẫn hay lệch thông tin nào.
  * **Hours:** 2.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi chéo với tác giả User Guide (T.G.Cường) và Worksheet (Huy) về thuật ngữ.
    * *Git commits:* Commit chỉnh sửa các chỗ lệch thuật ngữ hoặc link dẫn trên repository.
    * *Artifacts:* Bảng checklist đối soát tính nhất quán hoàn tất không còn sai lệch.

* [x] **Task Tuấn 5: Biên soạn kịch bản thuyết minh trực tiếp tại lớp (Live Presentation Script)**
  * **Task Description:** Xây dựng tài liệu kịch bản thuyết trình trực tiếp tại lớp cho phần giới thiệu tổng quan hệ thống SUT và phần diễn giải demo Failure Mode 2. Phân chia rõ ràng lời thoại, mốc thời gian (pitch 10m, live demo 10m) và phân công người phối hợp trên máy chiếu.
  * **Hours:** 3.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi phân chia lượt thuyết trình với nhóm trong nhóm chat.
    * *Git commits:* Commit file tài liệu kịch bản `Presentation_Script.md` lên repository.
    * *Artifacts:* Bản tài liệu kịch bản hoàn chỉnh có mốc thời gian chi tiết từng phút cho từng người.

---

### 3.2. Dương Nhật Cường (Phụ trách Video Screencast & Hoàn thiện CI/CD Pipeline)

* [x] **Task D.N.Cường 1: Soạn kịch bản phân cảnh chi tiết (Video Storyboard & Narration Script)**
  * **Task Description:** Lập kịch bản phân cảnh chi tiết (Storyboard) cho video demo screencast: phân bổ thời lượng 5–8 phút (tối đa 8 phút đúng quy định), xác định cụ thể các hành động thao tác trên màn hình (terminal, VS Code, GitHub Actions) song song với kịch bản lời dẫn thuyết minh 100% bằng tiếng Anh.
  * **Hours:** 3.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi kịch bản video với nhóm trong Messenger/Discord.
    * *Git commits:* Commit file kịch bản `Video_Storyboard.md` lên repository kèm commit hash.
    * *Artifacts:* Bảng Storyboard chi tiết có 3 cột: Timecode, Screen Action (Thao tác màn hình), và English Narration (Lời đọc).

* [x] **Task D.N.Cường 2: Tích hợp bước Quality Gate & Branch Protection vào workflow GitHub Actions (`eshop-ci.yml`)**
  * **Task Description:** Hoàn thiện workflow `.github/workflows/eshop-ci.yml`: Quality Gate yêu cầu 23/23 unit test nghiệp vụ coupon được chọn pass, line coverage của `coupon-discount.js` > 70% (full backend suite chạy riêng), xuất báo cáo LCOV và cấu hình Branch Protection Required Status Checks chặn merge PR khi vi phạm để demo Fail-Fast.
  * **Hours:** 3.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp thảo luận quy chuẩn Quality Gate với các thành viên trong nhóm.
    * *Git commits:* Commit cập nhật workflow `.github/workflows/eshop-ci.yml` trên nhánh riêng và tạo PR.
    * *Test logs / CI:* Link GitHub Actions run và ảnh chụp tab workflow execution hiển thị bước Quality Gate chạy thành công.

* [ ] **Task D.N.Cường 3: Thực hiện quay video màn hình thực tế (Screen Recording 1080p, 60fps)**
  * **Task Description:** Sử dụng phần mềm quay màn hình chuyên dụng (OBS Studio) ghi hình trực tiếp độ phân giải 1080p sắc nét (thao tác trực tiếp trên terminal/IDE/GitHub Actions, tuyệt đối không dùng slide): thực hiện trọn vẹn luồng Pull Request thực tế: mở PR có lỗi coupon $\rightarrow$ trigger CI pipeline $\rightarrow$ cache HIT $\rightarrow$ Jest fail kích hoạt Fail-Fast $\rightarrow$ nút Merge bị KHÓA CỨNG trên GitHub UI $\rightarrow$ AI Log Triage can thiệp tóm tắt lỗi $\rightarrow$ push commit sửa lỗi $\rightarrow$ pipeline xanh $\rightarrow$ nút Merge được mở khóa.
  * **Hours:** 4.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp chat thông báo tiến độ quay và chia sẻ file video thô cho nhóm xem trước.
    * *Git commits:* Commit kích hoạt pipeline CI phục vụ kịch bản quay video demo.
    * *Artifacts:* Ảnh chụp giao diện phần mềm quay phim/dựng phim hiển thị timeline và thông số video 1080p.

* [ ] **Task D.N.Cường 4: Thu âm thuyết minh tiếng Anh (English Narration) & Biên tập nén chuẩn MP4**
  * **Task Description:** Thu âm thuyết minh 100% bằng tiếng Anh rõ ràng, mạch lạc, không nhạc nền theo kịch bản đã duyệt. Biên tập cắt ghép và nén video bằng ffmpeg/Handbrake xuất file `Demo_Screencast.mp4` đạt chuẩn: thời lượng 5–8 phút, độ phân giải 1080p, và dung lượng nghiêm ngặt **≤ 100MB**.
  * **Hours:** 4.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp gửi file audio/video bản nháp cho nhóm thẩm định chất lượng tiếng Anh và hình ảnh.
    * *Test logs:* Terminal log chạy lệnh ffmpeg nén video hoàn tất.
    * *Artifacts:* Screenshot thuộc tính file (File Properties) của `Demo_Screencast.mp4` hiển thị dung lượng < 100MB, thời lượng 5-8 phút, độ phân giải 1920x1080.

* [ ] **Task D.N.Cường 5: Đóng gói Pre-share Package trọn gói & Quản lý phát hành**
  * **Task Description:** Chủ trì thu thập và kiểm tra toàn bộ sản phẩm hoàn thiện của Tuần 6 (User Guide, Worksheet, Slide pptx/md, Video demo, Sample Logs), upload lên Google Drive / GitHub Releases và chuẩn bị sẵn đường link Pre-share công khai sẵn sàng nộp cho giảng viên trước buổi seminar ít nhất 3 ngày làm việc.
  * **Hours:** 2.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp xác nhận với nhóm trưởng và các thành viên đã tập hợp đủ tất cả deliverables.
    * *Git commits:* Commit cập nhật đường dẫn Pre-share Package vào README / Release notes.
    * *Artifacts:* Đường link Google Drive / GitHub Release hoạt động tốt kèm screenshot cấu trúc thư mục đóng gói.

---

### 3.3. Trần Gia Cường (Phụ trách Tài liệu User Guide & Phân tích Kiến trúc)

* [x] **Task T.G.Cường 1: Khởi tạo và thiết kế khung tài liệu `User_Guide.md` chuẩn tiếng Anh**
  * **Task Description:** Khởi tạo cấu trúc tài liệu `User_Guide.md` hoàn toàn bằng **tiếng Anh**, tuân thủ nghiêm ngặt rubric môn học với tối thiểu 7 phần chuyên sâu (Introduction, Installation & Setup, Quickstart / First Test, CI/CD Architecture, Advanced Pipeline Features, Failure Modes Analysis, References). Không dùng cú pháp LaTeX, dùng Unicode và Markdown chuẩn.
  * **Hours:** 3.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi thống nhất dàn mục lục tài liệu tiếng Anh với nhóm trong chat log.
    * *Git commits:* Commit khởi tạo khung file `User_Guide.md` trên nhánh làm việc riêng kèm commit hash.
    * *Artifacts:* Screenshot mục lục Table of Contents và bố cục trình bày chuẩn Markdown preview trên GitHub.

* [x] **Task T.G.Cường 2: Biên soạn chuyên sâu Mục 6: 3 Mandatory Failure Modes trong `User_Guide.md`**
  * **Task Description:** Phân tích kỹ thuật chuyên sâu cả 3 lỗi bắt buộc: (1) SQLite Lock `SQLITE_BUSY` do chạy Jest parallel và giải pháp `--runInBand`; (2) Coupon Percent Formula Bug dẫn đến `discount_amount` âm; (3) Flaky Test do async delay (`sleep` vs `await`). Mỗi lỗi có đủ 4 thành phần: Root Cause, Reproducing Code Snippet, Failure Symptoms/Error Log, Proven Fix/Workaround.
  * **Hours:** 5.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi phân tích nguyên nhân gốc lỗi và giải pháp khắc phục với Tuấn và Huy.
    * *Git commits:* Commit cập nhật toàn bộ nội dung phân tích 3 Failure Modes vào `User_Guide.md`.
    * *Artifacts:* Screenshot các đoạn mã so sánh before/after và phân tích lỗi hiển thị trực quan trên tài liệu.

* [x] **Task T.G.Cường 3: Xây dựng hệ thống sơ đồ kỹ thuật Mermaid chuyên nghiệp**
  * **Task Description:** Thiết kế và tích hợp toàn bộ hệ thống sơ đồ kiến trúc bằng cú pháp **Mermaid** hiển thị trực tiếp trên GitHub: Sơ đồ kiến trúc tổng thể Monorepo & Test Harness, Sơ đồ luồng CI/CD Pipeline (GitHub Actions stages & cache logic), Sơ đồ cơ chế File-locking của SQLite (Shared Read vs Exclusive Write Lock).
  * **Hours:** 3.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp thảo luận phác thảo sơ đồ kiến trúc với các thành viên nhóm.
    * *Git commits:* Commit mã nguồn sơ đồ Mermaid vào tài liệu `User_Guide.md` kèm commit hash.
    * *Artifacts:* Screenshot các sơ đồ Mermaid render chuẩn xác, sắc nét, không vỡ khung trên GitHub viewer.

* [x] **Task T.G.Cường 4: Viết tài liệu hướng dẫn tái hiện từng bước (Step-by-Step Reproduction Guide)**
  * **Task Description:** Soạn thảo mục hướng dẫn thực nghiệm từng bước (Step-by-Step Guide) từ khâu clone repository, cài đặt môi trường, cấu hình biến môi trường, đến các lệnh kích hoạt từng ca kiểm thử và quan sát đúng kết quả lỗi / kết quả pass trên cả máy local và GitHub Actions runner.
  * **Hours:** 3.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp nhờ thành viên trong nhóm clone về máy và chạy thử nghiệm theo đúng hướng dẫn.
    * *Git commits:* Commit bổ sung phần Reproduction Guide vào `User_Guide.md`.
    * *Test logs:* Terminal log ghi nhận các lệnh clone, npm test thực thi thành công từ A-Z.

* [x] **Task T.G.Cường 5: Rà soát học thuật tiếng Anh, kiểm tra liên kết & xuất bản `User_Guide.md`**
  * **Task Description:** Kiểm tra toàn diện ngữ pháp, văn phong kỹ thuật tiếng Anh (Grammar, Clarity, Technical Terms), rà soát tính toàn vẹn của tất cả các markdown links, hình ảnh đính kèm, trích dẫn tài liệu tham khảo (References chuẩn IEEE/ACM) và xuất bản bản tài liệu hoàn chỉnh.
  * **Hours:** 2.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp sử dụng công cụ rà soát văn phong tiếng Anh và gửi file hoàn thiện cho nhóm đọc duyệt.
    * *Git commits:* Commit hoàn thiện và xuất bản bản cuối của `User_Guide.md`.
    * *Artifacts:* Báo cáo kiểm tra broken links (không có link chết) và giao diện file hoàn chỉnh trên GitHub.

---

### 3.4. Nguyễn Gia Huy (Phụ trách Bài tập Lớp Worksheet & Phân tích Metrics)

* [ ] **Task Huy 1: Thiết kế bài tập tương tác trên lớp `Activity_Worksheet.md` ("Pipeline Postmortem")**
  * **Task Description:** Biên soạn tài liệu bài tập tương tác trên lớp `Activity_Worksheet.md` với chủ đề **"Pipeline Postmortem"** (thời lượng 20–25 phút): mô phỏng tình huống sinh viên đóng vai DevOps Engineer điều tra nguyên nhân pipeline thất bại qua log lỗi. Thiết kế các câu hỏi gợi mở, bài tập xác định bug và lệnh fix.
  * **Hours:** 4.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi ý tưởng kịch bản bài tập tương tác và phân bổ thời lượng với nhóm.
    * *Git commits:* Commit khởi tạo file `Activity_Worksheet.md` lên repository kèm commit hash.
    * *Artifacts:* Screenshot bài tập được định dạng chuyên nghiệp, có hướng dẫn làm bài và chỗ điền câu trả lời.

* [ ] **Task Huy 2: Xây dựng file đáp án chi tiết và barem chấm điểm `Activity_Worksheet_AnswerKey.md`**
  * **Task Description:** Soạn thảo tài liệu `Activity_Worksheet_AnswerKey.md` cung cấp đáp án chi tiết cho từng câu hỏi, diễn giải nguyên nhân tại sao lỗi xảy ra, trích dẫn dòng code gây lỗi trong SUT, kèm theo thang điểm chấm rõ ràng (Rubric) để nhóm sử dụng điều phối và chấm điểm trực tiếp trong buổi seminar.
  * **Hours:** 3.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi thống nhất barem chấm điểm bài tập với các thành viên nhóm.
    * *Git commits:* Commit đưa file `Activity_Worksheet_AnswerKey.md` lên repository.
    * *Artifacts:* Screenshot tài liệu đáp án chi tiết có bảng barem phân bổ điểm từng câu rõ ràng.

* [ ] **Task Huy 3: Trích xuất và đóng gói bộ log lỗi kiểm thử mẫu (Sample CI Failure Logs)**
  * **Task Description:** Trích xuất các đoạn log lỗi thực tế từ các lần chạy thất bại của GitHub Actions runner trên SUT EShop (lỗi SQLite lock, lỗi coupon test fail, lỗi npm cache miss). Tổ chức thành các file log mẫu trong thư mục `Materials/Sample_Logs/` làm dữ liệu đầu vào cho bài tập lớp.
  * **Hours:** 2.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp trao đổi với Dương Nhật Cường để lấy log từ các run thất bại của CI.
    * *Git commits:* Commit lưu trữ bộ file log mẫu vào repository đúng cấu trúc thư mục quy định.
    * *Artifacts:* Screenshot nội dung các file log mẫu được định dạng sạch sẽ, dễ đọc.

* [ ] **Task Huy 4: Nâng cấp và kiểm chứng script AI Triage (`ai_triage.py`) với Gemini API thật (Trợ lý gỡ lỗi chuyên biệt)**
  * **Task Description:** Hoàn thiện mã nguồn Python script `.github/scripts/ai_triage.py` đóng vai trò công cụ hỗ trợ gỡ lỗi nhanh (Specialized Assistant) khi pipeline thất bại: tích hợp gọi trực tiếp Google Gemini API sử dụng API key thật, đọc file log lỗi test runner, tự động phân tích và sinh Cây giả thuyết (Hypothesis Tree) gồm: Root Cause Hypotheses, Evidence từ log, và Recommended Fix Actions.
  * **Hours:** 4.5h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp thảo luận cấu trúc prompt kỹ thuật và định dạng JSON trả về từ Gemini với nhóm.
    * *Git commits:* Commit cập nhật mã nguồn script `ai_triage.py` và file test unit của script.
    * *Test logs:* Terminal log chạy thực thi script thành công và xuất ra Cây giả thuyết phân tích log lỗi chuẩn xác.

* [ ] **Task Huy 5: Thực nghiệm đo đạc Flake Rate (10 runs) & Tổng hợp bảng Empirical Metrics**
  * **Task Description:** Chạy thực nghiệm lặp lại 10 lần ca Flaky Test (`flaky-delay.demo.js`) trên GitHub Actions runner để thu thập số liệu đo đạc thực tế (Flake Rate) trước và sau khi fix (`sleep` vs `await`). Đo đạc tốc độ tăng tốc của GitHub Actions Cache (Cold run vs Warm run). Tổng hợp toàn bộ số liệu vào bảng Empirical Metrics hoàn chỉnh.
  * **Hours:** 4.0h
  * **Evidence:**
    * *Chat messages:* Ảnh chụp gửi bảng số liệu đo đạc sơ bộ cho nhóm để đưa vào slide và User Guide.
    * *Git commits:* Commit cập nhật bảng số liệu thực nghiệm vào repository kèm commit hash.
    * *Test logs:* Screenshot lịch sử 10 lần chạy GitHub Actions (Run history) và bảng tổng hợp Metrics đo đạc thực tế.

---

## 4. HƯỚNG DẪN: PHÂN RÃ KẾ HOẠCH CÁ NHÂN THEO TỪNG COMMIT (COMMIT-DRIVEN PLAN)

Để đảm bảo lịch sử Git chuyên nghiệp, tiến độ rõ ràng và tránh dồn việc vào phút chót, **khuyến khích mỗi thành viên tự lập một file kế hoạch hành động cá nhân**:
* **Đường dẫn gợi ý:** `Seminar_CI-CD/Me/MyPlanW6_<ten_ban>.md`  
  *(Tham khảo cấu trúc chuẩn từ file mẫu của Trần Gia Cường: [MyPlanW5.md](./../Me/MyPlanW5.md))*

### Cấu trúc khuyến nghị cho kế hoạch cá nhân:
Mỗi task lớn nên được chia nhỏ thành các **Phase** và phân rã thành từng **Git Commit cụ thể** kèm commit message chuẩn:
```markdown
### GIAI ĐOẠN X: [TÊN GIAI ĐOẠN]
- **Bước X.1: Chuẩn bị mã nguồn / tài liệu:**
  Mô tả thao tác chuẩn bị...
- **Bước X.2: Thực hiện thay đổi & kiểm thử cục bộ:**
  Lệnh thực thi, mã test...
- **Bước X.3: Git Commit & Push:**
  * Lệnh stage: `git add <cac_file_lien_quan>`
  * Commit message: `feat(scope): mô tả ngắn gọn thay đổi` hoặc `docs(guide): ...`
  * Push nhánh: `git push origin <ten-nhanh-cua-ban>`
- **Bước X.4: Thu thập minh chứng (Evidence):**
  * Chụp ảnh màn hình terminal / chat / commit diff.
  * Đặt tên ảnh có tiền tố thành viên: `gcuong_stepX_evidence.png`.
```

### Quy ước tiền tố Commit Message chuẩn:
* `feat:` thêm tính năng hoặc chức năng mới (ví dụ: script AI triage, workflow CI)
* `test:` viết thêm ca kiểm thử, sửa test cases
* `docs:` viết User Guide, Slide (pptx/md), Worksheet, Báo cáo tuần, Chat logs
* `fix:` sửa lỗi mã nguồn SUT hoặc sửa lỗi pipeline
* `ci:` cấu hình cache, quality gates trong GitHub Actions

---

## 5. BẢNG CHECKLIST NGHIỆM THU TUẦN 6 (DEADLINE MỐC 90%)

| STT | Mã Task | Hạng mục công việc chi tiết | Người phụ trách | Giờ (Hours) | Minh chứng chính (Evidence) | Hạn chót | Trạng thái | Sản phẩm nghiệm thu |
| :---: | :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **1** | `W6-01` | Khởi tạo khung User Guide tiếng Anh (≥ 7 mục) | T.G.Cường | 3.5h | Chat log, Git commit, TOC preview | Ngày 2 | [x] Hoàn thành | File `User_Guide.md` có đầy đủ mục lục |
| **2** | `W6-02` | Soạn thảo chi tiết 3 Mandatory Failure Modes | T.G.Cường | 5.0h | Chat log, Git commit, Before/After code | Ngày 4 | [x] Hoàn thành | Mục 6 trong `User_Guide.md` sâu sắc |
| **3** | `W6-03` | Vẽ sơ đồ Mermaid cho kiến trúc & pipeline | T.G.Cường | 3.5h | Chat log, Git commit, Mermaid render | Ngày 4 | [x] Hoàn thành | Các sơ đồ hiển thị đẹp trên GitHub |
| **4** | `W6-04` | Hoàn thiện Step-by-Step Reproduction Guide | T.G.Cường | 3.0h | Chat log, Test logs, Git commit | Ngày 5 | [x] Hoàn thành | Các bước chạy demo có thể tái hiện 100% |
| **5** | `W6-05` | Rà soát format Markdown & ngữ pháp tiếng Anh | T.G.Cường | 2.5h | Chat log, Link checker report, Git commit | Ngày 6 | [x] Hoàn thành | File `User_Guide.md` hoàn chỉnh |
| **6** | `W6-06` | Soạn Storyboard chi tiết cho Video Screencast | D.N.Cường | 3.5h | Chat log, Git commit, Storyboard table | Ngày 2 | [x] Hoàn thành | Kịch bản phân cảnh 5–8 phút |
| **7** | `W6-07` | Bổ sung Quality Gate & Branch Protection vào CI | D.N.Cường | 3.5h | Chat log, Git commit, CI Run URL | Ngày 3 | [x] Hoàn thành | Workflow kiểm tra pass test, coverage & PR lock |
| **8** | `W6-08` | Quay video screencast thao tác màn hình thật | D.N.Cường | 4.5h | Chat log, Video raw 1080p, OBS timeline | Ngày 4 | [ ] Đang làm | Video thô 1080p, thao tác trực tiếp IDE |
| **9** | `W6-09` | Thu âm tiếng Anh, biên tập & nén video MP4 | D.N.Cường | 4.0h | Chat log, ffmpeg log, File Properties | Ngày 5 | [ ] Đang làm | File `Demo_Screencast.mp4` (≤ 100MB, 5-8m) |
| **10**| `W6-10` | Đóng gói bộ sản phẩm Pre-share lên Drive/Releases | D.N.Cường | 2.5h | Chat log, Drive link, GitHub Release | Ngày 6 | [ ] Chưa hoàn thành | Link tải trọn gói tài liệu mốc 90% |
| **11**| `W6-11` | Soạn bộ Slide song song (`.pptx` & `.md` ≤ 15 trang) | N.N.M.Tuấn | 4.0h | Chat log, Git commit, Slide preview | Ngày 2 | [x] Hoàn thành | 2 file `Seminar_Slides.pptx` & `.md` |
| **12**| `W6-12` | Hoàn thiện slide Failure Mode 2 & Data-Driven test | N.N.M.Tuấn | 3.5h | Chat log, Git commit, Slide screenshot | Ngày 4 | [x] Hoàn thành | Slide trực quan, có code diff & 21 tests |
| **13**| `W6-13` | Mở rộng test suites coupon & cấu hình LCOV coverage | N.N.M.Tuấn | 4.0h | Chat log, Git commit, HTML Coverage log | Ngày 4 | [x] Hoàn thành | Báo cáo độ bao phủ mã nguồn backend |
| **14**| `W6-14` | Kiểm tra tính nhất quán giữa Slide, Guide và Code | N.N.M.Tuấn | 2.5h | Chat log, Git commit, Checklist đối soát | Ngày 5 | [x] Hoàn thành | Thống nhất 100% thuật ngữ và số liệu |
| **15**| `W6-15` | Soạn kịch bản thuyết minh trực tiếp buổi seminar | N.N.M.Tuấn | 3.0h | Chat log, Git commit, Script timeline | Ngày 6 | [x] Hoàn thành | File `Presentation_Script.md` phân vai rõ |
| **16**| `W6-16` | Thiết kế bài tập lớp `Activity_Worksheet.md` | N.G.Huy | 4.0h | Chat log, Git commit, Worksheet preview | Ngày 2 | [ ] Đã thực hiện; chờ kiểm chứng thủ công | Worksheet 23 phút/10 điểm, 2 ảnh; chờ thống nhất kịch bản với nhóm |
| **17**| `W6-17` | Soạn thảo `Activity_Worksheet_AnswerKey.md` | N.G.Huy | 3.0h | Chat log, Git commit, Barem chi tiết | Ngày 3 | [ ] Đã thực hiện; chờ nhóm duyệt | Đủ 10 đáp án/điểm thành phần và ảnh; barem đề xuất |
| **18**| `W6-18` | Trích xuất Sample Failure Logs làm đề bài tập | N.G.Huy | 2.5h | Chat log, Raw CI logs, Git commit | Ngày 4 | [ ] Đã thực hiện; chờ xác nhận nguồn | 6 raw CI logs, metadata/source và 7 ảnh; SQLite là demo riêng |
| **19**| `W6-19` | Kết nối & kiểm chứng Gemini API thật trong AI Triage | N.G.Huy | 4.5h | Chat log, Git commit, JSON output terminal | Ngày 5 | [ ] Đã kiểm chứng kỹ thuật; chờ nghiệm thu riêng | Script/unit test kế thừa tuần 5; 6/6 offline và Gemini HTTP 200 trong W6-20; chờ nhóm đối chiếu |
| **20**| `W6-20` | Chạy đo đạc Flake Rate (10 runs) & tổng hợp Metrics | N.G.Huy | 4.0h | Chat log, 10 CI run screenshots, Git commit | Ngày 5 | [ ] Đã thực hiện; chờ bàn giao nhóm | 10 runs/20 invocation, CSV/raw, cache/AI, 5 ảnh; chưa xác nhận đưa số liệu vào Slide/Guide |
| **21**| `W6-21` | Tổng hợp hồ sơ Weekly Report Tuần 6 (PDF, AI, Git) | D.N.Cường | 2.0h | Chat log, Commit logs, Báo cáo hoàn tất | Ngày 6 | [ ] Đang làm | Thư mục `Weekly_Reports/Week06/` hoàn tất |

---

## 6. NHẮC NHỞ QUAN TRỌNG: ĐỐI SOÁT VỚI CHECKLIST.MD SAU KHI HOÀN THÀNH

> [!CAUTION]
> **QUY ĐỊNH BẮT BUỘC TRƯỚC KHI THÔNG BÁO HOÀN THÀNH HOẶC TẠO PULL REQUEST:**
> 
> Mọi thành viên sau khi hoàn thành bất kỳ task nào trong bảng trên, **BẮT BUỘC phải mở file quy chuẩn chất lượng:**
> 👉 **[Plan/Checklist.md](./Checklist.md)**
> 
> Hãy tự đối soát đầy đủ qua **5 Cổng kiểm soát (Quality Gates)**:
> 1. **Cổng 1 (Code & Test):** Chạy `npm test` nội bộ pass 100%, không commit file rác (`node_modules/`, `coverage/`, `.env`, `database.sqlite` bẩn).
> 2. **Cổng 2 (Minh chứng - Evidence):** Chụp ảnh màn hình có **tiền tố tên thành viên** (`gcuong_`, `ncuong_`, `mtuan_`, `ghuy_`), lưu vào `Weekly_Reports/Week06/screenshots/`.
> 3. **Cổng 3 (Hồ sơ tuần):** Cập nhật đầy đủ 4 vị trí: `AI Usage Declaration.md`, file riêng trong `chat_logs/`, `Git Commit Log Total.md`, và `Weekly_Report_Week06.md`.
> 4. **Cổng 4 (Git Workflow):** Làm việc trên nhánh riêng (`feature/...`, `test/...`, `docs/...`), tuyệt đối không push thẳng lên `main`. Khi tạo PR, chọn đúng `base repository: SoftwareTesting-Group13/eshop-sut-seminar` (không nhầm sang repo của giảng viên).
> 5. **Cổng 5 (Quy tắc 5 phút):** Tự trả lời 5 câu hỏi nhanh trước khi thông báo hoàn thành với nhóm!

