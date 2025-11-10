import { httpPrivate } from "@/lib/http";
import type { StaffDashboardData } from "@/types/models/dashboard";
import type { BaseResponse } from "@/types/models/response";

export const getStaffDashboardData = async () => {
  return httpPrivate.get<BaseResponse<StaffDashboardData>>(
    `/staffs/me/dashboard`,
  );
};
