import { useNavigate } from "react-router-dom";
import type { Row } from "@tanstack/react-table";
import { Eye, CheckSquare } from "lucide-react";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import ActionBtn from "@/components/table/ActionBtn";
import type { TechnicianBooking } from "@/types/models/booking";

interface ColActionsProps {
  row: Row<TechnicianBooking>;
  currentPage: number;
  currentPageSize: number;
}

export default function ColActions({ row }: ColActionsProps) {
  const navigate = useNavigate();
  const booking = row.original;
  const handleChecklist = () => {
    navigate(`/bookings/${booking.id}/checklist`);
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      {/* View Details */}
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Eye size={14} />}
          onClick={() => navigate(`/booking/${booking.id}`)}
        />
      </TooltipWrapper>

      {/* Checklist */}
      <TooltipWrapper content="Checklist">
        <ActionBtn icon={<CheckSquare size={14} />} onClick={handleChecklist} />
      </TooltipWrapper>
    </div>
  );
}
