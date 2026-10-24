# Answer Key & Barem — Pipeline Postmortem

**Nguyễn Gia Huy · W6-17 · Nhóm 13 · Ngày soạn: 22/10/2026**

**Dành cho người điều phối/chấm bài. Không phát kèm phiếu khi sinh viên đang làm.**

Đáp án tương ứng [Activity Worksheet](Activity_Worksheet.md), hoạt động 23 phút,
nhóm 3–4 người. Tổng điểm **10**, gồm A/B/C mỗi phần 3 điểm và D 1 điểm.
**Barem 10 điểm đã được tập thể Nhóm 13 phê duyệt và thống nhất chính thức.**

## 1. Nguồn và nguyên tắc chấm

| Hồ sơ | Dữ liệu dùng để chấm | Loại nguồn / phiên bản |
| :--- | :--- | :--- |
| A | [Parallel fail](Materials/Sample_Logs/excerpts/ghuy_sqlite_parallel_39741620266.txt), [serial pass](Materials/Sample_Logs/excerpts/ghuy_sqlite_serial_39741620266.txt), [source demo](Materials/Sample_Logs/source/ghuy_sqlite_demo_485a778.txt) | CI tái hiện có kiểm soát, run 39741620266, SHA 485a778; hai kết nối trong một tiến trình. |
| B | [Log coupon](Materials/Sample_Logs/excerpts/ghuy_coupon_failure_38866929295.txt), [input/assertion](Materials/Sample_Logs/source/ghuy_coupon_coupon_test_js_6129c98.txt), [source lỗi](Materials/Sample_Logs/source/ghuy_coupon_server_js_6129c98.txt) | CI lịch sử, run 38866929295, SHA 6129c98; không dùng code main đã sửa để mô tả sự cố. |
| C | [Log slow](Weekly_Reports/Week05/flaky_slow_huy.txt), [snapshot source](Materials/Sample_Logs/source/ghuy_async_demo_575e6be.txt) | Source kiểm tra tại SHA 575e6be, khớp file làm việc. Log local cũ không ghi SHA lúc chạy; không khẳng định đã truy nguyên chính xác revision của lượt chạy đó. |
| D | [D3: install fail](Materials/Sample_Logs/excerpts/ghuy_cache_miss_install_failure_38790291172.txt), [metadata step](Materials/Sample_Logs/metadata/ghuy_cache_miss_install_failure_38790291172.json), [workflow sự cố](Materials/Sample_Logs/source/ghuy_cache_miss_install_failure_38790291172_workflow.yml); đối chiếu [D1: miss/pass](Materials/Sample_Logs/excerpts/ghuy_cache_cold_pass_38795826028.txt) và [D2: hit/pass](Materials/Sample_Logs/excerpts/ghuy_cache_warm_pass_38847386315.txt) | CI lịch sử, D3 run 38790291172 / SHA e601f21; D3 là tình huống chính, D1/D2 là đối chiếu. |

Đầy đủ raw log, run URL/SHA và thông tin đã lược bỏ tại
[index Sample Logs](Materials/Sample_Logs/README.md).
`Lxxxx` là số dòng raw được giữ trong excerpt; `Sxxxx` là số dòng source.
Với C, log local đếm dòng file từ 1; snapshot source đã đánh số Sxxxx.

Revision đầy đủ: A `485a77881b7c7be487af71805147bca1a1ae9d0e`;
B `6129c98350db5294f7c3127741ab5a564cab4b66`;
C (code đã kiểm tra) `575e6be97db370143bc0c31ed88741b91acca0ca`;
D3 `e601f2198f5d11e23111f1a2d45872b983846171`.
Các SHA ngắn bên dưới tham chiếu các revision này, không trỏ ngầm tới main mới nhất.

- Chấm ý đúng và bằng chứng, chấp nhận cách diễn đạt/cú pháp tương đương.
  Chấp nhận giải pháp khác nếu giải thích được cơ chế và có bằng chứng hợp lệ;
  chấm theo mục tiêu của tiêu chí, không bắt buộc trùng đáp án mẫu.
- Mỗi câu tối đa 1 điểm. Cho điểm từng tiêu chí độc lập; không trừ điểm âm.
- Câu không trả lời hoặc không có ý đúng nhận 0 cho tiêu chí tương ứng.
- Khi yêu cầu dẫn chứng, chấp nhận mã dòng hoặc trích đoạn đủ xác định vị trí.
  Số dòng đánh lại trên bản phát khác số dòng raw vẫn hợp lệ nếu ánh xạ đúng.
