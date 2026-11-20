# Jenkins cho EShop Seminar — tổng quan

Tài liệu bộ này hướng dẫn dựng Jenkins từ đầu và demo pipeline tích hợp
unit test trước lớp.

| File | Dùng khi nào |
|---|---|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Dựng môi trường từ số 0: controller → agent → job → build đầu tiên. Làm theo **trước demo**. |
| [DEMO_SCRIPT.md](DEMO_SCRIPT.md) | Kịch bản trình bày trước lớp: thứ tự mở màn hình, câu nói, kịch bản build đỏ. |
| [reports.md](reports.md) | Đọc kết quả: ở đâu xem test pass/fail, coverage, artifact; và bảng xử lý lỗi. |

## Mô hình

```text
   GitHub (repo eshop-sut-seminar)
        │  webhook/scan hoặc Build Now
        ▼
   Jenkins controller (Docker, :8080)          ← giao diện, job, log
        │  WebSocket
        ▼
   Jenkins agent (Docker, Node 22 + npm)       ← nơi chạy lệnh npm
        │
        ▼
   backend/: npm ci → jest (unit test coupon) → quality gate
```

- **Controller** chỉ quản lý job + giao diện. Không chạy lệnh build.
- **Agent** là container Linux có Node 22, npm, git — pipeline gọi `npm` trực tiếp ở đây.
- Pipeline **5 stage**: `Checkout → Environment → Install → Test → Quality Gate`.
- Job là **Multibranch Pipeline**: mỗi nhánh có `Jenkinsfile` ở thư mục gốc sẽ
  sinh 1 job con.

## File trong repo liên quan

```text
Jenkinsfile                          Pipeline (5 stage)
infra/jenkins/compose.yaml           Jenkins controller
infra/jenkins/compose.agent.yaml     Agent + volumes
infra/jenkins/agent.Dockerfile       Image agent: Node 22 + npm + git
infra/jenkins/.env.example          Template cho .env (port + agent secret)
docs/jenkins/                        Tài liệu này
```

## So sánh với GitHub Actions

Cùng một bộ test và cùng một script gate, nên kết quả hai nền tảng là tương đương:

| | GitHub Actions (`.github/workflows/eshop-ci.yml`) | Jenkins (`Jenkinsfile`) |
|---|---|---|
| Cài dependency | `npm ci` | `npm ci` |
| Unit test | `npm run test:ci:demo` | `npm run test:ci:demo` |
| Chặn chất lượng | `node .github/scripts/quality-gate.js` | `npm run quality-gate` |
| Node | 22 (setup-node) | 22 (image agent) |
| Báo cáo | Artifact `backend/coverage` | Artifact `backend/coverage` + log từng stage |

Khác biệt duy nhất: GitHub Actions chạy trên runner của GitHub, Jenkins chạy trên
agent Docker của nhóm — đó là điểm cần nói khi demo.
