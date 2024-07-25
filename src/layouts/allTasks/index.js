import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import fetchData from "../../utils/api/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState({});
  const [department, setDepartment] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        // Fetch tasks
        const tasksResponse = await fetchData(
          "http://10.121.4.116:8000/api/tasks/"
        );
        const tasksData = await tasksResponse.json();

        // Fetch events
        const eventsResponse = await fetchData(
          "http://10.121.4.116:8000/api/events/"
        );
        const eventsData = await eventsResponse.json();

        // Fetch departments
        const departmentResponse = await fetchData(
          "http://10.121.4.116:8000/api/departments/"
        );
        const departmentData = await departmentResponse.json();

        // Convert events array to an object for easy lookup
        const eventsMap = {};
        eventsData.forEach((event) => {
          eventsMap[event.id] = event.name;
        });

        // Convert departments array to an object for easy lookup
        const departmentMap = {};
        departmentData.forEach((dep) => {
          departmentMap[dep.id] = dep.name;
        });

        // Set state with fetched data
        setTasks(tasksData);
        setEvents(eventsMap);
        setDepartment(departmentMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataFromApi();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "in_progress":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      case "not_started":
        return "text-red-500";
      default:
        return "";
    }
  };

  const handleDeleteTask = async () => {
    if (taskToDelete !== null) {
      try {
        await fetchData(`http://10.121.4.116:8000/api/tasks/${taskToDelete}/`, {
          method: "DELETE",
        });
        setTasks(tasks.filter((task) => task.id !== taskToDelete));
        setShowLogoutModal(false); // Close the modal after deleting
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const getIndicatorClass = (status) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "not_started":
        return "bg-red-500";
      default:
        return "";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "in_progress":
        return "In progress";
      case "completed":
        return "Completed";
      case "not_started":
        return "Not started";
      default:
        return status;
    }
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <Sidebar />
      <div className="sm:ml-64">
        <div className="sticky top-0 z-50 bg-white p-2 shadow-md">
          <form className="m-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Event
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Responsible Department
                </th>
                <th scope="col" className="px-2 py-3 w-28">
                  <select
                    id="statusFilter"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                  >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="in_progress">In progress</option>
                    <option value="not_started">Not started</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="bg-white hover:bg-gray-50 border-b-2"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {task.title}
                  </th>
                  <td className="px-6 py-4">{task.description}</td>
                  <td className="px-6 py-4">{events[task.event]}</td>
                  <td className={`px-6 py-4`}>
                    <span
                      className={`flex items-center text-sm font-medium ${getStatusClass(
                        task.status
                      )}`}
                    >
                      <span
                        className={`flex w-2.5 h-2.5 ${getIndicatorClass(
                          task.status
                        )} rounded-full me-1.5 flex-shrink-0`}
                      ></span>
                      {getStatusLabel(task.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatDate(task.due_date)}</td>
                  <td className="px-6 py-4">
                    {department[task.responsible_department]}
                  </td>
                  <td className="px-6 py-1">
                    <button
                      className="flex items-center justify-center hover:bg-gray-200 p-2 rounded-full transition duration-200 active:bg-blue-200"
                      onClick={() => navigate(`/edit-task/${task.id}`)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-blue-500"
                      />
                    </button>
                    <button
                      className="flex items-center justify-center hover:bg-gray-200 p-2 rounded-full transition duration-200 active:bg-red-200"
                      onClick={() => {
                        setTaskToDelete(task.id);
                        setShowLogoutModal(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg md:p-5 text-center">
            <FontAwesomeIcon
              icon={faTrashCan}
              className="w-12 h-12 mx-auto mb-4 text-red-400"
            />
            <h2 className="text-md mb-4">
              Are you sure you want to delete task?
            </h2>
            <div className="flex justify-center">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-200 border border-gray-400"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className="bg-red-400 border border-red-600 hover:bg-red-500 active:bg-red-200 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleDeleteTask();
                  setShowLogoutModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllTasks;
