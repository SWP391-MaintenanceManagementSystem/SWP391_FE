import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import BookingCalendar from "./BookingCalendar";
import MainContentLayout from "@/components/MainContentLayout";

export default function Booking() {
  return (
    <div className=" w-full h-[calc(100vh-32px)]">
      <DynamicBreadcrumbs pathTitles={{ booking: "Booking Services" }} />
      <MainContentLayout>
        <BookingCalendar />
      </MainContentLayout>
    </div>
  );
}
