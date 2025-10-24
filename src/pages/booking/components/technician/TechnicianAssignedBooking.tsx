import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import TechnicianAssignedBookingTable from "./table/TechnicianAssignedBookingTable";

export default function TechnicianAssignedBookingPage() {
  // const [filters, setFilter] = useState<BookingFilters>({
  //   ...defaultBookingFilter,
  // });

  // const { bookingData, isLoading, isFetching } = useTechnicianBooking(filters);

  // const handleSearch = (search: string) => {
  //   setFilter((prev) => ({ ...prev, search: search, page: 1 }));
  // };

  return (
    <div>
      <DynamicBreadcrumbs pathTitles={{ "My assigned bookings": "Bookings" }} />

      <MainContentLayout>
        <TechnicianAssignedBookingTable />
      </MainContentLayout>
    </div>
  );
}
