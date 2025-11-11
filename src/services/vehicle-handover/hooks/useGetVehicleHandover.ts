import { useVehicleHandoverByBookingId } from "../queries";

export const useGetVehicleHandover = (id: string) => {
  const { data, isLoading, error } = useVehicleHandoverByBookingId(id);
  return { data, isLoading, error };
};
