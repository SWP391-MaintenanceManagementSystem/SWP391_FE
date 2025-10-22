import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";
import { AccountRole } from "@/types/enums/role";
import { lazy, Suspense } from "react";

const StaffBookingComponent = lazy(
  () => import("./components/staff/BookingMangement"),
);
const CustomerBookingComponent = lazy(
  () => import("./components/customer/Booking"),
);
const roleComponents = {
  staff: StaffBookingComponent,
  customer: CustomerBookingComponent,
};

export default function BookingPage() {
  const { auth } = useAuth();
  const getComponents = () => {
    switch (auth.user?.role) {
      case AccountRole.STAFF:
        return roleComponents.staff;
      case AccountRole.CUSTOMER:
        return roleComponents.customer;
      default:
        return roleComponents.customer;
    }
  };

  const Component = getComponents();
  // return (
  //   <div className="font-inter">
  //     <Booking />
  //   </div>
  // );
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}
