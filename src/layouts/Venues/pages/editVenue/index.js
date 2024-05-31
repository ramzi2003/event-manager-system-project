import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/sidebar";
import fetchData from "../../../../utils/api/fetchData";

function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const response = await fetchData(`http://localhost:8000/api/venues/${id}/`, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setDescription(data.location_description);
        } else {
          console.error("Error fetching venue data:", response.statusText);
          setError("Failed to fetch venue data.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      }
    };

    fetchVenueData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const venueData = {
      name,
      location_description: description,
    };

    try {
      const response = await fetchData(`http://localhost:8000/api/venues/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(venueData),
      });

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/venues");  // Redirect to /venues after the modal is shown
        }, 2000);
      } else {
        console.error("Error updating venue:", response.statusText);
        setError("Failed to update venue.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="h-[100vh] p-4 sm:ml-64">
      <Sidebar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xs">
          <form
            className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="description"
              >
                Location description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit
              </button>
            </div>
          </form>
          {error && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-red-500 text-white text-center">
              {error}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Venue edited successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditVenue;
