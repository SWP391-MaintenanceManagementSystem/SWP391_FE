import { queryKeys } from "./keys";
import { useQuery } from "@tanstack/react-query";
import { getMyVehicles } from "../apis/vehicle.api";
import { toast } from "sonner";

export const useGetMyVehicle = () => {
  return useQuery({
    queryKey: queryKeys.myVehicles,
    queryFn: async () => {
      try {
        const response = await getMyVehicles();
        return response.data.data;
      } catch (error) {
        toast.error("Failed to fetch my vehicles");
        console.error(error);
        return [];
      }
    },
  });
};
