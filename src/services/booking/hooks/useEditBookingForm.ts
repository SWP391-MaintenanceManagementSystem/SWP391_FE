import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useUpdateBookingMutation } from "@/services/booking/mutations";
import {
  EditBookingSchema,
  type EditBookingFormValues,
} from "@/pages/booking/lib/schema";
import { AxiosError } from "axios";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";

export const useEditBookingForm = (booking: CustomerBookingDetails) => {
  const queryClient = useQueryClient();
  const updateBookingMutation = useUpdateBookingMutation();

  const serviceIds = booking.bookingDetails.services.map((s) => s.id);
  const packageIds = booking.bookingDetails.packages.map((p) => p.id);

  const defaultValues = {
    id: booking.id,
    vehicleId: booking.vehicle.id,
    centerId: booking.serviceCenter.id,
    serviceIds: serviceIds.length > 0 ? serviceIds : undefined,
    packageIds: packageIds.length > 0 ? packageIds : undefined,
    bookingDate: dayjs(booking.bookingDate).format("YYYY-MM-DDTHH:mm"),
    note: booking.note || "",
  };

  const form = useForm<EditBookingFormValues>({
    resolver: zodResolver(EditBookingSchema),
    defaultValues,
  });

  useEffect(() => {
    const newDefaults = {
      id: booking.id,
      vehicleId: booking.vehicle.id,
      centerId: booking.serviceCenter.id,
      serviceIds: serviceIds.length > 0 ? serviceIds : undefined,
      packageIds: packageIds.length > 0 ? packageIds : undefined,
      bookingDate: dayjs(booking.bookingDate).format("YYYY-MM-DDTHH:mm"),
      note: booking.note || "",
    };
    form.reset(newDefaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.id, booking.bookingDate, booking.note, serviceIds.length, packageIds.length]);

  const onSubmit = async (data: EditBookingFormValues) => {
    return updateBookingMutation.mutateAsync(
      {
        data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["bookings"],
          });
          queryClient.invalidateQueries({
            queryKey: ["booking", booking.id],
          });
          toast.success("Booking updated successfully");
        },
        onError: (error) => {
          let msg = "Failed to update booking";
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
    isPending: updateBookingMutation.isPending,
  };
};
