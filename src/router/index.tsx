import LandingPage from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";


const RouterComponent = () => {
    const router = createBrowserRouter([
        { index: true, element: <Navigate to="/landing" /> },
        { path: "landing", element: <LandingPage /> },
        { path: "*", element: <NotFound /> }
    ])

    return (
        <RouterProvider
            // fallbackElement={<CircularIndeterminate />}
            router={router}
        />
    );
}

export default RouterComponent;