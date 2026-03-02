import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  MapPin,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  Droplet,
  Award,
  ChevronRight,
  Activity,
  ShieldCheck
} from "lucide-react";
import ThemeToggle from "../utils/ThemeToggle";

export default function DonorLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-[#FDF8FC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* SIDEBAR */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-24"
          } bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-all duration-500 flex flex-col z-30`}
        >
          {/* Logo / Branding */}
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#B354A6] rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-[#B354A6]/20">
              <Droplet size={22} fill="currentColor" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col animate-in fade-in slide-in-from-left-2">
                <span className="text-xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
                  HemoHub
                </span>
                <span className="text-[9px] font-black text-[#B354A6] uppercase tracking-[0.2em] mt-1">
                  Donor Node
                </span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              to="/donor/dashboard"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={<History size={20} />}
              label="My Donations"
              to="/donor/history"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={<MapPin size={20} />}
              label="Find Camps"
              to="/donor/availability"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={<ShieldCheck size={20} className="text-[#B354A6]" />}
              label="Donor Registry"
              to="/donor/registration"
              isOpen={isSidebarOpen}
              highlight={true}
            />
            <div className="my-6 border-t border-slate-50 dark:border-slate-800 mx-4"></div>

            <NavItem
              icon={<User size={20} />}
              label="My Profile"
              to="/donor/profile"
              isOpen={isSidebarOpen}
            />
          </nav>

          {/* Gamification Card */}
          {isSidebarOpen && (
            <div className="mx-4 mb-6 p-5 bg-[#B354A6]/5 dark:bg-[#B354A6]/10 rounded-[2rem] border border-[#B354A6]/10 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 text-[#B354A6]/10 group-hover:scale-110 transition-transform">
                <Award size={80} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-[#B354A6]" size={16} />
                  <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-widest">
                    Silver Status
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                  2 more donations to reach{" "}
                  <span className="text-[#B354A6]">Gold</span>.
                </p>
              </div>
            </div>
          )}

          {/* Logout */}
          <div className="p-6 border-t border-slate-50 dark:border-slate-800">
            <button className="flex items-center gap-4 w-full p-3 text-slate-400 hover:text-rose-500 transition-all text-xs font-black uppercase tracking-widest group">
              <LogOut
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              {isSidebarOpen && "Logout"}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* TOPBAR */}
          <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 transition-all">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-[#B354A6] rounded-xl transition-all"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              {isSidebarOpen && (
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest hidden md:block italic">
                  Hi, Rahul! Ready to save lives?
                </span>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 border-r border-slate-100 dark:border-slate-800 pr-6">
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                <button className="relative p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-[#B354A6] rounded-xl transition-all">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#B354A6] rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>
              </div>

              {/* Donor Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">
                    O+ Positive
                  </p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-1">
                    <Activity size={10} /> Fully Eligible
                  </p>
                </div>
                <img
                  src="https://i.pravatar.cc/150?u=rahul"
                  className="w-11 h-11 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-lg shadow-slate-200 dark:shadow-none"
                  alt="profile"
                />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8 bg-[#FDF8FC]/50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, to, isOpen }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 p-3.5 rounded-2xl transition-all text-xs font-black uppercase tracking-widest group
        ${
          isActive
            ? "bg-[#B354A6] text-white shadow-lg shadow-[#B354A6]/20"
            : "text-slate-400 hover:bg-[#B354A6]/5 hover:text-[#B354A6] dark:hover:bg-slate-800"
        }`
      }
    >
      <span
        className={`${!isOpen && "mx-auto"} transition-transform group-hover:rotate-6`}
      >
        {icon}
      </span>
      {isOpen && <span>{label}</span>}
      {isOpen && (
        <ChevronRight
          size={14}
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </NavLink>
  );
}
