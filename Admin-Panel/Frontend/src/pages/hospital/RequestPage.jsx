import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Truck,
  CheckCircle2,
  Clock,
  Download,
  Activity,
  Trash2,
  Edit2,
} from "lucide-react";
import axios from "axios";
import { base_url } from "../../utils/global_var";
import { useNavigate } from "react-router-dom";

const HospitalRequestSystem = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Fetch all cases
  const fetchCases = async () => {
    try {
      const res = await axios.get(`${base_url}/cases`);
      setRequests(res.data.cases);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCases();
    const interval = setInterval(fetchCases, 2000);
    return () => clearInterval(interval);
  }, []);

  // Delete a case
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this case? This action cannot be undone.",
    );
    if (!confirmDelete) return; // user canceled

    try {
      await axios.delete(`${base_url}/cases/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // Redirect to Request Blood page for edit
  const handleEdit = (caseData) => {
    navigate("/hospital/request-blood", { state: { caseData } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">
            Procurement <span className="text-[#B354A6]">History</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest">
            Real-time Supply Chain Audit
          </p>
        </div>
        <button className="flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#B354A6] transition-all shadow-xl active:scale-95">
          <Download size={18} /> Export Audit Log
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white p-4 rounded-[2rem] border-2 border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6] transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by Transaction ID or Blood Type..."
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl text-xs font-bold focus:border-[#B354A6] focus:ring-0 outline-none transition-all placeholder:text-slate-300"
          />
        </div>
        <button className="px-6 py-3 border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-[#B354A6] hover:text-[#B354A6] transition-all flex items-center gap-2">
          <Filter size={14} /> Filter Node
        </button>
      </div>

      {/* CASES TABLE */}
      <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto px-4">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Clinical Payload</th>
                <th className="px-8 py-4 text-center">Urgency</th>
                <th className="px-8 py-4">Logistics Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="group hover:bg-[#FDF8FC] transition-all duration-300 cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <span className="font-mono text-[11px] font-black text-[#B354A6] bg-[#B354A6]/5 px-3 py-1.5 rounded-lg border-2 border-[#B354A6]/10 italic">
                      #{req.caseId}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-white text-[#B354A6] rounded-xl flex items-center justify-center font-black border-2 border-slate-100 italic group-hover:border-[#B354A6] transition-all">
                        {req.bloodGroup}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 italic">
                          {req.units} Units
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {new Date(req.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 ${
                        req.priority === "Immediate"
                          ? "bg-rose-50 text-rose-600 border-rose-100"
                          : req.priority === "Urgent"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                      }`}
                    >
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <StatusPill status={req.logisticsStatus} />
                  </td>
                  <td className="px-6 py-5 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(req)}
                      className="px-3 py-2 bg-blue-50 text-blue-600 border-2 border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="px-3 py-2 bg-red-50 text-red-600 border-2 border-red-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
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

// Status color mapping
const StatusPill = ({ status }) => {
  const statusStyles = {
    Pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
    Processing: "bg-purple-50 text-purple-600 border-purple-200",
    Dispatched: "bg-purple-50 text-purple-600 border-purple-200",
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
  };

  const statusIcons = {
    Pending: <Clock size={14} />,
    Processing: <Activity size={14} className="animate-pulse" />,
    Dispatched: <Truck size={14} className="animate-bounce" />,
    Completed: <CheckCircle2 size={14} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 ${
        statusStyles[status] || "bg-slate-50 text-slate-400 border-slate-200"
      }`}
    >
      {statusIcons[status]} {status}
    </span>
  );
};

export default HospitalRequestSystem;
