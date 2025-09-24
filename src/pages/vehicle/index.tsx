import { useAuth } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";

const AdminVehiclesManagement = lazy(
  () => import("./components/AdminVehiclesManagement"),
);

const roleComponents = {
  admin: AdminVehiclesManagement,
};

export default function Vehicle() {
  const { auth } = useAuth();

  const getComponent = () => {
    switch (auth.user?.role) {
      case AccountRole.ADMIN:
        return roleComponents.admin;
      default:
        return null;
    }
  };

  const Component = getComponent();
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}
