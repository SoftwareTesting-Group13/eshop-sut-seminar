# Chat Log — Worksheet Pipeline Postmortem, Tuần 6

- **Thành viên:** Nguyễn Gia Huy — MSSV 23120273.
- **Công cụ:** OpenAI Codex; không xác định thêm tên phiên bản model từ phiên làm việc.
- **Thời điểm:** 22/10/2026, Asia/Saigon.
- **Nhánh:** `feature/giahuy-week6-worksheet`.
- **Phạm vi phiên hiện tại:** W6-16–18 đã đóng gói local; W6-20 đã đo 10 cặp CI/cache/AI và tổng hợp dữ liệu. Barem vẫn là đề xuất chưa được nhóm duyệt.

## 1. Mục tiêu công việc

Đọc kế hoạch tuần 6, bắt đầu với Worksheet 20–25 phút cho hoạt động lớp
"Pipeline Postmortem". Chuẩn bị câu hỏi, phân công, lịch hoạt động, chỗ trả lời
và nguồn tham khảo; không coi bản nháp là bộ đề đã có log CI và đáp án hoàn chỉnh.

## 2. Prompt tiêu biểu

**W6-16 — Bản rút gọn của prompt rà soát Worksheet:**

> *"Tinh gọn Worksheet Pipeline Postmortem trong 20–25 phút về SQLite lock, coupon percent, async delay và cache; chia thang điểm 10, thêm chỗ trả lời và tách hướng dẫn điều phối. Sinh viên đọc log/code và đề xuất cách kiểm chứng, không bắt buộc chạy test trên lớp."*

**W6-17 — Bản rút gọn của prompt hoàn thiện Answer Key:**

> *"Hoàn thiện Answer Key khớp từng câu Worksheet: đáp án, bằng chứng log, file/hàm/dòng tại revision đã kiểm tra, nguyên nhân, hướng sửa và cách xác nhận. Đề xuất barem 10 điểm có điểm thành phần; chấp nhận lời giải khác có bằng chứng. Kiểm tra discount_amount/final_amount, ghi sai khác với kế hoạch, tránh lộ đáp án và bổ sung ghi chú điều phối."*

**W6-20 — Bản rút gọn:**

> *"Đo before/after trên GitHub Actions, 10 lượt hợp lệ mỗi biến thể; ghi điều kiện, run/SHA, duration và raw log, phân biệt test fail với lỗi hạ tầng. Đo cache cold/warm bằng key riêng, tính failure rate/speedup; đánh giá API triage và bằng chứng chẩn đoán riêng với JSON hợp lệ. Tổng hợp phương pháp, số liệu và giới hạn vào Empirical Metrics."*

## 3. Nhật ký phản hồi AI và sản phẩm

1. Đọc `Plan/Week6Plan.md`, `Plan/Checklist.md`, hồ sơ tuần 6 và mã hiện tại.
2. Kiểm tra repo sạch, fetch và xác nhận local main đồng bộ `origin/main` tại
   `f50f68e`; tạo nhánh riêng cho Worksheet.
3. Phát hiện `backend/coupon-discount.js` đã dùng công thức percent được sửa.
   Đối chiếu mã lỗi cũ tại `6129c98` để tránh mô tả log tuần 5 như lỗi hiện tại.
4. Soạn `Activity_Worksheet.md`: lịch 23 phút, ba hồ sơ SQLite/coupon/async,
   phần cache, 10 điểm và bảng postmortem để nhóm sinh viên điền.
5. Tạo `Materials/Sample_Logs/README.md` ghi nguồn đã có, nguồn CI còn thiếu và
   metadata cần thu thập. Không tạo log, run ID, số đo hoặc URL CI giả.
6. Cập nhật phần kê khai của Huy theo kết quả của phiên này; bỏ mô tả sẵn về
   việc đã dùng SDK Gemini cũ/sửa SDK vì không có bằng chứng cho hoạt động đó.

**Commit bản nháp:** `a2cb8c4` — `docs(worksheet): draft Pipeline Postmortem classroom activity`.

## 4. Kiểm chứng và biên tập thủ công

