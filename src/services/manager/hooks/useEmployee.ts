import {
  useDeleteStaff,
  useDeleteTechnician,
  useUpdateEmployeeInfo,
} from "../mutations";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import {
  ChangeProfileSchema,
  type ChangeProfileFormData,
} from "@/pages/profile/components/profile/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useEmployee = (
  employee: EmployeeTable,
  currentPage: number,
  currentPageSize: number,
) => {
  const deleteStaffMutation = useDeleteStaff();
  const deleteTechnicianMutation = useDeleteTechnician();
  const updateEmployeeInfoMutation = useUpdateEmployeeInfo();

  const handleDeleteStaff = (id: string) => {
    deleteStaffMutation.mutate({
      id,
      currentPage,
      currentPageSize,
    });
  };

  const handleDeleteTechnician = (id: string) => {
    deleteTechnicianMutation.mutate({
      id,
      currentPage,
      currentPageSize,
    });
  };

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

  const handleUpdateEmployeeInfo = (
    id: string,
    role: "STAFF" | "TECHNICIAN",
  ) => {
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
    handleDeleteStaff,
    handleDeleteTechnician,
    handleUpdateEmployeeInfo,
  };
};
