import React from "react";
import {
  Users,
  Droplet,
  Building2,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Mail,
  Globe,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/global_var";

const MainDashboard = () => {
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [stats, setStats] = useState(null);
  const [inventory, setInventory] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchDashboardStats();
    fetchPending();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchPending = async () => {
    const res = await axios.get(`${base_url}/auth/pending-hospitals`);
    if (res.data.status) {
      setPendingHospitals(res.data.hospitals);
    }
  };

  const approveHospital = async (id) => {
    try {
      const res = await axios.post(`${base_url}/auth/approve-hospital`, { id });
      if (res.data.status) {
        // Filter the list locally so it disappears immediately
        setPendingHospitals((prev) => prev.filter((h) => h._id !== id));
        alert("Node Authorized Successfully");
      }
    } catch (err) {
      console.error("Approval failed", err);
      alert(
        "Authorization protocol failed: " +
          (err.response?.data?.message || "Server Error"),
      );
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(`${base_url}/dashboard/dashboard-stats`);

      if (res.data.status) {
        setStats(res.data.stats);
        setInventory(res.data.inventory); // ⭐ inventory units
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      {/* 1. WELCOME & DATE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#B354A6] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#B354A6]/20">
              <ShieldCheck size={18} />
            </div>
            <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.2em]">
              Secure Node 01
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Network <span className="text-[#B354A6]">Intelligence</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            System pulse is optimal. 4 priority requests pending review.
          </p>
        </div>
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm hidden md:block">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] mb-1">
            <Clock size={12} className="text-[#B354A6]" /> Live System Time
          </div>
          <p className="text-sm font-black text-slate-900 italic">
            {currentTime.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}{" "}
            •{" "}
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* 2. TOP LEVEL STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          label="Network Donors"
          value={stats?.totalDonors || 0}
          change="+12.4%"
          icon={<Users />}
          color="text-[#B354A6]"
          bg="bg-[#B354A6]/5"
        />
        <SummaryCard
          label="Global Inventory"
          value={stats?.bloodUnits || 0}
          change="Optimal"
          icon={<Droplet />}
          color="text-rose-500"
          bg="bg-rose-50"
        />
        <SummaryCard
          label="Active Facilities"
          value={stats?.totalHospitals || 0}
          change="Online"
          icon={<Building2 />}
          color="text-indigo-600"
          bg="bg-indigo-50"
        />
        <SummaryCard
          label="Emergency Alerts"
          value={stats?.emergencyAlerts || 0}
          change="Priority"
          icon={<AlertTriangle />}
          color="text-amber-600"
          bg="bg-amber-50"
          isAlert
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. STOCK ANALYTICS */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B354A6]/5 rounded-full blur-3xl -translate-y-12 translate-x-12" />

            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                <Activity size={20} className="text-[#B354A6]" /> Stock
                Distribution
              </h3>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Unit Capacity %
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 relative z-10">
              <StockMeter
                group="O+"
                percentage={inventory["O+"] || 0}
                color="text-emerald-500"
              />
              <StockMeter
                group="O-"
                percentage={inventory["O-"] || 0}
                color="text-[#B354A6]"
              />
              <StockMeter
                group="A+"
                percentage={inventory["A+"] || 0}
                color="text-indigo-500"
              />
              <StockMeter
                group="A-"
                percentage={inventory["A-"] || 0}
                color="text-amber-500"
              />
              <StockMeter
                group="B+"
                percentage={inventory["B+"] || 0}
                color="text-indigo-500"
              />
              <StockMeter
                group="B-"
                percentage={inventory["B-"] || 0}
                color="text-[#B354A6]"
              />
              <StockMeter
                group="AB+"
                percentage={inventory["AB+"] || 0}
                color="text-emerald-500"
              />
              <StockMeter
                group="AB-"
                percentage={inventory["AB-"] || 0}
                color="text-[#B354A6]"
              />
            </div>
          </div>

          {/* LOGISTICS FEED */}
          <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
              <Zap size={20} className="text-amber-500" /> Live Logistics Feed
            </h3>
            <div className="space-y-2">
              <ShipmentItem
                hospital="City General"
                units="4u (O-)"
                time="24 mins ago"
                status="Delivered"
              />
              <ShipmentItem
                hospital="St. Mary's Clinic"
                units="10u (A+)"
                time="1 hour ago"
                status="In Transit"
              />
              <ShipmentItem
                hospital="Rotary Blood Hub"
                units="15u (B+)"
                time="3 hours ago"
                status="Delivered"
              />
            </div>
          </div>
        </div>

        {/* 4. COMMAND SIDEBAR */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#B354A6]/20 rounded-full blur-[60px]" />

            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">
              System Commands
            </h3>
            <div className="space-y-4 relative z-10">
              <button className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-[#B354A6] border border-white/10 rounded-2xl transition-all group">
                <span className="text-xs font-black uppercase tracking-widest">
                  Broadcast Emergency
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[#B354A6] group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </button>
              <button className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
                <span className="text-xs font-black uppercase tracking-widest">
                  New Donation Drive
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-slate-500 group-hover:translate-x-1 transition-all"
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
              Node Metrics
            </h3>
            <div className="space-y-8">
              <HealthMetric
                label="Storage Temp"
                value="2.4°C"
                status="Stable"
                color="bg-emerald-500"
              />
              <HealthMetric
                label="Chain Sync"
                value="Verified"
                status="Secure"
                color="bg-[#B354A6]"
              />
              <HealthMetric
                label="Active Hubs"
                value="12 Units"
                status="Active"
                color="bg-emerald-500"
              />
            </div>
          </div>

          {/* Add overflow-hidden and w-full to the container */}
          <div className="w-full max-w-full bg-white rounded-[3rem] border border-slate-100 p-6 md:p-10 shadow-sm overflow-hidden">
            <div className="space-y-4">
              {pendingHospitals.map((h) => (
                <div
                  key={h._id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 md:p-6 bg-slate-50 rounded-[2rem] gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {" "}
                    {/* min-w-0 allows text truncation */}
                    <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#B354A6] border border-slate-100">
                      <Building2 size={20} />
                    </div>
                    <div className="min-w-0 truncate">
                      {" "}
                      {/* Prevents long text from pushing the button out */}
                      <p className="font-black text-slate-900 truncate italic">
                        {h.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {h.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => approveHospital(h._id)}
                      className="flex-1 lg:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                    >
                      Authorize
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SummaryCard = ({ label, value, change, icon, color, bg, isAlert }) => (
  <div
    className={`bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-[#B354A6]/30 transition-all ${isAlert ? "ring-2 ring-amber-100" : ""}`}
  >
    <div
      className={`p-3.5 rounded-2xl ${bg} ${color} w-fit mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform`}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </h4>
    <div className="flex items-baseline gap-2">
      <p className="text-3xl font-black text-slate-900">{value}</p>
      {change && (
        <span
          className={`text-[10px] font-black ${isAlert ? "text-amber-600" : "text-[#B354A6]"} uppercase italic`}
        >
          {change}
        </span>
      )}
    </div>
  </div>
);

const ShipmentItem = ({ hospital, units, time, status }) => (
  <div className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-2xl transition border border-transparent hover:border-slate-100 group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#B354A6] group-hover:bg-[#B354A6]/5 transition-all">
        <Building2 size={20} />
      </div>
      <div>
        <p className="text-sm font-black text-slate-900">{hospital}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
          {units} • {time}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span
        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${status === "Delivered" ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"}`}
      >
        {status}
      </span>
      <ChevronRight
        size={16}
        className="text-slate-300 group-hover:translate-x-1 transition-transform"
      />
    </div>
  </div>
);

const HealthMetric = ({ label, value, status, color }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">
        {label}
      </p>
      <p className="text-[9px] text-[#B354A6] font-black uppercase tracking-widest italic">
        {status}
      </p>
    </div>
    <div className="text-right">
      <p className="text-sm font-black text-slate-900">{value}</p>
      <div
        className={`w-10 h-1 rounded-full ${color} mt-2 ml-auto shadow-sm`}
      ></div>
    </div>
  </div>
);

const StockMeter = ({ group, percentage, color }) => {
  // ⭐ convert units → percentage for circle fill
  const safePercent = Math.min((percentage / 50) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="#F1F5F9"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={263.8}
            strokeDashoffset={263.8 - (263.8 * safePercent) / 100}
            strokeLinecap="round"
            className={`${color} transition-all duration-[1.5s] ease-out`}
          />
        </svg>

        <span className="absolute text-lg font-black text-slate-900 group-hover:scale-125 transition-transform">
          {group}
        </span>
      </div>

      {/* ⭐ changed text only */}
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
        {percentage} Units
      </p>
    </div>
  );
};
export default MainDashboard;
