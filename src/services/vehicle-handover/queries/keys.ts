export const queryKeys = {
  vehicleHandoverByBookingId: (bookingId: string) =>
    ["vehicle-handover", bookingId] as const,
};
