import type { BookingFilters } from "@/types/models/booking";

export const queryKeys = {
  bookings: (filter: BookingFilters) => ["bookings", filter] as const,
  technicianBookings: (filter: BookingFilters) =>
    ["technician-bookings", filter] as const,
};
