import { httpPrivate } from "@/lib/http";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { PartStat, Part, Category } from "@/types/models/part";

export const getPartStat = () => {
  return httpPrivate.get<BaseResponse<{ data: PartStat }>>(`/part/statistics`);
};

export const getPartList = (params: {
  page: number;
  pageSize: number;
  name?: string;
  categoryName?: string;
  status?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
}) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<Part>>>("/part", {
    params,
  });
};

export const getCategoryList = () => {
  return httpPrivate.get<BaseResponse<{ data: Category }>>("/category");
};

export const detletePartItem = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/part/${id}`);
};
