import {
  defaultBookingFilter,
  type BookingFilters,
} from "@/types/models/booking";
import { useBookingsHistoryQuery } from "../queries/staff-booking";

export default function useBookingHistory(
  filter: BookingFilters = defaultBookingFilter,
) {
  const { data: historyData, isLoading } = useBookingsHistoryQuery(filter);

  return { historyData, isLoading };
}
