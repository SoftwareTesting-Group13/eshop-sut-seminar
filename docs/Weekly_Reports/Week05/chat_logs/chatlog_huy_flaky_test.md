# Chat Log — Flaky Test do Async Delay (Failure Mode 3)

**Thành viên:** Nguyễn Gia Huy — MSSV: 23120273

**Tuần:** Week 05 — T07: CI/CD & Test-Harness Engineering

**Công cụ AI:** Codex (OpenAI)

**Ngày thực hiện:** 16/10/2026 (giờ Việt Nam)

**File sinh ra:** `backend/demos/flaky-delay.demo.js`, `backend/demos/jest.flaky.config.cjs`, `backend/demos/README.md`; thêm script `test:flaky` trong `backend/package.json`.

## Prompt tiêu biểu

> Bạn là kỹ sư kiểm thử phần mềm. Hãy hỗ trợ tôi hoàn thành nhiệm vụ 2
> trong `Plan/Week5Plan.md`: xây dựng kịch bản kiểm thử có can thiệp độ trễ bất
> đồng bộ bằng sleep để mô phỏng Flaky Test (Failure Mode 3). Chuẩn bị mã nguồn,
> hướng dẫn chạy và minh chứng tuần 5; phần benchmark chi tiết để tuần 6.


## Phản hồi và quyết định triển khai

- Khảo sát cấu hình Jest hiện tại và đối chiếu phạm vi tuần 5 với tuần 6.
- Tạo tác vụ mô phỏng có thời gian hoàn tất 20 ms hoặc 200 ms; ca lỗi chỉ sleep
  100 ms trước assertion. Ca đối chứng chờ đúng Promise bằng await.
- Hỗ trợ profile `fast`, `slow` và `random` qua biến `FLAKY_PROFILE`.
  Random chọn độ trễ cho mỗi lần chạy, giữ nguyên assertion.
- Demo tách khỏi mã API/SQLite, không tạo lỗi giả trong `server.js` và không
  khẳng định API EShop đang có race condition.
- File `.demo.js` dùng cấu hình Jest riêng và lệnh `test:flaky`; không tự nằm
  trong danh sách test mặc định. Tác vụ được chờ dọn trong finally khi assertion fail.
- Hướng dẫn chụp ảnh pass/fail, chuẩn bị log cho AI Triage. Chưa tích hợp CI hay đo benchmark.

## Kiểm chứng do Codex thực hiện

Môi trường chạy: Node.js `v24.22.0`, npm `11.19.1` trên Windows.
Các lượt dưới đây là kiểm tra chức năng, không phải đo flake rate thực nghiệm:

| Profile/lượt | Độ trễ tác vụ | Chờ trong ca sleep | Kết quả ca sleep | Kết quả ca await | Tổng kết / exit code |
| :--- | :--- | :--- | :--- | :--- | :--- |
| fast | 20 ms | 100 ms | pass | pass | 2 passed / 0 |
| slow | 200 ms | 100 ms | fail (`ready=false`) | pass | 1 failed, 1 passed / 1 |
| random, lượt đầu | 200 ms | 100 ms | fail | pass | 1 failed, 1 passed / 1 |
| random, lượt tiếp | 20 ms | 100 ms | pass | pass | 2 passed / 0 |

- Log thực tế của lượt slow do Codex chạy được lưu tại
  `Weekly_Reports/Week05/flaky_slow_huy.txt`: `Expected: true`, `Received: false`.
- `npm --prefix backend test -- --listTests` liệt kê 5 file test backend hiện có,
  không có demo `.demo.js`. Lệnh này chỉ kiểm tra danh sách, không chạy các test
  API hoặc ghi lại database.
- Chưa chạy toàn bộ suite nghiệp vụ để kết luận pipeline xanh; suite coupon
  đang được dùng tái hiện lỗi nghiệp vụ riêng.

## Kiểm chứng thủ công và minh chứng của Nguyễn Gia Huy

Nguyễn Gia Huy đã tự chạy theo `backend/demos/README.md`, gửi ảnh terminal và
lưu hai ảnh trong thư mục screenshots:

- `screenshots/05_flaky_test_fast_pass.png`: tác vụ 20 ms, chờ sleep 100 ms,
  `ready=true`; tổng kết 2 passed.
- `screenshots/05_flaky_test_slow_fail.png`: tác vụ 200 ms, chờ sleep 100 ms,
  `ready=false`; ca sleep có `Expected: true`, `Received: false`, ca await pass;
  tổng kết 1 failed, 1 passed.

Hai ảnh xác nhận đối chứng theo độ trễ do thành viên tự thực hiện. Chưa có ảnh
random do thành viên cung cấp; các lượt random trong bảng trên do Codex chạy.
Tuần 6 mới thực hiện chạy lặp và đo flake rate trên GitHub Actions.

Nguồn kỹ thuật: [Jest configuration](https://jestjs.io/docs/30.0/configuration).
