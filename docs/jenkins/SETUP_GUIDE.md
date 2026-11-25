# Dựng Jenkins từ đầu — EShop Seminar

Hướng dẫn này đưa từ máy trắng (chỉ có Docker + repo) đến lúc có build đỏ/xanh
chạy thật. Thực hiện **trước buổi demo**, làm hết một lần thì các lần sau chỉ
mất vài phút.

> Mọi lệnh trong tài liệu chạy từ **thư mục gốc repo** (`eshop-sut-seminar`),
> dùng Terminal trên macOS (`zsh`) hoặc PowerShell (`\`-style lệnh giống hệt).

---

## Phần 0 — Chuẩn bị

### 0.1 Yêu cầu

| Thứ | Cần | Ghi chú |
|---|---|---|
| Docker Desktop | Đang chạy | Engine phải là Linux container (mặc định trên Mac/Windows) |
| RAM cho Docker | ≥ 4 GB | Jenkins + agent + build Node |
| Cổng 8080 | Trống | Đổi được qua `infra/jenkins/.env` |
| GitHub token | Có PAT đọc repo | Dùng cho Multibranch scan (bước 4.1) |
| Repo đã push | Có `Jenkinsfile` ở root | Jenkins lấy code từ GitHub, không đọc máy local |

### 0.2 Kiểm tra Docker

```bash
docker version
docker compose version
```

Cả hai lệnh phải in ra version, không báo lỗi `Cannot connect to the Docker
daemon`. Nếu báo lỗi → mở Docker Desktop và đợi icon báo *running*.

### 0.3 Commit + push trước khi dựng job

Jenkins **luôn** lấy code từ GitHub. File `Jenkinsfile` nằm trong máy local thì
Jenkins không thấy, scan sẽ báo `Jenkinsfile not found`.

```bash
git add Jenkinsfile infra/jenkins docs/jenkins
git commit -m "ci: add Jenkins pipeline and environment"
git push
```

Kiểm tra lại tên nhánh đang dùng (ghi ra để đối chiếu SHA lúc demo):

```bash
git branch --show-current
git log -1 --format='%H %s'
```

---

## Phần 1 — Jenkins controller

### 1.1 Khởi động

```bash
docker compose -f infra/jenkins/compose.yaml up -d
docker compose -f infra/jenkins/compose.yaml ps
```

Lần đầu sẽ tải image `jenkins/jenkins:2.580.1-jdk21` (~250 MB, mất vài phút).
Cột `STATUS` phải hiện `healthy` sau khoảng 1–2 phút.

Mở trình duyệt: <http://localhost:8080>

> **Đổi cổng (nếu 8080 bị chiếm):**
> ```bash
> cp infra/jenkins/.env.example infra/jenkins/.env   # chỉ lần đầu
> # sửa JENKINS_PORT=8081 trong file .env
> docker compose -f infra/jenkins/compose.yaml up -d
> ```
> Nhớ dùng đúng cổng đó ở mọi bước sau.

### 1.2 Hoàn tất khởi tạo lần đầu

Nếu trang hiện **Unlock Jenkins**, lấy mật khẩu khởi tạo:

```bash
docker compose -f infra/jenkins/compose.yaml exec controller cat /var/jenkins_home/secrets/initialAdminPassword
```

Dán vào ô *Unlock Jenkins*, bấm **Continue**, rồi:

1. **Install suggested plugins** (chọn sẵn) → đợi cài xong.
2. **Create an admin user** → đặt tên + mật khẩu (giữ lại, tránh lộ trong slide).
3. **Jenkins URL** → để nguyên `http://localhost:8080/` → **Save and Finish**.

Nếu trang hiện **Sign in** (đã có tài khoản từ lần dựng trước): đăng nhập bình
thường, **không** xóa volume để chạy lại wizard.

### 1.3 Kiểm tra & cài plugin

#### Bắt buộc — 3 plugin

Cả 3 đều đã nằm trong bộ "suggested plugins" nên wizard đã cài sẵn.

| Plugin (ID) | Vai trò |
|---|---|
| `workflow-aggregator` (Pipeline) | Đọc và chạy `Jenkinsfile` |
| `git` | Checkout code từ GitHub |
| `github-branch-source` | Multibranch: quét nhánh, tạo job con |

Kiểm tra: **Manage Jenkins → Plugins → Installed plugins**, tìm đúng 3 ID trên.
Thiếu thì vào **Available plugins**, gõ ID, tick, **Install**, và tick *"Restart
Jenkins when installation is complete and no jobs are running"* nếu được hỏi.

#### Nên có — 2 plugin cho giao diện đẹp khi demo

| Plugin (ID) | Cho ra cái gì |
|---|---|
| `pipeline-stage-view` (**Pipeline: Stage View**) | Bảng lưới **stage × build**: mỗi cột là 1 stage, mỗi hàng là 1 build, ô xanh = pass, ô đỏ gạch chéo = fail, kèm thời gian trung bình mỗi stage. **Đây là hình đẹp nhất để chụp slide.** |
| `pipeline-graph-view` (**Pipeline Graph View**) | Menu **Stages**: sơ đồ flowchart từng stage của 1 build (xanh lá = pass, đỏ = fail, vàng = đang chạy) |

Cài cả hai:

1. **Manage Jenkins → Plugins → Available plugins**.
2. Gõ lần lượt `Pipeline: Stage View` rồi `Pipeline Graph View` — **đánh dấu đúng
   tên plugin**, không gõ ID (dễ dính plugin khác trùng chữ).
3. Bấm **Install** cho từng plugin, đợi xong.
4. Nếu được hỏi restart → tick *"Restart Jenkins when installation is complete
   and no jobs are running"* → **Restart**.

Sau khi cài:

- **Stage View** xuất hiện ngay trên trang **job con của nhánh** (ví dụ
  `eshop-ci → main`), là một mảng bảng ngay dưới phần thông tin job. Cần có
  ít nhất 1 build đã chạy thì mới có dữ liệu.
- **Stages** (Graph View) xuất hiện trong menu bên trái của job con.

> Bản `pipeline-graph-view` mới nhất yêu cầu Jenkins 2.589, còn controller của
> ta là 2.580.1. Jenkins sẽ tự chọn bản cũ hơn tương thích khi cài — nếu nó
> báo *"requires Jenkins 2.589"*, bấm **Install anyway** là được, hoặc bỏ qua
> plugin này (Stage View mới là thứ quan trọng cho demo).

> **Không cần** plugin JUnit, Coverage, NodeJS, Docker Pipeline. Repo chưa có
> `jest-junit`/`cobertura` nên pipeline đọc kết quả bằng log + artifact
> (xem [reports.md](reports.md)). Cài thêm cũng không hại nhưng tốn thời gian.

Ghi lại phiên bản plugin để đưa vào slide (không chứa secret):

**Manage Jenkins → Script Console**, chạy:

```groovy
Jenkins.instance.pluginManager.plugins
    .sort { it.shortName }
    .each { println "${it.shortName}:${it.version}" }
```

### 1.4 (Nên làm) Built-In Node = 0 executor

**Manage Jenkins → Nodes → Built-In Node → Configure → Number of executors = 0
→ Save**. Nhờ vậy mọi build buộc phải chạy trên agent riêng `eshop-node` — đúng
như kịch bản demo.

### 1.5 Dừng / mở lại controller

```bash
docker compose -f infra/jenkins/compose.yaml stop
docker compose -f infra/jenkins/compose.yaml up -d
```

`stop`/`up` giữ nguyên volume `jenkins-home` (tài khoản, job, plugin).
**Không** dùng `down -v` — lệnh đó xóa sạch dữ liệu Jenkins.

---

## Phần 2 — Jenkins agent

### 2.1 Tạo node `eshop-agent` trên giao diện Jenkins

#### Bước A — Mở trang Nodes

1. Trên thanh menu trên cùng bấm **Manage Jenkins** (bên trái).
2. Trong menu bên trái bấm **Nodes**.
3. Bấm nút **+ Add Node** (góc trên bên phải). Nếu không thấy nút này mà chỉ
   thấy **New Node**, dùng **New Node** — cùng một chức năng.

#### Bước B — Điền tên và chọn loại node

Trang **Create Node** hiện ra:

| Ô | Điền gì |
|---|---|
| **Name** | `eshop-agent` |

Bấm nút màu xanh **Create** → trang **Create Node** hiện 3 lựa chọn:

- **Permanent Agent** ← **chọn cái này**
- Temporary Agent
- Node Group

Bấm **Permanent Agent** → sang trang **Configure**.

#### Bước C — Điền thông tin node

Trang **Configure** có nhiều mục. Chỉ cần sửa **5 ô** bên dưới, phần còn lại để
mặc định:

| Mục / Ô | Giá trị | Ghi chú |
|---|---|---|
| **Description** | *(để trống)* | Không bắt buộc |
| **Number of executors** | `1` | Xoá số `2` mặc định, gõ `1` |
| **Labels** | `eshop-node` | Ô này nằm ngay dưới *Number of executors*; dùng để pipeline chọn đúng agent |
| **Usage** | Only build jobs with label expressions matching this node | Chọn từ dropdown |
| **Launch method** | **Launch agent by connecting it to the controller** | Chọn radio này |
| **Remote root directory** | `/home/jenkins/agent` | Nằm ở mục **Node Properties** → bấm **Configure** → ô **Remote root directory**. Phải khớp với `--workDir` trong compose. |

> **Remote root directory** nằm sâu trong trang (mục *Node Properties*, có nút
> *Configure*). Nếu không thấy, cuộn xuống cuối trang hoặc bấm *Advanced* để mở
> thêm tuỳ chọn.

Bấm **Save** ở cuối trang (hoặc **Save & Continue** nếu muốn quay lại).

#### Bước D — Lấy secret của node

1. Sau khi Save, Jenkins đưa bạn về trang **Agent eshop-agent**. Node đang
   **Offline** (chưa có container nào kết nối) — **đây là bình thường**.
2. Trang này có khối **Run from agent command line: (Unix)** — một ô code đen
   chứa 2 dòng:

   ```text
   curl -sO http://localhost:8080/jnlpJars/agent.jar
   java -jar agent.jar -url http://localhost:8080/ -secret <MÃ_64_KÝ_TỰ_Ở_ĐÂY> -name "eshop-agent" -webSocket -workDir "/home/jenkins/agent"
   ```

3. **Mã secret là chuỗi ký tự hex ngay sau chữ `-secret`** — 64 ký tự gồm
   `0-9` và `a-f`, không có dấu gạch, không có khoảng trắng. Ví dụ:

   ```text
   -secret d6c2f922ac94b776def5eec21f4227e682487324114e5b5f9279703c1be3f556
                └────────────── đây là secret, copy riêng đoạn này ──────────────┘
   ```

4. Copy đúng đoạn 64 ký tự đó (bấm nút **copy** ở góc trên của ô code cũng được).

> ⚠️ **Đừng chạy 2 dòng lệnh trong ô code đó.** Lệnh đó chạy agent trên máy
> bạn, còn ta dùng **container Docker** (`infra/jenkins/compose.agent.yaml`).
> Compose tự truyền secret qua biến môi trường `JENKINS_SECRET`.

### 2.2 Lưu secret vào file `.env`

File `.env` phải nằm đúng chỗ `infra/jenkins/.env` — Compose chỉ nạp `.env` từ
thư mục project, mà thư mục project = thư mục chứa file compose đầu tiên
(`infra/jenkins/`).

**Cách 1 — dùng nano (khuyến nghị, không lỡ tay):**

```bash
cd /Users/cuong/Documents/Code/eshop-sut

# Chỉ copy mẫu khi file chưa tồn tại (không ghi đè .env đang có)
[ -f infra/jenkins/.env ] || cp infra/jenkins/.env.example infra/jenkins/.env

nano infra/jenkins/.env
```

Trong nano: xoá hết nội dung cũ, gõ đúng 2 dòng (thay `<mã-secret>` bằng
64 ký tự đã copy ở bước 2.1-D):

```dotenv
JENKINS_PORT=8080
JENKINS_AGENT_SECRET=d6c2f922ac94b776def5eec21f4227e682487324114e5b5f9279703c1be3f556
```

Lưu & thoát nano: `Ctrl + O` → `Enter` → `Ctrl + X`.

**Cách 2 — dùng TextEdit (nếu ngại nano):**

```bash
open -a TextEdit infra/jenkins/.env
```

Sửa trong TextEdit → **File → Format → Make Plain Text** (để không lỡ tay lưu
thành RTF) → dán 2 dòng ở trên → `Cmd + S`.

**Kiểm tra file đã đúng (không in ra secret):**

```bash
grep -c 'JENKINS_AGENT_SECRET=.' infra/jenkins/.env
```

Kết quả phải là `1` (tức là biến có giá trị, không bị để trống).

Lưu ý:

- `JENKINS_AGENT_SECRET` là **secret kết nối agent**, không phải mật khẩu
  Jenkins và không phải GitHub token.
- `.env` đã nằm trong `.gitignore` của `infra/jenkins/` → không bị commit.
- Không chụp màn hình có giá trị secret, không paste vào slide.

### 2.3 Build image agent và khởi động

Image agent dựng từ `infra/jenkins/agent.Dockerfile`: Jenkins inbound-agent +
Node 22 (copy binary từ `node:22-bookworm`) + git + python3/make/g++ (để build
native dependency `sqlite3`).

```bash
cd /Users/cuong/Documents/Code/eshop-sut
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml up -d --build agent
```

**Đọc output:**

| Dòng in ra | Ý nghĩa |
|---|---|
| `Building agent` … `DONE` | Đang build image (lần đầu mất vài phút: tải `node:22-bookworm`, `inbound-agent`, cài apt packages) |
| `Container eshop-ci-agent-1 Started` | Xong — agent đã chạy |
| `Set JENKINS_AGENT_SECRET in infra/jenkins/.env` | File `.env` sai chỗ hoặc biến để trống → quay lại bước 2.2 |
| `port is already allocated` | Cổng 8080 bị chiếm (controller chưa dừng) → `docker compose -f infra/jenkins/compose.yaml stop` rồi chạy lại |

Xem trạng thái + log agent:

```bash
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml ps
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml logs --tail 30 agent
```

| Lệnh | Kết quả đúng |
|---|---|
| `ps` | Cột `STATUS` của `eshop-ci-agent-1` là `Up` |
| `logs agent` | Có dòng kiểu `Connected to controller` hoặc `Running java -jar agent.jar` |

> Nếu `logs` báo `Failed to add WebSocket connection` / `Connection refused` liên
> tục → controller chưa healthy. Kiểm tra
> `docker compose -f infra/jenkins/compose.yaml ps` (phải là `healthy`) rồi
> `docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml restart agent`.

### 2.4 Xác nhận agent đã sẵn sàng

#### (a) Trên giao diện

F5 lại trang **http://localhost:8080/manage/computer/eshop-agent/** (hoặc
**Manage Jenkins → Nodes → eshop-agent**).

