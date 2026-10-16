# Chat Log — AI Log Triage & Cây giả thuyết chẩn đoán lỗi

- **Thành viên:** Nguyễn Gia Huy — MSSV: 23120273.
- **Tuần:** Week 05 — Chủ đề Seminar T07: CI/CD & Test-Harness Engineering.
- **Hệ thống kiểm thử (SUT):** EShop System (Node.js/Express, SQLite, Jest).
- **Thời điểm:** 16/10/2026, múi giờ Asia/Saigon.
- **Công cụ:** Codex (OpenAI).
- **Nhánh làm việc:** `test/giahuy`.
- **Phạm vi:** Nhiệm vụ 1 trong `Plan/Week5Plan.md`; chưa thực hiện Flaky Test.
- **Phiên bản hiện tại:** Gemini API, model mặc định `gemini-3.5-flash-lite`.
  Các phần mô tả OpenAI bên dưới ghi lại giai đoạn triển khai ban đầu.
- Đây là bản ghi prompt tiêu biểu và tóm tắt phản hồi, không phải bản xuất nguyên văn toàn bộ hội thoại.

## Prompt tiêu biểu — Xây dựng script AI Log Triage

**Prompt biên soạn lại từ yêu cầu và lựa chọn trong hội thoại:**

> Bạn là một kỹ sư kiểm thử phần mềm có kinh nghiệm xây dựng công cụ AI hỗ trợ phân tích log lỗi trong CI/CD.
>
> Tôi là Nguyễn Gia Huy, phụ trách AI Log Triage của nhóm 13. Hãy đọc nhiệm vụ trong `Plan/Week5Plan.md` và khảo sát repo EShop để hỗ trợ hoàn thiện nhiệm vụ 1: viết script Python `.github/scripts/ai_triage.py`.
>
> Script cần đọc log kiểm thử thất bại từ stdin hoặc file, kết nối OpenAI API để phân tích nguyên nhân và xuất Cây giả thuyết (Hypothesis Tree) ra terminal hoặc Markdown. Cây giả thuyết cần thể hiện hiện tượng, nguyên nhân khả dĩ, bằng chứng trong log, cách kiểm chứng và hướng khắc phục.
>
> Đọc API key từ biến môi trường; bổ sung hướng dẫn chạy và kiểm tra offline trước khi gọi API thật. Ghi lại quá trình sử dụng AI vào hồ sơ tuần 5. Thực hiện từng nhiệm vụ một, để phần Flaky Test và việc đẩy nhánh lên GitHub sau.

Đoạn trên tổng hợp ngữ cảnh đã trao đổi thành một prompt đầy đủ để trình bày
trong báo cáo; không phải lời nhắn nguyên văn đã gửi trước khi viết script.
Các lời nhắn thực tế được giữ ở mục dưới.

## Prompt và lựa chọn thực tế

Nguyễn Gia Huy:

> hãy đọc nhiệm vụ của tôi (Nguyễn Gia Huy) trong folder Plan/Week5Plan.md

Codex đọc kế hoạch và tóm tắt hai nhiệm vụ: script AI Log Triage và mô phỏng Flaky Test.
Sau đó người dùng yêu cầu tạo nhánh `test/giahuy` và để việc đẩy nhánh lên GitHub sau.

Nguyễn Gia Huy:

> từ từ để sau giờ chúng ta hoàn thiện từng yêu cầu 1 thôi

Codex:

> Bạn muốn script ai_triage.py dùng API nào để phân tích log? Không cần gửi API key trong chat; mình sẽ cấu hình đọc key từ biến môi trường.

Nguyễn Gia Huy chọn:

> OpenAI

## Phản hồi và mã do AI hỗ trợ tạo

- Đọc kế hoạch tuần 5 và mẫu script trong `Proposal/Demo_Plan.md`.
- Tạo `.github/scripts/ai_triage.py` dùng thư viện chuẩn Python và OpenAI Responses API.
- Đọc log từ file/stdin, hỗ trợ UTF-8 và UTF-16 có BOM, bỏ màu ANSI,
  lấy tối đa 100 dòng cuối và 20.000 ký tự cuối.
- Đọc key từ `OPENAI_API_KEY` hoặc `LLM_API_KEY`; model mặc định `gpt-4o-mini`
  theo mẫu đề cương, có thể đổi qua tham số hoặc biến môi trường.
- Yêu cầu LLM xuất cây giả thuyết, bằng chứng, cách kiểm chứng và hướng khắc phục;
  không kết luận flaky chỉ dựa vào một lần thất bại.
- Xuất terminal, Markdown và hỗ trợ nối kết quả vào `GITHUB_STEP_SUMMARY` nếu có.
- Có dry run để xem prompt/log trước khi gọi API; không giả lập kết quả chẩn đoán AI.
- Soạn `.github/scripts/README.md` và bộ kiểm tra offline.

