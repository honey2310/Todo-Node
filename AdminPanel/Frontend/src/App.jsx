import "./App.css";
import React from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Route, Routes } from "react-router-dom";
import VerifyOtp from "./pages/VerifyOtp";
import AdminLayout from "./layouts/AdminLayout";
import ChangePasswordModal from "./pages/ChangePassword";
import Dashboard from "./pages/admin/Dashboard";
import Jobs from "./pages/admin/Jobs";
import Categories from "./pages/admin/Category";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Setting";
import Profile from "./pages/admin/Profile";

function App() {
  return (
    <>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/change-password" element={<ChangePasswordModal />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <AdminLayout>
              <Jobs />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminLayout>
              <Categories />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminLayout>
              <Reports />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <Settings />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminLayout>
              <Profile />
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
