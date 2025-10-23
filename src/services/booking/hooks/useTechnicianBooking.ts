import {
  defaultBookingFilter,
  type BookingFilters,
  type TechnicianBooking,
} from "@/types/models/booking";
import type { PaginationResponse } from "@/types/models/response";
import { useTechnicianBookingsQuery } from "../queries/technician-booking";

export default function useTechnicianBooking(
  filter: BookingFilters = defaultBookingFilter
) {
  const validFilter = {
    ...filter,
    page: filter.page || 1,
    pageSize: filter.pageSize || 10,
    search: filter.search || undefined,
  };

  const { data, isLoading, isFetching } = useTechnicianBookingsQuery(validFilter);

  const emptyData: PaginationResponse<TechnicianBooking> = {
    data: [],
    page: 1,
    pageSize: 10,
    totalPages: 1,
    total: 0
  };

  return {
    bookingData: data || emptyData,
    isLoading,
    isFetching,
  };
}
