import type { Shift } from "@/types/models/shift";
import { useDeleteShift, useUpdateShift, useAddShift } from "../mutations";
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
  const addShiftMutation = useAddShift();

  const handleDeleteShift = () => {
    delShiftMutation.mutate(
      {
        id: item?.id || "",
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

  const handleAddShift = async (data: ShiftFormData) => {
    return new Promise<boolean>((resolve) => {
      addShiftMutation.mutateAsync(
        {
          data,
          currentPage,
          currentPageSize,
        },
        {
          onSuccess: () => {
            resolve(true);
          },
          onError: (error) => {
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
            resolve(false);
          },
        },
      );
    });
  };

  return {
    handleDeleteShift,
    form,
    handleAddShift,
    handleEditShift,
  };
};
