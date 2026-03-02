import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/global_var";
import {
  Droplet,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Info,
  Clock,
} from "lucide-react";

const InventoryPage = () => {
  const [stockData, setStockData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    fetchInventory();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${base_url}/inventory/get-inventory`);

      if (res.data.status) {
        // convert backend data → UI format
        const formatted = res.data.stock.map((item) => ({
          type: item.bloodGroup,
          units: item.units,
          status: item.status,
          color:
            item.status === "Critical"
              ? "text-[#B354A6]"
              : item.status === "Moderate"
                ? "text-amber-600"
                : "text-emerald-600",
          bg:
            item.status === "Critical"
              ? "bg-[#B354A6]/5"
              : item.status === "Moderate"
                ? "bg-amber-50"
                : "bg-emerald-50",
        }));

        setStockData(formatted);
      }
    } catch (err) {
      console.error("Inventory fetch failed", err);
    }
  };

  const updateUnits = async (bloodGroup, action) => {
    const value = prompt(
      `Enter units to ${action === "add" ? "add" : "remove"}:`,
    );

    if (!value || isNaN(value) || Number(value) <= 0) {
      return alert("Please enter valid units");
    }

    try {
      const url =
        action === "add"
          ? `${base_url}/inventory/add-units`
          : `${base_url}/inventory/remove-units`;

      const res = await axios.post(url, {
        bloodGroup,
        units: Number(value),
      });

      if (res.data.status) {
        fetchInventory(); // refresh stock
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-[#B354A6]" size={18} />
            <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.3em]">
              Live Inventory Stream
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Central <span className="text-[#B354A6]">Supply</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Monitoring 482 units across 24 connected network nodes.
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
            <Clock size={12} className="text-[#B354A6]" /> Last Sync
          </p>
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

      {/* 2. STOCK GRID */}
      {/* 2. STOCK GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stockData.map((item) => (
          <div
            key={item.type}
            className="bg-white rounded-[2.5rem] border border-slate-50 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:border-[#B354A6]/20 transition-all group relative overflow-hidden flex flex-col"
          >
            <Droplet
              className={`absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 transition-transform ${item.color}`}
              size={120}
              fill="currentColor"
            />

            <div className="flex justify-between items-start mb-6">
              <div
                className={`p-3.5 rounded-2xl ${item.bg} ${item.color} shadow-inner`}
              >
                <Droplet size={24} fill="currentColor" />
              </div>
              <span
                className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${
                  item.status === "Critical"
                    ? "bg-[#B354A6]/10 border-[#B354A6]/20 text-[#B354A6]"
                    : item.status === "Moderate"
                      ? "bg-amber-50 border-amber-100 text-amber-600"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600"
                }`}
              >
                {item.status}
              </span>
            </div>

            <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">
              {item.type}
            </h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              {item.units} Units Available
            </p>

            {/* REFINED PROGRESS BAR */}
            <div className="mt-6 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  item.status === "Critical"
                    ? "bg-[#B354A6]"
                    : item.status === "Moderate"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min((item.units / 60) * 100, 100)}%` }}
              ></div>
            </div>

            {/* IMPROVED BUTTON POSITIONING */}
            <div className="flex items-center gap-2 mt-8 relative z-10">
              <button
                onClick={() => updateUnits(item.type, "add")}
                className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
              >
                Add
              </button>

              <button
                onClick={() => updateUnits(item.type, "remove")}
                className="flex-1 bg-white border-2 border-slate-100 hover:border-[#B354A6]/30 hover:text-[#B354A6] text-slate-400 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. TRENDS & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LOGISTICS FEED */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-50 shadow-sm p-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-3">
              <Activity className="text-[#B354A6]" size={22} /> Movement Logs
            </h2>
            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
              <button className="px-4 py-1.5 text-[10px] font-black text-white bg-slate-900 rounded-lg uppercase tracking-widest">
                Real-time
              </button>
              <button className="px-4 py-1.5 text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">
                History
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <MovementRow
              type="O-"
              units="4 Units"
              hospital="City General Hospital"
              time="24 mins ago"
              incoming={false}
            />
            <MovementRow
              type="B+"
              units="10 Units"
              hospital="Red Cross Hub"
              time="5 hours ago"
              incoming={true}
            />
            <MovementRow
              type="AB-"
              units="2 Units"
              hospital="St. Mary's Clinic"
              time="Yesterday"
              incoming={false}
            />
          </div>
        </div>

        {/* EMERGENCY ACTION CARD */}
        <div className="bg-[#B354A6] rounded-[3rem] p-10 text-white shadow-2xl shadow-[#B354A6]/20 relative overflow-hidden group">
          <AlertCircle
            className="absolute -right-8 -top-8 opacity-20 group-hover:rotate-12 transition-transform duration-700"
            size={200}
          />

          <h2 className="text-xl font-black mb-4 flex items-center gap-3 relative z-10">
            <AlertCircle size={24} /> Depletion Alert
          </h2>
          <p className="text-[#FDF8FC]/70 text-xs font-medium mb-10 leading-relaxed relative z-10">
            Inventory for universal negative groups is reaching a 48-hour
            exhaustion window.
          </p>

          <div className="space-y-4 relative z-10">
            <AlertItem group="O- Negative" current="12" target="20" />
            <AlertItem group="AB- Negative" current="05" target="15" />
          </div>

          <button className="w-full mt-12 bg-slate-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-[#B354A6] transition-all shadow-xl active:scale-95">
            Broadcast Priority Request
          </button>
        </div>
      </div>
    </div>
  );
};

// HELPER COMPONENTS
const MovementRow = ({ type, units, hospital, time, incoming }) => (
  <div className="flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group">
    <div className="flex items-center gap-5">
      <div
        className={`p-3 rounded-xl shadow-sm ${incoming ? "bg-emerald-50 text-emerald-600" : "bg-slate-900 text-white"}`}
      >
        {incoming ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
      </div>
      <div>
        <p className="text-sm font-black text-slate-900 group-hover:text-[#B354A6] transition-colors">
          {incoming ? "Replenishment" : "Dispatch"}: {units} ({type})
        </p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
          {hospital}
        </p>
      </div>
    </div>
    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
      {time}
    </span>
  </div>
);

const AlertItem = ({ group, current, target }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex justify-between items-center">
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">
        Group
      </span>
      <span className="font-black text-sm italic">{group}</span>
    </div>
    <div className="text-right">
      <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">
        Status
      </span>
      <div className="flex items-baseline gap-1">
        <span className="font-black text-lg">{current}</span>
        <span className="text-xs font-bold opacity-50">/ {target}u</span>
      </div>
    </div>
  </div>
);

export default InventoryPage;
