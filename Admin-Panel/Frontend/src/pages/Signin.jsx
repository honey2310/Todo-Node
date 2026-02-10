import { useState } from "react";
import axios from "axios";
import { base_url } from "../utils/global_var";
import { useNavigate } from "react-router-dom";
import React from 'react';

const AuthCard = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignin = async () => {
    try {
      const { email, password } = form;
      const res = await axios.post(`${base_url}/auth/signin`, { email, password });
      alert(res.data.message);
      navigate("/verify-otp", { state: { email } }); // Pass as object for better practice
    } catch (error) {
      alert(error.response?.data?.message || "Signin failed");
    }
  };

  const handleSignup = async () => {
    try {
      const { name, email, password } = form;
      const res = await axios.post(`${base_url}/auth/signup`, {
        name,
        email,
        password,
      });
      alert(res.data.message);
      // Reset form and toggle to Sign In
      setForm({ name: "", email: "", password: "" });
      setIsSignup(false);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative w-full max-w-4xl h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* SLIDING PANEL (OVERLAY) */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-gradient-to-br from-[#0F2854] to-[#1C4D8D] text-white p-10 transition-transform duration-700 ease-in-out z-20 flex flex-col justify-center items-center text-center
          ${isSignup ? "translate-x-0" : "translate-x-full"}`}
        >
          <h2 className="text-3xl font-semibold">
            {isSignup ? "Hello, Admin 👋" : "Welcome Back!"}
          </h2>
          <p className="text-sm mt-4 text-[#BDE8F5] max-w-xs">
            {isSignup
              ? "Already have an account? Sign in to manage your dashboard."
              : "New here? Create an account to access the admin dashboard."}
          </p>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="mt-8 border border-white px-8 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-[#0F2854] transition"
          >
            {isSignup ? "Sign In" : "Create Account"}
          </button>
        </div>

        {/* FORMS CONTAINER */}
        <div className="relative grid grid-cols-2 h-full w-full">
          
          {/* SIGN IN FORM (Always on Left) */}
          <div className={`p-10 flex flex-col justify-center transition-all duration-700 ${isSignup ? "opacity-0 invisible" : "opacity-100 visible"}`}>
            <h2 className="text-2xl font-semibold text-[#0F2854] mb-2">Sign In</h2>
            <p className="text-sm text-gray-500 mb-6">Enter your credentials</p>
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="Email"
              className="border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-[#0F2854]"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              value={form.password}
              placeholder="Password"
              className="border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-[#0F2854]"
              onChange={handleChange}
            />
            <button onClick={handleSignin} className="bg-[#0F2854] text-white py-2 rounded-lg mt-4 hover:bg-[#1C4D8D] transition">
              Sign In
            </button>
          </div>

          {/* SIGN UP FORM (Always on Right) */}
          <div className={`p-10 flex flex-col justify-center transition-all duration-700 ${isSignup ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <h2 className="text-2xl font-semibold text-[#0F2854] mb-2">Create Account</h2>
            <p className="text-sm text-gray-500 mb-6">Register to get started</p>
            <input
              name="name"
              value={form.name}
              placeholder="Full Name"
              className="border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-[#0F2854]"
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="Email"
              className="border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-[#0F2854]"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              value={form.password}
              placeholder="Password"
              className="border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-[#0F2854]"
              onChange={handleChange}
            />
            <button onClick={handleSignup} className="bg-[#0F2854] text-white py-2 rounded-lg mt-4 hover:bg-[#1C4D8D] transition">
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthCard;