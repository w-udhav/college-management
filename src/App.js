import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRoute from "./Routes/AuthRoute";
import DashboardRoute from "./Routes/DashboardRoute";
import { useContext } from "react";
import { AuthContext } from "./Utils/Context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  function fetchUser() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoute />} />
      <Route path="/dashboard/*" element={<DashboardRoute user={user} />} />
      {user ? (
        <Route path="*" element={<Navigate to="/dashboard" />} />
      ) : (
        <Route path="*" element={<Navigate to="/auth/login" />} />
      )}
    </Routes>
  );
}

export default App;
