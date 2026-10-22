# AI Log Triage — Nguyễn Gia Huy, Tuần 5

`ai_triage.py` đọc log kiểm thử và (khi có) source liên quan, gọi Gemini API
để tạo báo cáo tiếng Việt ngắn gọn: **Tóm tắt → Vị trí và cơ chế → Bằng chứng →
Cách sửa và kiểm chứng**. Prompt dùng chung cho lỗi unit test, không gắn với
công thức hay lỗi coupon cụ thể. Source được đánh số dòng để AI có thể chỉ chính
xác vị trí lỗi; khi thiếu bằng chứng, báo cáo phải nói rõ chưa xác định được dòng.
Chỉ dùng thư viện chuẩn Python, không cần cài SDK.

## Chạy từ thư mục gốc repo (PowerShell)

1. Dùng log có sẵn hoặc thu log coupon:

   ```powershell
   [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
   Push-Location backend
   try {
       npm test -- tests/coupon.test.js -t "Failure Mode 2" *> ../Weekly_Reports/Week05/coupon_failure_mode2_huy.txt
   } finally {
       Pop-Location
   }
   ```

   Backend cần được cài dependency bằng `npm ci` trước khi chạy test.
   Nhóm test này tái hiện lỗi coupon percent nên có thể trả exit code 1.
   `database.js` xóa và seed lại các bảng khi được nạp; chỉ chạy với dữ liệu kiểm thử.

2. Kiểm tra đầu vào bằng dry run, không cần API key:

   ```powershell
   python .github/scripts/ai_triage.py --log-file Weekly_Reports/Week05/coupon_failure_mode2_huy.txt --source-file backend/coupon-discount.js --dry-run
   ```

   Phần `Log sẽ gửi` cần có tên test và các dòng `Expected` / `Received`.
   Dry run hiển thị prompt, log và source có số dòng; chưa có kết quả phân tích của LLM.

3. Để gọi API thật, tạo key tại [Google AI Studio](https://aistudio.google.com/api-keys)
   và nhập vào biến môi trường của terminal hiện tại:

   ```powershell
   $triageSecret = Read-Host "Nhap Gemini API key" -AsSecureString
   $env:GEMINI_API_KEY = [System.Net.NetworkCredential]::new('', $triageSecret).Password
   $triageSecret.Dispose()
   Remove-Variable triageSecret
   ```

   Script chỉ đọc `GEMINI_API_KEY`, không tự nạp `.env`. Không lưu key vào mã nguồn,
   báo cáo hoặc ảnh minh chứng. Có thể nhập lại để ghi đè nếu dán sai key.
   Chọn dự án Free Tier và kiểm tra quota được cấp trước khi gọi API.

4. Phân tích thật và lưu Markdown:

   ```powershell
   python .github/scripts/ai_triage.py --log-file Weekly_Reports/Week05/coupon_failure_mode2_huy.txt --source-file backend/coupon-discount.js --output Weekly_Reports/Week05/triage_coupon.md
   $triageExitCode = $LASTEXITCODE
   Write-Output "AI triage exit code: $triageExitCode"
   ```

   Khi thành công, báo cáo xuất ra terminal và file Markdown. Đối chiếu phân tích
   với log, dữ liệu coupon và công thức trong source tại commit đang xét trước khi kết luận.
   Một lần test thất bại chưa đủ để xác định flaky.

Hoặc đọc log từ stdin:

```powershell
$OutputEncoding = [System.Text.UTF8Encoding]::new()
Get-Content -Raw -LiteralPath Weekly_Reports/Week05/coupon_failure_mode2_huy.txt | python .github/scripts/ai_triage.py --dry-run
```

Bỏ `--dry-run` để gọi API thật qua stdin. Mỗi lần gọi thật sử dụng quota của dự án.
Đọc trực tiếp bằng `--log-file` hỗ trợ UTF-8 và UTF-16 có BOM.

## Kiểm tra offline

```powershell
python -B -m unittest discover -s .github/scripts/tests -v
```

Các test dùng phản hồi API giả lập, không gửi log hay source ra mạng.

## Cấu hình và minh chứng

Model mặc định là `gemini-3.5-flash-lite`; đổi bằng `--model TEN_MODEL` hoặc
biến `GEMINI_MODEL`. Script lấy tối đa 100 dòng cuối và 20.000 ký tự cuối của log.
`--source-file` là tùy chọn và có thể lặp lại cho tối đa ba file đã chọn rõ ràng;
mỗi file được đánh số dòng và giới hạn ở 300 dòng, 20.000 ký tự.
`--test-command` cho AI biết lệnh test thật để đề xuất chạy lại,
không tự đoán lệnh. Trong CI hiện tại, workflow gửi `backend/coupon-discount.js`
và lệnh test coupon vì đây là phạm vi suite đang chạy. Khi mở rộng suite sang
feature khác, cấu hình các source và lệnh test tương ứng trong workflow; prompt và
script không cần thay theo từng kiểu bug. Nếu không có source, báo cáo chỉ có
thể chỉ vị trí nghi ngờ từ log.
Trong GitHub Actions, prompt cũng có permalink tới file ở commit được kiểm thử
để AI có thể gắn link trực tiếp đến dòng liên quan trong comment PR.
Khi chạy thủ công với log cũ, dùng source từ đúng commit tạo ra log đó.
Đổi số dòng bằng `--max-lines`, timeout mặc định 60 giây bằng `--timeout`.

Exit code: **0** khi thành công hoặc dry run, **1** khi có lỗi xử lý, **2** khi
tham số không hợp lệ. Lỗi API, phản hồi bị chặn hoặc bị cắt sẽ không tạo báo cáo
mới; file cũ có thể vẫn còn. Script không tự retry.
Với HTTP 429, kiểm tra quota/rate limit trong AI Studio trước khi chạy lại.

Nếu có biến `GITHUB_STEP_SUMMARY`, phân tích thật được nối vào file summary.
Workflow gọi script trong job `AI Failure Triage` chỉ khi PR có Test thất bại
và repo có `GEMINI_API_KEY` trong GitHub Actions Secrets. Kết quả được comment
trực tiếp trên PR (cập nhật cùng một comment qua các run) và lưu ở artifact
`eshop-ai-triage/ai-triage.md`. Push thông thường không gọi AI. Không có key
thì log Jest và Quality Gate vẫn hoạt động bình thường. Job AI không chặn
Quality Gate hoặc Build.

Lưu ảnh trong `Weekly_Reports/Week05/screenshots/`:

- `04_ai_triage_offline_tests.png`: lệnh kiểm tra và kết quả `6 tests ... OK`.
- `04_ai_triage_input_log.png`: giá trị lỗi coupon và tổng kết Jest.
- `04_ai_triage_dry_run.png`, `04_ai_triage_dry_run_02.png`: lệnh dry run, prompt và log đầu vào.
- `04_ai_triage_result.png`: bổ sung khi có phân tích LLM thật để đối chiếu.

Script đã chuyển từ OpenAI sang Gemini sau lỗi hết credits. Báo cáo AI là gợi ý
để dev đối chiếu lại với source và test trước khi sửa.

Tham khảo: [Gemini API](https://ai.google.dev/api/generate-content),
[API keys](https://ai.google.dev/gemini-api/docs/api-key),
[Pricing](https://ai.google.dev/gemini-api/docs/pricing).
