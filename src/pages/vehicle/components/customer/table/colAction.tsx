import { Eye } from "lucide-react";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import ActionBtn from "@/components/table/ActionBtn";
import { useNavigate } from "react-router-dom";
import type { Row } from "@tanstack/react-table";
import type { CustomerBookingHistory } from "@/types/models/booking";
import { encodeBase64 } from "@/utils/base64";

export interface ColActionsProps {
  row: Row<CustomerBookingHistory>;
  currentPage: number;
  currentPageSize: number;
}

export default function ColActions({ row }: ColActionsProps) {
  const booking = row.original;
  const navigate = useNavigate();
  const handleViewDetail = () => {
    const encodedId = encodeBase64(booking.id);
    navigate(`/booking/${encodedId}`);
  };

  return (
    <div className="flex gap-1">
      {/* View Detail */}
      <TooltipWrapper content="View Details">
        <ActionBtn icon={<Eye size={12} />} onClick={handleViewDetail} />
      </TooltipWrapper>
    </div>
  );
}
