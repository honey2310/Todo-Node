import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from 'react'
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VerifyOtp from "./pages/OtpVerify";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ViewBlog from "./pages/ViewBlog";
import GuestHome from './pages/Blogs'
import Landing from "./pages/Landing";
import GuestBlogView from "./pages/GuestBlogView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<GuestHome />} />
        <Route path="/guest/view/:id" element={<GuestBlogView />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <ViewBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<p className="text-center mt-20">Page Not Found</p>}
        />
      </Routes>
    </Router>
  );
}

export default App;
