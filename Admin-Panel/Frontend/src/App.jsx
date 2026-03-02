import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/auth/Landing.jsx";
import Signin from "./pages/auth/Signin.jsx";
import VerifyOtp from "./pages/auth/VerifyOtp.jsx";

// Layout
import AdminLayout from "./layout/AdminLayout";

// Admin Pages
import Dashboard from "./pages/admin/dashboard";
import Settings from "./pages/admin/Settings.jsx";
import DonorsPage from "./pages/admin/Donors.jsx";
import InventoryPage from "./pages/admin/Inventory.jsx";
import HospitalsPage from "./pages/admin/Hospital.jsx";
import EmergencyDashboard from "./pages/admin/Emergency.jsx";

// Hospital Pages
import HospitalDashboard from "./pages/hospital/Dashboard.jsx";
import HospitalNavbar from "./layout/HospitalLayout.jsx";
import MyRequestsPage from "./pages/hospital/RequestPage.jsx";
import RequestBloodPage from "./pages/hospital/RequestForm.jsx";
import HospitalProfile from "./pages/hospital/Profile.jsx";

// Donors Pages
import DonorDashboard from "./pages/donors/dashboard.jsx";
import DonorLayout from "./layout/DonorsLayout.jsx";
import DonorAvailability from "./pages/donors/available.jsx";
import DonationHistory from "./pages/donors/History.jsx";
import DonorProfile from "./pages/donors/profile.jsx";
import DonorRegistration from "./pages/donors/register.jsx";
import DonorOnboarding from "./pages/auth/donorpage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/donor-page" element={<DonorOnboarding />} />

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="donors" element={<DonorsPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="hospitals" element={<HospitalsPage />} />
          <Route path="emergency" element={<EmergencyDashboard />} />
          <Route path="settings" element={<Settings />} />{" "}
        </Route>

        {/* Hospital Layout */}
        <Route path="/hospital" element={<HospitalNavbar />}>
          <Route path="dashboard" element={<HospitalDashboard />} />{" "}
          <Route path="request-blood" element={<RequestBloodPage />} />{" "}
          <Route path="my-requests" element={<MyRequestsPage />} />{" "}
          <Route path="profile" element={<HospitalProfile />} />{" "}
        </Route>

        {/* Donors Layout*/}
        <Route path="/donor" element={<DonorLayout />}>
          <Route path="dashboard" element={<DonorDashboard />} />{" "}
          <Route path="history" element={<DonationHistory />} />{" "}
          <Route path="availability" element={<DonorAvailability />} />{" "}
          <Route path="registration" element={<DonorRegistration />} />{" "}
          <Route path="profile" element={<DonorProfile />} />{" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
