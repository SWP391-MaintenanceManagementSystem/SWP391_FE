import { httpPrivate } from "@/lib/http";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { PartStat, Part, Category } from "@/types/models/part";
import type {
  PartItemFormData,
  CategoryFormData,
} from "@/pages/inventory/libs/schema";

export const getPartStat = () => {
  return httpPrivate.get<BaseResponse<{ data: PartStat }>>(`/part/statistics`);
};

export const getPartList = (params: {
  name?: string;
  categoryName?: string;
  status?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
  page: number;
  pageSize: number;
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

export const updatePartItem = (id: string, data: PartItemFormData) => {
  return httpPrivate.patch<BaseResponse<Part>>(`/part/${id}`, data);
};

export const addCategory = (data: CategoryFormData) => {
  return httpPrivate.post<BaseResponse<Category>>(`/category`, data);
};
