# BẢN KÊ KHAI SỬ DỤNG AI — TUẦN 6 (WEEK 6 AI USAGE DECLARATION)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo  
**Nhóm thực hiện:** Nhóm 13  
**Giai đoạn:** Tuần 6 (Đóng gói sản phẩm Deliverables mốc 90%)

---

## 1. BẢNG TỔNG HỢP KÊ KHAI SỬ DỤNG AI THEO TỪNG THÀNH VIÊN

> [!IMPORTANT]
> **Quy định môn học:** Mỗi thành viên đều phải tự khai báo minh bạch công cụ AI mình đã dùng trong tuần. **Nếu thành viên không sử dụng bất kỳ công cụ AI nào trong tuần làm việc, bắt buộc phải ghi rõ: *"Tôi xác nhận không sử dụng AI trong tuần này"*.**

| STT | Họ và tên sinh viên | Mã số sinh viên (MSSV) | Trạng thái sử dụng | Các công cụ AI đã sử dụng | Tỷ lệ đóng góp của AI (%) |
| :---: | :--- | :---: | :---: | :--- | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | 23120102 | Có dùng | Claude 3.5 Sonnet | 35% |
| 2 | Dương Nhật Cường | 23120223 | Có dùng | OpenCode / ChatGPT | 35% |
| 3 | Trần Gia Cường | 23120225 | Có dùng | Antigravity IDE (Gemini 2.5 Flash / Pro) | 35% |
| 4 | Nguyễn Gia Huy | 23120273 | Có dùng | OpenAI Codex | 40% |

---

## 2. NHẬT KÝ CHI TIẾT QUÁ TRÌNH SỬ DỤNG AI CỦA TỪNG THÀNH VIÊN

### 2.1. Sinh viên 1: Nguyễn Ngọc Minh Tuấn (MSSV: 23120102)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** Claude 3.5 Sonnet
- **Mục đích sử dụng:**
  - Hỗ trợ xây dựng dàn ý cấu trúc bộ slide thuyết trình 15 trang tóm gọn nội dung kỹ thuật.
  - Tư vấn thiết kế ca kiểm thử Jest Data-Driven mở rộng cho các phân quyền mã giảm giá (coupon authorization).
- **Prompt tiêu biểu:**
  > *"Gợi ý cấu trúc bộ slide 15 trang chuẩn rubric seminar cho đề tài CI/CD & Test-Harness Engineering trên hệ thống EShop monorepo. Tập trung biểu đồ, sơ đồ luồng và phân tích chuyên sâu Failure Mode coupon percent thay vì slide toàn chữ."*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - Phản hồi của Claude cung cấp khung dàn ý tốt, tuy nhiên một số slide bị quá dài. Sinh viên đã chủ động tinh gọn lại thành bảng biểu, lược bỏ text dư thừa, và tự thiết kế slide phân tích bug với code snippet trực quan.

---

### 2.2. Sinh viên 2: Dương Nhật Cường (MSSV: 23120223)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** OpenCode / ChatGPT
- **Mục đích sử dụng:**
  - Soạn kịch bản phân cảnh (Storyboard) và tra cứu thuật ngữ tiếng Anh chuẩn cho phần thuyết minh video demo.
  - Tham khảo lệnh tối ưu hóa ffmpeg nén video 1080p xuống dưới 100MB mà không làm mờ terminal text.
  - Thiết kế và hiện thực bước **Quality Gate** trong `.github/workflows/eshop-ci.yml` (100% test suites phải PASS, ngưỡng coverage ≥ 80%, xuất báo cáo LCOV) kèm cơ chế **Branch Protection Rules** chặn merge PR (Fail-Fast).
