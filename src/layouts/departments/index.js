import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import { useParams } from "react-router-dom";
import fetchData from "../../utils/api/fetchData";

function DepartmentLayout() {
  const { id: departmentId } = useParams();
  const [error, setError] = useState(null);
  const [departmentData, setDepartmentData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [venueData, setVenueData] = useState({});

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await fetchData(
          `http://localhost:8000/api/departments/${departmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch department data");
        }

        const data = await response.json();
        setDepartmentData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetchData("http://localhost:8000/api/events/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        const filteredEvents = data.filter(
          (event) => event.responsible_department.toString() === departmentId
        );

        setEventData(filteredEvents);

        const venueIds = filteredEvents.map((event) => event.venue);
        await fetchVenues(venueIds);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchVenues = async (venueIds) => {
      try {
        const uniqueVenueIds = [...new Set(venueIds)];
        const venueResponses = await Promise.all(
          uniqueVenueIds.map((id) =>
            fetchData(`http://localhost:8000/api/venues/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
          )
        );

        const venueData = await Promise.all(
          venueResponses.map((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch venue data");
            }
            return response.json();
          })
        );

        const venues = {};
        venueData.forEach((venue) => {
          venues[venue.id] = venue.name;
        });

        setVenueData(venues);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDepartmentData();
    fetchEvents();
  }, [departmentId]);

  return (
    <div className="p-4 sm:ml-64">
      <Sidebar />
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : departmentData ? (
        <div className="text-white">
          {departmentData.name || "No Name Available"}
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
      {eventData.length > 0 ? (
        eventData.map((event) => (
          <div
            key={event.id}
            className="flex p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6"
          >
            <div>
              <p className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
                {event.name}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Start Date: {new Date(event.start_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                End Date: {new Date(event.end_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Description: {event.description || "No Description Available"}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Accommodation: {event.accommodation ? "Yes" : "No"}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                GL cc Info: {event.gl_cc_info || "Not Provided"}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Importance:{" "}
                {event.importance === "high" ? (
                  <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    {event.importance}
                  </span>
                ) : event.importance === "medium" ? (
                  <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                    {event.importance}
                  </span>
                ) : (
                  event.importance || "Not Specified"
                )}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Venue: {venueData[event.venue] || "Not Specified"}
              </p>
              <button
                type="button"
                class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-400 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-400 dark:focus:ring-gray-800"
              >
                Edit
              </button>
              <button
                type="button"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white">No Events Available</div>
      )}
    </div>
  );
}

export default DepartmentLayout;
