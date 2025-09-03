import { PersistLogin } from "@/components/auth/PersistLogin";
import RequireAuth from "@/components/auth/RequireAuth";
import CircularIndeterminate from "@/components/CircularIndeterminate";
import AuthSuccess from "@/pages/auth/components/AuthSuccess";
import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/notfound";
import { Role } from "@/types/enums/role";
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
        { path: "*", element: <NotFound /> },
        // Protected Route
        {
            element: <PersistLogin />, children: [
                {
                    element: <RequireAuth allowedRoles={[Role.USER, Role.ADMIN]} />, children: [

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