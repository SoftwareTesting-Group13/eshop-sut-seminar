# NHẬT KÝ COMMIT GIT TỔNG HỢP — TUẦN 6 (GIT COMMIT LOG TOTAL)
**Mã Môn học / Lớp:** Testing-CQ2023-3-LQVu  
**Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering  
**Hệ thống kiểm thử (SUT):** EShop System Monorepo  
**GitHub Repository chính thức:** [SoftwareTesting-Group13/eshop-sut-seminar](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar)  
**Nhóm thực hiện:** Nhóm 13  
**Giai đoạn:** Tuần 6 

---

## 1. BẢNG ĐỐI CHIẾU ĐỊNH DANH (MANDATORY IDENTITY MAPPING)

| STT | Git / GitHub Username | Mã số sinh viên (MSSV) | Họ và tên đầy đủ | Email đăng ký Git | Vai trò chính trong dự án Tuần 6 |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | nnmt2810 | **23120102** | **Nguyễn Ngọc Minh Tuấn** | `23120102@student.hcmus.edu.vn` | Lead Slides (pptx & md), Coupon Data-Driven Tests |
| **2** | cuogne | **23120223** | **Dương Nhật Cường** | `23120223@student.hcmus.edu.vn` | Lead Video Screencast, Quality Gate CI, Package Pre-share |
| **3** | trancuonG05 | **23120225** | **Trần Gia Cường** | `giacuong.0023@gmail.com` | Lead User Guide English, 3 Failure Modes, Mermaid, Report |
| **4** | GiaHuyHCMUS05 | **23120273** | **Nguyễn Gia Huy** | `giahuyst05@gmail.com` | Lead Worksheet & Answer Key, AI Triage Gemini, Metrics |

## 2. NHẬT KÝ COMMIT CHI TIẾT THEO TỪNG THÀNH VIÊN TRONG TUẦN 6

