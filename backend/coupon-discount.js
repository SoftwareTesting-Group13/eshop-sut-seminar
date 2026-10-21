function calculateDiscount(totalAmount, coupon) {
  if (coupon.type === 'percent') {
    return Math.floor(totalAmount * (1 - coupon.discount_value));
  }
  return coupon.discount_value;
}

module.exports = { calculateDiscount };
