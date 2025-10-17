import type { Shift } from "@/types/models/shift";
import { useDeleteShift } from "../mutations";

export const useShift = (
  currentPage: number,
  currentPageSize: number,
  item?: Shift,
) => {
  const delShiftMutation = useDeleteShift();

  const handleDeleteShift = () => {
    delShiftMutation.mutate({
      id: item?.id || "",
      currentPage,
      currentPageSize,
    });
  };

  return {
    handleDeleteShift,
  };
};
