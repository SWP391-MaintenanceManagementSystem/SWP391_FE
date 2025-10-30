import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useCreateVehicleHandoverMutation } from "../mutations";
import {
  BookingCheckinsSchema,
  type BookingCheckinsFormValues,
} from "@/pages/booking/lib/schema";
import type { VehicleHandover } from "@/types/models/vehicle-handover";
import { queryKeys } from "../queries/keys";

type InitialData = {
  item?: VehicleHandover;
  bookingDate?: string | Date;
  bookingId?: string;
  note?: string;
};

export const useVehicleHandoverForm = (initialData?: InitialData) => {
  const queryClient = useQueryClient();
  const createMutation = useCreateVehicleHandoverMutation();

  const formatDate = (value?: string | Date): string =>
    value
      ? dayjs(value).format("YYYY-MM-DDTHH:mm")
      : dayjs().format("YYYY-MM-DDTHH:mm");

  const form = useForm<BookingCheckinsFormValues>({
    resolver: zodResolver(BookingCheckinsSchema),
    defaultValues: {
      bookingId: initialData?.item?.bookingId || initialData?.bookingId || "",
      odometer: Number(initialData?.item?.odometer) || 0,
      note: initialData?.item?.note || initialData?.note,
      description: initialData?.item?.description || [],
      images: undefined,
      date: initialData?.item?.date
        ? formatDate(initialData.item.date)
        : initialData?.bookingDate
          ? formatDate(initialData.bookingDate)
          : formatDate(),
    },
  });

  useEffect(() => {
    if (!initialData) return;
    form.reset({
      bookingId: initialData.item?.bookingId || initialData.bookingId || "",
      odometer: Number(initialData.item?.odometer) || 0,
      note: initialData?.item?.note || initialData?.note,
      description: initialData.item?.description || [],
      images: undefined,
      date: initialData.item?.date
        ? formatDate(initialData.item.date)
        : initialData.bookingDate
          ? formatDate(initialData.bookingDate)
          : formatDate(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.item?.id, initialData?.bookingDate, initialData?.bookingId]);

  const toFormData = (data: BookingCheckinsFormValues): FormData => {
    const formData = new FormData();

    formData.append("bookingId", data.bookingId);
    formData.append("odometer", String(data.odometer ?? 0));
    formData.append("note", data.note || "");
    formData.append("date", data.date);

    data.description?.forEach((desc) => formData.append("description", desc));

    if (Array.isArray(data.images)) {
      data.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    }

    return formData;
  };

  const handleServerErrors = (error: unknown) => {
    if (!(error instanceof AxiosError))
      return toast.error("Something went wrong");

    const apiErrors = error.response?.data?.errors;
    const msg = error.response?.data?.message;

    if (apiErrors && Array.isArray(apiErrors)) {
      apiErrors.forEach((err: { field?: string; message: string }) => {
        if (
          err.field &&
          form.getFieldState(err.field as keyof BookingCheckinsFormValues)
        ) {
          form.setError(err.field as keyof BookingCheckinsFormValues, {
            type: "server",
            message: err.message,
          });
        } else toast.error(err.message);
      });
    } else if (msg) toast.error(msg);
    else toast.error("Something went wrong. Please try again.");
  };

  const createHandover = async (data: BookingCheckinsFormValues) => {
    const formData = toFormData(data);
    return createMutation.mutateAsync(
      { data: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.vehicleHandoverByBookingId(data.bookingId),
          });
          queryClient.invalidateQueries({ queryKey: ["bookings"] });
          queryClient.invalidateQueries({
            queryKey: ["booking", data.bookingId],
          });
          queryClient.invalidateQueries({ queryKey: ["staff-bookings"] });
          toast.success("Vehicle handover created successfully");
        },
        onError: handleServerErrors,
      },
    );
  };

  return {
    form,
    createHandover,
    isPending: createMutation.isPending,
  };
};
