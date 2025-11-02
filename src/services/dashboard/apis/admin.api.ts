import { httpPrivate } from "@/lib/http";
import type {
  AdminOverview,
  InventoryStatusData,
  RevenueData,
  ServiceCenterStat,
  TrendingPurchase,
} from "@/types/models/dashboard";
import type { BaseResponse } from "@/types/models/response";

export const getOverview = () => {
  return httpPrivate.get<BaseResponse<AdminOverview>>("/statistics/overview");
};

export const getRevenueByRange = (range: string) => {
  return httpPrivate.get<BaseResponse<RevenueData>>(
    `/statistics/revenues?range=${range}`,
  );
};

export const getTrendingPurchase = () => {
  return httpPrivate.get<BaseResponse<TrendingPurchase>>(
    "/statistics/trending",
  );
};

export const getInventoryStatus = () => {
  return httpPrivate.get<BaseResponse<InventoryStatusData>>(
    "/statistics/inventories",
  );
};

export const getServiceCenterStat = () => {
  return httpPrivate.get<BaseResponse<{ data: ServiceCenterStat[] }>>(
    "/statistics/centers",
  );
};
