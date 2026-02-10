import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/global_var.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${base_url}/auth/signup`, {
        name,
        email,
        password,
      });
      alert(res.data.message);
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden animate-fadeSlide">

        {/* LEFT */}
        <div className="relative bg-gradient-to-br from-[#0F2854] to-[#1C4D8D] text-white p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold">Create Account</h1>
          <p className="text-sm mt-3 text-[#BDE8F5] max-w-xs">
            Get started with your admin dashboard in seconds.
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-[#0F2854]">
            Sign Up
          </h2>

          <p className="text-sm text-gray-500 mb-8">
            Fill in your details below
          </p>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#4988C4]/30 focus:border-[#4988C4] transition"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#4988C4]/30 focus:border-[#4988C4] transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#4988C4]/30 focus:border-[#4988C4] transition"
            />

            <button
              onClick={handleSignUp}
              className="w-full bg-[#1C4D8D] hover:bg-[#0F2854] active:scale-[0.98] transition text-white py-2.5 rounded-lg font-medium"
            >
              Sign Up
            </button>

            <p className="text-xs text-center text-gray-400">
              Your data is safe and encrypted
            </p>
          </div>

          <p className="text-sm text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <Link to="/" className="text-[#1C4D8D] font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
