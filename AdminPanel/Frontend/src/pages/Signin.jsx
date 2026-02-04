import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base_url } from "../utils/global_var";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    const user = { email, password };
    try {
      const res = await axios.post(`${base_url}/auth/signin`, user);
      alert(res.data.message);
      navigate("/verify-otp", { state: email });
    } catch (err) {
      alert(res.data.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Toggle Buttons */}
      <div className="mb-5">
        <div className="flex bg-white rounded-full p-1 shadow-sm">
          <Link
            to="/signup"
            className="px-6 py-1.5 rounded-full text-sm font-medium text-gray-600"
          >
            Sign Up
          </Link>
          <Link
            to="/"
            className="px-6 py-1.5 rounded-full text-sm font-medium bg-[#1C4D8D] text-white"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="relative bg-[#0F2854] text-white p-12 flex flex-col justify-center min-h-[420px]">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#4988C4] rounded-bl-full opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1C4D8D] rounded-tr-full opacity-30"></div>

          <h1 className="text-3xl font-semibold z-10">Admin Panel</h1>
          <p className="text-sm mt-3 text-[#BDE8F5] z-10 max-w-xs">
            Secure access to manage your system.
          </p>
        </div>

        {/* Right Section */}
        {/* Right Section */}
        <div className="p-12 flex flex-col justify-center min-h-[420px]">
          <h2 className="text-2xl font-semibold text-[#0F2854] mb-2">
            Sign In
          </h2>

          {/* NICE MESSAGE */}
          <p className="text-sm text-gray-500 mb-8">
            Please enter your credentials to continue.
          </p>

          <form className="space-y-6">
            <input
              type="email"
              value={email}
              placeholder="Email address"
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#4988C4]"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#4988C4]"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="w-full bg-[#1C4D8D] hover:bg-[#0F2854] text-white py-2.5 rounded-lg font-medium transition"
              onClick={handleSignIn}
            >
              Sign In
            </button>

            {/* BUTTON NICE MESSAGE */}
            <p className="text-xs text-center text-gray-400">
              Your information is securely encrypted.
            </p>
          </form>

          <p className="text-sm text-center text-gray-500 mt-8">
            New here?{" "}
            <Link to="/signup" className="text-[#1C4D8D] font-medium">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
