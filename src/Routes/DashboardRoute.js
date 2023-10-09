import React from "react";
import DashboardTemp from "../Components/DashboardTemp";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Students from "../Pages/Students/Students";

export default function DashboardRoute({ user }) {
  if (user === null) return <Navigate to="/auth/login" />;
  return (
    <DashboardTemp>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </DashboardTemp>
  );
}
