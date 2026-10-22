# Sample CI Logs — Pipeline Postmortem (W6-18)

**Nguyễn Gia Huy · Thu thập ngày 22/10/2026 · Nguồn: GitHub Actions thật**

Khoảng trắng trong raw log và source/trích đoạn được giữ để đối chiếu dòng và
checksum. `.gitattributes` chỉ miễn kiểm tra lỗi whitespace cho các bản `.txt`
trong raw/excerpts/source; không xóa hay sửa dòng bằng chứng để qua kiểm tra Git.

Đã lưu **6 log job CI hoàn chỉnh**: 4 log coupon/cache lịch sử và 2 log SQLite
tái hiện có kiểm soát trên nhánh demo riêng. Có bản trích đánh số dòng, metadata
và source đúng commit cho cả ba loại nguồn yêu cầu ở W6-18. Đã nhận đủ 7 ảnh
ghuy_03a–ghuy_03g và kiểm tra nội dung; chờ rà soát cuối/commit bộ hồ sơ trước
khi nghiệm thu. Không thay đổi code nghiệp vụ.

Dùng cùng [Worksheet](../../Activity_Worksheet.md) và
[Ghi chú điều phối](../Worksheet_Facilitator_Notes.md).
Đáp án và barem dành riêng cho người chấm: [Answer Key](../../Activity_Worksheet_AnswerKey.md).

## 1. Index nguồn và cách dùng

| Hồ sơ | Run thật / kết quả | Bản gốc đã rà soát dữ liệu nhạy cảm | Bản trích cho sinh viên | Metadata |
| :--- | :--- | :--- | :--- | :--- |
| B — Coupon percent | [38866929295](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/38866929295), failure | [Raw](raw/ghuy_coupon_failure_38866929295.txt) | [Excerpt B](excerpts/ghuy_coupon_failure_38866929295.txt) | [Nguồn / job / step](metadata/ghuy_coupon_failure_38866929295.json) |
| D1 — Cache cold, pass | [38795826028](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/38795826028), success | [Raw](raw/ghuy_cache_cold_pass_38795826028.txt) | [Excerpt D1](excerpts/ghuy_cache_cold_pass_38795826028.txt) | [Nguồn / job / step](metadata/ghuy_cache_cold_pass_38795826028.json) |
| D2 — Cache warm, pass | [38847386315](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/38847386315), success | [Raw](raw/ghuy_cache_warm_pass_38847386315.txt) | [Excerpt D2](excerpts/ghuy_cache_warm_pass_38847386315.txt) | [Nguồn / job / step](metadata/ghuy_cache_warm_pass_38847386315.json) |
| D3 — Cache miss, install fail | [38790291172](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/38790291172), failure | [Raw](raw/ghuy_cache_miss_install_failure_38790291172.txt) | [Excerpt D3](excerpts/ghuy_cache_miss_install_failure_38790291172.txt) | [Nguồn / job / step](metadata/ghuy_cache_miss_install_failure_38790291172.json) |
| A1 — SQLite ghi chồng transaction (demo) | [39741620266](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39741620266), job parallel failure | [Raw](raw/ghuy_sqlite_parallel_39741620266.txt) | [Excerpt A1](excerpts/ghuy_sqlite_parallel_39741620266.txt) | [Nguồn / job / step](metadata/ghuy_sqlite_parallel_39741620266.json) |
| A2 — SQLite ghi tuần tự (demo) | Cùng run A1, job serial success | [Raw](raw/ghuy_sqlite_serial_39741620266.txt) | [Excerpt A2](excerpts/ghuy_sqlite_serial_39741620266.txt) | [Nguồn / job / step](metadata/ghuy_sqlite_serial_39741620266.json) |
| C — Async delay | Chưa thu thập CI trong bước này | Chỉ có [log local tuần 5](../../Weekly_Reports/Week05/flaky_slow_huy.txt) | Chưa có bản trích CI | Không trình bày log local như kết quả CI |

`raw/` chứa toàn bộ log từng job đã chọn, không phải toàn bộ ZIP của workflow.
`excerpts/` chỉ chứa các khoảng dòng đã chọn. `metadata/` ghi SHA đầy đủ,
run attempt, URL job, trạng thái/thời gian từng step, checksum và khoảng trích.
`source/` chứa workflow đúng commit, code coupon lịch sử và mã demo SQLite.

