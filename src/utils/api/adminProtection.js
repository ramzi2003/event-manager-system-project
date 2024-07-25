import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import fetchData from "./fetchData";
import LoadingPage from "../../components/loadingPage";

const AdminProtection = ({ children, adminOnly }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetchData(
          "http://10.121.4.116:8000/accounts/me/"
        );
        const data = await response.json();
        setIsAuthenticated(true);
        setIsAdmin(data.is_admin);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminProtection;
