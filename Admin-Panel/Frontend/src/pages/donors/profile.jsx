import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Calendar, Edit3, Camera, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import { base_url } from "../../utils/global_var.js";

const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", dateOfBirth: "", address: "" });

  useEffect(() => { fetchDonor(); }, []);

  const fetchDonor = async () => {
    try {
      const res = await axios.get(`${base_url}/donor/me`, { withCredentials: true });
      const d = res.data.donor;
      setDonor(d);
      setForm({
        name: d.name || "",
        email: d.email || "", 
        phone: d.phone || "",
        dateOfBirth: d.dateOfBirth?.split('T')[0] || "",
        address: d.address?.line || "",
      });
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${base_url}/donor/${donor._id}`, {
        ...form,
        address: { line: form.address, city: donor.address?.city || "" },
      }, { withCredentials: true });

      // FIX: Merging the local form data (email/name) with the response
      // This prevents the email from disappearing if the backend doesn't return it
      setDonor({ ...res.data.donor, email: form.email, name: form.name });
      setEditing(false);
      alert("Profile Sync Successful");
    } catch (err) {
      alert("Update Failed");
    } finally { setLoading(false); }
  };

  if (!donor) return <div className="h-screen flex items-center justify-center text-slate-400 font-light tracking-widest animate-pulse">LOADING PROFILE...</div>;

  return (
    <div className="min-h-screen bg-[#FDFCFD] py-16 px-4 relative overflow-hidden">
      {/* Soft Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B354A6]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto">
        
        {/* Main Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] overflow-hidden">
          
          {/* Header Banner */}
          <div className="h-40 bg-slate-900 relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <button 
              onClick={() => setEditing(!editing)}
              className="absolute top-8 right-8 z-20 flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              {editing ? "Discard Changes" : <><Edit3 size={14} /> Edit Profile</>}
            </button>
          </div>

          <div className="px-12 pb-12">
            {/* Avatar & Basic Info */}
            <div className="relative flex flex-col md:flex-row items-end gap-6 -mt-16 mb-12">
              <div className="relative group">
                <img 
                  src={donor.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jugal"} 
                  className="w-36 h-36 rounded-3xl object-cover border-[8px] border-white shadow-xl bg-white" 
                  alt="avatar"
                />
                <button className="absolute -bottom-2 -right-2 p-3 bg-[#B354A6] text-white rounded-2xl shadow-lg border-4 border-white transform group-hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              </div>
              
              <div className="mb-2">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  {donor.name}
                  <ShieldCheck className="text-blue-500" size={24} />
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mt-1 italic">
                  Member since {new Date(donor.createdAt).getFullYear()}
                </p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              
              <ProfileField icon={<Mail />} label="Email Address" name="email" value={form.email} editing={editing} onChange={(val) => setForm({...form, email: val})} />
              <ProfileField icon={<Phone />} label="Primary Contact" name="phone" value={form.phone} editing={editing} onChange={(val) => setForm({...form, phone: val})} />
              <ProfileField icon={<Calendar />} label="Birth Date" name="dateOfBirth" value={form.dateOfBirth} editing={editing} type="date" onChange={(val) => setForm({...form, dateOfBirth: val})} />
              <ProfileField icon={<MapPin />} label="Residential Area" name="address" value={form.address} editing={editing} onChange={(val) => setForm({...form, address: val})} />

            </div>

            {/* Bottom Stats Banner */}
            <div className="mt-16 flex flex-wrap gap-4 pt-8 border-t border-slate-50">
               <StatBadge icon={<Heart className="text-red-500" />} label="Blood Group" value={donor.bloodGroup || "O+"} />
               <StatBadge icon={<ShieldCheck className="text-emerald-500" />} label="Status" value="Active Donor" />
            </div>

            {editing && (
              <button 
                onClick={handleUpdate}
                disabled={loading}
                className="w-full mt-12 bg-slate-900 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#B354A6] hover:shadow-[0_20px_40px_rgba(179,84,166,0.3)] transition-all flex items-center justify-center gap-3"
              >
                {loading ? "Synchronizing..." : <>Save Profile Data <ArrowRight size={16} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const ProfileField = ({ icon, label, value, editing, onChange, type = "text" }) => (
  <div className="relative group">
    <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 transition-colors group-hover:text-[#B354A6]">
      {React.cloneElement(icon, { size: 14 })}
      {label}
    </div>
    {editing ? (
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full text-base font-bold text-slate-800 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 ring-[#B354A6]/20 outline-none transition-all"
      />
    ) : (
      <p className="text-base font-bold text-slate-800 pl-1">{value || "Not Provided"}</p>
    )}
  </div>
);

const StatBadge = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{label}</p>
      <p className="text-sm font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default DonorProfile;