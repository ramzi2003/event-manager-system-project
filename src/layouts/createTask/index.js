import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar";
import fetchData from "../../utils/api/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

function CreateTask() {
  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const eventData = {
      title: data.get("title"),
      due_date: data.get("due_date"),
      description: data.get("description"),
      status: data.get("status"),
      event: data.get("event"),
      responsible_department: data.get("responsible_department"),
    };

    try {
      const response = await fetchData("http://10.121.4.116:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        setShowLogoutModal(true);
        setTimeout(() => {
          setShowLogoutModal(false);
        }, 1000);
        formRef.current.reset();
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetchData(
          "http://10.121.4.116:8000/api/departments/"
        );
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetchData(
          "http://10.121.4.116:8000/api/events/"
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
    fetchDepartments();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="h-[100vh] p-4 sm:ml-64 flex justify-center items-center">
        <div className="w-full max-w-md md:max-w-3xl">
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="due_date"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Due Date
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="status"
                  id="status"
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
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Responsible Department
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="event"
                  id="event"
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
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Event
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <textarea
                  name="description"
                  id="description"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="description"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg md:p-5 text-center">
            <FontAwesomeIcon
              icon={faSquareCheck}
              className="w-12 h-12 mx-auto mb-4 text-emerald-300"
            />
            <h2 className="text-md mb-4">Task Successfully Created</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateTask;
