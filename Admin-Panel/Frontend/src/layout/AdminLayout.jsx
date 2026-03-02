import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Droplet,
  Building2,
  AlertTriangle,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Activity,
  ChevronRight,
} from "lucide-react";
import ThemeToggle from "../utils/ThemeToggle";
import axios from "axios";
import { base_url } from "../utils/global_var";
import { useEffect } from "react";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${base_url}/admin/get-currentUser`, {
        withCredentials: true,
      });

      if (res.data.status) {
        setCurrentUser(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${base_url}/auth/logout`,
        {},
        { withCredentials: true },
      );

      window.location.href = "/signin";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-[#FDF8FC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* SIDEBAR */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-24"
          } bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-all duration-500 flex flex-col z-30`}
        >
          {/* Logo Section */}
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#B354A6] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#B354A6]/20 shrink-0">
              <Droplet size={22} fill="currentColor" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col animate-in fade-in slide-in-from-left-2">
                <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                  HemoHub
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#B354A6] mt-1">
                  Admin Panel
                </span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 pt-4">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              to="/admin/dashboard"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={<Users size={20} />}
              label="Donors"
              to="/admin/donors"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={<Droplet size={20} />}
              label="Inventory"
              to="/admin/inventory"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={<Building2 size={20} />}
              label="Hospitals"
              to="/admin/hospitals"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={<AlertTriangle size={20} />}
              label="Emergency"
              to="/admin/emergency"
              isOpen={isSidebarOpen}
            />

            <div className="my-6 border-t border-slate-50 dark:border-slate-800 mx-4"></div>

            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              to="/admin/settings"
              isOpen={isSidebarOpen}
            />
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-slate-50 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 w-full p-3 text-slate-400 hover:text-rose-500 transition-all text-xs font-black uppercase tracking-widest group"
            >
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

              <div className="relative hidden lg:block">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Universal search..."
                  className="pl-12 pr-6 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-xs font-medium w-72 focus:ring-2 focus:ring-[#B354A6]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 pr-6 border-r border-slate-100 dark:border-slate-800">
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                <button className="relative p-2.5 text-slate-400 hover:text-[#B354A6] bg-slate-50 dark:bg-slate-800 rounded-xl transition-all">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#B354A6] rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>
              </div>

              {/* Admin Identity */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    {currentUser?.name || "Admin"}
                  </p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-1">
                    <Activity size={10} /> Online
                  </p>
                </div>
                <div className="w-11 h-11 bg-slate-900 dark:bg-[#B354A6] text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg shadow-slate-200 dark:shadow-none transition-all hover:scale-105 cursor-pointer">
                  {currentUser?.name
                    ? currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "AD"}
                </div>
              </div>
            </div>
          </header>

          {/* DYNAMIC PAGE RENDERER */}
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
        className={`${!isOpen && "mx-auto"} transition-transform group-hover:scale-110`}
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
