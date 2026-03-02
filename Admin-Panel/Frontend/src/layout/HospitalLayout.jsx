import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  UserCircle,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Activity,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import ThemeToggle from '../utils/ThemeToggle';

export default function HospitalLayout() {
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
          {/* Hospital Branding */}
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#B354A6] rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-[#B354A6]/20">
              <Activity size={22} strokeWidth={3} />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col animate-in fade-in slide-in-from-left-2">
                <span className="text-xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">HemoHub</span>
                <span className="text-[9px] font-black text-[#B354A6] uppercase tracking-[0.2em] mt-1">Hospital Node</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/hospital/dashboard" isOpen={isSidebarOpen} />
            
            <NavItem
              icon={<PlusCircle size={20} />}
              label="Request Blood"
              to="/hospital/request-blood"
              isOpen={isSidebarOpen}
              isAction
            />

            <NavItem icon={<ClipboardList size={20} />} label="My Requests" to="/hospital/my-requests" isOpen={isSidebarOpen} />

            <div className="my-6 border-t border-slate-50 dark:border-slate-800 mx-4"></div>

            <NavItem icon={<UserCircle size={20} />} label="Profile" to="/hospital/profile" isOpen={isSidebarOpen} />
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-slate-50 dark:border-slate-800">
            <button className="flex items-center gap-4 w-full p-3 text-slate-400 hover:text-rose-500 transition-all text-xs font-black uppercase tracking-widest group">
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              {isSidebarOpen && "Sign Out"}
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

              <div className="relative hidden lg:block group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6] transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Scan requests or inventory..."
                  className="pl-12 pr-6 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-xs font-bold w-72 focus:ring-2 focus:ring-[#B354A6]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 border-r border-slate-100 dark:border-slate-800 pr-6">
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                <button className="relative p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-[#B354A6] rounded-xl transition-all">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#B354A6] rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>
              </div>

              {/* Hospital Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">City General</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-1">
                    <ShieldCheck size={10} /> Authorized Node
                  </p>
                </div>
                <div className="w-11 h-11 bg-slate-900 dark:bg-[#B354A6] text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg shadow-slate-200 dark:shadow-none transition-all hover:scale-105 cursor-pointer italic">
                  CH
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8 bg-[#FDF8FC]/50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, to, isOpen, isAction }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 p-3.5 rounded-2xl transition-all text-xs font-black uppercase tracking-widest group
        ${
          isActive
            ? "bg-[#B354A6] text-white shadow-lg shadow-[#B354A6]/20"
            : isAction
            ? "text-[#B354A6] bg-[#B354A6]/5 border border-[#B354A6]/10 hover:bg-[#B354A6]/10"
            : "text-slate-400 hover:bg-[#B354A6]/5 hover:text-[#B354A6] dark:hover:bg-slate-800"
        }`
      }
    >
      <span className={`${!isOpen && "mx-auto"} group-hover:rotate-6 transition-transform`}>
        {icon}
      </span>
      {isOpen && <span>{label}</span>}
      {isOpen && (
        <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </NavLink>
  );
}