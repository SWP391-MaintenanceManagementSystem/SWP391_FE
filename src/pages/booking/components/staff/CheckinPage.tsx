import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import { useParams } from "react-router-dom";
import { b64DecodeUnicode } from "@/utils/base64";
import MainContentLayout from "@/components/MainContentLayout";
import BookingInfoBox from "./BookingInfoBox";
import CheckinForm from "./CheckinForm";
import { useBookingDetail } from "@/services/booking/hooks/useBookingDetail";
import { useVehicleHandoverForm } from "@/services/vehicle-handover/hooks/useVehicleHandover";
import { useGetVehicleHandover } from "@/services/vehicle-handover/hooks/useGetVehicleHandover";
import type { BookingCheckinsFormValues } from "../../lib/schema";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckinPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const decodedBookingId = bookingId ? b64DecodeUnicode(bookingId) : "";

  const { data: bookingDetail, isLoading: bookingLoading } =
    useBookingDetail(decodedBookingId);
  const { data: vehicleHandover, isLoading: handoverLoading } =
    useGetVehicleHandover(decodedBookingId);

  const { form, createHandover, isPending } = useVehicleHandoverForm({
    item: vehicleHandover,
    bookingDate: bookingDetail?.bookingDate,
    bookingId: decodedBookingId,
    note: bookingDetail?.note,
  });

  const onSubmit = (data: BookingCheckinsFormValues) => {
    const formatted = {
      ...data,
      date: dayjs(data.date).format("YYYY-MM-DDTHH:mm"),
    };
    createHandover(formatted);
  };

  const isLoading = bookingLoading || handoverLoading;

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs
        pathTitles={{
          booking: "Booking Management",
          [bookingId ?? ""]: "Booking Detail",
          checkin: "Check-In",
        }}
      />

      <MainContentLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4">
        {isLoading ? (
          <>
            <Card>
              <CardContent className="flex flex-col gap-3">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-60" />
                <Skeleton className="h-32 w-[300px]" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {bookingDetail && <BookingInfoBox booking={bookingDetail} />}
            <CheckinForm
              form={form}
              onSubmit={onSubmit}
              isPending={isPending}
              isLoading={isLoading}
              bookingStatus={bookingDetail?.status}
              images={vehicleHandover?.images ?? []}
            />
          </>
        )}
      </MainContentLayout>
    </div>
  );
}
