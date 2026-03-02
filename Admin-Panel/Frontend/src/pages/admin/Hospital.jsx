import React, { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Phone,
  ShieldCheck,
  Search,
  Activity,
  Droplets,
  ArrowLeft,
  Clock,
  FileText,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { base_url } from "../../utils/global_var";

const HospitalNetworkSystem = () => {
  const [view, setView] = useState("grid");
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Fetch all hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${base_url}/hospital`);
        if (res.data.status) {
          setHospitals(res.data.hospitals);
        }
      } catch (err) {
        console.error("Failed to fetch hospitals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  // Open hospital profile and fetch patient requests
  const openProfile = async (hospital) => {
    setSelectedHospital({ ...hospital, requests: [] });
    setView("profile");
    setLoadingRequests(true);

    try {
      // Note: ensure your base_url + /cases matches your express route mount
      const res = await axios.get(`${base_url}/cases/${hospital._id}/requests`);

      if (res.data.status) {
        setSelectedHospital((prev) => ({
          ...prev,
          requests: res.data.requests, // 'requests' comes from getHospitalRequests controller
        }));
      }
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoadingRequests(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans selection:bg-[#B354A6]/10">
      <div className="max-w-7xl mx-auto">
        {view === "grid" ? (
          <>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {loading ? (
              <div className="text-center py-20 text-slate-400">
                Loading hospitals...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hospitals
                  .filter((h) =>
                    h.name.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((hospital) => (
                    <HospitalCard
                      key={hospital._id}
                      hospital={hospital}
                      onOpen={() => openProfile(hospital)}
                    />
                  ))}
              </div>
            )}
          </>
        ) : (
          <HospitalProfile
            hospital={selectedHospital}
            onBack={() => setView("grid")}
            loadingRequests={loadingRequests}
          />
        )}
      </div>
    </div>
  );
};

// --- Header ---
const Header = ({ searchQuery, setSearchQuery }) => (
  <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-[#B354A6] animate-pulse" />
        <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.3em]">
          Network Monitor v2.0
        </span>
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">
        Health{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B354A6] to-[#8E44AD]">
          Nodes
        </span>
      </h1>
    </div>

    <div className="relative group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#B354A6] transition-colors"
        size={18}
      />
      <input
        type="text"
        placeholder="Search facilities..."
        className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-[300px] outline-none focus:ring-4 focus:ring-[#B354A6]/5 focus:border-[#B354A6] transition-all shadow-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </header>
);

// --- Hospital Card ---
const HospitalCard = ({ hospital, onOpen }) => (
  <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#B354A6]/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-slate-50 text-[#B354A6] rounded-2xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-500">
          <Building2 size={24} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#B354A6] transition-colors leading-tight">
        {hospital.name}
      </h3>

      <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
        <MapPin size={14} className="text-[#B354A6]" />
        {hospital.address}
      </div>

      <div className="space-y-2 mb-8">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
          <span>Resource Capacity</span>
          <span>{hospital.stockLevel ?? 0}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#B354A6] to-[#D87093] rounded-full transition-all duration-1000"
            style={{ width: `${hospital.stockLevel ?? 0}%` }}
          />
        </div>
      </div>

      <button
        onClick={onOpen}
        className="w-full py-4 bg-slate-50 group-hover:bg-[#B354A6] text-slate-600 group-hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
      >
        Access Node <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

// --- Hospital Profile ---
const HospitalProfile = ({ hospital, onBack, loadingRequests }) => (
  <div className="animate-in fade-in zoom-in-95 duration-500">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-slate-500 hover:text-[#B354A6] mb-8 font-bold transition-colors"
    >
      <ArrowLeft size={20} /> Back to Network
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Sidebar */}
      <div className="space-y-8">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-[#B354A6]/5 text-[#B354A6] rounded-3xl flex items-center justify-center mb-6">
            <Building2 size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            {hospital.name}
          </h2>
          <p className="text-slate-500 flex items-center gap-2 text-sm mb-6">
            <ShieldCheck size={16} className="text-emerald-500" /> Authorized
            Medical Facility
          </p>

          <div className="space-y-4 pt-6 border-t border-slate-50">
            <InfoItem
              label="License Number"
              value={hospital.license}
              icon={<FileText size={16} />}
            />
            <InfoItem
              label="Contact Support"
              value={hospital.phone}
              icon={<Phone size={16} />}
            />
            <InfoItem
              label="Global Tier"
              value={hospital.tier}
              icon={<TrendingUp size={16} />}
            />
          </div>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Live Stock"
            value={`${hospital.stockLevel ?? 0}%`}
            icon={<Droplets />}
            color="text-pink-600"
          />
          <StatCard
            label="Active Requests"
            value={
              loadingRequests ? "Loading..." : hospital.requests?.length || 0
            }
            icon={<Activity />}
            color="text-[#B354A6]"
          />
          <StatCard
            label="Avg. Sync"
            value={hospital.lastUpdate ?? "N/A"}
            icon={<Clock />}
            color="text-blue-600"
          />
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-left border-b border-slate-50">
                  <th className="pb-4 px-4">Patient / Case</th>
                  <th className="pb-4 px-4">Type</th>
                  <th className="pb-4 px-4">Units</th>
                  <th className="pb-4 px-4 text-right">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loadingRequests ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-12 text-center text-slate-400 italic text-sm"
                    >
                      Loading requests...
                    </td>
                  </tr>
                ) : hospital.requests?.length > 0 ? (
                  hospital.requests.map((req) => (
                    <tr
                      key={req._id}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-6 px-4">
                        <div className="font-bold text-slate-900">
                          {req.patientName}
                        </div>
                        <div className="text-[10px] font-medium text-slate-400">
                          {req.caseId}
                        </div>
                      </td>
                      <td className="py-6 px-4 font-black text-[#B354A6]">
                        {req.bloodGroup}
                      </td>
                      <td className="py-6 px-4 font-bold text-slate-600">
                        {req.units} Units
                      </td>
                      <td className="py-6 px-4 text-right">
                        <span
                          className={`text-[10px] font-black uppercase px-3 py-1 rounded-md ${
                            req.priority === "Critical"
                              ? "bg-red-50 text-red-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {req.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-12 text-center text-slate-400 italic text-sm"
                    >
                      No active requests for this node.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
    <div
      className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color}`}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-xl font-black text-slate-900 tracking-tight mt-0.5 italic">
        {value}
      </p>
    </div>
  </div>
);

const InfoItem = ({ label, value, icon }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 text-[#B354A6]">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-700">{value}</p>
    </div>
  </div>
);

export default HospitalNetworkSystem;
