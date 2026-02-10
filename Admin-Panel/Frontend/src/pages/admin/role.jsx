import React, { useState } from "react";
import { 
  Users, UserShield, UserCog, UserCircle, 
  ToggleLeft, ToggleRight, MoreVertical, 
  Mail, ShieldCheck, Plus, Search 
} from "lucide-react";

const UserRoles = () => {
  const [activeTab, setActiveTab] = useState("All");

  const users = [
    { id: 1, name: "Arjun Mehta", email: "arjun@itcorp.com", role: "Admin", dept: "Management", status: true },
    { id: 2, name: "Sarah Khan", email: "sarah.k@helpdesk.com", role: "Support Staff", dept: "Technical", status: true },
    { id: 3, name: "Vikram Singh", email: "vikram@facility.com", role: "Support Staff", dept: "Facility", status: false },
    { id: 4, name: "Neha Gupta", email: "neha.g@user.com", role: "User", dept: "Marketing", status: true },
  ];

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-[#0F2854] flex items-center gap-3">
            <UserShield className="text-[#1C4D8D]" size={32} />
            Access Control
          </h2>
          <p className="text-gray-500 mt-1">Manage system permissions, roles, and staff assignments.</p>
        </div>
        <button className="bg-[#0F2854] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#1C4D8D] transition shadow-lg shadow-blue-900/20">
          <Plus size={20} /> Add New User
        </button>
      </div>

      {/* ROLE DISTRIBUTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <RoleCard title="System Admins" count="03" icon={<ShieldCheck />} color="bg-indigo-600" />
        <RoleCard title="Support Staff" count="12" icon={<UserCog />} color="bg-blue-600" />
        <RoleCard title="Active Users" count="840" icon={<UserCircle />} color="bg-[#1C4D8D]" />
      </div>

      {/* SEARCH & TABS */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            {["All", "Admin", "Support Staff", "User"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-[#0F2854] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input type="text" placeholder="Find user..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1C4D8D]" />
          </div>
        </div>

        {/* USER LIST */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
              <tr>
                <th className="px-8 py-4 text-left">Identify</th>
                <th className="px-8 py-4 text-left">Department</th>
                <th className="px-8 py-4 text-left">Permission Level</th>
                <th className="px-8 py-4 text-center">Account Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0F2854] to-[#1C4D8D] flex items-center justify-center text-white font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-[#0F2854] text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Mail size={10} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-600">{user.dept}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                      user.role === 'Admin' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                      user.role === 'Support Staff' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-600 border-gray-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center cursor-pointer">
                      {user.status ? (
                        <ToggleRight className="text-emerald-500" size={28} />
                      ) : (
                        <ToggleLeft className="text-gray-300" size={28} />
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-gray-400 hover:text-[#0F2854] transition">
                      <UserCog size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* Mini Components */
const RoleCard = ({ title, count, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:translate-y-[-4px] transition-all duration-300">
    <div className={`w-14 h-14 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg shadow-inherit/20`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{title}</p>
      <h3 className="text-3xl font-black text-[#0F2854] mt-1">{count}</h3>
    </div>
  </div>
);

export default UserRoles;