- Lệnh là đề xuất kiểm chứng; không yêu cầu thực thi trên lớp hoặc kết quả pass mới.
  Chấp nhận lệnh từ thư mục khác nếu sinh viên ghi rõ thư mục và đường dẫn đúng.
- Phần tóm tắt/trình bày không cộng điểm, câu mở rộng không làm vượt thang 10.
- Các mục code/nguyên nhân/khắc phục/xác nhận hỗ trợ người chấm, không thêm
  yêu cầu chấm ngoài câu hỏi được phát. Đáp án chưa được chạy kiểm chứng sau sửa
  thì chỉ ghi “đề xuất”, không biến giả thuyết thành root cause đã xác nhận.

### Sai khác với mô tả kế hoạch tuần

[Week6Plan.md](Plan/Week6Plan.md), dòng 68, mô tả `discount_amount` âm “khi số
tiền giảm lớn hơn tổng đơn hàng”. Code/log tại 6129c98 cho thấy chuỗi khác:
`total_amount * (1 - discount_value)` với total dương và discount_value > 1
làm **discount_amount âm trước**, rồi `final_amount = total - discount` tăng
vượt tổng. Với SAVE10: discount -9000000, final +10000000; **final không âm**.
Đây không phải lỗi đúng công thức nhưng chưa giới hạn số tiền giảm tối đa.

Điều kiện đi vào nhánh: coupon hoạt động được tìm thấy, tổng đơn vượt ngưỡng
min theo toán tử `>` ở server.js:379, chưa hết hạn; nếu có user_id còn phải
qua kiểm tra giới hạn sử dụng. Hai nhánh percent dùng cùng công thức sai.
Xem [ngữ cảnh route](Materials/Sample_Logs/source/ghuy_coupon_route_context_6129c98.txt)
và snapshot phép tính. Trường hợp tổng bằng min là lỗi biên riêng; không gộp
với lỗi công thức. Phân tích này áp dụng bản sự cố, không khẳng định main còn lỗi.

Kế hoạch dòng 208 gọi “lỗi npm cache miss”, nhưng D3 chứng minh failure tại
install vì lockfile không đồng bộ; cache miss đơn lẻ không phải nguyên nhân
được xác nhận. Demo A cũng chưa chứng minh lỗi SUT do Jest parallel nêu ở kế hoạch.

## 2. Hồ sơ A — SQLite lock (3 điểm)

### A1 — Nhận diện lỗi (1 điểm)

**Đáp án:** Kết nối B không ghi được vì database đang bị khóa cho lượt ghi.
Excerpt parallel L0156 ghi `code=SQLITE_BUSY` và `database is locked`;
L0160 ghi process exit code 1.

**Code/revision:** `backend/demos/sqlite-lock.demo.cjs` @485a778,
`main()` dòng 41–95; B INSERT/catch tại S0070–S0073. `run()` dòng 28–30
truyền lỗi SQLite về caller. Log xác nhận loại lỗi, chưa tự chứng minh nguyên
nhân của một SUT khác. **Khắc phục/xác nhận:** dùng thứ tự COMMIT trước B như
A2/A3; kiểm tra serial có đủ hai dòng ghi và không còn SQLITE_BUSY.

| Tiêu chí | Điểm |
| :--- | ---: |
| Nhận diện đúng lỗi SQLite busy/lock, không chỉ nói chung “pipeline fail” | 0.5 |
| Trích dòng lỗi cụ thể, ví dụ L0156 hoặc L0159 của excerpt parallel | 0.5 |

### A2 — Giả thuyết và thông tin kiểm tra (1 điểm)

**Đáp án:** A còn giữ transaction ghi trên file DB chung khi B INSERT, nên B
không lấy được quyền ghi. Kiểm tra thời điểm COMMIT của A, file DB mà hai kết
nối mở và cấu hình `busyTimeout`.

Bằng chứng: parallel L0154–L0156 cho thấy transaction A mở lúc B ghi.
Source S0059 dùng `BEGIN IMMEDIATE`, S0061 ghi A; S0064 chỉ COMMIT trước B
trong chế độ serial; S0023 đặt `busyTimeout=0`. Serial L0155–L0157 cho thấy
COMMIT trước lượt B rồi ghi đủ hai dòng.