### Kiểm tra Codex đã thực hiện

- Các liên kết file nội bộ của Worksheet và danh mục nguồn đều trỏ tới file có thật.
- Các code fence Markdown có đủ cặp mở/đóng; `git diff --check` không báo lỗi.
- Phân bổ lịch 2 + 5 + 5 + 5 + 3 + 3 = 23 phút, có cách điều chỉnh về 20 hoặc 25 phút.
- Thang điểm câu hỏi 3 + 3 + 3 + 1 = 10; phần trình bày không cộng thêm điểm.
- Chưa thay đổi mã nguồn hoặc chạy toàn bộ test backend trong bước soạn tài liệu.

### Phần người thực hiện còn cần đối chiếu

- Đọc bản nháp và điều chỉnh độ khó/ngôn ngữ cho lớp; chưa có xác nhận đã rà
  soát hoặc trao đổi thống nhất với các thành viên khác trong phiên này.
- Đối chiếu nguồn CI SQLite/coupon/cache tại mục 7–8. Log local hiện có chỉ là
  tài liệu tham khảo khi soạn nháp; không thay thế log CI.
- Mở Markdown Preview, kiểm tra bố cục và lưu ảnh thật
  `Weekly_Reports/Week06/screenshots/ghuy_01_worksheet_preview.png`.
- Rà soát Answer Key W6-17 (đã soạn tại mục 9); chỉ nghiệm thu W6-16 sau khi đủ nội dung, nguồn và
  bằng chứng theo checklist. Chưa tạo PR, chưa push trong bước bản nháp.

## 5. Trạng thái các phần tiếp theo

W6-17 có bản soạn tại mục 9; W6-18 cập nhật ở mục 7–8. W6-20 và lần gọi Gemini
để đánh giá được cập nhật tại mục 11. W6-19 chưa nghiệm thu riêng; không tự ký
xác nhận mới hoặc ghi nhóm đã duyệt barem.

## 6. Cập nhật thiết kế Worksheet — 22/10/2026

Nội dung rà soát tương ứng với prompt W6-16 tại mục 2: tinh gọn câu hỏi,
làm rõ cách làm bài và tách ghi chú tổ chức.

Codex chỉnh phiếu thành các câu hỏi ngắn, giữ 23 phút và 10 điểm. Sinh viên
đọc hồ sơ và viết lệnh đề xuất; không bắt buộc cài repo hoặc chạy test trong giờ.
Hai nhóm được chọn trình bày tối đa 60 giây/nhóm; mọi nhóm nộp phiếu.

Tạo `Materials/Worksheet_Facilitator_Notes.md` chứa hướng dẫn chuẩn bị trích đoạn,
điều phối và câu hỏi mở rộng, đồng thời liên kết từ danh mục Sample Logs.
Chưa đưa trích đoạn CI vào phiếu vì bộ nguồn thật còn thiếu. Chưa có thử nghiệm
thời lượng với sinh viên, Answer Key hoặc ảnh preview mới.

## 7. Thu thập Sample CI Failure Logs — W6-18

Prompt thực tế (trích phần mở đầu; lời nhắn đầy đủ còn quy định nguồn, che dữ
liệu nhạy cảm, cấu trúc file, cách đánh giá cache và danh sách ảnh minh chứng):

> Thực hiện W6-18: thu thập Sample CI Failure Logs cho bài tập Pipeline Postmortem.

Codex kiểm tra workflow/source, xác nhận máy chưa có gh CLI. GitHub REST API
cho đọc metadata công khai; tải log chưa xác thực trả HTTP 403. Sau đó dùng
credential GitHub sẵn có từ Git Credential Manager để tải log, không lưu token.

- Rà soát toàn bộ log Backend Test của 25 run được API liệt kê, theo attempt
  mới nhất; không tìm thấy `SQLITE_BUSY` hoặc `database is locked`.
- Chọn run `38866929295` cho coupon: Received -9000000, final_amount 10000000;
  source `6129c98` khớp phiên bản lỗi. Không đổi code nghiệp vụ để tạo lỗi.
