import { httpPrivate } from "@/lib/http";
import type {
  PaginationResponse,
  BaseResponse,
  StatusStatResponse,
} from "@/types/models/response";
import type { AccountWithProfile } from "@/types/models/account";
import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";

export const getTechnicians = (params: {
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
    "/technician",
    { params },
  );
};

export const deleteTechnician = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/technician/${id}`);
};

export const getTechnicianById = (id: string) => {
  return httpPrivate.get<BaseResponse<AccountWithProfile>>(`/technician/${id}`);
};

export const updateTechnician = (id: string, data: ChangeProfileFormData) => {
  return httpPrivate.patch<BaseResponse<AccountWithProfile>>(
    `/technician/${id}`,
    data,
  );
};

export const getStatusStatTechnician = () => {
  return httpPrivate.get<BaseResponse<StatusStatResponse>>(
    `/technician/statistics`,
  );
};