**Code/revision:** `main()` trong `backend/demos/sqlite-lock.demo.cjs` @485a778,
S0053–S0070; `open()` S0019–S0027 cấu hình timeout. **Nguyên nhân trong demo:**
thứ tự giữ transaction và kết quả cặp CI ủng hộ cơ chế tranh chấp ghi; không
suy rộng thành root cause SUT. **Khắc phục/xác nhận:** hoàn tất/COMMIT A trước B,
chạy cặp lệnh A3 cùng SHA; serial phải ghi đủ 2 dòng, không có lỗi lock.

| Tiêu chí | Điểm |
| :--- | ---: |
| Nêu đúng khả năng tranh chấp ghi do transaction A còn giữ lock trên DB chung | 0.5 |
| Nêu một thông tin cần kiểm tra liên quan: thứ tự COMMIT/INSERT, file DB chung hoặc busyTimeout | 0.5 |

Không coi đây là bằng chứng nhiều Jest worker gây lỗi SUT. Demo có một tiến
trình, hai kết nối và database tạm. Chỉ tăng timeout chưa xử lý việc transaction
A cố ý giữ mở cho đến khi B đã thử ghi; cần xem vòng đời transaction.

### A3 — Hai lệnh kiểm chứng (1 điểm)

**Đáp án mẫu:** Tại root của nhánh `test/giahuy-sqlite-lock-demo`, có dependency
backend và source đúng SHA của hồ sơ:

```powershell
node backend/demos/sqlite-lock.demo.cjs parallel
node backend/demos/sqlite-lock.demo.cjs serial
```

**Code/revision:** `main(selectedMode)` @485a778, S0063–S0078: serial COMMIT
trước B và kiểm tra số dòng; parallel chủ đích giữ transaction. **Bằng chứng:**
parallel L0156/L0160 (SQLITE_BUSY/exit 1), serial L0155–L0157 (COMMIT rồi PASS).
**Xác nhận:** ghi exit code, thông báo lỗi và số dòng committed của cả hai lệnh.
Đây là thay đổi thứ tự thực thi trong demo, không phải bản sửa SUT được xác nhận.

| Tiêu chí | Điểm |
| :--- | ---: |
| Lệnh đúng chạy demo chế độ parallel | 0.5 |
| Lệnh đúng chạy cùng demo chế độ serial | 0.5 |

Kết quả trong CI đã phát: parallel SQLITE_BUSY/exit 1; serial
`PASS committedWrites=2`/job success. Chỉ viết `jest --runInBand` không chạy
được demo Node độc lập này nên không đáp ứng tiêu chí lệnh tương ứng.

## 3. Hồ sơ B — Coupon percent (3 điểm)

### B1 — Thực tế và kết quả đúng (1 điểm)

Input: `SAVE10`, tổng đơn `1000000`, giảm `10%`. Source test S0038 và log
L0177 mô tả yêu cầu. Log L0182 là discount thực tế; L0301 là final thực tế.

**Code/revision:** route callback `app.post('/api/apply-coupon', ...)` trong
`backend/server.js` @6129c98 bắt đầu dòng 363; phép tính tại 399–406 và 419–425.
Callback `test.each` ở `backend/tests/coupon.test.js`:45–52 kiểm tra response;
helper `applyCoupon` ở dòng 16 gửi request. **Nguyên nhân/khắc phục:** công thức
percent sai nêu tại B2, đề xuất sửa tại B3. **Xác nhận:** sau sửa, kiểm tra chính
input này trả discount 100000, final 900000; không chỉ kiểm tra HTTP 200.

| Đại lượng | Thực tế trong log | Kết quả đúng do nhóm tính |
| :--- | ---: | ---: |
| `discount_amount` | -9000000 | 100000 |
| `final_amount` | 10000000 | 900000 |

**Barem:** Mỗi ô số đúng 0.25 điểm, tổng 4 ô = 1 điểm. Chấp nhận dấu phân cách
hàng nghìn nếu giá trị không đổi. Hai Received thuộc hai ca test riêng với cùng
input; không mô tả như một bản dump response duy nhất.

### B2 — Xác định phép tính gây sai (1 điểm)

**Đáp án:** Công thức percent dùng `total_amount * (1 - coupon.discount_value)`.
Với giá trị 10, phép tính thành `1000000 * (1 - 10) = -9000000`.
Tiền cuối là `1000000 - (-9000000) = 10000000`, khớp giá trị sai trong log.

