import { useAuth } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";

const AdminVehiclesManagement = lazy(
  () => import("./components/manager/CustomersManagement"),
);
const CustomerVehiclesManagement = lazy(
  () => import("./components/customer/CustomerVehiclesManagement"),
);

export default function Vehicle() {
  const { auth } = useAuth();
  const getComponent = () => {
    switch (auth.user?.role) {
      case AccountRole.ADMIN:
      case AccountRole.STAFF:
        return <AdminVehiclesManagement />;
      case AccountRole.CUSTOMER:
        return <CustomerVehiclesManagement />;
      default:
        return <Loading />;
    }
  };

  return <Suspense fallback={<Loading />}>{getComponent()}</Suspense>;
}
