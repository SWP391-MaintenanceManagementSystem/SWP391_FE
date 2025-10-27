import type { BookingFilters } from "@/types/models/booking";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { toast } from "sonner";
import { getBookingById, getBookings } from "../apis/booking.api";
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
    enabled: !!filter.page && !!filter.pageSize,
  });
};

export const useBookingDetailQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.bookingDetail(id),
    queryFn: async () => {
      try {
        const res = await getBookingById(id);
        return res.data.data;
      } catch (error) {
        toast.error("Failed to get booking detail");
        throw error;
      }
    },
  });
};
