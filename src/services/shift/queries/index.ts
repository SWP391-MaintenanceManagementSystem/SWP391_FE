import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import { getShiftList } from "../apis/shift.api";

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
