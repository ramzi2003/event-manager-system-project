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
        console.log(result);
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
      <div className="p-4 sm:ml-64 bg-slate-50">
        <div className="p-4  border-gray-200 rounded-lg dark:border-gray-700 ">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {departments.map((department) => (
              <Link
                to={`/department/${department.name}`}
              >
                <div
                  key={department.id} // Assuming each department has a unique ID
                  className="flex items-center justify-center h-24 rounded-2xl bg-gray-50 dark:bg-gray-800"
                >
                  <p className="text-xl text-white ">{department.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
}

export default DashboardLayout;
