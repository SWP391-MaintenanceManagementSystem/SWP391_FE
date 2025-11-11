import { useUnBookingAssignmentMutation } from "../mutations";
export default function useUnAssign() {
  const unAssignMutation = useUnBookingAssignmentMutation();
  const onUnAssign = (id: string, employeeEmail: string, bookingId: string) => {
    unAssignMutation.mutate({ id, employeeEmail, bookingId });
  };
  return {
    onUnAssign,
    isPending: unAssignMutation.isPending,
  };
}
