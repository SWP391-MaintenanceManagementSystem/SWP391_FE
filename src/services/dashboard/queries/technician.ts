import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./key";
import { getTechnicianCurrentBooking, getTechnicianDashboardData } from "../apis/technician.api";

export const useGetTechnicianDashboardData = () => {
  return useQuery({
    queryKey: queryKeys.technicianDashboard(),
    queryFn: async () => {
      try {
        const response = await getTechnicianDashboardData();
        return response.data.data;
      } catch {
        toast.error("Failed to fetch technician dashboard data");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTechnicianCurrentBooking = () => {
  return useQuery({
    queryKey: queryKeys.technicianCurrentBooking(),
    queryFn: async () => {
      try {
        const response = await getTechnicianCurrentBooking();
        return response.data.data;
      } catch {
        toast.error("Failed to fetch technician current booking");
        return null;
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};