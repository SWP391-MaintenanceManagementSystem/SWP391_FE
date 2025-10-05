import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import {
  getCustomers,
  getCustomerById,
} from "@/services/manager/apis/customer.api";
import { getVehicleByCustomerId, getVehicleById } from "../apis/vehicle.api";
import { getVehicleBrands } from "@/services/vehicle/apis/vehicle.api";
import { getVehicleModelsByBrandId } from "@/services/manager/apis/vehicle.api";
import { getStaffs } from "@/services/manager/apis/staff.api";
import { getTechnicians, getTechnicianById } from "../apis/technician.api";

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
    queryFn: async () => {
      try {
        const response = await getCustomers(params);
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
    queryFn: async () => {
      try {
        const response = await getCustomerById(customerId);
        return response.data.account;
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
    queryFn: async () => {
      try {
        const response = await getVehicleByCustomerId(customerId);
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
    queryFn: async () => {
      try {
        const response = await getVehicleById(vehicleId);
        return response.data.data;
      } catch {
        toast.error("Failed to fetch vehicle");
        return null;
      }
    },
    enabled: !!vehicleId,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook lấy brand theo Vehicle ID
 */

export const useGetVehicleBrand = () => {
  return useQuery({
    queryKey: queryKeys.vehicleBrand(),
    queryFn: async () => {
      try {
        const response = await getVehicleBrands();
        return response.data.data;
      } catch {
        toast.error("Failed to fetch vehicle brand");
        return [];
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook lấy model theo Brand ID
 */

export const useGetVehicleModel = (brandId: number | string) => {
  return useQuery({
    queryKey: queryKeys.vehicleModel(brandId),
    queryFn: async () => {
      try {
        const response = await getVehicleModelsByBrandId(brandId);
        return response.data.data;
      } catch {
        toast.error("Failed to fetch vehicle model");
        throw new Error("Fetch vehicle model failed");
      }
    },
    enabled: !!brandId,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook lấy danh sách staffs (search + sort + filter + pagination)
 */
export const useGetStaffs = (params: {
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
    queryKey: queryKeys.staffs(params),
    queryFn: async () => {
      try {
        const response = await getStaffs(params);
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

export const useGetTechnicians = (params: {
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
    queryKey: queryKeys.technicians(params),
    queryFn: async () => {
      try {
        const response = await getTechnicians(params);
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch technicians");
        throw error;
      }
    },
    enabled: !!params.page && !!params.pageSize,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTechnicianById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.techniciansById(id),
    queryFn: async () => {
      try {
        const response = await getTechnicianById(id);
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch technician");
        throw error;
      }
    },
    enabled: !!id,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};
