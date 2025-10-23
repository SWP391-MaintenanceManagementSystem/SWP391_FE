import DynamicBreadcrumbs from "@/components/DynamicBreadcrumb";
import MainContentLayout from "@/components/MainContentLayout";
import TechnicianAssignedBookingTable from "./table/TechnicianAssignedBookingTable";
import useTechnicianBooking from "@/services/booking/hooks/useTechnicianBooking";
import { useState } from "react";
import {
  type BookingFilters,
  defaultBookingFilter,
} from "@/types/models/booking";

export default function TechnicianAssignedBookingPage() {
  const [filters, setFilter] = useState<BookingFilters>({
    ...defaultBookingFilter,
  });
  

  const { bookingData, isLoading, isFetching } = useTechnicianBooking(filters);


  const handleSearch = (search: string) => {
    setFilter((prev) => ({ ...prev, search: search || undefined, page: 1 }));
  };

  return (
    <div>
      <DynamicBreadcrumbs pathTitles={{ "My assigned bookings": "Bookings" }} />

      <MainContentLayout>
        <TechnicianAssignedBookingTable
          data={bookingData?.data ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          totalPage={bookingData?.totalPages ?? 1}
          pageIndex={bookingData?.page ? bookingData.page - 1 : 0}
          pageSize={bookingData?.pageSize ?? 10}
          onSearchChange={handleSearch}
          searchValue={filters.search}
        />
      </MainContentLayout>
    </div>
  );
}
