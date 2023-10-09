import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";

export default function AuthRoute({ user }) {
  return !user ? (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  ) : (
    <Navigate to="/dashboard" />
  );
}
