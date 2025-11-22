import { axiosPrivate } from "@/lib/axios";
import type { Booking, BookingFilters } from "@/types/models/booking";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { BookingTable } from "@/types/models/booking-with-detail";
import type { EditBookingFormValues } from "@/pages/booking/lib/schema";

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
export const staffUpdateBooking = async (
  bookingData: EditBookingFormValues,
) => {
  const { id, ...data } = bookingData;
  const response = await axiosPrivate.patch<BaseResponse<Booking>>(
    `/bookings/staff/${id}`,
    data,
  );
  return response.data;
};
