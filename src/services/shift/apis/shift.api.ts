import { httpPrivate } from "@/lib/http";
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
