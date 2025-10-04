import { useDeleteStaff } from "../mutations";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";

export const useEmployee = (
  employee: EmployeeTable,
  currentPage: number,
  currentPageSize: number,
) => {
  const deleteEmployeeMutation = useDeleteStaff();
  console.log("useEmployee", employee);
  const handleDeleteEmployee = (id: string) => {
    deleteEmployeeMutation.mutate({
      id,
      currentPage,
      currentPageSize,
    });
  };

  return {
    handleDeleteEmployee,
  };
};
