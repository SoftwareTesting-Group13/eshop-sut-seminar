# Presentation Script — SUT Overview & Failure Mode 2

**Thời lượng:** 20 phút tổng cộng — pitch giới thiệu SUT 10 phút, live demo Failure Mode 2 10 phút.

**Mục tiêu:** giúp lớp hiểu EShop SUT và luồng coupon, sau đó quan sát một lỗi công thức giảm giá làm test thất bại, xác định nguyên nhân và xác nhận test xanh sau khi khôi phục implementation đúng.

## Phân công trên lớp

| Thành viên | Vai trò | Phối hợp máy chiếu |
|---|---|---|
| Nguyễn Ngọc Minh Tuấn | Người thuyết trình chính, dẫn dắt câu chuyện và kết luận | Nhận tín hiệu chuyển slide từ Nhật Cường; đứng cạnh máy chiếu để chỉ vào kiến trúc/kết quả |
| Dương Nhật Cường | Điều khiển slide và chuyển màn hình | Điều khiển PowerPoint trong 10 phút pitch; chuyển sang cửa sổ terminal/code theo cue ở phút 10 |
| Nguyễn Gia Huy | Người thao tác live demo | Điều khiển editor và terminal trong 10 phút demo; chỉ sửa file demo tạm theo quy trình bên dưới |
| Trần Gia Cường | Timekeeper và hỗ trợ kỹ thuật | Báo mốc mỗi phút cho người nói; theo dõi terminal/kết nối máy chiếu và báo cue dự phòng |

**Quy ước:** “Màn hình” trong bảng là nội dung đang chiếu. Người thuyết trình nói theo ý được gợi ý, có thể diễn đạt tự nhiên; câu trong ngoặc kép là lời thoại mẫu.

## Kịch bản theo từng phút

| Phút | Người nói | Màn hình / người thao tác | Lời thoại và hành động |
|---:|---|---|---|
| 00–01 | Tuấn | Slide tiêu đề — Nhật Cường | “Nhóm em trình bày cách dùng CI và kiểm thử tự động để phát hiện lỗi trên EShop. Phần đầu giới thiệu SUT; phần sau demo một lỗi tính coupon cụ thể.” Tuấn nêu cấu trúc 10 phút + 10 phút. |
| 01–02 | Trần Gia Cường | Slide bối cảnh — Nhật Cường | “Khi tích hợp và kiểm thử dồn về cuối, lỗi khó truy vết. CI giúp chạy kiểm tra lặp lại được ngay sau thay đổi mã nguồn.” Giới hạn nội dung hôm nay ở backend và coupon. |
| 02–03 | Nhật Cường | Slide kiến trúc — Nhật Cường | Chỉ lần lượt web, admin, mobile, backend và SQLite. “Các client gọi Backend API; backend xử lý nghiệp vụ và lưu dữ liệu vào SQLite.” |
| 03–04 | Gia Huy | Slide kiến trúc / API — Nhật Cường | “SUT dùng Node.js và Express cho backend. Seminar tập trung vào module coupon FR-09; API áp mã là `POST /api/apply-coupon`.” |
| 04–05 | Tuấn | Slide luồng coupon — Nhật Cường | Mô tả request gồm mã coupon và tổng đơn; hệ thống kiểm tra coupon, ngưỡng đơn, hạn dùng, rồi tính số tiền giảm và thành tiền. |
| 05–06 | Trần Gia Cường | Slide Test Harness — Nhật Cường | “Jest là test runner cho backend. Test gửi request tới API bằng Supertest; dữ liệu coupon được seed vào SQLite.” Phân biệt test API và unit test hàm tính coupon. |
| 06–07 | Nhật Cường | Slide CI/Quality Gate — Nhật Cường | Nói ngắn về workflow: chạy kiểm tra, áp quality gate, rồi build khi gate pass. Không gọi workflow là deploy; repo hiện có bước test/build. |
| 07–08 | Gia Huy | Slide test coupon — Nhật Cường | “Test dùng nhiều dữ liệu coupon và số tiền đơn. Các assertion kiểm tra status, số tiền giảm, thành tiền và các bất biến như giảm giá không âm.” |
| 08–09 | Tuấn | Slide kết quả / Failure Mode 2 — Nhật Cường | “Tiếp theo nhóm chọn một lỗi dễ quan sát: công thức percent dùng nhầm tỷ lệ 10 như một hệ số trừ trực tiếp.” Báo trước đây là fault injection tạm thời, không phải code hiện tại. |
| 09–10 | Tuấn | Chuyển từ slide sang terminal/code — Nhật Cường chuyển cửa sổ; Huy sẵn sàng thao tác | “Ta sẽ xem trạng thái đúng, mô phỏng lỗi trong file demo, chạy riêng test Failure Mode 2, rồi khôi phục và chạy lại.” Cường báo chuyển sang phần demo 10 phút. |
| 10–11 | Tuấn | Terminal ở `backend` — Huy | Nêu lệnh sẽ dùng: `npm test -- --runTestsByPath tests/coupon.test.js -t "Failure Mode 2"`. Nhắc cả lớp đây là lỗi được tiêm tạm thời để minh họa; không commit trạng thái lỗi. |
| 11–12 | Gia Huy | `backend/coupon-discount.js` — Huy | Chỉ implementation đúng: `Math.floor(totalAmount * (coupon.discount_value / 100))`. “SAVE10 có `discount_value = 10`; chia cho 100 mới là 10%.” |
| 12–13 | Trần Gia Cường | Editor, phép tính — Huy thao tác | Huy tạm thay biểu thức bằng `Math.floor(totalAmount * (1 - coupon.discount_value))`. Cường đọc phép tính với đơn 500.000: giảm `-4.500.000`, thành tiền `5.000.000`. |
| 13–14 | Gia Huy | Terminal, chạy lệnh test — Huy | Chạy lệnh ở phút 10–11. Chờ Jest báo các test Failure Mode 2 fail; chỉ ra giá trị nhận được âm và thành tiền vượt tổng đơn. |
| 14–15 | Tuấn | Terminal kết quả — Huy giữ màn hình | “Test không chỉ kiểm tra code chạy được; nó kiểm tra điều kiện nghiệp vụ: tiền giảm phải nằm từ 0 đến tổng đơn, thành tiền không âm và nhỏ hơn tổng đơn.” Không khẳng định API trả HTTP error; lỗi này trả kết quả sai nên assertion mới bắt được. |
| 15–16 | Gia Huy | Editor — Huy | Khôi phục đúng công thức `/ 100`. Có thể dán lại biểu thức đúng thay vì gõ lại toàn file. Cường xác nhận nội dung đã khôi phục trên màn hình. |
| 16–17 | Gia Huy | Terminal, chạy lại lệnh — Huy | Chạy lại cùng lệnh test. Chờ nhóm Failure Mode 2 pass; chỉ rõ thay đổi duy nhất là công thức tính giảm giá. |
| 17–18 | Nhật Cường | Terminal coverage hoặc slide kết quả — Nhật Cường/Huy | Nếu thời gian cho phép, trình bày báo cáo đã sinh ở `backend/coverage/lcov-report/index.html` và `backend/coverage/lcov.info`. Nêu số liệu theo run mới nhất trên máy; không đọc số coverage cũ như kết quả hiện tại. |
| 18–19 | Trần Gia Cường | Slide bài học — Nhật Cường | “Một lỗi đơn vị giữa phần trăm và hệ số có thể tạo kết quả âm rất lớn. Test theo dữ liệu cụ thể cùng invariant giúp phát hiện lỗi ở cả nhánh guest và nhánh có user ID.” |
| 19–20 | Tuấn | Slide kết luận — Nhật Cường | Tóm tắt: SUT → API coupon → fault injection → test fail → khôi phục → test pass. Cảm ơn lớp và nhận câu hỏi nếu còn thời gian trong mốc này. |

