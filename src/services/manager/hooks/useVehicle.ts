import { useDeleteVehicle } from "../mutations";

export default function useVehicle() {
  const deleteVehicleMutation = useDeleteVehicle();

  const handleDelete = (vehicleId: string, customerId: string) => {
    deleteVehicleMutation.mutate({
      id: vehicleId,
      customerId,
    });
  };

  return {
    handleDelete,
  };
}
