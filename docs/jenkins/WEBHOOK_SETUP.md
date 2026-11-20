# Tự động build khi push code — ngrok + GitHub webhook

Bật chế độ **push code lên GitHub → Jenkins tự chạy pipeline**, không cần bấm
*Scan Multibranch Pipeline Now* hay *Build Now* nữa.

Có 2 tài liệu liên quan:

- [SETUP_GUIDE.md](SETUP_GUIDE.md) — dựng Jenkins + agent + job (làm trước).
- [DEMO_SCRIPT.md](DEMO_SCRIPT.md) — kịch bản trình bày.

---

## 0. Mô hình hoạt động

```text
   bạn push code
        ↓
   GitHub (repo eshop-sut-seminar)
        ↓  POST https://<domain>.ngrok.app/github-webhook/
   ngrok  (đường hầm ra Internet)
        ↓  tunnel về 127.0.0.1:8080
   Jenkins controller (container Docker)
        ↓  plugin bắt event push → SCMHeadEvent → schedule build
   job con của nhánh  →  Checkout → Environment → Install → Test → Quality Gate
```

Vì sao cần ngrok: Jenkins của ta chạy trong Docker ở `localhost:8080` — GitHub
không gọi được vào máy này. ngrok là "cánh cầu" ra Internet.

---

## 1. Cài và chạy ngrok

### 1.1 Cài ngrok

```bash
brew install ngrok
ngrok version
```

### 1.2 Lấy authtoken (bắt buộc)

1. Mở <https://dashboard.ngrok.com/signup> → đăng ký tài khoản miễn phí
   (dùng Google/GitHub là nhanh nhất).
2. Vào <https://dashboard.ngrok.com/get-started/setup> → copy **Authtoken**.
3. Chạy lệnh sau, thay `<TOKEN>` bằng token vừa copy:

   ```bash
   ngrok config add-authtoken <TOKEN>
   ```

> Token nằm trong file `~/.config/ngrok/ngrok.yml`. Không commit, không chia sẻ.

### 1.3 Mở đường hầm tới Jenkins

```bash
ngrok http 8080
```

Terminal in ra dạng:

```text
tunnel session status
────────────────────────────────────────────
Forwarding  https://abc-def-xyz.ngrok.app -> http://localhost:8080
```

**Ghi lại URL `https://abc-def-xyz.ngrok.app`** — đây là domain dùng cho webhook.

> **Quan trọng:** tài khoản Free của ngrok có **1 development domain cố định**
> (`abc-def-xyz.ngrok.app`), nên URL **không đổi** mỗi lần bật lại ngrok. Rất tiện
> cho demo: webhook cấu hình một lần, dùng được nhiều buổi.
>
> Muốn chắc chắn URL có cố định không: mở <https://dashboard.ngrok.com/endpoints>
> xem "Development Domain" của tài khoản.

### 1.4 Kiểm tra đường hầm đã thông

Mở **tab Terminal khác**, chạy:

```bash
curl -s https://abc-def-xyz.ngrok.app/who-am-i
```

Phải trả về JSON có `"url"` và `"client_id"` → nghĩa là ngrok đã thông tới
Jenkins. Nếu không có JSON này thì kiểm tra Jenkins còn chạy:

```bash
docker compose -f infra/jenkins/compose.yaml ps
```

> **Giữ nguyên terminal chạy `ngrok http 8080` trong suốt buổi demo.** Tắt ngrok
> là webhook delivery sẽ fail.

---

## 2. Trỏ địa chỉ webhook trong Jenkins

Jenkins dùng một "hook URL" để (a) đăng ký webhook và (b) nhận biết webhook nào
là của mình. Mặc định nó lấy từ *Jenkins URL*, nên ta phải chỉ định lại sang
ngrok.

**Manage Jenkins → System** → cuối trang bấm **Advanced...** → cuộn xuống mục
**GitHub Servers** → trong khối **Override Hook URL**:

1. Tick **"Specify another hook URL for GitHub configuration"**.
2. Dán vào ô textbox:

   ```text
   https://abc-def-xyz.ngrok.app/github-webhook/
   ```

3. Bấm **Save**.

