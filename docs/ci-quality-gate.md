# EShop CI — Quality Gate & Branch Protection

> **Chủ đề Seminar:** T07 — CI/CD & Test-Harness Engineering
> **SUT:** EShop System Monorepo (backend Express + SQLite + Jest)
> **Phụ trách:** Dương Nhật Cường (23120223) — Task W6-07
> **Workflow:** [`../.github/workflows/eshop-ci.yml`](../.github/workflows/eshop-ci.yml)

---

## 1. Tổng quan kiến trúc pipeline

```
pull_request / push
        │
        ▼
┌──────────────────────────┐
│  job: backend-test       │  checkout → cache node_modules → npm ci
│  "Backend Test (Node.js 22)" │  → npm run test:ci  (jest + coverage)
└──────────────────────────┘  → upload artifact: eshop-coverage
        │  (luôn chạy, kể cả khi test fail)
        ▼
┌──────────────────────────────────────────────────────────┐
│  job: quality-gate                                       │
│  "Quality Gate (100% Tests & Coverage >= 80%)"  ◀── REQUIRED STATUS CHECK
│  ├─ 1. TEST GATE    : 100% test suites phải PASS         │
│  ├─ 2. COVERAGE GATE: statements/lines/functions/branches │
│  │                   >= 80%                             │
│  └─ 3. LCOV GATE    : coverage/lcov.info phải tồn tại    │
│  → exit 1  ⇒  job ĐỎ  ⇒  PR bị chặn merge (Fail-Fast)  │
└──────────────────────────────────────────────────────────┘
        │
        ▼
  comment verdict lên Pull Request + artifact LCOV
```

**Vì sao tách 2 job thay vì gộp 1 job?**

| Vấn đề | Xử lý |
| :--- | :--- |
| Nếu gộp, test đỏ làm job dừng luôn ⇒ không có status check rõ ràng cho PR (GitHub hiện *"Expected — Waiting for status to be reported"*) | Job `quality-gate` dùng `if: always()` nên **luôn** chạy và **luôn** báo PASS/FAIL rõ ràng |
| Người review cần biết lỗi do test hay do coverage | Báo cáo Markdown chi tiết + GitHub annotation `::error::` + comment ghim trên PR |

---

## 2. Ba tiêu chí của Quality Gate

Script thực thi: [`../.github/scripts/quality-gate.js`](../.github/scripts/quality-gate.js) (Node.js thuần, không thêm dependency).

| # | Tiêu chí | Nguồn dữ liệu | Điều kiện PASS |
| :--- | :--- | :--- | :--- |
| 1 | **Test Gate** | `backend/coverage/jest-results.json` | `numFailedTestSuites = 0` **và** `numFailedTests = 0` (tức 100% suite pass) |
| 2 | **Coverage Gate** | `backend/coverage/coverage-summary.json` | statements / lines / functions ≥ 80%, branches ≥ 80% |
| 3 | **LCOV Gate** | `backend/coverage/lcov.info` | File tồn tại, có ít nhất 1 record `SF:` và khác rỗng |

Điểm cốt lõi: **ngưỡng chỉ được kiểm soát ở một chỗ duy nhất** (`quality-gate.js`). Không đặt `coverageThreshold` trong `jest.config.js` để tránh tình trạng "Jest báo fail nhưng gate báo pass" (hoặc ngược lại).

### 2.1. Nới / siết ngưỡng mà không cần sửa code

Đặt Repository Variables (Settings → Secrets and variables → Actions → Variables):

| Tên biến | Mặc định | Ý nghĩa |
| :--- | :---: | :--- |
| `COVERAGE_THRESHOLD` | `80` | Ngưỡng cho statements / lines / functions |
| `COVERAGE_BRANCHES_THRESHOLD` | = `COVERAGE_THRESHOLD` | Ngưỡng cho branches |

> **Lưu ý:** `branches` khó đạt 80% hơn vì phần lớn nhánh `if (err)` chỉ chạy khi DB lỗi (cần fault-injection). Trong giai đoạn "ramp-up", nhóm có thể đặt tạm `COVERAGE_BRANCHES_THRESHOLD=60` rồi nâng dần — việc này được ghi rõ, không che giấu.

### 2.2. Chạy kiểm chứng local (trước khi push)

```bash
cd backend
npm ci                 # cài dependency (lần đầu)
npm run test:ci        # jest + coverage + jest-results.json
npm run quality-gate   # chấm điểm 3 tiêu chí (exit 0 = PASS, exit 1 = FAIL)
```

Tương đương 100% với những gì CI chạy ⇒ "xanh tại local" nghĩa là "xanh trên GitHub".

---

## 3. Báo cáo LCOV

