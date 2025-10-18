import { axiosPrivate } from "@/lib/axios";
import type { ServiceCenter } from "@/types/models/center";
import type { BaseResponse } from "@/types/models/response";

export const getCenters = async () => {
  const response = await axiosPrivate.get<
    BaseResponse<{ data: ServiceCenter[] }>
  >("/service-centers");
  return response.data;
};
