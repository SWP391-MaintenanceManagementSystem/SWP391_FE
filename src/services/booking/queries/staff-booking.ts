import type { BookingFilters } from "@/types/models/booking";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { toast } from "sonner";
import {
  getBookingManagementList,
  getBookingHistoryList,
} from "../apis/staff-booking.api";
import { getBookingAssignmentById } from "../apis/booking-assignment.api";

export const useStaffBookingsQuery = (filter: BookingFilters) => {
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
    enabled: !!filter.page && !!filter.pageSize,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
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
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBookingsHistoryQuery = (filter: BookingFilters) => {
  return useQuery({
    queryKey: queryKeys.bookingsHistory(filter),
    queryFn: async () => {
      try {
        const res = await getBookingHistoryList({ ...filter });
        return res.data;
      } catch (error) {
        toast.error("Failed to get booking list");
        throw error;
      }
    },
    enabled: !!filter.page && !!filter.pageSize,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};
