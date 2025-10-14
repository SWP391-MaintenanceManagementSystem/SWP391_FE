import { lazy, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";

const CustomerMembership = lazy(
  () => import("./components/customer/Membership")
);
// const AdminMembership

export default function MembershipPage() {
  const { auth } = useAuth();

  // Hàm trả về component phù hợp theo role
  const getComponentByRole = () => {
    switch (auth.user?.role) {
      case AccountRole.CUSTOMER:
        return <CustomerMembership />;

      case AccountRole.ADMIN:
        // return <AdminMembership />;
        return <div>Admin Membership Page (to be implemented)</div>;
      default:
        return <div>Unauthorized</div>;
    }
  };

  return <Suspense fallback={<Loading />}>{getComponentByRole()}</Suspense>;
}
