import { useAuth } from "@/contexts/AuthContext";
import TechnicianInventoryManagement from "./TechnicianInventoryManagement";
import Unauthorized from "../unauthorized";
import AdminInventoryManagement from "./AdminInventoryManagement";
import { Suspense } from "react";
import CircularIndeterminate from "@/components/CircularIndeterminate";
import { AccountRole } from "@/types/enums/role";

export default function InventoryManagement() {
  const { auth } = useAuth();
  const role = auth.user?.role;
  console.log("🚀 ~ InventoryManagement ~ role:", role)
  const renderPageByRole = () => {
    switch (role) {
      case AccountRole.TECHNICIAN:
        return <TechnicianInventoryManagement />;
      case AccountRole.ADMIN:
        return <AdminInventoryManagement />;
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
