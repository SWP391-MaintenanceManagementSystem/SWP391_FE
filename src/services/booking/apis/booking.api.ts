import { axiosPrivate } from "@/lib/axios";
import type { CreateBookingFormValues, EditBookingFormValues } from "@/pages/booking/lib/schema";
import type { Booking, BookingFilters } from "@/types/models/booking";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import type { BookingStaffTable } from "@/types/models/booking-with-detail";

export const getBookings = async (params: BookingFilters) => {
  const response = await axiosPrivate.get<
    BaseResponse<PaginationResponse<Booking>>
  >("/bookings", { params });
  return response.data;
};

export const createBooking = async (bookingData: CreateBookingFormValues) => {
  const response = await axiosPrivate.post<BaseResponse<Booking>>(
    "/bookings",
    bookingData,
  );
  return response.data;
};

export const customerUpdateBooking = async (bookingData: EditBookingFormValues) => {
  const { id, ...data } = bookingData;
  const response = await axiosPrivate.patch<BaseResponse<Booking>>(
    `/bookings/customer/${id}`,
    data,
  );
  return response.data;
};

export const getBookingById = async (bookingId: string) => {
  const response = await axiosPrivate.get<
    BaseResponse<{ data: CustomerBookingDetails }>
  >(`/bookings/${bookingId}`);
  return response.data;
};

export const cancelBookingById = async (bookingId: string) => {
  const response = await axiosPrivate.delete<
    BaseResponse<{ data: CustomerBookingDetails }>
  >(`/bookings/${bookingId}`);
  return response.data;
};

export const getBookingManagementList = async (params: BookingFilters) => {
  const response = await axiosPrivate.get<
    BaseResponse<PaginationResponse<BookingStaffTable>>
  >("/bookings", { params });
  return response.data;
};
