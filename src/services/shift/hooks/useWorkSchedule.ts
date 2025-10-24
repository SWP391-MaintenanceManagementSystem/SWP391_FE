import type { WorkSchedule } from "@/types/models/shift";
import {
  useDeleteWorkSchedule,
  useUpdateSchedule,
  useAddSchedule,
} from "../mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  AddWorkScheduleSchema,
  EditWorkScheduleSchema,
  type AddWorkScheduleFormData,
  type EditWorkScheduleFormData,
} from "@/pages/shifts/libs/schema";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";

export const useWorkSchedule = (item?: WorkSchedule) => {
  const delScheduleMutation = useDeleteWorkSchedule();
  const updateScheduleMutation = useUpdateSchedule();
  const addScheduleMutation = useAddSchedule();

  const editForm = useForm<EditWorkScheduleFormData>({
    resolver: zodResolver(EditWorkScheduleSchema),
    defaultValues: {
      employeeId: item?.account.id || "",
      shiftId: item?.shift.id || "",
      date: item?.date || "",
    },
  });

  const addForm = useForm<AddWorkScheduleFormData>({
    resolver: zodResolver(AddWorkScheduleSchema),
    defaultValues: {
      centerId: item?.shift.serviceCenter.id || "",
      employeeIds: [],
      shiftId: item?.shift.id || "",
      startDate: item?.date || "",
      endDate: "",
      repeatDays: [],
    },
  });

  const handleAddSchedule = async (
    data: AddWorkScheduleFormData,
    employeeList: EmployeeTable[],
  ) => {
    try {
      await addScheduleMutation.mutateAsync({
        data,
        currentPage: 1,
        currentPageSize: 10,
      });

      toast.success("Added successfully");
      addForm.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiErrors = error.response?.data?.errors ?? {};
        const msg = error.response?.data?.message;

        if (Object.keys(apiErrors).length > 0) {
          const messages: string[] = [];

          Object.entries(apiErrors).forEach(([field, fieldErrors]) => {
            const employee = employeeList.find((e) => e.id === field);
            const displayField = employee ? `${employee.email} ` : field;

            if (typeof fieldErrors === "object" && fieldErrors !== null) {
              Object.entries(fieldErrors).forEach(([subField, message]) => {
                messages.push(`${displayField} - ${subField}: ${message}`);
              });
            } else if (typeof fieldErrors === "string") {
              addForm.setError(field as keyof AddWorkScheduleFormData, {
                type: "server",
                message: fieldErrors,
              });
            }
          });

          if (messages.length > 0) {
            addForm.setError("root.serverError", {
              type: "server",
              message: messages.join("\n"),
            });
          }
        } else if (msg) {
          toast.error(msg);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

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
    data: EditWorkScheduleFormData;
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
                editForm.setError(field as keyof EditWorkScheduleFormData, {
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
    handleAddSchedule,
    editForm,
    addForm,
    isEditingPending: updateScheduleMutation.isPending,
    isAddingPending: addScheduleMutation.isPending,
  };
};
