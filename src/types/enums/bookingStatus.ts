export const BookingStatus = {
  PENDING: "PENDING",
  ASSIGNED: "ASSIGNED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  CHECKED_IN: "CHECKED_IN",
  CHECKED_OUT: "CHECKED_OUT",
  IN_PROGRESS: "IN_PROGRESS",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
