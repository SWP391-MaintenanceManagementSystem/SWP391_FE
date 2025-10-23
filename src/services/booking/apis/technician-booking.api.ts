import { axiosPrivate } from "@/lib/axios";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type {
  BookingFilters,
  TechnicianBooking,
} from "@/types/models/booking";

export const getTechnicianBookings = async (params: BookingFilters) => {
  const response = await axiosPrivate.get<
    BaseResponse<PaginationResponse<TechnicianBooking>>
  >("/technicians/bookings", { params });
  console.log('API Response:', response.data);
  return response.data.data;
};
