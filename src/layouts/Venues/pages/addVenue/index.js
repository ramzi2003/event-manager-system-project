import React, { useState } from "react";
import Sidebar from "../../../../components/sidebar";
import fetchData from "../../../../utils/api/fetchData";

function AddVenue() {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const venueData = {
      name: data.get("name"),
      location_description: data.get("description"),
    };

    try {
      const response = await fetchData("http://localhost:8000/api/venues/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(venueData),
      });

      console.log(localStorage.getItem("accessToken"));

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
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
                placeholder="Description"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add
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
            <p>Venue added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddVenue;
