# NHẬT KÝ COMMIT GIT TỔNG HỢP — TUẦN 6 (GIT COMMIT LOG TOTAL)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo  
**GitHub Repository chính thức:** [SoftwareTesting-Group13/eshop-sut-seminar](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar)  
**Nhóm thực hiện:** Nhóm 13  
**Giai đoạn:** Tuần 6 

---

## 1. BẢNG ĐỐI CHIẾU ĐỊNH DANH (MANDATORY IDENTITY MAPPING)

> [!IMPORTANT]
> **Quy định môn học:** Đầu file báo cáo Git bắt buộc phải kê khai rõ ràng bảng ánh xạ giữa tài khoản Git/GitHub Username tương ứng với Mã số sinh viên (MSSV) và Họ tên của từng thành viên trong nhóm để phục vụ việc đối soát tự động.

| STT | Git / GitHub Username | Mã số sinh viên (MSSV) | Họ và tên đầy đủ | Email đăng ký Git | Vai trò chính trong dự án Tuần 6 |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | nnmt2810 | **23120102** | **Nguyễn Ngọc Minh Tuấn** | `23120102@student.hcmus.edu.vn` | Lead Slides (pptx & md), Coupon Data-Driven Tests |
| **2** | cuogne | **23120223** | **Dương Nhật Cường** | `23120223@student.hcmus.edu.vn` | Lead Video Screencast, Quality Gate CI, Package Pre-share |
| **3** | trancuonG05 | **23120225** | **Trần Gia Cường** | `giacuong.0023@gmail.com` | Lead User Guide English, 3 Failure Modes, Mermaid |
| **4** | GiaHuyHCMUS05 | **23120273** | **Nguyễn Gia Huy** | `giahuyst05@gmail.com` | Lead Worksheet & Answer Key, AI Triage Gemini, Metrics |

---

## 2. HƯỚNG DẪN CÁC LỆNH GIT CLI TRÍCH XUẤT LOG TỰ ĐỘNG

Các thành viên sử dụng terminal tại thư mục gốc repository để trích xuất nhật ký commit của mình trong Tuần 6:

```powershell
# 1. Trích xuất tất cả commit của một tác giả cụ thể theo định dạng chuẩn:
git log --author="<ten-hoac-email>" --pretty=format:"* **[%h]** %ad — %s" --date=short

# 2. Xem thống kê số commit và số dòng thay đổi:
git log --author="<ten-hoac-email>" --shortstat

# 3. Xem danh sách commit gọn gàng theo nhánh:
git log --oneline --graph -n 20
```

---

## 3. NHẬT KÝ COMMIT CHI TIẾT THEO TỪNG THÀNH VIÊN TRONG TUẦN 6

### 3.1. Thành viên 1: Nguyễn Ngọc Minh Tuấn (`nnmt2810`)
*Nhánh làm việc chính: `feature/slides-and-coupon-tests`*
* `docs(slides): draft 15-slide seminar presentation pptx and markdown version`
* `test(coupon): extend data-driven test cases for role permissions and boundary checks`
* `ci(coverage): configure jest lcov and html code coverage reporter`
* `docs(script): add live demo presentation script for failure mode 2`
* `chore(consistency): verify cross-references between slides and sut source code`

### 3.2. Thành viên 2: Dương Nhật Cường (`cuogne`)
*Nhánh làm việc chính: `feature/video-screencast-ci-gates`*
* `docs(video): finalize demo screencast storyboard and english narration script`
* `ci(workflow): add quality gate stage to enforce 100% test pass and coverage checks`
* `media(screencast): record and compress Demo_Screencast.mp4 under 100mb with 1080p`
* `release(preshare): bundle deliverables package for pre-share google drive release`
* `docs(report): compile week 6 report and update screenshots index`

### 3.3. Thành viên 3: Trần Gia Cường (`trancuonG05`)
*Nhánh làm việc chính: `gcuong`*
* **[2cb8b4c]** 2026-10-22 — `docs(guide): initialize 7-section user guide structure and table of contents`
* **[9a095ec]** 2026-10-22 — `docs(guide): add deep-dive technical analysis of 3 mandatory failure modes with proven fixes`
* **[0a6f982]** 2026-10-22 — `docs(guide): embed interactive mermaid diagrams for architecture, ci/cd fail-fast pipeline, and sqlite concurrency file-locking`
* **[74e02da]** 2026-10-23 — `docs(guide): write step-by-step reproduction guide and local verification steps`
* **[a5973a4]** 2026-10-23 — `docs(guide): finalize user guide with academic review and validated markdown links`

### 3.4. Thành viên 4: Nguyễn Gia Huy (`GiaHuyHCMUS05`)
*Nhánh làm việc chính: `feature/worksheet-and-ai-triage`*
* `docs(worksheet): create Activity_Worksheet.md for Pipeline Postmortem session`
* `docs(worksheet): add Activity_Worksheet_AnswerKey.md with grading rubric`
* `data(logs): package sample ci failure logs for classroom activity`
* `feat(ai-triage): integrate live gemini api client to generate hypothesis tree`
* `test(flake-rate): execute 10 runs benchmark for flaky test and summarize empirical metrics`

---

## 4. BẢNG TỔNG HỢP ĐÓNG GÓP COMMIT TUẦN 6

| STT | Thành viên | GitHub Username | Số lượng Commits | Dòng thêm (+) | Dòng xóa (-) | Tỷ lệ đóng góp (%) |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | `nnmt2810` | 5 | ~650 | ~120 | 25% |
| 2 | Dương Nhật Cường | `cuogne` | 5 | ~580 | ~90 | 25% |
| 3 | Trần Gia Cường | `trancuonG05` | 5 | ~920 | ~110 | 25% |
| 4 | Nguyễn Gia Huy | `GiaHuyHCMUS05` | 5 | ~710 | ~80 | 25% |
| **Tổng cộng** | **Nhóm 13** | — | **20** | **~2,860** | **~400** | **100%** |
