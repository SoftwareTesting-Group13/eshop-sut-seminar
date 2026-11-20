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
   - Thuyết minh rõ ràng, không nhạc nền; thời lượng đạt chuẩn 5 – 8 phút; dung lượng file nén đạt chuẩn **≤ 100MB** ở độ phân giải 1080p.

4. **Về mặt Bài tập Tương tác trên lớp (`Activity_Worksheet.md` & `Activity_Worksheet_AnswerKey.md`):**
   - Đã tạo và tinh gọn bản nháp [Activity_Worksheet.md](../../Activity_Worksheet.md): 23 phút, 10 điểm, đọc hồ sơ SQLite/coupon/async/cache và viết lệnh đề xuất; không bắt buộc chạy test trên lớp. Hai nhóm trình bày, mọi nhóm nộp phiếu. Đã tách [ghi chú điều phối](../../Materials/Worksheet_Facilitator_Notes.md) khỏi phiếu sinh viên.
   - [Bộ Sample CI Logs](../../Materials/Sample_Logs/README.md) đã có 6 raw log: coupon/cache lịch sử và hai job SQLite demo cùng run `39741620266`, kèm bản trích, metadata, source đúng SHA và đủ 7 ảnh. SQLite là tái hiện có kiểm soát trên nhánh riêng: parallel SQLITE_BUSY, serial pass; không sửa code nghiệp vụ.
   - Đã soạn và rà soát [Answer Key W6-17](../../Activity_Worksheet_AnswerKey.md) cho 10 câu, có nguồn/revision, hướng sửa/cách xác nhận và điểm từng ý; đã có ảnh barem. Giữ ghi chú **barem đề xuất, chưa được nhóm duyệt**; chưa thử chấm hoặc đo thời lượng với lớp, chuẩn bị Draft PR để nhóm phản hồi.

5. **Về mặt Đo đạc Thực nghiệm (Empirical Metrics) & AI Triage:**
   - Đã có [Empirical Metrics W6-20](../../Empirical_Metrics.md), [protocol](../../Materials/Empirical_Metrics/ghuy_protocol.md), raw artifacts và CSV từ 10 workflow runs (20 invocation): before 5/10 fail, after 0/10 fail, giảm 50 điểm phần trăm. Profile fast/slow được chọn trước; không suy rộng thành flake rate tự nhiên hoặc kết luận đã loại hết flaky.
   - Một cặp cache riêng xác nhận miss/hit cùng key/SHA/image: khoảng chuẩn bị dependency 6.283604/2.330145 giây, speedup 2.697×; tách khỏi npm ci step và tổng job. Image giữa 10 cặp thay đổi được ghi thành giới hạn, không loại mẫu.
   - API Gemini gọi thật một lần trong workflow đo: HTTP 200, JSON hợp lệ, nhận body khoảng 2.456 giây. Đã đối chiếu riêng chẩn đoán với tham chiếu (1 giả thuyết có bằng chứng/1); không coi JSON hợp lệ là độ chính xác. W6-19 đã kiểm chứng kỹ thuật bằng script/unit test kế thừa tuần 5, chưa nghiệm thu riêng theo đầy đủ evidence; W6-20 có 5 ảnh history/metrics/cache/API được mở kiểm tra, còn chờ nhóm rà soát số liệu.

6. **Về mặt Đóng gói & Pre-share:**
   - Đóng gói toàn bộ sản phẩm mốc 90% lên Google Drive và GitHub Releases sẵn sàng nộp và chia sẻ cho lớp trước buổi báo cáo ít nhất 3 ngày làm việc.

7. **Về mặt Báo cáo Tổng kết Seminar (`docs/Report.md`):**
   - Đã hoàn tất biên soạn tài liệu Báo cáo Tổng kết Seminar toàn diện (686 dòng, 10 mục lớn), bao quát đầy đủ cơ sở lý thuyết, kiến trúc Test Harness Monorepo, khảo sát bộ công cụ, phân tích chuyên sâu 3 Failure Modes, ma trận RACI và bảng tổng hợp số liệu thực nghiệm của cả nhóm.

---

## 2. BẢNG TIẾN ĐỘ THỰC HIỆN CỦA 4 THÀNH VIÊN TRONG TUẦN 6

