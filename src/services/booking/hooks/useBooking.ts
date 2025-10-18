import {
  defaultBookingFilter,
  type BookingFilters,
} from "@/types/models/booking";
import { useBookingsQuery } from "../queries";
import type { BookingFormValues } from "@/pages/booking/lib/schema";
import { useForm } from "react-hook-form";

export default function useBooking(
  filter: BookingFilters = defaultBookingFilter
) {
  const { data: bookingData, isLoading } = useBookingsQuery(filter);

  const form = useForm<BookingFormValues>({
    defaultValues: {
      vehicleId: "",
      centerId: "",
      service: [],
      package: [],
      dateTime: new Date(),
      note: "",
    },
  });

  return { bookingData, isLoading, form };
}
