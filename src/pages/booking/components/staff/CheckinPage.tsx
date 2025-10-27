import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import MainContentLayout from "@/components/MainContentLayout";
import BookingInfoBox from "./BookingInfoBox";
import CheckinForm from "./CheckinForm";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";
import { useCreateVehicleHandoverForm } from "@/services/vehicle-handover/hooks/useCreateVehicleHandover";
import { useVehicleHandover } from "@/services/vehicle-handover/hooks/useVehicleHandover";
import type { VehicleHandover } from "@/types/models/vehicle-handover";

export default function CheckinPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const decodedBookingId = bookingId ? b64DecodeUnicode(bookingId) : null;
  const { data: bookingDetail } = useBookingDetail(decodedBookingId || "");
  const { data: vehicleHandover, isLoading } = useVehicleHandover(
    decodedBookingId || "",
  );
  const { form, onSubmit, isPending } = useCreateVehicleHandoverForm({
    item: (vehicleHandover ?? {}) as VehicleHandover,
  });

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          booking: "Booking Management",
          [bookingId ?? ""]: "Check-In Detail",
        }}
        ignorePaths={["checkin"]}
      />
      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4">
        <BookingInfoBox booking={bookingDetail as CustomerBookingDetails} />
        <CheckinForm
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          isLoading={isLoading}
        />
      </MainContentLayout>
    </div>
  );
}