Source sự cố: `backend/server.js` tại SHA 6129c98, S0399–S0401 hoặc
S0419–S0421; phép tính final tại S0406/S0425. Stack trace ở test là nơi phát
hiện lỗi, không phải vị trí công thức nghiệp vụ gây lỗi.

**Code/revision và điều kiện:** callback route `app.post('/api/apply-coupon', ...)` từ dòng
363 @6129c98; nhánh có user_id ở 386, nhánh không user_id từ 416, điều kiện
type percent tại 398/418. Input tổng 1000000, percent 10 đã đi qua các guard.
Log B L0182 và L0301 ghi hai giá trị sai; phép thế tái tạo chính xác Received.
Đây là giải thích có code/log hỗ trợ,
chưa phải xác nhận bằng một lượt chạy bản sửa. **Khắc phục/xác nhận:** B3;
đối chiếu cả discount lẫn final, hai nhánh user_id và test fixed để tránh hồi quy.

| Tiêu chí | Điểm |
| :--- | ---: |
| Chỉ đúng công thức percent sai và giải thích được với input 10% | 0.5 |
| Chỉ đúng file/vị trí code sự cố, chấp nhận một trong hai nhánh tính percent | 0.5 |

Raw còn các lỗi biên khác; không quy toàn bộ 8 test fail của run cho công thức này.

### B3 — Công thức sửa và lệnh kiểm chứng (1 điểm)

**Đáp án mẫu:**

```javascript
discount_amount = Math.floor(total_amount * coupon.discount_value / 100);
const final_amount = total_amount - discount_amount;
```

Lệnh đề xuất từ root của bản kiểm thử chứa test coupon tương ứng:

```powershell
npm --prefix backend test -- tests/coupon.test.js -t "Failure Mode 2"
```

| Tiêu chí | Điểm |
| :--- | ---: |
| Công thức tính đúng số tiền giảm theo percent; cách làm tròn phù hợp yêu cầu | 0.5 |
| Lệnh Jest/npm hợp lệ nhắm vào test coupon liên quan | 0.5 |

Chấp nhận chạy toàn file `tests/coupon.test.js`, hoặc lọc ca SAVE10 phù hợp.
Việc sửa/tái chạy trên bản sự cố là đề xuất, chưa thực hiện trong bước soạn
đáp án. Không hứa toàn bộ test pass vì bộ test còn kiểm tra lỗi biên khác.

**Code/revision:** sửa phép tính trong callback route @6129c98 tại 399–401 và
419–421, giữ cách tính final tại 406/425. **Bằng chứng/tiêu chí xác nhận:** B
L0182/L0301 là baseline lỗi. Sau sửa, SAVE10 đơn 1000000 phải giảm 100000,
còn 900000, giá trị không âm và không vượt tổng; test cả có/không user_id.
Ca fixed cần giữ đúng kết quả. Chạy lại lọc Failure Mode 2 để kiểm tra bất biến,
thêm ca SAVE10 kiểm tra giá trị cụ thể; không nới assertion để che lỗi.

## 4. Hồ sơ C — Async delay (3 điểm)

### C1 — Thứ tự sự kiện (1 điểm)

| Sự kiện | Đáp án |
| :--- | :--- |
| Bắt đầu tác vụ | `ready=false`, profile slow chọn `workDelayMs=200`. |
| Kiểm tra assertion | Test sleep chờ `waitMs=100`; log quan sát `ready=false`, assertion mong true nên fail. |
| Tác vụ hoàn tất | Khi promise hoàn tất, callback đặt `ready=true`; code slow có độ trễ cấu hình 200 ms. |

Nguồn: log local dòng 5 và 19–20; source dòng 7, 15–23, 31–35.
200/100 ms là **độ trễ cấu hình**, không phải timestamp đo chính xác việc thực
thi; timer có thể chạy muộn. Dòng log await ready=true ở dòng 10 thuộc test
thứ hai tạo tác vụ riêng, không phải log kết thúc tác vụ của test thứ nhất.

