import LoginLayout from "./layouts/login";
import DashboardLayout from "./layouts/dashboard";
import DepartmentLayout from "./layouts/departments";
import AddUser from "./layouts/addUser/addUser";
import Users from "./layouts/Users";

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
    },
    {
        path: "/add-user",
        element: <AddUser />,
        protected: true,
    },
    {
        path: "/users",
        element: <Users />,
        protected: true,
    }
];

export default routes;  