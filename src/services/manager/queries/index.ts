import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import {
  getCustomersList,
  searchCustomersByEmail,
  getCustomerById,
  getSortedCustomersList,
} from "@/services/manager/apis/cusomter.api";

export const useGetCustomerList = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: queryKeys.customers(page, pageSize),
    queryFn: async () => {
      try {
        const response = await getCustomersList({ page, pageSize });
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

export const useSearchCustomersByEmail = (email: string) => {
  return useQuery({
    queryKey: queryKeys.customerSearchByEmail(email),
    queryFn: async ({ queryKey }) => {
      const [_key, email] = queryKey;
      try {
        const response = await searchCustomersByEmail({ email });
        return response.data;
      } catch (error) {
        toast.error("Failed to search customers");
        throw error;
      }
    },
    enabled: !!email,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCustomerById = (customerId: string) => {
  return useQuery({
    queryKey: queryKeys.customerById(customerId),
    queryFn: async ({ queryKey }) => {
      const [_key, customerId] = queryKey;
      try {
        const response = await getCustomerById(customerId);
        // console.log("Response Data:", response.data);
        return response.data.account;
      } catch (error) {
        toast.error("Failed to fetch customer");
        throw error;
      }
    },
    enabled: !!customerId,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetSortedCustomersList = (params: {
  page: number;
  pageSize: number;
  sortBy: string;
  orderBy: string;
}) => {
  return useQuery({
    queryKey: queryKeys.sortedCustomers(params),
    queryFn: async ({ queryKey }) => {
      const [_key, params] = queryKey;
      try {
        const response = await getSortedCustomersList(params);
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch sorted customers");
        throw error;
      }
    },
    enabled: !!params,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};
