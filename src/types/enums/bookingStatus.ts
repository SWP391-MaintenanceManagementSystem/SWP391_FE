export const BookingStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  CHECKED_IN: "CHECKED_IN",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
