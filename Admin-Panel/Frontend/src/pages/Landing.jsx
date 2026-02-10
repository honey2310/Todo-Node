import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react'
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: "url('https://media.istockphoto.com/id/2217628459/photo/empty-blank-plain-bright-dark-gray-black-colored-textured-chart-paper-horizontal-backgrounds.webp?a=1&b=1&s=612x612&w=0&k=20&c=j9MiG01kLr8Dy5Nose6d395l1qoeXLbPyJmVgjqkxBg=')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#222831]/85"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fadeUp">
        {/* Logo */}
        <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-[#948979] text-[#222831] flex items-center justify-center text-xl font-bold shadow-md">
          RX
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold text-[#DFD0B8] tracking-wide">
          ResolveX
        </h1>

        {/* Tagline */}
        <p className="mt-3 text-[#DFD0B8]/70 text-sm md:text-base max-w-md mx-auto">
          Centralized platform to manage, track, and resolve service complaints efficiently
        </p>

        {/* Progress Bar */}
        <div className="mt-10 w-52 mx-auto h-1 bg-[#393E46] rounded-full overflow-hidden">
          <div className="h-full bg-[#948979] animate-loader"></div>
        </div>

        <p className="mt-4 text-xs text-[#DFD0B8]/60 tracking-widest">
          Initializing system...
        </p>
      </div>
    </div>
  );
};

export default Landing;
