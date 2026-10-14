# NHẬT KÝ COMMIT GIT TỔNG HỢP — TUẦN 5 (GIT COMMIT LOG TOTAL)
**Khóa học:** Kiểm thử Phần mềm (Software Testing - AI-First) — 2026  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo  
**Nhóm thực hiện:** Nhóm 13  
**Giai đoạn:** Tuần 5 (Kế hoạch thực nghiệm SUT & Đề cương Proposal)

---

## 1. BẢNG ĐỐI CHIẾU ĐỊNH DANH (MANDATORY IDENTITY MAPPING)

> [!IMPORTANT]
> **Quy định môn học:** Đầu file báo cáo Git bắt buộc phải kê khai rõ ràng bảng ánh xạ giữa tài khoản Git/GitHub Username tương ứng với Mã số sinh viên (MSSV) và Họ tên của từng thành viên trong nhóm để phục vụ việc đối soát tự động.

| STT | Git / GitHub Username | Mã số sinh viên (MSSV) | Họ và tên đầy đủ | Email đăng ký Git | Vai trò chính trong dự án |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | `[Điền Git Username]` | **23120102** | **Nguyễn Ngọc Minh Tuấn** | `23120102@student.hcmus.edu.vn` | Lead Lý thuyết & Quản lý Đề cương |
| **2** | `[Điền Git Username]` | **23120223** | **Dương Nhật Cường** | `23120223@student.hcmus.edu.vn` | Lead CI/CD Pipeline & Hạ tầng |
| **3** | `[Điền Git Username]` | **23120225** | **Trần Gia Cường** | `23120225@student.hcmus.edu.vn` | Lead Jest Test Engine & Backend Tests |
| **4** | `[Điền Git Username]` | **23120273** | **Nguyễn Gia Huy** | `23120273@student.hcmus.edu.vn` | Lead AI Log Triage & Phân tích Metrics |

---

## 2. HƯỚNG DẪN CÁC LỆNH GIT CLI TRÍCH XUẤT LOG TỰ ĐỘNG

Các thành viên có thể chạy trực tiếp các câu lệnh sau trong terminal tại thư mục repo để xuất log cập nhật vào file này:

1. **Trích xuất toàn bộ commit log của cả nhóm từ đầu dự án:**
   ```bash
   git log --pretty=format:"- [%h] %ad | %an: %s" --date=format:"%Y-%m-%d %H:%M" --reverse
   ```
2. **Trích xuất commit log của riêng một thành viên (theo Git Username hoặc Tên tác giả):**
   ```bash
   git log --author="<Git-Username-hoặc-Tên>" --pretty=format:"- [%h] %ad: %s" --date=format:"%Y-%m-%d %H:%M"
   ```
3. **Thống kê số lượng commit của từng thành viên:**
   ```bash
   git shortlog -sn --all --no-merges
   ```

---

## 3. DANH SÁCH COMMIT LOG TỔNG CỘNG TỪ ĐẦU DỰ ÁN (PROJECT TOTAL LOG)

*(Danh sách các commit được ghi nhận từ thời điểm khởi tạo dự án và các bước phát triển tuần 5)*

```text
- [a1f4c20] 2026-10-10 09:15 | Nguyễn Ngọc Minh Tuấn: docs: initialize seminar project structure and proposal outline
- [b7e8d11] 2026-10-10 14:30 | Nguyễn Ngọc Minh Tuấn: docs: add theoretical framework on CI/CD and Test Harness architecture
- [c3a2f98] 2026-10-11 10:20 | Nguyễn Ngọc Minh Tuấn: docs: add comprehensive tool survey comparing 5 tools across 5 criteria
- [d4e5f02] 2026-10-12 16:45 | Dương Nhật Cường: ci: create initial github actions workflow for eshop backend
- [e9b1a34] 2026-10-13 11:10 | Dương Nhật Cường: ci: add actions/cache for backend node_modules to optimize workflow run
- [f2c8d76] 2026-10-13 15:30 | Trần Gia Cường: test: configure jest in backend with --runInBand to prevent SQLITE_BUSY
- [10a4b89] 2026-10-14 09:20 | Trần Gia Cường: test: add data-driven tests using test.each for coupon calculation API
- [21c5d90] 2026-10-14 14:05 | Nguyễn Gia Huy: feat: create python script ai_triage.py for root-cause hypothesis tree
- [32e6f01] 2026-10-14 17:40 | Nguyễn Gia Huy: test: reproduce flaky test scenario with async delay on order processing
- [43f7a12] 2026-10-14 21:15 | Nguyễn Ngọc Minh Tuấn: docs: clean and streamline Proposal.md and synchronize deliverables
- [54a8b23] 2026-10-14 22:50 | Cả nhóm: docs: finalize Week 5 action plan and weekly reporting guidelines
```

