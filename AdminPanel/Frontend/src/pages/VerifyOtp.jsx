import React, { useState } from "react";
import OTPInput from "otp-input-react";
import axios from "axios";
import { base_url } from "../utils/global_var.js";
import { useLocation, useNavigate } from "react-router";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { state } = useLocation();

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    const user = { email: state, otp: Number(otp) };
    try {
      const res = await axios.post(`${base_url}/auth/verifyOtp`, user);
      if (res.data.status) {
        alert(res.data.message);
        navigate("/profile");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border-t-4 border-[#1C4D8D]">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#0F2854] text-center">
          OTP Verification
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center mt-10">
          <OTPInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            autoFocus
            inputStyles={{
              width: "52px",
              height: "52px",
              margin: "0 6px",
              fontSize: "20px",
              fontWeight: "600",
              borderRadius: "14px",
              border: "2px solid #CBD5E1",
              color: "#0F2854",
              outline: "none",
            }}
            focusStyle={{
              border: "2px solid #1C4D8D",
              boxShadow: "0 0 0 3px rgba(28,77,141,0.2)",
            }}
          />
        </div>

        {/* Resend */}
        <div className="mt-6 text-center">
          <button className="text-sm font-medium text-[#1C4D8D] hover:underline">
            Resend OTP
          </button>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOtp}
          className="w-full mt-8 bg-[#1C4D8D] hover:bg-[#0F2854] text-white py-3 rounded-xl font-semibold text-lg shadow-md transition"
        >
          Verify & Sign In
        </button>
      </div>
    </div>
  );
}
