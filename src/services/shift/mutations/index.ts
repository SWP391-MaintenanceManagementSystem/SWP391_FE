import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShift, updateShift, addShift } from "../apis/shift.api";
import { queryKeys } from "../queries/keys";
import { toast } from "sonner";
import type { ShiftFormData } from "@/pages/shifts/libs/schema";
import { deleteWorkSchedule } from "../apis/work-schedules.api";

export const useDeleteShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: string;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const del = await deleteShift(id);
      return del.data;
    },
    onSuccess: async (_data, variables) => {
      toast.success("Deleted shift successfully");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.shiftsList({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
      ]);
    },
  });
};

export const useUpdateShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      currentPage: number;
      currentPageSize: number;
      data: ShiftFormData;
    }) => {
      const update = await updateShift(id, data);
      return update.data;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.shiftsList({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.workSchedulesList({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
      ]);
      toast.success("Shift information updated successfully");
    },
  });
};

export const useAddShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: ShiftFormData;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const add = await addShift(data);
      return add.data;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.shiftsList({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
      ]);
      toast.success("Shift added successfully");
    },
  });
};

export const useDeleteWorkSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      date,
    }: {
      id: string;
      date: string;
      currentPage: number;
      currentPageSize: number;
    }) => {
      const del = await deleteWorkSchedule(id, date);
      return del.data;
    },
    onSuccess: async (_data, variables) => {
      toast.success("Deleted work schedule successfully");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.workSchedulesList({
            page: variables.currentPage,
            pageSize: variables.currentPageSize,
          }),
        }),
      ]);
    },
  });
};
