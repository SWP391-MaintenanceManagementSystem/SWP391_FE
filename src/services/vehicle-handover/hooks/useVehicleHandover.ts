import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  useCreateVehicleHandoverMutation,
  useUpdateVehicleHandoverMutation,
} from "../mutations";
import {
  BookingCheckinsSchema,
  type BookingCheckinsFormValues,
} from "@/pages/booking/lib/schema";
import type { VehicleHandover } from "@/types/models/vehicle-handover";

type InitialData = {
  item?: VehicleHandover;
  bookingDate?: string | Date;
  bookingId?: string;
  note?: string;
};

export const useVehicleHandoverForm = (initialData?: InitialData) => {
  const queryClient = useQueryClient();
  const createMutation = useCreateVehicleHandoverMutation();
  const updateMutation = useUpdateVehicleHandoverMutation();

  const formatDate = (value?: string | Date): string =>
    value
      ? dayjs(value).format("YYYY-MM-DDTHH:mm")
      : dayjs().format("YYYY-MM-DDTHH:mm");

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
        } else {
          toast.error(err.message);
        }
      });
    } else if (msg) {
      toast.error(msg);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const form = useForm<BookingCheckinsFormValues>({
    resolver: zodResolver(BookingCheckinsSchema),
    defaultValues: {
      bookingId: initialData?.item?.bookingId || initialData?.bookingId || "",
      odometer: Number(initialData?.item?.odometer) || 0,
      note: initialData?.item?.note || initialData?.note,
      description: initialData?.item?.description || [],
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
      date: initialData.item?.date
        ? formatDate(initialData.item.date)
        : initialData.bookingDate
          ? formatDate(initialData.bookingDate)
          : formatDate(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.item?.id, initialData?.bookingDate, initialData?.bookingId]);

  const transformData = (data: BookingCheckinsFormValues) => ({
    ...data,
    description: data.description.filter((line) => line.trim() !== ""),
  });

  const createHandover = async (data: BookingCheckinsFormValues) => {
    const payload = transformData(data);
    return createMutation.mutateAsync(
      { data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vehicle-handovers"] });
          queryClient.invalidateQueries({
            queryKey: ["bookings"],
          });
          queryClient.invalidateQueries({
            queryKey: ["booking", data.bookingId],
          });
          queryClient.invalidateQueries({
            queryKey: ["staff-bookings"],
          });
          toast.success("Vehicle handover created successfully");
        },
        onError: handleServerErrors,
      },
    );
  };

  const updateHandover = async (data: BookingCheckinsFormValues) => {
    const payload = transformData(data);
    return updateMutation.mutateAsync(
      { id: initialData?.item?.id ?? "", data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vehicle-handovers"] });
          toast.success("Vehicle handover updated successfully");
        },
        onError: handleServerErrors,
      },
    );
  };

  return {
    form,
    createHandover,
    updateHandover,
    isPending: createMutation.isPending || updateMutation.isPending,
  };
};
