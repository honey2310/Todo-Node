// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import React from "react";

// const Landing = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/signin");
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2854] via-[#1C4D8D] to-[#0F2854] relative overflow-hidden">

//       {/* Soft Background Glow */}
//       <div className="absolute w-[400px] h-[400px] bg-[#4988C4]/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
//       <div className="absolute w-[300px] h-[300px] bg-[#BDE8F5]/20 rounded-full blur-3xl bottom-[-80px] right-[-80px]"></div>

//       {/* Content */}
//       <div className="relative z-10 text-center px-6 animate-fadeUp">

//         {/* Logo */}
//         <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white flex items-center justify-center shadow-xl">
//           <span className="text-2xl font-bold text-[#0F2854]">🩸</span>
//         </div>

//         {/* Title */}
//         <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
//           Blood Bank Network
//         </h1>

//         {/* Tagline */}
//         <p className="mt-4 text-[#BDE8F5] text-sm md:text-base max-w-md mx-auto">
//           Real-time blood inventory tracking and emergency request management system
//         </p>

//         {/* Loader */}
//         <div className="mt-10 w-60 mx-auto h-1.5 bg-white/20 rounded-full overflow-hidden">
//           <div className="h-full bg-[#BDE8F5] animate-loader"></div>
//         </div>

//         <p className="mt-4 text-xs text-white/60 tracking-widest">
//           Initializing system...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Landing;

import React, { useState, useEffect } from "react";
import {
  Droplet,
  ShieldCheck,
  Heart,
  ChevronRight,
  Zap,
  BarChart3,
  Fingerprint,
  ArrowDown,
  ArrowRight,
  Menu,
  X,
  Activity,
  Globe,
  Navigation
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8FC] text-slate-900 font-sans selection:bg-[#B354A6]/20 scroll-smooth overflow-x-hidden">
      
      {/* 1. NAV BAR (SQUIRCLE GLASS) */}
      <div className="fixed top-0 w-full z-50 flex justify-center px-6 pt-6 pointer-events-none">
        <nav className={`max-w-6xl w-full h-20 flex items-center justify-between px-8 rounded-[2rem] transition-all duration-700 pointer-events-auto border-2 ${
            isScrolled
              ? "bg-white/80 backdrop-blur-2xl border-[#B354A6]/10 shadow-[0_20px_50px_rgba(179,84,166,0.1)] py-2"
              : "bg-transparent border-transparent py-4"
          }`}>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-11 h-11 bg-[#B354A6] rounded-[1rem] flex items-center justify-center text-white shadow-xl shadow-[#B354A6]/30 group-hover:rotate-12 transition-all">
              <Droplet size={24} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none italic">HemoHub</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#B354A6]">Live Network</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <NavLink label="Technology" href="#solutions" />
            <NavLink label="Global Impact" href="#impact" />
            <NavLink label="Trust Layer" href="#trust" />
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/signin")} className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-[#B354A6] transition-colors italic">Sign In</button>
            <button onClick={() => navigate("/signin")} className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#B354A6] transition-all active:scale-95">
              Join Node <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* 2. HERO SECTION (HIGH IMPACT) */}
      <section className="relative pt-44 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[#B354A6]/5 rounded-full blur-[140px] -z-10" />
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white rounded-full border-2 border-slate-100 shadow-sm">
              <span className="w-2 h-2 bg-[#B354A6] rounded-full animate-ping"></span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Logistics Protocol v2.0 Active</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900 italic">
              Saving Lives <br /> <span className="text-[#B354A6] not-italic">at Scale.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Precision-engineered blood supply chain. Connecting regional donors to surgical units with 18-minute average dispatch speeds.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start">
              <button onClick={() => navigate("/signin")} className="group flex items-center gap-4 px-12 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-[#B354A6] transition-all hover:-translate-y-1">
                Begin Life-Sync <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-left hidden md:block">
                 <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i+40}`} className="w-10 h-10 rounded-xl border-4 border-white shadow-lg" alt="donor" />)}
                 </div>
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-3 italic">Verified Nodes: 12,400+</p>
              </div>
            </div>
          </div>

          {/* DASHBOARD PREVIEW MOCKUP */}
          <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 hidden lg:block">
             <div className="bg-white rounded-[3rem] border-2 border-slate-200 shadow-[0_50px_100px_rgba(0,0,0,0.08)] p-4 relative z-10">
                <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-6">
                   <div className="flex justify-between items-center">
                      <div className="h-4 w-32 bg-slate-200 rounded-full" />
                      <div className="w-8 h-8 bg-[#B354A6] rounded-lg" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-4 flex flex-col justify-end">
                         <p className="text-2xl font-black text-[#B354A6] italic">O-</p>
                         <p className="text-[8px] font-black text-slate-300 uppercase">Critical</p>
                      </div>
                      <div className="h-32 bg-slate-900 rounded-3xl p-4 flex flex-col justify-end">
                         <p className="text-2xl font-black text-white italic">14m</p>
                         <p className="text-[8px] font-black text-slate-500 uppercase">Dispatch</p>
                      </div>
                   </div>
                   <div className="h-24 bg-white rounded-3xl border-2 border-slate-100 shadow-sm" />
                </div>
             </div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#B354A6] rounded-full blur-[80px] opacity-20" />
          </div>
        </div>
      </section>

      {/* 3. CORE TECHNOLOGY GRID */}
      <section id="solutions" className="py-32 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <Solution icon={<Zap size={28} />} title="Pulse-Link Dispatch" desc="Automated fulfillment protocols connecting hospitals to nodes in under 120 seconds." />
          <Solution icon={<Fingerprint size={28} />} title="Biometric Security" desc="Immutable donor records secured by advanced cryptographic medical standards." />
          <Solution icon={<BarChart3 size={28} />} title="Supply Intelligence" desc="Predictive AI models analyzing regional demand before critical shortages occur." />
        </div>
      </section>

      {/* 4. LIVE NETWORK STATS (High Density) */}
      <section id="impact" className="py-24 bg-white border-y-2 border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
          <StatItem value="12" label="Global Nodes" />
          <StatItem value="45k" label="Units Synced" />
          <StatItem value="104" label="Partner Facilities" />
          <StatItem value="18m" label="Logistics Latency" />
        </div>
      </section>

      {/* 5. CALL TO ACTION (THE COMMAND CENTER) */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-16 md:p-32 text-center text-white relative overflow-hidden border-4 border-slate-800 shadow-[0_50px_100px_rgba(179,84,166,0.2)] group">
          <Droplet className="absolute -bottom-20 -right-20 text-white/5 group-hover:scale-110 transition-transform duration-1000" size={500} fill="currentColor" />
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">
              Stabilize the <br /> <span className="text-[#B354A6] not-italic">Supply Chain.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button onClick={() => navigate("/signin")} className="px-12 py-5 bg-[#B354A6] text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-[#B354A6]/40 hover:bg-white hover:text-[#B354A6] transition-all">
                Become a Donor
              </button>
              <button className="px-12 py-5 bg-white/5 text-white border-2 border-white/10 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                Medical Portal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINIMAL FOOTER */}
      <footer className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#B354A6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#B354A6]/20">
              <Droplet size={18} fill="currentColor" />
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 italic">HEMOHUB_OS_v2.0</span>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">© 2026 INDIA • MISSION CRITICAL LOGISTICS</p>
        </div>
      </footer>
    </div>
  );
};

// --- HELPERS ---

const Solution = ({ icon, title, desc }) => (
  <div className="p-12 rounded-[3.5rem] bg-white border-2 border-slate-50 hover:border-[#B354A6]/30 transition-all group hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] relative">
    <div className="absolute top-0 right-0 p-8 text-slate-50 group-hover:text-[#B354A6]/5 transition-colors">
       <Activity size={80} />
    </div>
    <div className="w-16 h-16 bg-[#B354A6]/5 text-[#B354A6] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#B354A6] group-hover:text-white transition-all duration-500 shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-4 italic tracking-tight uppercase">{title}</h3>
    <p className="text-sm text-slate-500 font-bold leading-relaxed uppercase tracking-tight opacity-70">{desc}</p>
  </div>
);

const StatItem = ({ value, label }) => (
  <div className="space-y-2 group cursor-default">
    <p className="text-6xl font-black text-slate-900 tracking-tighter italic group-hover:text-[#B354A6] transition-colors">
      {value}
    </p>
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
      {label}
    </p>
  </div>
);

const NavLink = ({ label, href }) => (
  <a href={href} className="px-6 py-2 rounded-xl hover:text-slate-900 transition-all relative group">
    {label}
    <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#B354A6] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
  </a>
);

export default LandingPage;