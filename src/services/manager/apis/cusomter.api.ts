import { httpPrivate } from "@/lib/http";
import type { PaginationResponse, BaseResponse } from "@/types/models/response";
import type { AccountWithProfile } from "@/types/models/account";
import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";

export const getCustomersList = (params: {
  page: number;
  pageSize: number;
}) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<AccountWithProfile>>>(
    "/customers",
    {
      params,
    },
  );
};

export const updateCustomerInfo = (id: string, data: ChangeProfileFormData) => {
  return httpPrivate.patch<BaseResponse<AccountWithProfile>>(
    `/customers/${id}`,
    data,
  );
};

export const deleteCustomer = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/customers/${id}`);
};

export const searchCustomersByEmail = (params: { searchValue: string }) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<AccountWithProfile>>>(
    "/customers",
    {
      params,
    },
  );
};

export const getCustomerById = (customerId: string) => {
  return httpPrivate.get<BaseResponse<{ account: AccountWithProfile }>>(
    `/customers/{id}?id=${customerId}`,
  );
};

export const getSortedCustomersList = (params: {
  page: number;
  pageSize: number;
  sortBy: string;
  orderBy: string;
}) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<AccountWithProfile>>>(
    "/customers",
    {
      params,
    },
  );
};
