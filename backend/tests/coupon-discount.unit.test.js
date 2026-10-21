const { calculateDiscount } = require('../coupon-discount');

describe('calculateDiscount', () => {
  it('discounts 10% of 1,000,000 by 100,000', () => {
    expect(calculateDiscount(1_000_000, { type: 'percent', discount_value: 10 }))
      .toBe(100_000);
  });

  it('uses the fixed amount for fixed coupons', () => {
    expect(calculateDiscount(600_000, { type: 'fixed', discount_value: 50_000 }))
      .toBe(50_000);
  });
});
