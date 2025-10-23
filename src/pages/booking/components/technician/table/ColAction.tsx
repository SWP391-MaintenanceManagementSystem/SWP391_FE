import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Row } from "@tanstack/react-table";
import { Eye, CheckSquare } from "lucide-react";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { ViewDetailDialog, InfoSection, InputDisableWithLabel } from "@/components/dialog/ViewDetailDialog";
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
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const handleChecklist = () => {
    navigate(`/bookings/${booking.id}/checklist`);
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      {/* View Details */}
      <TooltipWrapper content="View Details">
        <ActionBtn
          icon={<Eye size={14} />}
          onClick={() => setOpenViewDialog(true)}
        />
      </TooltipWrapper>

      {/* Checklist */}
      <TooltipWrapper content="Checklist">
        <ActionBtn
          icon={<CheckSquare size={14} />}
          onClick={handleChecklist}
        />
      </TooltipWrapper>

      {/* View Detail Dialog */}
      <ViewDetailDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        title={`#${booking.id}`}
        styleContent="max-w-[650px] max-h-[80vh] overflow-y-auto"
      >
        <div className="space-y-6">
          {/* Booking Info */}
          <InfoSection  styleFormLayout="grid-cols-2">
            <InputDisableWithLabel label="Booking ID" id="booking-id" value={booking.id} />
            <InputDisableWithLabel label="Status" id="booking-status" value={booking.status} />
            <InputDisableWithLabel
              label="Booking Date"
              id="booking-date"
              value={new Date(booking.bookingDate).toLocaleDateString()}
            />
            <InputDisableWithLabel
              label="Total Cost"
              id="total-cost"
              value={`$${booking.totalCost.toFixed(2)}`}
            />
            <InputDisableWithLabel
              label="Note"
              id="booking-note"
              value={booking.note || "—"}
            />
          </InfoSection>

          {/* Customer Info */}
          <InfoSection title="Customer Information" styleFormLayout="grid-cols-2">
            <InputDisableWithLabel
              label="Name"
              id="customer-name"
              value={`${booking.customer.firstName} ${booking.customer.lastName}`}
            />
            <InputDisableWithLabel
              label="Email"
              id="customer-email"
              value={booking.customer.email}
            />
            <InputDisableWithLabel
              label="Phone"
              id="customer-phone"
              value={booking.customer.phone}
            />
          </InfoSection>

          {/* Vehicle Info */}
          <InfoSection title="Vehicle Information" styleFormLayout="grid-cols-2">
            <InputDisableWithLabel
              label="License Plate"
              id="vehicle-license"
              value={booking.vehicle.licensePlate}
            />
            <InputDisableWithLabel label="VIN" id="vehicle-vin" value={booking.vehicle.vin} />
            <InputDisableWithLabel label="Model" id="vehicle-model" value={booking.vehicle.model} />
            <InputDisableWithLabel label="Brand" id="vehicle-brand" value={booking.vehicle.brand} />
            <InputDisableWithLabel
              label="Production Year"
              id="vehicle-year"
              value={booking.vehicle.productionYear?.toString() || "—"}
            />
          </InfoSection>

          {/* Shift Info */}
          <InfoSection title="Shift Information" styleFormLayout="grid-cols-2">
            <InputDisableWithLabel label="Shift Name" id="shift-name" value={booking.shift.name} />
            <InputDisableWithLabel
              label="Start Time"
              id="shift-start"
              value={new Date(booking.shift.startTime).toLocaleTimeString()}
            />
            <InputDisableWithLabel
              label="End Time"
              id="shift-end"
              value={new Date(booking.shift.endTime).toLocaleTimeString()}
            />
          </InfoSection>

          {/* Assigner Info */}
          <InfoSection title="Assigned By" styleFormLayout="grid-cols-2">
            <InputDisableWithLabel
              label="Name"
              id="assigner-name"
              value={`${booking.assigner.firstName} ${booking.assigner.lastName}`}
            />
            <InputDisableWithLabel
              label="Email"
              id="assigner-email"
              value={booking.assigner.email}
            />
          </InfoSection>

          {/* Service Center */}
          <InfoSection title="Service Center" styleFormLayout="grid-cols-1">
            <InputDisableWithLabel label="Center Name" id="center-name" value={booking.serviceCenter.name} />
            <InputDisableWithLabel label="Address" id="center-address" value={booking.serviceCenter.address} />
          </InfoSection>
        </div>
      </ViewDetailDialog>
    </div>
  );
}
