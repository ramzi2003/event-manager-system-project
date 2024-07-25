import React, { useEffect, useState } from "react";
import fetchData from "../../utils/api/fetchData";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";

function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const adminToolPaths = [
    "/create-event",
    "/create-task",
    "/add-venue",
    "/add-user",
    "/all-tasks",
    "/all-users",
  ];

  useEffect(() => {
    setShowDropdown(adminToolPaths.includes(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchData(
          "http://10.121.4.116:8000/accounts/me/"
        );
        const data = await userData.json();
        setIsAdmin(data.is_admin);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div
        id="docs-sidebar"
        className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0"
      >
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                  location.pathname === "/dashboard" ? "bg-gray-100" : ""
                }`}
                to="/dashboard"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Dashboard
              </Link>
            </li>
            {isAdmin && (
              <li>
                <button
                  type="button"
                  className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  Admin Tools
                  <svg
                    className={`hs-accordion-active:block ms-auto ${
                      showDropdown ? "block" : "hidden"
                    } size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                  <svg
                    className={`hs-accordion-active:hidden ms-auto ${
                      showDropdown ? "hidden" : "block"
                    } size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {showDropdown && (
                  <div
                    id="admin-tools-accordion-sub"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  >
                    <ul className="pt-2 ps-2">
                      <li>
                        <Link
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                            location.pathname === "/create-event"
                              ? "bg-gray-100"
                              : ""
                          }`}
                          to="/create-event"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 448 512"
                          >
                            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V256c0-13.3-10.7-24-24-24z" />
                          </svg>
                          Create Event
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                            location.pathname === "/create-task"
                              ? "bg-gray-100"
                              : ""
                          }`}
                          to="/create-task"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 512 512"
                          >
                            <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                          </svg>
                          Create Task
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                            location.pathname === "/add-venue"
                              ? "bg-gray-100"
                              : ""
                          }`}
                          to="/add-venue"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 384 512"
                          >
                            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                          </svg>
                          Add Venue
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                            location.pathname === "/add-user"
                              ? "bg-gray-100"
                              : ""
                          }`}
                          to="/add-user"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 640 512"
                          >
                            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                          </svg>
                          Add User
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                            location.pathname === "/all-tasks"
                              ? "bg-gray-100"
                              : ""
                          }`}
                          to="/all-tasks"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 512 512"
                          >
                            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z" />
                          </svg>
                          All Tasks
                        </Link>
                      </li>
                      <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                  location.pathname === "/all-users" ? "bg-gray-100" : ""
                }`}
                to="/all-users"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 640 512"
                >
                  <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                </svg>
                All Users
              </Link>
            </li>
                    </ul>
                  </div>
                )}
              </li>
            )}

            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                  location.pathname === "/tasks" ? "bg-gray-100" : ""
                }`}
                to="/tasks"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 384 512"
                >
                  <path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z" />
                </svg>
                Tasks
              </Link>
            </li>
            <li>
              <div
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowLogoutModal(true)}
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg md:p-5 text-center">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="w-12 h-12 mx-auto mb-4 text-gray-400"
            />
            <h2 className="text-md mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-center">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-200 border border-gray-400"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <Link to="/">
                <button
                  className="bg-sky-400 border border-gray-400 hover:bg-sky-700 active:bg-red-50 text-white px-4 py-2 rounded"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
