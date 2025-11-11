export const NotificationType = {
  SYSTEM: "SYSTEM",
  BOOKING: "BOOKING",
  PAYMENT: "PAYMENT",
  SHIFT: "SHIFT",
  MEMBERSHIP: "MEMBERSHIP",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
