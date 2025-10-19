import { axiosPrivate } from "@/lib/axios";
import type { BaseResponse } from "@/types/models/response";
import type { Service } from "@/types/models/service";
export const searchServices = async (name: string) => {
  const response = await axiosPrivate.get<BaseResponse<{ data: Service[] }>>(
    `/services/search/${name}`
  );
  return response.data;
};
