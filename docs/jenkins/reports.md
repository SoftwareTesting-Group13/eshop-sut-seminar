# Đọc kết quả trên Jenkins — EShop Seminar

Pipeline demo này **không dùng plugin JUnit / Coverage**: repo chưa có reporter
`jest-junit` hay `cobertura`, nên không cài thêm dependency và không đụng
`package-lock.json`. Kết quả được đọc qua **Console Output** và **Artifacts** —
đủ để demo pass/fail và đối chiếu với GitHub Actions.

> Nếu sau này muốn có tab **Test Results** / **Coverage** đẹp trên giao diện
> Jenkins, cần thêm `jest-junit` (sinh `backend/test-results/junit.xml`) và
> `cobertura` vào `coverageReporters` trong `backend/jest.config.js`, rồi cài
> plugin `junit` + `coverage`. Hiện tại chưa làm.

---

## 1. Mở đúng trang

```text
Jenkins → eshop-ci (Multibranch) → job con của nhánh demo → chọn 1 build
```

- **Console Output**: log đầy đủ của cả 5 stage.
- **Artifacts** (cuối trang): 8 file, tải về được bất kỳ lúc nào.
- Trang của job con (không phải trang tổng `eshop-ci`) mới có menu
  **Stages / Pipeline Overview** để xem sơ đồ 5 stage.

> Plugin **Pipeline: Stage View** (ID `pipeline-stage-view`) cho bảng màu từng
> stage; **Pipeline Graph View** cho sơ đồ. Cài ở Manage Jenkins → Plugins nếu
> muốn có giao diện đẹp.

---

## 2. Đọc từng stage trong log

| Stage | Dòng log quan trọng | Nghĩa khi đỏ |
|---|---|---|
| Environment | `commit:`, `node: v22.x` | Sai phiên bản Node → build lại image agent; sai commit → kiểm tra branch/remote |
| Install | `added 424 packages` | `npm ci` fail → thường do `package.json` và `package-lock.json` lệch nhau |
| Test | `Tests: 23 passed` / `✕ <tên test>` | Unit test fail → xem expected/actual ngay dưới |
| Quality Gate | `VERDICT: ✅/❌` | Test đỏ, hoặc line coverage ≤ 70%, hoặc thiếu `lcov.info` |

Stage đỏ đầu tiên là nguyên nhân; các stage sau bị **skipped** chỉ là hệ quả.

---

## 3. Danh sách artifact

| File | Nội dung |
|---|---|
| `backend/test-results/environment.log` | branch, commit SHA, node/npm/git version |
| `backend/test-results/install.log` | output của `npm ci` |
| `backend/test-results/test.log` | output của Jest: từng test, pass/fail, bảng coverage |
| `backend/test-results/quality-gate.log` | output của `quality-gate.js`, kết luận PASS/FAIL |
| `backend/coverage/jest-results.json` | kết quả test dạng JSON (máy đọc được) |
| `backend/coverage/coverage-summary.json` | tỷ lệ coverage tổng + theo file |
| `backend/coverage/lcov.info` | báo cáo LCOV (định dạng chuẩn, đọc được bằng mọi tool) |
| `backend/coverage/quality-gate-report.md` | báo cáo gate dạng Markdown — **giống hệt** file GitHub Actions sinh ra |

Không có file nào trong artifact bị mất khi build đỏ: khối `post { always }` của
pipeline luôn archive, kể cả khi stage Test hoặc Quality Gate fail.

---

## 4. Đối chiếu với GitHub Actions

Cùng một commit, hai lệnh giống hệt quyết định verdict ở cả hai nền tảng:

```text
npm run test:ci:demo                  → 23 unit test nghiệp vụ coupon
npm run quality-gate                  → tests 100% PASS + lines > 70% + có LCOV
```

Cách so sánh nhanh:

1. Jenkins: artifact `backend/coverage/quality-gate-report.md`.
2. GitHub Actions: tab **Actions** → job `backend-test` / `quality-gate`, hoặc
   comment trên PR (script gate append vào `GITHUB_STEP_SUMMARY`).

Nội dung hai bên giống nhau vì cùng gọi một script
`.github/scripts/quality-gate.js`.

---

## 5. Bảng chẩn đoán nhanh

| Triệu chứng | Nguyên nhân thường gặp | Xử lý |
|---|---|---|
| Không thấy mục **Artifacts** | Build chưa chạy, hoặc lỗi trước khi `post always` | Build Now lại |
| `Test Results` / `Coverage` không có menu | Bản Jenkins này không cài plugin đó | Đọc Console + Artifacts (đúng thiết kế hiện tại) |
| `environment.log` trống | Stage Environment fail trước khi ghi log | Xem lỗi ngay phía trên trong Console |
| `jest-results.json` không có | Stage Install fail → chưa chạy test | Xem `install.log` |
| `quality-gate-report.md` không có | Stage Test fail → Quality Gate bị skip, gate chưa chạy | Xem `test.log` để biết test nào fail |
| Coverage = 0% | `collectCoverageFrom` không khớp file nào | Kiểm tra `backend/jest.config.js` |
| `Expected Node v22.x` | Image agent cũ (Node 24) | `up -d --build agent` |
| Commit trong log ≠ commit vừa push | Job build nhầm branch | Kiểm tra lại Branch Source / nhánh demo |
| GitHub báo 403 khi gửi commit status | Token thiếu quyền `Commit statuses: write` | Demo hiện tại không dùng status nên bỏ qua |

---

## 6. Số liệu baseline để dùng khi trình bày

Đo trên commit sạch, Node 22:

| Chỉ số | Giá trị |
|---|---|
| Test suites | 1 |
| Test cases | 23 pass / 0 fail |
| Coverage (statements / branches / functions / lines) | 100% / 100% / 100% / 100% |
| File được đo coverage | `backend/coupon-discount.js` |
| Verdict | `✅ QUALITY GATE PASSED` |

Các số này là kết quả thật đo được, không phải ví dụ minh hoạ.

---

## 7. Tham khảo

- [Jenkins Pipeline as Code](https://www.jenkins.io/doc/book/pipeline/pipeline-as-code/)
- [Artifact archiving](https://www.jenkins.io/doc/pipeline/steps/archiveArtifacts/)
- [Pipeline Graph View](https://plugins.jenkins.io/pipeline-graph-view/) /
  [Pipeline Stage View](https://plugins.jenkins.io/pipeline-stage-view/)
- [Jest-JUnit reporter](https://github.com/jest-community/jest-junit) (dùng nếu sau này muốn có Test Results)
