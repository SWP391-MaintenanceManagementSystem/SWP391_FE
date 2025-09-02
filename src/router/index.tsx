import CircularIndeterminate from "@/components/CircularIndeterminate";
import LandingPage from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";


const RouterComponent = () => {
    const router = createBrowserRouter([
        { path: "/", element: <LandingPage />, hydrateFallbackElement: <CircularIndeterminate />, },
        { path: "*", element: <NotFound /> }
    ])

    return (
        <RouterProvider

            router={router}
        />
    );
}

export default RouterComponent;