Tài liệu được đối chiếu: [OpenAI — Text generation](https://developers.openai.com/api/docs/guides/text).

## Kiểm chứng do Codex thực hiện

- Môi trường: Python 3.12.10 trên Windows; phải chạy ngoài sandbox vì alias Python
  trong WindowsApps không truy cập được từ sandbox.
- Lần kiểm tra đầu: 4/6 test đạt; 2 test phát hiện stdout có thêm một dòng trống
  so với file Markdown. Sửa bằng `print(report, end="")`.
- Kết quả sau sửa: `python -B -m unittest discover -s .github/scripts/tests -v`
  đạt **6/6 test**, exit code 0. Bao phủ đọc file/stdin, UTF-16, bỏ ANSI,
  che key hiện dùng, ghi Markdown/summary, dry run, thiếu key/log rỗng,
  HTTP 429, lỗi mạng/timeout và phản hồi API không hợp lệ/chưa hoàn tất/rỗng.
- Ở lượt kiểm tra offline ban đầu, Codex chưa gọi API thật vì môi trường chưa có
  `OPENAI_API_KEY` hoặc `LLM_API_KEY`. Lượt gọi của người thực hiện được cập nhật bên dưới.
- Chưa thu ảnh minh chứng, chưa xác nhận kiểm chứng thủ công của Nguyễn Gia Huy,
  chưa commit/push và chưa đánh dấu nhiệm vụ hoàn thành trong kế hoạch.

## Phần cần người thực hiện đối chiếu

1. Đọc mã, tự chạy script với API key trong môi trường cá nhân.
2. Dùng log Jest thực tế, kiểm tra cây giả thuyết có bám bằng chứng hay không.
3. Lưu Markdown và ảnh terminal thực tế, bổ sung đánh giá của người thực hiện.

## Cập nhật — Kiểm chứng thực tế và lỗi OpenAI HTTP 429

- Nguyễn Gia Huy đã chạy nhóm Jest `Failure Mode 2` và tạo log
  `Weekly_Reports/Week05/coupon_failure_mode2_huy.txt`. Codex đọc file và xác nhận
  3 failed, 18 skipped; `discount_amount = -9000000`, `final_amount = 10000000`.
- Người thực hiện gửi đầu ra dry run; log được đọc và giữ các bằng chứng trên,
  còn lỗi mã hóa trong một số tên test tiếng Việt.
- Sau khi cấu hình key, người thực hiện cung cấp ảnh terminal báo
  `OpenAI HTTP 429`, `AI triage exit code: 1`. Chưa có phân tích AI thành công;
  thông báo cũ chưa đủ phân biệt quota/billing với rate limit.
- Codex bổ sung đọc `error.code` và `error.type` từ phản hồi HTTP, ưu tiên mã lỗi
  cụ thể, gợi ý quota/spending limit/rate limit và hiển thị `Retry-After` nếu
  là số giây. Không in nguyên văn nội dung lỗi hoặc API key.
- Bổ sung các trường hợp giả lập vào bộ kiểm tra lỗi hiện có. Lần chạy đầu
  phát hiện mã giới hạn chi tiêu bị loại lỗi quota tổng quát che khuất; đã sửa
  để ưu tiên `error.code`. Chạy lại 6/6 test đạt, exit code 0, không gọi API thật.
- Người thực hiện chạy lại và cung cấp lỗi:
  `OpenAI HTTP 429 (code=credit_balance_exhausted; type=insufficient_quota)`,
  `AI triage exit code: 1`. Đã xác định credits API bị cạn theo mã phản hồi;
  cần kiểm tra Billing của tổ chức đang dùng key và bổ sung credits nếu muốn
  tiếp tục dùng API đó. Chưa có Cây giả thuyết từ API thật và chưa nghiệm thu
  chất lượng phân tích của LLM. Chạy lặp lại khi chưa xử lý credits không giải
  quyết được nguyên nhân này.

## Cập nhật — Chuyển sang Gemini theo lựa chọn của người thực hiện

Sau khi biết OpenAI cần credits, Codex đề xuất Gemini API với Free Tier.
Nguyễn Gia Huy đồng ý bằng lời nhắn:

> ok

- Thay kết nối OpenAI bằng Gemini `generateContent`, giữ cách đọc log và xuất
  Markdown/terminal/Step Summary. Dùng `GEMINI_API_KEY`, không lấy nhầm key
  OpenAI/LLM cũ. API key được gửi qua header `x-goog-api-key`, không đặt trong URL.
- Chọn `gemini-3.5-flash-lite` theo bảng giá và hướng dẫn model của Google tại
  thời điểm cập nhật; cho phép đổi bằng `--model` hoặc `GEMINI_MODEL`.
  Quota miễn phí thực tế vẫn cần kiểm tra trong dự án của người thực hiện.
- Xử lý lỗi Google dạng `status`/`reason`, không in nguyên văn thông báo có thể
  chứa dữ liệu nhạy cảm. Chỉ ghi báo cáo khi phản hồi kết thúc bằng `STOP` và
  có nội dung; loại bỏ phần `thought`, từ chối kết quả bị chặn hoặc `MAX_TOKENS`.
- Cập nhật hướng dẫn tạo key Google AI Studio, nhập ẩn trong PowerShell và bảng
  xử lý lỗi Gemini. Bổ sung thiết lập UTF-8 trước khi tạo lại log Jest để xử lý
  tên test tiếng Việt bị sai encoding. Chưa tạo lại log thay người thực hiện.
- Cập nhật bộ kiểm tra offline theo schema Gemini: **6/6 test đạt**, exit code 0.
  Bao phủ file/stdin, UTF-16, Markdown/summary, dry run không cần key,
  key OpenAI cũ không được sử dụng, HTTP 400/403/404/429/503, lỗi mạng/timeout,
  JSON sai, phản hồi rỗng/bị chặn/bị cắt, và không lộ key/nội dung lỗi nguyên văn.
- Chưa gọi Gemini thật vì còn cần key và quota của người thực hiện.
  Chưa có kết quả chẩn đoán LLM thành công; chưa commit/push.

Nguồn đối chiếu: [API reference](https://ai.google.dev/api/generate-content),
[API keys](https://ai.google.dev/gemini-api/docs/api-key),
[Pricing](https://ai.google.dev/gemini-api/docs/pricing),
[Model availability](https://ai.google.dev/gemini-api/docs/deprecations).
