import { useAuth } from "@/contexts/AuthContext";
import { AccountStatus } from "@/types/enums/accountStatus";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth({ allowedRoles }: { allowedRoles: string[] }) {
    const { auth } = useAuth();
    if (!auth.accessToken || auth.user?.status === AccountStatus.BANNED) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.user?.role!)) {
        return <Navigate to="/unauthorized"  replace />;
    }

    return <Outlet />;
}
