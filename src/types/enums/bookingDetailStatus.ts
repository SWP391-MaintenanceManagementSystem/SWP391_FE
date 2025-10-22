export const BookingDetailStatus = {
  PENDING: "PENDING",
  IN_PROCESS: "IN_PROCESS",
  COMPLETED: "COMPLETED",
} as const;

export type BookingDetailStatus =
  (typeof BookingDetailStatus)[keyof typeof BookingDetailStatus];
