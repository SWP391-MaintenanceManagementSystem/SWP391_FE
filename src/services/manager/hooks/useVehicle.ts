import { useDeleteVehicle } from "../mutations";

export default function useVehicle(customerId: string) {
  const deleteVehicleMutation = useDeleteVehicle();

  const handleDelete = (id: string) => {
    deleteVehicleMutation.mutate({
      id,
      customerId,
    });
  };

  return {
    handleDelete,
  };
}
