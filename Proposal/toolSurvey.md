# BÁO CÁO KHẢO SÁT VÀ SO SÁNH CÁC CÔNG CỤ (TOOL SURVEY)
**Chủ đề:** T07 — CI/CD & Test Harness Engineering  
**Môn học:** Kiểm thử Phần mềm (CSC13003 - Software Testing)  
**Hệ thống kiểm thử (SUT):** EShop System (Node.js/Express, SQLite3, Jest)  
**Nhóm sinh viên thực hiện:**
- 23120102 — Nguyễn Ngọc Minh Tuấn
- 23120223 — Dương Nhật Cường
- 23120225 — Trần Gia Cường
- 23120273 — Nguyễn Gia Huy

---

## 1. DANH MỤC CÁC CÔNG CỤ KHẢO SÁT

Để xây dựng một giải pháp hoàn chỉnh cho chủ đề CI/CD & Test Harness Engineering trên hệ thống EShop, nhóm tiến hành khảo sát hai nhóm công cụ chính:

### 1.1. Nhóm công cụ truyền thống (Traditional CI/CD & Test Framework)
1. **GitHub Actions (Trọng tâm cốt lõi):**
   - Nền tảng CI/CD cloud-native được tích hợp trực tiếp trong hệ sinh thái GitHub.
   - Đóng vai trò "trung tâm chỉ huy" tự động hóa toàn bộ quy trình: dựng runner sạch (Ubuntu/Windows/macOS), quản lý cache dependencies, tự động kích hoạt bộ Unit Test, đo lường Code Coverage, áp đặt rào chắn Quality Gates và bảo vệ nhánh chính (`main`).
2. **Jenkins:**
   - Nền tảng tự động hóa CI/CD mã nguồn mở lâu đời nhất, hoạt động theo mô hình tự lưu trữ (self-hosted).
   - Hỗ trợ kiến trúc Master-Agent phân tán, hệ sinh thái hàng nghìn plugin phong phú, định nghĩa pipeline bằng cú pháp Groovy (Jenkinsfile).
3. **Jest (Test Engine hỗ trợ thực thi Unit Testing):**
   - Framework kiểm thử toàn diện cho hệ sinh thái JavaScript/Node.js, tích hợp sẵn Test Runner, Assertion Library, Mocking Engine và công cụ đo lường Code Coverage.
   - Thực thi trực tiếp các ca kiểm thử đơn vị cho các route và logic nghiệp vụ backend của EShop, xuất báo cáo chuẩn (JUnit XML, LCOV) cho pipeline CI/CD phân tích.

### 1.2. Nhóm công cụ ứng dụng AI (AI-Augmented Testing & Triage)
1. **Datadog Flaky Test Management (FTM):**
   - Giải pháp giám sát telemetry doanh nghiệp, theo dõi hành vi của test suite qua hàng nghìn commit.
   - Tự động phát hiện và gắn cờ các ca kiểm thử bất định (Flaky Tests), theo dõi vòng đời sửa lỗi và cách ly ca test lỗi khỏi pipeline chính.
2. **Launchable / Sealights:**
   - Nền tảng ứng dụng Machine Learning để phân tích mức độ ảnh hưởng của thay đổi mã nguồn (Predictive Test Selection / Test Impact Analysis - TIA).
   - Dự đoán và chỉ thực thi các ca kiểm thử có nguy cơ bị ảnh hưởng bởi commit hiện tại, giúp rút ngắn thời gian phản hồi của pipeline mà vẫn đảm bảo độ tin cậy.
3. **LLM-Powered Log Triage Action (Custom GitHub Action tích hợp LLM API):**
   - Tiện ích mở rộng tự động kích hoạt khi có bước kiểm thử bị thất bại trên CI/CD.
   - Trích xuất stack trace từ build log thô, sử dụng mô hình ngôn ngữ lớn (OpenAI / Claude / Gemini) để phân tích nguyên nhân gốc rễ (Root Cause), xây dựng Cây Giả Thuyết chẩn đoán lỗi và gợi ý đoạn mã sửa lỗi trực tiếp trên giao diện Pull Request.