| Thành viên | Nhiệm vụ chính được giao | Giờ (Hours) | Trạng thái | Đánh giá kết quả thực tế |
| :--- | :--- | :---: | :---: | :--- |
| **Nguyễn Ngọc Minh Tuấn** | Lead soạn bộ Slide (pptx & md ≤ 15 trang), mở rộng test suites coupon & cấu hình LCOV coverage | 17.0h | Đang làm | Thiết kế khung Slide pptx/md 15 trang; bổ sung 21 ca test Data-Driven cho coupon; cấu hình Jest HTML coverage. |
| **Dương Nhật Cường** | Lead sản xuất Video Screencast (1080p, ≤ 100MB), Quality Gate CI, đóng gói Pre-share | 18.0h | Hoàn thành | Lập kịch bản Storyboard, quay màn hình thao tác thật, thu âm thuyết minh, nén video ffmpeg ≤ 100MB, đóng gói Drive. **Quality Gate CI (W6-07) đã xong**: workflow có job `Quality Gate (100% Tests & Coverage >= 80%)` kiểm tra 100% suite pass + ngưỡng coverage 80% + xuất LCOV, Branch Protection Rules đã bật trên `main` (PR #7 đang ở trạng thái `blocked` — đúng cơ chế Fail-Fast cần demo). |
| **Trần Gia Cường** | Lead biên soạn `User_Guide.md` tiếng Anh, Báo cáo Tổng kết Seminar (`docs/Report.md`), 3 Failure Modes, Sơ đồ Mermaid, Step-by-Step Guide | 21.5h | Hoàn thành | Khởi tạo khung User Guide (`2cb8b4c`), hoàn tất 3 Failure Modes (`9a095ec`), hoàn thành bộ 3 Sơ đồ Mermaid (`0a6f982`), biên soạn Hướng dẫn từng bước & thực nghiệm local (`74e02da`), rà soát liên kết TOC (`a5973a4`), biên soạn Báo cáo Tổng kết Seminar toàn diện (`docs/Report.md`), thu thập 6 ảnh minh chứng thực tế, cập nhật đầy đủ hồ sơ tuần. |
| **Nguyễn Gia Huy** | Lead thiết kế `Activity_Worksheet.md` & Answer Key, kiểm chứng AI Triage Gemini API, đo đạc Metrics Flake Rate | 18.0h | Đã thực hiện kỹ thuật; chờ kiểm chứng thủ công | W6-16–20 có tài liệu, raw/test và 15 ảnh thật; W6-19 tái sử dụng script tuần 5, đã gọi API thật trong W6-20. Chưa chốt DoD: chờ nhóm duyệt barem/nguồn/bàn giao số liệu và sinh viên xác nhận. 18.0h là giờ kế hoạch. |

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
* **Tài liệu Báo cáo Tổng kết Seminar toàn diện:** [docs/Report.md](../../docs/Report.md).
* **Bộ Slide thuyết trình:** `Seminar_Slides.pptx` & `Seminar_Slides.md`.
* **Bài tập tương tác trên lớp:** [Activity_Worksheet.md](../../Activity_Worksheet.md) và [Answer Key / barem](../../Activity_Worksheet_AnswerKey.md) đã soạn, chờ rà soát cuối.
* **Thực nghiệm W6-20:** [Empirical_Metrics.md](../../Empirical_Metrics.md) và [danh mục dữ liệu](../../Materials/Empirical_Metrics/README.md).

---

## 4. KHU VỰC MINH CHỨNG TRỰC QUAN (VISUAL EVIDENCE)

> [!NOTE]
> Mọi file ảnh minh chứng được lưu trong thư mục `Weekly_Reports/Week06/screenshots/` và tuân thủ quy tắc tiền tố tên thành viên. Mục này chỉ ghi nhận các file ảnh minh chứng thực tế đã tồn tại trong thư mục.

### 4.1. Minh chứng nhóm Trần Gia Cường (`gcuong_`)
1. **Minh chứng Task W6-01: Bố cục User Guide tiếng Anh & Mục lục 8 phần:**
   - **File:** `gcuong_01_user_guide_toc.png`
   - **Mô tả:** Ảnh chụp giao diện xem trước (Markdown Preview) phần đầu tài liệu `User_Guide.md`, hiển thị thông tin bài nộp và mục lục Table of Contents với 8 phần chuyên sâu theo đúng rubric môn học.
2. **Minh chứng Task W6-02: Phân tích chuyên sâu 3 Mandatory Failure Modes:**
   - **File:** `gcuong_02_failure_modes_analysis.png`
   - **Mô tả:** Ảnh chụp khối phân tích kỹ thuật chuyên sâu về các lỗi bắt buộc, minh họa nguyên nhân gốc rễ và bảng so sánh 4 giải pháp kiến trúc khắc phục.
3. **Minh chứng Task W6-03: Hệ thống sơ đồ kỹ thuật Mermaid tương tác:**
   - **File:** `gcuong_03_mermaid_diagrams.png`
   - **Mô tả:** Ảnh chụp sơ đồ kiến trúc Mermaid render trực quan trên GitHub với đầy đủ các subgraph phân tầng, đường nối in đậm và các khối quyết định điều kiện.
4. **Minh chứng Task W6-04: Hướng dẫn thực nghiệm từng bước & Kết quả chạy Test Terminal:**
   - **File:** `gcuong_04_reproduction_run.png`
   - **Mô tả:** Ảnh chụp cửa sổ Terminal PowerShell chạy chuỗi lệnh kiểm thử thực tế `npm test`: 7/7 test suites pass, 61/61 test cases pass, độ bao phủ dòng đạt 78.81% (vượt Quality Gate > 70%).
5. **Minh chứng Task W6-05: Rà soát học thuật, References IEEE/ACM & AI Statement:**
   - **File:** `gcuong_05_references_academic_review.png`
   - **Mô tả:** Ảnh chụp Mục 8 trong `User_Guide.md` gồm danh mục tài liệu tham khảo chuẩn IEEE/ACM và Bản tuyên bố liêm chính học thuật về việc sử dụng AI (AI Disclosure Statement).
6. **Minh chứng Task W6-13: Biên soạn Báo cáo Tổng kết Seminar (`docs/Report.md`):**
   - **File:** `gcuong_06_report.png`
   - **Mô tả:** Ảnh chụp giao diện xem trước (Markdown Preview) tài liệu Báo cáo Tổng kết Seminar toàn diện `docs/Report.md`, hiển thị thông tin đề tài, mục lục và các phần nội dung tổng hợp Proposal, kiến trúc Test Harness, ma trận RACI và kết quả đo đạc thực nghiệm.
7. **Minh chứng Bổ sung (Lịch sử Commit):**
   - **File:** `gcuong-commits-week6.png`
   - **Mô tả:** Ảnh chụp lịch sử Git Commits của Trần Gia Cường trên GitHub repository (nhánh `gcuong`), minh chứng hoàn thành đầy đủ chuỗi 5 commit hoàn thiện `User_Guide.md`.

### 4.2. Minh chứng nhóm Nguyễn Ngọc Minh Tuấn (`mtuan_`)
1. **Minh chứng Task W6-11: Slide Báo cáo Thuyết trình (15 slides)**
   - File: `mtuan_03_slide_overview.png`
   - Mô tả: Ảnh chụp tổng quan giao diện thiết kế bộ Slide báo cáo `Seminar_Slides.pptx` (chữ đen nền trắng, cấu trúc chuẩn 15 trang).
2. **Minh chứng Task W6-12: Slide phân tích lỗi Failure Mode 2**
   - File: `mtuan_02_failure_mode_2.png`
   - Mô tả: Slide chi tiết phân tích lỗi tính phần trăm coupon (`(1 - discount_value)`), code diff và biểu thức toán học.
3. **Minh chứng Task W6-13: Mở rộng Data-Driven Tests & Báo cáo LCOV/HTML Coverage**
   - File: `mtuan_01_coupon_tests.png`, `mtuan_04_html_code_coverage.png`, `mtuan_05_terminal_log.png`
   - Mô tả: Bộ 21 ca kiểm thử Jest Data-Driven (`test.each`) cho coupon và giao diện báo cáo HTML Code Coverage đạt chỉ tiêu.

### 4.3. Minh chứng nhóm Dương Nhật Cường (`ncuong_`)
1. **Minh chứng Task W6-08 & W6-09: Sản xuất Video Screencast Demo**
   - File thông tin & link video: `videos/README.md`
   - Mô tả: Video quay màn hình thao tác trực tiếp trên IDE/terminal/GitHub Actions (thời lượng ~10 phút, độ phân giải 1080p, thuyết minh rõ ràng). Thực hiện trọn vẹn kịch bản Fail-Fast PR Lock và AI Log Triage.


### 4.4. Minh chứng nhóm Nguyễn Gia Huy (`ghuy_`)

Đã có cặp ảnh SQLite CI do sinh viên chụp, Codex đã mở và đối chiếu với log:

- [SQLite parallel — SQLITE_BUSY, exit 1](screenshots/ghuy_03f_sqlite_ci_failure.png).
- [SQLite serial — COMMIT rồi ghi thành công](screenshots/ghuy_03g_sqlite_serial_pass.png).

Cả hai hiển thị run `39741620266`, SHA `485a778` và tên job. Đây là demo có
kiểm soát trên nhánh riêng; không phải ảnh lỗi lịch sử của EShop.

Đã kiểm tra thêm ảnh [coupon fail](screenshots/ghuy_03a_coupon_ci_failure.png),
[cache miss/job pass](screenshots/ghuy_03b_cache_miss_pass.png),
[cache hit/install skipped](screenshots/ghuy_03c_cache_hit_pass.png) và
[index Sample Logs](screenshots/ghuy_03e_sample_logs_index.png).
Đã nhận và kiểm tra [ảnh install fail do lockfile](screenshots/ghuy_03d_cache_miss_install_failure.png).
Bộ ảnh W6-18 ghuy_03a–ghuy_03g đầy đủ.

1. **Minh chứng ghuy-1: Giao diện Bài tập Worksheet & Answer Key**
   - File: `ghuy_01_worksheet_preview.png`, `ghuy_02_answerkey_rubric.png`
   - Trạng thái: Đã có [preview Worksheet](screenshots/ghuy_01_worksheet_preview.png), [ảnh tiếp theo](screenshots/ghuy_01b_worksheet_preview.png) và [Answer Key/barem](screenshots/ghuy_02_answerkey_rubric.png). Codex đã mở kiểm tra; barem chưa được nhóm duyệt.
2. **Minh chứng ghuy-2: Kết quả chạy AI Triage Gemini API & Thống kê 10 runs Flake Rate**
   - File: `ghuy_04_ai_triage_gemini_output.png`, `ghuy_05_flake_rate_10runs.png`
   - Trạng thái: Đã có số liệu 10 cặp CI và một output Gemini thật trong W6-20; đã nhận và mở kiểm tra 5 ảnh history/metrics/cache cold/warm/API. Hướng dẫn tại [screenshots/README.md](screenshots/README.md); chưa tạo ảnh thay thế.
   - Ảnh thật: [API](screenshots/ghuy_04_ai_triage_gemini_output.png), [10 runs](screenshots/ghuy_05_flake_rate_10runs.png), [bảng metrics](screenshots/ghuy_06_empirical_metrics.png), [cold](screenshots/ghuy_07_cache_cold.png), [warm](screenshots/ghuy_07_cache_warm.png).

**Rà soát cuối W6-16–20:** Log và phạm vi kiểm tra tại [verification/README.md](verification/README.md).
Lượt rà soát trước tích hợp: backend 37/37 và AI offline 6/6; snapshot main
`634c131` có backend 58/58, AI 8/10. Nhánh tài liệu đã tích hợp main `32e1178`
qua merge local `92d8e41`; kiểm thử lại backend 61/61 pass, AI 8/10 và dry-run
exit 0. Hai fail AI do assertion đường dẫn Windows giống baseline; không sửa/skip.
Tái tính 10 cặp và 97 checksum metrics khớp; database/Checklist không thay đổi.
Sinh viên tự đặt tỷ lệ AI 35%; chữ ký/tự kiểm chứng và trao đổi nhóm chưa được
Codex xác nhận thay. Chuẩn bị Draft PR vào main để nhóm trưởng phản hồi, chưa merge main.

---

## 5. ĐÁNH GIÁ RỦI RO VÀ KẾ HOẠCH HÀNH ĐỘNG TUẦN TIẾP THEO

- **Khó khăn / Rủi ro chính trong Tuần 6:**
  - Khối lượng công việc lớn do phải hoàn thành trọn bộ 5 sản phẩm đầu ra chính đạt mốc 90%.
  - Việc thu âm thuyết minh đòi hỏi phát âm rõ ràng, không lẫn tạp âm, khớp thời gian với thao tác màn hình.
  - Cần đảm bảo dung lượng video `Demo_Screencast.mp4` nghiêm ngặt dưới 100MB mà vẫn giữ chất lượng hiển thị sắc nét văn bản dòng lệnh ở 1080p.
- **Giải pháp xử lý:**
  - Áp dụng triệt để quy chuẩn commit-driven, hoàn thành từng task nhỏ và tự đối soát qua `Checklist.md`.
  - Sử dụng ffmpeg với bộ mã hóa H.264 (CRF 22–24, audio AAC 128kbps) để tối ưu dung lượng video.
  - Tổ chức họp rà soát chéo giữa các thành viên trước khi nén gói Pre-share Package.
- **Kế hoạch hành động Tuần 7 (Giai đoạn Báo cáo trực tiếp tại lớp):**
  - Đăng tải thông báo Pre-share lên Moodle và chia sẻ link Drive cho lớp trước ngày seminar ít nhất 3 ngày làm việc.
  - Tổ chức tổng duyệt (Dry Run) toàn bộ 45 phút báo cáo: Pitch (10m) + Live Demo (10m) + Activity Worksheet (20m) + Q&A (5m).
  - Chuẩn bị sẵn máy dự phòng và môi trường offline đề phòng sự cố mạng trong buổi báo cáo trực tiếp.
