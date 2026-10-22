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
*Nhánh tài liệu: `feature/giahuy-week6-worksheet`; nhánh demo riêng:
`test/giahuy-sqlite-lock-demo`; nhánh đo W6-20: `test/giahuy-week6-metrics`.*

**Snapshot 8 commit đến `68051e3`, giờ Việt Nam (UTC+7):**

* **[a2cb8c4]** 22/10/2026 11:46 — `docs(worksheet): draft Pipeline Postmortem classroom activity`.
  Phạm vi: 2 file mới, 226 dòng thêm, 0 dòng xóa; bản nháp W6-16.
* **[4495d10]** 22/10/2026 — `docs(reports): record Gia Huy week 6 worksheet draft progress`.
  Phạm vi: 4 file báo cáo, 115 dòng thêm, 22 dòng xóa; local trên nhánh tài liệu.
* **[d35b932]** 22/10/2026 14:18 — `test(sqlite): prepare isolated lock reproduction for worksheet A`.
  Phạm vi: 6 file, 237 dòng thêm, 0 dòng xóa; mã demo, workflow và log local.
  Đã push nhánh `test/giahuy-sqlite-lock-demo`; không push tài liệu Worksheet
  hoặc merge demo vào main.
* **[485a778]** 22/10/2026 — `ci(sqlite): bound demo setup and skip optional npm audit`.
  Phạm vi: 1 file workflow, 3 dòng thêm, 1 dòng xóa; đã push nhánh demo.
  Run CI nguồn SQLite: `39741620266` (parallel failure / serial success).

* **[a15d7c6]** 22/10/2026 — `docs(week6): package worksheet answer key and verified CI evidence`.
  Phạm vi: 48 file, 4608 dòng thêm, 195 dòng xóa và 10 ảnh PNG (không tính
  dòng cho binary). Gồm Worksheet, Answer Key, 6 raw log CI, source/metadata,
  hướng dẫn và hồ sơ. Barem vẫn là đề xuất chưa được nhóm duyệt; commit local,
  chưa push nhánh tài liệu.

* **[c63f346]** 22/10/2026 — `docs(reports): record reviewed week 6 evidence package commit`.
  Phạm vi: 2 file, 35 dòng thêm, 10 dòng xóa; ghi nhận bản đóng gói đã kiểm tra.
* **[ba4b02b]** 22/10/2026 — `test(metrics): add controlled CI before-after and cache measurements`.
  Phạm vi: 5 file, 442 dòng thêm, 0 dòng xóa. Protocol/workflow/bộ đo trên
  nhánh `test/giahuy-week6-metrics` đã push để chạy 10 cặp CI cùng SHA.
* **[68051e3]** 22/10/2026 — `docs(metrics): record ten paired CI runs and measured cache and AI results`.
  Phạm vi: 107 file, 8176 dòng thêm, 9 dòng xóa. Báo cáo, 20 invocation từ
  10 workflow runs, raw artifacts, CSV, checksum và đánh giá AI; commit local,
  chưa push nhánh tài liệu. Before 5/10 fail, after 0/10; giới hạn demo được ghi rõ.

Tổng snapshot 8 commit: 13842 dòng thêm, 237 dòng xóa. Chưa tính commit cập
nhật snapshot này để tránh tự tham chiếu hash/thống kê của chính nó.

**Các bước còn dự kiến, chưa ghi nhận là commit đã có:**

* Nhóm duyệt barem và góp ý bản soạn; cập nhật sau khi có xác nhận thực tế.
* Thử chấm/tổng duyệt với người tham gia khi nhóm tổ chức; chưa ghi nhận đã thử.
* Chụp ảnh history/metrics W6-20 và nhóm rà soát số liệu đã đo; chưa ghi nhận
  ảnh hoặc đánh giá chéo mới. W6-19 chưa nghiệm thu riêng dù W6-20 có một API call thật.

---

## 4. BẢNG TỔNG HỢP ĐÓNG GÓP COMMIT TUẦN 6

| STT | Thành viên | GitHub Username | Số lượng Commits | Dòng thêm (+) | Dòng xóa (-) | Tỷ lệ đóng góp (%) |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | `nnmt2810` | 5 | ~650 | ~120 | 25% |
| 2 | Dương Nhật Cường | `cuogne` | 5 | ~580 | ~90 | 25% |
| 3 | Trần Gia Cường | `trancuonG05` | 5 | ~920 | ~110 | 25% |
| 4 | Nguyễn Gia Huy | `GiaHuyHCMUS05` | 8 | 13842 | 237 | Chưa đối soát |
| **Tổng cộng** | **Nhóm 13** | — | **Chưa đối soát** | **Chưa đối soát** | **Chưa đối soát** | **Chưa đối soát** |

Số liệu của Nguyễn Gia Huy gồm đúng `a2cb8c4`, `4495d10`, `d35b932`, `485a778`,
`a15d7c6`, `c63f346`, `ba4b02b` và `68051e3` trên ba nhánh, chưa tính commit
cập nhật snapshot này.
Các hàng thành viên khác được giữ theo bản kê khai của nhóm; chưa
đối soát lại nên chưa chốt tổng cộng hoặc tỷ lệ đóng góp.
