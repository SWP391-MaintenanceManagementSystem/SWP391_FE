import type { BookingFilters } from "@/types/models/booking";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { toast } from "sonner";
import { getBookingManagementList } from "../apis/staff-booking.api";
import { getBookingAssignmentById } from "../apis/booking-assignment.api";

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

export const useBookingAssignmentListQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.bookingAssignmentList(id),
    queryFn: async () => {
      try {
        const res = await getBookingAssignmentById(id);
        return res.data;
      } catch (error) {
        toast.error("Failed to get booking details");
        throw error;
      }
    },
  });
};
