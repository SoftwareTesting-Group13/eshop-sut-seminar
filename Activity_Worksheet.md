# Activity Worksheet — Pipeline Postmortem

**Nhóm 13 · Seminar T07: CI/CD & Test-Harness Engineering**

**Thời lượng:** 23 phút · **Hình thức:** nhóm 3–4 người · **Tổng điểm:** 10

> **Bản nháp W6-16 — 22/10/2026.** Đã có cấu trúc hoạt động và câu hỏi.
> Bộ log CI kèm run URL/commit còn chờ thu thập ở W6-18; đáp án và barem chi tiết
> thuộc W6-17. Bản này chưa được xác nhận sẵn sàng phát cho lớp.

| Thông tin nhóm | Điền câu trả lời |
| :--- | :--- |
| Tên nhóm / lớp | ................................................................ |
| Thành viên | ................................................................ |
| Người đọc log / kiểm tra code | ................................................................ |
| Người ghi kết quả / trình bày | ................................................................ |
| Bộ log / run ID được phát | ................................................................ |

## 1. Vai trò và mục tiêu

Bạn là nhóm DevOps phụ trách EShop. Một pipeline thất bại và nhóm cần lập bản
điều tra ngắn trước khi đề xuất thay đổi. Hãy dùng **log → giả thuyết → phép
kiểm chứng → hướng sửa**, phân biệt điều quan sát được với điều còn suy đoán.

Sau hoạt động, nhóm cần:

- Trích đúng dòng log làm bằng chứng và xác định bước/job xảy ra lỗi.
- Phân biệt lỗi khóa SQLite, lỗi nghiệp vụ coupon và lỗi chờ tác vụ bất đồng bộ.
- Đề xuất thay đổi nhỏ cùng lệnh kiểm tra kết quả sau sửa.
- Giải thích vì sao cache miss hoặc coverage cao chưa đủ kết luận pipeline pass/fail.

Không cần API key, không nạp credits hoặc gọi LLM trong hoạt động này. Nếu có
kết quả AI Triage được phát kèm, coi đó là một giả thuyết cần đối chiếu với log.

## 2. Lịch hoạt động

| Phút | Hoạt động | Đầu ra |
| :--- | :--- | :--- |
| 0–2 | Chia vai, đọc hướng dẫn và nguồn log | Phân công, xác nhận run/commit |
| 2–7 | Hồ sơ A — SQLite lock | Bằng chứng, giả thuyết, lệnh đối chứng |
| 7–12 | Hồ sơ B — Coupon percent | Giá trị đúng/sai, vị trí cần kiểm tra |
| 12–17 | Hồ sơ C — Async delay | Thứ tự hoàn tất và cách chờ tác vụ |
| 17–20 | Hồ sơ D — Cache & chất lượng bằng chứng | Phân biệt hiệu năng với kết quả kiểm thử |
| 20–23 | Chọn một kết luận để trình bày, nộp phiếu | Bản postmortem ngắn của nhóm |

Nếu cần 20 phút, rút mỗi hồ sơ A/B/C còn 4 phút. Nếu có 25 phút, thêm 2 phút
cho phần phản biện giữa các nhóm. Không dành thời gian trên lớp cho cài dependency.

## 3. Tài liệu được phát và cách đọc

Danh mục nguồn nằm tại [Materials/Sample_Logs/README.md](./Materials/Sample_Logs/README.md).
Mỗi bộ log CI chính thức cần ghi run URL/ID, commit SHA, job/step, môi trường,
trạng thái và phạm vi trích đoạn; giữ bản raw để có thể tra lại ngữ cảnh.

| Hồ sơ | Dữ liệu cần có | Tài liệu tham khảo khi soạn bản nháp |
| :--- | :--- | :--- |
| A — SQLite | Log lỗi lock và cấu hình chạy test của chính run đó | [Ảnh thực nghiệm tuần 5](./Weekly_Reports/Week05/screenshots/01_sqlite_busy_failure_mode.png) |
| B — Coupon | Log assertion, input coupon và mã nguồn cùng phiên bản sự cố | [Log local tuần 5](./Weekly_Reports/Week05/coupon_failure_mode2_huy.txt) |
| C — Async | Log sleep/await và giá trị độ trễ | [Log demo local](./Weekly_Reports/Week05/flaky_slow_huy.txt), [mã demo](./backend/demos/flaky-delay.demo.js) |
| D — Cache | Trạng thái hit/miss, install step và kết quả test/gate | [Workflow hiện tại](./.github/workflows/eshop-ci.yml) và log CI sẽ bổ sung |

**Lưu ý phiên bản:** `main` hiện tại đã dùng `backend/coupon-discount.js` với
công thức percent được sửa. Log coupon tuần 5 là sự cố lịch sử; mã lỗi tương ứng
có thể đối chiếu ở `backend/server.js` tại commit `6129c98`. Không khẳng định mã
hiện tại vẫn lỗi chỉ vì một log cũ báo fail. Các log local ở bảng trên chưa thay
thế yêu cầu thu thập log GitHub Actions thật của W6-18.

## 4. Hồ sơ A — SQLite lock (3 điểm, 5 phút)

Đọc log và cấu hình runner được phát. Với mỗi kết luận, ghi rõ bằng chứng hoặc
thông tin còn thiếu; không chỉ dựa vào tên của file log.

**A1 · 1 điểm:** Trích dòng thể hiện lỗi. Lỗi được báo ở job/step nào, và tác vụ
đang thực hiện là đọc dữ liệu, ghi dữ liệu hay chưa xác định được?

> Bằng chứng (tên file và dòng): ................................................
>
> Nhận xét / điều chưa biết: ..................................................

