import {
  useDeleteEmployee,
  useUpdateEmployeeInfo,
  useAddEmployee,
} from "../mutations";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  EditEmployeeSchema,
  type EditEmployeeFormData,
} from "@/pages/employees/libs/schema";

export const useEmployee = (
  employee: EmployeeTable,
  role: "STAFF" | "TECHNICIAN",
  currentPage: number,
  currentPageSize: number,
) => {
  const deleteEmployeeMutation = useDeleteEmployee();
  const updateEmployeeInfoMutation = useUpdateEmployeeInfo();
  const addEmployeeMutation = useAddEmployee();

  const form = useForm<EditEmployeeFormData>({
    resolver: zodResolver(EditEmployeeSchema),
    defaultValues: {
      firstName: employee.profile?.firstName || "",
      lastName: employee.profile?.lastName || "",
      email: employee.email || "",
      phone: employee.phone || "",
      status: employee.status,
      workCenter: {
        centerId: employee.workCenter?.id || "",
        startDate: employee.workCenter?.startDate
          ? new Date(employee.workCenter.startDate)
          : undefined,
        endDate: employee.workCenter?.endDate
          ? new Date(employee.workCenter.endDate)
          : undefined,
      },
    },
  });

  const handleDeleteEmployee = (id: string) => {
    deleteEmployeeMutation.mutate({
      id,
      role,
      currentPage,
      currentPageSize,
    });
  };

  const handleUpdateEmployeeInfo = (id: string, data: EditEmployeeFormData) => {
    updateEmployeeInfoMutation.mutate(
      {
        id,
        role,
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
                form.setError(field as keyof EditEmployeeFormData, {
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

  const handleAddEmployee = async (data: EditEmployeeFormData) => {
    return new Promise<boolean>((resolve) => {
      addEmployeeMutation.mutate(
        {
          role,
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
                  form.setError(field as keyof EditEmployeeFormData, {
                    type: "server",
                    message: msg as string,
                  });
                });
              } else {
                toast.error(msg || "Something went wrong.");
              }
            }
            resolve(false);
          },
        },
      );
    });
  };

  return {
    form,
    handleDeleteEmployee,
    handleUpdateEmployeeInfo,
    handleAddEmployee,
  };
};
