import type { Row } from "@tanstack/react-table";
import { Maximize2 } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import type { BookingStaffTable } from "@/types/models/booking-with-detail";
import { encodeBase64 } from "@/utils/base64";
import { useNavigate } from "react-router-dom";

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
  const booking = row.original;
  const navigate = useNavigate();
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
    </div>
  );
}
