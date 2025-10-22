import { Button } from "@/components/ui/button";
import { Eye, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Row } from "@tanstack/react-table";
import type { TechnicianBooking } from "@/types/models/booking";

interface ColActionsProps {
  row: Row<TechnicianBooking>;
  currentPage: number;
  currentPageSize: number;
}

export default function ColActions({ row }: ColActionsProps) {
  const navigate = useNavigate();
  const booking = row.original;

  const handleView = () => {
    navigate(`/bookings/${booking.id}`);
  };

  const handleChecklist = () => {
    navigate(`/bookings/${booking.id}/checklist`);
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      <Button
        size="icon"
        variant="ghost"
        className="text-blue-600 hover:text-blue-800"
        onClick={handleView}
        title="View details"
      >
        <Eye className="w-4 h-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="text-green-600 hover:text-green-800"
        onClick={handleChecklist}
        title="Checklist"
      >
        <CheckSquare className="w-4 h-4" />
      </Button>
    </div>
  );
}
