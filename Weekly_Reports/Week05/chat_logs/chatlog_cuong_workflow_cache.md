# Chat Log — CI/CD Workflow & Dependency Cache
**Thành viên:** Dương Nhật Cường — MSSV: 23120223
**Tuần:** Week 05 — Chủ đề Seminar T07: CI/CD & Test-Harness Engineering
**Hệ thống kiểm thử (SUT):** EShop System Monorepo (backend Express + SQLite)
**Công cụ AI sử dụng:** OpenCode AI Coding Agent
**Ngày thực hiện:** 16/10/2026
**File minh chứng sinh ra:** `.github/workflows/eshop-ci.yml`, `backend/package-lock.json` (đã đồng bộ)

---

## 1. MỤC TIÊU CÔNG VIỆC

Xây dựng pipeline CI/CD đầu tiên cho repo EShop bằng GitHub Actions, đảm bảo:
1. Chạy trên runner `ubuntu-latest`, Node.js 22.
2. Tự động cài dependency và chạy toàn bộ backend test suite (Jest + Supertest).
3. Tối ưu thời gian bằng `actions/cache` cho `backend/node_modules`.
4. Ghi nhận hiệu quả tăng tốc thực tế (mục tiêu: từ ~60s xuống ~5s).

---

## 2. PROMPT TIÊU BIỂU ĐÃ SỬ DỤNG

> **Prompt:**
> *"Bạn là 1 chuyên gia DevOps với kinh nghiệm build các CI/CD Pipeline hoàn chỉnh.
> Task: Quét toàn bộ repo này, khởi tạo thư mục `.github/workflows/` trong repo EShop, xây dựng file cấu hình `eshop-ci.yml` chạy trên runner `ubuntu-latest` với Node.js 22, tích hợp `actions/cache` cho thư mục `backend/node_modules` và ghi nhận hiệu quả tăng tốc (từ ~60s xuống ~5s).
> Sau khi làm xong, ghi lại phần chat log: `chatlog_cuong_workflow_cache.md`."*

> **Prompt bổ sung (điều chỉnh runtime):**
> *"Sửa lại là chạy Node.js 22 nhé, 20 cũ rồi thấy ít nơi support nữa."*

---

## 3. NHẬT KÝ HỘI THOẠI (AI RESPONSE LOG)

### Lượt 1 — Quét cấu trúc repo

**Yêu cầu:** Khảo sát repo để xác định cấu trúc monorepo, runtime và cách chạy test.

**Kết quả AI tổng hợp được:**
- Repo là **monorepo 4 thành phần**: `backend` (Express + SQLite), `frontend-web`, `frontend-admin` (React + Vite), `frontend-mobile` (React Native/Expo).
- `backend/package.json` có script `test`: `jest --runInBand --detectOpenHandles --forceExit`.
- Tồn tại `backend/package-lock.json` → **đủ điều kiện dùng `npm ci`** và băm cache key theo lock file.
- Có 4 test suites trong `backend/tests/`: `auth`, `coupons`, `health`, `orders`.
- Chưa tồn tại thư mục `.github/` → cần khởi tạo mới.
- Nhánh mặc định của remote là `main`.

**Nhận xét:** AI quét đúng phạm vi, phát hiện đúng điểm mấu chốt (có lock file → cache key ổn định).

---

### Lượt 2 — Thiết kế chiến lược cache

**Câu hỏi:** *"Vì sao phải dùng `npm ci` cho nhánh cache-miss mà không phải `npm install`? Và tại sao không chạy `npm ci` khi cache HIT?"*

**Giải thích của AI (đã kiểm chứng lại):**
- `npm ci` cài **đúng phiên bản trong lock file**, nhanh và mang tính tái lập (reproducible) — phù hợp CI.
- **Điểm quan trọng:** `npm ci` luôn **xóa sạch `node_modules`** trước khi cài. Do đó nếu vẫn chạy `npm ci` khi cache HIT thì cache vô nghĩa.
- Giải pháp: dùng `id` cho step cache và điều kiện `if: steps.cache-node-modules.outputs.cache-hit != 'true'` để **chỉ cài khi cache MISS**.

**Nhận xét:** AI giải thích rõ về việc npm ci và npm install khác nhau trong môi trường CI.

---

### Lượt 3 — Sinh file workflow hoàn chỉnh

**Yêu cầu:** Sinh `.github/workflows/eshop-ci.yml`.

**Kết quả AI sinh ra (cấu trúc chính):**

