# EShop CI — Quality Gate và Branch Protection

Workflow hiện hành: [eshop-ci.yml](../.github/workflows/eshop-ci.yml).
Kịch bản thao tác: [ci-devops-demo.md](ci-devops-demo.md).

## Điều kiện pass

| Gate | Điều kiện | Nguồn dữ liệu |
| :--- | :--- | :--- |
| Test | **23/23 unit test nghiệp vụ coupon phải pass** | `backend/coverage/jest-results.json` |
| Coverage | **Line coverage > 70% của `backend/coupon-discount.js`** | `backend/coverage/coverage-summary.json` |
| LCOV | Báo cáo tồn tại, có ít nhất một record `SF:` | `backend/coverage/lcov.info` |

Statements, branches và functions vẫn xuất trong báo cáo để theo dõi, nhưng
không phải ngưỡng chặn merge. Coverage của CI demo chỉ đo module coupon,
**không phải độ phủ toàn backend**.

Các unit test của demo kiểm tra công thức, làm tròn, mã thiếu/không hoạt động,
hạn dùng, ngưỡng đơn, giới hạn lượt dùng, `discount_amount` và `final_amount`.
Chúng kiểm tra **nghiệp vụ hiện có trong backend**. FR-09 trong README còn yêu
cầu JWT cho việc áp coupon, nhưng route `POST /api/apply-coupon` hiện chưa xác
thực JWT và vẫn cho phép nhánh không có `user_id`; đó là khoảng trống chức năng
cần xử lý riêng, không được tính là đã phủ bởi 100% coverage của module.

Muốn chạy toàn bộ backend test suite riêng:

```bash
cd backend
NODE_ENV=test npm run test:ci
```

Lần kiểm tra full suite ngày 22/10/2026 đạt 58/58 test pass và 78.81% line
coverage toàn backend. Số này là bằng chứng cho full suite, không phải số trong
Quality Gate của PR demo.

## Luồng CI và artifact

```text
Push / PR → Gitleaks → 23 unit test nghiệp vụ coupon → Quality Gate → Build
                         └─ PR test fail → Gemini AI Triage → comment trên PR
Pipeline Summary → eshop-ci-audit (luôn chạy)
```

Gitleaks phát hiện secret thì các job sau bị skip. Jest luôn upload
`eshop-coverage` khi test đã chạy, kể cả khi test fail; Quality Gate upload
`eshop-lcov-report`. AI chỉ chạy ở run PR có Backend Test fail và có
`GEMINI_API_KEY`; kết quả vừa comment trên PR vừa lưu ở `eshop-ai-triage`.
Build pass thì upload `eshop-build`. Pipeline Summary ghi trạng thái các job
trong `eshop-ci-audit`.

Actions lưu log và artifact cho mỗi run. Có thể dùng **Re-run jobs** để chạy lại
cùng commit và đối chiếu `run_id`/`attempt` trong `eshop-ci-audit`. Đây là tái
chạy pipeline, không phải ghi rồi phát lại thao tác giao diện người dùng.

Kiểm tra local đúng phạm vi CI demo:

```bash
cd backend
npm run test:ci:demo
npm run quality-gate
```

Ngưỡng >70% được [quality-gate.js](../.github/scripts/quality-gate.js) thực thi;
workflow đặt `COVERAGE_THRESHOLD=70`. Ví dụ 70.00% sẽ fail, 70.01% sẽ pass.

## Branch Protection trên `main`

Required status checks hiện hành:

1. `Gitleaks Secret Scan`
2. `Quality Gate (Tests & Coverage > 70%)`
3. `Build (web, admin, backend package)`

Branch protection còn yêu cầu branch cập nhật với `main` và **một review
approve**. Vì thế check xanh là điều kiện cần để merge; PR vẫn có thể chờ
review. Script [configure-branch-protection.sh](../.github/scripts/configure-branch-protection.sh)
cho xem payload bằng `--dry-run` và cần quyền admin để áp dụng.

Các bản mô tả ngưỡng cũ được giữ trong chat log lịch sử ở
[Week06](../Weekly_Reports/Week06/chat_logs/chatlog_ncuong_video_storyboard_ci.md);
quyết định hiện hành của nhóm là **line coverage >70% cho module coupon trong
CI demo**.
