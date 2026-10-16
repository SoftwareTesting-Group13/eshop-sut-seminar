# NHẬT KÝ COMMIT GIT TỔNG HỢP — TUẦN 5 (GIT COMMIT LOG TOTAL)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo  
**GitHub Repository chính thức:** [SoftwareTesting-Group13/eshop-sut](https://github.com/SoftwareTesting-Group13/eshop-sut)  
**Nhóm thực hiện:** Nhóm 13  
**Giai đoạn:** Tuần 5

---

## 1. BẢNG ĐỐI CHIẾU ĐỊNH DANH (MANDATORY IDENTITY MAPPING)

> [!IMPORTANT]
> **Quy định môn học:** Đầu file báo cáo Git bắt buộc phải kê khai rõ ràng bảng ánh xạ giữa tài khoản Git/GitHub Username tương ứng với Mã số sinh viên (MSSV) và Họ tên của từng thành viên trong nhóm để phục vụ việc đối soát tự động.

| STT | Git / GitHub Username | Mã số sinh viên (MSSV) | Họ và tên đầy đủ | Email đăng ký Git | Vai trò chính trong dự án |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | nnmt2810 | **23120102** | **Nguyễn Ngọc Minh Tuấn** | `23120102@student.hcmus.edu.vn` | Lead Backend Testing & Logic Nghiệp vụ |
| **2** | `[Điền Git Username]` | **23120223** | **Dương Nhật Cường** | `23120223@student.hcmus.edu.vn` | Lead CI/CD Pipeline & Tổng hợp Báo cáo |
| **3** | trancuonG05 | **23120225** | **Trần Gia Cường** | `giacuong.0023@gmail.com` | Lead Đề cương & Cấu hình Test Engine |
| **4** | `[Điền Git Username]` | **23120273** | **Nguyễn Gia Huy** | `23120273@student.hcmus.edu.vn` | Lead AI Log Triage & Phân tích Metrics |

---

## 2. HƯỚNG DẪN CÁC LỆNH GIT CLI TRÍCH XUẤT LOG TỰ ĐỘNG

Các thành viên chạy trực tiếp các câu lệnh sau trong terminal tại thư mục repo để xuất log thật và dán vào các mục bên dưới:

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

*(Chạy lệnh 1 ở trên và dán toàn bộ kết quả commit log thực tế của dự án vào khối code dưới đây)*

```text
- [2f9bf2b] 2026-05-15 08:27 | Hanh Tran: Initial commit
- [85af3ba] 2026-05-15 08:30 | ttbhanh-hcmus: first upload
- [c734272] 2026-10-15 01:10 | 23120225: docs: add seminar proposal, phases plan, week 5 plan, and weekly reports
- [6c8ce2a] 2026-10-15 01:29 | 23120225: docs: organize plans into Plan directory and clean weekly report templates
- [c7e7d81] 2026-10-15 21:12 | 23120225: test: configure jest test engine with --runInBand to prevent SQLITE_BUSY lock
- [74a1afd] 2026-10-15 21:50 | trancuonG05: Merge pull request #1 from SoftwareTesting-Group13/feature/giacuong-setup-jest
- [989e4e4] 2026-10-15 22:56 | 23120225: docs(reports): update week 5 ai usage declaration and git commit log for Tran Gia Cuong
- [e5a1c29] 2026-10-15 23:01 | trancuonG05: Merge pull request #2 from SoftwareTesting-Group13/feature/giacuong-setup-jest
- [2d47562] 2026-10-16 00:14 | cuogne: feat: Add GitHub Actions CI workflow for backend
- [b1254cf] 2026-10-16 01:19 | cuogne: fix: update Node.js version in CI workflow to 22
- [e601f21] 2026-10-16 02:00 | cừn: Merge pull request #3 from SoftwareTesting-Group13/ncuong
- [86bd9cd] 2026-10-16 02:35 | cuogne: fix: update dependencies and remove unnecessary peer flags in package-lock.json
- [7be8fe8] 2026-10-16 02:40 | cừn: Merge pull request #4 from SoftwareTesting-Group13/ncuong
- [9a328b4] 2026-10-16 09:26 | 23120102: test: add data-driven coupon tests for apply-coupon API
- [098f447] 2026-10-16 09:30 | 23120102: docs: add coupon test screenshots
- [6b7ddf0] 2026-10-16 09:44 | 23120102: test: move data-driven coupon tests to coupon.test.js, restore coupons.test.js
```

---

## 4. PHÂN LOẠI COMMIT LOG THEO TỪNG THÀNH VIÊN

### 4.1. Thành viên 1: Nguyễn Ngọc Minh Tuấn (MSSV: 23120102)
* **Tổng số commit:** `[...]`
* **Danh sách commits thực tế:**
  ```text
   - [9a328b4] 2026-10-16 09:26 | 23120102: test: add data-driven coupon tests for apply-coupon API
   - [098f447] 2026-10-16 09:30 | 23120102: docs: add coupon test screenshots
   - [6b7ddf0] 2026-10-16 09:44 | 23120102: test: move data-driven coupon tests to coupon.test.js, restore coupons.test.js
  ```

### 4.2. Thành viên 2: Dương Nhật Cường (MSSV: 23120223)
* **Tổng số commit:** `4`
* **Danh sách commits thực tế:**
  ```text
  - [f3b4213] 2026-10-16 10:44: docs: Update AI usage declaration and chat logs for CI/CD workflow caching
  - [86bd9cd] 2026-10-16 02:35: fix: update dependencies and remove unnecessary peer flags in package-lock.json
  - [b1254cf] 2026-10-16 01:19: fix: update Node.js version in CI workflow to 22
  - [2d47562] 2026-10-16 00:14: feat: Add GitHub Actions CI workflow for backend
  ```

### 4.3. Thành viên 3: Trần Gia Cường (MSSV: 23120225)
* **Tổng số commit:** `3`
* **Danh sách commits thực tế:**
  ```text
  - [c734272] 2026-10-15 01:10: docs: add seminar proposal, phases plan, week 5 plan, and weekly reports
  - [6c8ce2a] 2026-10-15 01:29: docs: organize plans into Plan directory and clean weekly report templates
  - [c7e7d81] 2026-10-15 21:12: test: configure jest test engine with --runInBand to prevent SQLITE_BUSY lock
  ```

### 4.4. Thành viên 4: Nguyễn Gia Huy (MSSV: 23120273)
* **Tổng số commit:** `[...]`
* **Danh sách commits thực tế:**
  ```text
  [Dán kết quả commit log của Nguyễn Gia Huy vào đây]
  ```

---

## 5. BẢNG TỔNG KẾT ĐÓNG GÓP THEO THÀNH VIÊN (TUẦN 5)

*(Cập nhật số liệu thực tế dựa trên kết quả chạy lệnh git shortlog và git log --stat)*

| Thành viên | Số commit | Số dòng code / tài liệu thêm (+) | Số dòng xóa (-) | Hạng mục đóng góp chính |
| :--- | :---: | :---: | :---: | :--- |
| **Nguyễn Ngọc Minh Tuấn** | 3 | 303 | 151 | Data-Driven test coupon API, bắt lỗi server.js |
| **Dương Nhật Cường** | | | | Workflow GitHub Actions, Cache setup, Gom báo cáo |
| **Trần Gia Cường** | 3 | 6577 | 664 | Rà soát Proposal & toolSurvey, Cấu hình Jest --runInBand |
| **Nguyễn Gia Huy** | | | | Script Python ai_triage.py, kịch bản Flaky test |
| **TỔNG CỘNG** | | | | |

---

## 6. HƯỚNG DẪN XUẤT TÀI LIỆU SANG PDF / HTML / SLIDE

1. **Xuất sang PDF:**
   - Dùng lệnh in (`Ctrl + P`) → chọn **Save as PDF**.
   - Đặt tên file: `Git_Commit_Log_Total_Week05.pdf`.
2. **Xuất sang HTML:**
   - Sử dụng công cụ chuyển đổi Markdown sang HTML.
3. **Đính kèm Slide:**
   - Đưa ảnh chụp màn hình bảng đối chiếu định danh (mục 1) và biểu đồ đóng góp (mục 5) vào slide báo cáo tiến độ tuần.