**A2 · 1 điểm:** Đề xuất một giả thuyết liên quan cách các test dùng database.
Nêu thông tin cần kiểm tra để phân biệt giả thuyết đó với lỗi logic assertion.

> Giả thuyết: .................................................................
>
> Phép kiểm chứng: ............................................................

**A3 · 1 điểm:** Ghi lệnh đối chứng giữa chạy song song và chạy tuần tự trên bản
repo kiểm thử. Nêu kết quả quan sát nào ủng hộ hoặc bác bỏ giả thuyết A2.

```text
Lệnh 1: ......................................................................
Lệnh 2: ......................................................................
Dự kiến quan sát để phân biệt: ................................................
```

Không chạy các lệnh này lên database có dữ liệu cần giữ. Các lần tái hiện phải
được thực hiện trước buổi học trên bản repo dùng kiểm thử.

## 5. Hồ sơ B — Coupon percent (3 điểm, 5 phút)

Ngữ cảnh của log local tham khảo: coupon `SAVE10`, loại `percent`, giá trị `10`,
tổng đơn `1.000.000`. Khi có log CI chính thức, dùng input và commit của run đó.

**B1 · 1 điểm:** Ghi giá trị `Expected` và `Received` trong log. Tính số tiền
giảm và số tiền còn lại theo yêu cầu giảm 10%; phân biệt assertion kiểm tra
một bất biến với assertion kiểm tra một giá trị cụ thể.

| Đại lượng | Theo log thực tế | Theo phép tính của nhóm |
| :--- | :--- | :--- |
| `discount_amount` | ........................ | ........................ |
| `final_amount` | ........................ | ........................ |

**B2 · 1 điểm:** Vị trí stack trace trong file test cho biết nơi phát hiện lỗi
hay chắc chắn là nơi gây lỗi? Chỉ ra phép tính hoặc dữ liệu cần đọc ở đúng
commit sự cố và giải thích giả thuyết nguyên nhân.

> File / commit cần kiểm tra: ..................................................
>
> Giả thuyết và căn cứ: ........................................................

**B3 · 1 điểm:** Đề xuất công thức hoặc đoạn sửa nhỏ, cùng một lệnh kiểm thử
phù hợp để kiểm chứng. Nêu điều kiện giúp so sánh trước/sau có ý nghĩa.

```text
Đề xuất sửa: ..................................................................
Lệnh kiểm tra: ...............................................................
Giữ nguyên / ghi lại điều kiện nào: ...........................................
```

## 6. Hồ sơ C — Async delay (3 điểm, 5 phút)

Đọc các dòng `[FM3][sleep]` và `[FM3][await]`. Đây là demo có can thiệp độ trễ
để minh họa cơ chế chờ sai, không tự chứng minh API EShop có race condition.

**C1 · 1 điểm:** Dựa vào `workDelayMs`, `waitMs` và `ready`, vẽ thứ tự sự kiện
cho lượt chạy chậm. Tại thời điểm assertion, tác vụ đã hoàn tất chưa?

```text
Bắt đầu tác vụ → .............................................................
Thời điểm assertion → ........................................................
Tác vụ hoàn tất → ............................................................
```

**C2 · 1 điểm:** Đề xuất cách chờ thay cho khoảng sleep cố định. Giải thích
điều kiện mà cách chờ đó bảo đảm trước khi assertion chạy, và vì sao tăng sleep
hoặc thêm `--runInBand` chưa phải bằng chứng đã loại bỏ nguyên nhân.

> Đề xuất: ....................................................................
>
> Lập luận: ...................................................................

**C3 · 1 điểm:** Một lượt fail hoặc hai lượt fast/slow có đủ để báo cáo flake
rate trên CI chưa? Nêu cách thiết kế 10 lượt trước/sau sao cho có thể kiểm tra
lại kết quả, đồng thời phân biệt lỗi assertion dự kiến với lỗi môi trường.

> Dữ liệu và điều kiện cần ghi: ................................................
>
> Cách tính / phân loại kết quả: ...............................................

## 7. Hồ sơ D — Cache và phạm vi kết luận (1 điểm, 3 phút)

**D1 · 1 điểm:** Từ log được phát, xác định hit/miss, install step có chạy
không, và test/gate thực sự pass hay fail. Cache miss có tự làm pipeline fail
không? Nếu coverage cao nhưng assertion fail, cần dựa vào kiểm tra nào để quyết
định kết quả? Nêu cách đối chiếu cold/warm với cùng môi trường và dependency.

| Quan sát | Bằng chứng từ log / artifact |
| :--- | :--- |
| Cache hit/miss | ........................................................ |
| Cài dependency và thời gian đo | ........................................................ |
| Kết quả test/gate, phạm vi coverage | ........................................................ |

> Kết luận và giới hạn của phép so sánh: .......................................

## 8. Bản postmortem của nhóm (3 phút cuối)

Chọn một hồ sơ A/B/C để trình bày trong tối đa 60 giây. Phần này tổng hợp câu
trả lời phía trên, không cộng thêm điểm ngoài thang 10.

| Nội dung | Kết luận của nhóm |
| :--- | :--- |
| Hiện tượng, run/commit | ........................................................ |
| Bằng chứng mạnh nhất | ........................................................ |
| Nguyên nhân nghi ngờ / đã kiểm chứng | ........................................................ |
| Thay đổi đề xuất | ........................................................ |
| Lệnh và kết quả cần có để xác nhận | ........................................................ |
| Thông tin còn thiếu | ........................................................ |

Trước khi nộp: kiểm tra tổng điểm A/B/C/D = **3 + 3 + 3 + 1 = 10**, tên nhóm,
nguồn bằng chứng và phần phân biệt quan sát với giả thuyết. Không điền số liệu
chạy test/CI chưa quan sát được. Đáp án và barem chi tiết sẽ phát sau hoạt động.
