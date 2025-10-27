import type { BookingCheckinsFormValues } from "@/pages/booking/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createVehicleHandover,
  updateVehicleHandover,
} from "../apis/vehicle-handover.api";

export const useCreateVehicleHandoverMutation = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: BookingCheckinsFormValues }) => {
      const updatedCustomerInfo = await createVehicleHandover(data);
      return updatedCustomerInfo.data;
    },
  });
};

export const useUpdateVehicleHandoverMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: BookingCheckinsFormValues;
    }) => {
      const updatedCustomerInfo = await updateVehicleHandover(id, data);
      return updatedCustomerInfo.data;
    },
  });
};
