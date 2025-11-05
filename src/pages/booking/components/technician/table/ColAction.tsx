import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Row } from "@tanstack/react-table";
import { Eye, CheckSquare } from "lucide-react";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import ActionBtn from "@/components/table/ActionBtn";
import type { TechnicianBooking } from "@/types/models/booking";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";
import CheckListModal from "../booking-detail/CheckListModal";

interface ColActionsProps {
  row: Row<TechnicianBooking>;
  currentPage: number;
  currentPageSize: number;
}

export default function ColActions({ row }: ColActionsProps) {
  const navigate = useNavigate();
  const booking = row.original;
  const [openChecklist, setOpenChecklist] = useState(false);

  const { data: bookingDetail } = useBookingDetail(booking.id);

  const handleChecklist = () => {
    setOpenChecklist(true);
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      {/* View Details */}
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Eye size={14} />}
          className="dark:bg-dark-surface"
          onClick={() => navigate(`/booking/${booking.id}`)}
        />
      </TooltipWrapper>

      {/* Checklist */}
      <TooltipWrapper content="Checklist">
        <ActionBtn
          icon={<CheckSquare size={14} />}
          className="dark:bg-dark-surface"
          onClick={handleChecklist}
        />
      </TooltipWrapper>

      <CheckListModal
        open={openChecklist}
        onOpenChange={setOpenChecklist}
        bookingData={bookingDetail}
      />
    </div>
  );
}
