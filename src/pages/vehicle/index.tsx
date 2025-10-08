import { useAuth } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";

const AdminVehiclesManagement = lazy(
  () => import("./components/admin/AdminVehiclesManagement")
);
const CustomerVehiclesManagement = lazy(
  () => import("./components/customer/CustomerVehiclesManagement")
);
const roleComponents = {
  admin: AdminVehiclesManagement,
  customer: CustomerVehiclesManagement,
};

export default function Vehicle() {
  const { auth } = useAuth();

  const getComponent = () => {
    switch (auth.user?.role) {
      case AccountRole.ADMIN:
        const AdminComponent = roleComponents.admin;
        return <AdminComponent />;
      case AccountRole.CUSTOMER:
        const CustomerComponent = roleComponents.customer;
        return <CustomerComponent />;
      default:
        return <Loading />;
    }
  };

  return <Suspense fallback={<Loading />}>{getComponent()}</Suspense>;
}
