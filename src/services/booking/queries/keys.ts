import type { BookingFilters } from "@/types/models/booking";

export const queryKeys = {
  bookings: (filter: BookingFilters) => ["bookings", filter] as const,
};
