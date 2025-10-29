import { lazy, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";
import StaffChatboxPage from "./components/staff/StaffChatboxPage";
import CustomerChatboxPage from "./components/customer/CustomerChatboxPage";

const StaffChatbox = lazy(() => import("./components/staff/StaffChatboxPage"));

// const CustomerChatbox = lazy(
//   () => import("")
// );

export default function ChatPage() {
  const { auth } = useAuth();

  // Hàm trả về component phù hợp theo role
  const getComponentByRole = () => {
    switch (auth.user?.role) {
      case AccountRole.STAFF:
        return <StaffChatboxPage />;
      case AccountRole.CUSTOMER:
        return <CustomerChatboxPage />;
      default:
        return <div>Unauthorized</div>;
    }
  };

  return <Suspense fallback={<Loading />}>{getComponentByRole()}</Suspense>;
}
