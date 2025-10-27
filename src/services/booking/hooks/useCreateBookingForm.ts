import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useEffect } from "react";

import { useCreateBookingMutation } from "@/services/booking/mutations";
import {
  CreateBookingSchema,
  type CreateBookingFormValues,
} from "@/pages/booking/lib/schema";
import { AxiosError } from "axios";

type InitialBookingData = {
  vehicleId?: string;
  bookingDate?: string;
};

export const useBookingCreateForm = (initialData?: InitialBookingData) => {
  const queryClient = useQueryClient();
  const createBookingMutation = useCreateBookingMutation();

  const form = useForm<CreateBookingFormValues>({
    resolver: zodResolver(CreateBookingSchema),
    defaultValues: {
      vehicleId: initialData?.vehicleId || "",
      centerId: "",
      serviceIds: [],
      packageIds: [],
      bookingDate: initialData?.bookingDate || dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
      note: "",
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    form.reset({
      vehicleId: initialData?.vehicleId || "",
      centerId: "",
      serviceIds: [],
      packageIds: [],
      bookingDate: initialData?.bookingDate || dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
      note: "",
    });
  }, [initialData?.vehicleId, initialData?.bookingDate, form]);

  const onSubmit = async (data: CreateBookingFormValues) => {
    return createBookingMutation.mutateAsync(
      {
        data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["bookings"],
          });
          toast.success("Booking created successfully");
          form.reset();
        },
        onError: (error) => {
          let msg = "Failed to create booking";
          if (error instanceof AxiosError) {
            msg = error.response?.data?.message || msg;
            if (msg.includes("shift")) {
              form.setError("bookingDate", {
                type: "manual",
                message: msg,
              });
              return;
            }
          }
          toast.error(msg);
          console.error(error);
        },
      }
    );
  };

  const reset = () => form.reset();

  return {
    form,
    onSubmit,
    reset,
    isPending: createBookingMutation.isPending,
  };
};
