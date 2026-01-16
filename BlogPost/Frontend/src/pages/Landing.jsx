import { useNavigate } from "react-router-dom";
import React from 'react'

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-8">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <span className="text-sm tracking-widest text-[#B17457] font-semibold mb-4">
            WRITE • READ • INSPIRE
          </span>

          <h1 className="text-5xl font-bold text-[#4A4947] leading-tight mb-6">
            A modern platform to <br />
            <span className="text-[#B17457]">share your thoughts</span>
          </h1>

          <p className="text-[#4A4947] opacity-80 mb-8 max-w-md">
            Explore meaningful blogs as a guest or sign in to publish, manage,
            and grow your own stories with ease.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/blogs")}
              className="px-6 py-3 border-2 border-[#4A4947] text-[#4A4947] rounded-full hover:bg-[#4A4947] hover:text-[#FAF7F0] transition"
            >
              Explore as Guest
            </button>

            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 bg-[#B17457] text-white rounded-full hover:opacity-90 transition shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* RIGHT DESIGN BLOCK */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full h-[420px]">
            <div className="absolute inset-0 bg-[#D8D2C2] rounded-3xl rotate-3"></div>
            <div className="absolute inset-0 bg-white rounded-3xl -rotate-3 shadow-xl flex flex-col justify-center items-center p-8">
              <h3 className="text-2xl font-semibold text-[#4A4947] mb-4">
                Why this platform?
              </h3>
              <ul className="space-y-3 text-[#4A4947] opacity-80 text-left">
                <li>✍️ Create & manage blogs</li>
                <li>🔐 Secure cookie-based auth</li>
                <li>🖼 Upload images easily</li>
                <li>📖 Read without login</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
