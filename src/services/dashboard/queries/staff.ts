import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./key";
import { getStaffDashboardData } from "../apis/staff.api";
export const useGetStaffDashboardData = () => {
  return useQuery({
    queryKey: queryKeys.staffDashboard(),
    queryFn: async () => {
      try {
        const response = await getStaffDashboardData();
        console.log(response.data);
        return response.data;
      } catch {
        toast.error("Failed to fetch staff dashboard data");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};
