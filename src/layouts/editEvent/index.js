import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import fetchData from "../../utils/api/fetchData";

function EditEvent() {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    event_name: "",
    start_date: "",
    end_date: "",
    description: "",
    accommodation: "",
    gl_cc_info: "",
    importance: "",
    venue: "",
    responsible_department: ""
  });

  const redir = () => {
    navigate(`/department/${eventData.responsible_department}`);
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

    const fetchVenues = async () => {
      try {
        const response = await fetchData("http://10.121.4.116:8000/api/venues/");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    const fetchEvent = async () => {
      try {
        const response = await fetchData(`http://10.121.4.116:8000/api/events/${id}`);
        const data = await response.json();

        const formatDate = (date) => {
          const d = new Date(date);
          return d.toISOString().split('T')[0];
        };

        setEventData({
          event_name: data.name,
          start_date: formatDate(data.start_date),
          end_date: formatDate(data.end_date),
          description: data.description,
          accommodation: data.accommodation ? "yes" : "no",
          gl_cc_info: data.gl_cc_info,
          importance: data.importance,
          venue: data.venue,
          responsible_department: data.responsible_department
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchDepartments();
    fetchVenues();
    fetchEvent();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const eventData = {
      name: data.get("event_name"),
      start_date: data.get("start_date"),
      end_date: data.get("end_date"),
      description: data.get("description"),
      accommodation: data.get("accommodation") === "yes",
      gl_cc_info: data.get("gl_cc_info"),
      importance: data.get("importance").toLowerCase(),
      venue: data.get("venue"),
      responsible_department: data.get("responsible_department"),
    };

    

    try {
      const response = await fetchData(`http://10.121.4.116:8000/api/events/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
        setTimeout(() => {
          redir();
        }, 1200);
      } else {
        console.error("Failed to edit event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="h-[100vh] p-4 sm:ml-64 flex justify-center items-center">
        <div className="w-full max-w-md md:max-w-3xl">
          <form
            className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="event_name"
                  id="event_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={eventData.event_name}
                  onChange={(e) => setEventData({ ...eventData, event_name: e.target.value })}
                  required
                />
                <label
                  htmlFor="event_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Event Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={eventData.start_date}
                  onChange={(e) => setEventData({ ...eventData, start_date: e.target.value })}
                  required
                />
                <label
                  htmlFor="start_date"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Start Date
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={eventData.end_date}
                  onChange={(e) => setEventData({ ...eventData, end_date: e.target.value })}
                  required
                />
                <label
                  htmlFor="end_date"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  End Date
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <textarea
                  name="description"
                  id="description"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  required
                ></textarea>
                <label
                  htmlFor="description"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="accommodation"
                  id="accommodation"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={eventData.accommodation}
                  onChange={(e) => setEventData({ ...eventData, accommodation: e.target.value })}
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                <label
                  htmlFor="accommodation"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Accommodation
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="gl_cc_info"
                  id="gl_cc_info"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={eventData.gl_cc_info}
                  onChange={(e) => setEventData({ ...eventData, gl_cc_info: e.target.value })}
                  required
                />
                <label
                  htmlFor="gl_cc_info"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  GL/CC Info
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="importance"
                  id="importance"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={eventData.importance}
                  onChange={(e) => setEventData({ ...eventData, importance: e.target.value })}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <label
                  htmlFor="importance"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Importance
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="venue"
                  id="venue"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={eventData.venue}
                  onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                  required
                >
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="venue"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Venue
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="responsible_department"
                  id="responsible_department"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={eventData.responsible_department}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      responsible_department: e.target.value,
                    })
                  }
                  required
                >
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
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
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
          {showModal && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
              id="modal-overlay"
            >
              <div
                className="bg-white p-8 rounded shadow-md"
                role="dialog"
                aria-labelledby="modal-title"
                aria-modal="true"
              >
                <h2 className="text-lg font-medium" id="modal-title">
                  Event edited successfully!
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditEvent;
