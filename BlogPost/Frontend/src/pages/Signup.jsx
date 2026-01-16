import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import Toast from "./Toast";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/signup",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        { withCredentials: true } // ⭐ important for cookies
      );
      setToast({ message: "Signup successful", type: "success" });
      setTimeout(() => navigate("/signin"), 1200);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Signup failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4">
      <div className="relative max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* Decorative strip */}
        <div className="absolute top-0 left-0 h-full w-3 bg-[#B17457]" />

        <div className="grid md:grid-cols-2">
          {/* Left Info Panel */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-[#D8D2C2]">
            <h2 className="text-4xl font-bold text-[#4A4947] mb-4">
              Start your writing journey
            </h2>
            <p className="text-[#4A4947] opacity-80 leading-relaxed">
              Create your account and join a community of thinkers, writers, and
              readers who believe in meaningful content.
            </p>
          </div>

          {/* Right Form Panel */}
          <div className="p-12">
            <h3 className="text-3xl font-bold text-[#4A4947] mb-8">
              Create Account
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#B17457]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#B17457]"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#B17457]"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#B17457] text-white rounded-full shadow-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-sm text-[#4A4947] mt-8">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="text-[#B17457] font-semibold cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      </div>
    </div>
  );
}
