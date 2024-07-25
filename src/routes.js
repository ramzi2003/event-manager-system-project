import LoginLayout from "./layouts/login";
import DashboardLayout from "./layouts/dashboard";
import DepartmentLayout from "./layouts/departments";
import AddUser from "./layouts/addUser/addUser";
import AddVenue from "./layouts/Venues/pages/addVenue";
import Venues from "./layouts/Venues";
import EditVenue from "./layouts/Venues/pages/editVenue";
import CreateEvent from "./layouts/createEvent";
import EditEvent from "./layouts/editEvent";
import CreateTask from "./layouts/createTask";
import AllUsers from "./layouts/allUsers";
import AllTasks from "./layouts/allTasks";
import EditTask from "./layouts/allTasks/pages/editTask/editTask";
import EditUser from "./layouts/allUsers/editUser";
import UserTask from "./layouts/allTasks/pages/userTask/userTask";

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
        adminOnly: true,
    },
    {
        path: "/add-venue",
        element: <AddVenue />,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/venues",
        element: <Venues />,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/edit-venue/:id",
        element: <EditVenue />,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/create-event",
        element: <CreateEvent />,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/edit-event/:id",
        element: <EditEvent />,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/create-task",
        element: <CreateTask/>,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/all-users",
        element: <AllUsers />,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/all-tasks",
        element: <AllTasks />,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/edit-task/:taskId",
        element: <EditTask/>,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/edit-user/:userId",
        element: <EditUser/>,
        protected: true,
        adminOnly: true,
    },
    {
        path: "/tasks",
        element: <UserTask/>,
        protected: true,
    }
];

export default routes;  