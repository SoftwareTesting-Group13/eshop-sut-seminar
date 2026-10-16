# Flaky Test — Async Delay (Failure Mode 3)

Demo của Nguyễn Gia Huy, nhiệm vụ 2 trong `Plan/Week5Plan.md`.
Mô phỏng một tác vụ bất đồng bộ hoàn tất sau 20 ms hoặc 200 ms, trong khi
test lỗi chỉ chờ cố định 100 ms bằng `sleep` rồi kiểm tra kết quả.

- Tác vụ hoàn tất trước khi kiểm tra: test pass.
- Tác vụ chưa hoàn tất khi kiểm tra: test fail, `Expected: true`, `Received: false`.
- Ca đối chứng dùng `await job.completed` chờ đúng tác vụ nên pass với cả hai độ trễ.

Đây là kịch bản có chủ đích để minh họa lỗi đồng bộ hóa trong test harness,
không phải khẳng định đã phát hiện race condition trong API EShop.
Demo không nạp `server.js`, không truy cập SQLite và không cần LLM/API key.

## Chạy từ thư mục gốc repo (PowerShell)

Backend cần có dependency (`npm ci` trong `backend` nếu chưa cài).

1. Độ trễ ngắn — dự kiến **2 passed**, exit code **0**:

   ```powershell
   $env:FLAKY_PROFILE = 'fast'
   npm --prefix backend run test:flaky
   $LASTEXITCODE
   ```

2. Độ trễ dài — dự kiến **1 failed, 1 passed**, exit code **1**:

   ```powershell
   $env:FLAKY_PROFILE = 'slow'
   npm --prefix backend run test:flaky
   $LASTEXITCODE
   ```

   Dòng `[FM3][sleep]` cần có `workDelayMs=200 waitMs=100 ready=false`.
   Dòng `[FM3][await]` cần có `ready=true`. Test sleep thất bại là kết quả cần
   tái hiện; nếu lỗi thiếu module hoặc cấu hình thì xử lý môi trường trước.

3. Mô phỏng chập chờn — chạy lại cùng lệnh với profile ngẫu nhiên:

   ```powershell
   $env:FLAKY_PROFILE = 'random'
   npm --prefix backend run test:flaky
   $LASTEXITCODE
   ```

   Mỗi lần chạy chọn ngẫu nhiên 20 ms hoặc 200 ms; cùng test sleep có thể pass
   hoặc fail. Không bảo đảm các lần liền nhau sẽ xen kẽ kết quả.
   Các lượt `fast`/`slow` là đối chứng có kiểm soát, không dùng chúng để tính
   flake rate thực nghiệm. Chưa đo benchmark hay chạy lặp 10 lần trên CI ở tuần 5.

Xóa cấu hình profile khỏi terminal khi xong:

```powershell
Remove-Item Env:FLAKY_PROFILE -ErrorAction SilentlyContinue
```

`npm test` hiện tại không tự tìm file `.demo.js`; `test:flaky` dùng cấu hình
Jest riêng để chỉ chạy demo. Phần chờ trong `finally` dọn tác vụ sau ca lỗi,
tránh để timer ảnh hưởng ca tiếp theo. `--runInBand` không sửa được việc chờ
sai tác vụ bên trong một test; ca đối chứng giải quyết bằng `await` đúng Promise.

## Minh chứng tuần 5

Lưu ảnh terminal, gồm câu lệnh, dòng `[FM3]` và tổng kết Jest, vào
`Weekly_Reports/Week05/screenshots/`:

- `05_flaky_test_fast_pass.png`: profile fast, cả hai ca pass.
- `05_flaky_test_slow_fail.png`: profile slow, sleep fail và await pass.
- `05_flaky_test_random.png` (tùy chọn): các lượt random cùng lệnh có kết quả khác nhau.

Có thể lưu thêm log bằng `*>` rồi mở lại để đọc/chụp:

```powershell
$env:FLAKY_PROFILE = 'slow'
npm --prefix backend run test:flaky *> Weekly_Reports/Week05/flaky_slow_huy.txt
$flakyExitCode = $LASTEXITCODE
Get-Content -LiteralPath Weekly_Reports/Week05/flaky_slow_huy.txt
Write-Output "Flaky demo exit code: $flakyExitCode"
```

Log này có thể làm đầu vào cho `ai_triage.py --log-file ... --dry-run`.
Lưu log chạy thật; không chỉnh tay giá trị pass/fail hoặc suy ra tỷ lệ từ một lượt chạy.

Tham khảo: [Jest configuration](https://jestjs.io/docs/30.0/configuration).
