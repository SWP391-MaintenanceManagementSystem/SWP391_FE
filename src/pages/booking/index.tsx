import { lazy, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import CircularIndeterminate from "@/components/CircularIndeterminate";

const Booking = lazy(() => import("./components/customer/Booking"));
const TechnicianAssignedBookingPage = lazy(
  () => import("./components/technician/TechnicianAssignedBooking"),
);
const StaffBookingPage = lazy(
  () => import("./components/staff/BookingMangement"),
);

export default function BookingPage() {
  const { auth } = useAuth();
  const role = auth?.user?.role;

  const renderPageByRole = () => {
    switch (role) {
      case "TECHNICIAN":
        return <TechnicianAssignedBookingPage />;

      case "STAFF":
        return <StaffBookingPage />;

      case "ADMIN":
      case "CUSTOMER":
      default:
        return (
          <div className="font-inter">
            <Booking />
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
