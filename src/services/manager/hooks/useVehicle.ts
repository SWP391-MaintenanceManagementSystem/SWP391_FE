import { useDeleteVehicle, useEditVehicle } from "../mutations";
import {
  type AddVehicleFormData,
  AddVehicleSchema,
} from "@/pages/vehicle/components/libs/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Vehicle } from "@/types/models/vehicle";

export default function useVehicle(
  customerId: string,
  vehicle: Vehicle,
  currentPage: number,
  currentPageSize: number,
) {
  const deleteVehicleMutation = useDeleteVehicle();
  const editVehicleMutation = useEditVehicle();

  const handleDelete = (id: string) => {
    deleteVehicleMutation.mutate({
      id,
      customerId,
      currentPage,
      currentPageSize,
    });
  };

  const form = useForm<AddVehicleFormData>({
    resolver: zodResolver(AddVehicleSchema),
    defaultValues: {
      vin: "",
      licensePlate: "",
      brandId: "",
      modelId: "",
      status: "ACTIVE",
    },
  });

  const handleEdit = (data: AddVehicleFormData) => {
    editVehicleMutation.mutate({
      vehicleId: vehicle.id,
      customerId,
      data,
      currentPage,
      currentPageSize,
    });
  };

  return {
    handleDelete,
    handleEdit,
    form,
  };
}
