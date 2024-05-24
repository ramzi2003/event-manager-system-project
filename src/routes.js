import LoginLayout from "./layouts/login";
import DashboardLayout from "./layouts/dashboard";

const routes = [
    {
        path: "/",
        element: <LoginLayout />,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        protected: true,
    }
];

export default routes;  