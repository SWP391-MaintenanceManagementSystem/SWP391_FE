import { axiosPrivate } from "@/lib/axios";
import type { Package } from "@/types/models/package";
import type { BaseResponse } from "@/types/models/response";

export const searchPackages = async (name: string) => {
  const response = await axiosPrivate.get<BaseResponse<{ data: Package[] }>>(
    `/packages/search/${name}`
  );
  return response.data;
};