- Trước khi agent kết nối: cột **Build Executor Status** ghi `eshop-agent (offline)`.
- Sau khi kết nối: node chuyển sang **Online** và có 1 executor trống.

Trạng thái Docker `Up` **chưa đủ** — phải là **Online** trên giao diện.

#### (b) Bằng lệnh, chạy trên chính agent

```bash
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml exec agent node --version
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml exec agent npm --version
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml exec agent git --version
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml exec agent npm config get cache
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml exec agent sh -c "touch /home/jenkins/agent/.w /home/jenkins/.npm/.w && rm /home/jenkins/agent/.w /home/jenkins/.npm/.w && echo write-ok"
```

| Lệnh | Kết quả đúng | Nếu sai thì |
|---|---|---|
| `node --version` | `v22.x.y` (bắt buộc — pipeline kiểm tra major `v22`) | Image cũ còn Node 24 → `up -d --build agent` |
| `npm --version` | `10.x` | Cùng lý do trên |
| `git --version` | `git version 2.x` | Image build lỗi → xem `logs agent` |
| `npm config get cache` | `/home/jenkins/.npm` | Thiếu volume npm-cache → kiểm tra `compose.agent.yaml` |
| lệnh write test | `write-ok` (agent ghi được workspace + npm cache) | Sai quyền → xem `logs agent` |

