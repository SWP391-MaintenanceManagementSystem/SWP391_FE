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
import StaffsManagementPage from "@/pages/employees/staffs";
import TechniciansManagementPage from "@/pages/employees/technicians";
import WorkShiftsManagementPage from "@/pages/shifts";
import Booking from "@/pages/booking";
import AuthFailed from "@/pages/auth/components/AuthFailed";
import InventoryManagement from "@/pages/inventory";
import PaymentSuccessPage from "@/pages/payment";
import AddNewSchedulePage from "@/pages/shifts/components/schedules/AddNewSchedule";

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
    { path: "auth/failed", element: <AuthFailed /> },
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
                      allowedRoles={[AccountRole.ADMIN, AccountRole.CUSTOMER]}
                    />
                  ),
                  children: [
                    {
                      path: "/membership",
                      element: <MembershipPage />,
                    },
                  ],
                },
                {
                  element: <RequireAuth allowedRoles={[AccountRole.ADMIN]} />,
                  children: [
                    {
                      path: "/employees/technicians",
                      element: <TechniciansManagementPage />,
                      hydrateFallbackElement: <CircularIndeterminate />,
                    },
                    {
                      path: "/employees/staffs",
                      element: <StaffsManagementPage />,
                      hydrateFallbackElement: <CircularIndeterminate />,
                    },
                    {
                      path: "/shifts",
                      element: <WorkShiftsManagementPage />,
                      hydrateFallbackElement: <CircularIndeterminate />,
                    },
                    {
                      path: "/shifts/addNewSchedule",
                      element: <AddNewSchedulePage />,
                      hydrateFallbackElement: <CircularIndeterminate />,
                    },
                    {
                      path: "/inventory",
                      element: <InventoryManagement />,
                      hydrateFallbackElement: <CircularIndeterminate />,
                    },
                  ],
                },

                {
                  element: (
                    <RequireAuth
                      allowedRoles={[
                        AccountRole.ADMIN,
                        AccountRole.CUSTOMER,
                        AccountRole.STAFF,
                      ]}
                    />
                  ),
                  children: [
                    {
                      path: "/booking",
                      element: <Booking />,
                    },
                  ],
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
            {
              element: <RequireAuth allowedRoles={[AccountRole.CUSTOMER]} />,
              children: [
                {
                  path: "/payment-success",
                  element: <PaymentSuccessPage />,
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
