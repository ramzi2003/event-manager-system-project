import LoginLayout from "./layouts/login";
import DashboardLayout from "./layouts/dashboard";
import DepartmentLayout from "./layouts/departments";
import AddUser from "./layouts/addUser/addUser";
import Users from "./layouts/Users";
import AddVenue from "./layouts/Venues/pages/addVenue";
import Venues from "./layouts/Venues";
import EditVenue from "./layouts/Venues/pages/editVenue";
import CreateEvent from "./layouts/createEvent";

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
    },
    {
        path: "/add-venue",
        element: <AddVenue />,
        protected: true,
    },
    {
        path: "/venues",
        element: <Venues />,
        protected: true,
    },
    {
        path: "/edit-venue/:id",
        element: <EditVenue />,
        protected: true,
    },
    {
        path: "/create-event",
        element: <CreateEvent />,
        protected: true,
    }
];

export default routes;  