Cả 5 lệnh đều phải chạy được **không lỗi** trước khi sang Phần 3.

### 2.5 Dừng / mở lại toàn bộ môi trường

```bash
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml stop
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml up -d
```

Giữ nguyên 3 volume: `eshop-ci_jenkins-home`, `eshop-ci_agent-work`,
`eshop-ci_npm-cache`.

---

## Phần 3 — Credential GitHub

### 3.1 Tạo PAT trên GitHub

Settings (cá nhân) → **Developer settings → Personal access tokens → Fine-grained
tokens → Generate new token**:

| Trường | Giá trị |
|---|---|
| Resource owner | `SoftwareTesting-Group13` |
| Repository access | Only select repositories → `eshop-sut-seminar` |
| Permissions | Contents: **Read**, Metadata: **Read** |

Không cần quyền ghi status/commit (Jenkins demo không gửi status về GitHub).
Token chỉ hiện 1 lần → copy ngay.

### 3.2 Thêm vào Jenkins

**Manage Jenkins → Credentials → System → Global credentials → Add Credentials**:

| Trường | Giá trị |
|---|---|
| Kind | Username with password |
| Scope | Global |
| Username | Tên đăng nhập GitHub sở hữu token |
| Password | PAT vừa tạo (không phải mật khẩu GitHub) |
| ID | `github-eshop-pat` |
| Description | GitHub access for EShop CI |