- **Prompt tiêu biểu:**
  > *"Viết kịch bản phân cảnh 6 phút bằng tiếng Anh cho video demo CI/CD GitHub Actions trên EShop: gồm cảnh kích hoạt pipeline, cache hit node_modules, và kích hoạt AI log triage khi fail. Cung cấp lệnh ffmpeg nén MP4 ≤ 100MB giữ rõ nét chữ terminal 1080p."*
  >
  > *"Hoàn thiện workflow `.github/workflows/eshop-ci.yml`: bổ sung bước Quality Gate kiểm soát bắt buộc 100% test suites phải pass, kiểm tra ngưỡng bao phủ mã nguồn (Coverage threshold check ≥ 80%), xuất báo cáo LCOV và cấu hình cơ chế Branch Protection Rules (Required Status Checks) chặn merge PR ngay lập tức nếu vi phạm để demo cơ chế Fail-Fast."*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - Câu lệnh ffmpeg do AI sinh ra rất chuẩn xác (`-c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k`). Kịch bản tiếng Anh được sinh viên chỉnh lại ngữ điệu cho tự nhiên và phù hợp với tốc độ thao tác thực tế trên màn hình.
  - Với phần CI/CD: AI ban đầu đề xuất đặt `coverageThreshold` trong `jest.config.js` **và** trong script gate — sinh viên đã loại bỏ cách đặt trùng để chỉ còn **một nơi duy nhất** quyết định PASS/FAIL, tránh tình trạng "Jest báo fail nhưng gate báo pass".
  - Tên Required Status Check được **không đoán** mà lấy từ check-run thật sau khi chạy workflow trên GitHub (`Quality Gate (100% Tests & Coverage >= 80%)`), rồi mới khai báo vào Branch Protection Rules — nếu lệch 1 ký tự thì PR sẽ treo ở trạng thái *"Expected — Waiting for status to be reported"*.
  - Toàn bộ số liệu coverage (43.36% statements / 19.54% branches / 19.17% functions / 47.01% lines) là số đo thật từ runner, không phải số liệu ước lượng của AI; phần chưa làm (sửa bug coupon percent, bổ sung test để đạt 80%) đã được ghi rõ là đề xuất chứ không tính vào kết quả.

---

### 2.3. Sinh viên 3: Trần Gia Cường (MSSV: 23120225)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** Antigravity IDE (Gemini 2.5 Flash / Pro)
- **Mục đích sử dụng:**
  - Hỗ trợ soát lỗi văn phong tiếng Anh học thuật và định dạng Markdown trong `User_Guide.md`.
  - Tham khảo cú pháp Mermaid vẽ sơ đồ cơ chế File Locking của SQLite (Shared Lock vs Exclusive Lock).
- **Prompt tiêu biểu:**
  > *"Review the technical grammar and clarity of Section 6 (Mandatory Failure Modes) in User_Guide.md. Generate a clean Mermaid state/sequence diagram illustrating SQLite database locking conflict during parallel Jest runs versus sequential execution."*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - Sơ đồ Mermaid do AI sinh ra cần sửa lại tên các node để tránh ký tự đặc biệt gây lỗi render trên GitHub Markdown. Nội dung phân tích lỗi SQLite lock và async delay được sinh viên đối chiếu trực tiếp với mã nguồn và log chạy thực tế của SUT để đảm bảo 100% tính xác thực.

---

### 2.4. Sinh viên 4: Nguyễn Gia Huy (MSSV: 23120273)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** OpenAI Codex
- **Mục đích sử dụng:**
  - Hỗ trợ thiết kế `Activity_Worksheet.md` cho hoạt động nhóm "Pipeline Postmortem": phân tích lỗi SQLite lock, coupon percent, async delay và trạng thái cache trong pipeline.
  - Gợi ý phân bổ thời gian, thang điểm và cách trình bày câu hỏi; soạn hướng dẫn điều phối và danh mục nguồn log phục vụ bài tập.
  - Hỗ trợ W6-18: tìm run GitHub Actions, tải log thật, trích dòng bằng chứng và lưu metadata; phân biệt lỗi cài dependency với trạng thái cache miss.
  - Hỗ trợ W6-17: soạn Answer Key cho 10 câu của Worksheet, đối chiếu số liệu/log/code và chia barem từng ý.
