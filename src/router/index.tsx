import { PersistLogin } from "@/components/auth/PersistLogin";
import RequireAuth from "@/components/auth/RequireAuth";
import CircularIndeterminate from "@/components/CircularIndeterminate";
import MainLayout from "@/layout";
import AuthSuccess from "@/pages/auth/components/AuthSuccess";
import VerifySuccess from "@/pages/auth/components/VerifySuccess";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/notfound";
import Vehicle from "@/pages/vehicle";
import { AccountRole } from "@/types/enums/role";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "@/pages/profile";
import Unauthorized from "@/pages/unauthorized";
import ViewDetailInfo from "@/pages/vehicle/components/admin/ViewDetailInfo";
import MembershipPage from "@/pages/membership";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      hydrateFallbackElement: <CircularIndeterminate />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      hydrateFallbackElement: <CircularIndeterminate />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      hydrateFallbackElement: <CircularIndeterminate />,
    },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },
    { path: "/auth/success", element: <AuthSuccess /> },
    { path: "/auth/verify", element: <VerifySuccess /> },
    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "*", element: <NotFound /> },
    // Protected Route
    {
      element: <PersistLogin />,
      children: [
        {
          element: (
            <RequireAuth
              allowedRoles={[
                AccountRole.CUSTOMER,
                AccountRole.ADMIN,
                AccountRole.STAFF,
                AccountRole.TECHNICIAN,
              ]}
            />
          ),
          children: [
            {
              element: <MainLayout />,
              children: [
                {
                  path: "/dashboard",
                  element: <Dashboard />,
                  hydrateFallbackElement: <CircularIndeterminate />,
                },
                {
                  path: "/vehicles",
                  element: <Vehicle />,
                  hydrateFallbackElement: <CircularIndeterminate />,
                },

                {
                  path: "/vehicles/:id",
                  element: <ViewDetailInfo />,
                  hydrateFallbackElement: <CircularIndeterminate />,
                },

                {
                  element: (
                    <RequireAuth
                      allowedRoles={[AccountRole.CUSTOMER, AccountRole.ADMIN]}
                    />
                  ),
                  children: [
                    {
                      path: "/membership",
                      element: <MembershipPage />,
                      hydrateFallbackElement: <CircularIndeterminate />,
                    },
                  ],
                },

                {
                  path: "/profile",
                  element: <ProfilePage />,
                  hydrateFallbackElement: <CircularIndeterminate />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
