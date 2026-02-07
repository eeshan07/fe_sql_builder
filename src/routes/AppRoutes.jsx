import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import SavedQueriesPage from "../pages/Dashboard/SavedQueriesPage";
import CreateQueryPage from "../pages/Dashboard/CreateQueryPage";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/app"
        element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="saved" />} />
        <Route path="saved" element={<SavedQueriesPage />} />
        <Route path="create" element={<CreateQueryPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
