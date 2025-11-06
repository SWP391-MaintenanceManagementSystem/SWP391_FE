import { useNavigate } from "react-router-dom";
import type { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import ActionBtn from "@/components/table/ActionBtn";
import type { Booking } from "@/types/models/booking";
import { encodeBase64 } from "@/utils/base64";

interface ColActionsProps {
  row: Row<Booking>;
  currentPage: number;
  currentPageSize: number;
}

export default function ColActions({ row }: ColActionsProps) {
  const navigate = useNavigate();
  const booking = row.original;

  const handleViewDetail = () => {
    navigate(`/booking/${encodeBase64(booking.id)}`);
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      {/* View Details */}
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Eye size={14} />}
          className="dark:bg-dark-surface"
          onClick={handleViewDetail}
        />
      </TooltipWrapper>
    </div>
  );
}