```yaml
name: EShop CI
on:
  push:        { branches: [main, master] }
  pull_request:{ branches: [main, master] }
  workflow_dispatch:
concurrency:
  group: eshop-ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
jobs:
  backend-test:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: backend } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - name: Cache backend/node_modules
        id: cache-node-modules
        uses: actions/cache@v4
        with:
          path: backend/node_modules
          key: ${{ runner.os }}-node22-${{ hashFiles('backend/package-lock.json') }}
          restore-keys: ${{ runner.os }}-node22-
      - name: Install dependencies (npm ci)
        if: steps.cache-node-modules.outputs.cache-hit != 'true'
        run: npm ci
      - run: npm test
```

**Các quyết định thiết kế AI đề xuất:**
| Hạng mục | Lựa chọn | Lý do |
| :--- | :--- | :--- |
| Runner | `ubuntu-latest` | Theo yêu cầu, chi phí thấp, hỗ trợ tốt Node. |
| Node | `20` (LTS) | Ổn định, tương thích Express 5 / Jest 30. |
| Cache key | `hashFiles('backend/package-lock.json')` | Đổi dependency → đổi key → tự động invalidate. |
| `restore-keys` | `...-node22-` | Tận dụng cache cũ gần đúng khi lock file đổi. |
| `concurrency` + `cancel-in-progress` | Bật | Tránh chạy trùng, tiết kiệm phút runner. |
| `permissions: contents: read` | Bật | Tuân thủ nguyên tắc least-privilege. |

**Nhận xét:** Cấu trúc rõ ràng, có `defaults.run.working-directory: backend` giúp mọi bước chạy đúng thư mục backend.

---

### Lượt 4 — Điều chỉnh runtime lên Node.js 22

**Yêu cầu:** *"Sửa lại là chạy Node.js 22 nhé, 20 cũ rồi thấy ít nơi support nữa."*

**AI đã cập nhật đồng bộ:**
- `actions/setup-node@v4` → `node-version: '22'`.
- Cache key và `restore-keys` → đổi tiền tố `node20` thành `node22` (buộc tạo cache mới, không dùng nhầm cache build bởi Node 20).
- Cập nhật tên job/step và toàn bộ comment trong file cho khớp Node.js 22.

**Nhận xét:** Vì Node.js 20 đã bị deprecated, việc chuyển sang Node.js 22 là cần thiết để đảm bảo tính ổn định và hỗ trợ lâu dài.

---

## 4. KIỂM CHỨNG & BIÊN TẬP THỦ CÔNG

1. **Đối chiếu thực tế repo:**
   - Tự kiểm tra file `backend/package-lock.json` và 4 test suites — khớp với AI mô tả.

2. **Kiểm tra cú pháp YAML:**
   - Chạy `npx js-yaml .github/workflows/eshop-ci.yml` → kết quả `YAML OK`.

3. **Kiểm chứng logic cache:**
   - Tự đọc lại tài liệu `actions/cache@v4` và `npm ci` để xác nhận: `npm ci` xóa `node_modules`, nên bắt buộc phải có điều kiện `if: cache-hit != 'true'`. Đã sửa/áp dụng đúng vào file.
---

## 5. KẾT QUẢ & HIỆU QUẢ CACHE GHI NHẬN

| Kịch bản | Điều kiện cache | Bước cài dependency | Ghi chú |
| :--- | :--- | :---: | :--- |
| **Cold run** | Cache MISS (lần đầu / lock file đổi) | **~18s** | Chạy `npm ci` tải toàn bộ dependency từ npm registry. |
| **Warm run** | Cache HIT (lần chạy sau) | **~14s** | Khôi phục `backend/node_modules` từ cache, bỏ qua `npm ci`. |

**Kết luận:** Cache giúp giảm thời gian cài dependency từ từ 18s xuống còn 14s (~22% giảm), đồng thời tránh lỗi `EUSAGE` khi lock file khớp. Có thể là do số lượng dependencies không quá lớn nên chưa thấy hiệu quả tăng tốc như kỳ vọng, nhưng vẫn đảm bảo tính tái lập và ổn định cho CI/CD pipeline.

---

## 6. PHIÊN BỔ SUNG — ĐIỀU TRA & SỬA LỖI PIPELINE `npm ci` (EUSAGE)

> Phiên làm việc thứ hai trong cùng ngày 16/10/2026, sau khi pipeline CI đầu tiên được push lên GitHub và thất bại ở bước cài dependency.

### Lượt 5 — Review log CI thất bại

**Prompt:**
> *"Pipeline CI bị lỗi như hình, review và report lại giúp tôi."* (kèm ảnh chụp log GitHub Actions)

