import { httpPrivate } from "@/lib/http";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { WorkSchedule } from "@/types/models/shift";

export const getWorkScheduleList = (params: {
  page: number;
  pageSize: number;
  centerId?: string;
  employeeId?: string;
  shiftId?: string;
  dateFrom?: string;
  dateTo?: string;
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

// export const deleteShift = (id: string) => {
//   return httpPrivate.del<BaseResponse<void>>(`/shifts/${id}`);
// };

// export const updateShift = (id: string, data: ShiftFormData) => {
//   return httpPrivate.patch<BaseResponse<Shift>>(`/shifts/${id}`, data);
// };

// export const addShift = (data: ShiftFormData) => {
//   return httpPrivate.post<BaseResponse<Shift>>(`/shifts`, data);
// };
