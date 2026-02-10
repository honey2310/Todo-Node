import React, { useState } from "react";
import { 
  Search, Filter, Download, MoreVertical, 
  Edit, Trash2, Eye, CheckCircle2, AlertCircle, 
  ArrowUpDown, HardDrive, LayoutGrid, List
} from "lucide-react";

export default function DataManagement() {
  const [viewType, setViewType] = useState("table"); // table or grid

  const complaints = [
    { id: "TKT-8821", user: "Amit S.", category: "Technical", subject: "Server Timeout", priority: "High", status: "Pending", date: "2026-02-06" },
    { id: "TKT-8822", user: "Priya P.", category: "Account", subject: "Password Reset", priority: "Medium", status: "In Progress", date: "2026-02-05" },
    { id: "TKT-8823", user: "Rahul V.", category: "Facility", subject: "AC Repair", priority: "Low", status: "Resolved", date: "2026-02-04" },
  ];

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#0F2854] flex items-center gap-2">
            <HardDrive className="text-[#1C4D8D]" size={24} />
            Data Management
          </h2>
          <p className="text-sm text-gray-500">Archive, filter, and manage all incoming support tickets.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white text-sm font-medium hover:bg-gray-50">
            <Download size={16} /> Export CSV
          </button>
          <div className="flex border rounded-lg overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => setViewType("table")}
              className={`p-2 ${viewType === 'table' ? 'bg-gray-100 text-[#0F2854]' : 'text-gray-400'}`}>
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewType("grid")}
              className={`p-2 ${viewType === 'grid' ? 'bg-gray-100 text-[#0F2854]' : 'text-gray-400'}`}>
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Ticket ID, User, or Subject..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-[#1C4D8D] text-sm"
          />
        </div>
        
        <select className="bg-gray-50 border-none text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1C4D8D]">
          <option>All Categories</option>
          <option>Technical</option>
          <option>Account</option>
          <option>Facility</option>
        </select>

        <select className="bg-gray-50 border-none text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1C4D8D]">
          <option>All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button className="flex items-center gap-2 text-sm text-[#1C4D8D] font-semibold hover:underline px-2">
          Clear Filters
        </button>
      </div>

      {/* COMPLAINTS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0F2854] text-white text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold flex items-center gap-1 cursor-pointer">
                  Ticket <ArrowUpDown size={12}/>
                </th>
                <th className="px-6 py-4 font-semibold">User Details</th>
                <th className="px-6 py-4 font-semibold">Subject</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/40 transition-colors group">
                  <td className="px-6 py-4 font-bold text-[#1C4D8D]">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">
                        {item.user[0]}
                      </div>
                      <span className="text-sm font-medium">{item.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[200px]">{item.subject}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[11px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <PriorityBadge priority={item.priority} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Detail">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* PAGINATION */}
        <div className="p-4 border-t flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <p>Showing 1 to 3 of 248 complaints</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border rounded bg-[#0F2854] text-white">1</button>
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${styles[priority]}`}>
      {priority}
    </span>
  );
}


