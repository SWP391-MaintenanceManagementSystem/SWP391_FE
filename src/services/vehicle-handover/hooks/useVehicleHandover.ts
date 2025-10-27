import { useVehicleHandoverByBookingId } from "../queries";

export const useVehicleHandover = (id: string) => {
  const { data, isLoading, error } = useVehicleHandoverByBookingId(id);
  return { data, isLoading, error };
};
