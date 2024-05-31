import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import fetchData from "../../utils/api/fetchData";
import { Link } from "react-router-dom";

function DashboardLayout() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetchData(
          "http://www.localhost:8000/api/departments",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }

        const result = await response.json();

        setDepartments(result);
        setError(null);
      } catch (error) {
        setError(error.message);
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="h-[100vh] p-4 sm:ml-64">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {departments.map((department) => (
              <Link key={department.id} to={`/department/${department.id}`}>
                <div
                  key={department.id} // Assuming each department has a unique ID
                  className="flex items-center justify-center h-24  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <p className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">{department.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
 
    </>
  );
}

export default DashboardLayout;
