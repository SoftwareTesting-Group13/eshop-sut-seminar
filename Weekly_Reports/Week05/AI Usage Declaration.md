# BẢN KÊ KHAI SỬ DỤNG AI — TUẦN 5 (WEEK 5 AI USAGE DECLARATION)
**Khóa học:** Kiểm thử Phần mềm (Software Testing - AI-First) — 2026  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System  
**Nhóm thực hiện:** Nhóm 13  
**Giai đoạn:** Tuần 5 (Kế hoạch thực nghiệm SUT & Đề cương Proposal)

---

## 1. BẢNG TỔNG HỢP KÊ KHAI SỬ DỤNG AI THEO TỪNG THÀNH VIÊN

> [!IMPORTANT]
> **Quy định môn học:** Mỗi thành viên đều phải tự khai báo minh bạch công cụ AI mình đã dùng trong tuần. **Nếu thành viên không sử dụng bất kỳ công cụ AI nào trong tuần làm việc, bắt buộc phải ghi rõ tuyên bố: *"Tôi xác nhận không sử dụng AI trong tuần này"*.**

| STT | Họ và tên sinh viên | Mã số sinh viên (MSSV) | Trạng thái sử dụng | Các công cụ AI đã sử dụng | Tỷ lệ đóng góp của AI vào kết quả |
| :---: | :--- | :---: | :---: | :--- | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | 23120102 | Có sử dụng | ChatGPT (GPT-4o), Claude 3.5 Sonnet | ~20% (Tra cứu lý thuyết, gợi ý so sánh) |
| 2 | Dương Nhật Cường | 23120223 | Có sử dụng | GitHub Copilot, Claude 3.5 Sonnet | ~25% (Hỗ trợ cú pháp YAML GitHub Actions) |
| 3 | Trần Gia Cường | 23120225 | Có sử dụng | Antigravity IDE, ChatGPT | ~20% (Gợi ý cấu trúc Jest Data-Driven) |
| 4 | Nguyễn Gia Huy | 23120273 | Có sử dụng | Gemini 1.5 Pro, Claude 3.5 Sonnet | ~30% (Viết script Python AI Log Triage) |

*(Lưu ý: Bảng trên là dữ liệu mẫu định hướng. Mỗi thành viên khi tổng kết tuần sẽ cập nhật lại chính xác danh sách công cụ thực tế mình đã dùng hoặc đổi thành trạng thái "Tôi không sử dụng AI").*

---

## 2. NHẬT KÝ CHI TIẾT QUÁ TRÌNH SỬ DỤNG AI CỦA TỪNG THÀNH VIÊN

### 2.1. Sinh viên 1: Nguyễn Ngọc Minh Tuấn (MSSV: 23120102)
- **Tình trạng sử dụng:** Có sử dụng.
- **Công cụ:** ChatGPT (OpenAI), Claude 3.5 Sonnet.
- **Mục đích:** Hỗ trợ tìm kiếm tài liệu chuẩn về sự khác biệt kiến trúc giữa CI/CD Pipeline truyền thống và Test Harness Engine; hỗ trợ đối chiếu 5 tiêu chí khảo sát công cụ trong `toolSurvey.md`.
- **Câu Prompt tiêu biểu:**
  > *"So sánh chi tiết sự khác biệt giữa Continuous Integration (CI) pipeline và Test Harness. Cho ví dụ minh họa 4 thành phần kiến trúc của Test Harness trên ứng dụng Node.js."*
- **Đánh giá kết quả sinh ra:** AI giải thích khá đầy đủ về mặt lý thuyết, nhưng đưa ra các ví dụ chung chung. Tôi đã tự đối chiếu lại với tài liệu gốc của Martin Fowler và sách *Continuous Delivery* để chỉnh sửa cho khớp với ngữ cảnh môn học.
- **Kiểm chứng & Biên tập thủ công:** 100% nội dung lý thuyết trong `Proposal.md` đã được tôi viết lại bằng từ ngữ kỹ thuật tiếng Việt chuẩn mực, loại bỏ các từ dịch máy không hợp lý (như "động cơ test harness" đổi thành "Test Harness Engine").

---

### 2.2. Sinh viên 2: Dương Nhật Cường (MSSV: 23120223)
- **Tình trạng sử dụng:** Có sử dụng.
- **Công cụ:** GitHub Copilot, Claude 3.5 Sonnet.
- **Mục đích:** Tra cứu cú pháp khai báo cache cho `npm` trong file cấu hình `.github/workflows/eshop-ci.yml` và cách upload artifacts LCOV report.
- **Câu Prompt tiêu biểu:**
  > *"Viết mẫu cấu hình step actions/cache trong GitHub Actions cho thư mục backend/node_modules trong dự án monorepo dựa trên hash của backend/package-lock.json."*
- **Đánh giá kết quả sinh ra:** AI gợi ý đúng cú pháp `actions/cache@v4` với khóa `key: ${{ runner.os }}-node-${{ hashFiles('backend/package-lock.json') }}`.
- **Kiểm chứng & Biên tập thủ công:** Tôi đã thử nghiệm trực tiếp trên runner Ubuntu của GitHub Actions để kiểm tra tốc độ build thực tế (ghi nhận giảm từ ~60s xuống ~5s khi hit cache).

---

