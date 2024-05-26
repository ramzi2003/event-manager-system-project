import LoginLayout from "./layouts/login";
import DashboardLayout from "./layouts/dashboard";
import DepartmentLayout from "./layouts/departments/departmentLayout";

const routes = [
    {
        path: "/",
        element: <LoginLayout />,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        protected: true,
    },
    {
        path: "/department/:id",
        element: <DepartmentLayout/>,
        protected: true,
    }
];

export default routes;  