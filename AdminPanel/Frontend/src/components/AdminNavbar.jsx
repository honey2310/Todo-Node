import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  // Menu items
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Jobs", path: "/admin/jobs" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <header className="fixed top-4 left-4 right-4 z-50 rounded-xl bg-gradient-to-r from-[#0F2854]/90 to-[#1C4D8D]/90 backdrop-blur-lg shadow-2xl">
      <div className="flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <h1 className="text-[#BDE8F5] font-bold text-xl tracking-wide">
          HireHub Admin
        </h1>

        {/* Nav Links */}
        <nav className="flex gap-8 text-[#BDE8F5] font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative px-2 py-1 hover:text-white transition-colors duration-200"
            >
              {item.name}
              {/* Active link underline */}
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#4988C4] rounded-full animate-pulse"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 bg-[#BDE8F5]/20 px-3 py-1 rounded-full hover:bg-[#BDE8F5]/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#BDE8F5] text-[#0F2854] flex items-center justify-center font-bold">
              A
            </div>
            <span className="text-[#BDE8F5] font-medium">Admin ▼</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#0F2854]/90 backdrop-blur-lg rounded-lg shadow-lg py-2 flex flex-col">
              <Link
                to="/admin/profile"
                className="px-4 py-2 hover:bg-[#4988C4]/30 transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/"
                className="px-4 py-2 hover:bg-[#4988C4]/30 transition-colors"
              >
                Logout
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
