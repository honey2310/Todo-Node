import React from "react";

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Reports & Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Insights into hiring performance and job activity
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-sm">
            Export PDF
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-sm">
            Export CSV
          </button>
        </div>
      </div>

      {/* ===== Filters ===== */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-8 flex flex-wrap gap-4">
        <select className="px-4 py-2 border rounded-lg text-sm">
          <option>Date Range</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>

        <select className="px-4 py-2 border rounded-lg text-sm">
          <option>Department</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Marketing</option>
        </select>

        <select className="px-4 py-2 border rounded-lg text-sm">
          <option>Status</option>
          <option>Open</option>
          <option>Closed</option>
          <option>Pending</option>
        </select>
      </div>

      {/* ===== KPI Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Jobs</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-1">42</h3>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Jobs</p>
          <h3 className="text-2xl font-semibold text-green-600 mt-1">18</h3>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Applications</p>
          <h3 className="text-2xl font-semibold text-blue-600 mt-1">1,248</h3>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Hires</p>
          <h3 className="text-2xl font-semibold text-purple-600 mt-1">36</h3>
        </div>
      </div>

      {/* ===== Charts Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Applications Over Time
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Monthly application trends
          </p>

          <div className="h-56 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-sm text-blue-600">
            Line Chart Placeholder
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Job Status Breakdown
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Distribution of job statuses
          </p>

          <div className="h-56 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center text-sm text-purple-600">
            Donut Chart Placeholder
          </div>
        </div>

      </div>

      {/* ===== Detailed Report Table ===== */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Job Title</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-center">Applications</th>
              <th className="px-6 py-4 text-center">Hires</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-800">
                Frontend Developer
              </td>
              <td className="px-6 py-4">Engineering</td>
              <td className="px-6 py-4 text-center">312</td>
              <td className="px-6 py-4 text-center">12</td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  Closed
                </span>
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-800">
                Backend Developer
              </td>
              <td className="px-6 py-4">Engineering</td>
              <td className="px-6 py-4 text-center">198</td>
              <td className="px-6 py-4 text-center">9</td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Reports;
