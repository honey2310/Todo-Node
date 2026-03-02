import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/global_var";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Mail,
  Lock,
  User,
  Droplet,
  Building2,
  ShieldCheck,
  Eye,
  EyeOff,
  Phone,
} from "lucide-react";

const AuthCard = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("donor");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAuth = async () => {
    try {
      let res;

      // ================= DONOR FLOW =================
      if (role === "donor") {
        // send phone OTP directly
        res = await axios.post(`${base_url}/auth/send-phone-otp`, {
          phone: form.phone,
        });

        alert(res.data.message);

        if (res.data.status) {
          navigate("/verify-otp", {
            state: {
              phone: form.phone,
              role: "donor",
            },
          });
        }

        return;
      }

      // ================= ADMIN / HOSPITAL =================
      const endpoint = isSignup ? "/auth/signup" : "/auth/signin";

      const payload = isSignup
        ? { ...form, role }
        : { email: form.email, password: form.password, role };

      res = await axios.post(`${base_url}${endpoint}`, payload);

      alert(res.data.message);

      if (res.data.status) {
        navigate("/verify-otp", {
          state: { email: form.email, role },
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8FC] px-4">
      {/* 1. ROLE SELECTOR */}
      <div className="flex bg-white/80 backdrop-blur-md p-1 rounded-2xl shadow-sm border border-[#B354A6]/10 mb-8 relative z-30">
        <RoleTab
          active={role === "donor"}
          onClick={() => setRole("donor")}
          icon={<User size={13} />}
          label="Donor"
        />
        <RoleTab
          active={role === "hospital"}
          onClick={() => setRole("hospital")}
          icon={<Building2 size={13} />}
          label="Hospital"
        />
        {!isSignup && (
          <RoleTab
            active={role === "admin"}
            onClick={() => setRole("admin")}
            icon={<ShieldCheck size={13} />}
            label="Admin"
          />
        )}
      </div>

      <div className="relative w-full max-w-4xl h-[520px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(179,84,166,0.12)] overflow-hidden flex border border-[#B354A6]/5">
        {/* SLIDING PANEL */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-[#B354A6] text-white p-12 transition-transform duration-700 ease-in-out z-20 flex flex-col justify-center items-center text-center ${isSignup ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6">
            <Droplet size={32} fill="white" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight">
            {isSignup ? "Welcome Back!" : "HemoHub Network"}
          </h2>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="mt-10 border-2 border-white/30 px-10 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#B354A6] transition-all"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </div>

        <div className="relative grid grid-cols-2 w-full h-full">
          {/* SIGN IN FORM */}
          <div
            className={`p-14 flex flex-col justify-center transition-all duration-700 ${isSignup ? "opacity-0 invisible scale-95" : "opacity-100 visible scale-100"}`}
          >
            <h2 className="text-3xl font-black text-slate-800 mb-2">Sign In</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
              Accessing {role} portal
            </p>

            <div className="space-y-4">
              {role === "donor" ? (
                <InputBox
                  icon={<Phone size={16} />}
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={form.phone}
                />
              ) : (
                <>
                  <InputBox
                    icon={<Mail size={16} />}
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                  />
                  <div className="relative group">
                    <InputBox
                      icon={<Lock size={16} />}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={handleChange}
                      value={form.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleAuth}
              className="mt-8 bg-[#B354A6] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95"
            >
              Verify Identity
            </button>
          </div>

          {/* SIGN UP FORM */}
          <div
            className={`p-14 flex flex-col justify-center transition-all duration-700 ${isSignup ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"}`}
          >
            <h2 className="text-3xl font-black text-slate-800 mb-2">
              Register
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
              Joining as {role}
            </p>
            <div className="space-y-4">
              {role === "donor" ? (
                <InputBox
                  icon={<Phone size={16} />}
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={form.phone}
                />
              ) : (
                <>
                  <InputBox
                    icon={<User size={16} />}
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    value={form.name}
                  />
                  <InputBox
                    icon={<Mail size={16} />}
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                  />
                  <InputBox
                    icon={<Lock size={16} />}
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                  />
                </>
              )}
            </div>
            <button
              onClick={handleAuth}
              className="mt-8 bg-slate-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95"
            >
              Join Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPERS ---
const RoleTab = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? "bg-[#B354A6] text-white shadow-lg" : "text-slate-400 hover:text-[#B354A6]"}`}
  >
    {icon} {label}
  </button>
);

const InputBox = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-none rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#B354A6]/10 focus:bg-white transition-all"
    />
  </div>
);

export default AuthCard;
