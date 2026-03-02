// import React, { useState } from "react";
// import OTPInput from "otp-input-react";
// import axios from "axios";
// import { base_url } from "../utils/global_var.js";
// import { useLocation, useNavigate } from "react-router";
// import { ArrowLeft } from "lucide-react"; // Optional: icon for better UX

// export default function VerifyOtp() {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
//   const { state } = useLocation();
//   const [loading, setLoading] = useState(false);

//   // Extract email safely from navigation state
//   const email = state?.email || state;

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       alert("Please enter a valid 6-digit OTP");
//       return;
//     }

//     setLoading(true);
//     const payload = { email: email, otp: Number(otp) };

//     try {
//       const res = await axios.post(`${base_url}/auth/verifyOtp`, payload);
//       if (res.data.status) {
//         alert(res.data.message);
//         navigate("/admin/dashboard");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F4F8FB] px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#0F2854] flex items-center justify-center text-white text-xl">
//             🔐
//           </div>
//           <h2 className="text-2xl font-semibold text-[#0F2854]">
//             OTP Verification
//           </h2>
//           <p className="text-sm text-gray-500 mt-2">
//             Enter the 6-digit code sent to
//           </p>
//           <p className="text-sm font-medium text-[#1C4D8D]">
//             {email || "your email"}
//           </p>
//         </div>

//         {/* OTP Input */}
//         <div className="flex justify-center mb-8">
//           <OTPInput
//             value={otp}
//             onChange={setOtp}
//             OTPLength={6}
//             otpType="number"
//             disabled={loading}
//             autoFocus
//             inputStyles={{
//               width: "42px",
//               height: "52px",
//               margin: "0 6px",
//               fontSize: "20px",
//               fontWeight: "600",
//               borderRadius: "10px",
//               border: "1px solid #D1D5DB",
//               color: "#0F2854",
//               backgroundColor: "#FFFFFF",
//             }}
//             focusStyle={{
//               border: "2px solid #1C4D8D",
//             }}
//           />
//         </div>

//         {/* Button */}
//         <button
//           onClick={handleVerifyOtp}
//           disabled={loading}
//           className={`w-full py-3 rounded-xl font-medium transition
//           ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed text-white"
//               : "bg-[#0F2854] hover:bg-[#1C4D8D] text-white"
//           }`}
//         >
//           {loading ? "Verifying..." : "Verify & Continue"}
//         </button>

//         {/* Footer */}
//         <div className="mt-6 text-center text-sm text-gray-500">
//           Didn’t receive the code?{" "}
//           <button className="text-[#1C4D8D] font-medium hover:underline">
//             Resend
//           </button>
//         </div>

//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 text-xs text-gray-400 hover:text-[#0F2854] flex items-center justify-center gap-1"
//         >
//           <ArrowLeft size={14} /> Back to Sign In
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import OTPInput from "otp-input-react";
import axios from "axios";
import { base_url } from "../../utils/global_var.js";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, ShieldCheck, RefreshCw } from "lucide-react";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  // Extract email and role safely from navigation state
  const email = state?.email || "";
  const phone = state?.phone || "";
  const role = state?.role || "";

  const handleVerifyOtp = async () => {
    if (otp.trim().length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      let res;

      // ================= DONOR OTP =================
      if (role === "donor") {
        res = await axios.post(
          `${base_url}/auth/verify-phone-otp`,
          { phone, otp: otp.trim() },
          { withCredentials: true },
        );
      }
      // ================= EMAIL OTP =================
      else {
        res = await axios.post(
          `${base_url}/auth/verifyOtp`,
          { email, otp: otp.trim() },
          { withCredentials: true },
        );
      }

      if (res.data.status) {
        alert(`Success! ${res.data.message}`);

        // donor goes to donor form first
        if (role === "donor") {
          navigate("/donor/dashboard");
        } else {
          navigate(`/${res.data.user.role}/dashboard`);
        }
      } else {
        alert(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8FC] px-4">
      {/* Background Decoration */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#B354A6]/5 rounded-full blur-[100px]" />

      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(179,84,166,0.12)] p-10 border border-[#B354A6]/5 overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#B354A6]" />

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#B354A6]/10 flex items-center justify-center text-[#B354A6] shadow-inner">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Security Check
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">
            Enter the code sent to
          </p>
          <p className="text-xs font-black text-[#B354A6] mt-1 italic">
            {role === "donor" ? phone : email}
          </p>
        </div>

        {/* OTP Input Container */}
        <div className="flex justify-center mb-10">
          <OTPInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            disabled={loading}
            autoFocus
            inputStyles={{
              width: "45px",
              height: "55px",
              margin: "0 5px",
              fontSize: "22px",
              fontWeight: "900",
              borderRadius: "14px",
              border: "1.5px solid #F1F5F9",
              color: "#1E293B",
              backgroundColor: "#F8FAFC",
              transition: "all 0.2s ease",
            }}
            focusStyle={{
              border: "2px solid #B354A6",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 0 15px rgba(179,84,166,0.1)",
            }}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleVerifyOtp}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg
          ${
            loading
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-[#B354A6] text-white shadow-[#B354A6]/20 hover:bg-slate-900 hover:shadow-xl active:scale-95"
          }`}
        >
          {loading ? "Authorizing..." : "Verify & Access"}
        </button>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col gap-4 items-center">
          <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#B354A6] transition-colors group">
            <RefreshCw
              size={14}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            Resend Code
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </button>
        </div>
      </div>

      <p className="mt-10 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
        HemoHub Secure Layer • v2.0
      </p>
    </div>
  );
}
