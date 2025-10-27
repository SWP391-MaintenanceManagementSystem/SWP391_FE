import React, { useState } from "react";
import { Eye } from "lucide-react";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import ActionBtn from "@/components/table/ActionBtn";
import { ViewDetailDialog } from "@/components/dialog/ViewDetailDialog";
import type { Row } from "@tanstack/react-table";
import type { CustomerBookingHistory } from "@/types/models/booking";

export interface ColActionsProps {
  row: Row<CustomerBookingHistory>;
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
      {/* Nút xem chi tiết */}
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Eye size={12} />}
          onClick={() => {
            console.log("Viewing booking:", booking.id);
            setOpenViewDialog(true);
          }}
        />
      </TooltipWrapper>

      {/* Dialog chi tiết booking */}
      <ViewDetailDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        title="Booking Details"
      >
        {/* Nội dung chi tiết booking */}
        <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Booking ID:</span>{" "}
            {booking.id.slice(0, 8)}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(booking.bookingDate).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {booking.status}
          </p>
          <p>
            <span className="font-semibold">Vehicle:</span>{" "}
            {booking.vehicle?.licensePlate ?? "—"}
          </p>
          <p>
            <span className="font-semibold">Total Cost:</span>{" "}
            {booking.totalCost
              ? `$${booking.totalCost.toFixed(2)}`
              : "Not available"}
          </p>
          {booking.note && (
            <p>
              <span className="font-semibold">Note:</span> {booking.note}
            </p>
          )}
        </div>
      </ViewDetailDialog>
    </div>
  );
}
