import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import {
  getCustomers,
  getCustomerById,
  getCustomerStatusStat,
} from "@/services/manager/apis/customer.api";
import { getVehicleByCustomerId, getVehicleById } from "../apis/vehicle.api";
import { getVehicleBrands } from "@/services/vehicle/apis/vehicle.api";
import { getVehicleModelsByBrandId } from "@/services/manager/apis/vehicle.api";
import {
  getStaffById,
  getStaffs,
  getStatusStatStaff,
} from "@/services/manager/apis/staff.api";
import {
  getTechnicians,
  getTechnicianById,
  getStatusStatTechnician,
} from "../apis/technician.api";
import { getPartStat, getPartList } from "../apis/inventory.api";
/**
 * Hook lấy danh sách accounts theo type (STAFF, TECHNICIAN, CUSTOMER)
 * (search + sort + filter + pagination)
 */
export const useGetAccountList = (params: {
  page: number;
  pageSize: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string;
  isPremium?: boolean;
  phone?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
  type: "CUSTOMER" | "STAFF" | "TECHNICIAN";
}) => {
  return useQuery({
    queryKey: queryKeys.accounts(params),
    queryFn: async () => {
      const { type, ...rest } = params;
      try {
        const api =
          type === "CUSTOMER"
            ? getCustomers
            : type === "STAFF"
              ? getStaffs
              : getTechnicians;

        const res = await api(rest);
        return res.data;
      } catch (error) {
        toast.error("Failed to fetch account list");
        throw error;
      }
    },
    enabled: !!params.page && !!params.pageSize && !!params.type,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetPartList = (params: {
  page: number;
  pageSize: number;
  name?: string;
  categoryName?: string;
  status?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}) => {
  return useQuery({
    queryKey: queryKeys.parts(params),
    queryFn: async () => {
      try {
        const res = await getPartList(params);
        console.log("Response", res.data);
        return res.data;
      } catch (error) {
        toast.error("Failed to fetch parts list");
        throw error;
      }
    },
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
 * Hook lấy thông tin employee (STAFF, TECHNICIAN) theo ID
 */
export const useGetEmployeeById = (params: {
  id: string;
  type: "STAFF" | "TECHNICIAN";
}) => {
  return useQuery({
    queryKey: queryKeys.employeeById(params),
    queryFn: async () => {
      try {
        const api = params.type === "STAFF" ? getStaffById : getTechnicianById;
        const res = await api(params.id);
        return res.data;
      } catch {
        toast.error("Failed to fetch employee by ID ");
        throw new Error("Fetch customer employee by ID");
      }
    },
    enabled: !!params,
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

export const useGetStatusStat = (type: "STAFF" | "TECHNICIAN" | "CUSTOMER") => {
  return useQuery({
    queryKey: queryKeys.statusStat(type),
    queryFn: async () => {
      try {
        const api =
          type === "STAFF"
            ? getStatusStatStaff
            : type === "TECHNICIAN"
              ? getStatusStatTechnician
              : getCustomerStatusStat;
        const response = await api();
        return response.data;
      } catch {
        toast.error(`Failed to fetch ${type} status stats`);
        throw new Error("Fetch stats failed");
      }
    },

    enabled: !!type,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetPartStat = () => {
  return useQuery({
    queryKey: queryKeys.partStat(),
    queryFn: async () => {
      try {
        const response = await getPartStat();
        return response.data.data;
      } catch {
        toast.error("Fail to fetch part statistics");
        throw new Error("Fetch stats failed");
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};
