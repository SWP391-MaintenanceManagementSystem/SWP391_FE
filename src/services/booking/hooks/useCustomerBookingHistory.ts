import {
  defaultBookingFilter,
  type BookingFilters,
} from "@/types/models/booking";
import { useBookingsHistoryQuery } from "../queries";


export default function useCustomerBookingHistory(
  filter: BookingFilters = defaultBookingFilter,
) {
  const { data: historyData, isLoading } = useBookingsHistoryQuery(filter);

  return { historyData, isLoading };
}
