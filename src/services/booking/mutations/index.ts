import type {
  CreateBookingFormValues,
  EditBookingFormValues,
} from "@/pages/booking/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelBookingById,
  createBooking,
  customerUpdateBooking,
} from "../apis/booking.api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { BookingAssignmentFormValues } from "@/pages/booking/lib/schema";
import {
  createBookingAssignment,
  unBookingAssignment,
} from "../apis/booking-assignment.api";
import { completeTechnicianBooking } from "../apis/technician-booking.api";

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
    },
    onError: () => {
      toast.error("Failed to create booking");
    },
  });
};

export const useUpdateBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: EditBookingFormValues }) => {
      const { id, bookingDate, note, packageIds, serviceIds, vehicleId } = data;
      const updatedBooking = await customerUpdateBooking({
        id,
        bookingDate,
        note,
        packageIds: packageIds || [],
        serviceIds: serviceIds || [],
        vehicleId,
      });
      return updatedBooking.data;
    },
    onSuccess: async (_data, variables) => {
      const bookingId = variables.data.id;
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["booking", bookingId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["staff-bookings"],
        }),
      ]);
      toast.success("Booking updated successfully");
    },
    onError: (error) => {
      let msg = "Failed to update booking";
      if (error instanceof AxiosError) {
        msg = error.response?.data?.message || msg;
      }
      toast.error(msg);
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
    onSuccess: async (_data, bookingId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["staff-bookings"],
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
        msg = error.response?.data?.message || msg;
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
    onSuccess: async (_data, variables) => {
      const bookingId = variables.data.bookingId;
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["booking", bookingId] }),
        queryClient.invalidateQueries({ queryKey: ["staff-bookings"] }),
        queryClient.invalidateQueries({
          queryKey: ["booking-assignment-list"],
        }),
      ]);
      toast.success("Assigned technician successfully");
    },
  });
};

export const useUnBookingAssignmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: string;
      employeeEmail: string;
      bookingId: string;
    }) => {
      const res = await unBookingAssignment(id);
      return res?.data;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["booking", variables.bookingId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["booking-assignment-list"],
        }),
      ]);

      toast.success(
        `Unassigned technician with email ${variables.employeeEmail} successfully`,
      );
    },
    onError: () => {
      toast.error("Failed to unassign technician");
    },
  });
};

// useCompleteTechnicianBookingMutation.ts
export const useCompleteTechnicianBookingMutation = (
  handleOnSuccess: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      detailIds,
    }: {
      bookingId: string;
      detailIds: string[];
    }) => {
      const res = await completeTechnicianBooking(bookingId, detailIds);
      return res;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["technician-bookings"] }),
        queryClient.invalidateQueries({
          queryKey: ["booking", variables.bookingId],
        }),
      ]);
      handleOnSuccess();
      toast.success("Booking marked as completed");
    },
    onError: (error) => {
      let msg = "Failed to mark booking as completed";
      if (error instanceof AxiosError) {
        msg = error.response?.data?.message || msg;
      }
      toast.error(msg);
    },
  });
};
