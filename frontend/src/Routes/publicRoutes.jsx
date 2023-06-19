import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  const {token, role} = useSelector((state) => state.userHandler);
  const to = role === 'superadmin' ? '/dashboard' : role === 'admin' ? 'adminDashboard' : 'employeeDashboard'

  return token ? <Navigate to={to} /> : <Outlet/>
};

export default PublicRoutes;