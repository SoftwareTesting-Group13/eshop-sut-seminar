const baseConfig = require('./jest.config');

// CI demo chỉ kiểm tra hai hành vi coupon đã chọn. Coverage ở gate là của
// coupon-discount.js; npm run test:ci vẫn chạy toàn bộ backend test suite.
module.exports = {
  ...baseConfig,
  testMatch: ['<rootDir>/tests/coupon-discount.unit.test.js'],
  collectCoverageFrom: ['coupon-discount.js'],
};
