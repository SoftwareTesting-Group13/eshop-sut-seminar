# Kịch bản demo Jenkins — EShop Seminar

Mục tiêu buổi demo: **cho thấy Jenkins tự động chạy unit test trong repo và báo
pass/fail**, chứ không phải hướng dẫn viết Jenkinsfile.

Thời lượng dự kiến: **12–15 phút**.

> Trước khi demo, làm hết [SETUP_GUIDE.md](SETUP_GUIDE.md) và build thử **1 lần
> xanh + 1 lần đỏ** để chắc chắn mọi thứ hoạt động.

---

## Chuẩn bị trước giờ demo (5 phút)

1. Bật Docker Desktop, đợi *running*.
2. Mở Terminal tại thư mục gốc repo:

   ```bash
   docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml ps
   ```

   Cả `controller` (healthy) và `agent` (Up) phải ở trạng thái đó. Nếu `Exited`:

   ```bash
   docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml up -d
   ```

3. Mở sẵn 2 tab trình duyệt:
   - <http://localhost:8080> (Jenkins)
   - Repo GitHub, nhánh demo
4. Push code sạch lên nhánh demo **trước khi lên lớp** (nếu chưa):

   ```bash
   git status
   git push
   ```

5. Chọn 1 nhánh demo riêng (ví dụ `demo/jenkins`) để sửa lỗi cho an toàn, không
   đụng nhánh chính.

---

## Mục 1 — Jenkins là cái gì (1 phút)

Mở trang **Nodes**, chỉ vào `eshop-agent` đang **Online**, label `eshop-node`.

> "Jenkins là hệ thống CI/CD. Ở đây nó gồm hai phần: **controller** — chạy
> giao diện và quản lý job; **agent** — container Linux có Node và npm, nơi thực
> sự chạy lệnh build. Controller không tự build, nó đẩy việc sang agent."

Chạy lệnh này để chứng minh agent có công cụ thật:

```bash
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml exec agent node --version
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml exec agent npm --version
```

> "Node 22 nằm sẵn trong image agent, không phụ thuộc Node cài trên máy. Cùng
> phiên bản Node 22 này đang được dùng ở GitHub Actions, nên hai nền tảng chạy
> trên cùng môi trường."

---

## Mục 2 — Pipeline là gì (1 phút)

Mở file `Jenkinsfile` trong repo (tab GitHub hoặc editor), chỉ nhanh 5 stage.

> "File `Jenkinsfile` ở thư mục gốc repo mô tả pipeline: Checkout code, ghi lại
> môi trường, cài dependency, **chạy unit test**, rồi quality gate. Tất cả nằm
> trong cùng một file được commit vào Git — ai cũng review được."

---

## Mục 3 — Chạy pipeline thật (3–4 phút)

1. Vào job `eshop-ci` → **Scan Multibranch Pipeline Now** → mở **Scan Log**.

   > "Scan là Jenkins đọc repo trên GitHub, tìm nhánh nào có `Jenkinsfile` để
   > tạo job con cho nhánh đó. Nhánh không có file thì bỏ qua, không phải lỗi."

2. Mở **job con của nhánh demo** → **Build Now** → **Console Output**.

   > "Bây giờ Jenkins tự checkout code đúng commit vừa push, cài dependency và
   > chạy unit test."

3. **Cố tình để màn hình chạy** và trỏ vào từng stage khi nó xanh dần:

   | Stage | Câu nói |
   |---|---|
   | Checkout | "Lấy code từ GitHub về workspace sạch." |
   | Environment | "Ghi lại commit SHA và phiên bản Node để biết đang build mã nào." |
   | Install | "`npm ci` cài dependency đúng theo `package-lock.json`." |
   | Test | "**Đây là phần chính** — Jest chạy unit test nghiệp vụ coupon." |
   | Quality Gate | "Chặn build nếu test đỏ hoặc coverage dưới 70%." |

4. Chỉ vào dòng kết quả trong log:

   ```text
   Tests:       23 passed, 23 total
   Lines:       100% ( 16/16 )
   VERDICT: ✅ QUALITY GATE PASSED
   ```

5. Mở mục **Artifacts** ở cuối trang build.

   > "Kể cả log từng stage, kết quả test JSON và báo cáo coverage đều được lưu
   > lại thành artifact. Build sau có thể tải về để kiểm chứng."