---

## 2. MA TRẬN SO SÁNH 5 CÔNG CỤ THEO 5 TIÊU CHÍ CHUẨN MÔN HỌC

| Tiêu chí đánh giá | GitHub Actions | Jenkins | Datadog FTM | Launchable / Sealights | LLM Log Triage Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Chi phí bản quyền (Licence Cost)** | ⭐⭐⭐⭐⭐ Miễn phí cho repo public (2,000 phút/tháng cho private) | ⭐⭐⭐⭐⭐ Mã nguồn mở miễn phí bản quyền (tốn chi phí server hạ tầng) | ⭐⭐ Bản quyền SaaS doanh nghiệp đắt đỏ (chỉ có trial ngắn hạn) | ⭐⭐⭐ Bản quyền SaaS thương mại, có gói trial giới hạn | ⭐⭐⭐⭐⭐ Miễn phí / Chi phí gọi API mô hình cực thấp (vài cent/run) |
| **2. Độ dốc học tập (Learning Curve)** | ⭐⭐⭐⭐⭐ Rất dễ, cú pháp YAML khai báo trực quan, tài liệu chuẩn phong phú | ⭐⭐ Dốc và phức tạp, cần cấu hình Java, Master-Agent, bảo trì plugin | ⭐⭐⭐ Trung bình, đòi hỏi cài đặt telemetry agent vào test runner | ⭐⭐⭐ Cần tích hợp CLI và cần thời gian chạy đủ commit để ML học mẫu | ⭐⭐⭐⭐⭐ Rất dễ, cấu hình 1 file YAML hoặc script Python gọi prompt |
| **3. Mức độ phù hợp với EShop (EShop Fit)** | ⭐⭐⭐⭐⭐ Tối ưu hoàn hảo vì dự án EShop được lưu trữ trực tiếp trên GitHub | ⭐⭐⭐ Tương thích tốt nhưng phải dựng và duy trì máy chủ riêng để kéo code | ⭐⭐⭐ Cần can thiệp cấu hình instrumentation vào mã nguồn EShop | ⭐⭐⭐ Thích hợp với test suite khổng lồ; với EShop quy mô vừa thì chưa tối ưu | ⭐⭐⭐⭐⭐ Tương thích tự nhiên, nhận trực tiếp log đầu ra của Jest từ EShop backend |
| **4. Năng lực AI (AI Capability)** | ⭐⭐⭐ Hỗ trợ qua Marketplace Actions (AI PR review, Copilot CLI) | ⭐ Phụ thuộc hoàn toàn vào plugin bên thứ ba, ít tính năng AI gốc | ⭐⭐⭐⭐⭐ Chuyên sâu phát hiện test flaky từ dữ liệu lịch sử CI | ⭐⭐⭐⭐⭐ Rất mạnh về ML dự đoán Test Impact Analysis | ⭐⭐⭐⭐ Đọc hiểu ngữ cảnh log, suy luận logic tìm Root Cause và gợi ý sửa code |
| **5. Cộng đồng & Hệ sinh thái** | ⭐⭐⭐⭐⭐ Lớn nhất hiện nay, tiêu chuẩn công nghiệp hiện đại | ⭐⭐⭐⭐⭐ Khổng lồ, lâu đời bậc nhất trong giới DevOps | ⭐⭐⭐⭐ Được nhiều doanh nghiệp công nghệ lớn ứng dụng | ⭐⭐⭐ Được các tổ chức có quy mô kiểm thử lớn sử dụng | ⭐⭐⭐⭐⭐ Hệ sinh thái AI bùng nổ, cập nhật và mở rộng liên tục |

---

## 3. ĐÁNH GIÁ ƯU ĐIỂM, NHƯỢC ĐIỂM CỦA TỪNG NHÓM CÔNG CỤ

### 3.1. Nhóm 1: GitHub Actions vs. Jenkins (CI/CD Platforms)

