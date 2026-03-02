import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  Clock,
  Droplets,
  ArrowRight,
  MoreHorizontal,
  Plus,
  Filter,
  AlertCircle,
  Activity,
  Zap,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/global_var";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  // --- STATE ---
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // --- FETCH REQUESTS ---
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${base_url}/cases`);
      setRequests(res.data.cases || []);
    } catch (err) {
      console.log("Fetch requests error:", err);
    }
  };

  // --- STATS CALCULATION ---
  const totalRequests = requests.length;
  const fulfilledRequests = requests.filter(
    (r) =>
      r.logisticsStatus === "Completed" || r.logisticsStatus === "Approved",
  ).length;
  const pendingRequests = requests.filter(
    (r) => r.logisticsStatus === "Pending",
  ).length;
  const immediateRequests = requests.filter(
    (r) => r.priority === "Immediate" || r.priority === "Emergency",
  ).length;

  // --- PAGINATION ---
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      {/* 1. HEADER & PRIMARY ACTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-[#B354A6]" size={18} />
            <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.3em]">
              Clinical Node 04
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Hospital <span className="text-[#B354A6]">Console</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage unit procurement and real-time surgical reserves.
          </p>
        </div>
        <button
          onClick={() => navigate("/hospital/request-blood")}
          className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#B354A6] transition-all shadow-xl active:scale-95"
        >
          <Plus size={18} /> New Blood Request
        </button>
      </div>

      {/* 2. ANALYTICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Cycle Requests"
          value={totalRequests}
          icon={<Send />}
          color="text-[#B354A6]"
          bg="bg-[#B354A6]/5"
        />
        <StatCard
          label="Fulfilled"
          value={fulfilledRequests}
          icon={<CheckCircle2 />}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatCard
          label="Pending Sync"
          value={pendingRequests}
          icon={<Clock />}
          color="text-amber-600"
          bg="bg-amber-50"
        />
        <StatCard
          label="Immediate"
          value={immediateRequests}
          icon={<AlertCircle />}
          color="text-rose-600"
          bg="bg-rose-50"
          isAlert
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 3. ACTIVE PROCUREMENT TABLE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-50 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white italic tracking-tight">
                  Active Procurement
                </h3>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                  Real-time Supply Chain
                </p>
              </div>
              <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-[#B354A6] transition-all">
                <Filter size={18} />
              </button>
            </div>
            <div className="overflow-x-auto px-4">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Transmission</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-300">
                  {currentRequests.map((req) => (
                    <RequestRow
                      key={req._id}
                      type={req.bloodGroup}
                      units={req.units}
                      date={new Date(req.date).toLocaleDateString()}
                      status={req.logisticsStatus || "Pending"}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-between p-6 border-t border-slate-50 dark:border-slate-800">
              <button
                onClick={prevPage}
                className="text-[10px] font-black text-[#B354A6] uppercase tracking-widest hover:text-slate-900 transition-colors"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                className="text-[10px] font-black text-[#B354A6] uppercase tracking-widest hover:text-slate-900 transition-colors"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* 4. STOCK & BROADCAST */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-50 dark:border-slate-800 p-10 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 italic">
              <Droplets className="text-[#B354A6]" size={20} /> Local Reserve
            </h3>
            <div className="space-y-6">
              <StockItem
                group="O+"
                units="12"
                percentage={80}
                color="text-emerald-500"
                bar="bg-emerald-500"
              />
              <StockItem
                group="A-"
                units="02"
                percentage={20}
                color="text-[#B354A6]"
                bar="bg-[#B354A6]"
              />
              <StockItem
                group="B+"
                units="08"
                percentage={50}
                color="text-amber-500"
                bar="bg-amber-500"
              />
              <StockItem
                group="AB+"
                units="05"
                percentage={40}
                color="text-indigo-500"
                bar="bg-indigo-500"
              />
            </div>
            <button className="w-full mt-10 flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-[#B354A6] transition-all group">
              Audit Inventory{" "}
              <ChevronRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="bg-[#B354A6] rounded-[3rem] p-8 text-white shadow-2xl shadow-[#B354A6]/20 relative overflow-hidden group">
            <Activity
              size={120}
              className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-3">
                Network Broadcast
              </p>
              <p className="text-sm font-black italic leading-relaxed">
                Central Hub Surpluss: B+ Negative stock detected. Fast-track
                logistics available for this node.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPERS ---
const StatCard = ({ label, value, icon, color, bg, isAlert }) => (
  <div
    className={`bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-50 dark:border-slate-800 shadow-sm group hover:border-[#B354A6]/30 transition-all ${isAlert ? "ring-2 ring-rose-100" : ""}`}
  >
    <div
      className={`p-4 rounded-2xl ${bg} ${color} w-fit mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform`}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
      {label}
    </p>
    <p className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter">
      {value}
    </p>
  </div>
);

const RequestRow = ({ type, units, date, status }) => (
  <tr className="group hover:bg-[#FDF8FC] dark:hover:bg-slate-800/50 transition-all">
    <td className="px-6 py-4">
      <span className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 text-[#B354A6] flex items-center justify-center font-black border border-slate-100 dark:border-slate-700 italic shadow-sm">
        {type}
      </span>
    </td>
    <td className="px-6 py-4 text-xs font-black text-slate-800 dark:text-slate-200 italic">
      {units} UNITS
    </td>
    <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {date}
    </td>
    <td className="px-6 py-4">
      <span
        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
          status === "Completed" || status === "Approved"
            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
            : status === "Pending"
              ? "bg-amber-50 text-amber-600 border-amber-100"
              : "bg-indigo-50 text-indigo-600 border-indigo-100"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="p-2 text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
        <MoreHorizontal size={18} />
      </button>
    </td>
  </tr>
);

const StockItem = ({ group, units, percentage, color, bar }) => (
  <div className="space-y-3 group cursor-default">
    <div className="flex justify-between items-end">
      <span className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase italic">
        {group} Type
      </span>
      <span
        className={`text-[10px] font-black ${color} uppercase tracking-widest`}
      >
        {units} Units
      </span>
    </div>
    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
      <div
        className={`h-full rounded-full ${bar} transition-all duration-1000 group-hover:brightness-110 shadow-sm`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default HospitalDashboard;
