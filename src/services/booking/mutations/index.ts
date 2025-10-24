import type { CreateBookingFormValues } from "@/pages/booking/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBookingById, createBooking } from "../apis/booking.api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { BookingAssignmentFormValues } from "@/pages/booking/lib/schema";
import { createBookingAssignment } from "../apis/booking-assignment.api";

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: CreateBookingFormValues }) => {
      const updatedCustomerInfo = await createBooking(data);
      return updatedCustomerInfo.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking created successfully");
    },
    onError: () => {
      toast.error("Failed to create booking");
    },
  });
};

export const useCancelBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: string) => {
      const updatedCustomerInfo = await cancelBookingById(bookingId);
      return updatedCustomerInfo.data;
    },
    onSuccess: async (_data, bookingId, page, pageSize) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["staff-bookings", page, pageSize],
        }),
        queryClient.invalidateQueries({
          queryKey: ["booking", bookingId],
        }),
      ]);
      toast.success("Booking canceled successfully");
    },
    onError: (error) => {
      let msg = "Failed to cancel booking";
      if (error instanceof AxiosError) {
        msg = error.message || msg;
      }
      toast.error(msg);
    },
  });
};

export const useCreateBookingAssignmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: BookingAssignmentFormValues }) => {
      const assign = await createBookingAssignment(data);
      return assign.data;
    },
    onSuccess: async (_data, bookingId, page, pageSize) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["booking", bookingId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["staff-bookings", page, pageSize],
        }),
      ]);
      toast.success("Assignment technician successfully");
    },
  });
};
