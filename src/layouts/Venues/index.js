import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import fetchData from "../../utils/api/fetchData";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "./components/header";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetchData(
          "http://localhost:8000/api/venues/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const result = await response.json();
        setVenues(result);
        setFilteredVenues(result); // Set initial filtered venues to all venues
        setError(null);
      } catch (error) {
        setError(error.message);
        setVenues([]);
      }
    };

    fetchVenues();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetchData(
        `http://localhost:8000/api/venues/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete venue");
      }

      // Update the state to remove the deleted venue
      setVenues(venues.filter((venue) => venue.id !== id));
      setFilteredVenues(filteredVenues.filter((venue) => venue.id !== id));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = (query) => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVenues(filtered);
  };

  return (
    <>
      <Sidebar />
      <Header onSearch={handleSearch} />
      <div className="h-[100vh] p-4 sm:ml-64">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVenues.map((venue, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {venue.name}
                  </th>
                  <td className="px-6 py-4">{venue.location_description}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={() => navigate(`/edit-venue/${venue.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-700 hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={() => handleDelete(venue.id)}
                      >
                        <MdDeleteForever size="1.5em" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && (
            <div className="p-4 text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Venues;
