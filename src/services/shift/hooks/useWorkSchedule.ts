import type { WorkSchedule } from "@/types/models/shift";
import { useDeleteWorkSchedule, useUpdateSchedule } from "../mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  WorkScheduleSchema,
  type WorkScheduleFormData,
} from "@/pages/shifts/libs/schema";

export const useWorkSchedule = (item?: WorkSchedule) => {
  const delScheduleMutation = useDeleteWorkSchedule();
  const updateScheduleMutation = useUpdateSchedule();
  const form = useForm<WorkScheduleFormData>({
    resolver: zodResolver(WorkScheduleSchema),
    defaultValues: {
      centerId: item?.shift.serviceCenter.id || "",
      employeeId: item?.account.id || "",
      shiftId: item?.shift.id || "",
      date: item?.date || "",
      endDate: "",
      repeatDays: [],
    },
  });

  const handleDeleteSchedule = ({
    currentPage,
    currentPageSize,
  }: {
    currentPage: number;
    currentPageSize: number;
  }) => {
    delScheduleMutation.mutate(
      {
        id: item?.account.id || "",
        date: item?.date || "",
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

  const handleEditSchedule = ({
    currentPage,
    currentPageSize,
    data,
  }: {
    currentPage: number;
    currentPageSize: number;
    data: WorkScheduleFormData;
  }) => {
    updateScheduleMutation.mutate(
      {
        id: item?.id || "",
        data,
        currentPage,
        currentPageSize,
      },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            const apiErrors = error.response?.data?.errors;
            const msg = error.response?.data.message;
            if (apiErrors && typeof apiErrors === "object") {
              Object.entries(apiErrors).forEach(([field, msg]) => {
                form.setError(field as keyof WorkScheduleFormData, {
                  type: "server",
                  message: msg as string,
                });
              });
            } else if (msg) {
              toast.error(msg);
            } else {
              toast.error("Something went wrong. Please try again.");
            }
          }
        },
      },
    );
  };

  return {
    handleDeleteSchedule,
    handleEditSchedule,
    form,
  };
};
