const baseConfig = require('./jest.config');

// CI demo chạy unit test cho nghiệp vụ coupon: điều kiện áp mã, tính giảm giá,
// số tiền cuối và giới hạn lượt dùng. Coverage ở gate chỉ đo module này;
// npm run test:ci vẫn chạy toàn bộ backend test suite.
module.exports = {
  ...baseConfig,
  testMatch: ['<rootDir>/tests/coupon-discount.unit.test.js'],
  collectCoverageFrom: ['coupon-discount.js'],
};
