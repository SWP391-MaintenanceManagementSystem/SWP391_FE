import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import type { BookingFilters, TechnicianBooking } from "@/types/models/booking";
import type { PaginationResponse } from "@/types/models/response";
import { getTechnicianBookings } from "../apis/technician-booking.api";

export const useTechnicianBookingsQuery = (filter: BookingFilters) => {
  const queryKey = queryKeys.technicianBookings(filter);

  return useQuery<PaginationResponse<TechnicianBooking>>({
    queryKey,
    queryFn: async () => {
      try {
        const res = await getTechnicianBookings(filter);
        return res;
      } catch (error) {
        toast.error("Failed to get technician bookings");
        throw error;
      }
    },
    enabled: !!filter.page && !!filter.page,
  });
};
