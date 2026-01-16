import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import Toast from "./Toast";

export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/signin",
        { email: form.email, password: form.password },
        { withCredentials: true }
      );

      if (res.data.message !== "User Signin Successfully") {
        setToast({ message: res.data.message, type: "error" });
        return;
      }

      // Send OTP
      await axios.post(
        "http://localhost:4000/send",
        { email: form.email },
        { withCredentials: true }
      );

      setToast({ message: "OTP sent to your email", type: "success" });

      setTimeout(() => {
        navigate("/verify", { state: { email: form.email } });
      }, 1200);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Signin failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4">
      <div className="relative max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-3 bg-[#B17457]" />

        <div className="grid md:grid-cols-2">
          {/* Form */}
          <div className="p-12">
            <h3 className="text-3xl font-bold text-[#4A4947] mb-8">
              Welcome Back
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-[#4A4947] mt-8">
              New here?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-[#B17457] font-semibold cursor-pointer"
              >
                Create an account
              </span>
            </p>
          </div>

          {/* Info */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-[#D8D2C2]">
            <h2 className="text-4xl font-bold text-[#4A4947] mb-4">
              Secure & Personal
            </h2>
            <p className="text-[#4A4947] opacity-80 leading-relaxed">
              Your space to manage blogs, upload images, and write freely with
              cookie-based authentication.
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
