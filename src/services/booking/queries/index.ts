import type { BookingFilters } from "@/types/models/booking";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { toast } from "sonner";
import { getBookings } from "../apis/booking.api";
export const useBookingsQuery = (filter: BookingFilters) => {
  return useQuery({
    queryKey: queryKeys.bookings(filter),
    queryFn: async () => {
      try {
        const res = await getBookings({ ...filter });
        return res.data;
      } catch (error) {
        toast.error("Failed to get booking list");
        throw error;
      }
    },
  });
};
