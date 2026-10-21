/**
 * Cấu hình Jest dùng chung cho local và CI.
 *
 * Lý do tách file cấu hình riêng (thay vì nhét `jest` vào `package.json`):
 *   - `package.json` đang được thành viên khác chỉnh sửa (task cấu hình LCOV),
 *     giữ cấu hình ở file riêng giảm rủi ro conflict khi merge.
 *   - Cùng một cấu hình được dùng cho lệnh `npm test` (local) và `npm run test:ci`
 *     (GitHub Actions) => số liệu coverage luôn khớp với nhau.
 *
 * Ngưỡng line coverage (> 70%) KHÔNG đặt ở đây mà do script
 * `.github/scripts/quality-gate.js` kiểm soát — một nơi duy nhất quyết định
 * PASS/FAIL nên không thể xảy ra tình trạng "Jest báo fail nhưng gate báo pass".
 */

module.exports = {
  testEnvironment: "node",

  // Chỉ thu thập coverage cho mã nguồn SUT thật (không tính test/demos).
  collectCoverageFrom: ["server.js", "database.js", "coupon-discount.js"],
  coveragePathIgnorePatterns: ["/node_modules/", "/demos/", "/tests/"],

  // Đầu ra: bảng text trong log CI, báo cáo LCOV và JSON cho Quality Gate.
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "text-summary", "lcov", "json-summary", "json"],
};