Nguồn bổ sung cho Answer Key: [ngữ cảnh route coupon](source/ghuy_coupon_route_context_6129c98.txt)
tại `6129c98` và [snapshot code async](source/ghuy_async_demo_575e6be.txt) đã đối
chiếu với file làm việc tại `575e6be`. Log async vẫn là log local cũ, không ghi
SHA lúc chạy; snapshot code không được dùng để bịa metadata của lượt chạy đó.

## 2. Thông tin run

Tất cả các nguồn đã chọn có **attempt 1**. B/D dùng workflow **EShop CI**, job
**Backend Test (Node.js 22)**; A dùng **SQLite Lock Teaching Demo**, hai job matrix
`parallel`/`serial`. Xem bản raw để đối chiếu runner image và phiên bản Node/npm.
Thời gian dưới đây là **UTC**; giờ Việt Nam cộng 7 giờ.

| Hồ sơ | Run bắt đầu (UTC) | Commit SHA | Branch | Job ID |
| :--- | :--- | :--- | :--- | :--- |
| B | 2026-10-16 07:23:39 | `6129c98350db5294f7c3127741ab5a564cab4b66` | main | `116861797106` |
| D1 | 2026-10-15 19:40:32 | `86bd9cdafa9b96e88cf4c4dfaeefb18c7e56466b` | ncuong | `116631817546` |
| D2 | 2026-10-16 03:48:55 | `4e419afacd897eea030257e58806e26c48f5280f` | ncuong | `116800892659` |
| D3 | 2026-10-15 19:00:15 | `e601f2198f5d11e23111f1a2d45872b983846171` | main | `116612788333` |
| A1/A2 | 2026-10-22 07:36:05 | `485a77881b7c7be487af71805147bca1a1ae9d0e` | test/giahuy-sqlite-lock-demo | `119699936256` / `119699936524` |

B/D là run lịch sử được thu thập ở tuần 6; workflow khi đó chưa có Quality Gate
như main hiện tại. A là run mới trên nhánh demo; không coi đây là lỗi lịch sử của EShop.

## 3. Cách phát hồ sơ B — Coupon

Phát Excerpt B cùng hai đoạn code **ở commit sự cố**:

- [Phép tính trong server.js, dòng 398–434](source/ghuy_coupon_server_js_6129c98.txt).
- [Input và assertion coupon, dòng 28–52](source/ghuy_coupon_coupon_test_js_6129c98.txt).
- [Workflow cùng commit](source/ghuy_coupon_failure_38866929295_workflow.yml).

Excerpt giữ input SAVE10 / 1,000,000, Expected/Received của giảm giá và
assertion riêng về `final_amount`, cùng thống kê và exit code. Hai giá trị
Received thuộc hai ca kiểm thử với cùng input, không phải một bản dump response.
Raw còn các lỗi biên coupon khác: không quy tất cả 8 test fail cho một công thức.
Source main hiện tại đã sửa công thức; dùng snapshot sự cố cho bài tập.

## 4. Cách phát hồ sơ D — Cache

Dùng **D3 làm tình huống chính** cho câu hỏi vì sao job fail. D1 và D2 là dữ liệu
đối chiếu: cache miss có thể đi cùng job thành công; cache hit bỏ qua `npm ci`.
Các step và trạng thái đã được kiểm tra từ jobs API, không suy từ tên run.

| Quan sát | Bằng chứng | Kết luận trong phạm vi log |
| :--- | :--- | :--- |
| D1: miss nhưng pass | Raw L152: `Cache not found`; L160: cài 426 packages trong 4s; L248–249: 4 suites / 6 tests pass | Cache miss là trạng thái bình thường, không tự gây fail. |
| D2: hit và pass | Raw L152–158: hit/restore đúng key; metadata: install skipped; L233–234: 4 suites / 6 tests pass | Đã khôi phục dependency và bỏ qua install. |
| D3: miss rồi fail | Raw L136: miss; L141–149: `EUSAGE`, lockfile không đồng bộ; L170: exit code 1; metadata: Jest skipped | Bước gây failure là `npm ci` do package/lockfile không đồng bộ. Cache step vẫn success. |
| B: hit nhưng fail | Raw B L142: restore; L164: coupon fail; L370: exit code 1 | Cache hit không bảo đảm test pass. |

D1 và D2 có cùng cache key
`Linux-node22-2f3eac8abb565c22115e9ae737db1bc744052bd101c014226be205b3294cfa18`.
Theo timestamp step API: D1 install 19:40:37–19:40:41 (**4 giây**);
D2 cache restore step 03:49:01–03:49:02 (**1 giây**), install skipped.
Hai đại lượng là hai bước khác nhau và hai commit khác nhau; đây là so sánh
mô tả, **chưa phải benchmark kiểm soát để tính tốc độ cải thiện**.

