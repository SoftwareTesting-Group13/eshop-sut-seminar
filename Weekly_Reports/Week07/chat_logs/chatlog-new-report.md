# Nhật ký trao đổi với AI về `new-report.md`

- **Công cụ AI:** OpenAI Codex (mô hình GPT-6, theo thông tin của phiên làm việc này).
- **Thời điểm xuất bản ghi:** 30/10/2026, 21:00 (UTC+7).
- **Tệp được thảo luận:** [`new-report.md`](./new-report.md).
- **Phạm vi:** Các tin nhắn người dùng được giữ lại, theo đúng thứ tự trao đổi. Số lượt bên dưới đã được đánh lại sau khi lược bỏ một số tin nhắn.
- **Giới hạn dữ liệu:** Hệ thống không cung cấp giờ gửi của từng tin nhắn hoặc nguyên văn phản hồi AI ở các lượt trước. Thời điểm ở trên là giờ xuất bản ghi; phần việc AI ở cuối là tóm tắt, không phải lời thoại nguyên văn.

## Tin nhắn người dùng

### Lượt 1 — Thời gian gửi: không có dữ liệu

> format file [new-report.md](docs/new-report.md) này lại chuẩn dạng markdown dùm t

### Lượt 2 — Thời gian gửi: không có dữ liệu

> # Báo cáo Seminar nhóm 13 - CI/CD and Test-Harness Engineering
>
> Giữ cái này header 1, mấy cái header dưới giảm cho t

### Lượt 3 — Thời gian gửi: không có dữ liệu

