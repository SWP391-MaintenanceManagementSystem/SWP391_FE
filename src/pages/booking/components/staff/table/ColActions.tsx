import type { Row } from "@tanstack/react-table";
import { Maximize2, UserCheck } from "lucide-react";
import ActionBtn from "@/components/table/ActionBtn";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { useState } from "react";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import type { BookingStaffTable } from "@/types/models/booking-with-detail";

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
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const booking = row.original;
  return (
    <div className="flex gap-1">
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Maximize2 size={12} />}
          onClick={() => {
            console.log("View Details");
            setOpenViewDialog(true);
          }}
        />
      </TooltipWrapper>
      <TooltipWrapper content="Assign">
        <ActionBtn
          icon={<UserCheck size={12} />}
          onClick={() => {
            console.log("Assign");
            setOpenViewDialog(true);
          }}
        />
      </TooltipWrapper>
    </div>
  );
}
