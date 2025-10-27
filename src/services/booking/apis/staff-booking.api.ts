import { axiosPrivate } from "@/lib/axios";
import type { BookingFilters } from "@/types/models/booking";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { BookingStaffTable } from "@/types/models/booking-with-detail";

export const getBookingManagementList = async (params: BookingFilters) => {
  const response = await axiosPrivate.get<
    BaseResponse<PaginationResponse<BookingStaffTable>>
  >("/bookings", { params });
  return response.data;
};