- **Prompt tiêu biểu:**
  > **W6-16:** *"Tinh gọn Worksheet Pipeline Postmortem trong 20–25 phút về SQLite lock, coupon percent, async delay và cache; chia thang điểm 10, thêm chỗ trả lời và tách hướng dẫn điều phối. Sinh viên đọc log/code và đề xuất cách kiểm chứng, không bắt buộc chạy test trên lớp."*
  >
  > *"Thực hiện W6-18: thu thập Sample CI Failure Logs cho bài tập Pipeline Postmortem."*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - Bản nháp ban đầu có nhiều câu hỏi phụ, dễ vượt thời lượng. Sau trao đổi, nội dung được tinh gọn thành hoạt động 23 phút, tổng 10 điểm; sinh viên đọc hồ sơ và viết lệnh kiểm tra đề xuất. Hướng dẫn tổ chức được tách sang `Materials/Worksheet_Facilitator_Notes.md`, phần trình bày giới hạn hai nhóm, mỗi nhóm 60 giây.
  - Codex đã đối chiếu mã nguồn và log tham khảo, phát hiện công thức coupon hiện tại đã được sửa nên ghi rõ log tuần 5 thuộc phiên bản sự cố cũ; đồng thời kiểm tra liên kết và định dạng Markdown. Sinh viên còn cần rà soát nội dung, chọn log CI thật và kiểm tra bố cục trước khi nghiệm thu.
  - Đã tải 6 log job CI qua REST API, lưu bản raw, trích đoạn đánh số dòng, metadata và source đúng commit. Đối chiếu cache cho thấy miss vẫn có run pass; một run khác fail vì package/lockfile không đồng bộ. Các số `~60s/~5s` trong script cũ là nội dung ghi cứng, không dùng làm số đo.
  - Không tìm thấy SQLite lock trong 25 run lịch sử đã rà soát nên đã tạo demo trên nhánh riêng, không sửa code nghiệp vụ. Run `39741620266`, SHA `485a778`, có job parallel báo SQLITE_BUSY và serial pass. Đây là tái hiện có kiểm soát bằng hai kết nối trong một tiến trình, không phải bằng chứng SUT lỗi do nhiều Jest worker. Codex kiểm tra log/source; sinh viên còn cần đối chiếu và chụp ảnh minh chứng.
  - Đã có bản soạn Answer Key với đáp án, log, file/hàm/dòng và revision, nguyên nhân cùng hướng sửa/cách xác nhận từng câu; barem đề xuất 3 + 3 + 3 + 1 = 10 chưa được nhóm duyệt. Đối chiếu coupon xác định discount_amount âm, final_amount dương vượt tổng, khác diễn giải điều kiện ở kế hoạch dòng 68. Đáp án giữ rõ nguồn CI/local và giới hạn giả thuyết; sinh viên còn cần đọc lại, thử chấm và chụp preview.
  - Đã rà soát để đóng gói local bộ Worksheet, Answer Key và 6 raw log CI. Có 2 ảnh Worksheet, 1 ảnh barem và 7 ảnh CI/index do sinh viên chụp, Codex đã mở kiểm tra. Barem chưa được nhóm duyệt; chưa push tài liệu, thử chấm với lớp, kiểm chứng Gemini hoặc đo 10 lượt CI.

---

## 3. DANH MỤC CÁC TỆP NHẬT KÝ CHAT LOG CHI TIẾT

Mỗi thành viên lưu toàn bộ nội dung trao đổi chi tiết với AI trong thư mục `chat_logs/`:
1. Nguyễn Ngọc Minh Tuấn: [chatlog_mtuan_slides_coupon_tests.md](./chat_logs/chatlog_mtuan_slides_coupon_tests.md)
2. Dương Nhật Cường: [chatlog_ncuong_video_storyboard_ci.md](./chat_logs/chatlog_ncuong_video_storyboard_ci.md)
3. Trần Gia Cường: [chatlog_gcuong_user_guide_failure_modes.md](./chat_logs/chatlog_gcuong_user_guide_failure_modes.md)
4. Nguyễn Gia Huy: [chatlog_ghuy_worksheet_ai_triage.md](./chat_logs/chatlog_ghuy_worksheet_ai_triage.md)

---

## 4. CAM KẾT LIÊM CHÍNH HỌC THUẬT (ACADEMIC INTEGRITY DECLARATION)

Chúng tôi xin cam kết danh dự:
1. Toàn bộ nội dung khai báo trên là trung thực và phản ánh chính xác quá trình sử dụng các công cụ trí tuệ nhân tạo (AI) trong tuần làm việc thứ 6 của nhóm.
2. AI chỉ được sử dụng với vai trò là công cụ hỗ trợ (tư vấn giải pháp, rà soát ngữ pháp, gợi ý cấu trúc kịch bản). Mọi dòng mã nguồn, test suites, bài tập, slide và tài liệu hướng dẫn đều được các thành viên trong nhóm trực tiếp đọc hiểu, kiểm chứng thực nghiệm và chịu trách nhiệm hoàn toàn về tính đúng đắn.
3. Nhóm tuyệt đối không sao chép nguyên văn (copy-paste) kết quả chưa qua kiểm chứng từ AI.

| STT | Họ và tên thành viên | Trạng thái xác nhận | Ngày cam kết |
| :---: | :--- | :---: | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | Đã xác nhận | 18/10/2026 |
| 2 | Dương Nhật Cường | Đã xác nhận | 18/10/2026 |
| 3 | Trần Gia Cường | Đã xác nhận | 18/10/2026 |
| 4 | Nguyễn Gia Huy | Đã xác nhận | 18/10/2026 |
