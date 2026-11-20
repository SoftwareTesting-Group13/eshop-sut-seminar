# Empirical Metrics — W6-20

**Nguyễn Gia Huy · Đo ngày 22/10/2026 · Experiment `ghuy-20261022-110838`**

Kết quả từ **10 workflow runs thật, 20 test invocations hợp lệ** trên GitHub Actions.
Đây là demo async có can thiệp độ trễ, không phải số đo flake tự nhiên của EShop.

## 1. Kết quả và công thức

| Biến thể | Hợp lệ | Test fail | Failure rate |
| :--- | ---: | ---: | ---: |
| Before — sleep 100 ms | 10 | 5 | 5 / 10 = **50%** |
| After — await completion | 10 | 0 | 0 / 10 = **0% trong mẫu** |

`failure_rate = test_fail / valid_invocations`.
`reduction_pp = (0.50 - 0.00) × 100 = 50 điểm phần trăm`.

Không có lỗi hạ tầng/harness, lượt thay thế hoặc dữ liệu trùng trong batch này.
Không loại test fail: cả 5 failure của before đều nằm trong mẫu. 10/10 lượt
after pass không chứng minh đã loại bỏ hoàn toàn flaky trong mọi điều kiện.

## 2. Phương pháp và điều kiện

- Mỗi workflow run chứa **một invocation before và một invocation after** trong
  cùng job/runner. Mỗi invocation khởi chạy một Jest process mới và chọn đúng
  một test; test còn lại bị skip, không cộng vào mẫu. Có 10 runs, không phải 20.
- Hai biến thể là hai test có sẵn trong `backend/demos/flaky-delay.demo.js`:
  before dùng sleep rồi assertion; after await promise completion rồi assertion.
  Không sửa test hoặc code nghiệp vụ để lấy kết quả.
- Lịch chọn trước: cặp lẻ slow 200 ms, cặp chẵn fast 20 ms; cả hai cùng waitMs
  cấu hình 100. Cùng cặp giữ profile như nhau. Cặp lẻ chạy before trước, cặp
  chẵn đảo thứ tự. Mẫu 5 slow + 5 fast chủ đích giải thích tỷ lệ before 50%.
- Full SHA của mọi run: `ba4b02b86b94c329a8b0614a5053bb7d7b161f67`.
  Runner label Ubuntu 24.04, Node **22.23.3**, npm từ setup-node (log 10.9.9),
  cùng package-lock, source demo và Jest config; Jest dùng --runInBand --no-cache.
- Runner image thực tế thay đổi giữa 3 phiên bản: `20261012.334.1`,
  `20261018.339.1`, `20261021.345.10`. Trong từng cặp before/after image và
  máy chạy giống nhau. Không khẳng định cố định toàn bộ image/hardware giữa runs.
- `invocation_duration_ms` đo từ spawn Jest tới process kết thúc, gồm startup,
  test và cleanup; không phải thời điểm riêng của assertion. Duration từng test
  từ Jest được lưu riêng trong CSV/JSON.
- Hợp lệ khi JSON có đúng assertion mục tiêu, log profile và exit/status nhất
  quán: pass/0 hoặc fail/1. Thiếu setup/JSON, timeout, signal hoặc không có test
  mục tiêu là lỗi hạ tầng/harness, lưu lý do và không vào mẫu số. Quy tắc giữ
  lượt hợp lệ đầu tiên của mỗi pair/variant đã ghi trong protocol; không cần
  áp dụng thay thế ở batch này.

[Protocol đăng ký trước khi dispatch](Materials/Empirical_Metrics/ghuy_protocol.md),
[manifest dispatch](Materials/Empirical_Metrics/ghuy-20261022-110838/dispatches.json), [metadata 10 runs](Materials/Empirical_Metrics/ghuy-20261022-110838/runs.json),
[20 dòng CSV](Materials/Empirical_Metrics/ghuy-20261022-110838/invocations.csv), [quan sát đầy đủ](Materials/Empirical_Metrics/ghuy-20261022-110838/observations.json),
[summary tính lại từ artifacts](Materials/Empirical_Metrics/ghuy-20261022-110838/summary.json). SHA-256 lockfile:
`78485f5b1205265e1ea8d40206e9465968175a90025cd5cddc4888e5f6d5429e`.

## 3. Từng cặp đo và raw log

UTC là múi giờ timestamp trong CSV; giờ Việt Nam cộng 7 giờ. Bảng duration
dưới đây là thời gian cả invocation, làm tròn 3 chữ số thập phân (ms).

