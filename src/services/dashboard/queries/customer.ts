import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./key";
import { getCustomerDashboardData } from "../apis/customer.api";
export const useGetCustomerDashboardData = () => {
  return useQuery({
    queryKey: queryKeys.customerDashboard(),
    queryFn: async () => {
      try {
        const response = await getCustomerDashboardData();
        return response.data.data;
      } catch {
        toast.error("Failed to fetch customer dashboard data");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};
