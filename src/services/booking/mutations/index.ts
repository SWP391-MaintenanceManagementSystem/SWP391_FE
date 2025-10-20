import type { CreateBookingFormValues } from "@/pages/booking/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../apis/booking.api";
import { queryKeys } from "../queries/keys";
import { toast } from "sonner";
export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: CreateBookingFormValues }) => {
      const updatedCustomerInfo = await createBooking(data);
      return updatedCustomerInfo.data;
    },
    onSuccess: async (_data, variables) => {
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
