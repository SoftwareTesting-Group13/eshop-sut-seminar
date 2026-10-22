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
*Nhánh làm việc chính: `docs/user-guide-and-failure-modes`*
* `docs(guide): initialize User_Guide.md skeleton with 7 mandatory sections`
* `docs(guide): complete deep-dive analysis on 3 mandatory failure modes`
* `docs(mermaid): add architecture, ci/cd pipeline and sqlite lock diagrams`
* `docs(guide): document step-by-step reproduction guide for all failure modes`
* `style(guide): review academic english grammar, markdown formatting and link integrity`

### 3.4. Thành viên 4: Nguyễn Gia Huy (`GiaHuyHCMUS05`)
*Nhánh làm việc: `feature/giahuy-week6-worksheet`.*

**Nhật ký thật trích xuất đến `a2cb8c4`, giờ Việt Nam (UTC+7):**

* **[a2cb8c4]** 22/10/2026 11:46 — `docs(worksheet): draft Pipeline Postmortem classroom activity`.
* Phạm vi: 2 file mới, 226 dòng thêm, 0 dòng xóa. Đây là commit bản nháp,
  chưa phải nghiệm thu toàn bộ W6-16. Chưa gồm commit cập nhật hồ sơ này.

**Các bước còn dự kiến, chưa ghi nhận là commit đã có:**

* Hoàn thiện Worksheet sau khi rà soát và chọn bộ log CI.
* Soạn `Activity_Worksheet_AnswerKey.md` với barem chi tiết.
* Đóng gói sample CI logs có nguồn kiểm chứng.
* Kiểm chứng Gemini API thật và đo 10 lượt Flaky trên CI.

---

## 4. BẢNG TỔNG HỢP ĐÓNG GÓP COMMIT TUẦN 6

| STT | Thành viên | GitHub Username | Số lượng Commits | Dòng thêm (+) | Dòng xóa (-) | Tỷ lệ đóng góp (%) |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | `nnmt2810` | 5 | ~650 | ~120 | 25% |
| 2 | Dương Nhật Cường | `cuogne` | 5 | ~580 | ~90 | 25% |
| 3 | Trần Gia Cường | `trancuonG05` | 5 | ~920 | ~110 | 25% |
| 4 | Nguyễn Gia Huy | `GiaHuyHCMUS05` | 1 | 226 | 0 | Chưa đối soát |
| **Tổng cộng** | **Nhóm 13** | — | **Chưa đối soát** | **Chưa đối soát** | **Chưa đối soát** | **Chưa đối soát** |

Số liệu của Nguyễn Gia Huy là bản trích xuất đến `a2cb8c4`, chưa tính commit cập
nhật hồ sơ. Các hàng thành viên khác được giữ theo bản kê khai của nhóm; chưa
đối soát lại nên chưa chốt tổng cộng hoặc tỷ lệ đóng góp.
