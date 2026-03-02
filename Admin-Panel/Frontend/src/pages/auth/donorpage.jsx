import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Droplet,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../utils/global_var";

const DonorOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    address: "",
    city: "",
    bloodGroup: "",
  });

  // ===== Fetch current donor for auto-fill =====
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await axios.get(`${base_url}/donor/me`, {
          withCredentials: true,
        });

        if (res.data.status && res.data.donor) {
          const d = res.data.donor;

          // Split first and last name from authUser.name if donor names not present
          const firstName =
            d.firstName || d.name?.split(" ")[0] || "";
          const lastName =
            d.lastName || d.name?.split(" ")[1] || "";

          setFormData({
            firstName,
            lastName,
            email: d.email || "",
            dob: d.dob?.split("T")[0] || "",
            address: d.address?.line || "",
            city: d.address?.city || "",
            bloodGroup: d.bloodGroup || "",
          });
        }
      } catch (err) {
        console.error("Error fetching donor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFinish = async () => {
    try {
      const res = await axios.post(
        `${base_url}/donor/complete-profile`,
        formData,
        { withCredentials: true }
      );

      if (res.data.status) {
        alert("Profile setup complete!");
        navigate("/donor/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center font-black text-slate-300 animate-pulse">
        SYNCING BIO-DATA...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDF8FC] flex items-center justify-center p-6 relative selection:bg-[#B354A6]/20">
      {/* Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#B354A6]/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="w-16 h-16 bg-[#B354A6] rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-[#B354A6]/30 mb-6">
            <Droplet size={32} fill="currentColor" />
          </div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#B354A6] mb-2">
            Node Initialization
          </h2>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
            Donor Profile Setup
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8 px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                step >= i ? "bg-[#B354A6]" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-100 p-10 shadow-[0_40px_80px_rgba(179,84,166,0.08)] relative overflow-hidden">
          {/* Step 1: Name + Email */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  icon={<User size={18} />}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(v) => handleChange("firstName", v)}
                />
                <FormInput
                  icon={<User size={18} />}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(v) => handleChange("lastName", v)}
                />
              </div>
              <FormInput
                icon={<Mail size={18} />}
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(v) => handleChange("email", v)}
              />
              <button
                onClick={nextStep}
                className="w-full flex items-center justify-between px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#B354A6] transition-all group"
              >
                Continue{" "}
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          )}

          {/* Step 2: DOB */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <FormInput
                icon={<Calendar size={18} />}
                placeholder="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(v) => handleChange("dob", v)}
              />
              <div className="flex gap-4">
                <NavButton onClick={prevStep} icon={<ArrowLeft size={20} />} />
                <button
                  onClick={nextStep}
                  className="flex-1 flex items-center justify-between px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#B354A6] transition-all group"
                >
                  Verify Date{" "}
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <FormInput
                icon={<MapPin size={18} />}
                placeholder="Full Residential Address"
                type="textarea"
                value={formData.address}
                onChange={(v) => handleChange("address", v)}
              />
              <div className="flex gap-4">
                <NavButton onClick={prevStep} icon={<ArrowLeft size={20} />} />
                <button
                  onClick={handleFinish}
                  className="flex-1 flex items-center justify-center gap-4 px-10 py-5 bg-[#B354A6] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#B354A6]/40 hover:bg-slate-900 transition-all group"
                >
                  Sync to Network <CheckCircle2 size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
          Encrypted Session • Hemohub Protocol v2.0
        </p>
      </div>
    </div>
  );
};

// --- Helper Components ---
const FormInput = ({ icon, placeholder, value, onChange, type = "text" }) => (
  <div className="relative group">
    {icon && (
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6] transition-colors">
        {icon}
      </div>
    )}
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-[#B354A6]/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 resize-none"
      />
    ) : (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-[#B354A6]/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
      />
    )}
  </div>
);

const NavButton = ({ onClick, icon }) => (
  <button
    onClick={onClick}
    className="p-5 bg-slate-100 text-slate-400 rounded-2xl hover:text-slate-900 transition-all"
  >
    {icon}
  </button>
);

export default DonorOnboarding;