* Sinh ra tại `backend/coverage/lcov.info` (reporter `lcov`) + `lcov-report/index.html` (bản HTML) + `coverage-summary.json` (đầu vào cho gate).
* Job `quality-gate` upload artifact `eshop-lcov-report` ⇒ tải được từ đường dẫn **Artifacts** của mỗi lần chạy CI.
* File `backend/coverage/` đã nằm trong `.gitignore` (`*/coverage/`) ⇒ **không** commit báo cáo vào repo.

---

## 4. Branch Protection Rules (Required Status Checks)

### 4.1. Áp dụng bằng script (khuyến nghị — idempotent, có thể chạy lại)

```bash
export GITHUB_TOKEN=<PAT có quyền admin trên repo>
bash .github/scripts/configure-branch-protection.sh --dry-run   # xem payload
bash .github/scripts/configure-branch-protection.sh             # áp dụng thật
bash .github/scripts/configure-branch-protection.sh --show      # xem cấu hình hiện tại
```

Cấu hình được áp dụng:

| Thuộc tính | Giá trị | Ý nghĩa |
| :--- | :--- | :--- |
| Required status checks | `Quality Gate (100% Tests & Coverage >= 80%)` | PR chỉ merge được khi gate xanh |
| Strict | `true` | Nhánh phải cập nhật với `main` trước khi merge |
| Enforce for admins | `true` | Kể cả admin cũng không bypass được ⇒ "khoá cứng" trên UI |
| Required approving reviews | `1` | Cần ít nhất 1 người review duyệt |
| Force push / Delete branch | `false` (bị chặn) | Không phá vỡ lịch sử `main` |

### 4.2. Áp dụng thủ công trên UI GitHub

`Repo → Settings → Branches → Add rule / Edit rule` (nhánh `main`):

1. **Require a pull request before merging** → bật, *Require approvals* = 1.
2. **Require status checks to pass** → bật, chọn đúng tên
   `Quality Gate (100% Tests & Coverage >= 80%)` (bấm *Add* sau khi tìm thấy check).
3. *Require branches to be up to date before merging* → bật.
4. **Do not allow bypassing the above settings** → bật (áp dụng cho cả admin).
5. *(Tuỳ chọn)* **Do not allow force pushes** / **Do not allow deletions** → bật.

### 4.3. Kịch bản demo Fail-Fast (dùng cho video screencast)

1. Tạo nhánh `feature/<tên>-<nội-dung>` từ `main`, sửa code **cố ý làm hỏng** (ví dụ: sửa lại công thức coupon percent, hoặc thêm một nhánh `if` chưa được test).
2. Push → mở Pull Request vào `main`.
3. CI chạy: job `backend-test` đỏ ⇒ job `quality-gate` đỏ ⇒ **nút Merge bị khoá cứng** kèm annotation đỏ trong tab *Checks* và comment tóm tắt trên PR.
4. Sửa lỗi → push ⇒ cả 2 job xanh ⇒ nút Merge được mở khoá ⇒ merge được.

> Nhánh không có bản vá nào cũng không thể bypass: `enforce_admins = true`.

---

## 5. Vận hành & xử lý sự cố

| Triệu chứng | Nguyên nhân | Cách xử lý |
| :--- | :--- | :--- |
| PR bị kẹt ở *"Expected — Waiting for status to be reported"* | Job `quality-gate` chưa từng chạy với đúng tên | Mở Actions → chạy lại workflow 1 lần, hoặc dùng `gh api` để đọc đúng `name` của job |
| Gate báo *"Không đọc được file kết quả test"* | Job test chết trước khi sinh artifact (ví dụ `npm ci` lỗi) | Xem log job `backend-test`; artifact được upload với `if: always()` nên thường vẫn còn |
| Coverage thấp hơn ngưỡng | Bộ test chưa phủ hết API của `backend/server.js` | Bổ sung test (xem `Plan/Week6Plan.md` — task mở rộng test suite) hoặc nới `COVERAGE_THRESHOLD` có ghi nhận |
| Nhóm không muốn bắt buộc review | — | `REQUIRED_APPROVALS=0 bash .github/scripts/configure-branch-protection.sh` |

---

## 6. Tài liệu liên quan

* [`../.github/workflows/eshop-ci.yml`](../.github/workflows/eshop-ci.yml) — định nghĩa pipeline.
* [`../.github/scripts/quality-gate.js`](../.github/scripts/quality-gate.js) — logic chấm điểm 3 tiêu chí.
* [`../.github/scripts/configure-branch-protection.sh`](../.github/scripts/configure-branch-protection.sh) — cài Branch Protection Rules.
* [`../backend/jest.config.js`](../backend/jest.config.js) — cấu hình reporter coverage (LCOV/JSON).
* [`../Plan/Checklist.md`](../Plan/Checklist.md) — 5 cổng nghiệm thu bắt buộc của nhóm.
* [`../Weekly_Reports/Week06/chat_logs/chatlog_ncuong_video_storyboard_ci.md`](../Weekly_Reports/Week06/chat_logs/chatlog_ncuong_video_storyboard_ci.md) — nhật ký làm việc với AI.