> Bỏ qua phần này cũng được — Jenkins sẽ scan anonymous, nhưng GitHub giới hạn
> rate cho anonymous nên scan có thể bị "ngủ" vài phút hoặc báo lỗi. Nên làm
> cho chắc.

---

## Phần 4 — Tạo job Multibranch Pipeline

Nếu job `eshop-ci` đã tồn tại → **Configure** và sửa, đừng tạo job trùng.

### 4.1 Tạo job

1. Dashboard → **New Item** → tên `eshop-ci` → **Multibranch Pipeline** → OK.
2. **Branch Sources → Add source → GitHub**.
3. Chọn credential `github-eshop-pat` ngay tại Branch Source (bỏ trống sẽ quét anonymous).
4. **Repository** → HTTPS URL:
   `https://github.com/SoftwareTesting-Group13/eshop-sut-seminar.git`
   (nếu giao diện tách ô: Owner = `SoftwareTesting-Group13`,
   Repository = `eshop-sut-seminar`).
5. **Behaviours** → giữ **Discover branches**. Không đặt bộ lọc loại nhánh demo.
6. **Build Configuration** → *by Jenkinsfile*, **Script Path = `Jenkinsfile`**
   (không phải `backend/Jenkinsfile`).
7. **Save**.

> **Tuỳ chọn — muốn push code là Jenkins tự build?** Xem
> [WEBHOOK_SETUP.md](WEBHOOK_SETUP.md) (ngrok + GitHub webhook). Lưu ý: mục
> *Triggers* trong trang Configure của job Multibranch **bị xám** là bình thường,
> không cần tick ô *GitHub hook trigger for GITScm polling*. Không làm thì vẫn
> demo bình thường bằng *Scan Multibranch Pipeline Now*.

