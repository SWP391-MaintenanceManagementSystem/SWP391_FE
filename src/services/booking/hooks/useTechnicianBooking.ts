import { defaultBookingFilter, type BookingFilters, type TechnicianBooking } from "@/types/models/booking";
import type { PaginationResponse } from "@/types/models/response";
import { useTechnicianBookingsQuery } from "../queries/technician-booking";


export default function useTechnicianBooking(
  filter: BookingFilters = defaultBookingFilter
) {
  const { data, isLoading, isFetching } = useTechnicianBookingsQuery(filter);
  const bookingData = data as PaginationResponse<TechnicianBooking>;

  return { bookingData, isLoading, isFetching };
}
