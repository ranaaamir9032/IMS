import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = (props) => {
  
  const {role} = useSelector((state) => state.userHandler);
  
  
  return (role === props.role ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  ));
};

export default ProtectedRoutes;
