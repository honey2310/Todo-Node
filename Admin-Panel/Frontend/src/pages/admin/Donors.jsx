import React, { useState } from "react";
import {
  MapPin,
  UserCheck,
  ShieldCheck,
  ArrowLeft,
  Activity,
  Clock,
  Eye,
} from "lucide-react";

/* =========================
   MAIN COMPONENT
========================= */

const DonorApprovalsSystem = () => {
  const [view, setView] = useState("list");
  const [selectedDonor, setSelectedDonor] = useState(null);

  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "Rahul Hegde",
      bloodGroup: "O-",
      lastDonated: "2025-11-10",
      status: "Verified",
      location: "Davanagere",
      phone: "+91 98877 66554",
      hemoglobin: "14.5",
      bp: "120/80",
      age: 26,
    },
    {
      id: 2,
      name: "Sneha Rao",
      bloodGroup: "A+",
      lastDonated: "N/A",
      status: "Pending",
      location: "Hubli",
      phone: "+91 98877 66555",
      hemoglobin: "12.2",
      bp: "110/70",
      age: 24,
    },
    {
      id: 3,
      name: "Vikram Singh",
      bloodGroup: "B+",
      lastDonated: "2025-08-15",
      status: "Verified",
      location: "Bangalore",
      phone: "+91 98877 66556",
      hemoglobin: "15.1",
      bp: "130/85",
      age: 30,
    },
  ]);

  const handleStatusUpdate = (id, newStatus) => {
    setDonors(
      donors.map((d) =>
        d.id === id ? { ...d, status: newStatus } : d
      )
    );

    if (selectedDonor?.id === id) {
      setSelectedDonor({ ...selectedDonor, status: newStatus });
    }
  };

  const openProfile = (donor) => {
    setSelectedDonor(donor);
    setView("profile");
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {view === "list" ? (
        <DonorsList
          donors={donors}
          onUpdateStatus={handleStatusUpdate}
          onViewProfile={openProfile}
        />
      ) : (
        <IndividualProfile
          donor={selectedDonor}
          onBack={() => setView("list")}
          onUpdateStatus={handleStatusUpdate}
        />
      )}
    </div>
  );
};

/* =========================
   DONOR LIST VIEW
========================= */

const DonorsList = ({ donors, onUpdateStatus, onViewProfile }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="text-[#B354A6]" size={18} />
          <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.3em]">
            Verification Gateway
          </span>
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Donor <span className="text-[#B354A6]">Management</span>
        </h1>
      </div>

      <div className="flex gap-3">
        <SummaryBadge
          label="To Review"
          count={donors.filter((d) => d.status === "Pending").length}
          color="bg-amber-500"
        />
        <SummaryBadge
          label="Verified"
          count={donors.filter((d) => d.status === "Verified").length}
          color="bg-emerald-500"
        />
      </div>
    </div>

    {/* TABLE */}
    <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-50 bg-slate-50/30">
            <th className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Donor Identity
            </th>
            <th className="px-8 py-6 text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Group
            </th>
            <th className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              System Status
            </th>
            <th className="px-8 py-6 text-right text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Quick Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {donors.map((donor) => (
            <tr key={donor.id} className="group hover:bg-[#FDF8FC] transition-all">
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-slate-50 text-[#B354A6] rounded-xl flex items-center justify-center font-black text-xs border border-slate-100 group-hover:bg-[#B354A6] group-hover:text-white transition-all">
                    {donor.name[0]}
                  </div>

                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {donor.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1">
                      <MapPin size={10} className="text-[#B354A6]" />
                      {donor.location}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-8 py-5 text-center">
                <span className="inline-block px-4 py-1.5 rounded-xl bg-[#B354A6]/5 text-[#B354A6] font-black border border-[#B354A6]/10 text-xs italic">
                  {donor.bloodGroup}
                </span>
              </td>

              <td className="px-8 py-5">
                <StatusBadge status={donor.status} />
              </td>

              <td className="px-8 py-5 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onUpdateStatus(donor.id, "Verified")}
                    className={`p-2.5 rounded-xl transition-all ${
                      donor.status === "Verified"
                        ? "text-emerald-500 bg-emerald-50 cursor-default"
                        : "bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white"
                    }`}
                    disabled={donor.status === "Verified"}
                  >
                    <UserCheck size={18} />
                  </button>

                  <button
                    onClick={() => onUpdateStatus(donor.id, "Pending")}
                    className={`p-2.5 rounded-xl transition-all ${
                      donor.status === "Pending"
                        ? "text-amber-500 bg-amber-50 cursor-default"
                        : "bg-slate-50 text-slate-400 hover:bg-amber-500 hover:text-white"
                    }`}
                    disabled={donor.status === "Pending"}
                  >
                    <Clock size={18} />
                  </button>

                  <button
                    onClick={() => onViewProfile(donor)}
                    className="p-2.5 bg-[#B354A6]/5 text-[#B354A6] rounded-xl hover:bg-[#B354A6] hover:text-white transition-all shadow-sm"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* =========================
   PROFILE VIEW
========================= */

const IndividualProfile = ({ donor, onBack, onUpdateStatus }) => (
  <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-[#B354A6]"
    >
      <ArrowLeft size={14} />
      Return to Registry
    </button>

    <div className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm">
      <h2 className="text-4xl font-black italic">{donor.name}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
        <DetailItem label="Blood Type" value={donor.bloodGroup} highlight />
        <DetailItem label="Age" value={`${donor.age} Years`} />
        <DetailItem label="Mobile" value={donor.phone} />
        <DetailItem label="Donations" value="08 Total" />
      </div>
    </div>
  </div>
);

/* =========================
   HELPERS
========================= */

const SummaryBadge = ({ label, count, color }) => (
  <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl border border-slate-50 shadow-sm">
    <span className={`w-2 h-2 rounded-full ${color}`}></span>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-xs font-black text-slate-900">{count}</span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
      status === "Verified"
        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
        : "bg-amber-50 text-amber-600 border-amber-100"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        status === "Verified" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
      }`}
    ></span>
    {status}
  </span>
);

const DetailItem = ({ label, value, highlight }) => (
  <div>
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p
      className={`text-sm font-black ${
        highlight ? "text-[#B354A6] italic" : "text-slate-800"
      }`}
    >
      {value}
    </p>
  </div>
);

export default DonorApprovalsSystem;
