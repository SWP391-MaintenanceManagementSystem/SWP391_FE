import type { BookingFilters } from "@/types/models/booking";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { toast } from "sonner";
import { getBookingManagementList } from "../apis/staff-booking.api";

export const useBookingsQuery = (filter: BookingFilters) => {
  return useQuery({
    queryKey: queryKeys.staffBookings(filter),
    queryFn: async () => {
      try {
        const res = await getBookingManagementList({ ...filter });
        return res.data;
      } catch (error) {
        toast.error("Failed to get booking list");
        throw error;
      }
    },
  });
};
