import { httpPrivate } from "@/lib/http";
import type {
  PaginationResponse,
  BaseResponse,
  StatusStatResponse,
} from "@/types/models/response";
// import type { AccountWithProfile } from "@/types/models/account";
import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";

export const getTechnicians = (params: {
  page: number;
  pageSize: number;
  firstName?: string;
  lastName?: string;
  status?: string;
  centerId?: string;
  hasWorkCenter?: boolean;
  email?: string;
  phone?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<EmployeeTable>>>(
    "/technicians",
    { params },
  );
};

export const deleteTechnician = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/technicians/${id}`);
};

export const getTechnicianById = (id: string) => {
  return httpPrivate.get<BaseResponse<EmployeeTable>>(`/technicians/${id}`);
};

export const updateTechnician = (id: string, data: ChangeProfileFormData) => {
  return httpPrivate.patch<BaseResponse<EmployeeTable>>(
    `/technicians/${id}`,
    data,
  );
};

export const getStatusStatTechnician = () => {
  return httpPrivate.get<BaseResponse<StatusStatResponse>>(
    `/technicians/statistics`,
  );
};

export const addTechnicican = async (formData: ChangeProfileFormData) => {
  return httpPrivate.post<BaseResponse<EmployeeTable>>(
    `/technicians`,
    formData,
  );
};
