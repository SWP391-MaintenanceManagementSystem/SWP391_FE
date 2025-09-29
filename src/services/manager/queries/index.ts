import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import { getCustomers } from "@/services/manager/apis/cusomter.api";

export const useGetCustomerList = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: queryKeys.customers(page, pageSize),
    queryFn: async () => {
      try {
        const response = await getCustomers({ page, pageSize });
        return response.data;
      } catch (error) {
        toast.error("Fail to fetch customer list");
        throw error;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};
