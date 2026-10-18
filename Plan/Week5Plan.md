# KẾ HOẠCH HÀNH ĐỘNG TUẦN 5 (WEEK 5 ACTION PLAN)
**Chủ đề:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System (Node.js/Express Backend, SQLite3, Jest)  
**GitHub Repository chính thức:** [SoftwareTesting-Group13/eshop-sut](https://github.com/SoftwareTesting-Group13/eshop-sut)  
**Nhóm thực hiện:** Nhóm 13 (4 thành viên)

---

## 1. MỤC TIÊU CỐT LÕI CỦA TUẦN 5

*(Khối lượng công việc đã được tinh giản 25% để tập trung hoàn thành các mục tiêu kỹ thuật cốt lõi, dời phần phác thảo slide và đo lường benchmark chuyên sâu sang Tuần 6)*

1. **Về mặt tài liệu & đề cương:** Hoàn tất, làm sạch và đồng bộ bộ đôi tài liệu [Proposal.md](./Proposal.md) và [toolSurvey.md](./toolSurvey.md).
2. **Về mặt thực nghiệm SUT:** Xây dựng xong nền tảng kỹ thuật ban đầu trên EShop Backend:
   - Pipeline GitHub Actions cơ bản chạy xanh kèm bộ nhớ đệm cache dependencies.
   - Cấu hình Jest backend với `--runInBand` loại bỏ lỗi khóa file SQLite (`SQLITE_BUSY` - Failure Mode 1).
   - Bộ test Data-Driven (`test.each`) phát hiện lỗi logic coupon percent trong `server.js` (Failure Mode 2).
   - Script Python AI Log Triage bước đầu chạy được để tạo Cây giả thuyết chẩn đoán lỗi (Failure Mode 3).
3. **Về mặt quản lý & hồ sơ báo cáo:** Tổng hợp bộ hồ sơ **Weekly Report Tuần 5** (kê khai AI, trích xuất Git commit log, lưu ảnh chụp màn hình minh chứng) tại thư mục `Weekly_Reports/Week05/`.

---

## 2. PHÂN CÔNG CÔNG VIỆC CÂN BẰNG CHO 4 THÀNH VIÊN (2 NGÀY TỚI)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PHÂN CÔNG CÔNG VIỆC 2 NGÀY TỚI (TUẦN 5)                         │
├─────────────────────┬─────────────────────┬─────────────────────┬──────────────────────┤
│ N.N. Minh Tuấn      │ Dương Nhật Cường    │ Trần Gia Cường      │ Nguyễn Gia Huy       │
│ (Backend Testing)   │ (CI/CD & Báo cáo)   │ (Lý thuyết & Jest)  │ (AI Triage & Flaky)  │
├─────────────────────┼─────────────────────┼─────────────────────┼──────────────────────┤
│ • Data-Driven tests │ • Tạo workflow CI   │ • Rà soát Proposal  │ • Viết ai_triage.py  │
│   cho API coupon    │ • Setup cache npm   │ • Cấu hình Jest     │ • Kịch bản Flaky     │
│ • Bắt lỗi server.js │ • Gom Weekly Report │ • --runInBand SQLite│   test cơ bản        │
└─────────────────────┴─────────────────────┴─────────────────────┴──────────────────────┘
```

### 2.1. Nguyễn Ngọc Minh Tuấn (Phụ trách Backend Testing & Logic Nghiệp vụ)
* **Nhiệm vụ 1:** Viết bộ kiểm thử hướng dữ liệu (Data-Driven Testing với `test.each`) trong file `tests/coupon.test.js` để kiểm thử toàn diện API `POST /api/apply-coupon` (các trường hợp coupon hợp lệ, coupon hết hạn, đơn hàng chưa đủ điều kiện tối thiểu).
* **Nhiệm vụ 2:** Tái hiện và kiểm chứng lỗi logic nghiệp vụ thực tế trong `backend/server.js` dòng 398–401 (công thức coupon percent làm `discount_amount` bị âm - Failure Mode 2); lưu lại log lỗi kiểm thử phục vụ cho AI Triage.

### 2.2. Dương Nhật Cường (Phụ trách CI/CD Pipeline & Tổng hợp Báo cáo)
* **Nhiệm vụ 1:** Khởi tạo thư mục `.github/workflows/` trong repo EShop, xây dựng file cấu hình `eshop-ci.yml` chạy trên runner `ubuntu-latest` với Node.js 20, tích hợp `actions/cache` cho thư mục `backend/node_modules` và ghi nhận hiệu quả tăng tốc (từ ~60s xuống ~5s).
* **Nhiệm vụ 2:** Chủ trì gom và tổng hợp bộ hồ sơ báo cáo tuần tại thư mục `Weekly_Reports/Week05/` (thu thập bảng kê khai AI của 4 bạn, trích xuất Git commit log và lưu ảnh chụp màn hình pipeline chạy thành công).

### 2.3. Trần Gia Cường (Phụ trách Đề cương & Cấu hình Test Engine)
* **Nhiệm vụ 1:** Rà soát và hoàn thiện lần cuối bộ đôi tài liệu đề cương [Proposal.md](./Proposal.md) và [toolSurvey.md](./toolSurvey.md), đảm bảo tính nhất quán về thuật ngữ kỹ thuật và thông tin 4 thành viên.
* **Nhiệm vụ 2:** Cài đặt và cấu hình Jest trong `backend/package.json`, thiết lập cờ `--runInBand` để chạy tuần tự các test suite, giải quyết dứt điểm lỗi SQLite Concurrency Lock (`SQLITE_BUSY` - Failure Mode 1).

### 2.4. Nguyễn Gia Huy (Phụ trách AI Log Triage & Kịch bản Flaky)
* **Nhiệm vụ 1:** Hoàn thiện script Python `ai_triage.py` đặt trong `.github/scripts/`: đọc log lỗi kiểm thử thất bại từ stdin/file, kết nối LLM API (OpenAI / Claude / Gemini) để phân tích nguyên nhân gốc rễ và xuất Cây giả thuyết (Hypothesis Tree) ra màn hình hoặc Markdown.
* **Nhiệm vụ 2:** Xây dựng kịch bản kiểm thử có can thiệp độ trễ bất đồng bộ (sleep delay) để mô phỏng ca test chập chờn (Flaky Test - Failure Mode 3), chuẩn bị sẵn mã nguồn để sang Tuần 6 thực hiện đo đạc benchmark chi tiết.

---

## 3. CHECKLIST CÔNG VIỆC 2 NGÀY TỚI (DEADLINE TUẦN 5)

| STT | Hạng mục công việc chi tiết | Người phụ trách | Hạn chót | Trạng thái | Sản phẩm nghiệm thu |
| :---: | :--- | :---: | :---: | :---: | :--- |
| 1 | Rà soát & hoàn tất Proposal.md + toolSurvey.md | T.G.Cường | Ngày 1 | [x] | File Proposal & toolSurvey sạch sẽ, chuẩn rubric |
| 2 | Setup Jest backend + cấu hình `--runInBand` | T.G.Cường | Ngày 2 | [x] | `backend/package.json` & test run log không bị lock |
| 3 | Viết Data-Driven tests cho Coupon API | N.N.M.Tuấn | Ngày 1 | [x] | File `tests/coupon.test.js` trên backend |
| 4 | Tái hiện & lưu log lỗi coupon percent trong `server.js` | N.N.M.Tuấn | Ngày 2 | [x] | Log lỗi `discount_amount` âm (Failure Mode 2) |
| 5 | Tạo workflow `eshop-ci.yml` chạy trên Ubuntu | D.N.Cường | Ngày 1 | [x] | Workflow file trong `.github/workflows/` |
| 6 | Cấu hình `actions/cache` & đo thời gian tối ưu | D.N.Cường | Ngày 2 | [x] | Bảng đo thời gian (No-cache ~60s vs Cache ~5s) |
| 7 | Viết script Python `ai_triage.py` | N.G.Huy | Ngày 1 | [x] | File `.github/scripts/ai_triage.py` |
| 8 | Tạo kịch bản mô phỏng Flaky Test bất đồng bộ | N.G.Huy | Ngày 2 | [x] | Ca test delay mô phỏng lỗi chập chờn |
| 9 | Thu thập minh chứng, hoàn thiện Weekly Report Tuần 5 | D.N.Cường | Cuối ngày 2 | [x] | Thư mục `Weekly_Reports/Week05/` đầy đủ |

---

## 4. QUY ĐỊNH BẮT BUỘC: LÀM VIỆC SONG SONG VỚI VIỆC LẬP WEEKLY REPORT

Để đảm bảo việc hoàn tất hồ sơ tuần không bị động và tuân thủ đúng chính sách của môn học, **mỗi thành viên trong suốt 2 ngày làm việc phải đồng thời thực hiện 3 nguyên tắc sau**:

### Nguyên tắc 1: Kê khai trung thực quá trình sử dụng AI (AI Usage Logging)
- Mọi thành viên khi sử dụng bất kỳ công cụ AI nào (ChatGPT, Claude, Gemini, Copilot, Cursor, Antigravity IDE,...) đều phải:
  * Ghi lại tên công cụ, thời điểm sử dụng, mục đích (ví dụ: tạo mock data, gỡ lỗi cú pháp YAML).
  * Lưu lại câu Prompt tiêu biểu và nội dung AI phản hồi vào thư mục `Weekly_Reports/Week05/chat_logs/`.
  * Cập nhật thông tin vào file `AI Usage Declaration.md`.
  * **Nếu thành viên nào không sử dụng AI:** Vẫn bắt buộc phải có tên trong bản khai và ghi rõ tuyên bố: *"Tôi xác nhận không sử dụng công cụ AI nào trong tuần làm việc này."*

### Nguyên tắc 2: Commit Git thường xuyên với định danh rõ ràng
- Mỗi đầu việc nhỏ phải được commit riêng biệt lên Git, không dồn toàn bộ code vào một commit cuối ngày.
- Commit message phải rõ ràng, tuân thủ quy tắc: `feat:`, `fix:`, `test:`, `docs:`, `ci:`.
- Đầu file `Git Commit Log Total.md` bắt buộc phải có bảng ánh xạ: **Git Username ↔ MSSV ↔ Họ và tên**.

### Nguyên tắc 3: Thu thập minh chứng trực quan (Visual Evidence)
- Mỗi khi hoàn thành một chức năng hoặc chạy test thành công:
  * Chụp ảnh màn hình (Screenshot) giao diện dòng lệnh (terminal), log kiểm thử hoặc giao diện GitHub Actions pipeline.
  * Đặt tên file ảnh rõ ràng (ví dụ: `screenshot_pipeline_success.png`, `screenshot_coupon_test_fail.png`) và lưu vào thư mục `Weekly_Reports/Week05/screenshots/`.
  * (Khuyến khích) Quay video clip ngắn (30s – 1m) ghi lại màn hình chạy test thực tế đặt tại `Weekly_Reports/Week05/videos/`.
