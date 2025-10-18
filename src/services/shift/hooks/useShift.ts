import type { Shift } from "@/types/models/shift";
import { useDeleteShift, useUpdateShift } from "../mutations";
import { ShiftSchema, type ShiftFormData } from "@/pages/shifts/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useShift = (
  currentPage: number,
  currentPageSize: number,
  item?: Shift,
) => {
  const delShiftMutation = useDeleteShift();
  const updateShiftMutation = useUpdateShift();

  const handleDeleteShift = () => {
    delShiftMutation.mutate({
      id: item?.id || "",
      currentPage,
      currentPageSize,
    });
  };
  const form = useForm<ShiftFormData>({
    resolver: zodResolver(ShiftSchema),
    defaultValues: {
      name: item?.name ?? "",
      status: item?.status,
      centerId: item?.serviceCenter.id ?? "",
      startTime: item?.startTime ?? "",
      endTime: item?.endTime ?? "",
      maximumSlot: item?.maximumSlot,
    },
  });
  const handleEditShift = async (data: ShiftFormData) => {
    try {
      await updateShiftMutation.mutateAsync({
        id: item?.id || "",
        data,
        currentPage,
        currentPageSize,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiErrors = error.response?.data?.errors;
        const msg = error.response?.data.message;
        if (apiErrors && typeof apiErrors === "object") {
          Object.entries(apiErrors).forEach(([field, msg]) => {
            form.setError(field as keyof ShiftFormData, {
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
    }
  };

  return {
    handleDeleteShift,
    form,
    handleEditShift,
  };
};
