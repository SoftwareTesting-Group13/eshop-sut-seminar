# Kịch bản thuyết trình và demo EShop CI (7–9 phút)

## Chuẩn bị trước buổi demo

- Review, commit và push cấu hình CI mới cùng công thức coupon đúng trên
  `ncuong`; đợi run 23/23, Gitleaks, Quality Gate và Build xanh rồi merge vào
  `main` sau khi đủ review.
- Tạo branch demo mới từ `main` sau merge; giữ unit test như cũ. Cố ý đổi một
  dòng công thức percent thành `Math.floor(totalAmount * (1 - coupon.discount_value))`,
  commit/push và mở PR demo vào `main`.
- Có `GEMINI_API_KEY` trong Repository Secrets. AI chỉ chạy khi PR có test fail,
  dùng `gemini-3.5-flash-lite` và comment trực tiếp trên PR.

## Lời dẫn và thao tác

| Thời gian | Trên màn hình | Nội dung nói |
| :--- | :--- | :--- |
| 0:00–1:00 | Baseline CI xanh | “Trước khi đổi code, 23 unit test nghiệp vụ coupon pass; Quality Gate và Build xanh.” |
| 1:00–2:00 | Workflow + `test.each` | “Jest kiểm tra công thức percent/fixed, hạn dùng, ngưỡng đơn và lượt dùng. Gate yêu cầu 23/23 pass và line coverage module coupon >70%.” |
| 2:00–3:30 | PR demo vừa tạo → run đỏ | “Công thức percent sai làm 5/23 test fail; các ca fixed và điều kiện áp mã vẫn pass. Coverage coupon 100% nhưng Gate đỏ; Build skip.” |
| 3:30–4:30 | Comment trên PR + artifacts | Mở comment Quality Gate và comment AI; nếu cần, đối chiếu `eshop-coverage/jest-console.log` và `eshop-ci-audit/ci-audit.json`. “AI gợi ý nguyên nhân, dev kiểm chứng bằng test và source.” |
| 4:30–5:30 | `backend/coupon-discount.js` | Sửa dòng percent về `return Math.floor(totalAmount * coupon.discount_value / 100);`. |
| 5:30–7:30 | Terminal + PR run mới | Commit/push cùng branch demo. Kỳ vọng 23/23 test pass, coupon line coverage 100%, Gate và Build xanh; AI không chạy khi test đã pass. |
| 7:30–9:00 | Hai run và audit records | “Hai run gắn với hai commit. Actions giữ log và artifact để đối chiếu; Re-run jobs chạy lại cùng commit. Branch protection đòi Gitleaks, Gate và Build trước khi merge. Workflow chưa deploy.” |

## Lệnh thao tác cho branch demo

```bash
# Chạy sau khi baseline với cấu hình CI mới đã xanh và merge vào main.
git switch main
git pull --ff-only origin main
git switch -c demo/ci-coupon-failure

# Trong backend/coupon-discount.js, tạm đổi dòng percent thành:
# return Math.floor(totalAmount * (1 - coupon.discount_value));
git add backend/coupon-discount.js
git commit -m "demo: reproduce percent coupon bug"
git push -u origin demo/ci-coupon-failure
# Mở PR demo/ci-coupon-failure vào main trên GitHub.

# Sau khi xem CI đỏ và comment AI, sửa lại dòng percent thành:
# return Math.floor(totalAmount * coupon.discount_value / 100);
git add backend/coupon-discount.js
git commit -m "fix: calculate percent coupon discount"
git push
```

Coverage 100% trong demo chỉ là của `backend/coupon-discount.js`, không đại diện
cho toàn backend. Không trình bày run full-suite cũ #18 như run demo 23-test.
Nếu GitHub run mới chưa xong khi hết giờ, chỉ nói những trạng thái đã thực sự
hiện trên Actions; mở sẵn các tab PR, Actions và comment để tiết kiệm thời gian.

Trong phần “Record and Playback”, gọi chính xác là **ghi log/artifact và tái chạy
workflow trên cùng commit**. GitHub Actions không ghi thao tác giao diện để phát
lại như công cụ kiểm thử UI. Còn `test.each` là Data-driven; assertion Jest và
Quality Gate là hai tầng Checkpoints của demo.
