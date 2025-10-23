import type { BookingFilters } from "@/types/models/booking";

export const queryKeys = {
  bookings: (filter: BookingFilters) => ["bookings", filter] as const,
  bookingDetail: (id: string) => ["booking", id] as const,
  technicianBookings: (filter: BookingFilters) =>
    ["technician-bookings", filter] as const,
  staffBookings: (filter: BookingFilters) =>
    ["staff-bookings", filter] as const,
};
