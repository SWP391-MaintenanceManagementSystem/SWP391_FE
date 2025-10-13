import { httpPrivate } from "@/lib/http";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { PartStat, Part, Category } from "@/types/models/part";
import type {
  PartItemFormData,
  CategoryFormData,
} from "@/pages/inventory/libs/schema";

export const getPartStat = () => {
  return httpPrivate.get<BaseResponse<{ data: PartStat }>>(`/parts/statistics`);
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
  return httpPrivate.get<BaseResponse<PaginationResponse<Part>>>("/parts", {
    params,
  });
};

export const getCategoryList = () => {
  return httpPrivate.get<BaseResponse<{ data: Category }>>("/categories");
};

export const detletePartItem = (id: string) => {
  return httpPrivate.del<BaseResponse<void>>(`/parts/${id}`);
};

export const updatePartItem = (id: string, data: PartItemFormData) => {
  return httpPrivate.patch<BaseResponse<Part>>(`/parts/${id}`, data);
};

export const addCategory = (data: CategoryFormData) => {
  return httpPrivate.post<BaseResponse<Category>>(`/categories`, data);
};

export const addPartItem = (data: PartItemFormData) => {
  return httpPrivate.post<BaseResponse<Part>>(`/parts`, data);
};
