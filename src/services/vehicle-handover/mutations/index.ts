import { useMutation } from "@tanstack/react-query";
import {
  createVehicleHandover,
  updateVehicleHandover,
} from "../apis/vehicle-handover.api";

export const useCreateVehicleHandoverMutation = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      const response = await createVehicleHandover(data);
      return response.data;
    },
  });
};

export const useUpdateVehicleHandoverMutation = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await updateVehicleHandover(id, data);
      return response.data;
    },
  });
};
