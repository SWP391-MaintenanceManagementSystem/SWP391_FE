import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import {
  getCustomers,
  getCustomerById,
} from "@/services/manager/apis/cusomter.api";
import { getVehicleByCustomerId, getVehicleById } from "../apis/vehicle.api";

/**
 * Hook lấy danh sách customers (search + sort + filter + pagination)
 */
export const useGetCustomers = (params: {
  page: number;
  pageSize: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string;
  phone?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}) => {
  return useQuery({
    queryKey: queryKeys.customers(params),
    queryFn: async ({ queryKey }) => {
      const [_key, queryParams] = queryKey;
      try {
        const response = await getCustomers(queryParams);
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch customers");
        throw error;
      }
    },
    enabled: !!params.page && !!params.pageSize,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook lấy thông tin customer theo ID
 */
export const useGetCustomerById = (customerId: string) => {
  return useQuery({
    queryKey: queryKeys.customerById(customerId),
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      try {
        const response = await getCustomerById(id);
        return response.data.account;
        console.log(response.data.account);
      } catch {
        toast.error("Failed to fetch customer");
        throw new Error("Fetch customer failed");
      }
    },
    enabled: !!customerId,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook lấy danh sách vehicles theo customer ID
 */
export const useGetVehicleList = (customerId: string) => {
  return useQuery({
    queryKey: queryKeys.vehiclesList(customerId),
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      try {
        const response = await getVehicleByCustomerId(id);
        return response.data.data;
      } catch {
        toast.error("Failed to fetch vehicles");
        throw new Error("Fetch vehicles failed");
      }
    },
    enabled: !!customerId,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook lấy thông tin vehicle theo ID
 */
export const useGetVehicleById = (vehicleId: string) => {
  return useQuery({
    queryKey: queryKeys.vehicleById(vehicleId),
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      try {
        const response = await getVehicleById(id);
        return response.data.data;
      } catch {
        toast.error("Failed to fetch vehicle");
        throw new Error("Fetch vehicle failed");
      }
    },
    enabled: !!vehicleId,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};
