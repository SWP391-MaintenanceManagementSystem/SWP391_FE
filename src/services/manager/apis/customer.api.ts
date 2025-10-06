import { httpPrivate } from "@/lib/http";
import type {
  PaginationResponse,
  BaseResponse,
  StatusStatResponse,
} from "@/types/models/response";
import type { AccountWithProfile } from "@/types/models/account";
import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";

/** Lấy danh sách customers với search + filter + sort */
export const getCustomers = (params: {
  page: number;
  pageSize: number;
  firstName?: string;
  lastName?: string;
  status?: string;
  email?: string;
  phone?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
  // isPremium?: boolean;
}) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<AccountWithProfile>>>(
    "/customers",
    { params },
  );
};

/** Cập nhật thông tin */
export const updateCustomerInfo = (id: string, data: ChangeProfileFormData) => {
  return httpPrivate.patch<BaseResponse<AccountWithProfile>>(
    `/customers/${id}`,
    data,
  );
};

/** Xoá customer */
export const deleteCustomer = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/customers/${id}`);
};

/** Lấy 1 customer theo ID */
export const getCustomerById = (customerId: string) => {
  return httpPrivate.get<BaseResponse<{ account: AccountWithProfile }>>(
    `/customers/{id}?id=${customerId}`,
  );
};

export const getCustomerStatusStat = () => {
  return httpPrivate.get<BaseResponse<StatusStatResponse>>(
    `/customers/statistics`,
  );
};