> Endpoint cố định là `/github-webhook/` — đó là đường dẫn plugin `github` lắng
> nghe (đọc từ source `GitHubWebHook.URLNAME`).
>
> **Giữ nguyên *Jenkins URL* là `http://localhost:8080`** — nhờ vậy trình duyệt
> vẫn vào Jenkins nhanh, không bị trang cảnh báo của ngrok. Nếu đổi Jenkins URL
> sang ngrok thì mọi link trong UI sẽ đi qua ngrok (chậm, và lần đầu phải bấm
> *Visit Site* qua trang interstitial).

---

## 3. Tạo webhook

Có 2 cách. **Cách A (manual)** đơn giản và không cần token quyền cao — nên làm
cách này cho demo.

### 3A. Tự tạo webhook trên GitHub (manual — khuyến nghị)

1. Vào repo: <https://github.com/SoftwareTesting-Group13/eshop-sut-seminar>
2. **Settings → Webhooks → Add webhook** (nút ở góc phải).
3. Điền form:

| Ô | Điền gì |
|---|---|
| **Payload URL** | `https://abc-def-xyz.ngrok.app/github-webhook/` (khớp đúng ô ở bước 2) |
| **Content type** | `application/json` |
| **Secret** | *(để trống)* — xem ghi chú bên dưới |
| **Which events** | Chọn **Just the push event** |
| **Active** | tick ✓ |

4. Bấm **Add webhook**.
5. Ngay trong danh sách vừa tạo, bấm **Recent Deliveries** → thấy dòng `ping`
   với Response `200 OK` → nghĩa là đường hầm + webhook đã thông.

### 3B. Để Jenkins tự tạo webhook (auto)

Cần token có quyền quản lý webhook — nên bỏ qua nếu demo.

1. Tạo **classic PAT** (GitHub → Settings → Developer settings → Personal access
   tokens → **Tokens (classic)** → Generate) với scope:

   | Scope | Cần cho |
   |---|---|
   | `admin:repo_hook` | tạo webhook trong repo |
   | `admin:org_hook` | repo thuộc organization (`SoftwareTesting-Group13`) |
   | `repo` | thêm nếu repo private |

2. Jenkins → **Manage Jenkins → Credentials → System → Global credentials →
   Add Credentials**: Kind = **Secret text**, Secret = token vừa tạo,
   ID = `github-hook-pat`.

3. Jenkins → **Manage Jenkins → System → GitHub Servers → Add GitHub Server**:
   - Credentials = `github-hook-pat`
   - tick **Manage hooks**
   - Save.

4. Job `eshop-ci` → **Configure** → Branch Sources → GitHub → **bấm Save**.
   Lúc lưu, plugin tự gọi `registerHookFor` → tạo webhook trên GitHub.

5. Kiểm tra repo → Settings → Webhooks → phải thấy webhook do Jenkins tạo.

> **Ghi chú về Secret:** để trống ở GitHub thì Jenkins cũng không verify chữ ký
> (đơn giản, đủ cho demo). Nếu muốn bảo mật: đặt một chuỗi bất kỳ ở GitHub, rồi
> trong Jenkins **Manage Jenkins → System → GitHub Servers → Advanced → Shared
> secrets → Add shared secret** → chọn credential *Secret text* chứa **đúng chuỗi
> đó** + Signature algorithm `HMAC-SHA256`. Hai bên lệch nhau → Jenkins báo
> `Invalid signature` và bỏ qua event.

---

## 4. Về mục "Triggers" bị xám trong trang Configure

Nếu mở job `eshop-ci` → Configure và cuộn xuống mục **Triggers**, sẽ thấy các ô
như *"Build periodically"*, *"GitHub hook trigger for GITScm polling"* đều **bị
xám, không tick được**.

**Đây là bình thường, không phải lỗi.** Lý do:

- Ô *GitHub hook trigger for GITScm polling* là trigger cổ điển của plugin
  `github`, dành cho **Pipeline job thường** (Freestyle/Pipeline 1 job).
- Job **Multibranch** không nhận các trigger dạng này — nên Jenkins vô hiệu hoá
  chúng.
