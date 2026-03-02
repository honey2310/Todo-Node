import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Search,
  ShieldCheck,
  Activity,
  Loader2,
  Plus,
  X,
  Trash2,
  Eye,
  Fingerprint,
  Building2,
  Droplet,
} from "lucide-react";
import { base_url } from "../../utils/global_var.js";

const DonationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewRecord, setViewRecord] = useState(null); // State for Detail Modal

  const [newDonation, setNewDonation] = useState({
    hospitalName: "",
    units: 1,
    date: new Date().toISOString().split("T")[0],
  });

  const fetchHistory = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get(`${base_url}/donor/history`, {
        withCredentials: true,
      });

      console.log("History Response:", res.data); // 👈 Check your console!

      if (res.data.status) {
        setHistory(res.data.history || []);
      } else {
        console.error("Backend returned status false:", res.data.message);
      }
    } catch (err) {
      console.error("Network/Auth Error:", err);
      // If it's a 401, maybe redirect to login
    } finally {
      setLoading(false); // 👈 This MUST run to stop the spinner
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAddDonation = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${base_url}/donor/add-donation`, newDonation, {
        withCredentials: true,
      });
      setShowAddModal(false);
      fetchHistory();
    } catch (err) {
      alert("Error adding record.");
    }
  };

  const filteredHistory = history.filter(
    (item) =>
      item.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date?.includes(searchTerm),
  );

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="animate-spin text-[#B354A6]" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
          Loading Medical Vault
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 p-6 relative">
      {/* --- ADD RECORD MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl border border-slate-100 animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic tracking-tighter">
                Log <span className="text-[#B354A6]">Session</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddDonation} className="space-y-6">
              <input
                required
                type="text"
                placeholder="Hospital / Clinic"
                className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-bold outline-none focus:ring-2 focus:ring-[#B354A6]/20 transition-all"
                onChange={(e) =>
                  setNewDonation({
                    ...newDonation,
                    hospitalName: e.target.value,
                  })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="number"
                  placeholder="Units"
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-bold outline-none focus:ring-2 focus:ring-[#B354A6]/20"
                  onChange={(e) =>
                    setNewDonation({ ...newDonation, units: e.target.value })
                  }
                />
                <input
                  required
                  type="date"
                  value={newDonation.date}
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-bold outline-none focus:ring-2 focus:ring-[#B354A6]/20"
                  onChange={(e) =>
                    setNewDonation({ ...newDonation, date: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest hover:bg-[#B354A6] transition-all"
              >
                Verify & Save Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- VIEW RECORD DETAILS MODAL --- */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
            <div className="absolute top-0 right-0 p-12 text-[#B354A6]/5 -z-0">
              <Fingerprint size={180} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.4em]">
                    Secure Trace ID
                  </span>
                  <p className="text-xs font-mono text-slate-400 mt-1 uppercase">
                    #{viewRecord.id.slice(-12)}
                  </p>
                </div>
                <button
                  onClick={() => setViewRecord(null)}
                  className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>
              <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-8">
                {viewRecord.hospital}
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <DetailBox
                  label="Units"
                  value={`${viewRecord.units}`}
                  icon={<Droplet size={14} />}
                />
                <DetailBox
                  label="Date"
                  value={viewRecord.date}
                  icon={<Calendar size={14} />}
                />
                <DetailBox
                  label="Hemoglobin"
                  value={`${viewRecord.hb} g/dL`}
                  icon={<Activity size={14} />}
                />
                <DetailBox
                  label="Status"
                  value={viewRecord.status}
                  icon={<ShieldCheck size={14} />}
                  color="text-emerald-500"
                />
              </div>
              <button
                onClick={() => setViewRecord(null)}
                className="w-full mt-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Health{" "}
            <span className="text-[#B354A6] italic text-5xl">Timeline.</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">
            Immutable clinical history protocol
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-3 bg-[#B354A6] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all active:scale-95"
        >
          <Plus size={18} /> Add New Entry
        </button>
      </div>

      {/* --- SEARCH & TABLE --- */}
      <div className="space-y-4">
        <div className="relative group">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6] transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Filter by facility or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-[2rem] text-xs font-bold shadow-sm outline-none transition-all"
          />
        </div>

        <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Donation Date
                  </th>
                  <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Facility
                  </th>
                  <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                    Status
                  </th>
                  <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredHistory.map((row) => (
                  <tr
                    key={row.id}
                    className="group hover:bg-[#FDF8FC] transition-all"
                  >
                    <td className="px-10 py-8 text-sm font-black text-slate-900">
                      {row.date}
                    </td>
                    <td className="px-10 py-8 text-sm font-bold text-slate-500 italic">
                      {row.hospital}
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100">
                        {row.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button
                        onClick={() => setViewRecord(row)}
                        className="p-3 bg-slate-50 text-slate-400 hover:bg-[#B354A6] hover:text-white rounded-xl transition-all mr-2"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPERS ---
const DetailBox = ({ label, value, icon, color = "text-slate-900" }) => (
  <div className="space-y-2">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </p>
    <p className={`text-sm font-black italic tracking-tight ${color}`}>
      {value}
    </p>
  </div>
);

export default DonationHistory;
