import { axiosPrivate } from "@/lib/axios";
import type { CreateBookingFormValues } from "@/pages/booking/lib/schema";
import type { Booking, BookingFilters } from "@/types/models/booking";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";

export const getBookings = async (params: BookingFilters) => {
  const response = await axiosPrivate.get<
    BaseResponse<PaginationResponse<Booking>>
  >("/bookings", { params });
  return response.data;
};

export const createBooking = async (bookingData: CreateBookingFormValues) => {
  const response = await axiosPrivate.post<BaseResponse<Booking>>(
    "/bookings",
    bookingData
  );
  return response.data;
};