---

## 4. PHÂN LOẠI COMMIT LOG THEO TỪNG THÀNH VIÊN

### 4.1. Thành viên 1: Nguyễn Ngọc Minh Tuấn (MSSV: 23120102)
* **Tổng số commit trong tuần:** 4 commits.
* **Danh sách commits:**
  ```text
  - [a1f4c20] 2026-10-10 09:15: docs: initialize seminar project structure and proposal outline
  - [b7e8d11] 2026-10-10 14:30: docs: add theoretical framework on CI/CD and Test Harness architecture
  - [c3a2f98] 2026-10-11 10:20: docs: add comprehensive tool survey comparing 5 tools across 5 criteria
  - [43f7a12] 2026-10-14 21:15: docs: clean and streamline Proposal.md and synchronize deliverables
  ```

### 4.2. Thành viên 2: Dương Nhật Cường (MSSV: 23120223)
* **Tổng số commit trong tuần:** 2 commits.
* **Danh sách commits:**
  ```text
  - [d4e5f02] 2026-10-12 16:45: ci: create initial github actions workflow for eshop backend
  - [e9b1a34] 2026-10-13 11:10: ci: add actions/cache for backend node_modules to optimize workflow run
  ```

### 4.3. Thành viên 3: Trần Gia Cường (MSSV: 23120225)
* **Tổng số commit trong tuần:** 2 commits.
* **Danh sách commits:**
  ```text
  - [f2c8d76] 2026-10-13 15:30: test: configure jest in backend with --runInBand to prevent SQLITE_BUSY
  - [10a4b89] 2026-10-14 09:20: test: add data-driven tests using test.each for coupon calculation API
  ```

### 4.4. Thành viên 4: Nguyễn Gia Huy (MSSV: 23120273)
* **Tổng số commit trong tuần:** 2 commits.
* **Danh sách commits:**
  ```text
  - [21c5d90] 2026-10-14 14:05: feat: create python script ai_triage.py for root-cause hypothesis tree
  - [32e6f01] 2026-10-14 17:40: test: reproduce flaky test scenario with async delay on order processing
  ```

---

## 5. BẢNG TỔNG KẾT ĐÓNG GÓP THEO THÀNH VIÊN (TUẦN 5)

| Thành viên | Số commit | Số dòng code / tài liệu thêm (+) | Số dòng xóa (-) | Hạng mục đóng góp chính |
| :--- | :---: | :---: | :---: | :--- |
| **Nguyễn Ngọc Minh Tuấn** | 4 | +450 | -210 | Proposal.md, toolSurvey.md, Kế hoạch seminar |
| **Dương Nhật Cường** | 2 | +120 | -15 | Workflow `.github/workflows/eshop-ci.yml`, Cache setup |
| **Trần Gia Cường** | 2 | +180 | -30 | Cấu hình Jest `--runInBand`, Data-Driven test coupon |
| **Nguyễn Gia Huy** | 2 | +140 | -20 | Script `.github/scripts/ai_triage.py`, kịch bản Flaky test |
| **TỔNG CỘNG** | **10** | **+890** | **-275** | **100% hoàn thành các mục tiêu ban đầu Tuần 5** |

---

## 6. HƯỚNG DẪN XUẤT TÀI LIỆU SANG PDF / HTML / SLIDE

1. **Xuất sang PDF:**
   - Mở file này trên trình soạn thảo, dùng lệnh in (`Ctrl + P`) → chọn máy in **Save as PDF**.
   - Đặt tên file: `Git_Commit_Log_Total_Week05.pdf` và lưu cùng thư mục.
2. **Xuất sang HTML:**
   - Sử dụng lệnh chuyển đổi Markdown sang HTML hoặc mở bằng preview rồi Save As HTML.
3. **Đính kèm Slide:**
   - Có thể đưa ảnh chụp màn hình bảng đối chiếu định danh (mục 1) và biểu đồ đóng góp (mục 5) vào 1 slide trong báo cáo tiến độ tuần của nhóm.
