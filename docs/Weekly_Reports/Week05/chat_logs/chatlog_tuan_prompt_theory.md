# Chat Log — Data-Driven Coupon Test & Tái hiện Failure Mode 2
**Thành viên:** Nguyễn Ngọc Minh Tuấn — MSSV: 23120102
**Tuần:** Week 05 — Chủ đề Seminar T07: CI/CD & Test-Harness Engineering
**Hệ thống kiểm thử (SUT):** EShop System Monorepo (backend Express + SQLite)
**Công cụ AI sử dụng:** Claude (Anthropic) trên claude.ai, mô hình Claude Sonnet 5.5
**Ngày thực hiện:** 16/10/2026 (bắt đầu khoảng 08:55, GMT+7)
**File minh chứng sinh ra:** `backend/tests/coupon.test.js`, các ảnh trong `Weekly_Reports/Week05/screenshots/`

---

## 1. MỤC TIÊU CÔNG VIỆC

1. Viết bộ kiểm thử hướng dữ liệu (`test.each`) cho `POST /api/apply-coupon` trong `backend/tests/coupon.test.js`, bao gồm: coupon hợp lệ, coupon hết hạn, đơn chưa đủ ngưỡng tối thiểu.
2. Tái hiện và kiểm chứng lỗi công thức coupon percent ở `backend/server.js` dòng 398–401 làm `discount_amount` bị âm (Failure Mode 2).
3. Lưu log lỗi kiểm thử làm đầu vào cho bước AI Triage.
4. Hoàn thiện hồ sơ tuần 5: khai báo AI, commit Git rõ ràng, ảnh chụp minh chứng.

---

## 2. PROMPT TIÊU BIỂU ĐÃ SỬ DỤNG

### Prompt 1 — Khảo sát codebase
**Prompt nguyên văn:**
> Bạn đóng vai trò là một Senior Software Engineer vừa tiếp nhận một dự án phần mềm đang được phát triển. Trước khi thực hiện bất kỳ task nào, bạn cần khảo sát codebase để hiểu rõ kiến trúc, luồng xử lý, quy ước lập trình, hệ thống kiểm thử và trạng thái hiện tại của dự án. Đây là repo: https://github.com/SoftwareTesting-Group13/eshop-sut-seminar

**Yêu cầu :** Khảo sát repo EShop để nắm cấu trúc dự án và các điểm lệch giữa hiện thực và đặc tả `api_specification.md`.

### Prompt 2 — Giao nhiệm vụ viết test và tái hiện lỗi
**Prompt nguyên văn:**
> Nhiệm vụ 1: Viết bộ kiểm thử hướng dữ liệu (Data-Driven Testing với `test.each`) trong file `tests/coupon.test.js` để kiểm thử toàn diện API `POST /api/apply-coupon` (các trường hợp coupon hợp lệ, coupon hết hạn, đơn hàng chưa đủ điều kiện tối thiểu).
> Nhiệm vụ 2: Tái hiện và kiểm chứng lỗi logic nghiệp vụ thực tế trong `backend/server.js` dòng 398–401 (công thức coupon percent làm `discount_amount` bị âm - Failure Mode 2); lưu lại log lỗi kiểm thử phục vụ cho AI Triage.
> *(kèm nguyên văn mục "Quy định bắt buộc: làm việc song song với việc lập Weekly Report" trong `Week5Plan.md`)*

**Yêu cầu (diễn đạt lại):** Hỗ trợ hoàn thành hai nhiệm vụ được phân công (viết `coupon.test.js` và tái hiện Failure Mode 2) đồng thời tuân thủ quy định hồ sơ tuần 5 (khai báo AI, commit rõ ràng, minh chứng trực quan).

### Prompt 3 — Thắc mắc về yêu cầu của Task 2
**Prompt nguyên văn:**
> Ở đây task 2 chỉ yêu cầu log(screenshot) lại lỗi để phục vụ cho các task sau, không yêu cầu sinh ra thêm file mới

**Yêu cầu (diễn đạt lại):** Sinh viên xác định đề bài chỉ yêu cầu "ghi lại log lỗi kiểm thử" nên **không đưa script này vào repo**; log chính thức lấy từ Jest.


---

## 3. NHẬT KÝ HỘI THOẠI (AI RESPONSE LOG)

### Lượt 1 — Quét cấu trúc repo
**Kết quả AI tổng hợp:**
- Repo là monorepo gồm `backend` (Express + SQLite + Jest), `frontend-web`, `frontend-admin` (React + Vite), `frontend-mobile` (React Native/Expo).
- Đối chiếu `server.js` với `api_specification.md`, AI liệt kê nhiều điểm lệch, trong đó có lỗi liên quan trực tiếp đến nhiệm vụ: công thức coupon percent sai và so sánh ngưỡng dùng `>` thay vì `>=`.
- Các file test sẵn có chủ yếu là placeholder.

**Nhận xét:** Danh sách lỗi hữu ích để định hướng nhưng cần tự đối chiếu với mã nguồn; kết quả cuối cùng dựa trên log chạy test thực tế.

### Lượt 2 — Soạn `coupon.test.js`
**Kết quả AI sinh ra:** File test 21 ca, chia thành các nhóm dùng `test.each`:

