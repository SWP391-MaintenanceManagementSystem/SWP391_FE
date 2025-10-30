import { axiosPrivate } from "@/lib/axios";
import type { BookingFilters } from "@/types/models/booking";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { BookingTable } from "@/types/models/booking-with-detail";

export const getBookingManagementList = async (params: BookingFilters) => {
  const response = await axiosPrivate.get<
    BaseResponse<PaginationResponse<BookingTable>>
  >("/bookings", { params });
  return response.data;
};
export const getBookingHistoryList = async (params: BookingFilters) => {
  const response = await axiosPrivate.get<
    BaseResponse<PaginationResponse<BookingTable>>
  >("/bookings/history", { params });
  return response.data;
};