#### GitHub Actions:
* **Ưu điểm:**
  - *Không tốn chi phí hạ tầng:* Mọi tác vụ chạy trên máy ảo do GitHub quản lý (Ubuntu, Windows, macOS), không mất công sức thiết lập máy chủ hay vá lỗi bảo mật hệ điều hành.
  - *Tích hợp tự nhiên với GitHub:* Kết nối chặt chẽ với Pull Request, Code Review, Branch Protection Rules và GitHub Security Alerts.
  - *Hệ sinh thái Marketplace khổng lồ:* Hàng chục nghìn Action có sẵn giúp thiết lập môi trường Node.js, cache dependencies, upload artifacts chỉ với vài dòng khai báo YAML.
  - *Hỗ trợ ma trận kiểm thử (Matrix Testing):* Dễ dàng chạy song song bộ kiểm thử trên nhiều phiên bản Node.js (18, 20, 22) và hệ điều hành.
* **Nhược điểm:**
  - *Giới hạn tài nguyên:* Máy ảo miễn phí bị giới hạn cấu hình phần cứng (2 vCPU, 7GB RAM) và số phút thực thi mỗi tháng cho repo private.
  - *Phụ thuộc đám mây:* Hoàn toàn phụ thuộc vào tính sẵn sàng của GitHub; nếu dịch vụ GitHub Actions gặp sự cố thì pipeline bị đình trệ.

#### Jenkins:
* **Ưu điểm:**
  - *Khả năng tùy biến vô hạn:* Kiểm soát 100% môi trường thực thi, hỗ trợ mọi loại kiến trúc phần cứng và kịch bản triển khai phức tạp.
  - *Bảo mật dữ liệu tuyệt đối (On-Premise):* Phù hợp cho các doanh nghiệp tài chính, ngân hàng không được phép đẩy mã nguồn lên cloud công cộng.
* **Nhược điểm:**
  - *Chi phí vận hành và bảo trì cao:* Đòi hỏi đội ngũ chuyên trách cấu hình Java runtime, quản lý máy chủ Master-Agent, bảo mật mạng nội bộ.
  - *Xung đột plugin ("Plugin Hell"):* Việc nâng cấp phiên bản Jenkins thường xuyên làm gãy các plugin cũ, gây mất ổn định pipeline.
  - *Giao diện người dùng lỗi thời:* Trải nghiệm người dùng kém hiện đại hơn so với các nền tảng cloud-native mới.

---

### 3.2. Nhóm 2: Datadog FTM, Launchable vs. LLM Log Triage Action (AI Testing Solutions)

#### Datadog FTM & Launchable (Machine Learning & Telemetry):
* **Ưu điểm:**
  - *Độ chính xác thống kê cao:* Hoạt động dựa trên dữ liệu định lượng thực tế của hàng nghìn lần chạy pipeline, loại bỏ tính chủ quan.
  - *Tối ưu hóa thời gian chạy:* Launchable giúp giảm 30–50% thời gian chạy CI bằng cách chỉ chọn các test case bị ảnh hưởng trực tiếp bởi thay đổi code.
* **Nhược điểm:**
  - *Chi phí bản quyền đắt đỏ:* Là các dịch vụ SaaS doanh nghiệp giá cao, không phù hợp cho đồ án sinh viên hoặc dự án vừa và nhỏ.
  - *Yêu cầu dữ liệu lịch sử lớn:* Cần thời gian chạy đủ nhiều commit để mô hình ML học mẫu hành vi; không mang lại hiệu quả ngay với các dự án mới khởi tạo.

#### LLM-Powered Log Triage Action (Generative AI & LLM Reasoning):
* **Ưu điểm:**
  - *Triển khai tức thì, chi phí cực thấp:* Chỉ cần cấu hình một Action gọi API (OpenAI/Claude/Gemini) với chi phí chỉ vài cent cho mỗi lần phân tích lỗi.
  - *Khả năng suy luận ngữ cảnh vượt trội:* Không chỉ thông báo test thất bại, mô hình còn đọc stack trace, hiểu logic hàm bị lỗi, giải thích nguyên nhân bằng ngôn ngữ tự nhiên và đề xuất đoạn mã khắc phục cụ thể.
  - *Xây dựng Cây Giả Thuyết lỗi:* Cung cấp cấu trúc phân tích 3 cấp (Hiện tượng → Nguyên nhân khả dĩ → Cách khắc phục) hỗ trợ lập trình viên điều tra nhanh chóng.
