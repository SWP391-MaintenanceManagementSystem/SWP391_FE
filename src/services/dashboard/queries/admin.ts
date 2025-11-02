import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./key";
import {
  getInventoryStatus,
  getOverview,
  getRevenueByRange,
  getServiceCenterStat,
  getTrendingPurchase,
} from "../apis/admin.api";

export const useGetAdminOverview = () => {
  return useQuery({
    queryKey: queryKeys.overview(),
    queryFn: async () => {
      try {
        const response = await getOverview();
        return response.data;
      } catch {
        toast.error("Failed to fetch overview");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetRevenueByRange = (range: string) => {
  return useQuery({
    queryKey: queryKeys.revenueByRange(range),
    queryFn: async () => {
      try {
        const response = await getRevenueByRange(range);
        return response.data;
      } catch {
        toast.error("Failed to fetch revenue by range");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTrendingPurchase = () => {
  return useQuery({
    queryKey: queryKeys.trendingPurchase(),
    queryFn: async () => {
      try {
        const response = await getTrendingPurchase();
        return response.data;
      } catch {
        toast.error("Failed to fetch trending purchase");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetInventoryStatus = () => {
  return useQuery({
    queryKey: queryKeys.inventoryStatus(),
    queryFn: async () => {
      try {
        const response = await getInventoryStatus();
        return response.data;
      } catch {
        toast.error("Failed to fetch inventory status");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetServiceCenterStat = () => {
  return useQuery({
    queryKey: queryKeys.serviceCenterStat(),
    queryFn: async () => {
      try {
        const response = await getServiceCenterStat();
        return response.data.data;
      } catch {
        toast.error("Failed to fetch service center stat");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};
