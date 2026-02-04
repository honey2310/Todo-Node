import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../utils/global_var.js";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentuser, setCurrentuser] = useState({});

  useEffect(() => {
    getcurrentuser();
  }, []);

  const getcurrentuser = async () => {
    try {
      const res = await axios.get(`${base_url}/admin/get-currentuser`, {
        withCredentials: true,
      });
      if (res.data.status) {
        console.log(res.data.user);
        setCurrentuser(res.data.user);
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateUser = async (req, res) => {
    try {
      const res = await axios.put(`${base_url}/updateUser`, currentuser, {
        withCredentials: true,
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@company.com",
    role: "Super Admin",
    adminId: "ADM-001",
    department: "Operations",
    phone: "+91 98765 43210",
    location: "India (IST)",
    joined: "12 January 2025",
    lastLogin: "Today at 10:45 AM",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 mb-6">
        <img
          src="https://i.pravatar.cc/120"
          alt="Admin"
          className="w-24 h-24 rounded-full"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500">{profile.role}</p>
          <p className="text-sm text-gray-400 mt-1">{profile.email}</p>
        </div>

        <span className="px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          Active
        </span>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Account Information</h3>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-[#1C4D8D] font-medium"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Admin ID" value={profile.adminId} />
          <Info label="Role" value={profile.role} />

          {isEditing ? (
            <>
              <EditableField
                label="Full Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
              <EditableField
                label="Department"
                name="department"
                value={profile.department}
                onChange={handleChange}
              />
              <EditableField
                label="Phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
              <EditableField
                label="Location"
                name="location"
                value={profile.location}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <Info label="Department" value={profile.department} />
              <Info label="Phone" value={profile.phone} />
              <Info label="Location" value={profile.location} />
              <Info label="Joined On" value={profile.joined} />
            </>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 bg-[#1C4D8D] text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Security & Login</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Info label="Last Login" value={profile.lastLogin} />
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

const EditableField = ({ label, name, value, onChange }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1C4D8D]"
    />
  </div>
);

export default Profile;
