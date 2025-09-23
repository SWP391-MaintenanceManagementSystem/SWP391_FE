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

const roleComponents = {
  admin: AdminDashboadComponent,
  user: CustomerDashboadComponent,
};

export default function Dashboard() {
  const { auth } = useAuth();
  const getComponents = () => {
    switch (auth.user?.role) {
      case AccountRole.ADMIN:
        return roleComponents.admin;
      case AccountRole.CUSTOMER:
        return roleComponents.user;
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
