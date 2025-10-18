import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../apis/center.api";
import { queryKeys } from "./keys";
import { toast } from "sonner";

export const useGetCentersQuery = () => {
  return useQuery({
    queryKey: queryKeys.centers,
    queryFn: async () => {
      try {
        const res = await getCenters();
        toast.success("Fetched centers successfully");
        return res.data.data;
      } catch (error) {
        console.error("Error fetching centers:", error);
        toast.error("Failed to fetch centers");
        return [];
      }
    },
  });
};