**Kết quả AI phân tích từ log:**
- Bước thất bại: `Install dependencies (npm ci)`; mã lỗi `npm error code EUSAGE`.
- Nguyên văn thông báo: *"`npm ci` can only install packages when your package.json and package-lock.json ... are in sync. Please update your lock file with `npm install` before continuing."*
- Các package npm báo thiếu/lệch: `@emnapi/core@1.11.3`, `@emnapi/runtime@1.11.3`, `@emnapi/wasi-threads` (lock đang có `1.2.1` không thỏa `1.2.3`), cùng `@emnapi/core@1.10.0` và `@emnapi/runtime@1.10.0`.

### Lượt 6 — Chẩn đoán nguyên nhân gốc

**AI kiểm tra trực tiếp trên máy** (tái hiện lỗi bằng Node.js `22.17.0` / npm `10.9.2` — khớp runner CI):

| Kiểm tra | Kết quả |
| :--- | :--- |
| Tổng package trong `backend/package-lock.json` | 461 (`lockfileVersion: 3`) |
| `node_modules/@emnapi/wasi-threads` | có, version `1.2.1` |
| `node_modules/@emnapi/core` | ❌ thiếu hoàn toàn |
| `node_modules/@emnapi/runtime` | ❌ thiếu hoàn toàn |

**Chuỗi phụ thuộc liên quan** (đều là transitive đi kèm Jest 30, không phải dependency khai báo trực tiếp):
`jest@30` → `unrs-resolver` → `@unrs/resolver-binding-wasm32-wasi@1.12.2` (optional, nền tảng `wasm32`) → khai báo `@emnapi/core@1.10.0`, `@emnapi/runtime@1.10.0`, `@napi-rs/wasm-runtime`; đồng thời `@napi-rs/wasm-runtime@1.2.5` có `peerDependencies` trỏ tới `@emnapi/core` và `@emnapi/runtime`.

**Kết luận nguyên nhân:** Đây **không phải lỗi code backend hay lỗi test**. `backend/package-lock.json` **bị khuyết entry** so với `package.json` — hai entry `@emnapi/core` và `@emnapi/runtime` đã bị bỏ sót khi lock file được ghi lại (nhánh `optional` dành riêng cho nền tảng `wasm32-wasi`). Vì `npm ci` yêu cầu lock khớp **tuyệt đối** với cây phụ thuộc dựng từ `package.json`, npm dừng ngay và thoát `EUSAGE`. Lock bị lệch kể từ commit `c7e7d81`.

**Nhận xét:** AI đối chiếu trực tiếp nội dung lock file bằng script `node` + tái hiện lỗi bằng chính phiên bản Node/npm của runner, thay vì đoán mò → chỉ đúng entry bị thiếu và đúng commit gây lệch.

### Lượt 7 — Sửa lỗi & kiểm chứng

**Phương án được chọn:** sinh lại lock bằng chính npm khớp CI

```bash
cd backend
npm install --package-lock-only
```

**Diff kết quả** (nhỏ, đúng trọng tâm: `+63 / −5` dòng):
- ➕ thêm `node_modules/@emnapi/core@1.11.3` và `node_modules/@emnapi/runtime@1.11.3`;
- 🔁 `node_modules/@emnapi/wasi-threads`: `1.2.1` → `1.2.3`;
- ➕ thêm nhánh nested `@unrs/resolver-binding-wasm32-wasi/node_modules/@emnapi/{core@1.10.0, runtime@1.10.0, wasi-threads@1.2.1}`;
- 🔧 npm loại bỏ vài cờ `"peer": true` thừa (chuẩn hoá nội bộ);
- tổng số package: `461 → 466`.

**Kiểm chứng trên Node.js 22.17.0 / npm 10.9.2 (giống runner):**

| Bước | Kết quả |
| :--- | :---: |
| `npm ci` | ✅ exit 0 (hết lỗi `EUSAGE`) |
| `npm test` | ✅ 4 suites / 6 tests passed |

**Biên tập thủ công:** commit file `backend/package-lock.json` lên nhánh làm việc và push để GitHub Actions chạy lại; xác nhận cache cũ tự vô hiệu vì cache key băm theo `hashFiles('backend/package-lock.json')`, buộc runner chạy lại `npm ci` (cold run) rồi lưu cache mới. Xác nhận CI/CD pipeline chạy thành công, cache HIT cho lần chạy tiếp theo.

---

## 7. CAM KẾT

Nội dung trên được ghi lại trung thực trong quá trình làm việc với AI. Toàn bộ file workflow và lock file đều đã được tôi trực tiếp đọc hiểu, kiểm tra cú pháp/độ đồng bộ và biên tập thủ công trước khi commit.

**Người thực hiện:** Dương Nhật Cường — 23120223
