import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import React from 'react'
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/admin/dashboard";
import DataManagement from "./pages/admin/dataManage";
import UserRoles from "./pages/admin/role";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/complaints" element={<DataManagement />} />
        <Route path="/admin/roles" element={<UserRoles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