**Code/revision:** `backend/demos/flaky-delay.demo.js` @575e6be,
`startAsyncWork()` dòng 19–25, callback test sleep dòng 28–40. **Nguyên nhân:**
assertion kiểm tra readiness sau thời gian cố định, không phụ thuộc completion.
Log chỉ chứng minh thứ tự của lượt slow này. **Khắc phục/xác nhận:** C2;
trên bản đã đổi sang chờ completion, kiểm tra assertion thấy ready=true cả
khi chọn profile slow, không kết luận chỉ từ thời gian cả test suite.

| Tiêu chí | Điểm |
| :--- | ---: |
| Trạng thái ban đầu false và công việc được cấu hình 200 ms | 0.25 |
| Assertion sau khoảng chờ 100 ms, quan sát false nên fail | 0.5 |
| Đặt hoàn tất sau assertion trong lượt slow quan sát được; callback đổi ready thành true | 0.25 |

### C2 — Chờ đúng tác vụ (1 điểm)

**Đáp án mẫu:** Đặt chờ promise hoàn tất **trước** assertion:

```javascript
const job = startAsyncWork();
await job.completed;
expect(job.state.ready).toBe(true);
```

Promise `job.completed` resolve sau callback đặt `ready=true`, nên assertion
được thực hiện sau khi công việc hoàn tất. Source dòng 42–48 và log dòng 10
minh họa cách này. `await job.completed` trong `finally` của test lỗi (dòng 38)
chỉ dọn tác vụ sau assertion, không sửa thứ tự kiểm tra trước đó.

| Tiêu chí | Điểm |
| :--- | ---: |
| Đề xuất await đúng promise hoàn tất trước assertion, hoặc đồng bộ tương đương | 0.5 |
| Giải thích quan hệ hoàn tất công việc → kiểm tra trạng thái, thay cho đoán khoảng sleep | 0.5 |

Chỉ tăng sleep hoặc thêm `--runInBand` không đáp ứng tiêu chí chờ đúng tác vụ.
`await startAsyncWork()` cũng không tương đương: hàm trả object chứa promise,
không trực tiếp trả promise hoàn tất công việc.

**Code/revision:** `startAsyncWork()` @575e6be dòng 19–25 trả object chứa
promise; callback test await dòng 42–49 chờ promise đó trước assertion.
**Bằng chứng:** log C dòng 5 và 19–20 cho test sleep fail; dòng 10 và 33 cho
control await ready=true, một test pass. **Cách xác nhận đề xuất:** sau khi sửa
test sleep, chạy profile fast và slow bằng `npm --prefix backend run test:flaky`
(PowerShell đặt `$env:FLAKY_PROFILE = 'fast'` hoặc `'slow'` trước mỗi lần).
Hai test cần pass, không có assertion trước completion hoặc timer rò rỉ. Bản
baseline vẫn có một test cố ý sai, nên chạy lại baseline slow vẫn dự kiến fail.

### C3 — Bằng chứng về tính chập chờn (1 điểm)

**Đáp án:** Cần các lượt lặp trên cùng phiên bản test/code và cấu hình được ghi
rõ, lưu pass/fail, profile, độ trễ và môi trường. Muốn kết luận có chập chờn
trong điều kiện đang xét cần quan sát pass và fail, rồi phân biệt lỗi timing
với lỗi setup/môi trường.

Profile fast/slow là thay đổi độ trễ có chủ đích; random cũng là chọn độ trễ
trong demo. Các lượt này không tự chứng minh flake rate của SUT trên CI.

| Tiêu chí | Điểm |
| :--- | ---: |
| Đề xuất lặp lại, giữ/ghi rõ phiên bản và điều kiện chạy | 0.5 |
| Cần kết quả pass/fail qua nhiều lượt và đối chiếu nguyên nhân; nhận ra một fail chưa đủ | 0.5 |

Không yêu cầu benchmark 10 lượt trên lớp. Nếu đề xuất tính tỷ lệ, đó là phép đo
tương lai, không ghi số liệu chưa thu thập vào đáp án.

**Code/revision:** chọn profile/delay trong `backend/demos/flaky-delay.demo.js`
@575e6be dòng 6–17; `startAsyncWork()` 19–25, hai callback test 28–49.
**Bằng chứng/giới hạn:** log C dòng 5/10/33 chỉ là một lượt slow với hai test
khác nhau, không phải một test vừa pass vừa fail qua nhiều lượt. **Khắc phục/
xác nhận:** giữ cấu hình và protocol chạy lặp cho bản baseline và bản chờ đúng
completion; lưu số pass/fail và loại lỗi từng lượt. Các lượt đều pass chỉ hỗ
trợ cải thiện trong mẫu đo, không chứng minh flake rate bằng 0 trong mọi điều kiện.