| Cặp / profile | Run URL | Before — kết quả / ms / raw | After — kết quả / ms / raw |
| :--- | :--- | :--- | :--- |
| 1 / slow | [39768363600](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768363600) | FAIL / 867.382 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768363600/artifacts/ghuy-pair-1/pair-01-before-raw.txt) | PASS / 865.314 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768363600/artifacts/ghuy-pair-1/pair-01-after-raw.txt) |
| 2 / fast | [39768367168](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768367168) | PASS / 551.437 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768367168/artifacts/ghuy-pair-2/pair-02-before-raw.txt) | PASS / 482.431 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768367168/artifacts/ghuy-pair-2/pair-02-after-raw.txt) |
| 3 / slow | [39768370314](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768370314) | FAIL / 857.409 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768370314/artifacts/ghuy-pair-3/pair-03-before-raw.txt) | PASS / 835.998 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768370314/artifacts/ghuy-pair-3/pair-03-after-raw.txt) |
| 4 / fast | [39768374167](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768374167) | PASS / 683.354 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768374167/artifacts/ghuy-pair-4/pair-04-before-raw.txt) | PASS / 616.303 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768374167/artifacts/ghuy-pair-4/pair-04-after-raw.txt) |
| 5 / slow | [39768378420](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768378420) | FAIL / 874.024 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768378420/artifacts/ghuy-pair-5/pair-05-before-raw.txt) | PASS / 837.582 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768378420/artifacts/ghuy-pair-5/pair-05-after-raw.txt) |
| 6 / fast | [39768381982](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768381982) | PASS / 630.624 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768381982/artifacts/ghuy-pair-6/pair-06-before-raw.txt) | PASS / 616.457 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768381982/artifacts/ghuy-pair-6/pair-06-after-raw.txt) |
| 7 / slow | [39768385004](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768385004) | FAIL / 704.703 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768385004/artifacts/ghuy-pair-7/pair-07-before-raw.txt) | PASS / 649.835 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768385004/artifacts/ghuy-pair-7/pair-07-after-raw.txt) |
| 8 / fast | [39768388657](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768388657) | PASS / 756.902 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768388657/artifacts/ghuy-pair-8/pair-08-before-raw.txt) | PASS / 700.644 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768388657/artifacts/ghuy-pair-8/pair-08-after-raw.txt) |
| 9 / slow | [39768393565](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768393565) | FAIL / 862.845 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768393565/artifacts/ghuy-pair-9/pair-09-before-raw.txt) | PASS / 777.891 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768393565/artifacts/ghuy-pair-9/pair-09-after-raw.txt) |
| 10 / fast | [39768396793](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39768396793) | PASS / 740.579 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768396793/artifacts/ghuy-pair-10/pair-10-before-raw.txt) | PASS / 726.866 / [raw](Materials/Empirical_Metrics/ghuy-20261022-110838/39768396793/artifacts/ghuy-pair-10/pair-10-after-raw.txt) |

Mỗi thư mục run có `jobs.json`, complete job logs và artifacts nguyên văn.
Run lẻ đỏ do before failure được giữ nguyên; after vẫn chạy và artifacts vẫn
được upload trước bước kết luận. Không dùng màu run làm đơn vị đếm test fail.

## 4. Cache cold/warm

Đo một cặp cold/warm trong run 39768363600, hai job có cùng SHA, image
`20261012.334.1`, Node/npm và lockfile. Key riêng bắt đầu
`ghuy-w620-ghuy-20261022-110838-...`, exact lookup, không fallback hoặc xóa cache chung.

| Đại lượng | Cold | Warm |
| :--- | ---: | ---: |
| Cache state từ action/log | miss | hit cùng key |
| Khoảng chuẩn bị dependency đo monotonic (giây) | 6.283604 | 2.330145 |
| Restore step — timestamp API (giây) | 1 | 3 |
| npm ci step — timestamp API (giây) | 6 | skipped / N/A |
| Tổng job — timestamp API (giây) | 19 | 10 |

**Speedup khoảng chuẩn bị dependency = 6.283604 / 2.330145 = 2.697×.**

Khoảng đo chung bắt đầu trước cache restore và kết thúc sau restore + npm ci
nếu miss, gồm cả chuyển bước. Không gồm checkout, setup-node, save cache hay
upload; không gọi đây là tốc độ riêng npm ci hoặc tốc độ toàn job. Step API
có độ phân giải giây và ranh giới khác, không cộng các giá trị làm số đo chính
xác của interval. Warm skip install không được ghi là npm ci mất 0 giây.
Một cặp cache chỉ cho quan sát ban đầu, chưa đủ để suy rộng hiệu năng.

