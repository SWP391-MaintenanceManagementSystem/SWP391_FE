import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { toast } from "sonner";
import { getVehicleHandoverByBookingId } from "../apis/vehicle-handover.api";
export const useVehicleHandoverByBookingId = (id: string) => {
  return useQuery({
    queryKey: queryKeys.vehicleHandoverByBookingId(id),
    queryFn: async () => {
      try {
        const res = await getVehicleHandoverByBookingId(id);
        return res.data.data;
      } catch (error) {
        toast.error("Failed to get vehicle handover detail");
        throw error;
      }
    },
  });
};