## 5. Hồ sơ D — Cache và pipeline (1 điểm)

### D1 — Xác định bước gây fail (1 điểm)

**Đáp án cho D3:** Cache miss là trạng thái được phép; nguyên nhân trực tiếp
làm job fail là `npm ci` báo `EUSAGE` vì package.json và lockfile không đồng bộ.

| Quan sát | Bằng chứng |
| :--- | :--- |
| Cache miss | Excerpt D3 L0136: cache not found; L0130: fail-on-cache-miss=false. |
| Bước gây failure | L0141–L0143: EUSAGE và yêu cầu lockfile đồng bộ; L0170: exit code 1. |
| Test/gate | Metadata D3: cache success, install failure, Jest skipped; workflow lịch sử không có Quality Gate. |

D1 cold đối chiếu: L0152 miss, L0160 install thành công, L0248–L0249 tests
pass. D2 warm: hit/restore, metadata install skipped, tests pass. Không coi
các số echo ghi cứng ~60s/~5s trong workflow cũ là số đo hoặc benchmark.

| Tiêu chí | Điểm |
| :--- | ---: |
| Phân biệt cache miss với failure, không kết luận miss tự làm pipeline fail | 0.25 |
| Xác định npm ci fail vì package/lockfile không đồng bộ | 0.5 |
| Dẫn bằng chứng cụ thể EUSAGE/lockfile/exit code, ví dụ L0143 hoặc L0170 | 0.25 |

Không yêu cầu sinh viên cài lại dependency hoặc xóa cache. Nếu cần sửa trong
môi trường tái hiện: đồng bộ manifest/lockfile rồi kiểm tra lại bằng npm ci;
đó là hướng kiểm chứng tiếp theo, không phải kết quả đã thực hiện trong bài.

**Code/revision:** `.github/workflows/eshop-ci.yml` @e601f21, job
`backend-test`: cache step dòng 61–68, install step 70–74 (điều kiện 73,
`npm ci` dòng 74), test step 89–92. Đây là YAML/shell step, không có hàm JS.
**Nguyên nhân đã quan sát:** npm từ chối lockfile lệch; log chưa xác định ai/
commit nào làm lockfile lệch. **Thay đổi đề xuất:** cập nhật lockfile khớp
manifest bằng phiên bản Node/npm phù hợp trên nhánh kiểm thử, review diff rồi
chạy `npm --prefix backend ci` và `npm --prefix backend test` từ root.
**Xác nhận:** install exit 0, dependency tree đồng bộ; Jest thực sự chạy thay
vì skipped, ghi kết quả test riêng. Nếu assertion fail sau đó thì đó là lỗi
khác, không coi install fix đã làm toàn pipeline pass. Không sửa trong giờ làm bài.

## 6. Bảng tổng điểm và phần trình bày

| Câu | Điểm tối đa |
| :--- | ---: |
| A1 | 1 |
| A2 | 1 |
| A3 | 1 |
| B1 | 1 |
| B2 | 1 |
| B3 | 1 |
| C1 | 1 |
| C2 | 1 |
| C3 | 1 |
| D1 | 1 |
| **Tổng** | **10** |

Ví dụ tóm tắt hồ sơ B, không cộng thêm điểm:

| Nội dung | Câu trả lời mẫu |
| :--- | :--- |
| Hiện tượng + bằng chứng | Coupon SAVE10 trả discount -9000000 (log B L0182). |
| Nguyên nhân + hướng sửa | Công thức percent sai tại server.js S0400/S0420; tính discount_value / 100. |
| Cách xác nhận | Đề xuất chạy lại test coupon Failure Mode 2 trên bản kiểm thử sau sửa. |

Hai nhóm trình bày tối đa 60 giây/nhóm trong 3 phút cuối. Các nhóm khác nộp
phiếu và đối chiếu; không thêm tiêu chí trình bày vào điểm của 10 câu.

Trước khi chốt: người điều phối đọc lại phiếu/đáp án, đảm bảo đã phát đủ dữ liệu
A/B/C/D, thử chấm một bài mẫu và chụp preview thật
`Weekly_Reports/Week06/screenshots/ghuy_02_answerkey_rubric.png`.
