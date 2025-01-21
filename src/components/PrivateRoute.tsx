import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

interface PrivateRouteProps {
  requiredRole?: string; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole }) => {
  const { token, userType } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userType !== requiredRole) {
    return <Navigate to="/access-denied" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
