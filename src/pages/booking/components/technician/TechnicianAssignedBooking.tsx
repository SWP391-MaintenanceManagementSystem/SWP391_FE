import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import TechnicianAssignedBookingTable from "./table/TechnicianAssignedBookingTable";

export default function TechnicianAssignedBookingPage() {
  
  return (
    <div>
      <DynamicBreadcrumbs pathTitles={{ "My assigned bookings": "Bookings" }} />

      <MainContentLayout>
        <TechnicianAssignedBookingTable />
      </MainContentLayout>
    </div>
  );
}
