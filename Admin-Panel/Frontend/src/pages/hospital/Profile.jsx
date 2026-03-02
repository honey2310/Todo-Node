import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Edit3,
  Camera,
  Save,
  X,
  Globe,
  Activity,
  Zap,
  ChevronRight,
  Clock,
  Award,
  Landmark,
  FileText,
} from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { base_url } from "../../utils/global_var";

const HospitalProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    license: "",
    email: "",
    phone: "",
    address: "",
    tier: "",
    established: "",
  });

  useEffect(() => {
    fetchHospitalProfile();
  }, []);

  const fetchHospitalProfile = async () => {
    try {
      const res = await axios.get(`${base_url}/hospital/get-currentuser`, {
        withCredentials: true,
      });

      if (res.data.status) {
        setProfile(res.data.hospital);
      }
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        `${base_url}/hospital/${profile._id}`,
        profile,
        { withCredentials: true },
      );

      if (res.data.status) {
        setIsEditing(false);
        fetchHospitalProfile();
      }
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-700 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-[#B354A6]" size={18} />
            <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.3em]">
              Identity Verified
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">
            Facility <span className="text-[#B354A6]">Identity</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest">
            Authorized Hospital Node Profile
          </p>
        </div>

        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border-2 border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="flex items-center gap-2 px-8 py-3 bg-[#B354A6] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 shadow-xl shadow-[#B354A6]/20 transition-all"
              >
                <Save size={16} /> Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#B354A6] transition-all shadow-xl"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT: IDENTITY CARD */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[3rem] border-2 border-slate-200 shadow-sm overflow-hidden group">
            <div className="h-32 bg-gradient-to-r from-[#B354A6] to-slate-900 relative" />
            <div className="px-8 pb-10">
              <div className="relative w-fit mx-auto -mt-16">
                <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center border-[6px] border-white shadow-2xl relative overflow-hidden">
                  <Building2 size={48} className="text-[#B354A6]" />
                  {isEditing && (
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white cursor-pointer hover:bg-slate-900/60 transition-all">
                      <Camera size={24} />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-2 rounded-xl border-4 border-white shadow-lg">
                  <ShieldCheck size={18} />
                </div>
              </div>

              <div className="text-center mt-6">
                <h2 className="text-2xl font-black text-slate-900 italic tracking-tight">
                  {profile.name}
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                  {profile.tier}
                </p>
                <div className="flex justify-center gap-3 mt-8">
                  <Badge
                    label="Active Hub"
                    color="text-emerald-600 bg-emerald-50 border-emerald-100"
                  />
                  <Badge
                    label="24/7 Access"
                    color="text-[#B354A6] bg-[#B354A6]/5 border-[#B354A6]/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* NODE METRICS */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden border-2 border-slate-800">
            <Zap
              size={140}
              className="absolute -right-10 -bottom-10 text-white/5"
            />
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">
              Node Performance
            </h4>
            <div className="space-y-6 relative z-10">
              <MetricRow label="Avg. Response" value="12m" />
              <MetricRow label="Reliability" value="99.8%" />
              <MetricRow label="Total Volume" value="4,204u" />
            </div>
          </div>
        </div>

        {/* RIGHT: DATA FORMS */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3rem] border-2 border-slate-200 p-10 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10 flex items-center gap-3 italic">
              <Landmark className="text-[#B354A6]" size={20} /> Facility
              Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <ProfileInput
                isEditing={isEditing}
                label="Registered Name"
                value={profile.name}
                icon={<Building2 size={18} />}
                onChange={(v) => setProfile({ ...profile, name: v })}
              />
              <ProfileInput
                isEditing={isEditing}
                label="Medical License"
                value={profile.license}
                icon={<FileText size={18} />}
                onChange={(v) => setProfile({ ...profile, license: v })}
              />
              <ProfileInput
                isEditing={isEditing}
                label="Emergency Email"
                value={profile.email}
                icon={<Mail size={18} />}
                onChange={(v) => setProfile({ ...profile, email: v })}
              />
              <ProfileInput
                isEditing={isEditing}
                label="Direct Hotline"
                value={profile.phone}
                icon={<Phone size={18} />}
                onChange={(v) => setProfile({ ...profile, phone: v })}
              />
              <div className="md:col-span-2">
                <ProfileInput
                  isEditing={isEditing}
                  label="Facility Address"
                  value={profile.address}
                  icon={<MapPin size={18} />}
                  onChange={(v) => setProfile({ ...profile, address: v })}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border-2 border-slate-200 p-10 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border-2 border-amber-100 shadow-inner">
                <Award size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Network Recognition
                </p>
                <p className="text-lg font-black text-slate-900 italic">
                  Premium Supply Partner 2026
                </p>
              </div>
            </div>
            <ChevronRight className="text-slate-200" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT HELPERS ---

const ProfileInput = ({ label, value, icon, isEditing, onChange }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
      {label}
    </label>
    <div
      className={`relative flex items-center transition-all ${isEditing ? "group" : ""}`}
    >
      <div
        className={`absolute left-4 transition-colors ${isEditing ? "text-[#B354A6]" : "text-slate-300"}`}
      >
        {icon}
      </div>
      <input
        disabled={!isEditing}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-12 pr-4 py-4 text-xs font-bold rounded-2xl transition-all outline-none border-2 ${
          isEditing
            ? "bg-white border-[#B354A6] shadow-lg shadow-[#B354A6]/5 text-slate-900"
            : "bg-slate-50 border-slate-100 text-slate-500 italic"
        }`}
      />
    </div>
  </div>
);

const Badge = ({ label, color }) => (
  <span
    className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 ${color}`}
  >
    {label}
  </span>
);

const MetricRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-white/10 pb-4">
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-xl font-black italic text-white tracking-tighter">
      {value}
    </span>
  </div>
);

export default HospitalProfile;