- Chọn `38795826028` (miss, pass), `38847386315` (hit, pass) và `38790291172`
  (miss, npm ci EUSAGE do lockfile không đồng bộ; test skipped) cho cache.
- Lưu 4 log job đầy đủ, excerpt có số dòng raw, metadata job/step/SHA/UTC,
  checksum, workflow snapshots và source coupon trong `Materials/Sample_Logs/`.
- Giữ nguyên dấu che `***` của GitHub; không phát hiện token cần che thêm theo
  các mẫu đã kiểm tra. Bản trích chỉ bỏ ANSI và khoảng dòng được ghi rõ.
- Phân biệt số echo ghi cứng ~60s/~5s với timestamp thực tế; không dùng hai run
  khác commit làm benchmark kiểm soát. Run cold được chọn cài dependency 4 giây.

Tại cuối lượt thu thập ban đầu, index ghi hướng dẫn bổ sung SQLite và ảnh cần
chụp; chưa tái hiện demo hoặc push. Kết quả SQLite tiếp theo cập nhật ở mục 8.
Không dùng log local làm bằng chứng CI.

Kiểm tra của Codex: SHA-256 và số dòng của cả 4 raw log khớp metadata; từng
dòng excerpt khớp dòng raw sau khi bỏ ANSI; liên kết index/ghi chú điều phối
hợp lệ, quét mẫu token không có kết quả và `git diff --check` không báo lỗi.
Đặt quy tắc LF cho log/JSON để checksum ổn định khi checkout trên Windows.

## 8. Bổ sung CI SQLite từ nhánh demo riêng

Chuẩn bị worktree tách biệt từ `f50f68e` trên nhánh
`test/giahuy-sqlite-lock-demo`. Commit `d35b932` thêm mã demo, workflow và log
local; không sửa code nghiệp vụ hoặc dùng database SUT. Hai kết nối trong một
tiến trình cùng ghi database tạm, `busyTimeout=0`, journal DELETE. Chế độ
parallel giữ transaction A khi B INSERT; serial COMMIT A trước khi B ghi.

Local: parallel SQLITE_BUSY / exit 1; serial hai dòng committed / exit 0.
Đã push riêng nhánh demo. Job cài dependency của lượt CI đầu kéo dài; commit
`485a778` bổ sung timeout và bỏ npm audit tùy chọn, giữ nguyên mã tái hiện.

Run [39741620266](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39741620266),
attempt 1, SHA `485a77881b7c7be487af71805147bca1a1ae9d0e`:

- Job `SQLite demo (parallel)` (`119699936256`): dependency install success,
  demo SQLITE_BUSY / exit 1, job failure; upload log thành công.
- Job `SQLite demo (serial)` (`119699936524`): COMMIT trước B INSERT,
  `PASS committedWrites=2`, job success; upload log thành công.
- Cùng Linux / Node 22.23.3 / SQLite 3.52.0; workflow failure là kết quả dự
  kiến của job parallel, không tự coi các failure khác là SQLite evidence.

Đã tải raw hai job, excerpt L0145–L0163, metadata và snapshot mã/workflow cùng
SHA về nhánh Worksheet. Nguồn được ghi rõ là CI reproduction có kiểm soát,
không phải lỗi lịch sử của SUT hay phép chạy nhiều Jest worker. Đã điều chỉnh
A2/A3 của Worksheet cho đúng hai kết nối và hai chế độ demo.

Tài liệu và log mới trên nhánh Worksheet vẫn local; demo chưa merge main.
W6-18 có đủ ba loại nguồn yêu cầu và 7 ảnh ghuy_03a–ghuy_03g do sinh viên chụp,
Codex đã mở kiểm tra; còn chờ rà soát cuối/commit. Hồ sơ C async vẫn dùng log local.

## 9. Soạn Answer Key và barem — W6-17

Đã tạo `Activity_Worksheet_AnswerKey.md` bám 10 câu A1–A3, B1–B3, C1–C3,
D1. Mỗi câu tối đa 1 điểm, chia tiêu chí 0.25/0.5 điểm; tổng 10. Có đáp án,
dẫn chứng dòng log/source, lệnh kiểm chứng đề xuất và cách chấp nhận câu trả
lời tương đương. Không yêu cầu sinh viên chạy test trên lớp.

