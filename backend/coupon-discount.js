function calculateDiscount(totalAmount, coupon) {
  if (coupon.type === 'percent') {
    return Math.floor(totalAmount * (coupon.discount_value / 100));
  }
  return coupon.discount_value;
}

function validateCoupon({ code, totalAmount, coupon, now = new Date() }) {
  if (!code) return { status: 400, error: 'Vui lòng nhập mã giảm giá' };
  if (!coupon || coupon.is_active !== 1) {
    return { status: 404, error: 'Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa' };
  }
  if (!(totalAmount >= coupon.min_order_amount)) {
    return {
      status: 400,
      error: `Đơn hàng chưa đủ giá trị tối thiểu ${coupon.min_order_amount.toLocaleString()} ₫ để áp dụng mã này`,
    };
  }
  if (new Date(coupon.expired_at) < now) {
    return { status: 400, error: 'Mã giảm giá đã hết hạn' };
  }
  return null;
}

function buildCouponResult({ totalAmount, coupon, userId, usageCount = 0 }) {
  if (userId && usageCount >= coupon.max_uses_per_user) {
    return {
      status: 400,
      body: { error: `Bạn đã sử dụng mã này ${coupon.max_uses_per_user} lần (đã đạt giới hạn)` },
    };
  }

  const discount_amount = calculateDiscount(totalAmount, coupon);
  return {
    status: 200,
    body: {
      success: true,
      coupon_id: coupon.id,
      discount_amount,
      final_amount: totalAmount - discount_amount,
      message: `Áp dụng thành công! Giảm ${coupon.type === 'percent' ? coupon.discount_value + '%' : coupon.discount_value.toLocaleString() + ' ₫'}`,
    },
  };
}

module.exports = { calculateDiscount, validateCoupon, buildCouponResult };
