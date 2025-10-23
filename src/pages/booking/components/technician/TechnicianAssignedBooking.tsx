import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import TechnicianAssignedBookingTable from "./table/TechnicianAssignedBookingTable";
import useTechnicianBooking from "@/services/booking/hooks/useTechnicianBooking";

export default function TechnicianAssignedBookingPage() {
  const { bookingData, isLoading, isFetching } = useTechnicianBooking();

  console.log("Booking data:", bookingData);

  return (
    <div>
      <DynamicBreadcrumbs pathTitles={{ "My assigned bookings": "Bookings" }} />

      <MainContentLayout>
        {/* Header summary */}
       

        <TechnicianAssignedBookingTable
          data={bookingData?.data ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          totalPage={bookingData?.totalPages ?? 1}
          pageIndex={bookingData?.page ? bookingData.page - 1 : 0}
          pageSize={bookingData?.pageSize ?? 10}
        />
      </MainContentLayout>
    </div>
  );
}
