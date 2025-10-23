import { useCancelBookingMutation } from "../mutations";
export default function useCancelBooking() {
  const cancelMutation = useCancelBookingMutation();
  const onCancel = (bookingId: string) => {
    cancelMutation.mutate(bookingId);
  };
  return { onCancel };
}
