import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../../components/sidebar";
import fetchData from "../../../../utils/api/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

function EditTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dueDate, setDueDate] = useState(""); // Add a state for the due date
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const updatedTaskData = {
      title: data.get("title"),
      due_date: data.get("due_date"),
      description: data.get("description"),
      status: data.get("status"),
      event: data.get("event"),
      responsible_department: data.get("responsible_department"),
    };

    try {
      const response = await fetchData(`http://10.121.4.116:8000/api/tasks/${taskId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (response.ok) {
        setShowLogoutModal(true);
        setTimeout(() => {
          setShowLogoutModal(false);
        }, 1000);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetchData(`http://10.121.4.116:8000/api/tasks/${taskId}/`);
        const data = await response.json();
        setTask(data);
        setDueDate(formatDate(data.due_date)); // Set the due date state
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetchData("http://10.121.4.116:8000/api/departments/");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetchData("http://10.121.4.116:8000/api/events/");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchTask();
    fetchDepartments();
    fetchEvents();
  }, [taskId]);

  useEffect(() => {
    if (task && departments.length > 0) {
      const selectedDepartment = departments.find(
        (department) => department.id === task.responsible_department
      );
      if (selectedDepartment) {
        document.getElementById("responsible_department").value =
          selectedDepartment.id;
      }
    }
  }, [task, departments]);

  return (
    <>
      <Sidebar />
      <div className="h-[100vh] p-4 sm:ml-64 flex justify-center items-center">
        <div className="w-full max-w-md md:max-w-3xl">
          {task && (
            <form
              className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={task.title}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Title
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="date"
                    name="due_date"
                    id="due_date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="due_date"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Due Date
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="status"
                    id="status"
                    defaultValue={task.status}
                    className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option className="text-black" value="not_started">
                      Not started
                    </option>
                    <option className="text-black" value="in_progress">
                      In progress
                    </option>
                    <option className="text-black" value="completed">
                      Completed
                    </option>
                  </select>
                  <label
                    htmlFor="status"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Status
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="responsible_department"
                    id="responsible_department"
                    className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    {departments.map((department) => (
                      <option
                        key={department.id}
                        className="text-black"
                        value={department.id}
                      >
                        {department.name}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="responsible_department"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Responsible Department
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="event"
                    id="event"
                    defaultValue={task.event}
                    className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    {events.map((event) => (
                      <option
                        key={event.id}
                        className="text-black"
                        value={event.id}
                      >
                        {event.name}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="event"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Event
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <textarea
                    name="description"
                    id="description"
                    defaultValue={task.description}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="description"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Task
              </button>
            </form>
          )}
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg md:p-5 text-center">
            <FontAwesomeIcon
              icon={faSquareCheck}
              className="w-12 h-12 mx-auto mb-4 text-emerald-300"
            />
            <h2 className="text-md mb-4">Task Successfully Updated</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTask;