Nguồn: [cold JSON](Materials/Empirical_Metrics/ghuy-20261022-110838/39768363600/artifacts/ghuy-cache-cold/cache-cold.json),
[warm JSON](Materials/Empirical_Metrics/ghuy-20261022-110838/39768363600/artifacts/ghuy-cache-warm/cache-warm.json),
[jobs/steps UTC](Materials/Empirical_Metrics/ghuy-20261022-110838/39768363600/jobs.json). Log action có Cache not found
và Cache hit/restore, xác nhận điều kiện trước khi tính ratio.

## 5. AI triage: một lần gọi thật và đối chiếu bằng chứng

- Gemini `gemini-3.5-flash-lite`, HTTP **200**; response parse JSON hợp lệ và
  sinh Markdown. Đo bằng observer quanh request của ai_triage.analyze hiện có,
  không thay prompt/thuật toán chẩn đoán, không retry.
  JSON ở đây là response envelope của provider; phần chẩn đoán là Markdown,
  chưa phải kiểm tra schema JSON riêng cho cây giả thuyết.
- Client request + nhận body **2.456 giây**; không phải latency suy luận
  riêng của server hay thời gian tiết kiệm so với người. Không có baseline con người.
- Có **1 giả thuyết nguyên nhân / 1 được đánh giá có bằng chứng hỗ trợ**:
  kiểm tra ready sau khoảng chờ cố định khi tác vụ chưa hoàn tất. Đây là phân
  tích của Codex trên một log demo theo tham chiếu đã đăng ký; không báo “AI
  chính xác 100%”, không coi JSON hợp lệ là chẩn đoán đúng.
- Cần sửa cách diễn đạt của AI về “thời gian thực tế” 200 ms: đó là cấu hình,
  không phải timestamp completion được đo. Tăng sleep chỉ là phép thử chẩn
  đoán; giải pháp await được đánh giá cùng dữ liệu after, không khẳng định SUT-wide fix.

[Raw JSON response](Materials/Empirical_Metrics/ghuy-20261022-110838/39768363600/artifacts/ghuy-ai-metrics/gemini-response.json),
[analysis gốc](Materials/Empirical_Metrics/ghuy-20261022-110838/39768363600/artifacts/ghuy-ai-metrics/triage-analysis.md),
[metadata/latency](Materials/Empirical_Metrics/ghuy-20261022-110838/39768363600/artifacts/ghuy-ai-metrics/ai-metrics.json),
[đánh giá tham chiếu và giới hạn](Materials/Empirical_Metrics/ghuy-20261022-110838/evaluation/ai_reference_review.md).

## 6. Tái tính, nguồn triển khai và giới hạn

Chỉ tái tính offline, không gọi API:

```powershell
python .github/scripts/ghuy_summarize_metrics.py Materials/Empirical_Metrics/ghuy-20261022-110838
```

Workflow và collector CI nằm trên nhánh đo riêng, chưa merge main:
[workflow đúng SHA](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/blob/ba4b02b86b94c329a8b0614a5053bb7d7b161f67/.github/workflows/ghuy-week6-metrics.yml),
[bộ đo Jest](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/blob/ba4b02b86b94c329a8b0614a5053bb7d7b161f67/.github/scripts/ghuy_measure_flaky.cjs),
[observer AI](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/blob/ba4b02b86b94c329a8b0614a5053bb7d7b161f67/.github/scripts/ghuy_measure_ai.py).

Push ban đầu chỉ đăng ký workflow đo (không có samples), đồng thời kích hoạt
EShop CI theo workflow nhóm hiện có. Chỉ dispatch workflow đo để lấy mẫu;
không deployment, comment PR, xóa cache chung hoặc thay code nghiệp vụ.
Các ZIP/artifact đã tải qua REST API bằng credential sẵn có, không lưu token;
giữ complete top-level job logs và mọi text artifact, chuẩn hóa UTF-8/LF, che
token nếu phát hiện. Raw test giữ stdout rồi stderr với nhãn riêng, không bịa
lại thứ tự hai stream. Mỗi run có manifest cách tải; checksum ở dữ liệu đo.

Giới hạn: 10 cặp nhỏ, phân bố fast/slow chủ đích; hardware/image giữa runs
không hoàn toàn cố định; cache chỉ một cặp; AI một response, chưa có đánh giá
chéo/mù của nhóm. Chưa có ảnh history/metrics do sinh viên chụp trong bước này.
Không coi các giới hạn đó là lý do loại bỏ lượt đo đã hợp lệ.
