import {
  defaultBookingFilter,
  type BookingFilters,
} from "@/types/models/booking";
import { useBookingsQuery } from "../queries";

export default function useBooking(
  filter: BookingFilters = defaultBookingFilter
) {
  const { data: bookingData, isLoading } = useBookingsQuery(filter);

  return { bookingData, isLoading };
}
