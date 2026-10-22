# Thư mục lưu trữ ảnh chụp màn hình minh chứng của Tuần 6 (Mốc 90% Seminar)

> [!IMPORTANT]
> **QUY ƯỚC ĐẶT TÊN ẢNH BẮT BUỘC (THEO SỔ TAY CHECKLIST.MD):**  
> Để tránh xung đột khi gộp file vào thư mục chung, **mọi ảnh chụp màn hình bắt buộc phải có tiền tố tên thành viên**:  
> `[tên-thành-viên]_[stt]_[nội-dung-minh-chứng].png`

### Bảng tiền tố chuẩn của 4 thành viên:
1. `mtuan_` — **Nguyễn Ngọc Minh Tuấn**
   * Ví dụ: `mtuan_01_slide_preview.png`, `mtuan_02_coupon_extended_tests.png`, `mtuan_03_lcov_coverage.png`, `mtuan_04_consistency_check.png`
2. `ncuong_` — **Dương Nhật Cường**
   * Ví dụ: `ncuong_01_video_storyboard.png`, `ncuong_02_ci_quality_gate.png`, `ncuong_03_obs_recording.png`, `ncuong_04_mp4_properties.png`, `ncuong_05_preshare_drive.png`
3. `gcuong_` — **Trần Gia Cường**
   * Ví dụ: `gcuong_01_user_guide_toc.png`, `gcuong_02_failure_modes_diff.png`, `gcuong_03_mermaid_diagrams.png`, `gcuong_04_reproduction_run.png`, `gcuong_05_link_check.png`
4. `ghuy_` — **Nguyễn Gia Huy**
   * Ví dụ: `ghuy_01_worksheet_preview.png`, `ghuy_02_answerkey_rubric.png`, `ghuy_03_sample_logs.png`, `ghuy_04_ai_triage_gemini_output.png`, `ghuy_05_flake_rate_10runs.png`

---

### Tiêu chí nghiệm thu ảnh chụp minh chứng:
- Ảnh chụp rõ ràng câu lệnh trong terminal / giao diện trình duyệt / GitHub Actions run.
- Thấy rõ thông báo Pass/Fail, mã lỗi, thời gian chạy, hoặc cấu trúc file hoàn thiện.
- Không dùng tên chung chung như `image.png`, `screenshot1.png`, `untitled.png`.

### Bổ sung W6-18 — SQLite của Nguyễn Gia Huy

Nguồn là [run demo 39741620266](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar/actions/runs/39741620266),
SHA `485a778`, trên nhánh `test/giahuy-sqlite-lock-demo`. Chụp ảnh thật:

- `ghuy_03f_sqlite_ci_failure.png`: mở job **SQLite demo (parallel)**, bước
  **Demonstrate SQLite write ordering**; thấy A giữ transaction, B báo
  `SQLITE_BUSY: database is locked` và exit code 1.
- `ghuy_03g_sqlite_serial_pass.png`: mở job **SQLite demo (serial)** cùng run;
  thấy A COMMIT trước B, `PASS committedWrites=2` và job success.

Hiển thị run URL/job để đối chiếu nguồn. Đây là tái hiện có kiểm soát bằng hai
kết nối trong một tiến trình, không phải ảnh lỗi lịch sử của EShop.

Đã nhận và mở kiểm tra hai ảnh thật:
[parallel failure](ghuy_03f_sqlite_ci_failure.png) và
[serial success](ghuy_03g_sqlite_serial_pass.png). Cả hai có run ID/SHA trong log;
đã đổi tên từ tên Screenshot mặc định sang tiền tố `ghuy_`.

### Bổ sung W6-18 — Coupon, cache và index

Đã mở kiểm tra và đổi tên 4 ảnh do sinh viên chụp:

- [ghuy_03a_coupon_ci_failure.png](ghuy_03a_coupon_ci_failure.png): SAVE10,
  đơn 1000000, Expected 100000 / Received -9000000, bước Jest failure.
- [ghuy_03b_cache_miss_pass.png](ghuy_03b_cache_miss_pass.png): cache miss,
  install success và Jest success; job pass.
- [ghuy_03c_cache_hit_pass.png](ghuy_03c_cache_hit_pass.png): cache hit,
  restore success, install skipped và Jest success.
- [ghuy_03e_sample_logs_index.png](ghuy_03e_sample_logs_index.png): bảng nguồn,
  metadata và cây thư mục Sample Logs trong Markdown Preview.

Các ảnh trình duyệt trên dùng kèm raw log và metadata trong
[index Sample Logs](../../../Materials/Sample_Logs/README.md) vì khung chụp
không chứa URL/run ID. Đã nhận và kiểm tra
[ghuy_03d_cache_miss_install_failure.png](ghuy_03d_cache_miss_install_failure.png):
npm ci EUSAGE/lockfile không đồng bộ, exit code 1, cache success và Jest skipped.
Bộ ảnh W6-18 ghuy_03a–ghuy_03g đã đầy đủ.

### Minh chứng W6-17 — Answer Key

Đã nhận và mở kiểm tra [ảnh Answer Key/barem](ghuy_02_answerkey_rubric.png):
thấy nội dung [Answer Key](../../../Activity_Worksheet_AnswerKey.md) sau bổ sung,
đáp án A1, nguồn code/revision và bảng chia điểm 0.5 + 0.5. Đây là minh chứng
bản soạn, không phải bằng chứng nhóm duyệt barem hoặc thử chấm với lớp.
