# Hướng dẫn cài đặt & khởi chạy EShop trên macOS

Hệ thống EShop gồm 4 phân hệ: **Backend API**, **Frontend Web**, **Frontend Admin**
và **Frontend Mobile**. Muốn test đủ thì chạy Backend + tối thiểu 1 frontend.

Tài liệu này viết riêng cho **macOS** (Apple Silicon hoặc Intel), dùng **Terminal**
(`zsh`). Windows/Linux dùng cùng lệnh, chỉ khác cách cài Node.

---

## 0. Tóm tắt nhanh

| Phân hệ | Thư mục | Cổng | Lệnh khởi chạy | Địa chỉ |
|---|---|---|---|---|
| Backend API | `backend/` | 3000 | `npm start` | <http://localhost:3000/api/products> |
| Frontend Web | `frontend-web/` | 5173 | `npm run dev` | <http://localhost:5173> |
| Frontend Admin | `frontend-admin/` | 5174 | `npm run dev` | <http://localhost:5174> |
| Frontend Mobile | `frontend-mobile/` | — | `npm start` | Expo Go (QR) |

Tài khoản seed sẵn trong DB:

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | `admin@eshop.com` | `Admin123!` |
| User | `test@eshop.com` | `Test1234!` |

> ⚠️ Tài liệu cũ ghi mật khẩu admin là `admin123` — **sai**. Mật khẩu thật nằm
> trong `backend/database.js` và là `Admin123!` (hoa `A`, có dấu `!` cuối).
> Nhập sai **2 lần** là tài khoản bị khoá 3 phút (xem [mục 9](#9-lưu-ý-cho-tester)).

---

## 1. Cài đặt môi trường

### 1.1 Cài Node.js — **bắt buộc đúng version**

Frontend dùng Vite 8, yêu cầu Node **`^20.19.0` hoặc `>=22.12.0`**. Node 18 sẽ
lỗi khi chạy `npm run dev`. Khuyến nghị **Node 22** (đúng version CI đang dùng
cho GitHub Actions và Jenkins).

**Cách A — Homebrew (khuyến nghị):**

```bash
brew install node@22
```

Thêm vào `~/.zshrc` để `node` mặc định là bản 22:

```bash
echo 'export PATH="/usr/local/opt/node@22/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

> Intel Mac dùng đường dẫn `/usr/local/...`, Apple Silicon dùng `/opt/homebrew/...`.
> Thêm cả hai dòng là an toàn — cái không tồn tại sẽ bị bỏ qua.

**Cách B — nvm (nhiều version, linh hoạt hơn):**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc
nvm install 22
nvm use 22
nvm alias default 22
```

### 1.2 Kiểm tra đã cài đúng chưa

```bash
node --version
npm --version
```

Kết quả mong đợi: `v22.x.y` và `npm 10.x`. Nếu `node --version` ra `v18` hoặc
`v26` và bạn muốn theo đúng CI thì chuyển lại về 22 (`nvm use 22` hoặc sửa
`~/.zshrc`).

### 1.3 (Tùy chọn) Cài Expo Go để chạy app trên điện thoại

- **iPhone**: App Store → tìm **Expo Go** → cài.
- **Android**: Google Play → tìm **Expo Go** → cài.
- Hoặc không cần điện thoại: chạy web bằng lệnh `npx expo start --web` (mục 6.4).

---

## 2. Lấy mã nguồn repo

```bash
cd ~/Documents/Code        # hoặc thư mục bạn lưu repo
git clone https://github.com/SoftwareTesting-Group13/eshop-sut-seminar.git
cd eshop-sut-seminar
```

Nếu đã có repo:

```bash
cd <đường-dẫn-tới>/eshop-sut-seminar
git pull
```

Kiểm tra đã đúng thư mục gốc (phải thấy `backend`, `frontend-web`, `frontend-admin`,
`frontend-mobile`, `Jenkinsfile`):

```bash
ls
```

---

## 3. Khởi chạy Backend API

Backend cấp dữ liệu và xử lý logic cho toàn hệ thống. **Luôn chạy backend trước**,
vì 3 frontend đều gọi vào `http://localhost:3000/api`.

### 3.1 Mở Terminal tại thư mục gốc

Terminal (mở bằng `Cmd + Space` → gõ "Terminal" → Enter).

### 3.2 Vào thư mục `backend` và cài dependency

```bash
cd backend
npm ci
```

> Dùng `npm ci` (không phải `npm install`) vì repo có sẵn `package-lock.json`:
> `npm ci` cài đúng phiên bản đã khóa, nhanh hơn và tái lập được.

Lần đầu mất khoảng 30–60 giây (có `sqlite3` là native module, cần build hoặc tải
binary sẵn). Các dòng `npm warn deprecated` là **cảnh báo, không phải lỗi**.

### 3.3 (Không bắt buộc) Tạo lại database + dữ liệu mẫu

```bash
node database.js
```

Lệnh này **xoá toàn bộ bảng cũ và tạo lại** dữ liệu mẫu (5 sản phẩm, 2 user,
4 coupon). Chạy lần đầu, hoặc khi cần dữ liệu sạch.

> Lưu ý: `backend/server.js` cũng `require("./database")`, mà `database.js` tự
> `initDatabase()` khi được nạp — nên **khởi động lại server cũng tự reset
> database**. Đừng ngạc nhiên khi dữ liệu bạn tạo biến mất sau khi restart
> backend.

### 3.4 Chạy server

```bash
npm start
```

Terminal sẽ in:

```text
Connected to database
Database initialized and seeded (Phase 2).
Server is running on http://localhost:3000
```

**Để nguyên cửa sổ Terminal này chạy** — đóng là backend tắt.

### 3.5 Kiểm tra backend đã sống

Mở **tab Terminal thứ 2** (Cmd + T) và gọi thử API:

```bash
curl -s http://localhost:3000/api/products | head -c 300
```

Phải thấy JSON danh sách sản phẩm (`iPhone 15 Pro Max`, `MacBook Pro M3`...).
Thay bằng cách xem trên trình duyệt: mở <http://localhost:3000/api/products>.

Nếu ra `[]` hoặc lỗi → xem [mục 8](#8-xử-lý-sự-cố).

---

## 4. Khởi chạy Frontend Web

Giao diện cửa hàng cho người dùng.

### 4.1 Mở tab Terminal mới

```bash
cd frontend-web
npm ci
```

### 4.2 Chạy dev server

```bash
npm run dev
```

Terminal in địa chỉ, ví dụ:

```text
VITE v8.0.12  ready in 412 ms
➜  Local:   http://localhost:5173/
```

Mở <http://localhost:5173> trên trình duyệt.

> **Về cổng 5173:** Vite tự chọn cổng trống. Nếu 5173 đang bị chiếm, web sẽ nhảy
> sang 5175, 5176... và trang báo sai cổng — hãy đọc đúng dòng `Local:` trong
> terminal. Nếu web nhảy sang **5174** thì xung đột với Admin (xem mục 5.3).

### 4.3 Đăng nhập thử

Bấm vào biểu tượng tài khoản góc trên → đăng nhập bằng `test@eshop.com` /
`Test1234!`.

---

## 5. Khởi chạy Frontend Admin

Giao diện quản trị (quản lý sản phẩm, đơn hàng, coupon).

### 5.1 Mở tab Terminal mới

```bash
cd frontend-admin
npm ci
```

### 5.2 Chạy dev server

```bash
npm run dev
```

Terminal in `http://localhost:5174/`. Mở trình duyệt.

### 5.3 Cổng 5174 là `strictPort`

`frontend-admin/vite.config.js` đặt `strictPort: true` → **đổi cổng 5174 thì
Vite báo lỗi và không chạy**, thay vì tự nhảy cổng khác.

Nếu báo `Port 5174 is already in use`:

```bash
lsof -ti :5174 | xargs kill -9
```

> Thứ tự an toàn: chạy **Frontend Web trước** (để nó giữ 5173), rồi chạy Admin
> (lấy 5174). Không chạy ngược lại.

### 5.4 Đăng nhập Admin

- **Email**: `admin@eshop.com`
- **Mật khẩu**: `Admin123!`

> Nhập sai 2 lần → tài khoản bị khoá 3 phút, xem [mục 9](#9-lưu-ý-cho-tester).

---

## 6. Khởi chạy Frontend Mobile (Expo)

Giao diện app trên điện thoại. Backend (mục 3) phải đang chạy.

### 6.1 ⚠️ Sửa IP API trước — bắt buộc

`frontend-mobile/App.js` **dòng 16** đang hardcode IP của máy thành viên khác:

```js
const API_URL = "http://192.168.10.13:3000/api"; // IP LAN để chạy được trên iOS/Android
```

Máy bạn sẽ không gọi được API nếu không sửa. Lấy IP LAN của Mac:

```bash
ipconfig getifaddr en0
```

Nếu không ra (không dùng Wi-Fi):

```bash
ipconfig getifaddr en1
```

Sửa dòng 16 thành IP của bạn, ví dụ:

```js
const API_URL = "http://10.0.150.254:3000/api";
```

> Muốn test trên Simulator thì dùng `http://localhost:3000/api` cũng được.

### 6.2 Mở tab Terminal mới

```bash
cd frontend-mobile
npm ci
```

### 6.3 Chạy Metro bundler

```bash
npm start
```

(Tương đương `npx expo start`.) Terminal hiện mã QR.

### 6.4 Chọn cách mở app

| Cách | Thao tác |
|---|---|
| **Điện thoại thật** | Cài Expo Go → mở app → bấm **Scan QR Code** → quét mã trong Terminal. Điện thoại và Mac **phải cùng Wi-Fi**. |
| **iOS Simulator** | Trong Terminal Metro bấm phím `i` (cần cài Xcode từ App Store → Simulator có sẵn iPhone). |
| **Android Emulator** | Trong Terminal Metro bấm phím `a` (cần Android Studio + AVD). |
| **Không cần điện thoại** | `npx expo start --web` → mở địa chỉ web Expo in ra. |

### 6.5 Nếu điện thoại không quét được QR

Mạng công ty/school hay chặn mạng ngang hàng. Dùng tunnel:

```bash
npx expo start --tunnel
```

Lệnh này cần `ngrok` (Expo tự cài lần đầu, cần mạng). Mã QR mới sẽ dùng đường
đi qua internet.

---

## 7. Bảng cổng & cách dừng server

| Ứng dụng | Cổng | Dừng bằng |
|---|---|---|
| Backend API | 3000 | Terminal của backend → `Ctrl + C` |
| Frontend Web | 5173 | Terminal của web → `Ctrl + C` |
| Frontend Admin | 5174 | Terminal của admin → `Ctrl + C` |
| Metro (mobile) | 8081 | Terminal của mobile → `Ctrl + C` |

Tắt tất cả nhanh:

```bash
lsof -ti :3000,:5173,:5174,:8081 | xargs kill -9
```

Xem cổng nào đang bị chiếm:

```bash
lsof -i :3000 -i :5173 -i :5174 -i :8081
```

---

## 8. Xử lý sự cố

| Hiện tượng | Nguyên nhân | Xử lý |
|---|---|---|
| `npm run dev` báo lỗi version của Node | Node < 20.19 hoặc < 22.12 (Vite 8) | `nvm use 22` hoặc cài Node 22 (mục 1.1) |
| `command not found: node` | Node chưa vào PATH | Thêm dòng `export PATH=...` vào `~/.zshrc` rồi `source ~/.zshrc` |
| `EADDRINUSE: address already in use :::3000` | Backend đã chạy ở cửa sổ khác | `lsof -ti :3000 \| xargs kill -9` |
| `Port 5174 is already in use` (Admin) | strictPort, không tự đổi cổng | `lsof -ti :5174 \| xargs kill -9` |
| Web mở cổng 5175/5176 | 5173 bị chiếm, Vite tự nhảy cổng | Đọc dòng `Local:` trong terminal; giải phóng cổng 5173 |
| Frontend hiện trang trắng, console báo `ERR_CONNECTION_REFUSED` | Backend chưa chạy | Mở <http://localhost:3000/api/products> để kiểm tra backend |
| Mobile báo lỗi mạng / dữ liệu không tải | IP trong `App.js` dòng 16 sai | Sửa theo mục 6.1, hoặc dùng `--tunnel` |
| `npm ci` lỗi khi build `sqlite3` | Thiếu tool build native | `xcode-select --install` rồi `npm ci` lại |
| Đăng nhập sai 2 lần → báo tài khoản bị khoá | Chính sách khóa tài khoản của SUT | Đợi 3 phút, hoặc `node database.js` để reset (mục 9) |
| Đăng nhập admin báo "Invalid email or password" | Sai mật khẩu | Mật khẩu là `Admin123!` (hoa `A`, có `!`), không phải `admin123` |
| Dữ liệu tự mất sau khi restart backend | `server.js` nạp `database.js` → tự seed lại | Đây là hành vi của SUT; muốn giữ dữ liệu thì đừng restart backend giữa lúc test |

---

## 9. Lưu ý cho tester

Hệ thống này là **System Under Test** — được thiết kế **cố ý** chứa nhiều lỗi
để tìm và ghi nhận. Trước khi test, lưu ý vài hành vi của SUT:

### 9.1 Khóa tài khoản sau 2 lần sai

`POST /api/login` tăng `login_attempts` **2 mỗi lần sai** và khoá tài khoản 3
phút khi tổng ≥ 3. Nghĩa là:

- Sai 1 lần → chưa khoá.
- Sai 2 lần → bị khoá 3 phút (`locked_until`).

Muốn test lại ngay: `cd backend && node database.js` (reset sạch DB).

### 9.2 Restart backend là mất dữ liệu

`database.js` gọi `initDatabase()` ngay khi được nạp, mà `server.js` require nó.
→ Mỗi lần khởi động lại backend là DB bị **drop và seed lại**.

### 9.3 Không dùng file `run_servers.sh`

File `run_servers.sh` ở thư mục gốc đang hardcode đường dẫn của máy thành viên
khác (`/Users/hanhtran/Downloads/EShop/...`) → chạy trên máy bạn sẽ báo lỗi.
Hãy mở từng terminal theo mục 3–6.

### 9.4 Danh sách lỗi "cố ý có" để hướng tìm

| Nhóm lỗi | Gợi ý nơi kiểm tra |
|---|---|
| UI/UX | Trang Home, ProductDetail, Cart, Checkout, Profile, ForgotPassword |
| Form validation | Form đăng ký, đăng nhập, thanh toán — nhập rỗng / sai định dạng |
| SQL injection | Các endpoint `GET /api/products?search=...` |
| XSS | Ô tìm kiếm, trường nhập mã coupon, phần hiển thị tên/địa chỉ |
| Phân quyền | Đăng nhập bằng user (`test@eshop.com`) rồi thử vào trang Admin hoặc gọi API admin |
| Logic nghiệp vụ | Giỏ hàng (số lượng, tồn kho), thanh toán, coupon (`SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`) |

Tài liệu đối chiếu: **`api_specification.md`** (đặc tả API) ở thư mục gốc repo.

### 9.5 Ghi lại bằng chứng

Mỗi lỗi nên ghi: **Steps to Reproduce** (bấm gì, nhập gì, kết quả mong đợi vs
thực tế), **mức độ nghiêm trọng**, và **ảnh chụp màn hình / console log**.

---

## 10. Phụ lục

### 10.1 Chạy nhanh cả 3 web bằng nhiều tab Terminal

```bash
# Tab 1 — backend
cd backend && npm start

# Tab 2 — web
cd frontend-web && npm run dev

# Tab 3 — admin
cd frontend-admin && npm run dev

# Tab 4 — mobile (chỉ khi cần)
cd frontend-mobile && npm start
```

### 10.2 Reset sạch để test lại từ đầu

```bash
cd backend
node database.js     # xoá & seed lại database
```

### 10.3 Xoá hẳn dependency để cài lại

```bash
cd backend
rm -rf node_modules package-lock.json   # bỏ dòng xoá package-lock.json nếu muốn giữ lockfile
npm ci
```

### 10.4 Thông tin phiên bản dùng trong tài liệu

| Thành phần | Phiên bản |
|---|---|
| Node.js | 22.x (yêu cầu: `^20.19.0 \|\| >=22.12.0`) |
| npm | 10.x |
| Backend | Express 5, sqlite3 6, jsonwebtoken 9 |
| Frontend Web / Admin | React 19, Vite 8, Tailwind 3, Axios 1 |
| Frontend Mobile | Expo SDK 54, React Native 0.81 |
| Test | Jest 30 + Supertest 7 (chạy bằng `npm run test:ci` trong `backend/`) |

### 10.5 Liên quan

- Jenkins pipeline cho repo này: [`docs/jenkins/`](docs/jenkins/README.md)
- Đặc tả API: [`api_specification.md`](api_specification.md)
- Hướng dẫn người dùng: [`User_Guide.md`](User_Guide.md)
