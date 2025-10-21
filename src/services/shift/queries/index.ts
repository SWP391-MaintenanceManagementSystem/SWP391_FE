import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import { getShiftList, getShifts } from "../apis/shift.api";
import { getWorkScheduleList } from "../apis/work-schedules.api";

export const useGetWorkSchedulesList = (params: {
  page: number;
  pageSize: number;
  centerId?: string;
  employeeId?: string;
  role?: string;
  search?: string;
  shiftId?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}) => {
  return useQuery({
    queryKey: queryKeys.workSchedulesList(params),
    queryFn: async () => {
      try {
        const res = await getWorkScheduleList(params);
        return res.data;
      } catch (error) {
        toast.error("Failed to fetch work schedules list");
        throw error;
      }
    },
    enabled: !!params.page && !!params.pageSize,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetShiftList = (params: {
  page: number;
  pageSize: number;
  name?: string;
  status?: string;
  sortBy?: string;
  startTime?: string;
  endTime?: string;
  centerId?: string;
  orderBy?: "asc" | "desc";
}) => {
  return useQuery({
    queryKey: queryKeys.shiftsList(params),
    queryFn: async () => {
      try {
        const res = await getShiftList(params);
        return res.data;
      } catch (error) {
        toast.error("Failed to fetch shift list");
        throw error;
      }
    },
    enabled: !!params.page && !!params.pageSize,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetShiftsQuery = () => {
  return useQuery({
    queryKey: queryKeys.shifts,
    queryFn: async () => {
      try {
        const res = await getShifts();
        return res.data.data;
      } catch (error) {
        console.error("Error fetching shifts:", error);
        toast.error("Failed to fetch shifts");
        return [];
      }
    },
  });
};
