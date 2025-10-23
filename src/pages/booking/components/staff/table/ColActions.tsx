import type { Row } from "@tanstack/react-table";
import { Maximize2, UserCheck } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { BookingStaffTable } from "@/types/models/booking-with-detail";
import { encodeBase64 } from "@/utils/base64";
import { useNavigate } from "react-router-dom";
import AssignmentDialog from "../AssignmentDialog";
import { useState } from "react";
import { useAssignBooking } from "@/services/booking/hooks/useAssignBooking";
import { toast } from "sonner";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";

export interface ColActionsProps {
  row: Row<BookingStaffTable>;
  currentPage: number;
  currentPageSize: number;
}

export default function ColActions({
  row,
  currentPage,
  currentPageSize,
}: ColActionsProps) {
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const booking = row.original;
  const navigate = useNavigate();
  const { form, onSubmit, isSuccess } = useAssignBooking();
  const { data } = useBookingDetail(booking.id ?? "");
  return (
    <div className="flex gap-1">
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Maximize2 size={12} />}
          onClick={() => {
            const encodedId = encodeBase64(booking.id);
            navigate(`/booking/${encodedId}`, {
              state: {
                currentPage,
                currentPageSize,
              },
            });
          }}
        />
      </TooltipWrapper>
      <TooltipWrapper content="Assign">
        <ActionBtn
          icon={<UserCheck size={12} />}
          onClick={() => {
            if (
              booking.status === "IN_PROGRESS" ||
              booking.status === "COMPLETED" ||
              booking.status === "CHECKED_OUT" ||
              booking.status === "CANCELLED"
            ) {
              toast.error(
                `Cannot assign technician to ${booking.status} booking`,
              );
              return;
            }
            setOpenAssignmentDialog(true);
          }}
        />
      </TooltipWrapper>

      <AssignmentDialog
        open={openAssignmentDialog}
        onOpenChange={(open) => setOpenAssignmentDialog(open)}
        form={form}
        onConfirm={async (values) => {
          await onSubmit({ ...values, bookingId: booking.id });
          if (isSuccess) {
            setOpenAssignmentDialog(false);
          }
        }}
        item={data!}
      />
    </div>
  );
}
