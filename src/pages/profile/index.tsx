import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import { AccountRole } from "@/types/enums/role";
import Loading from "@/components/Loading";

const AdminProfile = lazy(() => import("./components/AdminProfile"));
const Profile = lazy(() => import("./components/profile/Profile"));

const roleComponents = {
  admin: AdminProfile,
  user: Profile,
};

export default function ProfilePage() {
  const { auth } = useAuth();

  const getComponent = () => {
    switch (auth.user?.role) {
      case AccountRole.ADMIN: {
        const AdminComponent = roleComponents.admin;
        return <AdminComponent />;
      }
      case AccountRole.CUSTOMER:
      case AccountRole.STAFF:
      case AccountRole.TECHNICIAN: {
        const UserProfile = roleComponents.user;
        return <UserProfile />;
      }
      default:
        return <Loading />;
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      {getComponent()}
    </Suspense>
  );
}
