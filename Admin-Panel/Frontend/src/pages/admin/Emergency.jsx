import React from "react";
import { 
  AlertOctagon, Radio, Truck, PhoneCall, 
  Map, Activity, Clock, ShieldAlert, Droplet, 
  ChevronRight, Zap, Navigation
} from "lucide-react";

const EmergencyDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* 1. MISSION CONTROL HEADER */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
        {/* Subtle decorative background icon */}
        <ShieldAlert size={240} className="absolute right-0 top-0 text-[#B354A6]/5 -translate-y-12 translate-x-12" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 text-center md:text-left">
            <div className="p-5 bg-[#B354A6] rounded-[2rem] shadow-2xl shadow-[#B354A6]/30">
              <Radio size={36} className="text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <Zap className="text-[#B354A6]" size={16} />
                <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.4em]">Active Emergency Relay</span>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">Dispatcher <span className="text-[#B354A6]">Live</span></h1>
              <p className="text-slate-400 font-bold text-xs mt-3 uppercase tracking-widest flex items-center gap-2 justify-center md:justify-start">
                <span className="w-2 h-2 bg-[#B354A6] rounded-full animate-ping"></span>
                4 Priority requests in current node
              </p>
            </div>
          </div>
          <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-[#B354A6] transition-all active:scale-95">
            Broadcast Network Alert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* 2. PRIORITY QUEUE (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <Activity className="text-[#B354A6]" size={22} /> Priority Queue
            </h2>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic animate-pulse">Live Link Active</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <EmergencyRequestCard 
              type="O-" 
              units="4 Units" 
              hospital="City General Hospital" 
              distance="2.4 km" 
              timeSince="8m ago" 
              priority="Immediate"
            />
            <EmergencyRequestCard 
              type="AB-" 
              units="2 Units" 
              hospital="St. Mary's Clinic" 
              distance="5.1 km" 
              timeSince="14m ago" 
              priority="Urgent"
            />
          </div>
        </div>

        {/* 3. LOGISTICS HUB (Right 1/3) */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 px-2">
            <Truck className="text-[#B354A6]" size={22} /> Fleet Status
          </h2>

          <div className="bg-white rounded-[2.5rem] border border-slate-50 p-8 space-y-6 shadow-sm">
             <div className="p-6 bg-slate-900 rounded-[1.5rem] text-white flex justify-between items-center relative overflow-hidden group">
                <Navigation className="absolute -right-2 -bottom-2 text-white/10 group-hover:scale-125 transition-transform" size={80} />
                <div className="relative z-10">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available Fleet</p>
                   <p className="text-3xl font-black italic">03 <span className="text-xs font-normal">Units</span></p>
                </div>
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
             </div>

             <div className="space-y-3">
                <ContactButton name="Blood Bank Dispatch" icon={<PhoneCall size={16}/>} />
                <ContactButton name="Traffic Coordination" icon={<Map size={16}/>} />
                <ContactButton name="O- Negative Donors" icon={<Droplet size={16}/>} isUrgent />
             </div>

             <div className="pt-4 border-t border-slate-50">
                <div className="bg-[#B354A6]/5 rounded-3xl p-6 border border-[#B354A6]/10 text-center">
                   <p className="text-[10px] font-black text-[#B354A6] uppercase tracking-widest mb-2">Network Avg. Dispatch</p>
                   <p className="text-4xl font-black text-[#B354A6] italic tracking-tighter">14.2 <span className="text-xs font-normal text-slate-400 tracking-normal uppercase">Minutes</span></p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SUB-COMPONENT: REFINED REQUEST CARD
const EmergencyRequestCard = ({ type, units, hospital, distance, timeSince, priority }) => (
  <div className="bg-white rounded-[2rem] border border-slate-50 hover:border-[#B354A6]/30 shadow-sm p-6 flex items-center justify-between group transition-all duration-300">
    <div className="flex items-center gap-6">
      <div className="w-16 h-16 bg-[#B354A6]/5 text-[#B354A6] rounded-2xl flex items-center justify-center text-2xl font-black border border-[#B354A6]/10 italic group-hover:bg-[#B354A6] group-hover:text-white transition-all duration-500">
        {type}
      </div>
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-black text-slate-900 italic tracking-tight">{hospital}</h3>
          <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${
            priority === 'Immediate' ? 'bg-[#B354A6] text-white shadow-lg shadow-[#B354A6]/20' : 'bg-amber-100 text-amber-700'
          }`}>
            {priority}
          </span>
        </div>
        <div className="flex gap-5 text-[10px] text-slate-400 font-black uppercase tracking-widest mt-3">
          <span className="flex items-center gap-1.5"><Droplet size={14} className="text-[#B354A6]" /> {units}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-300" /> {timeSince}</span>
          <span className="flex items-center gap-1.5"><Navigation size={14} className="text-slate-300" /> {distance}</span>
        </div>
      </div>
    </div>
    <button className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-300 group-hover:bg-slate-900 group-hover:text-white rounded-2xl transition-all shadow-sm">
      <ChevronRight size={24} />
    </button>
  </div>
);

// SUB-COMPONENT: REFINED CONTACT BUTTON
const ContactButton = ({ name, icon, isUrgent = false }) => (
  <button className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
    isUrgent ? 'bg-[#B354A6]/10 border-[#B354A6]/20 text-[#B354A6]' : 'bg-white border-slate-100 text-slate-400 hover:border-[#B354A6]/20 hover:text-[#B354A6]'
  }`}>
    {name}
    <span className={isUrgent ? 'text-[#B354A6]' : 'text-slate-300'}>{icon}</span>
  </button>
);

export default EmergencyDashboard;