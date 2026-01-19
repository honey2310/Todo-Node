import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import React from "react";

export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/api/auth/signin", form);
      // Pass the email to the next page so the user doesn't have to type it again
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Signin failed");
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
          {/* LEFT FORM */}
          <div className="p-12">
            <h3 className="text-3xl font-bold text-[#4A4947] mb-8">
              Welcome back
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

          {/* RIGHT STORY */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-[#D8D2C2]">
            <h2 className="text-4xl font-bold text-[#4A4947] mb-4">
              Secure & personal
            </h2>
            <p className="text-[#4A4947] opacity-80 leading-relaxed">
              Your space to manage blogs, upload images, and write freely with
              cookie-based authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
