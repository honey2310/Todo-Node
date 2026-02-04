import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/global_var.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const user = { name, email, password };
    try {
      const res = await axios.post(`${base_url}/auth/signup`, user);
      alert(res.data.message);
      navigate("/");
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
            className="px-6 py-1.5 rounded-full text-sm font-medium bg-[#1C4D8D] text-white"
          >
            Sign Up
          </Link>
          <Link
            to="/"
            className="px-6 py-1.5 rounded-full text-sm font-medium text-gray-600"
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

          <h1 className="text-3xl font-semibold z-10">Welcome to AdminX</h1>
          <p className="text-sm mt-3 text-[#BDE8F5] max-w-xs z-10">
            Create your account to get started with the admin dashboard.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-12 flex flex-col justify-center min-h-[420px]">
          <h2 className="text-2xl font-semibold text-[#0F2854] mb-2">
            Create Account
          </h2>

          {/* NICE MESSAGE */}
          <p className="text-sm text-gray-500 mb-8">
            Fill in the details below to create your account.
          </p>

          <form className="space-y-6">
            <input
              type="text"
              value={name}
              placeholder="Full name"
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#4988C4]"
              onChange={(e) => setName(e.target.value)}
            />

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
              onClick={handleSignUp}
              className="w-full bg-[#1C4D8D] hover:bg-[#0F2854] text-white py-2.5 rounded-lg font-medium transition"
            >
              Sign Up
            </button>

            {/* TRUST MESSAGE */}
            <p className="text-xs text-center text-gray-400">
              We respect your privacy and keep your data secure.
            </p>
          </form>

          <p className="text-sm text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <Link to="/" className="text-[#1C4D8D] font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
