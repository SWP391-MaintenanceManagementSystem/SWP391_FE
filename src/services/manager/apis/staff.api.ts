import { httpPrivate } from "@/lib/http";
import type {
  PaginationResponse,
  BaseResponse,
  StatusStatResponse,
} from "@/types/models/response";
import type { AccountWithProfile } from "@/types/models/account";
import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";

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

export const deleteStaff = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/staff/${id}`);
};

export const getStaffById = (id: string) => {
  return httpPrivate.get<BaseResponse<AccountWithProfile>>(`/staff/${id}`);
};

export const updateStaff = (id: string, data: ChangeProfileFormData) => {
  return httpPrivate.patch<BaseResponse<AccountWithProfile>>(
    `/staff/${id}`,
    data,
  );
};

export const getStatusStatStaff = () => {
  return httpPrivate.get<BaseResponse<StatusStatResponse>>(`/staff/statistics`);
};

export const addStaff = async (formData: ChangeProfileFormData) => {
  return httpPrivate.post<BaseResponse<AccountWithProfile>>(`/staff`, formData);
};