### 4.2 Scan

Trong job `eshop-ci` → **Scan Multibranch Pipeline Now** → mở **Scan Log**.

- Nhánh demo (nhánh đã push `Jenkinsfile`) phải xuất hiện → Jenkins tạo job con
  tên theo nhánh.
- Nhánh không có `Jenkinsfile` sẽ báo `Jenkinsfile not found` — **bình thường**,
  không phải lỗi.
- Scan có thể tự tạo 1 build đầu tiên. Build Now tay sẽ chắc chắn hơn.

---

## Phần 5 — Build đầu tiên

1. Mở **job con của nhánh demo** → **Build Now**.
2. **Console Output** — phải thấy 5 stage theo thứ tự:

   ```text
   Checkout → Environment → Install → Test → Quality Gate
   ```

3. Kết quả mong đợi trên commit sạch:

   | Stage | Kết quả |
   |---|---|
   | Checkout | xanh |
   | Environment | xanh, in `node: v22.x` + commit SHA |
   | Install | xanh, `npm ci` xong |
   | Test | xanh, `Tests: 23 passed, 23 total`, coverage 100% |
   | Quality Gate | xanh, `VERDICT: ✅ QUALITY GATE PASSED` |

4. Cuối trang build có mục **Artifacts** — 8 file:

   ```text
   backend/test-results/environment.log
   backend/test-results/install.log
   backend/test-results/test.log
   backend/test-results/quality-gate.log
   backend/coverage/jest-results.json
   backend/coverage/coverage-summary.json
   backend/coverage/lcov.info
   backend/coverage/quality-gate-report.md
   ```

5. **Đối chiếu SHA**: mở `environment.log`, so `commit:` với `git log -1` trên máy.
   Nếu lệch → Jenkins build nhầm commit, check lại branch/remote.

Sau khi build đầu tiên xanh, xem [DEMO_SCRIPT.md](DEMO_SCRIPT.md) để chuẩn bị
kịch bản trình bày.

---

## Phần 6 — Xử lý sự cố

