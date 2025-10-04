import { httpPrivate } from "@/lib/http";
import type { PaginationResponse, BaseResponse } from "@/types/models/response";
import type { AccountWithProfile } from "@/types/models/account";

export const getStaffs = (params: {
  page: number;
  pageSize: number;
  firstName?: string;
  lastName?: string;
  status?: string;
  email?: string;
  phone?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<AccountWithProfile>>>(
    "/staff",
    { params },
  );
};