- A: dùng cặp CI SQLite demo cùng SHA; phân biệt hai kết nối trong một tiến
  trình với nhiều Jest worker, lệnh Node chỉ chạy trên nhánh demo có source.
- B: đối chiếu input, hai giá trị Received và công thức sự cố; không quy toàn
  bộ lỗi biên coupon cho một công thức hoặc khẳng định đã sửa/chạy lại test.
- C: nguồn local; phân biệt độ trễ cấu hình với timestamp, hai test có hai tác
  vụ riêng; await trong finally chỉ cleanup, cần await hoàn tất trước assertion.
- D: install EUSAGE do package/lockfile lệch; cache miss không tự gây failure,
  Jest skipped và không có Quality Gate trong workflow lịch sử được phát.

Cập nhật liên kết Answer Key trong ghi chú điều phối và báo cáo, ghi nhận ảnh
install failure đã nhận. Thời điểm soạn ban đầu chưa có ảnh preview Answer
Key; ảnh và rà soát cuối cập nhật ở mục 10. W6-19/W6-20 chưa bắt đầu.

Kiểm tra Codex: 10 mã câu trong đáp án khớp Worksheet; từng barem cộng đúng
1 điểm, tổng 10; phép tính coupon sai/đúng khớp các giá trị đã dẫn. Liên kết
file và code fence Markdown hợp lệ, `git diff --check` không báo lỗi. Không
chạy backend test hoặc sửa nghiệp vụ trong bước soạn tài liệu này.

### Rà soát bổ sung W6-17

Bổ sung nguồn code/revision, nguyên nhân và tiêu chí xác nhận sau sửa cho từng
câu; ghi barem 10 điểm là đề xuất chưa được nhóm duyệt. Lưu snapshot code C
ở `575e6be` sau khi đối chiếu khớp file làm việc; log local C không ghi SHA lúc
chạy nên không coi revision lượt chạy cũ đã được truy nguyên chắc chắn.

Đối chiếu kế hoạch dòng 68 với source và test coupon tại `6129c98`: công thức
sai làm discount_amount âm, rồi final_amount tăng vượt tổng. Không lặp mô tả
âm do “tiền giảm lớn hơn tổng”; kiểm tra guard và phân biệt lỗi ngưỡng min.
Ghi rõ cache miss khác failure install và demo SQLite khác lỗi SUT do Jest.

Rà mã câu đề/đáp án một-một; phần thông tin điều kiện thí nghiệm trên phiếu là
dữ liệu đề bài, các ô kết quả/công thức/giả thuyết vẫn trống. Bổ sung hướng dẫn
phát dữ liệu và giữ Answer Key riêng trong tài liệu điều phối. Chưa có lượt
chạy bản sửa, nhóm duyệt barem hoặc thử chấm mới được xác nhận.

## 10. Rà soát bản đóng gói local

Đã mở kiểm tra ảnh `ghuy_02_answerkey_rubric.png`: có đáp án A1, nguồn code và
bảng chia điểm 0.5 + 0.5. Hai ảnh Worksheet và 7 ảnh CI/index cũng đã kiểm tra,
đưa vào bộ tài liệu cùng các liên kết minh chứng. Giữ nguyên ghi chú barem
đề xuất chưa được nhóm duyệt; chưa có thử chấm, thử thời lượng với lớp hoặc
thông báo chấp thuận của nhóm được ghi nhận.

Đóng gói tài liệu/log/ảnh trên `feature/giahuy-week6-worksheet`; chưa push
nhánh tài liệu hoặc merge main. Nhánh demo SQLite đã push riêng trước đó.
Không thay đổi code nghiệp vụ trong lượt đóng gói này.

**Commit bản đóng gói:** `a15d7c6` —
`docs(week6): package worksheet answer key and verified CI evidence`.
Đã kiểm tra một-một 10 câu/10 điểm, liên kết/Markdown, checksum và ánh xạ
excerpt của 6 raw log, mẫu secret và ảnh thật. Whitespace gốc trong file bằng
chứng được giữ nguyên, chỉ miễn kiểm tra whitespace riêng các thư mục archive.
Nhật ký Git cập nhật snapshot qua commit này; không tự ghi nhận nhóm duyệt.

