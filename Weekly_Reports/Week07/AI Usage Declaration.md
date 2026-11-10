# BẢN KÊ KHAI SỬ DỤNG AI — TUẦN 7 (WEEK 7 AI USAGE DECLARATION)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo  
**Nhóm thực hiện:** Nhóm 13  
**Giai đoạn:** Tuần 7 (Rà soát tài liệu, hoàn thiện kịch bản thuyết trình và bảo trì sau mốc 90%)

---

## 1. BẢNG TỔNG HỢP KÊ KHAI SỬ DỤNG AI THEO TỪNG THÀNH VIÊN

> [!IMPORTANT]
> **Quy định môn học:** Mỗi thành viên đều phải tự khai báo minh bạch công cụ AI mình đã dùng trong tuần. **Nếu thành viên không sử dụng bất kỳ công cụ AI nào trong tuần làm việc, bắt buộc phải ghi rõ: *"Tôi xác nhận không sử dụng AI trong tuần này"*.**

| STT | Họ và tên sinh viên | Mã số sinh viên (MSSV) | Trạng thái sử dụng | Các công cụ AI đã sử dụng | Tỷ lệ đóng góp của AI (%) |
| :---: | :--- | :---: | :---: | :--- | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | 23120102 | Không dùng | Tôi xác nhận không sử dụng AI trong tuần này | 0% |
| 2 | Dương Nhật Cường | 23120223 | Có dùng | OpenAI Codex (GPT-6) | 75% |
| 3 | Trần Gia Cường | 23120225 | Có dùng | Antigravity IDE (Gemini) | 60% |
| 4 | Nguyễn Gia Huy | 23120273 | Không dùng | Tôi xác nhận không sử dụng AI trong tuần này | 0% |

---

## 2. NHẬT KÝ CHI TIẾT QUÁ TRÌNH SỬ DỤNG AI CỦA TỪNG THÀNH VIÊN

### 2.1. Sinh viên 1: Nguyễn Ngọc Minh Tuấn (MSSV: 23120102)
- **Tình trạng sử dụng:** Tôi xác nhận không sử dụng AI trong tuần này.
- **Lý do / Nội dung công việc:** Tuần 7 thành viên tập trung hoàn thành công tác rà soát nội bộ bộ Slide thuyết trình và phối hợp khớp nối timeline kịch bản thuyết trình phân vai seminar; không phát sinh nhu cầu sử dụng công cụ AI.

---

### 2.2. Sinh viên 2: Dương Nhật Cường (MSSV: 23120223)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** OpenAI Codex (mô hình GPT-6)
- **Mục đích sử dụng:**
  - Hỗ trợ chuẩn hóa cấu trúc Markdown và hệ thống tiêu đề của tài liệu Báo cáo Seminar mới ([docs/new-report.md](../../docs/new-report.md)).
  - Tra cứu, tổng hợp cơ sở lý thuyết về DevOps Lifecycle 8 giai đoạn, phân biệt Continuous Delivery vs Continuous Deployment.
  - Hỗ trợ xây dựng bảng so sánh định lượng giữa các công cụ CI/CD (GitHub Actions vs GitLab CI/CD vs Jenkins trên thang 35 điểm) và Test Harness (Jest vs Vitest vs Mocha trên thang 30 điểm).
  - Phân tích chi tiết cấu trúc workflow GitHub Actions của EShop Monorepo gồm 5 jobs chính (`secret-scan`, `backend-test` với dependency caching, `quality-gate`, `build`, `workflow-summary`) và 1 nhánh hỗ trợ (`ai-triage`).
- **Prompt tiêu biểu:**
  > *"format file new-report.md này lại chuẩn dạng markdown dùm t"*
  >
  > *"Ở phần các công cụ CI/CD này, m so sánh cho t 3 cái là Github Actions, Gitlab CI với Jenkins nhé."*
  >
  > *"Trong job backend-test, actions/cache@v5 lưu thư mục backend/node_modules với khóa gồm hệ điều hành runner, phiên bản Node.js 22 và hash của backend/package-lock.json... đưa nó lên chung đi"*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - Sinh viên trực tiếp đối chiếu các mô tả do AI sinh ra với mã nguồn thực tế `.github/workflows/eshop-ci.yml`, `backend/package.json` và các script chạy test trong dự án.
  - Sửa lại các chi tiết trong tài liệu tham khảo bên ngoài do AI đưa vào mà không khớp với codebase SUT.
  - Gộp các nội dung Dependency Caching và Jest vào đúng job `backend-test`, đưa cấu hình Gemini API vào đúng job `ai-triage` và sắp xếp lại thứ tự cấu hình Branch Protection Rules cho logic và chặt chẽ.

---

