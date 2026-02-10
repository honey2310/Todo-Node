import React, { useState } from "react";
import OTPInput from "otp-input-react";
import axios from "axios";
import { base_url } from "../utils/global_var.js";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react"; // Optional: icon for better UX

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  // Extract email safely from navigation state
  const email = state?.email || state; 

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    const payload = { email: email, otp: Number(otp) };
    
    try {
      const res = await axios.post(`${base_url}/auth/verifyOtp`, payload);
      if (res.data.status) {
        alert(res.data.message);
        navigate("/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Outer Container with the same theme as AuthCard */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-[#0F2854] to-[#1C4D8D] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Security Check</h2>
          <p className="text-sm text-[#BDE8F5] mt-2">
            Verify your identity to access the dashboard
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12">
          <p className="text-center text-gray-600 mb-8">
            We've sent a 6-digit code to <br />
            <span className="font-semibold text-[#0F2854]">{email || "your email"}</span>
          </p>

          <div className="flex justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={loading}
              autoFocus
              className="otp-container"
              inputStyles={{
                width: "45px",
                height: "55px",
                margin: "0 5px",
                fontSize: "24px",
                fontWeight: "700",
                borderRadius: "12px",
                border: "2px solid #E2E8F0",
                color: "#0F2854",
                backgroundColor: "#F8FAFC",
                transition: "all 0.2s ease"
              }}
              focusStyle={{
                border: "2px solid #1C4D8D",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(28,77,141,0.15)"
              }}
            />
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className={`w-full mt-10 py-3 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98]
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0F2854] hover:bg-[#1C4D8D] text-white shadow-[#0F2854]/20"}`}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{" "}
              <button className="text-[#1C4D8D] font-bold hover:underline">
                Resend
              </button>
            </p>
            
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#0F2854] transition"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}