# Chatlog tóm lược các yêu cầu và kết quả

## Chatlog 1 — Đối soát slide với mã nguồn SUT

**Mục đích:** Rà soát tính chính xác của thuật ngữ, tên hàm, mã lỗi, đường dẫn và tham số kỹ thuật trong slide so với source SUT; giới hạn phạm vi để không kiểm tra `User_Guide.md`.

**Prompt:**

> Hãy đối soát từng nội dung kỹ thuật trong bộ slide seminar với mã nguồn SUT thực tế, tập trung vào thuật ngữ, tên hàm, mã lỗi, đường dẫn file và tham số dòng lệnh. Không kiểm tra `User_Guide.md` ở giai đoạn này. Tổng hợp các điểm khớp, điểm lệch và căn cứ source tương ứng.

**Output:**

> Đã rà soát nội dung slide theo source SUT, lập checklist có bằng chứng theo file và xác định các nội dung cần sửa hoặc cần giới hạn cách diễn đạt. `User_Guide.md` được giữ ngoài phạm vi.

## Chatlog 2 — Chỉnh slide và chuẩn hóa checklist

**Mục đích:** Sửa các nội dung slide chưa nhất quán với source; tạo bản Markdown đi kèm và checklist chỉ liệt kê các điểm đã được xác nhận.

**Prompt:**

> Dựa trên kết quả đối soát, hãy chỉnh các điểm sai trong PPTX và tạo bản Markdown đồng bộ với deck. Cập nhật checklist để chỉ giữ các nội dung đã xác nhận trực tiếp từ mã nguồn SUT; loại khỏi checklist mọi thông tin chưa xác minh được.

**Output:**

> Đã cập nhật deck và tạo Markdown đi kèm. Checklist được rút gọn còn các mục đã kiểm chứng với source, kèm đường dẫn file làm căn cứ.

## Chatlog 3 — Task 3: Test coupon và coverage report

**Mục đích:** Mở rộng kiểm thử coupon theo nhánh guest/user và cấu hình Jest xuất báo cáo LCOV cùng HTML.

**Prompt:**

> Trong backend, bổ sung các ca kiểm thử cho luồng áp coupon của guest và user, bao gồm trường hợp user còn lượt và đã chạm giới hạn sử dụng. Cấu hình `npm test` để sinh coverage report định dạng LCOV và HTML tại `backend/coverage/lcov-report/index.html`. Chạy Jest và tổng hợp kết quả để làm evidence.

**Output:**

> Đã thêm test, cập nhật script Jest và cấu hình HTML reporter. Toàn bộ backend suite chạy thành công; log Jest, LCOV và HTML coverage được tạo. Các test phản ánh hành vi hiện tại của endpoint coupon.

## Chatlog 4 — Task 5: Kịch bản thuyết trình trực tiếp

**Mục đích:** Soạn kịch bản trình bày tổng quan SUT và demo Failure Mode 2 trong 20 phút, phân công người nói và người thao tác máy chiếu.

**Prompt:**

> Hãy biên soạn `Presentation_Script.md` cho phần giới thiệu tổng quan EShop SUT và demo Failure Mode 2. Chia thành pitch 10 phút và live demo 10 phút, phân mốc chi tiết từng phút, phân công lời thoại và người phối hợp điều khiển slide/terminal. Kịch bản cần nêu rõ cách fault-injection có kiểm soát, khôi phục code và phương án dự phòng. Commit riêng file tài liệu này.

**Output:**

> Đã tạo kịch bản theo mốc phút, phân vai cho nhóm, bổ sung runbook demo và phương án dự phòng. File được commit riêng để không gộp các thay đổi Task 3 chưa commit.
