import {
  defaultBookingFilter,
  type BookingFilters,
} from "@/types/models/booking";
import { useStaffBookingsQuery } from "../queries/staff-booking";

export default function useStaffBooking(
  filter: BookingFilters = defaultBookingFilter,
) {
  const {
    data: bookingData,
    isLoading,
    isFetching,
  } = useStaffBookingsQuery(filter);

  return { bookingData, isLoading, isFetching };
}
