import { Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import CircularIndeterminate from "@/components/CircularIndeterminate";
import BookingDetail from "./customer/booking-detail/BookingDetail";
import AssignedBookingDetail from "./technician/booking-detail/AssignedBookingDetail";
import ViewBookingDetail from "./staff/ViewBookingDetail";

export default function BookingDetailPage() {
  const { auth } = useAuth();
  const role = auth?.user?.role;
  const renderPageByRole = () => {
    switch (role) {
      case "TECHNICIAN":
        return <AssignedBookingDetail />;
      case "STAFF":
        return <ViewBookingDetail />;
      case "ADMIN":
      case "CUSTOMER":
        return <BookingDetail />;
      default:
        return (
          <div className="font-inter">
            <BookingDetail />
          </div>
        );
    }
  };

  return (
    <Suspense fallback={<CircularIndeterminate />}>
      {renderPageByRole()}
    </Suspense>
  );
}
