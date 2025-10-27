import { useAuth } from "@/contexts/AuthContext";
import Unauthorized from "@/pages/unauthorized";
import { Suspense } from "react";
import CircularIndeterminate from "@/components/CircularIndeterminate";
import { AccountRole } from "@/types/enums/role";
import StaffSchedule from "./components/StaffSchedule";
import TechnicianSchedule from "./components/TechnicianSchedule";

export default function ViewSchedule() {
  const { auth } = useAuth();
  const role = auth.user?.role;
  console.log("🚀 ~ ViewSchedule ~ role:", role)
  const renderPageByRole = () => {
    switch (role) {
      case AccountRole.STAFF:
        return <StaffSchedule />;
      case AccountRole.TECHNICIAN:
        return <TechnicianSchedule/>;
      default:
        return (
          <div className="font-inter">
            <Unauthorized />
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
