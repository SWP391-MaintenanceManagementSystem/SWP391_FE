import { useUpdateCustomerInfo, useDeleteCustomer } from "../mutations";
import {
  ChangeProfileSchema,
  type ChangeProfileFormData,
} from "@/pages/profile/components/profile/libs/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CustomerTable } from "@/pages/vehicle/components/libs/table-types";

/**
 * Custom hook để edit thông tin customer dựa trên 1 row của TanStack Table
 * @param row Row<CustomerTable> - row được click để edit
 */
export const useCustomer = (
  customer: CustomerTable,
  currentPage: number,
  currentPageSize: number,
) => {
  // Khởi tạo mutation từ React Query
  const updateCustomerInfoMutation = useUpdateCustomerInfo();
  const deleteCustomerMutation = useDeleteCustomer();

  // Khởi tạo form với react-hook-form
  const form = useForm<ChangeProfileFormData>({
    resolver: zodResolver(ChangeProfileSchema),
    defaultValues: {
      firstName: customer.profile?.firstName || "",
      lastName: customer.profile?.lastName || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.profile?.address || "",
      status: customer.status,
    },
  });

  /**
   * Hàm gọi khi submit form
   * @param data ChangeProfileFormData - dữ liệu form đã validate
   */
  const handleEditCustomerInfo = (data: ChangeProfileFormData) => {
    updateCustomerInfoMutation.mutate({
      id: customer.id,
      data,
      currentPage,
      currentPageSize,
    });
  };

  const handleDeleteCustomer = (id: string) => {
    deleteCustomerMutation.mutate({
      id,
      currentPage,
      currentPageSize,
    });
  };

  return {
    form,
    handleEditCustomerInfo,
    handleDeleteCustomer,
  };
};
