import { useDeleteStaff, useDeleteTechnician } from "../mutations";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";

export const useEmployee = (
  employee: EmployeeTable,
  currentPage: number,
  currentPageSize: number,
) => {
  const deleteStaffMutation = useDeleteStaff();
  const deleteTechnicianMutation = useDeleteTechnician();
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

  return {
    handleDeleteStaff,
    handleDeleteTechnician,
  };
};
