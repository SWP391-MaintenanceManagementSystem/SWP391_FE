import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import MainContentLayout from "@/components/MainContentLayout";
import BookingInfoBox from "./BookingInfoBox";
import CheckinForm from "./CheckinForm";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";
import type { CustomerBookingDetails } from "@/types/models/booking-with-detail";
import { useVehicleHandoverForm } from "@/services/vehicle-handover/hooks/useVehicleHandover";
import { useGetVehicleHandover } from "@/services/vehicle-handover/hooks/useGetVehicleHandover";
import type { BookingCheckinsFormValues } from "../../lib/schema";
import dayjs from "dayjs";

export default function CheckinPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const decodedBookingId = bookingId ? b64DecodeUnicode(bookingId) : "";

  const { data: bookingDetail, isLoading: bookingLoading } =
    useBookingDetail(decodedBookingId);
  const { data: vehicleHandover, isLoading: handoverLoading } =
    useGetVehicleHandover(decodedBookingId);

  const { form, createHandover, updateHandover, isPending } =
    useVehicleHandoverForm({
      item: vehicleHandover,
      bookingDate: bookingDetail?.bookingDate,
      bookingId: decodedBookingId,
    });

  // Handle submit
  const onSubmit = (data: BookingCheckinsFormValues) => {
    const formatted = {
      ...data,
      date: dayjs(data.date).format("YYYY-MM-DDTHH:mm"),
    };

    if (vehicleHandover) updateHandover(formatted);
    else createHandover(formatted);
  };

  const isLoading = bookingLoading || handoverLoading;

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
