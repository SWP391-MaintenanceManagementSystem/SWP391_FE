import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import BookingCalendar from "./BookingCalendar";
import MainContentLayout from "@/components/MainContentLayout";

export default function Booking() {
  return (
    <div className=" w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs />
      <MainContentLayout>
        <BookingCalendar />
      </MainContentLayout>
    </div>
  );
}
