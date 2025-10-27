import type { BookingCheckinsFormValues } from "@/pages/booking/lib/schema";
import { useMutation } from "@tanstack/react-query";
import { createVehicleHandover } from "../apis/vehicle-handover.api";

export const useCreateVehicleHandoverMutation = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: BookingCheckinsFormValues }) => {
      const updatedCustomerInfo = await createVehicleHandover(data);
      return updatedCustomerInfo.data;
    },
  });
};