6. Quay lại **trang job con của nhánh** (không phải trang build) → cuộn xuống
   mục **Stage View**.

   > "Đây là plugin *Pipeline: Stage View*. Mỗi cột là một stage của pipeline,
   > mỗi hàng là một build: ô xanh là pass, ô đỏ gạch chéo là fail. Sau khi
   > sửa lỗi ở Mục 4, quay lại trang này sẽ thấy thêm một hàng đỏ — thấy rõ
   > Jenkins tự phát hiện lỗi."

   *(Nếu chưa cài plugin này thì cài theo
   [SETUP_GUIDE.md mục 1.3](SETUP_GUIDE.md#13-kiểm-tra--cài-plugin) rồi F5 trang.)*

---

## Mục 4 — Jenkins có phát hiện lỗi không (4–5 phút)

Đây là phần quan trọng nhất: **cùng một pipeline, commit có lỗi → build đỏ**.

### 4.1 Tạo lỗi có chủ đích

Trên máy, sửa 1 dòng trong `backend/coupon-discount.js` — đổi công thức giảm
giá phần trăm:

```diff
  function calculateDiscount(totalAmount, coupon) {
    if (coupon.type === 'percent') {
-     return Math.floor(totalAmount * (coupon.discount_value / 100));
+     return Math.floor(totalAmount * (coupon.discount_value / 90));
    }
```

> "Sửa nhỏ thôi: chia 90 thay vì chia 100. Với 10% trên 1.000.000 đồng, kết quả
> chạy ra 111.111 thay vì 100.000."

Commit và push:

```bash
git add backend/coupon-discount.js
git commit -m "demo: introduce intentional coupon calculation bug"
git push
```

### 4.2 Chạy lại pipeline

1. Job con của nhánh demo → **Build Now** (hoặc đợi webhook nếu đã cấu hình).
2. Mở Console Output.

   > "Cùng pipeline đó, thay đổi đúng một dòng code, Jenkins tự chạy lại và báo
   > đỏ."

3. Chỉ ra:
   - Stage **Test** đỏ, các stage sau bị **skipped**.
   - Trong log có tên test fail + expected/actual:

   ```text
   ● calculateDiscount › percent 10% of 1,000,000 → 100000
     Expected: 100000
     Received: 111111
   ```

4. Mở **Artifacts → `backend/test-results/test.log`** và
   `backend/coverage/quality-gate-report.md`.

   > "Report vẫn được sinh ra và lưu lại ngay cả khi build đỏ, nên vẫn truy vết
   > được nguyên nhân."

### 4.3 Sửa lại cho xanh

```bash
git revert --no-edit <commit-hai-lỗi>
git push
```

Build Now lại → 5 stage xanh, `VERDICT: ✅ QUALITY GATE PASSED`.

> "Sửa xong, revert lại, pipeline xanh trở lại — đúng vòng lặp CI: code đổi →
> test tự động chạy → trạng thái rõ ràng."

---

## Mục 5 — Jenkins và GitHub Actions (1–2 phút)

Mở tab GitHub → tab **Actions** → workflow **EShop CI** của cùng commit.

> "Bên GitHub Actions chạy đúng hai lệnh giống hệt: `npm run test:ci:demo` và
> `node .github/scripts/quality-gate.js`. Cùng code, cùng Node 22, cùng bộ test,
> cùng script chặn chất lượng — nên kết quả hai bên là tương đương. Khác biệt
> là chỗ chạy: GitHub Actions dùng runner của GitHub, Jenkins dùng agent Docker
> do nhóm tự quản lý."

So sánh nhanh file `quality-gate-report.md` ở artifact Jenkins với báo cáo trong
PR comment của GitHub Actions — nội dung giống nhau.

---

## Mục 6 — Kết (30 giây)

> "Tóm lại: một file `Jenkinsfile` commit trong repo mô tả pipeline, Jenkins
> chạy nó trên agent Linux, unit test tự động chạy mỗi lần có commit, và kết
> quả pass/fail cùng báo cáo coverage được lưu lại để kiểm chứng."

Kết thúc bằng cách dừng môi trường (giữ nguyên dữ liệu để lần demo sau):

```bash
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml stop
```

> "Không dùng `down -v` — lệnh đó xóa sạch volume Jenkins."

---

## Danh sách kiểm tra trước khi lên lớp

- [ ] Docker Desktop đang running
- [ ] `docker compose ... ps` → controller `healthy`, agent `Up`
- [ ] Trang Nodes → `eshop-agent` **Online**, label `eshop-node`
- [ ] `exec agent node --version` → `v22.x`
- [ ] `infra/jenkins/.env` có `JENKINS_AGENT_SECRET=` (không rỗng), file nằm đúng chỗ
- [ ] Built-In Node → executors = 0
- [ ] Job `eshop-ci` có Branch Source GitHub + credential `github-eshop-pat`
- [ ] Nhánh demo đã push `Jenkinsfile` ở thư mục gốc
- [ ] Đã build thử 1 lần xanh + 1 lần đỏ trước
- [ ] Mở sẵn 2 tab trình duyệt (Jenkins + repo GitHub)
- [ ] Có sẵn 1 nhánh demo riêng để sửa lỗi, không đụng nhánh chính

## Kế hoạch B — nếu có sự cố giữa chừng

| Sự cố | Xử lý nhanh |
|---|---|
| Agent Offline | `docker compose ... logs --tail 20 agent` → thấy lỗi gì |
| Build bị kẹt "Still waiting to schedule task" | Kiểm tra agent Online |
| Code local chưa push | `git push` rồi Build Now lại |
| Mất mạng / GitHub lỗi | Dùng bản build đã có sẵn từ lần chuẩn bị, mở lại log để trình bày |
| Docker chết giữa chừng | `docker compose ... up -d` rồi Build Now lại |
| Hết thời gian demo | Dừng ở Mục 3 (build xanh) + Mục 4.2 (build đỏ), bỏ Mục 5 |
