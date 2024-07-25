import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import fetchData from "../../utils/api/fetchData";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faMountainSun, faScrewdriverWrench, faStethoscope, faStore, faUserTie, faVolleyball } from "@fortawesome/free-solid-svg-icons"; // Make sure this line is included
import { faTruck } from "@fortawesome/free-solid-svg-icons"; // Add this line
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons"; // Add this line
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

function DashboardLayout() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetchData(
          "http://10.121.4.116:8000/api/departments",
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

  const renderIconAndParagraph = (departmentName) => {
    if (departmentName === "Administration") {
      return (
        <>
          <FontAwesomeIcon
            icon={faUserTie}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Admin
          </h5>
        </>
      );
    } else if (departmentName === "Transportation") {
      return (
        <>
          <FontAwesomeIcon
            icon={faTruck}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Transportation
          </h5>
        </>
      );
    } else if (departmentName === "Canteen") {
      return (
        <>
          <FontAwesomeIcon
            icon={faKitchenSet}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Canteen
          </h5>
        </>
      );
    } else if (departmentName === "Security") {
      return (
        <>
          <FontAwesomeIcon
            icon={faShieldHalved}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Security
          </h5>
        </>
      );
    } else if (departmentName === "IT") {
      return (
        <>
          <FontAwesomeIcon
            icon={faComputer}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            IT
          </h5>
        </>
      );
    } else if (departmentName === "Maintenance") {
      return (
        <>
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Maintenance
          </h5>
        </>
      );
    } else if (departmentName === "Housekeeping") {
      return (
        <>
          <FontAwesomeIcon
            icon={faHouseUser}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Housekeeping
          </h5>
        </>
      );
    } else if (departmentName === "Landscaping") {
      return (
        <>
          <FontAwesomeIcon
            icon={faMountainSun}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Landscaping
          </h5>
        </>
      );
    } else if (departmentName === "Medical") {
      return (
        <>
          <FontAwesomeIcon
            icon={faStethoscope}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Medical
          </h5>
        </>
      );
    } else if (departmentName === "Sports Facilities") {
      return (
        <>
           <FontAwesomeIcon
            icon={faVolleyball}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Sports Facilities
          </h5>
        </>
      );
    } else if (departmentName === "MMD") {
      return (
        <>
          <FontAwesomeIcon
            icon={faStore}
            className="w-12 h-12 mb-4 text-gray-900"
          />
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            MMD
          </h5>
        </>
      );
    }
  };

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {departments.map((department) => (
            <Link key={department.id} to={`/department/${department.id}`}>
              <div
                key={department.id}
                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl"
              >
                <div className="p-6">
                  {renderIconAndParagraph(department.name)}
                </div>
                <div className="p-6 pt-0"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
