function calculateDiscount(totalAmount, coupon) {
  if (coupon.type === 'percent') {
    return Math.floor(totalAmount * coupon.discount_value / 100);
  }
  return coupon.discount_value;
}

module.exports = { calculateDiscount };
