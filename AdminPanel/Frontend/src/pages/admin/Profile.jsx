import React from "react";

const Profile = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      {/* Top Profile Header */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 mb-6">
        <img
          src="https://i.pravatar.cc/120"
          alt="Admin"
          className="w-24 h-24 rounded-full"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold">Admin User</h2>
          <p className="text-gray-500">Super Admin</p>
          <p className="text-sm text-gray-400 mt-1">
            admin@company.com
          </p>
        </div>

        <span className="px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          Active
        </span>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Admin ID" value="ADM-001" />
          <Info label="Role" value="Super Admin" />
          <Info label="Department" value="Operations" />
          <Info label="Phone" value="+91 98765 43210" />
          <Info label="Location" value="India (IST)" />
          <Info label="Joined On" value="12 January 2025" />
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          Security & Login
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Info label="Last Login" value="Today at 10:45 AM" />
          <Info label="Login Method" value="Email & Password" />
        </div>

        <div className="flex justify-end">
          <button className="px-5 py-2 bg-[#1C4D8D] text-white rounded-lg">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default Profile;
