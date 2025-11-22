import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import BookingCalendar from "./BookingCalendar";
import MainContentLayout from "@/components/MainContentLayout";
import { useLocation } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  const vehicleId = location.state?.vehicleId as string | undefined;

  return (
    <div className=" w-full h-[calc(100vh-32px)] font-inter">
      <DynamicBreadcrumbs pathTitles={{ booking: "Booking Services" }} />
      <MainContentLayout>
        <BookingCalendar initialVehicleId={vehicleId} />
      </MainContentLayout>
    </div>
  );
}