| Nhóm | Số ca | Nội dung |
| :--- | :---: | :--- |
| Coupon hợp lệ | 7 | SAVE10, BIGBUY, VIP100, gồm ca đúng bằng ngưỡng tối thiểu |
| Coupon hết hạn | 2 | EXPIRED |
| Đơn chưa đủ ngưỡng | 4 | thiếu 1 đồng, đơn bằng 0 |
| Mã không hợp lệ | 5 | thiếu code, rỗng, không tồn tại, sai hoa/thường, `is_active = 0` |
| Failure Mode 2 | 3 | bất biến `0 ≤ discount_amount ≤ total` ở cả hai nhánh (có/không `user_id`) |

Giá trị mong đợi được tính theo FR-09 (percent = `total × value / 100`, ngưỡng dùng `>=`), không theo hành vi hiện tại của server.

**Giới hạn của phiên AI:** AI không cài được dependency (npm registry bị chặn) nên **không chạy được Jest**. Kết quả chạy test thật hoàn toàn do sinh viên thực hiện ở máy cá nhân. AI chỉ đưa ra dự đoán bằng cách sao chép thủ công logic `apply-coupon` vào một script Node (dự đoán 8 ca FAIL, 13 ca PASS).

### Lượt 3 — Tái hiện lỗi trên `server.js`
**Kết quả AI sinh ra:** Script phụ `repro_fm2_coupon.js` nạp nguyên `server.js` với express/DB giả lập và gọi handler `/api/apply-coupon`. Kết quả ví dụ: SAVE10 đơn 1,000,000 → `discount_amount = -9,000,000`, `final_amount = 10,000,000`.

**Ghi chú:** Sinh viên xác định đề bài chỉ yêu cầu "ghi lại log lỗi kiểm thử" nên **không đưa script này vào repo**; log chính thức lấy từ Jest.

### Lượt 4 — Phân tích log Failure Mode 2
Sinh viên cung cấp log chạy `-t "Failure Mode 2"`. AI nhận xét log đúng như kỳ vọng (3 failed, 18 skipped, 21 total) nhưng còn nhiễu: lỗi hiển thị tiếng Việt do encoding PowerShell, mã màu ANSI, và dòng `NativeCommandError` không phải lỗi thật. AI đề xuất chạy lại bằng `cmd /c '... --no-colors > file 2>&1'`.

---

## 4. KIỂM CHỨNG & BIÊN TẬP THỦ CÔNG

1. **Chạy test thực tế:** Tự chạy `npx jest` trên Windows PowerShell; log lưu tại `Weekly_Reports/Week05/coupon_failure_mode2.txt`.
2. **Đối chiếu với đặc tả:** Tự đọc `api_specification.md` (FR-09) để xác nhận công thức percent đúng là `total × value / 100` và ngưỡng dùng `>=`, không chỉ tin vào mô tả của AI.
3. **Đối chiếu với mã nguồn:** Tự mở `server.js` dòng 379, 398–401 và 419–422, xác nhận công thức `total_amount * (1 - coupon.discount_value)` đúng như AI chỉ ra.
4. **Tự phát hiện và sửa sai sót:** Nhận ra mình đã ghi đè file có sẵn `coupons.test.js`, tự đổi tên về `coupon.test.js` và khôi phục file gốc.
5. **Tự quyết định phạm vi:** Loại script phụ `repro_fm2_coupon.js` khỏi repo vì ngoài yêu cầu đề bài.
6. **Kiểm soát commit:** Không commit `database.sqlite`, `package.json`, `package-lock.json`; commit tách riêng từng việc theo quy ước `test:` và `docs:`.

---

## 5. KẾT QUẢ GHI NHẬN

**Chạy nhóm Failure Mode 2 (`-t "Failure Mode 2"`), kết quả thực tế từ log:**

| Ca | Kết quả thực tế | Kỳ vọng (FR-09) |
| :--- | :--- | :--- |
| SAVE10, không `user_id` | `Expected: >= 0`, `Received: -9000000` | `discount_amount ≥ 0` |
| SAVE10, có `user_id` | `Expected: >= 0`, `Received: -9000000` | `discount_amount ≥ 0` |
| SAVE10, `final_amount` | `Expected: < 1000000`, `Received: 10000000` | `final_amount < total` |

**Kết luận:** Công thức tại `server.js` dòng 398–401 (và lặp ở dòng 419–422) dùng `total_amount * (1 - coupon.discount_value)`. Vì `discount_value` lưu theo phần trăm nguyên (SAVE10 = 10), biểu thức trở thành `(1 - 10) = -9` nên `discount_amount` âm và `final_amount` lớn hơn tổng đơn. Lỗi lặp ở cả hai nhánh. Ngoài ra dòng 379 dùng `>` thay vì `>=` nên đơn đúng bằng ngưỡng tối thiểu bị từ chối.

---

## 6. CAM KẾT

Nội dung trên được ghi lại trung thực trong quá trình làm việc với AI. Toàn bộ file test và log đều được tôi trực tiếp đọc hiểu, chạy thử và biên tập thủ công trước khi commit.

**Người thực hiện:** Nguyễn Ngọc Minh Tuấn — 23120102