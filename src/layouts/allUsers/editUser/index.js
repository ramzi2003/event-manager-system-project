import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/sidebar";
import fetchData from "../../../utils/api/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

function EditUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const updatedUserData = {
      username: data.get("username"),
      email: data.get("email"),
    };

    try {
      const response = await fetchData(`http://10.121.4.116:8000/auth/users/${userId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        setShowLogoutModal(true);
        setTimeout(() => {
          setShowLogoutModal(false);
        }, 1000);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchData(`http://10.121.4.116:8000/auth/users/${userId}/`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <>
      <Sidebar />
      <div className="h-[100vh] p-4 sm:ml-64 flex justify-center items-center">
        <div className="w-full max-w-md md:max-w-3xl">
          {user && (
            <form
              className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={user.username}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    readOnly
                  />
                  <label
                    htmlFor="username"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Username
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user.email}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update User
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
            <h2 className="text-md mb-4">User Successfully Updated</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUser;
