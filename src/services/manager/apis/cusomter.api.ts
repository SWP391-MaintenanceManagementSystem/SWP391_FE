import { httpPrivate } from "@/lib/http";
import type { PaginationResponse, BaseResponse } from "@/types/models/response";
import type { AccountWithProfile } from "@/types/models/account";
import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";

export const getCustomers = (params: { page: number; pageSize: number }) => {
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
