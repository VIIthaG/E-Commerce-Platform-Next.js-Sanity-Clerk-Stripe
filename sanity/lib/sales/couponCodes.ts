export const COUPON_CODES = {
  JHI: "JHI",
  LOC: "LOC",
  VIIthaG: "VIIthaG",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