> [https://www.shiplight.ai/blog/test-harness-ai-automation](https://www.shiplight.ai/blog/test-harness-ai-automation)
>
> check thử coi, có gì bổ sung nội dung dô báo cáo này thử

### Lượt 4 — Thời gian gửi: không có dữ liệu

````text
\## 2. Tổng quan về Test Harness Engineering

\### 2.1 Khái niệm Test Harness

**\*\*Test Harness\*\*** (khung hỗ trợ kiểm thử) là tập hợp các công cụ, mã và cấu hình dùng để chuẩn bị điều kiện kiểm thử, thực thi các ca kiểm thử trên hệ thống cần kiểm thử (System Under Test — SUT), so sánh kết quả thực tế với kết quả mong đợi và ghi nhận kết quả. Trong đó, *\*test case\** mô tả một tình huống cần kiểm tra; *\*test suite\** tập hợp nhiều test case; còn test harness cung cấp môi trường và cơ chế để thực thi chúng.

**\*\*Test Harness Engineering\*\*** là việc thiết kế, xây dựng và duy trì khung hỗ trợ đó sao cho các bài kiểm thử có thể chạy tự động, ổn định và lặp lại được. Chất lượng của test harness ảnh hưởng trực tiếp đến độ tin cậy của kết quả kiểm thử: cùng một đầu vào và cùng một trạng thái ban đầu cần cho kết quả nhất quán.

Cần phân biệt **\*\*test framework\*\*** và **\*\*test harness\*\***: framework cung cấp các chức năng chung để viết và chạy test như test runner, assertions và reporter; harness kết hợp framework với dữ liệu, cấu hình môi trường và quy trình thực thi phù hợp với hệ thống đang kiểm thử. [Nguồn: Shiplight AI — *\*Test Harness Engineering for AI Test Automation\**]([https://www.shiplight.ai/blog/test-harness-ai-automation](https://www.shiplight.ai/blog/test-harness-ai-automation)).

\### 2.2 Vai trò của Test Harness trong kiểm thử tự động

Test harness giúp giảm các thao tác thủ công như khởi tạo môi trường, nạp dữ liệu và tổng hợp kết quả. Nó cũng giúp cô lập những yếu tố có thể làm bài kiểm thử thay đổi kết quả giữa các lần chạy, chẳng hạn trạng thái dữ liệu còn sót lại hoặc phản hồi từ dịch vụ bên ngoài. Khi được tích hợp vào CI/CD, test harness cho phép chạy kiểm thử sau mỗi lần thay đổi mã nguồn và cung cấp kết quả để pipeline đánh giá chất lượng bản dựng.

\### 2.3 Kiến trúc tổng quát của Test Harness

Một test harness thường có các nhóm chức năng sau; cách tổ chức cụ thể phụ thuộc vào loại hệ thống và mức kiểm thử:

1\. **\*\*Điều phối và thực thi:\*\*** Chọn các ca kiểm thử cần chạy, thiết lập thứ tự hoặc chế độ chạy, gọi SUT và xử lý các bước chuẩn bị, dọn dẹp.
2\. **\*\*Quản lý cấu hình, dữ liệu và môi trường:\*\*** Xác định tham số chạy, môi trường đích và dữ liệu đầu vào; thiết lập trạng thái ban đầu (*\*fixtures\**) rồi đưa môi trường về trạng thái phù hợp cho lần chạy tiếp theo.
3\. **\*\*Giả lập phụ thuộc khi cần:\*\*** Sử dụng *\*stub\** để cung cấp phản hồi định trước hoặc *\*mock\** để kiểm tra tương tác với một thành phần phụ thuộc. Thành phần này đặc biệt hữu ích khi cần kiểm thử một đơn vị độc lập với dịch vụ bên ngoài.
4\. **\*\*Đánh giá và báo cáo:\*\*** So sánh kết quả thực tế với kết quả mong đợi bằng các phép kiểm tra (*\*assertions\**), ghi log, thống kê số ca đạt hoặc không đạt và tạo báo cáo cho người kiểm thử hoặc hệ thống CI/CD.

Về luồng hoạt động, test harness chuẩn bị môi trường và dữ liệu → thực thi test case trên SUT → đánh giá kết quả → ghi nhận, báo cáo và dọn dẹp. Luồng này tạo nền tảng cho việc chạy lại cùng một bộ kiểm thử một cách có kiểm soát.

\### 2.4 Nguyên tắc thiết kế để kết quả kiểm thử đáng tin cậy

\- **\*\*Cô lập dữ liệu kiểm thử:\*\*** Mỗi lần chạy cần có trạng thái ban đầu xác định. Dữ liệu do một test tạo ra nên được dọn dẹp hoặc tách riêng để không ảnh hưởng đến test khác, đặc biệt khi chạy song song.
\- **\*\*Quản lý cấu hình có thể truy vết:\*\*** Lưu định nghĩa test và cấu hình không chứa bí mật cùng mã nguồn để dễ xem lại thay đổi và tái hiện cách chạy. Thông tin nhạy cảm cần được quản lý riêng.
\- **\*\*Cung cấp kết quả có thể hành động:\*\*** Ngoài trạng thái đạt hoặc không đạt, báo cáo cần cho biết ca nào thất bại, điều kiện mong đợi và kết quả thực tế. Khi tích hợp CI/CD, kết quả này có thể được dùng làm điều kiện để pipeline tiếp tục hoặc dừng.

Các nguyên tắc về cô lập fixtures, quản lý cấu hình và kết nối kết quả kiểm thử với CI được tham khảo từ [bài viết của Shiplight AI]([https://www.shiplight.ai/blog/test-harness-ai-automation](https://www.shiplight.ai/blog/test-harness-ai-automation)); bài viết tập trung vào kiểm thử tự động có AI, còn các nguyên tắc trên được trình bày ở mức tổng quát cho phần cơ sở lý thuyết.


Cái này viết tongỏ quát lại ,ko gắn nguồn gì hết
````

### Lượt 5 — Thời gian gửi: không có dữ liệu

> Ở phần các công cụ CI/CD này, m so sánh cho t 3 cái là Github Actions, Gitlab CI với Jenkins nhé.

### Lượt 6 — Thời gian gửi: không có dữ liệu

````text
\| Tiêu chí đánh giá | GitHub Actions | Jenkins | Jest | Datadog FTM | LLM Log Triage Action |
\| :--- | :---: | :---: | :---: | :---: | :---: |
\| **\*\*1. Chi phí bản quyền\*\*** | **\*\*5/5\*\*** (Miễn phí 2000m) | **\*\*3/5\*\*** (Tốn server hosting) | **\*\*5/5\*\*** (Open-source MIT) | **\*\*2/5\*\*** (Phí doanh nghiệp cao) | **\*\*5/5\*\*** (Gemini Free Tier) |
\| **\*\*2. Độ dốc học tập\*\*** | **\*\*4.5/5\*\*** (Cú pháp YAML trực quan) | **\*\*2.5/5\*\*** (Groovy DSL phức tạp) | **\*\*5/5\*\*** (Cấu hình đơn giản) | **\*\*3/5\*\*** (Cài đặt agent phức tạp) | **\*\*4.5/5\*\*** (Script Python gọn gàng) |
\| **\*\*3. Mức độ phù hợp SUT\*\*** | **\*\*5/5\*\*** (Native Monorepo PRs) | **\*\*3.5/5\*\*** (Cần setup webhook) | **\*\*5/5\*\*** (Chuẩn cho Node.js API) | **\*\*3/5\*\*** (Dành cho microservices) | **\*\*5/5\*\*** (Đọc log trực tiếp từ Jest) |
\| **\*\*4. Năng lực ứng dụng AI\*\***| **\*\*3.5/5\*\*** (Hỗ trợ qua Marketplace) | **\*\*2/5\*\*** (Plugin AI còn sơ khai) | **\*\*2.5/5\*\*** (Không tích hợp sẵn AI) | **\*\*4/5\*\*** (ML Test Impact Analysis) | **\*\*5/5\*\*** (Phân tích Cây giả thuyết) |
\| **\*\*5. Hệ sinh thái & Cộng đồng\*\***| **\*\*5/5\*\*** (>20,000 Actions) | **\*\*5/5\*\*** (Lịch sử lâu đời) | **\*\*5/5\*\*** (Chuẩn công nghiệp JS) | **\*\*4/5\*\*** (Hệ sinh thái Datadog) | **\*\*4/5\*\*** (Google Gemini Ecosystem) |
\| **\*\*TỔNG ĐIỂM (Thang 25)\*\*** | **\*\*23.0 / 25\*\*** | **\*\*16.0 / 25\*\*** | **\*\*22.5 / 25\*\*** | **\*\*16.0 / 25\*\*** | **\*\*23.5 / 25\*\*** |

same same cái này nè m, có thể bổ sung tiêu chí đánh giá (bỏ cái test harness ra nhé, cái đó để phần sau).
````

### Lượt 7 — Thời gian gửi: không có dữ liệu

> \* **\*\*Công cụ hỗ trợ thông minh (Specialized Diagnostic Assistant):\*\*** `AI Log Triage Action (Gemini API)` — Đóng vai trò là "Bác sĩ chẩn đoán" can thiệp có điều kiện khi pipeline thất bại, giải mã log lỗi và sinh cây giả thuyết nguyên nhân gốc rễ.
>
> ủa còn cái này nằm đâu m

### Lượt 8 — Thời gian gửi: không có dữ liệu

````text
Phần github actions 

| Tiêu chí đánh giá                            | GitHub Actions                                                                                                          | GitLab CI/CD                                                                                                                   | Jenkins                                                                                                          |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **1. Chi phí sử dụng trong phạm vi seminar** | **5/5** — Có runner do GitHub cung cấp và mức sử dụng miễn phí theo loại repository, gói tài khoản.                     | **4/5** — GitLab.com có runner và hạn mức compute miễn phí; dùng vượt hạn mức hoặc tự quản lý runner có thể phát sinh chi phí. | **3/5** — Phần mềm mã nguồn mở nhưng cần máy chủ và tài nguyên để chạy controller, agent.                        |
| **2. Mức độ dễ thiết lập ban đầu**           | **5/5** — Khai báo workflow YAML ngay trong repository GitHub.                                                          | **4/5** — Khai báo `.gitlab-ci.yml`; thuận tiện hơn khi repository ở GitLab.                                                   | **2/5** — Cần cài đặt server, cấu hình agent và tích hợp với repository.                                         |
| **3. Phù hợp với repository EShop hiện tại** | **5/5** — Tích hợp trực tiếp với push và pull request của repository trên GitHub.                                       | **3/5** — Có thể dùng với mã nguồn ngoài GitLab nhưng cần thêm bước kết nối hoặc chuyển repository.                            | **3/5** — Kết nối được với GitHub nhưng cần cấu hình trigger và quyền truy cập.                                  |
| **4. Kiểm soát môi trường chạy**             | **4/5** — Có runner do GitHub cung cấp hoặc runner tự quản lý.                                                          | **4/5** — Có runner do GitLab cung cấp hoặc runner tự quản lý.                                                                 | **5/5** — Chủ động bố trí controller, agent và tài nguyên thực thi.                                              |
| **5. Khả năng tùy biến, mở rộng pipeline**   | **4/5** — Dùng action, script và workflow tái sử dụng.                                                                  | **4/5** — Dùng job, stage và pipeline con.                                                                                     | **5/5** — Hệ sinh thái plugin lớn, linh hoạt trong cách tổ chức pipeline.                                        |
| **6. Công sức vận hành, bảo trì**            | **5/5** — Ít phải quản lý hạ tầng khi dùng runner do GitHub cung cấp.                                                   | **4/5** — Ít phải quản lý hạ tầng khi dùng runner trên GitLab.com.                                                             | **2/5** — Cần cập nhật, giám sát server và các plugin, agent.                                                    |
| **7. Tích hợp AI để phân tích log lỗi**      | **5/5** — Workflow của nhóm đã có job AI triage cho pull request có test thất bại; bước phân tích cần cấu hình API key. | **4/5** — Có thể thêm job gọi script/API và truyền log qua artifact; cần cấu hình lại cho GitLab.                              | **3/5** — Có thể gọi script/API trong pipeline nhưng nhóm phải tự cấu hình luồng log, quyền truy cập và hạ tầng. |
| **Tổng điểm (thang 35)**                     | **33/35**                                                                                                               | **27/35**                                                                                                                      | **23/35**                                                                                                        |

Ko dựa vào source để so sánh, đã t bảo là report là report chung, mặt khái niệm, cứ lôi source ra là t đã triển cái này nên thêm vào thì dc cái gì ?
````

### Lượt 9 — Thời gian gửi: không có dữ liệu

````text
## 5. Github Actions
### 5.1 Github Actions là gì?
### 5.2 Cấu trúc của Github Actions (Architecture,Workflow, Job, Step)

Viết cho t đi
````

### Lượt 10 — Thời gian gửi: không có dữ liệu

````text
\| Thành phần | Vai trò |
\| :--- | :--- |
\| **\*\*Event (sự kiện)\*\*** | Điều kiện khởi chạy workflow, chẳng hạn `push`, `pull_request`, lịch chạy hoặc thao tác thủ công. Được khai báo bằng khóa `on`. |
\| **\*\*Workflow (quy trình)\*\*** | Toàn bộ quy trình tự động hóa, được định nghĩa trong một tệp YAML thuộc thư mục `.github/workflows/`. Một repository có thể có nhiều workflow. |
\| **\*\*Job (công việc)\*\*** | Nhóm các bước thực hiện một nhiệm vụ như build hoặc test. Mỗi job chạy trên một runner; các job không có quan hệ phụ thuộc có thể chạy song song. |
\| **\*\*Runner (môi trường thực thi)\*\*** | Máy thực hiện job. Có thể dùng runner do GitHub cung cấp hoặc runner tự quản lý; thuộc tính `runs-on` xác định loại runner cho job. |
\| **\*\*Step (bước)\*\*** | Đơn vị nhỏ trong job, thực hiện một lệnh bằng `run` hoặc sử dụng một action bằng `uses`. Các step thông thường trong cùng job chạy theo thứ tự và chia sẻ môi trường của runner. |
\| **\*\*Action (thao tác tái sử dụng)\*\*** | Đoạn chức năng được đóng gói để dùng trong step, ví dụ lấy mã nguồn hoặc cài đặt môi trường chạy. |

Sửa, ko dùng bảng, dùng list đi
````

### Lượt 11 — Thời gian gửi: không có dữ liệu

````text
```yaml
name: Example Workflow
on:
  push:
```

tạo 1 file ví dụ chỗ này đi
````

### Lượt 12 — Thời gian gửi: không có dữ liệu

> ### 5.3 GitHub Actions trong EShop System Monorepo
>
> OK giờ tiếp phần này, phân tích từng job trong đó, vẽ thành cái flow ci/cd trong đó trước r giải thích từng cái nha m

### Lượt 13 — Thời gian gửi: không có dữ liệu

````text
#### Phân tích từng job

1. **`secret-scan` — kiểm tra thông tin nhạy cảm:** Job đầu tiên dùng Gitleaks quét toàn bộ lịch sử Git để tìm secret bị đưa vào repository. Nếu phát hiện vấn đề, job thất bại và các job kiểm thử, đánh giá, build phía sau bị bỏ qua. Báo cáo quét đã che giá trị secret được lưu thành artifact để xem lại.
2. **`backend-test` — chạy kiểm thử backend:** Chỉ bắt đầu sau khi `secret-scan` đạt. Job thiết lập Node.js 22, khôi phục bộ nhớ đệm dependency; khi không có cache khớp thì chạy `npm ci`. Sau đó Jest chạy **bộ unit test nghiệp vụ coupon** theo `jest.demo.config.js` và thu thập coverage của `coupon-discount.js`. Đây là bộ test được chọn cho CI demo, không phải toàn bộ test suite backend. Log, kết quả Jest và báo cáo coverage được tải lên thành artifact, kể cả khi test thất bại.
3. **`quality-gate` — đánh giá chất lượng:** Job đọc artifact từ `backend-test` và chạy script `.github/scripts/quality-gate.js`. Ba điều kiện cần đạt là **toàn bộ test trong bộ được chạy phải pass**, **line coverage của `coupon-discount.js` lớn hơn 70%**, và **có báo cáo LCOV hợp lệ**. Job vẫn chạy khi test thất bại để tạo báo cáo nêu rõ điều kiện không đạt. Chỉ khi Quality Gate đạt thì job `build` mới được chạy.
4. **`ai-triage` — hỗ trợ phân tích lỗi:** Nhánh này chỉ được kích hoạt với **pull request có `backend-test` thất bại**. Job lấy log kiểm thử và dùng script Python gọi Gemini API để tạo báo cáo chẩn đoán nếu có `GEMINI_API_KEY`. Báo cáo có thể được lưu thành artifact và đăng lên pull request; nội dung AI là gợi ý để người phát triển đối chiếu với log và mã nguồn. Khi thiếu API key, bước gọi Gemini được bỏ qua.
5. **`build` — đóng gói sản phẩm:** Chạy sau khi `secret-scan` và `quality-gate` đều đạt. Job cài dependency rồi build giao diện web và trang quản trị, đồng thời nén mã nguồn backend thành tệp `.tar.gz`. Các kết quả được tải lên dưới dạng build artifact; job này không đưa ứng dụng lên môi trường chạy.
6. **`workflow-summary` — tổng hợp và lưu dấu vết:** Job có điều kiện `always()` nên vẫn chạy sau khi các job trước đã hoàn thành hoặc bị bỏ qua. Nó ghi trạng thái của từng job cùng thông tin run ID, commit và sự kiện kích hoạt vào `ci-audit.json`, tải tệp này lên thành artifact, rồi tạo phần tóm tắt kết quả trong GitHub Actions.

tách cái này ra 1 xíu m, sao cảm giác gộp quá z
````

### Lượt 14 — Thời gian gửi: không có dữ liệu

````text
\### 5.1. Công cụ trọng tâm: GitHub Actions Workflow (`eshop-ci.yml`)
Workflow CI được thiết kế tuân thủ nguyên tắc Clean-Room Execution (mỗi lần chạy trên một máy ảo Ubuntu mới tinh, độc lập):
\* **\*\*Triggers:\*\*** Tự động kích hoạt khi có sự kiện `pull_request` mở hoặc cập nhật vào nhánh `main`, hoặc sự kiện `push` trực tiếp lên `main` có thay đổi trong thư mục `backend/\*\*`.
\* **\*\*Trình tự thực thi:\*\***
  1\. `actions/checkout@v4`: Tải toàn bộ mã nguồn commit hiện tại.
  2\. `actions/setup-node@v4`: Khởi tạo môi trường Node.js runtime phiên bản 20.x LTS.
  3\. `actions/cache@v4`: Phục hồi thư mục `node_modules` thông qua khóa cache dựa trên hash của `package-lock.json`.
  4\. `npm run test:ci:demo`: Kích hoạt Jest thực thi bộ kiểm thử nghiệp vụ coupon, xuất file kết quả JSON và LCOV coverage.
  5\. `npm run quality-gate`: Đánh giá 3 điều kiện rào chắn chất lượng.
  6\. `actions/upload-artifact@v4`: Lưu trữ báo cáo độ bao phủ LCOV HTML và log kiểm định.
  7\. `python3 .github/scripts/ai_triage.py`: [Chạy có điều kiện `if: failure()`] Phân tích log lỗi và gửi phản hồi lên GitHub PR.

\### 5.2. Tối ưu hóa bộ nhớ đệm phụ thuộc (`actions/cache`)
Thay vì tiêu tốn từ 45 đến 60 giây cho mỗi lần chạy để tải hàng trăm megabytes thư viện từ máy chủ npm public, nhóm thiết lập cơ chế cache phân cấp:
```yaml
- name: Cache Node.js Dependencies
  uses: actions/cache@v4
  with:
    path: backend/node_modules
    key: ${{ runner.os }}-node20-${{ hashFiles('backend/package-lock.json') }}
    restore-keys: **|**
      ${{ runner.os }}-node20-
```
\* **\*\*Khi Cache MISS (Lần đầu hoặc cập nhật package):\*\*** Chạy lệnh `npm ci`, thời gian chạy ~45 – 55 giây.
\* **\*\*Khi Cache HIT (Các commit sau):\*\*** Khôi phục nguyên vẹn thư viện trong ~5 – 8 giây, **\*\*tăng tốc pipeline gấp 8 đến 10 lần\*\***.

\### 5.3. Công cụ kiểm thử thực thi: Jest Test Engine & Cờ tuần tự hóa
Trong tệp tin cấu hình `backend/package.json`, nhóm chuẩn hóa cấu hình thực thi kiểm thử:
```json
{
  "scripts": {
    "test": "jest --runInBand --detectOpenHandles --forceExit",
    "test:coverage": "jest --runInBand --coverage",
    "test:ci:demo": "jest tests/coupon-discount.unit.test.js --coverage --runInBand",
    "quality-gate": "node ../.github/scripts/quality-gate.js"
  }
}
```
\* Cờ `--runInBand` (viết tắt `-i`): Bắt buộc Jest thực thi tất cả các file test tuần tự trên Process chính (Single Worker Process), loại bỏ hoàn toàn hiện tượng tranh chấp ghi đồng thời vào file `database.sqlite`.
\* Cờ `--detectOpenHandles`: Phát hiện và cảnh báo các kết nối database hoặc socket bất đồng bộ chưa được đóng, ngăn ngừa hiện tượng treo runner.
\* Cờ `--forceExit`: Đảm bảo Jest thoát dứt khoát sau khi hoàn thành toàn bộ test cases.

\### 5.4. Công cụ hỗ trợ chẩn đoán: AI Log Triage Script (`ai_triage.py`)
Script Python được thiết kế gọn nhẹ, không cài đặt thêm thư viện nặng, sử dụng thư viện chuẩn `urllib` để gọi REST API đến mô hình **\*\*Google Gemini 1.5 Flash\*\***:
```python
# Cấu trúc Cây giả thuyết (Hypothesis Tree) được AI sinh ra
{
  "failure_summary": "Coupon percentage discount formula calculated negative discount_amount",
  "root_cause_hypotheses": [
      {"hypothesis": "Formula inverted discount ratio", "confidence": "95%", "evidence": "server.js line 214"},
      {"hypothesis": "Unvalidated input percent > 100", "confidence": "60%", "evidence": "coupon.test.js line 85"}
  ],
  "recommended_actions": [
      "Clamp discount_amount using Math.max(0, Math.min(total_amount, calculated_discount))",
      "Add defensive validation for discount_value between 1 and 100"
  ]
}
```
Kết quả phân tích được tự động xuất ra định dạng Markdown và ghi thẳng vào **\*\*GitHub Actions Step Summary\*\*** và tạo **\*\*Comment trên Pull Request\*\***, giúp lập trình viên nắm bắt ngay vị trí gây lỗi mà không cần lục tìm hàng ngàn dòng log terminal.

\### 5.5. Cơ chế Branch Protection Rules & Khóa Pull Request
Để biến Quality Gate thành rào chắn bắt buộc trong kỹ nghệ phần mềm thực tế, nhóm kích hoạt cấu hình **\*\*Branch Protection Rules\*\*** trên nhánh `main`:
\* Bật tùy chọn `Require a pull request before merging` (chặn push trực tiếp vào `main`).
\* Bật tùy chọn `Require status checks to pass before merging`:
  - Trạng thái bắt buộc 1: `Quality Gate Check` (thuộc job `unit-test`).
  - Trạng thái bắt buộc 2: `Secret Scan (Gitleaks)`.
\* Bật tùy chọn `Require branches to be up to date before merging`.

**\*\*Hành vi thực tế:\*\*** Khi một lập trình viên mở PR có lỗi logic làm hỏng unit test hoặc vi phạm độ bao phủ, trạng thái kiểm tra chuyển sang đỏ (`Failed`), nút `Merge Pull Request` bị **\*\*KHÓA CỨNG (Disabled / Blocked)\*\*** trên giao diện GitHub. Lập trình viên bắt buộc phải push commit sửa lỗi để pipeline chuyển xanh thì mới được phép hòa trộn mã nguồn.

Dựa theo cái này, bổ sung vào new-report ở các vị trí tương ứng + viết lại văn phong cho phù hợp nha m
````

### Lượt 15 — Thời gian gửi: không có dữ liệu

> Trong job `backend-test`, `actions/cache@v5` lưu thư mục `backend/node_modules` với khóa gồm hệ điều hành runner, phiên bản Node.js 22 và hash của `backend/package-lock.json`. Khi khóa khớp hoàn toàn, workflow dùng lại dependency đã lưu và bỏ qua `npm ci`. Khi không có cache khớp hoàn toàn, workflow chạy `npm ci` để cài đặt theo lockfile.
>
> Ý là như cái này nè, cái này nằm ở **Dependency Caching:** Sử dụng `actions/cache` để lưu và tái sử dụng `node_modules` dựa trên hash của `package-lock.json`. Khi cache khớp, bỏ qua `npm ci`; ngược lại, cài đặt lại dependencies. đưa nó lên chung đi

## Tóm tắt công việc của AI

Các phản hồi AI cũ không còn nguyên văn trong ngữ cảnh hiện tại. Những việc dưới đây được ghi lại từ tóm tắt phiên và trạng thái tài liệu, **không phải trích dẫn hội thoại**:

1. Chuẩn hóa cấu trúc Markdown và hệ thống tiêu đề trong `docs/new-report.md`.
2. Viết phần tổng quan Test Harness Engineering theo hướng khái niệm, rồi bổ sung so sánh công cụ CI/CD và Test Harness ở mức lý thuyết.
3. Viết phần GitHub Actions, ví dụ workflow, sơ đồ CI và phân tích sáu job của EShop.
4. Đối chiếu nội dung mô tả với `.github/workflows/eshop-ci.yml`, `backend/package.json` và các script liên quan; sửa những chi tiết trong tư liệu tham khảo không khớp mã nguồn.
5. Gộp nội dung Dependency Caching và Jest vào job `backend-test`, gộp phần Gemini vào job `ai-triage`, rồi sắp lại số mục Branch Protection.
