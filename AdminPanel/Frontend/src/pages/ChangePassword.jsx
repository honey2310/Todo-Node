import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePasswordModal = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangePassword = () => {
    // API call or validation logic
    alert("Password changed successfully!");
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4988C4] transition";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border-t-4 border-[#1C4D8D] relative">
        
        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1C4D8D] font-medium hover:underline"
        >
          Cancel
        </button>

        <h2 className="text-2xl font-semibold text-[#0F2854] text-center mb-6">
          Change Password
        </h2>

        {/* Current Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword.current ? "text" : "password"}
            placeholder="Current Password"
            className={inputClasses}
          />
          <button
            type="button"
            onClick={() => toggleShow("current")}
            className="absolute right-3 top-3 text-gray-500 text-lg"
          >
            {showPassword.current ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        {/* New Password */}
        <div className="mb-1 relative">
          <input
            type={showPassword.new ? "text" : "password"}
            placeholder="New Password"
            className={inputClasses}
          />
          <button
            type="button"
            onClick={() => toggleShow("new")}
            className="absolute right-3 top-3 text-gray-500 text-lg"
          >
            {showPassword.new ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Keep it up! Longer and random passwords are more secure.
        </p>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <input
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Confirm New Password"
            className={inputClasses}
          />
          <button
            type="button"
            onClick={() => toggleShow("confirm")}
            className="absolute right-3 top-3 text-gray-500 text-lg"
          >
            {showPassword.confirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        {/* Change Password Button */}
        <button
          onClick={handleChangePassword}
          className="w-full bg-[#1C4D8D] hover:bg-[#0F2854] text-white py-3 rounded-xl font-medium text-lg shadow-md transition"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
