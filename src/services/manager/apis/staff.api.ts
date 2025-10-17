import { httpPrivate } from "@/lib/http";
import type {
  PaginationResponse,
  BaseResponse,
  StatusStatResponse,
} from "@/types/models/response";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";
import type { EditEmployeeFormData } from "@/pages/employees/libs/schema";

export const getStaffs = (params: {
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
    "/staffs",
    { params },
  );
};

export const deleteStaff = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/staffs/${id}`);
};

export const getStaffById = (id: string) => {
  return httpPrivate.get<BaseResponse<EmployeeTable>>(`/staffs/${id}`);
};

export const updateStaff = (id: string, data: EditEmployeeFormData) => {
  return httpPrivate.patch<BaseResponse<EmployeeTable>>(`/staffs/${id}`, data);
};

export const getStatusStatStaff = () => {
  return httpPrivate.get<BaseResponse<StatusStatResponse>>(
    `/staffs/statistics`,
  );
};

export const addStaff = async (formData: EditEmployeeFormData) => {
  return httpPrivate.post<BaseResponse<EmployeeTable>>(`/staffs`, formData);
};
