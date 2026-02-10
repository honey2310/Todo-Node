import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { 
  ShieldCheck, AlertCircle, Clock, CheckCircle, 
  Filter, Search, UserPlus, Settings, LayoutDashboard, 
  MessageSquare, Users, Trash2, Edit3, MoreHorizontal
} from "lucide-react";

const COLORS = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6"]; // Red, Amber, Emerald, Blue

export default function CMSDashboard() {
  // Mock Data for Categories
  const categoryData = [
    { name: "Technical", value: 45 },
    { name: "Account", value: 25 },
    { name: "Facility", value: 20 },
    { name: "Others", value: 10 },
  ];

  const complaints = [
    { id: "CMP-1024", user: "John Doe", category: "Technical", priority: "High", status: "Pending", date: "2 mins ago" },
    { id: "CMP-1025", user: "Jane Smith", category: "Account", priority: "Medium", status: "In Progress", date: "1 hour ago" },
    { id: "CMP-1026", user: "Mike Ross", category: "Facility", priority: "Low", status: "Resolved", date: "5 hours ago" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* SIDEBAR - ROLE CONTROL SECTION */}
      <aside className="w-64 bg-[#0F2854] text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10 flex items-center gap-2">
          <ShieldCheck className="text-[#BDE8F5]" />
          <span className="text-xl font-bold tracking-tight">IT-HelpDesk</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] uppercase text-gray-400 font-bold px-3 mb-2">Main Menu</p>
          <NavItem icon={<LayoutDashboard size={18}/>} label="Command Center" active />
          <NavItem icon={<MessageSquare size={18}/>} label="View Complaints" />
          <NavItem icon={<Users size={18}/>} label="User Management" />
          
          <p className="text-[10px] uppercase text-gray-400 font-bold px-3 mt-6 mb-2">System Control</p>
          <NavItem icon={<Settings size={18}/>} label="Departments" />
          <NavItem icon={<ShieldCheck size={18}/>} label="Roles & Permissions" />
        </nav>

        <div className="p-4 bg-white/5 m-4 rounded-xl">
          <p className="text-xs text-gray-400">Logged in as</p>
          <p className="text-sm font-bold">Admin Authority</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-x-hidden">
        {/* TOP BAR - SEARCH & QUICK ACTIONS */}
        <header className="bg-white h-16 border-b px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-96">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Search by Ticket ID or User..." className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2" />
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#0F2854] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1C4D8D] transition">
              <UserPlus size={16} /> Assign Staff
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* WORKFLOW STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Filed" value="248" icon={<MessageSquare />} color="text-blue-600" bg="bg-blue-50" />
            <StatCard title="Pending" value="42" icon={<Clock />} color="text-red-600" bg="bg-red-50" />
            <StatCard title="In Progress" value="18" icon={<AlertCircle />} color="text-amber-600" bg="bg-amber-50" />
            <StatCard title="Resolved" value="188" icon={<CheckCircle />} color="text-emerald-600" bg="bg-emerald-50" />
          </div>

          {/* DATA VISUALIZATION SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* COMPLAINT TRENDS */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#0F2854]">Monthly Stats</h3>
                <span className="text-xs text-gray-400">SLA: 94.2% Resolution Rate</span>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={[{m:'Jan', v:40}, {m:'Feb', v:30}, {m:'Mar', v:65}, {m:'Apr', v:45}, {m:'May', v:80}]}>
                  <XAxis dataKey="m" hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="v" stroke="#0F2854" fill="#BDE8F5" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* CATEGORY DISTRIBUTION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0F2854] mb-4">By Department</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={categoryData} innerRadius={60} outerRadius={80} dataKey="value">
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                    {c.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT COMPLAINTS TABLE (Data Management) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-[#0F2854]">Live Complaint Feed</h3>
              <div className="flex gap-2">
                <button className="p-2 border rounded-lg hover:bg-gray-50"><Filter size={16}/></button>
              </div>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-400 font-bold uppercase">
                <tr>
                  <th className="px-6 py-4 text-left">Ticket ID</th>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Priority</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {complaints.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition">
                    <td className="px-6 py-4 font-mono font-bold text-[#1C4D8D]">{item.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{item.user}</p>
                      <p className="text-[10px] text-gray-400">{item.date}</p>
                    </td>
                    <td className="px-6 py-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{item.category}</span></td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${item.priority === 'High' ? 'text-red-500' : 'text-gray-500'}`}>
                        ● {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select className="bg-white border text-xs rounded-md px-2 py-1 focus:ring-1 focus:ring-[#0F2854]">
                        <option>{item.status}</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 text-gray-400">
                        <Edit3 size={16} className="hover:text-blue-600 cursor-pointer" />
                        <Trash2 size={16} className="hover:text-red-600 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/* HELPER COMPONENTS */
function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#1C4D8D] text-white shadow-lg shadow-black/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
      {icon} <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function StatCard({ title, value, icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:scale-105 transition-transform duration-300">
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase">{title}</p>
        <h3 className="text-3xl font-black text-[#0F2854] mt-1">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl ${bg} ${color}`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
    </div>
  );
}