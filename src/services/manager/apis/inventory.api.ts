import { httpPrivate } from "@/lib/http";
import type { BaseResponse, PartStat } from "@/types/models/response";

export const getPartStat = () => {
  return httpPrivate.get<BaseResponse<{ data: PartStat }>>(`/part/statistics`);
};
