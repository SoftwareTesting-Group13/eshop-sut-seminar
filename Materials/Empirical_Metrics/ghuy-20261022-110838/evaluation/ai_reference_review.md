# AI triage — đối chiếu với tham chiếu đã đăng ký

Người đánh giá: Codex, hỗ trợ Nguyễn Gia Huy; chưa phải đánh giá chéo của nhóm.
Nguồn: [protocol trước khi chạy](../../ghuy_protocol.md),
[log before pair 1](../39768363600/artifacts/ghuy-pair-1/pair-01-before-raw.txt),
[báo cáo AI thật](../39768363600/artifacts/ghuy-ai-metrics/triage-analysis.md),
[JSON phản hồi thật](../39768363600/artifacts/ghuy-ai-metrics/gemini-response.json),
[metadata API](../39768363600/artifacts/ghuy-ai-metrics/ai-metrics.json).

## Vận chuyển và cấu trúc

- Một lần gọi Gemini từ job ai-evaluation của run 39768363600, SHA ba4b02b.
- HTTP 200, model yêu cầu và modelVersion trả về: gemini-3.5-flash-lite.
- Client request + nhận body: 2455.726275 ms. Không phải thời gian suy luận
  riêng của server hoặc tổng thời gian job; không có số đo người phân tích thủ công.
- Response JSON parse được, finishReason STOP, có Markdown phân tích.
  usageMetadata: 721 prompt tokens, 651 candidate tokens, tổng 1372.
- JSON hợp lệ và script chạy thành công không tự chứng minh chẩn đoán đúng.

## Đối chiếu giả thuyết

AI sinh một giả thuyết nguyên nhân: khoảng chờ cố định 100 ms không đủ khi
công việc được cấu hình 200 ms, khiến kiểm tra trạng thái quá sớm.

| Giả thuyết trong phản hồi | Bằng chứng | Đánh giá |
| :--- | :--- | :--- |
| “kiểm tra trạng thái quá sớm trước khi tác vụ bất đồng bộ hoàn tất” | Raw dòng 6: workDelayMs=200, waitMs=100, ready=false; dòng 19–20: expected true/received false; test fail tại dòng 35 của source được runner trích lại. | Có bằng chứng phù hợp với cơ chế async của demo và tham chiếu đã đăng ký. |

Đếm theo giả thuyết nguyên nhân: **1 có bằng chứng / 1 được đánh giá**. Đây là
mức hỗ trợ bằng chứng cho một phản hồi trên một log demo, không phải “độ chính
xác 100%” của hệ thống AI, không phải đánh giá mù hoặc tập kiểm thử đa dạng.
Không có giả thuyết SQLite/coupon được đưa ra như nguyên nhân trong phản hồi.

## Các giới hạn và góp ý

- AI gọi workDelayMs=200 là thời gian công việc “thực tế”; log chỉ ghi độ trễ
  cấu hình, không có timestamp đo chính xác thời điểm completion. Chỉ giữ kết
  luận được hỗ trợ: lúc assertion, ready còn false.
- Tăng waitMs được đề xuất như phép thử phân biệt; không coi đó là sửa bền
  vững. Hướng await completion phù hợp code tham chiếu và after control.
- AI gợi ý kiểm tra code test await bị skip và chạy lặp với môi trường cố định,
  có ghi thiếu source. Không khẳng định một fail đã chứng minh flake rate.
- Báo cáo AI không chứng minh SUT EShop có race condition thực tế hay mọi
  trường hợp đã được sửa. Bộ 10 cặp chỉ đánh giá chính demo có can thiệp độ trễ.
- Chưa đo thời gian/debug của con người nên không tính “tiết kiệm thời gian”
  hoặc tốc độ phân tích AI so với người.
