import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";
import Toast from "./Toast";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || ""; // email from signin

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setToast({ message: "Enter OTP", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/verify",
        { email: userEmail, otp },
        { withCredentials: true }
      );

      if (res.data.success) {
        setToast({ message: "OTP verified successfully", type: "success" });
        setTimeout(() => navigate("/home"), 1200);
      } else {
        alert(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "OTP verification failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 relative">
        <div className="absolute left-0 top-0 h-full w-2 bg-[#B17457] rounded-l-3xl" />

        <h2 className="text-3xl font-bold text-[#4A4947] mb-6 text-center">
          OTP Verification
        </h2>
        <p className="text-[#4A4947] opacity-80 mb-6 text-center">
          We sent an OTP to <span className="font-semibold">{userEmail}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#B17457] text-center text-lg tracking-widest"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#B17457] text-white rounded-full shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center text-sm text-[#4A4947] mt-6">
          Didn't receive OTP?{" "}
          <span
            onClick={async () => {
              setLoading(true);
              try {
                const resend = await axios.post(
                  "http://localhost:4000/send",
                  { email: userEmail },
                  { withCredentials: true }
                );
                alert(resend.data.message || "OTP resent!");
              } catch (err) {
                alert(err.response?.data?.message || "Failed to resend OTP");
              } finally {
                setLoading(false);
              }
            }}
            className="text-[#B17457] font-semibold cursor-pointer"
          >
            Resend
          </span>
        </p>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </div>
  );
}
