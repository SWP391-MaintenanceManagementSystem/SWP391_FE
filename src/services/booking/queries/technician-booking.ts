import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import type { BookingFilters, TechnicianBooking } from "@/types/models/booking";
import type { PaginationResponse } from "@/types/models/response";
import { getTechnicianBookings } from "../apis/technician-booking.api";

export const useTechnicianBookingsQuery = (filter: BookingFilters) => {
  return useQuery<PaginationResponse<TechnicianBooking>>({
    queryKey: queryKeys.technicianBookings(filter),
    queryFn: async () => {
      try {
        const res = await getTechnicianBookings(filter);
        return res;
      } catch (error) {
        toast.error("Failed to get technician bookings");
        throw error;
      }
    },
  });
};
