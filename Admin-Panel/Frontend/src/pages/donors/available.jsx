import React, { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Search, 
  Filter, 
  Droplets,
  ChevronRight,
  Info,
  Zap,
  Activity
} from "lucide-react";

const DonorAvailability = () => {
  const [activeTab, setActiveTab] = useState("Camps");

  const locations = [
    { 
      id: 1, 
      name: "Lok Samarpan Blood Bank", 
      type: "Permanent Bank", 
      distance: "1.2 km", 
      status: "Open 24/7", 
      address: "Ashwini Kumar Rd, Surat",
      needed: ["O-", "B-", "AB-"] 
    },
    { 
      id: 2, 
      name: "Davanagere University Drive", 
      type: "Mobile Camp", 
      distance: "3.5 km", 
      status: "Ends at 5:00 PM", 
      address: "Admin Block, Main Campus",
      needed: ["All Groups"] 
    },
    { 
      id: 3, 
      name: "Surat Raktadan Kendra", 
      type: "Research Center", 
      distance: "4.8 km", 
      status: "Closes at 9:00 PM", 
      address: "Udhana - Magdalla Rd",
      needed: ["O+", "A+"] 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* HEADER & SMART TOGGLE */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-[#B354A6]" size={18} />
            <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.3em]">Geospatial Intelligence</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Donation <span className="text-[#B354A6] italic">Centers</span></h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Real-time availability of nodes within your immediate radius.</p>
        </div>
        
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-[1.5rem] border border-slate-50 dark:border-slate-800 shadow-sm">
          {["Camps", "Blood Banks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                ? "bg-[#B354A6] text-white shadow-lg shadow-[#B354A6]/20" 
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH & DISCOVERY BAR */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-9 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by area, hub name or postal code..." 
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 border-none rounded-[2rem] text-xs font-bold shadow-sm focus:ring-2 focus:ring-[#B354A6]/20 outline-none transition-all placeholder:text-slate-300"
          />
        </div>
        <button className="md:col-span-3 flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 rounded-[2rem] text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-[#B354A6]/30 hover:text-[#B354A6] transition-all shadow-sm">
          <Filter size={18} /> Discovery Filters
        </button>
      </div>

      {/* GEOSPATIAL LISTING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* CENTER LISTING */}
        <div className="lg:col-span-2 space-y-4">
          {locations.map((loc) => (
            <div key={loc.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-50 dark:border-slate-800 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:border-[#B354A6]/20 transition-all group cursor-pointer">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-[#B354A6]/5 dark:bg-[#B354A6]/10 text-[#B354A6] rounded-[1.5rem] flex items-center justify-center border border-[#B354A6]/10 group-hover:bg-[#B354A6] group-hover:text-white transition-all duration-500">
                    <MapPin size={28} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#B354A6] transition-colors italic tracking-tight">{loc.name}</h3>
                      <span className="text-[9px] font-black px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-lg uppercase tracking-widest">{loc.type}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-bold flex items-center gap-2">
                      <Navigation size={12} className="text-[#B354A6]" /> {loc.address}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {loc.needed.map(blood => (
                        <span key={blood} className="text-[9px] font-black text-[#B354A6] bg-[#B354A6]/5 px-3 py-1 rounded-xl border border-[#B354A6]/10 uppercase tracking-widest italic">
                          {blood} Priority
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-between items-end gap-4 text-right">
                  <div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">{loc.distance}</p>
                    <p className="text-[10px] font-black text-emerald-500 uppercase flex items-center justify-end gap-1.5 mt-1 tracking-widest">
                      <Activity size={12} className="animate-pulse" /> {loc.status}
                    </p>
                  </div>
                  <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#B354A6] transition-all shadow-xl active:scale-95">
                    Launch Nav <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GUIDANCE SIDEBAR */}
        <div className="space-y-8">
          <div className="bg-[#B354A6] rounded-[3rem] p-10 text-white shadow-2xl shadow-[#B354A6]/20 relative overflow-hidden group">
            <Droplets className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-700" size={200} fill="currentColor" />
            <h3 className="text-xl font-black mb-4 flex items-center gap-3 relative z-10">
               <Zap size={24} /> Protocol Tip
            </h3>
            <p className="text-xs text-[#FDF8FC]/70 leading-relaxed font-bold uppercase tracking-tight relative z-10">
              Optimal hydration is critical. Maintain a 500ml water intake within 60 minutes of arrival at the node. 
            </p>
            <button className="mt-10 w-full py-4 bg-white text-[#B354A6] rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl">
               Full Safety Guide
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-50 dark:border-slate-800 p-8 shadow-sm">
             <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Emergency Relay</h4>
             <div className="flex items-center gap-5 p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 rounded-xl shadow-inner">
                   <Phone size={20} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">24/7 National Hub</p>
                   <p className="text-sm font-black text-slate-900 dark:text-white italic tracking-tight">104 / +91 999 888 7777</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonorAvailability;