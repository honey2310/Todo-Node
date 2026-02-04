import React from "react";

const JobManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Job Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all job postings across the organization
          </p>
        </div>

        <button className="mt-4 md:mt-0 px-5 py-2.5 rounded-lg bg-[#1C4D8D] text-white text-sm font-medium hover:bg-[#0F2854] transition">
          + Add New Job
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Search by title, ID, location..."
            className="px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4988C4]/40"
          />
          <select className="px-4 py-2.5 border rounded-lg text-sm bg-white">
            <option>Department</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
          <select className="px-4 py-2.5 border rounded-lg text-sm bg-white">
            <option>Status</option>
            <option>Open</option>
            <option>Pending</option>
            <option>Closed</option>
          </select>
          <select className="px-4 py-2.5 border rounded-lg text-sm bg-white">
            <option>Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="px-4 py-2.5 border rounded-lg text-sm bg-white">
            <option>Visibility</option>
            <option>Public</option>
            <option>Internal</option>
          </select>
          <select className="px-4 py-2.5 border rounded-lg text-sm bg-white">
            <option>Sort by</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Job</th>
              <th className="px-6 py-4 text-left font-medium">Department</th>
              <th className="px-6 py-4 text-left font-medium">Vacancies</th>
              <th className="px-6 py-4 text-left font-medium">Applications</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {/* Job 1 */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="font-medium text-gray-800">
                  Senior Frontend Developer
                </p>
                <p className="text-xs text-gray-500">
                  JB-10234 · Bangalore · Full Time
                </p>
              </td>
              <td className="px-6 py-4 text-gray-600">Engineering</td>
              <td className="px-6 py-4 text-gray-600">5</td>
              <td className="px-6 py-4 text-gray-600">124</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  Open
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <button className="px-3 py-1.5 text-xs rounded-lg bg-gray-100">
                  View
                </button>
                <button className="px-3 py-1.5 text-xs rounded-lg bg-blue-100 text-blue-700">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-xs rounded-lg bg-red-100 text-red-600">
                  Delete
                </button>
              </td>
            </tr>

            {/* Job 2 */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="font-medium text-gray-800">
                  Backend Developer
                </p>
                <p className="text-xs text-gray-500">
                  JB-10235 · Pune · Full Time
                </p>
              </td>
              <td className="px-6 py-4 text-gray-600">Engineering</td>
              <td className="px-6 py-4 text-gray-600">3</td>
              <td className="px-6 py-4 text-gray-600">98</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <button className="px-3 py-1.5 text-xs rounded-lg bg-gray-100">
                  View
                </button>
                <button className="px-3 py-1.5 text-xs rounded-lg bg-blue-100 text-blue-700">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-xs rounded-lg bg-red-100 text-red-600">
                  Delete
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* Selected Job Details */}
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <p className="text-sm text-gray-500">
          Select a job and click <span className="font-medium text-gray-700">View</span> to see job details here.
        </p>
      </div>

      {/* 
        When "View" is clicked:
        👉 Replace the above placeholder with the Job Details Card
        (the detailed card we designed earlier)
      */}

    </div>
  );
};

export default JobManagement;