Workflow D1 có câu `echo` ghi cứng `~60s`/`~5s`. Đó là nội dung script, không
phải số đo từ runner. Bản raw giữ nguyên; không dùng các số này làm kết quả.
Workflow D2 đã bỏ hai số ghi cứng; bản snapshot lưu trong `source/` để đối chiếu.

## 5. Cách tải, trích và che dữ liệu

1. REST API `GET /repos/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs?per_page=100`
   trả về 25 run (total_count 25) ở thời điểm truy vấn. Lưu danh sách tóm tắt và
   phạm vi tìm kiếm trong `metadata/ghuy_run_search.json`.
2. Máy chưa có `gh` CLI. API công khai đọc được metadata nhưng tải ZIP log trả
   HTTP 403 khi chưa xác thực. Đã dùng credential GitHub sẵn có qua Git Credential
   Manager, chỉ giữ trong bộ nhớ; không lưu token vào tài liệu hoặc log.
3. Tải ZIP bằng `GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs`;
   chọn file top-level của Backend Test (B/D) hoặc SQLite demo (A) trong ZIP, không ghép
   lại các file step có thể làm trùng dòng. Tên member chính xác nằm trong metadata.
4. Lưu UTF-8, chuẩn hóa xuống dòng LF. Giữ toàn bộ dòng của job trong bản raw.
   Các dấu `***` GitHub đã che được giữ nguyên. Đã kiểm tra mẫu token GitHub,
   OpenAI và Google API; không phát hiện token cần che thêm trong 6 bản đã chọn.
   Những thay đổi bổ sung, nếu có, phải ghi lại trước khi chia sẻ.
5. Bản trích bỏ ANSI màu, thêm tiền tố `Lxxxx` tham chiếu dòng raw (đếm từ 1);
   mỗi khoảng trích có nhãn. Không sửa timestamp, số tiền, lỗi hoặc pass/fail.
   Các dòng ngoài khoảng đã ghi được lược bỏ; không lưu ZIP và log các job khác.
6. Lấy metadata job/step từ
   `GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/1/jobs?per_page=100`;
   lấy snapshot source bằng `git show <SHA>:<path>`. SHA-256 của raw nằm trong
   từng JSON để phát hiện thay đổi sau trích xuất; lấy thời điểm tải từ trường
   `extracted_at_utc`.

Để tải lại thủ công: mở run URL → chọn job → menu **… → Download log archive**
(hoặc **Download logs** trên trang run, tùy giao diện). Cần đăng nhập GitHub có
quyền đọc logs. Giữ ZIP gốc ngoài bộ hồ sơ chia sẻ, rà soát secret trước khi thêm.

## 6. Cách phát hồ sơ A — SQLite demo và giới hạn bằng chứng

Lượt tìm kiếm ban đầu không thấy SQLite lock trong log Backend Test của 25 run
lịch sử; giữ nguyên [nhật ký tìm kiếm](metadata/ghuy_run_search.json) để đối chiếu
phạm vi, không sửa kết quả tìm kiếm cũ thành dữ liệu của run mới.

Đã chuẩn bị nhánh `test/giahuy-sqlite-lock-demo`, commit demo `d35b932`, sau đó
commit `485a778` thêm timeout và bỏ npm audit tùy chọn ở bước cài dependency.
Mã nghiệp vụ không đổi. Hai kết nối dùng cùng database tạm trong **một tiến
trình Node**; đây không phải phép chạy nhiều Jest worker hay đo flake rate.

Phát hai excerpt A1/A2 cùng [source demo có số dòng](source/ghuy_sqlite_demo_485a778.txt)
và [workflow cùng commit](source/ghuy_sqlite_workflow_485a778.yml):

- Source S0023 đặt `busyTimeout=0`; S0054 dùng journal DELETE. S0059/S0061 mở
  transaction ghi của A; S0064 chỉ commit trước lượt B trong chế độ serial.
- A1 L0154–L0156: A giữ transaction, B INSERT nhận `SQLITE_BUSY`.
  L0160: exit code 1; metadata xác nhận bước cài dependency success, demo failure.
- A2 L0155–L0157: A đã COMMIT, B ghi sau đó; `PASS committedWrites=2`.
  Metadata xác nhận demo step và job success.
