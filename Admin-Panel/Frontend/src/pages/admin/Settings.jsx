import React, { useState,useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Edit3,
  Camera,
  Save,
  Lock,
  Zap,
  ChevronRight,
  UserCheck,
  Key,
  GraduationCap,
  MapPin,
  BookOpen,
  Fingerprint,
  RefreshCcw,
} from "lucide-react";
import axios from "axios";
import { base_url } from "../../utils/global_var";

const AdminSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    birthdate: "",
    location: "",
    role: "",
    education: "",
    phone: "",
  });

  useEffect(() => {
    fetchCurrentAdmin();
  }, []);

  const fetchCurrentAdmin = async () => {
    try {
      const res = await axios.get(`${base_url}/admin/get-currentUser`, {
        withCredentials: true,
      });

      if (res.data.status) {
        setAdmin(res.data.user);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load admin profile");
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${base_url}/admin/update-user`, admin, {
        withCredentials: true,
      });

      alert(res.data.message);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-700 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-[#B354A6]" size={18} />
            <span className="text-[10px] font-black text-[#B354A6] uppercase tracking-[0.3em]">
              Identity Hub
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">
            Admin <span className="text-[#B354A6]">Profile</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest">
            Authorized Administrative Node Configuration
          </p>
        </div>

        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border-2 border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
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
              <Edit3 size={16} /> Edit Identity
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
                  <img
                    src="https://i.pravatar.cc/150?u=admin"
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white cursor-pointer">
                      <Camera size={24} />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-2 rounded-xl border-4 border-white">
                  <ShieldCheck size={18} />
                </div>
              </div>
              <div className="text-center mt-6">
                <h2 className="text-2xl font-black text-slate-900 italic tracking-tight">
                  {admin.name}
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                  {admin.role}
                </p>
                <div className="flex justify-center gap-2 mt-6">
                  <Badge
                    label="Lvl 10 Auth"
                    color="text-[#B354A6] bg-[#B354A6]/5 border-[#B354A6]/10"
                  />
                  <Badge
                    label="Verified"
                    color="text-emerald-600 bg-emerald-50 border-emerald-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* NODE METRICS */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden border-2 border-slate-800">
            <Fingerprint
              size={140}
              className="absolute -right-10 -bottom-10 text-white/5"
            />
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">
              Security Metrics
            </h4>
            <div className="space-y-6 relative z-10">
              <MetricRow label="Last Login" value="10m ago" />
              <MetricRow label="IP Address" value="192.168.1.1" />
              <MetricRow label="Node Status" value="Encrypted" />
            </div>
          </div>
        </div>

        {/* RIGHT: DATA FORMS */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3rem] border-2 border-slate-200 p-10 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10 flex items-center gap-3 italic">
              <UserCheck className="text-[#B354A6]" size={20} /> Identity Core
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <SettingsInput
                isEditing={isEditing}
                label="Full Name"
                value={admin.name}
                icon={<User size={18} />}
                onChange={(v) => setAdmin({ ...admin, name: v })}
              />
              <SettingsInput
                isEditing={isEditing}
                label="Corporate Email"
                value={admin.email}
                icon={<Mail size={18} />}
                onChange={(v) => setAdmin({ ...admin, email: v })}
              />
              <SettingsInput
                isEditing={isEditing}
                label="Date of Birth"
                value={admin.birthdate}
                type="date"
                icon={<Calendar size={18} />}
                onChange={(v) => setAdmin({ ...admin, birthdate: v })}
              />
              <SettingsInput
                isEditing={isEditing}
                label="Direct Hotline"
                value={admin.phone}
                icon={<Phone size={18} />}
                onChange={(v) => setAdmin({ ...admin, phone: v })}
              />
              <SettingsInput
                isEditing={isEditing}
                label="Educational Degree"
                value={admin.education}
                icon={<BookOpen size={18} />}
                onChange={(v) => setAdmin({ ...admin, education: v })}
              />
              <SettingsInput
                isEditing={isEditing}
                label="Current Role"
                value={admin.role}
                icon={<ShieldCheck size={18} />}
                onChange={(v) => setAdmin({ ...admin, role: v })}
              />

              <div className="md:col-span-2">
                <SettingsInput
                  isEditing={isEditing}
                  label="Assigned Location / Branch"
                  value={admin.location}
                  icon={<MapPin size={18} />}
                  onChange={(v) => setAdmin({ ...admin, location: v })}
                />
              </div>
            </div>
          </div>

          {/* PASSWORD & SECURITY SECTION */}
          <div className="bg-white rounded-[3rem] border-2 border-slate-200 p-10 shadow-sm overflow-hidden relative group">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
                  <Lock size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 italic tracking-tight">
                    Security Credentials
                  </h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    Manage encryption & access keys
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-3 px-10 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#B354A6] hover:bg-[#B354A6] hover:text-white hover:border-[#B354A6] transition-all shadow-sm">
                <RefreshCcw size={16} /> Change System Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPERS ---
const SettingsInput = ({
  label,
  value,
  icon,
  isEditing,
  onChange,
  type = "text",
}) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
      {label}
    </label>
    <div className="relative flex items-center transition-all group">
      <div
        className={`absolute left-4 transition-colors ${isEditing ? "text-[#B354A6]" : "text-slate-300"}`}
      >
        {icon}
      </div>
      <input
        disabled={!isEditing}
        value={value}
        type={type}
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

export default AdminSettings;
