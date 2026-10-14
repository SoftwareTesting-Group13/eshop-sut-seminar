# BÁO CÁO TIẾN ĐỘ TUẦN 5 (WEEKLY REPORT — WEEK 05)
**Khóa học:** Kiểm thử Phần mềm (Software Testing - AI-First) — 2026  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo  
**GitHub Repository chính thức:** [SoftwareTesting-Group13/eshop-sut](https://github.com/SoftwareTesting-Group13/eshop-sut)  
**Nhóm thực hiện:** Nhóm 13 (4 thành viên)
- **23120102** — Nguyễn Ngọc Minh Tuấn (Lead Lý thuyết & Báo cáo)
- **23120223** — Dương Nhật Cường (Lead CI/CD Pipeline & Hạ tầng)
- **23120225** — Trần Gia Cường (Lead Test Harness & Backend Testing)
- **23120273** — Nguyễn Gia Huy (Lead AI Log Triage & Phân tích Metrics)

**Thời gian báo cáo:** Tuần 5 (Ngày 14/10/2026)  
**Trạng thái tiến độ chung:** Đạt 100% mục tiêu đề ra cho Tuần 5; sẵn sàng bước vào Tuần 6 hoàn thiện 90% seminar.

---

## 1. TỔNG KẾT KẾT QUẢ ĐẠT ĐƯỢC TRONG TUẦN 5

Trong Tuần 5, nhóm đã hoàn thành toàn diện các hạng mục chuẩn bị về lý thuyết và nền tảng thực nghiệm trên hệ thống SUT EShop:

1. **Hoàn thiện bộ đôi tài liệu đề cương:**
   - [Proposal.md](../../Proposal.md): Khung sườn phân cấp rõ ràng, loại bỏ toàn bộ nội dung trùng lặp cũ, trình bày ngắn gọn về 3 công cụ chính, 3 thành phần kiểm thử và khả năng áp dụng AI.
   - [toolSurvey.md](../../toolSurvey.md): Báo cáo khảo sát chi tiết 5 công cụ qua 5 tiêu chí chuẩn môn học, ma trận đánh giá định lượng và phân vai rõ ràng.
2. **Khởi tạo và tối ưu hóa Pipeline CI/CD:**
   - Xây dựng file workflow `.github/workflows/eshop-ci.yml` chạy trên Ubuntu runner với Node.js 20.
   - Cấu hình thành công `actions/cache` cho thư mục `backend/node_modules`, rút ngắn thời gian chuẩn bị môi trường từ ~60s xuống ~5s.
3. **Cấu hình Test Harness & Tái hiện 3 Failure Modes kỹ thuật:**
   - Cấu hình Jest Test Engine chạy tuần tự `--runInBand`, giải quyết triệt để lỗi SQLite Concurrency Lock (`SQLITE_BUSY` - **Failure Mode 1**).
   - Viết bộ kiểm thử Data-Driven (`test.each`) cho API `POST /api/apply-coupon`, phát hiện và chứng minh lỗi công thức coupon percent trong `backend/server.js` dòng 398–401 (**Failure Mode 2**).
   - Xây dựng kịch bản tái hiện lỗi Flaky Test do độ trễ bất đồng bộ (**Failure Mode 3**) và viết script Python `.github/scripts/ai_triage.py` tự động phân tích log lỗi khi pipeline fail.
4. **Chuẩn hóa kế hoạch hành động:**
   - Gộp lộ trình thành 3 Phase tinh gọn tại [Seminar_Phases_Plan.md](../../Seminar_Phases_Plan.md) với mục tiêu hoàn thành 90% seminar tại Tuần 6.
   - Lập kế hoạch hành động cụ thể cho 2 ngày tới tại [Week5Plan.md](../../Week5Plan.md).

---

## 2. BẢNG TIẾN ĐỘ THỰC HIỆN CỦA 4 THÀNH VIÊN TRONG TUẦN 5

| Thành viên | Nhiệm vụ chính được giao | Trạng thái | Đánh giá kết quả |
| :--- | :--- | :---: | :--- |
| **Nguyễn Ngọc Minh Tuấn** | Viết Data-Driven test coupon API, bắt lỗi `server.js` | **Hoàn thành** | Bộ test coupon chạy tốt, minh chứng được lỗi số tiền âm (Failure Mode 2) |
| **Dương Nhật Cường** | Viết workflow GitHub Actions, setup cache, gom Weekly Report | **Hoàn thành** | Pipeline chạy ổn định, cache hit giảm thời gian, hồ sơ tuần đầy đủ |
| **Trần Gia Cường** | Rà soát Proposal & toolSurvey, cấu hình Jest `--runInBand` | **Hoàn thành** | Đề cương chuẩn hóa, giải quyết triệt để lỗi xung đột khóa file SQLite |
| **Nguyễn Gia Huy** | Viết script `ai_triage.py`, xây dựng kịch bản Flaky test | **Hoàn thành** | Script AI chạy được, xuất cây giả thuyết ra Step Summary |

---

## 3. DANH MỤC CÁC TÀI LIỆU VÀ FILE BÁO CÁO LIÊN QUAN

Tất cả các tài liệu phục vụ báo cáo Tuần 5 được lưu trữ có hệ thống tại thư mục:
* **Bản kê khai sử dụng AI:** [AI Usage Declaration.md](./AI%20Usage%20Declaration.md) *(kèm bản xuất PDF / HTML)*.
* **Nhật ký commit Git tổng hợp:** [Git Commit Log Total.md](./Git%20Commit%20Log%20Total.md) *(kèm bản xuất PDF / HTML)*.
* **Kế hoạch hành động 2 ngày tới:** [Week5Plan.md](../../Week5Plan.md).
* **Đề cương Proposal:** [Proposal.md](../../Proposal.md).
* **Báo cáo khảo sát công cụ:** [toolSurvey.md](../../toolSurvey.md).
* **Kế hoạch các Phase Seminar:** [Seminar_Phases_Plan.md](../../Seminar_Phases_Plan.md).

---

## 4. KHU VỰC MINH CHỨNG TRỰC QUAN (VISUAL EVIDENCE)

### 4.1. Ảnh chụp màn hình ứng dụng & pipeline (Screenshots)
Toàn bộ ảnh chụp màn hình minh chứng được đặt tại thư mục con `Weekly_Reports/Week05/screenshots/`:

1. **Minh chứng 1: Giao diện Pipeline GitHub Actions chạy xanh**
   - File: `screenshots/01_github_actions_pipeline_success.png`
   - Mô tả: Pipeline chạy thành công các bước checkout, setup node, restore cache, lint và chạy Jest test.
2. **Minh chứng 2: Tối ưu hóa Cache Dependencies**
   - File: `screenshots/02_cache_speedup_comparison.png`
   - Mô tả: Ảnh chụp bảng so sánh thời gian chạy khi cache miss (~60s) và cache hit (~5s).
3. **Minh chứng 3: Bắt lỗi Failure Mode 2 trong EShop Backend**
   - File: `screenshots/03_jest_coupon_test_failure.png`
   - Mô tả: Màn hình terminal hiển thị test case coupon percent bị fail do `discount_amount` tính ra số âm.
4. **Minh chứng 4: Script AI Log Triage xuất Cây giả thuyết**
   - File: `screenshots/04_ai_triage_step_summary.png`
   - Mô tả: Giao diện GitHub Step Summary hiển thị cây chẩn đoán lỗi 3 tầng do AI tạo ra.

### 4.2. Video Demo minh chứng kết quả làm việc
* **Tên file video:** `Weekly_Reports/Week05/videos/demo_week05_evidence.mp4`
* **Thời lượng:** ~60 giây.
* **Nội dung video:** Quay màn hình thao tác chạy lệnh `npm test` trên terminal của EShop backend, kích hoạt workflow GitHub Actions và hiển thị kết quả phân tích lỗi của AI.

---

## 5. ĐÁNH GIÁ RỦI RO VÀ KẾ HOẠCH HÀNH ĐỘNG TUẦN 6

- **Đánh giá rủi ro:** 
  - Tài nguyên runner GitHub Actions miễn phí bị giới hạn thời gian chạy.  
  → *Biện pháp:* Tận dụng tối đa cache dependencies để mỗi lần chạy chỉ tốn dưới 30 giây.
  - Nguy cơ AI hallucination khi tóm tắt log lỗi nếu log quá dài.  
  → *Biện pháp:* Viết hàm cắt xén chỉ giữ lại 100 dòng chứa stack trace quan trọng nhất trước khi gửi vào LLM API.
- **Kế hoạch hành động Tuần 6 (Mốc hoàn thành 90% seminar):**
  - Viết hoàn chỉnh `User_Guide.md` (tiếng Anh, ≥ 6 mục + 3 Failure Modes).
  - Quay và biên tập video `Demo_Screencast.mp4` (5–8 phút, tiếng Anh, 1080p, ≤ 100MB).
  - Thiết kế `Activity_Worksheet.md` (Pipeline Postmortem ~20-25m có answer key).
  - Thiết kế `Seminar_Slides.pptx` (≤ 15 slides).
  - Đóng gói toàn bộ link Pre-share sẵn sàng nộp trước buổi báo cáo.
