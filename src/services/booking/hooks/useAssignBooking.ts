import { useCreateBookingAssignmentMutation } from "../mutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BookingAssignmentSchema,
  type BookingAssignmentFormValues,
} from "@/pages/booking/lib/schema";
import { AxiosError } from "axios";

export const useAssignBooking = () => {
  const queryClient = useQueryClient();
  const assignBookingMutation = useCreateBookingAssignmentMutation();

  const form = useForm<BookingAssignmentFormValues>({
    resolver: zodResolver(BookingAssignmentSchema),
    defaultValues: {
      bookingId: "",
      employeeIds: [],
    },
  });

  const onSubmit = async (data: BookingAssignmentFormValues) => {
    try {
      await assignBookingMutation.mutateAsync(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["booking", data.bookingId],
            });
            toast.success("Assignment booking successfully");
            form.reset();
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              const apiErrors = error.response?.data?.errors;
              const msg = error.response?.data.message;
              if (apiErrors && typeof apiErrors === "object") {
                Object.entries(apiErrors).forEach(([field, msg]) => {
                  form.setError(field as keyof BookingAssignmentFormValues, {
                    type: "server",
                    message: msg as string,
                  });
                });
              } else if (msg) {
                toast.error(msg);
              } else {
                toast.error("Something went wrong. Please try again.");
              }
            }
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const reset = () => form.reset();

  return {
    form,
    onSubmit,
    reset,
    isPending: assignBookingMutation.isPending,
    isSuccess: assignBookingMutation.isSuccess,
    isError: assignBookingMutation.isError,
  };
};
