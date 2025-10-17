import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShift } from "../apis/shift.api";
import { queryKeys } from "../queries/keys";
import { toast } from "sonner";

export const useDeleteShift = () => {
  const queryCilent = useQueryClient();
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
    onSuccess: (_data, variables) => {
      toast.success("Deleted shift successfully");
      queryCilent.invalidateQueries({
        queryKey: queryKeys.shiftsList({
          page: variables.currentPage,
          pageSize: variables.currentPageSize,
        }),
      });
    },
    onError: () => {
      toast.error("Failed to delete shift");
    },
  });
};
