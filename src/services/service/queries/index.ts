import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { searchServices } from "@/services/service/apis/service.api";
import { toast } from "sonner";

export const useSearchServicesQuery = (name: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: queryKeys.search(name),
    queryFn: async () => {
      try {
        const response = await searchServices(name);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching services:", error);
        queryClient.invalidateQueries({ queryKey: queryKeys.search(name) });
        toast.error("Error fetching services");
        return [];
      }
    },
    enabled: name.trim().length > 2,
  });
};
