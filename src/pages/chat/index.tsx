import { lazy, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";

const StaffChatboxPage = lazy(
  () => import("./components/staff/StaffChatboxPage")
);
const CustomerChatboxPage = lazy(
  () => import("./components/customer/CustomerChatboxPage")
);

export default function ChatPage() {
  const { auth } = useAuth();

  const getComponentByRole = () => {
    switch (auth.user?.role) {
      case AccountRole.STAFF:
        return <StaffChatboxPage />;
      case AccountRole.CUSTOMER:
        return <CustomerChatboxPage />;
      default:
        return (
          <div className="p-4 text-center text-gray-500">Unauthorized</div>
        );
    }
  };

  return <Suspense fallback={<Loading />}>{getComponentByRole()}</Suspense>;
}
