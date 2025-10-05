import { useDeleteEmployee, useUpdateEmployeeInfo } from "../mutations";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import {
  ChangeProfileSchema,
  type ChangeProfileFormData,
} from "@/pages/profile/components/profile/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useEmployee = (
  employee: EmployeeTable,
  role: "STAFF" | "TECHNICIAN",
  currentPage: number,
  currentPageSize: number,
) => {
  const deleteEmployeeMutation = useDeleteEmployee();
  const updateEmployeeInfoMutation = useUpdateEmployeeInfo();

  const form = useForm<ChangeProfileFormData>({
    resolver: zodResolver(ChangeProfileSchema),
    defaultValues: {
      firstName: employee.profile?.firstName || "",
      lastName: employee.profile?.lastName || "",
      email: employee.email || "",
      phone: employee.phone || "",
      status: employee.status,
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

  const handleUpdateEmployeeInfo = (id: string) => {
    updateEmployeeInfoMutation.mutate({
      id,
      role,
      data: form.getValues(),
      currentPage,
      currentPageSize,
    });
  };

  return {
    form,
    handleDeleteEmployee,
    handleUpdateEmployeeInfo,
  };
};
