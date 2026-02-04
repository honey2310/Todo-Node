import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const stats = [
    { title: "Candidates", value: "1,250", note: "+12% this month" },
    { title: "Jobs Posted", value: "120", note: "+8 new jobs" },
    { title: "Recruiters", value: "35", note: "Active" },
    { title: "Revenue", value: "₹8.5L", note: "+18%" },
  ];

  const monthlyJobs = [
    { month: "Jan", jobs: 20 },
    { month: "Feb", jobs: 35 },
    { month: "Mar", jobs: 50 },
    { month: "Apr", jobs: 45 },
    { month: "May", jobs: 70 },
    { month: "Jun", jobs: 90 },
  ];

  const topEmployees = [
    { name: "Amit Sharma", role: "React Dev", applied: 15 },
    { name: "Priya Patel", role: "Designer", applied: 12 },
    { name: "Rahul Verma", role: "Backend Dev", applied: 10 },
  ];

  const revenueData = [
    { name: "Basic", value: 40 },
    { name: "Premium", value: 35 },
    { name: "Featured", value: 25 },
  ];

  const COLORS = ["#0F2854", "#1C4D8D", "#4988C4"];

  const employees = [
    {
      name: "Amit Sharma",
      email: "amit@gmail.com",
      role: "Candidate",
      jobs: 15,
      status: "Active",
    },
    {
      name: "Priya Patel",
      email: "priya@gmail.com",
      role: "Candidate",
      jobs: 12,
      status: "Active",
    },
    {
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      role: "Recruiter",
      jobs: 8,
      status: "Blocked",
    },
  ];

  return (
    <>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold text-[#0F2854]">
            Dashboard Overview
          </h2>
          <p className="text-gray-500">
            Monitor hiring, users, and revenue in one place
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.title}
              className="rounded-xl p-6 text-white bg-gradient-to-br from-[#1C4D8D] to-[#0F2854] shadow-lg"
            >
              <p className="text-sm opacity-80">{s.title}</p>
              <h3 className="text-3xl font-bold">{s.value}</h3>
              <p className="text-xs mt-2 opacity-80">{s.note}</p>
            </div>
          ))}
        </div>

        {/* CHART + TOP EMPLOYEES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-4 text-[#0F2854]">
              Hiring Trend
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyJobs}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  dataKey="jobs"
                  stroke="#1C4D8D"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-4 text-[#0F2854]">
              Top Employees
            </h3>
            {topEmployees.map((e) => (
              <div
                key={e.name}
                className="flex justify-between py-3 border-b last:border-none"
              >
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="text-sm text-gray-500">{e.role}</p>
                </div>
                <span className="font-semibold">
                  {e.applied} jobs
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* REVENUE + INSIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-4 text-[#0F2854]">
              Revenue Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {revenueData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gradient-to-br from-[#BDE8F5] to-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-3 text-[#0F2854]">
              Admin Insight
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Hiring activity increased by <strong>18%</strong> this month.
              React & Backend roles are trending.
              Premium job postings generate the highest revenue.
            </p>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold mb-4 text-[#0F2854]">
            Employees & Recruiters
          </h3>

          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Jobs</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.email} className="border-b hover:bg-gray-50">
                  <td className="py-3">{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>{e.jobs}</td>
                  <td
                    className={`font-semibold ${
                      e.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {e.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}