* **Nhược điểm:**
  - *Nguy cơ ảo giác (Hallucination):* Nếu tệp log bị cắt xén thiếu thông tin, LLM có thể phán đoán sai nguyên nhân; kỹ sư vẫn phải đối chiếu trước khi áp dụng code sửa lỗi.
  - *Tiêu tốn token:* Cần có cơ chế lọc nhiễu log thô (chỉ giữ lại phần lỗi và stack trace liên quan) trước khi gửi đến mô hình để tránh lãng phí context window.

---

## 4. ĐỀ XUẤT BỘ CÔNG CỤ CHỦ ĐẠO VÀ LÝ DO LỰA CHỌN (RATIONALE)

Dựa trên kết quả khảo sát và định hướng bài toán kiểm thử đơn vị cho hệ thống EShop, nhóm thống nhất lựa chọn **Bộ ba công cụ hoàn chỉnh**:

```
                  ┌───────────────────────────────────────────────┐
                  │          GITHUB ACTIONS (Trọng tâm)           │
                  │   Nền tảng CI/CD Pipeline & Quality Gates     │
                  └───────────────────────┬───────────────────────┘
                                          │
                   Kích hoạt khi có Commit│Kiểm soát cổng chất lượng
                                          ▼
                  ┌───────────────────────────────────────────────┐
                  │                 JEST ENGINE                   │
                  │    Thực thi Unit Test trên Backend EShop      │
                  └───────────────────────┬───────────────────────┘
                                          │
                                 Khi Test │Thất bại (if: failure)
                                          ▼
                  ┌───────────────────────────────────────────────┐
                  │          AI LOG TRIAGE ACTION                 │
                  │   Tự động chẩn đoán lỗi & gợi ý sửa code      │
                  └───────────────────────────────────────────────┘
```

1. **GitHub Actions (Trọng tâm cốt lõi):**
   - *Vai trò:* "Trung tâm chỉ huy" điều phối toàn bộ pipeline CI/CD. Đóng gói quy trình kiểm thử đơn vị, quản lý môi trường Node.js sạch, tự động chạy Unit Test, đo lường Code Coverage và áp đặt các chốt chặn Quality Gates bảo vệ nhánh `main`.
   - *Lý do:* Tích hợp hoàn hảo với repo EShop trên GitHub, miễn phí, cấu hình YAML chuẩn mực, hỗ trợ cache tối ưu và có thể biểu diễn trực quan kết quả test ngay trên Pull Request.

2. **Jest (Test Engine hỗ trợ thực thi Unit Testing):**
   - *Vai trò:* Động cơ kiểm thử nội bộ chạy bên trong phân hệ Backend Node.js/Express của EShop, chịu trách nhiệm thực thi các bài Unit Test và API test.
   - *Lý do:* Tương thích tự nhiên với Node.js, hỗ trợ cơ chế SQLite In-Memory (`:memory:`) giúp cô lập dữ liệu hoàn toàn giữa các ca test, loại bỏ nguy cơ khóa file database, xuất dữ liệu Code Coverage chuẩn LCOV để cấp cho Quality Gate của CI/CD.

3. **LLM-Powered Log Triage Action (Công cụ hỗ trợ chẩn đoán thông minh):**
   - *Vai trò:* Tiện ích mở rộng phụ trợ chạy có điều kiện (`if: failure()`) trên GitHub Actions, tự động kích hoạt khi có ca Unit Test bị fail.
   - *Lý do:* Minh chứng rõ nét cho triết lý **"AI-First Software Testing"** của môn học, giúp giải quyết bài toán tốn thời gian nhất trong CI/CD là điều tra và gỡ lỗi (triage) khi pipeline báo đỏ.
