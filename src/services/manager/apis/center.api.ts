import { httpPrivate } from "@/lib/http";
import type { BaseResponse } from "@/types/models/response";
import type { ServiceCenter } from "@/types/models/center";

export const getServiceCenterList = () => {
  return httpPrivate.get<BaseResponse<{ data: ServiceCenter[] }>>(
    "/service-centers",
  );
};
