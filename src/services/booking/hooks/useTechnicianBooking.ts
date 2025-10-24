import {
  defaultBookingFilter,
  type BookingFilters,
} from "@/types/models/booking";
import { useTechnicianBookingsQuery } from "../queries/technician-booking";
export default function useTechnicianBooking(
  filter: BookingFilters = defaultBookingFilter
) {
  const { data, isLoading } = useTechnicianBookingsQuery(filter);

  return { bookingData: data, isLoading };
}