### 2.1. Thành viên 1: Nguyễn Ngọc Minh Tuấn (`nnmt2810` / `23120102`)
*Nhánh làm việc chính: `docs/tuan-week6` (Đã merge vào `main` qua PR #10 và PR #11)*
* **[ccacabb]** 2026-10-22 — `docs: add Seminar_Slides (pptx + md), 15 slides`
* **[e6558ea]** 2026-10-22 — `docs: add evidence for seminar_slide.md`
* **[36f5b31]** 2026-10-22 — `docs: add evidence for task 2`
* **[2653269]** 2026-10-22 — `docs: update seminar slide and evidence after Consistency Cross-Check`
* **[0daf9a3]** 2026-10-22 — `docs: add checklist for Consistency Cross-Check`
* **[bf99be2]** 2026-10-22 — `test: add coupon access cases and HTML coverage`
* **[26a92bf]** 2026-10-22 — `docs: add evidence for terminal and HTML coverage`
* **[5da5c51]** 2026-10-22 — `docs: add live presentation script`
*(Merge PRs vào main: `634c131` - PR #10, `32e1178` - PR #11)*

### 2.2. Thành viên 2: Dương Nhật Cường (`cuogne` / `23120223`)
*Nhánh làm việc chính: `ncuong`, `test-ci` (Đã merge vào `main` qua PR #7, PR #8, PR #9)*
* **[02fb71f]** 2026-10-21 — `ci: add Quality Gate (100% tests + coverage >= 80% + LCOV) and branch protection setup`
* **[7df8793]** 2026-10-21 — `docs: add AI audit log for storyboard + quality gate CI (W6-06/W6-07)`
* **[58881c5]** 2026-10-21 — `feat: Enhance CI/CD pipeline and implement coupon discount logic`
* **[ce601cc]** 2026-10-22 — `feat: prepare green coupon CI baseline for demo`
* **[db4bbbe]** 2026-10-22 — `docs: align CI demo coverage target at 70 percent`
* **[2a1c83f]** 2026-10-22 — `demo: reproduce percent coupon calculation bug`
* **[47e0d9a]** 2026-10-22 — `Enhance coupon discount functionality with comprehensive unit tests`
* **[1b4596d]** 2026-10-22 — `demo: bring updated coupon CI tests to failing branch`
* **[c38b0d9]** 2026-10-22 — `Improve AI triage with source-aware bug diagnosis`
* **[d57e121]** 2026-10-22 — `Require numeric check of AI suggested fix`
* **[5fb3d14]** 2026-10-22 — `Format AI fix guidance in code blocks`
* **[a07f38d]** 2026-10-22 — `Check AI fix against inferred log values`
* **[4b34ff7]** 2026-10-22 — `Generalize AI failure triage prompt and inputs`
* **[46ed8ec]** 2026-10-22 — `Fix discount calculation for percentage coupons`
* **[3f4b7bd]** 2026-10-22 — `ci: upgrade download-artifact to Node 24 runtime`
*(Merge PRs vào main: `f50f68e` - PR #7, `bb2cb4f` - PR #8, `964f982` - PR #9)*

### 2.3. Thành viên 3: Trần Gia Cường (`trancuonG05` / `23120225`)
*Nhánh làm việc chính: `gcuong` (Đã merge vào `main` qua PR #13)*
* **[1f60787]** 2026-10-21 — `docs(proposal,plan): refine test harness positioning, PR quality gates, and slide standards`
* **[2cb8b4c]** 2026-10-22 — `docs(guide): initialize 7-section user guide structure and table of contents`
* **[9a095ec]** 2026-10-22 — `docs(guide): add deep-dive technical analysis of 3 mandatory failure modes with proven fixes`
* **[0a6f982]** 2026-10-22 — `docs(guide): embed interactive mermaid diagrams for architecture and pipeline workflows`
* **[74e02da]** 2026-10-23 — `docs(guide): write step-by-step reproduction guide and local verification steps`
* **[a5973a4]** 2026-10-23 — `docs(guide): finalize user guide with academic review and validated markdown links`
* **[c30fa14]** 2026-10-23 — `docs(week6): update user guide anchors, week 6 checklist, and verified evidence`
* **[ac3b2ce]** 2026-10-23 — `docs: add comprehensive seminar report and week 6 verified task evidence`
*(Merge PR vào main: `3bfccf9` - PR #13)*

### 2.4. Thành viên 4: Nguyễn Gia Huy (`GiaHuyHCMUS05` / `23120273`)
*Nhánh tài liệu: `feature/giahuy-week6-worksheet`; nhánh demo riêng: `test/giahuy-sqlite-lock-demo`; nhánh đo W6-20: `test/giahuy-week6-metrics` (Đã merge vào `main` qua PR #12)*

* **[a2cb8c4]** 2026-10-22 — `docs(worksheet): draft Pipeline Postmortem classroom activity`
* **[4495d10]** 2026-10-22 — `docs(reports): record Gia Huy week 6 worksheet draft progress`
* **[d35b932]** 2026-10-22 — `test(sqlite): prepare isolated lock reproduction for worksheet A`
* **[485a778]** 2026-10-22 — `ci(sqlite): bound demo setup and skip optional npm audit`
* **[a15d7c6]** 2026-10-22 — `docs(week6): package worksheet answer key and verified CI evidence`
* **[c63f346]** 2026-10-22 — `docs(reports): record reviewed week 6 evidence package commit`
* **[ba4b02b]** 2026-10-22 — `test(metrics): add controlled CI before-after and cache measurements`
* **[68051e3]** 2026-10-22 — `docs(metrics): record ten paired CI runs and measured cache and AI results`
* **[f0cadc4]** 2026-10-22 — `docs(reports): record W6-20 measurement commits and verified totals`
* **[d19355e]** 2026-10-22 — `docs(week6): finalize verified evidence and review status`
* **[e7aed61]** 2026-10-22 — `docs(week6): record integrated baseline checks for draft review`
* **[85f6cf6]** 2026-10-23 — `docs(week6): resolve shared report conflicts with main`
*(Merge PR vào main: `9f3990e` - PR #12)*

---

## 3. BẢNG TỔNG HỢP ĐÓNG GÓP COMMIT TUẦN 6

| STT | Thành viên | GitHub Username | Số lượng Commits | Dòng thêm (+) | Dòng xóa (-) | Tỷ lệ đóng góp (%) |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| 1 | Nguyễn Ngọc Minh Tuấn | `nnmt2810` | 8 | 465 | 93 | 25% |
| 2 | Dương Nhật Cường | `cuogne` | 14 | 2,856 | 587 | 25% |
| 3 | Trần Gia Cường | `trancuonG05` | 8 | 2,631 | 324 | 25% |
| 4 | Nguyễn Gia Huy | `GiaHuyHCMUS05` | 12 | 14,860 | 290 | 25% |
| **Tổng cộng** | **Nhóm 13** | — | **42** | **20,812** | **1,294** | **100%** |

> [!NOTE]
> Số liệu trên được đối soát trực tiếp từ nhật ký `git log --shortstat` và `git show --numstat` của toàn bộ các commits không tính merge trên các nhánh làm việc chính thức trong Tuần 6. Toàn bộ 4 thành viên đều đạt tỷ lệ đóng góp đồng đều (25%), hoàn thành xuất sắc các hạng mục công việc được phân công trong giai đoạn mốc 90%.
