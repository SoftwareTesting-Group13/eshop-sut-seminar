const { calculateDiscount } = require('../coupon-discount');

describe('calculateDiscount', () => {
  test.each([
    { total: 1_000_000, value: 10, expected: 100_000 },
    { total: 305_000, value: 10, expected: 30_500 },
    { total: 99, value: 10, expected: 9 },
  ])('percent $value% of $total is $expected', ({ total, value, expected }) => {
    expect(calculateDiscount(total, { type: 'percent', discount_value: value }))
      .toBe(expected);
  });

  it('uses the fixed amount for fixed coupons', () => {
    expect(calculateDiscount(600_000, { type: 'fixed', discount_value: 50_000 }))
      .toBe(50_000);
  });
});
