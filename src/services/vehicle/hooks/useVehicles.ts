import { useGetMyVehicle } from "../queries";
import { useAddVehicleMutation, useDeleteVehicleMutation } from "../mutations";
import {
  AddVehicleSchema,
  type AddVehicleFormData,
} from "@/pages/vehicle/components/libs/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

export default function useVehicles() {
  const { data, isLoading, isError } = useGetMyVehicle();
  const addVehicleMutation = useAddVehicleMutation();
  const deleteVehicleMutation = useDeleteVehicleMutation();

  const form = useForm<AddVehicleFormData>({
    resolver: zodResolver(AddVehicleSchema),
    defaultValues: {
      vin: "",
      licensePlate: "",
      brandId: "",
      modelId: "",
    },
  });

  const onSubmit = (formData: AddVehicleFormData) => {
    addVehicleMutation.mutateAsync(formData, {
      onSuccess: () => {
        form.reset();
      },
      onError: async (err: unknown) => {
        if (err instanceof AxiosError) {
          const errors = await err.response?.data?.errors;
          if (errors) {
            Object.entries(errors).forEach(([field, message]) => {
              form.setError(field as keyof AddVehicleFormData, {
                type: "server",
                message: Array.isArray(message) ? message.join(", ") : String(message),
              });
            });
          }
        }
      },
    });
  };

  const onDeleteVehicle = (vehicleId: string) => {
    deleteVehicleMutation.mutate(vehicleId);
  };

  return { data, isLoading, isError, onSubmit, form, onDeleteVehicle };
}