### Chuẩn bị trước giờ học

- Mở repo, editor và terminal; terminal bắt đầu tại thư mục `backend`.
- Chạy trước `npm test -- --runTestsByPath tests/coupon.test.js -t "Failure Mode 2"` để chắc trạng thái baseline đang pass.
- Mở sẵn `backend/coupon-discount.js` và phần `Failure Mode 2` trong `backend/tests/coupon.test.js`.
- Chuẩn bị phép tính trên slide/giấy: lỗi `500000 * (1 - 10) = -4500000`; đúng `floor(500000 * 10 / 100) = 50000`; thành tiền đúng `450000`.
- Nên thao tác trên working copy/branch demo riêng. Trước khi sửa, kiểm tra `git status` và xác nhận không ghi đè thay đổi đang làm của nhóm.

### Fault injection có kiểm soát

Từ terminal `backend`, sao lưu riêng file logic trước khi demo:

```powershell
Copy-Item .\coupon-discount.js .\coupon-discount.js.demo-backup
```

Trong editor, chỉ đổi dòng tính percent thành công thức lỗi:

```js
return Math.floor(totalAmount * (1 - coupon.discount_value));
```

Chạy riêng nhóm test minh họa:

```powershell
npm test -- --runTestsByPath tests/coupon.test.js -t "Failure Mode 2"
```

Ở trạng thái tiêm lỗi, Jest được kỳ vọng báo thất bại vì `discount_amount` âm và `final_amount` lớn hơn tổng đơn. Sau khi trình bày, khôi phục ngay file đã sao lưu:

```powershell
Copy-Item .\coupon-discount.js.demo-backup .\coupon-discount.js -Force
Remove-Item .\coupon-discount.js.demo-backup
```

Chạy lại đúng lệnh Jest. Kết quả kỳ vọng là toàn bộ test được chọn pass. Không stage hoặc commit file khi đang ở trạng thái fault injection.

### Phương án dự phòng

- Nếu chỉnh sửa file mất thời gian, chiếu trực tiếp hai biểu thức và phép tính, sau đó chạy test trên code đúng để xác nhận pass; không giả vờ rằng lần chạy hiện tại đã fail.
- Nếu terminal đang encoding lỗi, đổi sang Windows Terminal/PowerShell UTF-8 hoặc bỏ verbose; kết quả quan trọng là tên test, expected/received và tổng pass/fail.
- Nếu live demo gặp sự cố kết nối, Nhật Cường chuyển sang log đã lưu của một run fault-injection trước đó, đồng thời nói rõ đây là log chuẩn bị trước, không phải run trực tiếp.
- Nếu không kịp mở HTML report, dùng terminal coverage summary hoặc LCOV; không dừng demo để tìm file.

## Ghi chú chính xác kỹ thuật

- Implementation hiện tại ở `backend/coupon-discount.js`; công thức lỗi chỉ dùng cho fault injection, không phải code đang chạy.
- Test API ở `backend/tests/coupon.test.js`; workflow demo CI có cấu hình unit suite riêng ở `backend/jest.demo.config.js`, nên không nói CI demo chạy toàn bộ API suite này.
- `POST /api/apply-coupon` hiện là endpoint public trong SUT; nhánh user dùng `user_id` để kiểm tra quota. Không mô tả endpoint này là bắt buộc JWT.
- Khi trình bày tỷ lệ coverage, lấy kết quả của run vừa thực hiện và chỉ rõ suite/phạm vi; không thay bằng số từ lần chạy trước.
