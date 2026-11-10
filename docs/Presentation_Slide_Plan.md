# KẾ HOẠCH BỘ SLIDE THUYẾT TRÌNH SEMINAR T07
## CHỦ ĐỀ: CI/CD & TEST-HARNESS ENGINEERING
### (ĐỒNG BỘ 1:1 THEO FLOW KỊCH BẢN THUYẾT TRÌNH PHÂN VAI & PHỐI HỢP 2 NHÓM)

* **Môn học:** Kiểm thử phần mềm (Software Testing) — Mã lớp: `Testing-CQ2023-3-LQVu`
* **Đơn vị:** Khoa Công nghệ Thông tin — Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM
* **Giảng viên phụ trách:** TS. Lâm Quang Vũ, TS. Trần Duy Hoàng, ThS. Trương Phước Lộc, ThS. Hồ Tuấn Thanh
* **Hệ thống kiểm thử (SUT):** EShop System Monorepo (Node.js/Express, SQLite3, Jest, React, GitHub Actions)
* **Kênh Video Demo Screencast Full HD:** [https://youtu.be/hze3wsX1Xck](https://youtu.be/hze3wsX1Xck)
* **Tài liệu kịch bản đối soát:** `docs/PresentationScript.md`

---

## 1. BỐI CẢNH PHỐI HỢP & NGUYÊN TẮC XÂY DỰNG SLIDE

1. **Bối cảnh phối hợp 2 Nhóm cùng chủ đề T07:**
   * **Nhóm 10:** Chủ trì phần Nền tảng & Hạ tầng CI/CD cơ bản (DevOps Lifecycle, Runner, Trigger, Pipeline cơ sở).
   * **Nhóm 13:** Chủ trì chuyên sâu về **Test-Harness Engineering, Data-Driven Testing, Checkpoints Đa tầng (API + Database), Concurrency Bug & AI-Augmented Log Triage**.
   * **Nguyên tắc "Slide làm hết — Thuyết trình có trọng tâm":** Bộ slide của Nhóm 13 **vẫn làm đầy đủ 100% nội dung của chủ đề T07** (để nộp chấm đồ án toàn diện), nhưng cấu trúc dàn trang và luồng trình bày sẽ bám sát theo đúng timeline và kịch bản phân vai của `docs/PresentationScript.md`.
2. **Quy chuẩn hình thức bắt buộc:**
   * **Màu sắc:** Nền trắng chữ đen (`#FFFFFF` nền, `#000000` chữ), độ tương phản cao, chuẩn học thuật và rõ nét trên máy chiếu.
   * **Code Blocks:** Nền trắng hoặc xám cực nhạt (`#F8F9FA`), viền đen mảnh, chữ đen, font Monospace (`Consolas`, `Fira Code`).
   * **Ưu tiên sử dụng hình ảnh trong `docs/assets/`:** Toàn bộ slide bắt buộc **ưu tiên sử dụng 10 hình ảnh sơ đồ và ảnh chụp minh chứng thực tế có sẵn tại thư mục `docs/assets/`**, tuyệt đối tránh dùng các ảnh minh họa trừu tượng tải từ internet để đảm bảo tính xác thực học thuật cao nhất.
   * **Video Demo Link:** Luôn đính kèm đường dẫn YouTube [https://youtu.be/hze3wsX1Xck](https://youtu.be/hze3wsX1Xck) tại các slide phần demo thực nghiệm.

---

## 2. BẢNG PHÂN CÔNG THỰC HIỆN SLIDE (THÀNH VIÊN A, B, C, D)

| Thành viên | Phân đoạn Slide đảm nhận | Nội dung kỹ thuật chi tiết phụ trách soạn slide | Hình ảnh ưu tiên sử dụng (`docs/assets/`) | Mục tiêu đầu ra dự kiến |
| :---: | :--- | :--- | :--- | :--- |
| **Thành viên A** | **Phần I (Khối 1):** Mở đầu, Bối cảnh & Lý thuyết Test Harness | • Slide Giới thiệu đề tài, thành viên & ranh giới phối hợp 2 nhóm.<br/>• Slide Đặt vấn đề "Integration Hell", nguyên lý Shift-Left & Fail-Fast.<br/>• Slide Giới thiệu SUT EShop & Module Coupon FR-09.<br/>• Slide Khái niệm Test Harness & 4 Thành phần cốt lõi.<br/>• Slide 3 Trụ cột kiểm thử tự động (Record & Playback, Data-Driven, Checkpoints). | • `devops-lifecycle-diagram.png`<br/>• `cicdpipeline.png` | 5 – 7 slides chuẩn nền trắng chữ đen; nắm chắc khái niệm lý thuyết cốt lõi. |
| **Thành viên B** | **Phần I (Khối 2):** Khảo sát & Biện luận Bộ công cụ | • Slide Nền tảng CI/CD: GitHub Actions (Workflow, YAML) vs. Jenkins (Pipeline, Jenkinsfile) vs. GitLab CI/CD.<br/>• Slide So sánh GitHub Actions vs. Jenkins dựa trên bài toán thực tế của đồ án EShop (hạ tầng, chi phí, quy trình PR, tính cô lập monorepo).<br/>• Slide Test Runners: Jest vs. Vitest vs. Mocha trên Node.js.<br/>• Slide Công cụ bảo mật Gitleaks & Trợ lý chẩn đoán AI (Gemini API vs. Datadog/Launchable).<br/>• Slide Mô hình phân tầng công cụ: Điều phối CI/CD (GitHub Actions) – Thực thi kiểm thử (Jest) – Chẩn đoán lỗi (Google Gemini API). | • `githubactions.png` | 5 – 7 slides; bảng biểu so sánh định lượng rõ ràng, lập luận kỹ thuật gắn liền với đồ án EShop. |
| **Thành viên C** | **Phần II (Khối 1):** Kiến trúc Pipeline & Demo 1, 2 | • Slide Sơ đồ luồng CI Pipeline đa tầng & Quality Gates (`eshop-ci.yml`).<br/>• Slide Cơ chế Branch Protection Rules khóa cứng nút Merge PR.<br/>• Slide Demo 1: Quét bảo mật Gitleaks & Tối ưu Dependency Cache (~50s $\rightarrow$ ~5s).<br/>• Slide Demo 2: Data-Driven Testing với ma trận `test.each` 23 tests.<br/>• Slide Demo 2: Checkpoint Đa tầng (API Response + **Database Persistence `coupon_usage`** + Invariants). | • `gitleak.png`<br/>• `cachehit.png`<br/>• `jest.png`<br/>• `qualitygate.png` | 5 – 7 slides; tích hợp sơ đồ luồng Mermaid và ảnh chụp màn hình thực tế từ `docs/assets/`. |
| **Thành viên D** | **Phần II (Khối 2) & Phần III:** Demo 3, Metrics, Activity & Q&A | • Slide Demo 3: Sửa lỗi SQLite File-Lock (`SQLITE_BUSY`) bằng cờ `--runInBand`.<br/>• Slide Demo 3: Xử lý Flaky Test độ trễ (`sleep` vs. `await`/`waitForCondition`).<br/>• Slide Demo 3: Tiêm lỗi coupon & **Bot AI tự động comment Cây giả thuyết + Code diff lên GitHub PR**.<br/>• Slide Bảng số liệu thực nghiệm (Empirical Metrics) & Link Video Screencast YouTube.<br/>• Slide Joint Activity "Pipeline Postmortem" (Người vs. AI bóc tách log).<br/>• Slide Đúc kết Takeaways (Flake taxonomy, TIA), References IEEE & Q&A. | • `build.png`<br/>• `summary.png`<br/>• `aitriage.png` | 7 – 9 slides; dẫn chứng link video, kịch bản tương tác lớp học và tổng kết. |

---

### DANH MỤC 10 HÌNH ẢNH MINH CHỨNG TRỰC QUAN (`docs/assets/`) CẦN GẮN VÀO SLIDES

| STT | Tên file hình ảnh | Ý nghĩa kỹ thuật & Vị trí gắn vào slide | Thành viên phụ trách |
| :---: | :--- | :--- | :---: |
| 1 | `devops-lifecycle-diagram.png` | Minh họa 8 giai đoạn tuần hoàn của vòng đời DevOps (Plan $\rightarrow$ Monitor) | **Thành viên A** |
| 2 | `cicdpipeline.png` | Minh họa luồng tự động hóa Code $\rightarrow$ Build $\rightarrow$ Test và First Quality Gate | **Thành viên A** |
| 3 | `githubactions.png` | Sơ đồ cấu trúc phân cấp: Event $\rightarrow$ Workflow $\rightarrow$ Job $\rightarrow$ Runner $\rightarrow$ Step $\rightarrow$ Action | **Thành viên B** |
| 4 | `gitleak.png` | Minh chứng Job `secret-scan` phát hiện hoặc bảo vệ rò rỉ API Keys/Secrets | **Thành viên C** |
| 5 | `cachehit.png` | Minh chứng Job `backend-test`: Khôi phục `node_modules` thành công qua Cache HIT (~5s) | **Thành viên C** |
| 6 | `jest.png` | Minh chứng Job `backend-test`: Kết quả thực thi bộ test Jest và bảng Code Coverage | **Thành viên C** |
| 7 | `qualitygate.png` | Minh chứng Job `quality-gate`: Đánh giá 3 điều kiện (Pass 100%, Coverage > 70%, LCOV) | **Thành viên C** |
| 8 | `build.png` | Minh chứng Job `build`: Đóng gói Web, Admin và Backend sau khi đạt Quality Gate | **Thành viên D** |
| 9 | `summary.png` | Minh chứng Job `workflow-summary`: Xuất file kiểm toán `ci-audit.json` của toàn bộ run | **Thành viên D** |
| 10 | `aitriage.png` | Minh chứng Job `ai-triage`: Bot AI tự động comment Cây giả thuyết & Diff code trên PR | **Thành viên D** |

---

## 3. KHUNG NỘI DUNG CÁC MỤC LỚN (FLOW CHUẨN THEO PRESENTATION SCRIPT)

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   FLOW BỘ SLIDE THEO KỊCH BẢN THUYẾT TRÌNH (TIMELINE)                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHẦN I: TỔNG QUAN, LÝ THUYẾT & KHẢO SÁT CÔNG CỤ TEST HARNESS                           │
│   • Scoping, Bối cảnh Integration Hell & Định vị CI/CD là Test Harness                 │
│   • 4 Thành phần Test Harness & 3 Trụ cột kiểm thử tự động                             │
│   • Khảo sát & Phân vai: CI/CD Platforms, Test Runners, Gitleaks, AI Gemini Triage     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHẦN II: KIẾN TRÚC PIPELINE & 3 KỊCH BẢN THỰC CHIẾN / LIVE DEMO                        │
│   • Sơ đồ luồng Pipeline đa tầng & Quality Gates Fail-Fast                             │
│   • Kịch bản 1: Bảo mật Gitleaks & Tối ưu Dependency Cache                             │
│   • Kịch bản 2: Data-Driven Testing & Checkpoint Đa tầng (API + DB coupon_usage)      │
│   • Kịch bản 3: Sửa lỗi SQLite Lock (--runInBand), Flaky Timing & AI PR Comment        │
│   • Bảng số liệu đo đạc thực nghiệm (Empirical Metrics) & Link Video Demo              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHẦN III: HOẠT ĐỘNG PHỐI HỢP LỚP HỌC (JOINT ACTIVITY), BÀI HỌC KINH NGHIỆM & Q&A       │
│   • Joint In-class Activity: "Pipeline Postmortem" (Người vs AI bóc tách log)          │
│   • Phân loại Flake taxonomy & Xu hướng Test Impact Analysis                           │
│   • Đúc kết bài học, Tài liệu tham khảo IEEE/ACM & Hỏi đáp Q&A                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### PHẦN I: TỔNG QUAN, LÝ THUYẾT & KHẢO SÁT CÔNG CỤ TEST HARNESS
*(Thời lượng kịch bản: ~6 phút — Thành viên A & Thành viên B)*

1. **Thông tin Đề tài & Phân vai Nhóm 13:**
   - Giới thiệu đề tài, vai trò kỹ thuật, mã lớp và giảng viên phụ trách.
   - Khái quát ranh giới phối hợp giữa Nhóm 10 (Infra) và Nhóm 13 (Test Harness).
2. **Đặt vấn đề & Bối cảnh kỹ thuật:**
   - Hiện tượng "Integration Hell" khi phát triển đa nhánh song song.
   - Chi phí sửa lỗi muộn theo hàm số mũ khi phát hiện cận ngày phát hành.
3. **Định vị cốt lõi của đề tài trong môn học:**
   - Phân biệt rõ: CI/CD không chỉ là công cụ đóng gói/triển khai của DevOps, mà là **Hạ tầng Test Harness tự động**.
   - Triết lý **Shift-Left Testing** và **Fail-Fast Principle**: Đưa kiểm thử về sớm nhất, ngăn chặn lỗi ngay từ commit/PR.
4. **Giới thiệu Hệ thống kiểm thử (SUT):**
   - EShop Monorepo: Express Backend, SQLite3, React Web/Admin, Mobile.
   - Module trọng tâm kiểm thử: Phân hệ Khuyến mãi Mã giảm giá (Coupon FR-09).
5. **Cơ sở Lý thuyết Test-Harness Engineering:**
   - Khái niệm Test Harness: Một môi trường/hệ sinh thái thực thi độc lập (Test Execution Environment), không phải script đơn lẻ.
   - **4 Thành phần kiến trúc cốt lõi:**
     1. *Test Execution Engine* (Jest Runner trên Node.js).
     2. *Test Data & Fixtures Management* (Khởi tạo schema, nạp seed data, hook `beforeAll`/`beforeEach`).
     3. *Stubs / Mocks / Drivers* (Giả lập phụ thuộc ngoài để cô lập đơn vị kiểm thử).
     4. *Results Logging & Reporting* (Exit code 0/1, báo cáo LCOV `lcov.info`, JSON summary).
   - **3 Trụ cột kiểm thử tự động theo chuẩn môn học:**
     1. *Record & Playback:* Quản lý log artifacts, run ID, và khả năng tái chạy chính xác phiên bản commit lỗi (*Re-run failed jobs*).
     2. *Data-Driven Testing:* Tách biệt logic và dữ liệu với ma trận tham số hóa `test.each`.
     3. *Checkpoints:* Chốt chặn đa tầng (Checkpoint API Response, Checkpoint Database Persistence, Checkpoint CI Quality Gate).
6. **Khảo sát, So sánh & Phân vai Bộ Công cụ:**
   - *Khảo sát Nền tảng CI/CD:* 
     - GitHub Actions: Cấu trúc Workflow, cú pháp YAML (`on`, `jobs`, `steps`, `uses`, `run`).
     - Jenkins: Cấu trúc Pipeline, Jenkinsfile (Declarative Pipeline), mô hình Master/Agent.
     - So sánh định lượng GitHub Actions vs. Jenkins dựa trên bài toán thực tế của đồ án EShop:
       * *Hạ tầng & Chi phí:* EShop là đồ án sinh viên lưu trữ trên GitHub. GitHub Actions cung cấp 2.000 phút runner Ubuntu cloud miễn phí/tháng, không tốn chi phí và công sức dựng/duy trì server VPS như Jenkins.
       * *Tích hợp Pull Request & Quality Gate:* GitHub Actions kiểm soát trực tiếp Branch Protection, khóa nút Merge và nhúng nhận định AI ngay trên giao diện PR; Jenkins cần cài webhook, ngrok/domain tĩnh và nhiều plugin bổ trợ.
       * *Môi trường thực thi Clean-room:* GitHub Actions khởi tạo máy ảo Ubuntu mới tinh cho mỗi run, tránh rò rỉ file `database.sqlite` hoặc xung đột port/node_modules giữa các lần chạy.
   - *Khảo sát Test Runners:* So sánh Jest vs. Vitest vs. Mocha trên hệ sinh thái JavaScript/Node.js (Jest có sẵn assertion, mocking, snapshot và LCOV coverage, tối ưu cho Express.js Backend).
   - *Công cụ Bảo mật & Chẩn đoán AI:*
     - Gitleaks: Quét phát hiện secret/token tại cửa ngõ pipeline trước khi chạy test.
     - Trợ lý AI Log Triage (Google Gemini API): So sánh hiệu quả chi phí 0đ với các nền tảng doanh nghiệp đắt đỏ (Datadog FTM, Launchable).
   - *Mô hình phân tầng công cụ kiểm thử tự động của Nhóm 13:*
     - Tầng 1 — Điều phối CI/CD: GitHub Actions (quản lý workflow, runner, cache, quality gate).
     - Tầng 2 — Động cơ thực thi kiểm thử: Jest (chạy unit/API test, đo coverage LCOV, tuần tự hóa với `--runInBand`).
     - Tầng 3 — Chẩn đoán lỗi thông minh: Google Gemini API (phân tích log lỗi có điều kiện khi pipeline thất bại).

---

### PHẦN II: KIẾN TRÚC PIPELINE & 3 KỊCH BẢN THỰC CHIẾN / LIVE DEMO
*(Thời lượng kịch bản: ~9 phút — Thành viên C & Thành viên D)*

1. **Kiến trúc Workflow GitHub Actions (`eshop-ci.yml`) & Rào chắn Chất lượng:**
   - Luồng job đa tầng: `secret-scan` $\rightarrow$ `backend-test` $\rightarrow$ `quality-gate` $\rightarrow$ `build` $\rightarrow$ `workflow-summary`.
   - Tiêu chí rào chắn Quality Gate: 100% test pass, Line coverage > 70%, có LCOV report.
   - Cơ chế Branch Protection Rules: Khóa cứng nút Merge PR khi pipeline fail.
2. **Kịch bản Demo 1: Cơ bản — Bảo mật & Tối ưu Test Engine:**
   - *Thao tác Secret Scan:* Chứng minh Gitleaks chặn đứng commit chứa API Key/Secret.
   - *Thao tác Dependency Caching:* So sánh Cache MISS (~50s) vs Cache HIT (~5s, tăng tốc gấp 8–10 lần).
   - *Cô lập Test Runner:* Khởi tạo runner sạch (Clean-room Execution).
3. **Kịch bản Demo 2: Data-Driven Testing & Checkpoints Đa tầng (Feature 09):**
   - *Data-Driven với `test.each`:* Trình chiếu ma trận 23 ca test coupon phần trăm, coupon fixed, mã hết hạn, biên đơn hàng.
   - *Checkpoint Tầng 1 (API Response):* HTTP 200/400, kiểm tra schema JSON `discount_amount` và `final_amount`.
   - *Checkpoint Tầng 2 (Database Persistence - Điểm mới kỹ thuật):* Xác thực ghi nhận giao dịch vào bảng `coupon_usage` trong SQLite, bảo vệ quy tắc mỗi user chỉ dùng mã 1 lần.
   - *Checkpoint Tầng 3 (Business Invariants):* Ràng buộc bất biến: Số tiền giảm $\ge 0$ và tiền thanh toán $\le$ tổng đơn hàng.
4. **Kịch bản Demo 3: Xử lý Tận gốc Lỗi Kỹ thuật & AI Log Triage PR Comment:**
   - *Xử lý lỗi Concurrency Lock:* Hiện tượng `SQLITE_BUSY: database is locked` do Jest đa luồng $\rightarrow$ Giải pháp tuần tự hóa `--runInBand` (triệt tiêu 100% lock contention).
   - *Xử lý Flaky Test do độ trễ bất đồng bộ:* Anti-pattern dùng `sleep` cố định (Flake rate 40% trên CI) $\rightarrow$ Giải pháp tất định bằng `waitForCondition` / `await` (Flake rate về 0%).
   - *Bug Nghiệp vụ Coupon Percent & AI Triage Tự động (Điểm sáng kỹ thuật):*
     - Tiêm lỗi công thức coupon $\rightarrow$ Push PR $\rightarrow$ Quality Gate ngắt pipeline (Fail-Fast) $\rightarrow$ Nút Merge PR bị khóa cứng.
     - Pipeline kích hoạt `.github/scripts/ai_triage.py` qua Gemini API.
     - **Minh chứng trên GitHub PR:** Bot AI tự động comment trực tiếp dưới PR: Tóm tắt lỗi, Cây giả thuyết (Hypothesis Tree), và Diff đoạn code gợi ý sửa.
     - Nhận định hạn chế: Nguy cơ hallucination nếu log bị cắt xén thiếu ngữ cảnh.
5. **Tổng kết Thực nghiệm & Video Screencast:**
   - Bảng tổng hợp số liệu định lượng (Pass rate, thời gian Cache, Flake rate, thời gian AI Triage).
   - Link Video Demo Full HD: [https://youtu.be/hze3wsX1Xck](https://youtu.be/hze3wsX1Xck).

---

### PHẦN III: HOẠT ĐỘNG PHỐI HỢP LỚP HỌC (JOINT ACTIVITY), BÀI HỌC KINH NGHIỆM & Q&A
*(Thời lượng kịch bản: ~15–20 phút hoạt động + 5 phút Q&A — Thành viên D cùng Nhóm 10 điều phối)*

1. **Joint In-class Activity — "Pipeline Postmortem":**
   - *Mục tiêu:* Tạo tình huống sinh viên đóng vai DevOps/QA Engineer điều tra log kiểm thử bị rớt.
   - *Bước 1 (Phân phát tài liệu):* Nhóm 10 phát đoạn log lỗi mẫu và file workflow.
   - *Bước 2 (Con người khoanh vùng):* Các nhóm sinh viên trong lớp thảo luận 5 phút, lập Cây giả thuyết (Hypothesis Tree) tìm 3 nguyên nhân khả dĩ nhất.
   - *Bước 3 (AI Triage bóc tách):* Nhóm 13 hướng dẫn nhập log vào AI, đối chiếu kết luận của AI với nhận định của con người.
   - *Bước 4 (Công bố Root Cause & Debrief):* Phân tích trường hợp AI bị nhiễu do thiếu ngữ cảnh hoặc giải thích đúng nguyên nhân gốc.
2. **Đúc kết Bài học Sư phạm (Audience Takeaways):**
   - *Cộng sinh Người & AI:* AI giỏi lọc nhiễu log (noise filtering), con người giỏi cắt tỉa giả thuyết (hypothesis pruning).
   - *Phân loại Flake Taxonomy:* Hiểu rõ bản chất lỗi chập chờn (timing, ordering, hay environment) trước khi áp dụng công cụ.
   - *Xu hướng tương lai:* Giới thiệu ngắn về Test Impact Analysis & Predictive Test Selection (Launchable, Sealights).
3. **Tài liệu Tham khảo & Hỏi đáp (Q&A):**
   - Danh mục trích dẫn chuẩn IEEE/ACM (J. Humble, M. Fowler, SQLite docs, Jest architecture).
   - Tuyên bố sử dụng AI có trách nhiệm (AI Disclosure).
   - Tiếp nhận câu hỏi thảo luận, phản biện từ giảng viên và sinh viên.

---

## 4. NGUYÊN TẮC THỰC HIỆN DÀNH CHO CÁC THÀNH VIÊN

* **Slide làm hết, toàn diện 100%:** Dù bài nói trên lớp chia sẻ cùng Nhóm 10, bộ slide của Nhóm 13 phải hoàn thiện đầy đủ cả 3 phần trên để phục vụ việc nộp chấm đồ án seminar.
* **Quyền chủ động của thành viên phụ trách:**
  - Tự do quyết định số lượng slide con trong phạm vi phần mình phụ trách để diễn đạt thoáng, rõ ràng, không nhồi nhét chữ.
  - Lựa chọn sơ đồ Mermaid hoặc hình ảnh thật từ `docs/assets/` để minh họa sinh động.
  - Viết phần ghi chú thuyết minh (speaker notes) phù hợp với thời lượng được phân bổ tại `docs/PresentationScript.md`.
* **Giữ vững nguyên tắc cốt lõi:**
  - Nền trắng chữ đen xuyên suốt.
  - Code block nền trắng/xám nhạt viền đen, font Monospace.
  - Luôn kiểm tra liên kết video YouTube demo hoạt động trơn tru.
