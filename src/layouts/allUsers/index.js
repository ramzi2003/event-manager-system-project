import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import fetchData from "../../utils/api/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsersFromApi() {
      try {
        const usersResponse = await fetchData("http://10.121.4.116:8000/auth/users/");
        const usersData = await usersResponse.json();
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUsersFromApi();
  }, []);

  const handleDeleteUser = async () => {
    if (userToDelete !== null) {
      try {
        const response = await fetchData(`http://10.121.4.116:8000/auth/users/${userToDelete}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            current_password: currentPassword
          })
        });
        
        // Check if the delete request was successful
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== userToDelete));
        } else {
          console.error("Failed to delete user:", response.statusText);
        }
        
        setShowPasswordModal(false);
        setShowLogoutModal(false);
        setCurrentPassword("");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <Sidebar />
      <div className="sm:ml-64">
        <div className="sticky top-0 z-50 bg-white p-2 shadow-md">
          <form className="m-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search users"
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
                  Username
                </th>
                <th scope="col" className="px-6 py-3 w-1/2">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 w-1/6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="bg-white hover:bg-gray-50 border-b-2">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.username}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.email}
                  </th>
                  <td className="px-6 py-1">
                    <button
                      className="flex items-center justify-center hover:bg-gray-200 p-2 rounded-full transition duration-200 active:bg-blue-200"
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-blue-500"
                      />
                    </button>
                    <button
                      className="flex items-center justify-center hover:bg-gray-200 p-2 rounded-full transition duration-200 active:bg-red-200"
                      onClick={() => {
                        setUserToDelete(user.id);
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
              Are you sure you want to delete this user?
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
                  setShowPasswordModal(true);
                  setShowLogoutModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg md:p-5 text-center">
            <h2 className="text-md mb-4">
              Please enter your current password to confirm deletion:
            </h2>
            <input
              type="password"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              required
            />
            <div className="flex justify-center">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-200 border border-gray-400"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-400 border border-red-600 hover:bg-red-500 active:bg-red-200 text-white px-4 py-2 rounded"
                onClick={handleDeleteUser}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllUser;
