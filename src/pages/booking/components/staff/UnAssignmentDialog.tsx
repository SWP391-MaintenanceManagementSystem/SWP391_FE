import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, UserMinus } from "lucide-react";
import { useBookingAssignmentListQuery } from "@/services/booking/queries/staff-booking";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";

interface UnAssignmentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (
    assignmentId: string,
    employeeEmail: string,
    bookingId: string,
  ) => void;
  item: CustomerBookingDetails;
  isPending?: boolean;
}

export default function UnAssignmentDialog({
  open,
  onOpenChange,
  onConfirm,
  item,
  isPending,
}: UnAssignmentProps) {
  const { data: assignments } = useBookingAssignmentListQuery(item.id);
  const assignmentList = assignments?.data ?? [];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px]  font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Unassign Technician</DialogTitle>
          <DialogDescription>
            Select which technician you want to unassign from this booking.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 bg-destructive/10 p-3 rounded-md">
          <AlertTriangle className="text-destructive w-5 h-5 shrink-0" />
          <p className="text-sm text-destructive">
            This action cannot be undone.
          </p>
        </div>
        {assignmentList.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-2">
            No technicians are currently assigned to this booking.
          </p>
        ) : (
          <div className="mt-3 space-y-3 max-h-[240px] overflow-y-auto">
            {assignmentList.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between border rounded-md p-3"
              >
                <div>
                  <p className="font-medium text-sm">
                    {a.employee?.firstName ?? "Unknown"}{" "}
                    {a.employee?.lastName ?? ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {a.employee.email}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  disabled={isPending}
                  onClick={() => {
                    onConfirm(a.id, a.employee.email, item.id);
                  }}
                  className="text-destructive bg-transparent hover:bg-destructive hover:text-white"
                >
                  <UserMinus />
                </Button>
              </div>
            ))}
          </div>
        )}

        <DialogFooter className="mt-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