- Cả hai chạy trên cùng SHA, Linux / Node 22.23.3 / SQLite 3.52.0. Database
  được tạo riêng và dọn sau mỗi lượt; không truy cập `backend/database.sqlite`.

Lệnh đề xuất tái kiểm chứng, tại root của **nhánh demo** có dependency backend:

```powershell
node backend/demos/sqlite-lock.demo.cjs parallel
node backend/demos/sqlite-lock.demo.cjs serial
```

Workflow demo có kết luận failure vì job parallel cố ý giữ transaction để quan
sát lỗi lock thật; job serial vẫn pass nhờ matrix không fail-fast. Đây là
**CI reproduction có kiểm soát**, không chứng minh lỗi gốc của SUT do Jest
song song hoặc rằng `--runInBand` đã sửa lỗi SUT. Nhánh demo chưa merge main.

Hồ sơ A đã có nguồn CI; hồ sơ C async hiện vẫn là log local. Đã có đủ ảnh thật
cho bộ nguồn W6-18; chờ rà soát cuối và commit trước khi nghiệm thu.

## 7. Ảnh minh chứng cần chụp

Lưu ảnh thật vào `Weekly_Reports/Week06/screenshots/`. Mở đúng run/job nêu trên,
để thấy run URL/ID, tên step, kết quả và các dòng bằng chứng; có thể dùng hai ảnh
nếu không vừa màn hình. Không chụp token hoặc phần đăng nhập credential.

| Tên ảnh đề xuất | Nội dung cần thấy |
| :--- | :--- |
| `ghuy_03a_coupon_ci_failure.png` | Run B, job Backend Test: input coupon, Expected 100000 / Received -9000000 và step fail. |
| `ghuy_03b_cache_miss_pass.png` | Run D1: cache not found, install thành công và kết quả 6 test pass. |
| `ghuy_03c_cache_hit_pass.png` | Run D2: exact cache hit, install skipped trong danh sách step, job pass. |
| `ghuy_03d_cache_miss_install_failure.png` | Run D3: cache success/miss, `npm ci` EUSAGE/lockfile lệch, test skipped. |
| `ghuy_03e_sample_logs_index.png` | IDE Markdown Preview của index này và cây thư mục raw/excerpts/metadata/source. |
| `ghuy_03f_sqlite_ci_failure.png` | Run A: job SQLite demo (parallel), bước Demonstrate SQLite write ordering; thấy A giữ transaction, B SQLITE_BUSY và exit code 1. |
| `ghuy_03g_sqlite_serial_pass.png` | Cùng run A: job SQLite demo (serial), A COMMIT trước B và PASS committedWrites=2; job success. |

Ảnh là minh chứng bổ sung; raw log và metadata mới là dữ liệu để đối chiếu.

**Ảnh SQLite đã nhận và kiểm tra:**
[parallel lỗi lock](../../Weekly_Reports/Week06/screenshots/ghuy_03f_sqlite_ci_failure.png)
và [serial pass](../../Weekly_Reports/Week06/screenshots/ghuy_03g_sqlite_serial_pass.png).
Hai ảnh do sinh viên chụp, hiển thị đúng run/SHA/job và các dòng bằng chứng.
**Ảnh coupon/cache/index đã nhận và kiểm tra:**
[coupon fail](../../Weekly_Reports/Week06/screenshots/ghuy_03a_coupon_ci_failure.png),
[cache miss nhưng job pass](../../Weekly_Reports/Week06/screenshots/ghuy_03b_cache_miss_pass.png),
[cache hit, install skipped](../../Weekly_Reports/Week06/screenshots/ghuy_03c_cache_hit_pass.png)
và [index cùng cây thư mục](../../Weekly_Reports/Week06/screenshots/ghuy_03e_sample_logs_index.png).
Ảnh coupon thấy input/Expected/Received và bước Jest fail; ảnh cold thấy cache
miss, install/Jest success; ảnh warm thấy exact hit, restore và install skipped.
Ảnh trình duyệt không chứa URL/run ID trong khung chụp, nên dùng kèm raw log
và metadata trong index để đối chiếu nguồn.

Đã nhận và kiểm tra [ảnh install failure](../../Weekly_Reports/Week06/screenshots/ghuy_03d_cache_miss_install_failure.png):
EUSAGE/lockfile không đồng bộ, exit code 1, cache success và Jest skipped.
Bộ ảnh ghuy_03a–ghuy_03g hiện đầy đủ.
