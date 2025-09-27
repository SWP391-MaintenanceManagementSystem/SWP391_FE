import { useAuth } from "@/contexts/AuthContext";
import React, { lazy, Suspense } from "react";

import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";

const AdminVehiclesManagement = lazy(
  () => import("./components/admin/AdminVehiclesManagement"),
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

  const Component: React.LazyExoticComponent<() => React.ReactElement> | null =
    getComponent();
  return (
    <Suspense fallback={<Loading />}>
      {Component ? (
        <Component />
      ) : (
        <div className=" flex min-h-screen items-center justify-center">
          <h2 className="font-bold text-4xl">You don’t have permission</h2>
        </div>
      )}
    </Suspense>
  );
}
