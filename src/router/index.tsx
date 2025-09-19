import { PersistLogin } from "@/components/auth/PersistLogin";
import RequireAuth from "@/components/auth/RequireAuth";
import CircularIndeterminate from "@/components/CircularIndeterminate";
import MainLayout from "@/layout";
import AuthSuccess from "@/pages/auth/components/AuthSuccess";
import VerifySuccess from "@/pages/auth/components/VerifySuccess";
import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/notfound";
import { AccountRole } from "@/types/enums/role";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const RouterComponent = () => {
    const router = createBrowserRouter([
        { path: "/", element: <LandingPage />, hydrateFallbackElement: <CircularIndeterminate />, },
        { path: "/login", element: <LoginPage />, hydrateFallbackElement: <CircularIndeterminate />, },
        { path: "/register", element: <RegisterPage />, hydrateFallbackElement: <CircularIndeterminate />, },
        { path: "/auth/success", element: <AuthSuccess /> },
        { path: "/auth/verify", element: <VerifySuccess /> },
        { path: "*", element: <NotFound /> },
        // Protected Route
        {
            element: <PersistLogin />, children: [
                {
                    element: <RequireAuth allowedRoles={[AccountRole.CUSTOMER, AccountRole.ADMIN]} />, children: [
                        {
                            element: <MainLayout />, children: [
                                {
                                    path: "/dashboard", element: <Dashboard />, hydrateFallbackElement: <CircularIndeterminate />
                                }
                            ]
                        }
                    ],
                }
            ]
        }
    ])

    return (
        <RouterProvider
            router={router}
        />
    );
}

export default RouterComponent;