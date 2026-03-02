import {
  Calendar,
  Heart,
  Droplet,
  Activity,
  MapPin,
  ChevronRight,
  User,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  Navigation as NavIcon,
  Building2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../utils/global_var.js";

const DonorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    state: "Karnataka",
    address: "",
    bloodGroup: "",
    hemoglobin: "",
    bp: "",
    hospital: "",
  });

  const hospitals = [
    "City General Hospital",
    "Rotary Blood Bank",
    "Red Cross Medical Center",
    "St. Jude Memorial",
    "Metro Health Hub",
  ];

  // ===== Auto-fill form from backend =====
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${base_url}/donor/me`, {
          withCredentials: true,
        });

        const d = res.data.donor;

        // Ensure safe defaults if fields missing
        setFormData({
          firstName: d.firstName || "",
          lastName: d.lastName || "",
          email: d.email || "",
          phone: d.phone || "",
          dob: d.dob || "",
          address: d.address?.line || "",
          city: d.address?.city || "",
          state: d.address?.state || "",
          bloodGroup: d.bloodGroup || "",
          hospital: d.hospital || "",
          hemoglobin: d.health?.hemoglobin || "",
          bp: d.health?.bp || "",
        });
      } catch (err) {
        console.error("Error fetching donor profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ===== Form Change Handler =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== Submit Handler =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dob: formData.dob, // Backend expects 'dob' based on your controller
        bloodGroup: formData.bloodGroup,
        hospital: formData.hospital,
        hb: formData.hemoglobin, // Backend mapping
        bp: formData.bp,
        address: {
          line: formData.address, // This sends the string 'udhna'
          city: formData.city,
          state: formData.state,
        },
      };

      const res = await axios.post(
        `${base_url}/donor/complete-profile`,
        payload,
        { withCredentials: true },
      );

      alert("Medical Profile Updated Successfully ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update Failed ❌");
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center font-black text-slate-300 animate-pulse">
        SYNCING BIO-DATA...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20 p-6">
      <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-50 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B354A6] via-blue-500 to-[#B354A6]/20" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">
                Bio-Metric <span className="text-[#B354A6]">Check.</span>
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
                Syncing Profile:{" "}
                <span className="text-[#B354A6]">{formData.email}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
              <ShieldCheck size={14} /> Identity Verified
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* First Name */}
            <FormInput
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              icon={<User size={16} />}
            />
            {/* Last Name */}
            <FormInput
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              icon={<User size={16} />}
            />
            {/* Email */}
            <FormInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail size={16} />}
            />
            {/* Phone */}
            <FormInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              icon={<Phone size={16} />}
            />
            {/* DOB */}
            <FormInput
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              icon={<Calendar size={16} />}
            />

            {/* Blood Group */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#B354A6] uppercase tracking-widest ml-4">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none border-2 border-transparent focus:border-[#B354A6]/20 transition-all appearance-none"
              >
                {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* Hospital */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 group-focus-within:text-[#B354A6] transition-colors">
                Primary Facility
              </label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6]">
                  <Building2 size={16} />
                </div>
                <select
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none border-2 border-transparent focus:border-[#B354A6]/20 transition-all appearance-none shadow-inner"
                >
                  <option value="" disabled>
                    Select Hospital
                  </option>
                  {hospitals.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <FormInput
              label="Blood Pressure"
              name="bp"
              value={formData.bp}
              onChange={handleChange}
              placeholder="120/80"
              icon={<Activity size={16} />}
            />
            <FormInput
              label="Hemoglobin"
              name="hemoglobin"
              value={formData.hemoglobin}
              onChange={handleChange}
              placeholder="14.5"
              icon={<Droplet size={16} />}
            />
            <FormInput
              label="Street Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              icon={<MapPin size={16} />}
            />
            <FormInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              icon={<NavIcon size={16} />}
            />

            <div className="lg:col-span-3 mt-8 flex flex-col md:flex-row items-center gap-6 pt-8 border-t border-slate-50 dark:border-slate-800">
              <button
                type="submit"
                className="w-full md:w-fit px-12 py-4 bg-slate-900 dark:bg-[#B354A6] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:bg-[#B354A6] transition-all flex items-center justify-center gap-3"
              >
                Update Clinical Record <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Helper Input Component ---
const FormInput = ({
  label,
  placeholder,
  type = "text",
  icon,
  name,
  value,
  onChange,
}) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 group-focus-within:text-[#B354A6] transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6] transition-colors">
        {icon}
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none border-2 border-transparent focus:border-[#B354A6]/20 transition-all shadow-inner"
      />
    </div>
  </div>
);

export default DonorDashboard;
