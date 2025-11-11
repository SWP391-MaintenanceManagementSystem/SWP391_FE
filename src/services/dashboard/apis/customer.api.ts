import { httpPrivate } from "@/lib/http";
import type { CustomerDashboardData } from "@/types/models/dashboard";
import type { BaseResponse } from "@/types/models/response";

export const getCustomerDashboardData = async () => {
  return httpPrivate.get<BaseResponse<{ data: CustomerDashboardData }>>(
    `/me/statistics`
  );
};