### 2.3. Sinh viên 3: Trần Gia Cường (MSSV: 23120225)
- **Tình trạng sử dụng:** Có sử dụng.
- **Công cụ:** Antigravity IDE, ChatGPT.
- **Mục đích:** Hỗ trợ cú pháp tham số hóa kiểm thử dữ liệu `test.each` của Jest cho API `/api/apply-coupon` và cách xử lý xung đột khóa SQLite.
- **Câu Prompt tiêu biểu:**
  > *"Làm thế nào để tránh lỗi SQLITE_BUSY khi chạy đồng thời nhiều test worker trong Jest với cơ sở dữ liệu SQLite file-based?"*
- **Đánh giá kết quả sinh ra:** AI đề xuất 2 giải pháp: chuyển sang SQLite in-memory `:memory:` hoặc thêm cờ `--runInBand` để chạy tuần tự.
- **Kiểm chứng & Biên tập thủ công:** Tôi đã chọn giải pháp cấu hình `--runInBand` trong `backend/package.json` vì cơ sở dữ liệu EShop là file `database.sqlite` thật, việc chạy in-memory sẽ không phản ánh đúng trạng thái thực tế của hệ thống SUT.

---

### 2.4. Sinh viên 4: Nguyễn Gia Huy (MSSV: 23120273)
- **Tình trạng sử dụng:** Có sử dụng.
- **Công cụ:** Gemini 1.5 Pro, Claude 3.5 Sonnet.
- **Mục đích:** Viết khung script Python `ai_triage.py` gọi API LLM để phân tích log lỗi thất bại của kiểm thử và tạo Cây giả thuyết (Hypothesis Tree).
- **Câu Prompt tiêu biểu:**
  > *"Viết một script Python nhận 100 dòng log stderr của Jest, gọi OpenAI/Gemini API để phân loại lỗi theo 3 tầng: Hiện tượng -> Nguyên nhân khả dĩ -> Đoạn mã đề xuất sửa, xuất ra định dạng GitHub Step Summary."*
- **Đánh giá kết quả sinh ra:** AI sinh ra đoạn script hoàn chỉnh nhưng bị phụ thuộc vào thư viện cũ.
- **Kiểm chứng & Biên tập thủ công:** Tôi đã viết lại script dùng thư viện chuẩn `urllib.request` để không cần cài đặt thêm dependency `requests` trên máy ảo CI, giúp runner khởi động nhanh hơn.

---

*(Trường hợp thành viên không sử dụng AI — Mẫu khai báo tham khảo):*
> **Sinh viên X (MSSV: ...):**  
> *"Tôi xác nhận không sử dụng bất kỳ công cụ trí tuệ nhân tạo (AI) nào trong suốt quá trình hoàn thành công việc của Tuần 5. Mọi mã nguồn và tài liệu đều do tôi tự thực hiện và tra cứu từ tài liệu chính thống của công nghệ."*

---

## 3. LƯU TRỮ VÀ ĐÍNH KÈM CHAT LOG VỚI AI

Toàn bộ lịch sử trò chuyện (Chat Log / Prompt Log) chi tiết với các công cụ AI được lưu trữ đầy đủ tại thư mục con:
* Thư mục lưu trữ: `Seminar_CI-CD/Weekly_Reports/Week05/chat_logs/`
  * `chatlog_tuan_prompt_theory.md`
  * `chatlog_cuong_workflow_cache.md`
  * `chatlog_giacuong_jest_sqlite.md`
  * `chatlog_huy_ai_triage_script.md`

---

## 4. CAM KẾT LIÊM CHÍNH HỌC THUẬT

Chúng tôi cam đoan những thông tin kê khai trên là hoàn toàn trung thực. Toàn bộ mã nguồn, tài liệu và phân tích kỹ thuật do AI hỗ trợ đều đã được các thành viên trong nhóm trực tiếp đọc hiểu, kiểm chứng bằng thực nghiệm và chịu trách nhiệm hoàn toàn về tính chính xác.

**Xác nhận của các thành viên trong nhóm:**

| Họ và tên | Chữ ký số / Xác nhận điện tử | Ngày ký |
| :--- | :---: | :---: |
| **Nguyễn Ngọc Minh Tuấn** | *[Đã xác nhận]* | 14/10/2026 |
| **Dương Nhật Cường** | *[Đã xác nhận]* | 14/10/2026 |
| **Trần Gia Cường** | *[Đã xác nhận]* | 14/10/2026 |
| **Nguyễn Gia Huy** | *[Đã xác nhận]* | 14/10/2026 |

---

## 5. HƯỚNG DẪN XUẤT TÀI LIỆU SANG PDF / HTML / SLIDE

Để đáp ứng quy định nộp bài của môn học:
1. **Xuất sang PDF:** 
   - Mở file này trên VS Code / Antigravity IDE, sử dụng tiện ích **Markdown PDF** hoặc lệnh in trình duyệt (`Ctrl + P` → "Save as PDF").
   - Đặt tên file: `AI_Usage_Declaration_Week05.pdf` và lưu cùng thư mục.
2. **Xuất sang HTML:**
   - Sử dụng extension `Markdown Preview Enhanced` → chuột phải chọn `HTML (offline)` hoặc dùng lệnh `npx -y markdown-to-html`.
3. **Xuất sang Slide (nếu nộp kèm dạng slide):**
   - Sử dụng công cụ `Marp for VS Code` hoặc copy nội dung tóm tắt bảng mục 1 vào 1 slide báo cáo tiến độ tuần của nhóm.
