# Activity Worksheet — Pipeline Postmortem

**Nhóm 13 · Seminar T07: CI/CD & Test-Harness Engineering**

**Thời lượng:** 23 phút · **Nhóm:** 3–4 người · **Tổng điểm:** 10

**Bản thiết kế để rà soát — sử dụng cùng bộ hồ sơ A–D do điều phối phát.**

| Thông tin nhóm | Điền câu trả lời |
| :--- | :--- |
| Tên nhóm / lớp | ................................................................ |
| Thành viên | ................................................................ |
| Người đọc log / người ghi kết quả | ................................................................ |
| Mã bộ hồ sơ được phát | ................................................................ |

## 1. Cách làm bài

Bạn là nhóm DevOps điều tra một pipeline EShop thất bại. Hãy đưa ra kết luận
dựa trên **bằng chứng → giả thuyết → cách kiểm tra → hướng sửa**.

1. Đọc trích đoạn log/code được phát cùng từng hồ sơ và ghi mã dòng làm bằng chứng.
2. Thảo luận, điền câu trả lời ngắn và viết lệnh kiểm tra đề xuất vào phiếu.
   **Không bắt buộc cài repo, sửa code hoặc chạy test trên lớp.**
3. Dùng đúng phiên bản code/run đi kèm log. Nếu thiếu thông tin, ghi rõ chưa đủ
   bằng chứng; không suy đoán kết quả chạy lệnh như thể đã quan sát được.
4. Mọi nhóm nộp phiếu. Điều phối chọn **2 nhóm trình bày**, mỗi nhóm tối đa 60 giây.

Không cần API key hoặc gọi LLM để làm bài. Kết quả AI, nếu được phát kèm, vẫn
cần được kiểm tra bằng log và mã nguồn.

## 2. Tiến trình 23 phút

| Phút | Hoạt động |
| :--- | :--- |
| 0–2 | Chia vai, đọc hướng dẫn và xác định bộ hồ sơ |
| 2–7 | Hồ sơ A — SQLite lock |
| 7–12 | Hồ sơ B — Coupon percent |
| 12–17 | Hồ sơ C — Async delay |
| 17–20 | Hồ sơ D — Cache; hoàn thiện bản tóm tắt ở cuối phiếu |
| 20–23 | Hai nhóm trình bày, các nhóm còn lại đối chiếu và tất cả nộp phiếu |

## 3. Hồ sơ A — SQLite lock (3 điểm, 5 phút)

**Đọc:** hai trích đoạn CI A1/A2 và code demo trong bộ hồ sơ. Đây là tái hiện
có kiểm soát: hai kết nối dùng chung database tạm trong một tiến trình Node,
chế độ `parallel` giữ transaction chồng thời điểm; không phải nhiều Jest worker.
**Mã nguồn/run của hồ sơ:** ...................................................

**A1 · 1 điểm:** Trích một dòng log xác định lỗi database đang xảy ra.

> Dòng log / số dòng: .........................................................

**A2 · 1 điểm:** Nêu một giả thuyết về cách hai lượt ghi dùng database và một
thông tin trong hồ sơ cần kiểm tra để xác nhận giả thuyết đó.

> Giả thuyết: ................................................................
>
> Thông tin cần kiểm tra: .....................................................

**A3 · 1 điểm:** Viết hai lệnh đề xuất để so sánh hai chế độ demo
`parallel` (ghi chồng transaction) và `serial` (ghi tuần tự).

```text
Lệnh chế độ parallel: ........................................................
Lệnh chạy tuần tự: ............................................................
```

## 4. Hồ sơ B — Coupon percent (3 điểm, 5 phút)

**Đọc:** trích đoạn B gồm input coupon, assertion và phép tính ở phiên bản sự cố.
**Mã nguồn/run của hồ sơ:** ...................................................

**B1 · 1 điểm:** Điền số tiền thực tế trong log và số tiền đúng theo yêu cầu
coupon được phát.

| Đại lượng | Thực tế trong log | Kết quả đúng do nhóm tính |
| :--- | :--- | :--- |
| `discount_amount` | ........................ | ........................ |
| `final_amount` | ........................ | ........................ |

**B2 · 1 điểm:** Chỉ ra phép tính hoặc dữ liệu có thể gây ra giá trị sai trong
hồ sơ, kèm vị trí code làm bằng chứng.

> Giả thuyết nguyên nhân: .....................................................
>
> File / vị trí code: .........................................................

**B3 · 1 điểm:** Đề xuất sửa công thức và một lệnh chạy lại test liên quan.

```text
Công thức đề xuất: ............................................................
Lệnh kiểm tra: ...............................................................
```

## 5. Hồ sơ C — Async delay (3 điểm, 5 phút)

**Đọc:** trích đoạn C gồm `workDelayMs`, `waitMs`, `ready` và đoạn code chờ tác vụ.
**Mã nguồn/run của hồ sơ:** ...................................................

**C1 · 1 điểm:** Điền thứ tự sự kiện của lượt chạy chậm từ dữ liệu được phát.

| Sự kiện | Thời điểm/độ trễ cấu hình và trạng thái từ hồ sơ |
| :--- | :--- |
| Bắt đầu tác vụ | ................................................ |
| Kiểm tra bằng assertion | ................................................ |
| Tác vụ hoàn tất | ................................................ |

**C2 · 1 điểm:** Đề xuất cách chờ thay cho khoảng sleep cố định; giải thích
vì sao assertion lúc đó kiểm tra được kết quả của tác vụ đã hoàn tất.

> Cách chờ / đoạn sửa: ........................................................
>
> Giải thích: ................................................................

**C3 · 1 điểm:** Nêu thêm bằng chứng cần có trước khi kết luận test chập chờn,
thay vì chỉ dựa vào một lượt fail.

> Bằng chứng cần bổ sung: .....................................................

## 6. Hồ sơ D — Cache và kết quả pipeline (1 điểm, 3 phút)

**Đọc:** trích đoạn D gồm trạng thái cache, install step và kết quả test/gate.
**Mã nguồn/run của hồ sơ:** ...................................................

**D1 · 1 điểm:** Cache miss có phải nguyên nhân làm pipeline trong hồ sơ này
fail không? Dẫn dòng log xác định bước thực sự pass/fail để giải thích.

| Quan sát | Bằng chứng |
| :--- | :--- |
| Cache hit/miss | ................................................ |
| Bước test/gate và kết quả | ................................................ |

> Kết luận: ..................................................................

## 7. Tóm tắt và nộp phiếu

Hoàn thiện phần này trong lúc làm hồ sơ; chọn một tình huống A/B/C để tóm tắt.
Không cộng điểm ngoài các câu hỏi ở trên.

| Nội dung | Câu trả lời ngắn |
| :--- | :--- |
| Hiện tượng + bằng chứng mạnh nhất | ................................................ |
| Nguyên nhân nghi ngờ + hướng sửa | ................................................ |
| Lệnh/cách kiểm tra để xác nhận | ................................................ |

Trong 3 phút cuối, **2 nhóm được chọn** trình bày, tối đa 60 giây/nhóm. Các nhóm
khác đối chiếu kết luận; **tất cả nhóm nộp phiếu**. Ghi rõ điều chưa kiểm chứng.

Trước khi nộp: có tên nhóm, mã hồ sơ và đủ các phần A/B/C/D.
**Điểm tối đa: 3 + 3 + 3 + 1 = 10.**
