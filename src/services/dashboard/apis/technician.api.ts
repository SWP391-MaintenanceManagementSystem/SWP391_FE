import { httpPrivate } from "@/lib/http";
import type { TechnicianCurrentBooking, TechnicianDashboardData } from "@/types/models/dashboard";
import type { BaseResponse } from "@/types/models/response";

export const getTechnicianDashboardData = async () => {
  return httpPrivate.get<BaseResponse<{ data: TechnicianDashboardData }>>(
    `/me/statistics`
  );
};

export const getTechnicianCurrentBooking = async () => {
  return httpPrivate.get<BaseResponse<{ data: TechnicianCurrentBooking }>>(
    `/technicians/bookings/current`
  );
};