| Hiện tượng | Nguyên nhân | Xử lý |
|---|---|---|
| `docker compose` báo `Cannot connect to the Docker daemon` | Docker Desktop chưa chạy | Mở Docker Desktop, đợi *running* |
| `Set JENKINS_AGENT_SECRET in infra/jenkins/.env` | Thiếu `.env` / biến rỗng / sai thư mục | Đặt file ở `infra/jenkins/.env`, điền giá trị |
| `unknown client name` / `authorization` | Secret trong `.env` không thuộc node `eshop-agent` (copy nhầm node khác, hoặc node đã bị xoá/tạo lại) | Mở trang node `eshop-agent` → copy lại đúng 64 ký tự sau `-secret` → sửa `infra/jenkins/.env` → `restart agent` |
| Agent cứ restart liên tục trong `logs agent` | Secret sai hoặc controller chưa healthy | `restart controller` trước, đợi `healthy`, rồi `restart agent` |
| Không tìm thấy nút **+ Add Node** | Tài khoản đang dùng thiếu quyền quản trị | Đăng nhập bằng tài khoản admin đã tạo ở bước 1.2 |
| Agent Online nhưng `node --version` ra `v24` | Đang chạy image cũ (build trước khi đổi Dockerfile) | `up -d --build agent` để build lại image |
| Agent Offline mà container `Up` | Agent chưa kết nối được controller | Xem `logs agent`; xem mục "nếu agent bị redirect localhost" bên dưới |
| `Connection refused` trong log agent | Controller chưa healthy, hoặc agent dùng `localhost` | URL trong compose phải là `http://controller:8080/`; chờ controller `healthy` |
| Job báo `Still waiting to schedule task` | Agent Offline / sai label / đã hết executor | Kiểm tra label `eshop-node`, agent Online, Built-In Node executors = 0 |
| Build báo `Jenkinsfile not found` | Commit chưa push, hoặc Script Path sai | `git push`; kiểm tra Script Path = `Jenkinsfile` |
| Stage Environment fail vì Node sai major | Image agent cũ còn Node 24 | `up -d --build agent` để build lại image |
| Stage Install fail | `package.json` và `package-lock.json` lệch nhau | Commit **cả hai** file khi đổi dependency |
| Stage Test đỏ | Unit test fail | Đây là hành vi đúng — xem `test.log` trong artifact |

### Nếu agent bị redirect về `localhost`

Triệu chứng: log agent báo `Failed to connect to http://localhost:8080/...` hoặc
`IOException` khi nối lại controller — vì Jenkins gửi URL dựa trên *Jenkins URL*
(`http://localhost:8080/`) mà trong container agent `localhost` là chính nó.

Cách sửa (chỉ khi gặp lỗi này):

1. **Manage Jenkins → System → Jenkins Location → Jenkins URL** → đổi thành
   `http://controller:8080/` → Save.
2. Trên máy host, cho `controller` trỏ về localhost để giao diện vẫn mở được:

   ```bash
   echo "127.0.0.1 controller" | sudo tee -a /etc/hosts
   ```

3. `docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml restart agent`
   → agent kết nối lại được.

Nếu làm được các bước trên thì mở giao diện bằng <http://localhost:8080> vẫn OK.

---

## Phần 7 — Dọn dẹp / dựng lại từ đầu

```bash
# Dừng, giữ nguyên dữ liệu (an toàn, dùng sau demo)
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml stop

# XÓA TOÀN BỘ (chỉ khi muốn dựng lại từ số 0 — mất tài khoản, job, plugin)
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml down -v
```

Sau `down -v` phải làm lại từ **Phần 1.2** (wizard, plugin, tài khoản) và
**Phần 2.1** (node + secret).

### Xóa riêng workspace agent (muốn build sạch mà giữ Jenkins)

```bash
docker volume rm eshop-ci_agent-work
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml up -d
```

---

## Phụ lục — Thông tin môi trường

| Thành phần | Giá trị |
|---|---|
| Controller image | `jenkins/jenkins:2.580.1-jdk21` (JDK 21) |
| Agent image | `jenkins/inbound-agent:3391.va_37fa_a_305d6d-1-jdk21` + Node 22 |
| Compose project | `eshop-ci` |
| Controller URL | <http://localhost:8080> |
| Agent node name | `eshop-agent` |
| Agent label | `eshop-node` |
| Agent executors | 1 |
| Job | `eshop-ci` (Multibranch) |
| Repo | `https://github.com/SoftwareTesting-Group13/eshop-sut-seminar.git` |
| Script Path | `Jenkinsfile` |
| Node / npm trên agent | 22.x / 10.x |
| Volumes | `eshop-ci_jenkins-home`, `eshop-ci_agent-work`, `eshop-ci_npm-cache` |

Lệnh xem nhanh trạng thái toàn bộ:

```bash
docker compose -f infra/jenkins/compose.yaml -f infra/jenkins/compose.agent.yaml ps
docker volume ls | grep eshop-ci
```
