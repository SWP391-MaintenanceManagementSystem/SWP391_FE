import { useNavigate } from "react-router-dom";
import { useCancelBookingMutation } from "../mutations";
export default function useCancelBooking() {
  const cancelMutation = useCancelBookingMutation();
  const navigate = useNavigate();
  const onCancel = (bookingId: string) => {
    cancelMutation.mutateAsync(bookingId, {
      onSuccess: () => {
        navigate("/bookings");
      },
    });
  };
  return { onCancel };
}
