import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";
import { AccountRole } from "@/types/enums/role";
import { lazy, Suspense } from "react";

const AdminDashboadComponent = lazy(
  () => import("./components/AdminDashboard")
);
const CustomerDashboadComponent = lazy(
  () => import("./components/CustomerDashboard")
);
const StaffDashboardComponent = lazy(
  () => import("./components/StaffDashboard")
);
const TechnicianDashboardComponent = lazy(
  () => import("./components/TechnicianDashboard")
);

const roleComponents = {
  admin: AdminDashboadComponent,
  user: CustomerDashboadComponent,
  staff: StaffDashboardComponent,
  technician: TechnicianDashboardComponent,
};

export default function Dashboard() {
  const { auth } = useAuth();
  const getComponents = () => {
    switch (auth.user?.role) {
      case AccountRole.ADMIN:
        return roleComponents.admin;
      case AccountRole.CUSTOMER:
        return roleComponents.user;
      case AccountRole.STAFF:
        return roleComponents.staff;
      case AccountRole.TECHNICIAN:
        return roleComponents.technician;
      default:
        return roleComponents.user;
    }
  };

  const Component = getComponents();

  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}
