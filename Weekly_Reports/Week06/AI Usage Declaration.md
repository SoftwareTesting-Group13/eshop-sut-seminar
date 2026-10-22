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
| 4 | Nguyễn Gia Huy | 23120273 | Có dùng | OpenAI Codex / Google Gemini API | 40% |

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
  - Lượt bổ sung ngày 22/10/2026 với OpenAI Codex: rà logic coupon trong backend, mở rộng unit test thành 23 ca, tích hợp vào CI và đồng bộ tài liệu/audit trước khi review; ngưỡng hiện hành là **line coverage module coupon >70%**.
- **Prompt tiêu biểu:**
  > *"Viết kịch bản phân cảnh 6 phút bằng tiếng Anh cho video demo CI/CD GitHub Actions trên EShop: gồm cảnh kích hoạt pipeline, cache hit node_modules, và kích hoạt AI log triage khi fail. Cung cấp lệnh ffmpeg nén MP4 ≤ 100MB giữ rõ nét chữ terminal 1080p."*
  >
  > *"Hoàn thiện workflow `.github/workflows/eshop-ci.yml`: bổ sung bước Quality Gate kiểm soát bắt buộc 100% test suites phải pass, kiểm tra ngưỡng bao phủ mã nguồn (Coverage threshold check ≥ 80%), xuất báo cáo LCOV và cấu hình cơ chế Branch Protection Rules (Required Status Checks) chặn merge PR ngay lập tức nếu vi phạm để demo cơ chế Fail-Fast."*
  >
  > *"Giờ như này đi, m check coi trong backend á, cái coupon này nghiệp vụ tính toán nó như nào, r tạo unit test tương ứng để phủ cho cái feature này trong backend nhé, t nghĩ là đừng tạo riêng cái feature ngoài backend"*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - Câu lệnh ffmpeg do AI sinh ra rất chuẩn xác (`-c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k`). Kịch bản tiếng Anh được sinh viên chỉnh lại ngữ điệu cho tự nhiên và phù hợp với tốc độ thao tác thực tế trên màn hình.
  - Với phần CI/CD: AI ban đầu đề xuất đặt `coverageThreshold` trong `jest.config.js` **và** trong script gate — sinh viên đã loại bỏ cách đặt trùng để chỉ còn **một nơi duy nhất** quyết định PASS/FAIL, tránh tình trạng "Jest báo fail nhưng gate báo pass".
  - Tên Required Status Check được **không đoán** mà lấy từ check-run thật sau khi chạy workflow trên GitHub (`Quality Gate (100% Tests & Coverage >= 80%)`), rồi mới khai báo vào Branch Protection Rules — nếu lệch 1 ký tự thì PR sẽ treo ở trạng thái *"Expected — Waiting for status to be reported"*.
  - Toàn bộ số liệu coverage (43.36% statements / 19.54% branches / 19.17% functions / 47.01% lines) là số đo thật từ runner, không phải số liệu ước lượng của AI; phần chưa làm (sửa bug coupon percent, bổ sung test để đạt 80%) đã được ghi rõ là đề xuất chứ không tính vào kết quả.
  - Số liệu bổ sung 23/23 unit test, 58/58 full backend test và 100% line/branch coverage module coupon là kết quả **local** trên branch `ncuong`; chưa có GitHub Actions run cho thay đổi chưa commit/push. Kết quả cũ ở trên phản ánh một run trước đó, không phải trạng thái CI hiện hành. Diff do AI hỗ trợ vẫn chờ sinh viên review trước commit.

---

### 2.3. Sinh viên 3: Trần Gia Cường (MSSV: 23120225)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** Antigravity IDE (Gemini 3.8 Flash)
- **Mục đích sử dụng:**
  - Soạn thảo kế hoạch cá nhân Tuần 6 theo phương pháp Commit-Driven kết nối với `Checklist.md`.
  - Khởi tạo khung 7 mục chuẩn Rubric cho `User_Guide.md` và checklist đối soát nhóm.
  - Phân tích chuyên sâu bản chất kỹ thuật 2 lỗi bắt buộc: SQLite Concurrency Lock (`SQLITE_BUSY`) và Coupon Percent Formula Bug (âm `discount_amount`).
- **Prompt tiêu biểu:**
  > *"Soạn thảo Failure Mode 1 — SQLite Concurrency Lock. Phân tích rõ tại sao phải thêm cờ --runInBand (hoặc -i). Soạn thảo Failure Mode 2 — Coupon Percent Formula Bug mổ xẻ lỗi discount_amount âm trong server.js."*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - AI cung cấp phân tích logic chi tiết và sơ đồ ASCII rõ ràng. Sinh viên đã trực tiếp đối chiếu lại từng dòng code trong `backend/server.js` (dòng 398-401 và 418-421) cùng `backend/tests/coupon.test.js`, đồng thời yêu cầu loại bỏ hoàn toàn các ký tự LaTeX math (`$...$`) chuyển sang ký tự Unicode chuẩn để tránh lỗi hiển thị trên GitHub.

---

### 2.4. Sinh viên 4: Nguyễn Gia Huy (MSSV: 23120273)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** OpenAI Codex / Google Gemini API (google-generativeai SDK)
- **Mục đích sử dụng:**
  - Hỗ trợ hoàn thiện logic kết nối Gemini API thật trong file script `.github/scripts/ai_triage.py`.
  - Tư vấn thiết kế kịch bản bài tập lớp "Pipeline Postmortem" thời lượng 20-25 phút và barem chấm điểm.
- **Prompt tiêu biểu:**
  > *"Cung cấp đoạn mã Python sử dụng google-generativeai gọi model gemini-1.5-flash để phân tích raw test failure logs và trả về cấu trúc JSON nghiêm ngặt gồm root_cause_hypotheses, evidence_lines, và recommended_fixes."*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - AI sinh code ban đầu dùng SDK phiên bản cũ gây lỗi cú pháp khi gọi API. Sinh viên đã tự tra cứu tài liệu mới nhất của Google GenAI SDK để sửa lại cấu trúc khởi tạo client và parse JSON an toàn khi Gemini trả về markdown code blocks.

---

## 3. DANH MỤC CÁC TỆP NHẬT KÝ CHAT LOG CHI TIẾT

Mỗi thành viên lưu toàn bộ nội dung trao đổi chi tiết với AI trong thư mục `chat_logs/`:
1. Nguyễn Ngọc Minh Tuấn: [chatlog_mtuan_slides_coupon_tests.md](./chat_logs/chatlog_mtuan_slides_coupon_tests.md)
2. Dương Nhật Cường: [chatlog_ncuong_video_storyboard_ci.md](./chat_logs/chatlog_ncuong_video_storyboard_ci.md)
3. Trần Gia Cường: [chatlog_gcuong_user_guide.md](./chat_logs/chatlog_gcuong_user_guide.md)
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
