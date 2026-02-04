import React, { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  Palette,
  Users,
  Briefcase,
  Layers,
  Activity,
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2854]">Settings</h1>
        <p className="text-gray-500">
          Manage platform configuration and preferences
        </p>
      </div>

      {/* Layout */}
      <div className="flex gap-6">
        {/* Mini Sidebar */}
        <div className="w-64 bg-white rounded-xl shadow-lg p-4 h-fit">
          <SettingsItem
            icon={<Settings size={18} />}
            label="General"
            active={activeTab === "general"}
            onClick={() => setActiveTab("general")}
          />
          <SettingsItem
            icon={<Shield size={18} />}
            label="Account & Security"
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <SettingsItem
            icon={<Users size={18} />}
            label="Roles & Permissions"
            active={activeTab === "roles"}
            onClick={() => setActiveTab("roles")}
          />
          <SettingsItem
            icon={<Briefcase size={18} />}
            label="Job Rules"
            active={activeTab === "jobs"}
            onClick={() => setActiveTab("jobs")}
          />
          <SettingsItem
            icon={<Layers size={18} />}
            label="Category Rules"
            active={activeTab === "categories"}
            onClick={() => setActiveTab("categories")}
          />
          <SettingsItem
            icon={<Bell size={18} />}
            label="Notifications"
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
          <SettingsItem
            icon={<Palette size={18} />}
            label="Appearance"
            active={activeTab === "appearance"}
            onClick={() => setActiveTab("appearance")}
          />
          <SettingsItem
            icon={<Activity size={18} />}
            label="Audit Logs"
            active={activeTab === "logs"}
            onClick={() => setActiveTab("logs")}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "roles" && <RolesPermissionsSettings />}

          {activeTab !== "general" && activeTab !== "security" && (
            <Placeholder title={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- GENERAL SETTINGS ---------------- */

function GeneralSettings() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">General Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Platform Name" placeholder="Job Portal Admin" />
        <Input label="Support Email" placeholder="support@company.com" />
        <Input label="Support Phone" placeholder="+91 98765 43210" />
        <Input label="Default Language" placeholder="English" />
        <Input label="Currency" placeholder="INR (₹)" />
        <Input label="Time Zone" placeholder="Asia/Kolkata" />
      </div>

      {/* Maintenance Mode */}
      <div className="mt-6 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="font-medium">Maintenance Mode</p>
          <p className="text-sm text-gray-500">
            Temporarily disable the platform for users
          </p>
        </div>
        <Toggle />
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 rounded-lg bg-[#1C4D8D] text-white hover:opacity-90">
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function SettingsItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition
        ${
          active ? "bg-[#1C4D8D] text-white" : "text-gray-600 hover:bg-gray-100"
        }
      `}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function Input({ label, placeholder }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        placeholder={placeholder}
        className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
      />
    </div>
  );
}

function Toggle() {
  return (
    <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="h-64 flex items-center justify-center text-gray-400">
      <p className="text-lg capitalize">
        {title.replace("-", " ")} settings coming soon 🚧
      </p>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account & Security</h2>

      {/* Change Password */}
      <SectionCard title="Change Password" desc="Update your admin password">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm Password" type="password" />
        </div>
        <ActionBar />
      </SectionCard>

      {/* Two Factor Auth */}
      <SectionCard
        title="Two-Factor Authentication (2FA)"
        desc="Add an extra layer of security to your account"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable 2FA</p>
            <p className="text-sm text-gray-500">Require OTP during login</p>
          </div>
          <Toggle />
        </div>
      </SectionCard>

      {/* Session Management */}
      <SectionCard
        title="Session Management"
        desc="Control login sessions and auto logout"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Session Timeout (minutes)" placeholder="30" />
          <Input label="Max Active Sessions" placeholder="3" />
        </div>
        <ActionBar />
      </SectionCard>

      {/* Login Rules */}
      <SectionCard title="Login Protection" desc="Prevent brute-force attacks">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Max Login Attempts" placeholder="5" />
          <Input label="Lockout Duration (minutes)" placeholder="15" />
        </div>
        <ActionBar />
      </SectionCard>

      {/* Password Policy */}
      <SectionCard title="Password Policy" desc="Enforce strong passwords">
        <div className="space-y-3">
          <CheckItem label="Minimum 8 characters" />
          <CheckItem label="At least one uppercase letter" />
          <CheckItem label="At least one number" />
          <CheckItem label="At least one special character" />
        </div>
      </SectionCard>

      {/* Security Info */}
      <SectionCard
        title="Security Information"
        desc="Last security-related activity"
      >
        <ul className="text-sm text-gray-600 list-disc ml-5">
          <li>Last password change: 10 days ago</li>
          <li>Last login: Today at 6:45 PM</li>
          <li>Last IP: 192.168.1.12</li>
        </ul>
      </SectionCard>
    </div>
  );
  function SectionCard({ title, desc, children }) {
    return (
      <div className="bg-gray-50 p-5 rounded-xl mb-6">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{desc}</p>
        {children}
      </div>
    );
  }

  function ActionBar() {
    return (
      <div className="mt-4 flex justify-end">
        <button className="px-5 py-2 rounded-lg bg-[#1C4D8D] text-white">
          Save
        </button>
      </div>
    );
  }

  function CheckItem({ label }) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" defaultChecked />
        <span>{label}</span>
      </div>
    );
  }
}

function RolesPermissionsSettings() {
  const [activeRole, setActiveRole] = useState("Admin");

  const roles = [
    { name: "Super Admin", desc: "Full system access" },
    { name: "Admin", desc: "Manage jobs, users, categories" },
    { name: "HR Manager", desc: "Manage hiring & candidates" },
    { name: "Recruiter", desc: "Post and manage jobs" },
    { name: "Viewer", desc: "Read-only access" },
  ];

  const permissionGroups = [
    {
      group: "Job Management",
      permissions: [
        "View Jobs",
        "Create Jobs",
        "Edit Jobs",
        "Delete Jobs",
        "Approve Jobs",
      ],
    },
    {
      group: "Category Management",
      permissions: [
        "View Categories",
        "Create Categories",
        "Edit Categories",
        "Disable Categories",
      ],
    },
    {
      group: "User Management",
      permissions: [
        "View Users",
        "Create Users",
        "Edit Users",
        "Disable Users",
      ],
    },
    {
      group: "Analytics",
      permissions: ["View Dashboard", "View Reports", "Export Data"],
    },
    {
      group: "Settings",
      permissions: ["View Settings", "Edit Settings", "Manage Roles"],
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Roles & Permissions</h2>

      <div className="flex gap-6">
        {/* Role Selector */}
        <div className="w-64 space-y-3">
          {roles.map((role) => (
            <button
              key={role.name}
              onClick={() => setActiveRole(role.name)}
              className={`w-full text-left p-4 rounded-xl border transition ${
                activeRole === role.name
                  ? "border-[#1C4D8D] bg-blue-50"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">{role.name}</p>
              <p className="text-sm text-gray-500">{role.desc}</p>
            </button>
          ))}
        </div>

        {/* Permissions Panel */}
        <div className="flex-1 bg-gray-50 rounded-xl p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Editing permissions for</p>
            <h3 className="text-lg font-bold">{activeRole}</h3>
          </div>

          {permissionGroups.map((group) => (
            <div
              key={group.group}
              className="mb-6 bg-white p-4 rounded-xl shadow-sm"
            >
              <h4 className="font-semibold mb-3">{group.group}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.permissions.map((perm) => (
                  <PermissionToggle key={perm} label={perm} />
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 bg-[#1C4D8D] text-white rounded-lg">
              Save Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PermissionToggle({ label }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
      <span className="text-sm">{label}</span>
      <Toggle />
    </div>
  );
}