import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";

const AdminProfile = lazy(() => import("./components/AdminProfile"));
// const UserProfile = lazy(() => import("./components/UserProfile"));
//
const roleComponents = {
  admin: AdminProfile,
};

export default function Profile() {
  const { auth } = useAuth();
  const getComponent = () => {
    switch (auth.user?.role) {
      case AccountRole.ADMIN:
        return roleComponents.admin;
      // case AccountRole.USER:
      //   return <UserProfile />;
      default:
        return <div>Unknown user</div>;
    }
  };
  const Component = getComponent();
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}
