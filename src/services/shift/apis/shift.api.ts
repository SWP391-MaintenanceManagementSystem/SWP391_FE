import { httpPrivate } from "@/lib/http";
import type { ShiftFormData } from "@/pages/shifts/libs/schema";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { Shift } from "@/types/models/shift";

export const getShiftList = (params: {
  page: number;
  pageSize: number;
  name?: string;
  status?: string;
  sortBy?: string;
  startTime?: string;
  endTime?: string;
  centerId?: string;
  orderBy?: "asc" | "desc";
}) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<Shift>>>("/shifts", {
    params,
  });
};

export const deleteShift = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/shifts/${id}`);
};

export const updateShift = (id: string, data: ShiftFormData) => {
  return httpPrivate.patch<BaseResponse<Shift>>(`/shifts/${id}`, data);
};

export const addShift = (data: ShiftFormData) => {
  return httpPrivate.post<BaseResponse<Shift>>(`/shifts`, data);
};

export const getShifts = () => {
  return httpPrivate.get<BaseResponse<{ data: Shift[] }>>("/shifts/all");
};
