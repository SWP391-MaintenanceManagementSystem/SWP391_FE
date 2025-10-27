import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import dayjs from "dayjs";

import { useCreateVehicleHandoverMutation } from "../mutations";
import {
  BookingCheckinsSchema,
  type BookingCheckinsFormValues,
} from "@/pages/booking/lib/schema";
import type { VehicleHandover } from "@/types/models/vehicle-handover";

type InitialBookingData = {
  item: VehicleHandover;
};

export const useCreateVehicleHandoverForm = (
  initialData?: InitialBookingData,
) => {
  const queryClient = useQueryClient();
  const createVehicleHandoverMutation = useCreateVehicleHandoverMutation();

  const form = useForm<BookingCheckinsFormValues>({
    resolver: zodResolver(BookingCheckinsSchema),
    defaultValues: {
      bookingId: initialData?.item.bookingId || "",
      odometer: initialData?.item.odometer || 0,
      note: initialData?.item.note || "",
      description: initialData?.item.description || [],
      date:
        initialData?.item.date ||
        dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
    },
  });

  const onSubmit = async (data: BookingCheckinsFormValues) => {
    const transformedData: BookingCheckinsFormValues = {
      ...data,
      description: Array.isArray(data.description)
        ? data.description.filter((line) => line.trim() !== "")
        : [],
    };

    return createVehicleHandoverMutation.mutateAsync(
      { data: transformedData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vehicle-handovers"] });
          toast.success("Vehicle handover created successfully");
          form.reset({
            bookingId: form.getValues("bookingId"),
            odometer: 0,
            note: "",
            description: [],
            date: dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
          });
        },
        onError: (error) => {
          let msg = "Failed to create vehicle handover";
          if (error instanceof AxiosError) {
            msg = error.response?.data?.message || msg;
          }
          toast.error(msg);
          console.error(error);
        },
      },
    );
  };

  return {
    form,
    onSubmit,
    isPending: createVehicleHandoverMutation.isPending,
  };
};
