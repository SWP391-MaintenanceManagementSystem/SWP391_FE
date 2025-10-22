import type { WorkSchedule } from "@/types/models/shift";
import { useDeleteWorkSchedule } from "../mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useWorkSchedule = (
  currentPage: number,
  currentPageSize: number,
  item?: WorkSchedule,
) => {
  const delScheduleMutation = useDeleteWorkSchedule();

  const handleDeleteSchedule = () => {
    delScheduleMutation.mutate(
      {
        id: item?.account.id || "",
        currentPage,
        currentPageSize,
      },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            const msg = error.response?.data.message;
            toast.error(msg);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        },
      },
    );
  };

  return {
    handleDeleteSchedule,
  };
};
