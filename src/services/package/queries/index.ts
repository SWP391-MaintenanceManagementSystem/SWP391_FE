import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { searchPackages } from "../apis/package.api";
import { toast } from "sonner";

export const useSearchPackagesQuery = (name: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: queryKeys.search(name),
    queryFn: async () => {
      try {
        const response = await searchPackages(name);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching packages:", error);
        queryClient.invalidateQueries({ queryKey: queryKeys.search(name) });
        return [];
      }
    },
    enabled: name.trim().length > 2,
  });
};