## 11. Đo thực nghiệm W6-20 — 10 cặp CI, cache và AI

Thiết kế và commit protocol trước khi dispatch, trên nhánh riêng
`test/giahuy-week6-metrics` từ main đã kiểm tra. SHA thí nghiệm `ba4b02b`, không
thay test tuần 5, code nghiệp vụ hoặc eshop-ci.yml. Workflow chỉ contents:read,
giới hạn thời gian, không comment PR/deploy; cache dùng key theo experiment,
không xóa cache nhóm. Một lần gọi Gemini nếu có key; không retry tự động.

Local validation kiểm tra sleep slow fail/await pass, fast cả hai pass; thiếu
Jest được phân loại hạ tầng/harness. Các log local này không trộn vào mẫu CI.
Sau kiểm tra tác dụng phụ đã dispatch 10 runs cùng full SHA, experiment
`ghuy-20261022-110838`. Mỗi run có hai Jest invocation mới, lọc riêng test
before/after, không cộng test skipped thành mẫu.

- Cặp lẻ profile slow 200 ms, cặp chẵn fast 20 ms, cùng profile trong cặp;
  đảo thứ tự before/after theo cặp. Cấu hình này được chọn trước, không phải
  mẫu flake tự nhiên từ SUT.
- Đủ 10 hợp lệ mỗi biến thể: before 5 fail/10, after 0 fail/10; giảm 50 điểm
  phần trăm. Không lỗi hạ tầng, không lượt thay thế, giữ toàn bộ test fail.
- Ba hosted image versions xuất hiện giữa runs. Giữ nguyên toàn bộ dữ liệu;
  mỗi cặp cùng runner/image, Node/lockfile/source/config hashes khớp.
- Cache cold miss/warm hit trên key riêng, cùng môi trường: khoảng chuẩn bị
  dependency 6.283604498/2.330145184 giây, ratio 2.696657934×. Không so npm ci
  với warm skipped hoặc dùng tổng job làm dependency time; n=1 cặp là giới hạn.
- Gemini HTTP 200, response JSON thật hợp lệ, model gemini-3.5-flash-lite,
  client request/body 2455.726275 ms. Phản hồi chẩn đoán vẫn Markdown. Codex
  đối chiếu một giả thuyết với tham chiếu đã đăng ký: có bằng chứng hỗ trợ,
  nhưng ghi hạn chế “200 ms thực tế” chỉ là cấu hình và tăng sleep không phải
  sửa bền vững. Không gọi JSON hợp lệ hay 1/1 hỗ trợ là AI chính xác tổng quát.

Đã lưu run metadata, raw job logs, 20 raw invocation/Jest JSON, CSV, kết quả
cache/AI và đánh giá trong `Materials/Empirical_Metrics/`; báo cáo
`Empirical_Metrics.md`, bộ tái tính offline `ghuy_summarize_metrics.py`.
Nhánh đo đã publish để thực hiện CI; kết quả/báo cáo trên nhánh tài liệu chưa
push. Chưa có ảnh W6-20 hoặc đánh giá chéo của nhóm được cung cấp.

Kiểm chứng cuối W6-20: tái tính offline khớp 10 runs/20 hợp lệ, từng raw checksum
khớp metadata và từng kết quả khớp assertion Jest JSON. Cache log xác nhận miss/
hit cùng key; JSON Gemini có finishReason STOP. Kiểm tra link, UTF-8/LF và mẫu
secret không phát hiện credential; lưu checksum cho 97 file batch. Ba image
versions giữa runs được giữ trong báo cáo, không lọc bỏ hoặc chạy lại để chọn số.

Commit triển khai đo: `ba4b02b` trên nhánh metrics đã push. Commit kết quả:
`68051e3` trên nhánh tài liệu, local; chứa báo cáo, CSV/raw/metadata và các cập
nhật khai báo/báo cáo. Chưa push nhánh tài liệu hoặc merge main.