- Với **GitHub Branch Source**, plugin tự xử lý event push: `PushGHEventSubscriber`
  nhận webhook → bắn `SCMHeadEvent` → Jenkins schedule build cho nhánh tương ứng.

→ **Không cần tick ô nào.** Chỉ cần webhook tồn tại và trỏ đúng (bước 2 + 3).

> Nếu sau này muốn Jenkins **quét repo định kỳ** (bỏ qua webhook), vào
> Configure của job `eshop-ci` → mục **Scan Multibranch Pipeline Triggers** →
> tick **"Periodically if not otherwise run"** → Interval `1 minute`. Mục này
> nằm riêng, không bị xám.

---

## 5. Kiểm tra: push là phải tự build

```bash
git commit -m "test: trigger jenkins via webhook"
git push
```

Trong vòng **vài giây → vài chục giây**:

- Jenkins: job con của nhánh có **build mới** tự xuất hiện (không cần bấm gì).
- GitHub: **Settings → Webhooks → Recent Deliveries** → có delivery `push`,
  Response `200 OK`.

Nếu build có mà báo đỏ → đó là pipeline chạy thật (xem
[reports.md](reports.md)), không phải lỗi webhook.

> Nhớ: code phải **push lên GitHub** mới được. Sửa file local chưa push thì
> Jenkins không thấy gì.

---

## 6. Xử lý sự cố

| Hiện tượng | Nguyên nhân | Cách xử lý |
|---|---|---|
| `curl https://<domain>/who-am-i` không trả JSON | Jenkins chưa chạy / sai cổng | `docker compose -f infra/jenkins/compose.yaml ps` → phải `healthy` |
| Không tìm thấy mục **Override Hook URL** | Chưa bấm **Advanced...** ở cuối trang System | Mở Advanced → mục GitHub Servers |
| Delivery trên GitHub báo `200` nhưng Jenkins không build | Webhook trỏ sai path | Payload URL phải có đuôi `/github-webhook/` |
| Delivery báo `404` / `Connection refused` | ngrok đã tắt, hoặc Payload URL sai | Bật lại ngrok, sửa lại Payload URL |
| Delivery báo `403` | Jenkins chặn do payload không hợp lệ / CSRF | Xem Jenkins log có `Invalid signature` không |
| Jenkins báo `Invalid signature` | Secret 2 bên lệch nhau | Bỏ secret ở GitHub, hoặc sửa *Shared secret* trong Jenkins cho khớp |
| Push xong mà không có delivery nào | Webhook bị tắt (`Active` không tick) | Settings → Webhooks → tick **Active** |
| Jenkins tự tạo webhook nhưng trỏ `localhost` | Chưa set Override Hook URL trước khi lưu Branch Source | Set Override Hook URL → lưu lại Branch Source → xoá webhook sai trên GitHub |
| URL ngrok đổi sau khi restart ngrok | Đang dùng URL random thay vì dev domain | Dùng dev domain cố định; cập nhật lại Payload URL + Override Hook URL |
| Trình duyệt mở URL ngrok bị trang "ngrok.com" | Trang interstitial của ngrok | Bấm **Visit Site**; hoặc dùng `http://localhost:8080` để vào Jenkins |

---

## 7. Lưu ý cho buổi demo

- **Trước giờ demo (5 phút):** bật Docker Desktop → `up -d` controller + agent →
  chạy `ngrok http 8080` → kiểm tra Payload URL trong GitHub vẫn khớp dev domain
  → push thử 1 commit → xác nhận Jenkins tự build.
- **Trong lúc demo:** giữ terminal ngrok chạy. Nếu ngrok chết, webhook fail →
  bật lại là được (URL cố định nên không cần sửa gì).
- **Giới hạn gói Free:** 20.000 HTTP request/tháng, 1 GB băng thông, 3 endpoint
  online → demo thoải mái, không lo.
- **Bảo mật:** URL ngrok của bạn là public. Trên đó Jenkins có thể bị dò;
  nên dùng tài khoản Jenkins riêng cho demo, và **xoá webhook** sau khi demo
  nếu không dùng nữa (Settings → Webhooks → Delete).