### 2.3. Sinh viên 3: Trần Gia Cường (MSSV: 23120225)
- **Tình trạng sử dụng:** Có sử dụng
- **Công cụ:** Antigravity IDE (Gemini)
- **Mục đích sử dụng:**
  - Hỗ trợ format và rà soát cấu trúc văn bản kịch bản phân vai seminar ([docs/PresentationScript.md](../../docs/PresentationScript.md)).
  - Phân định rõ phạm vi giữa 2 nhóm seminar trên lớp (Nhóm 10: Infra/DevOps vs Nhóm 13: Test Harness & Code deep-dive).
  - Đánh giá phản biện kỹ thuật (Assessment) cho 2 điểm đổi mới: Database Checkpoint `coupon_usage` trong SQLite và AI-Triage comment tự động lên GitHub PR.
  - Soạn thảo khung báo cáo tiến độ tuần 7 ([Weekly_Report_Week07.md](./Weekly_Report_Week07.md)) theo chuẩn vắn tắt, bám sát các đầu việc thực tế sau mốc 90%.
  - Rà soát và lược bỏ triệt để các quy định giới hạn cứng số lượng slide (`≤ 15 slides`) trong toàn bộ tài liệu dự án.
- **Prompt tiêu biểu:**
  > *"Tôi muốn kịch bản 2 như Seminar_CI-CD/Me/PresentationScript.md không sửa lại. Bỏ các giới hạn số slides ở docs/ (Bỏ tức là không nhắc đến). Phân công ghi vắn tắt. Tôi vừa chuyển Seminar_CI-CD/EShop/docs/PresentationScript.md vào docs/. Tạo sẵn 2 file AI Usage Declaration.md và GitCommitLogTotal"*
  >
  > *"pull main về. Cho tôi biết có gì mới"*
  >
  > *"2 thành viên Huy và Tuấn tuần này không có commits. Việc rà soát là có."*
  >
  > *"Sửa lại Git Commit Log Total.md . Scan lại Weekly_Reports/Week07 đã đủ điều kiện để nộp chưa."*
- **Đánh giá phản hồi & Hiệu chỉnh thủ công:**
  - Sinh viên trực tiếp đối chiếu mã nguồn backend và workflow CI để đảm bảo các luận điểm kỹ thuật trong kịch bản và báo cáo hoàn toàn trùng khớp với hiện trạng repository, không dựa vào suy diễn.
  - Giữ nguyên vẹn 100% nội dung kịch bản 2 về Feature 09 và hoạt động tương tác lớp học Joint In-class Activity.

---

### 2.4. Sinh viên 4: Nguyễn Gia Huy (MSSV: 23120273)
- **Tình trạng sử dụng:** Tôi xác nhận không sử dụng AI trong tuần này.
- **Lý do / Nội dung công việc:** Tuần 7 thành viên tập trung hoàn thành công tác rà soát nội bộ phương án phối hợp hoạt động tương tác Joint In-class Activity và kiểm tra lại bộ dữ liệu thực nghiệm đã thu thập từ Tuần 6; không phát sinh nhu cầu sử dụng công cụ AI.

---

## 3. DANH MỤC CÁC TỆP NHẬT KÝ CHAT LOG CHI TIẾT

Mỗi thành viên có sử dụng AI đều lưu lại toàn bộ lịch sử trao đổi chi tiết trong thư mục [chat_logs/](./chat_logs/):
1. **Dương Nhật Cường:** [chatlog-new-report.md](./chat_logs/chatlog-new-report.md)
2. **Trần Gia Cường:** [chatlog_gcuong_week07.md](./chat_logs/chatlog_gcuong_week07.md)

---

## 4. CAM KẾT LIÊM CHÍNH HỌC THUẬT (ACADEMIC INTEGRITY DECLARATION)

Chúng tôi xin cam kết danh dự:
1. Toàn bộ nội dung khai báo trên là trung thực và phản ánh chính xác quá trình sử dụng các công cụ trí tuệ nhân tạo (AI) trong tuần làm việc thứ 7 của nhóm.
2. AI chỉ được sử dụng với vai trò là công cụ hỗ trợ (tư vấn giải pháp, rà soát cấu trúc văn bản, gợi ý khung kịch bản). Mọi nội dung kỹ thuật, kịch bản thuyết trình và tài liệu báo cáo đều được các thành viên trong nhóm trực tiếp đọc hiểu, đối chiếu mã nguồn và chịu trách nhiệm hoàn toàn về tính đúng đắn.
3. Nhóm tuyệt đối không sao chép nguyên văn (copy-paste) kết quả chưa qua kiểm chứng từ AI.

| STT | Họ và tên thành viên | Trạng thái xác nhận | Ngày cam kết |
| :---: | :--- | :---: | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | Đã xác nhận | 30/10/2026 |
| 2 | Dương Nhật Cường | Đã xác nhận | 30/10/2026 |
| 3 | Trần Gia Cường | Đã xác nhận | 30/10/2026 |
| 4 | Nguyễn Gia Huy | Đã xác nhận | 30/10/2026 |
