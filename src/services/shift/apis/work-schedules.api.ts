import { httpPrivate } from "@/lib/http";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { WorkSchedule } from "@/types/models/shift";
import type { WorkScheduleFormData } from "@/pages/shifts/libs/schema";
import type { EmployeeTable } from "@/pages/employees/libs/table-types";

export const getWorkScheduleList = (params: {
  page: number;
  pageSize: number;
  centerId?: string;
  employeeId?: string;
  role?: string;
  shiftId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<WorkSchedule>>>(
    "/work-schedules",
    {
      params,
    },
  );
};

export const deleteWorkSchedule = (id: string, date: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/work-schedules/${id}/${date}`);
};

export const updateWorkSchedule = (id: string, data: WorkScheduleFormData) => {
  return httpPrivate.patch<BaseResponse<WorkSchedule>>(
    `/work-schedules/${id}`,
    data,
  );
};

export const getAllEmployees = () => {
  return httpPrivate.get<BaseResponse<{ data: EmployeeTable[] }>>(
    `/employees/all`,
  );
};
