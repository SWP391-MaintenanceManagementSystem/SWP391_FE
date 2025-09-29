import { useUpdateCustomerInfo } from "../mutations";
import {
  ChangeProfileSchema,
  type ChangeProfileFormData,
} from "@/pages/profile/components/profile/libs/schema";
import { type Row } from "@tanstack/react-table";
import { type CustomerTable } from "@/pages/vehicle/components/admin/table/columns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Custom hook để edit thông tin customer dựa trên 1 row của TanStack Table
 * @param row Row<CustomerTable> - row được click để edit
 */
export const useEditCustomerInfo = (row: Row<CustomerTable>) => {
  // Khởi tạo mutation từ React Query
  const mutation = useUpdateCustomerInfo();

  // Khởi tạo form với react-hook-form
  const form = useForm<ChangeProfileFormData>({
    resolver: zodResolver(ChangeProfileSchema),
    defaultValues: {
      email: row.original.email || "",
      firstName: row.original.profile?.firstName || "",
      lastName: row.original.profile?.lastName || "",
      phone: row.original.phone || "",
      status: row.original.status || "",
      address: row.original.profile?.address || "",
    },
  });

  /**
   * Hàm gọi khi submit form
   * @param data ChangeProfileFormData - dữ liệu form đã validate
   */
  const handleEditCustomerInfo = (data: ChangeProfileFormData) => {
    mutation.mutate({ id: row.original.id, data });
  };

  return {
    form,
    handleEditCustomerInfo,
  };
};
