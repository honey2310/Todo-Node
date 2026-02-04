import React, { useState } from "react";
import { Eye, Pin } from "lucide-react";

export default function CategoryManagement() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "IT / Software",
      color: "bg-blue-100 text-blue-700",
      status: "Active",
      visibility: "Public",
      pinned: true,
      priority: "High",
      trend: "up",
      health: 92,
      totalJobs: 24,
      activeJobs: 18,
      applications: 340,
      description:
        "Technology and software development roles including frontend, backend, and mobile.",
      subCategories: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile App Developer",
      ],
      rules: {
        maxJobs: 50,
        recruitersAllowed: true,
        hiringPaused: false,
      },
      notes:
        "High demand category. Keep job limit flexible during peak hiring.",
      activity: [
        "Category created by Admin",
        "Job limit updated to 50",
        "Pinned as priority category",
      ],
      createdOn: "12 Jan 2026",
      updatedOn: "01 Feb 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* ===== Header ===== */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F2854]">
          Category Management
        </h1>
        <p className="text-gray-500">
          Advanced control and analytics for job categories
        </p>
      </div>

      {/* ===== Stats ===== */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <StatCard title="Categories" value="1" />
        <StatCard title="Active" value="1" />
        <StatCard title="Total Jobs" value="24" />
        <StatCard title="Applications" value="340" />
        <StatCard title="High Priority" value="1" />
      </div>

      {/* ===== Controls ===== */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-4 justify-between">
        <div className="flex gap-3">
          <input
            placeholder="Search categories..."
            className="px-4 py-2 border rounded-lg text-sm"
          />
          <select className="px-4 py-2 border rounded-lg text-sm">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-sm">
            <option>Visibility</option>
            <option>Public</option>
            <option>Internal</option>
          </select>
        </div>

        <button className="px-5 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm">
          + Add Category
        </button>
      </div>

      {/* ===== Table ===== */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Category List</h2>

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-3">Category</th>
              <th>Jobs</th>
              <th>Health</th>
              <th>Trend</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${cat.color}`}>
                    {cat.name}
                  </span>
                  {cat.pinned && (
                    <Pin size={14} className="text-yellow-500" />
                  )}
                </td>

                <td className="text-center">
                  {cat.activeJobs}/{cat.totalJobs}
                </td>

                <td className="text-center font-semibold">
                  {cat.health}%
                </td>

                <td className="text-center">
                  {cat.trend === "up" ? "📈 Growing" : "📉 Declining"}
                </td>

                <td className="text-center">
                  <StatusBadge value={cat.status} />
                </td>

                <td className="text-center">
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className="p-2 bg-[#1C4D8D] text-white rounded-lg"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Drawer ===== */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white p-6 overflow-y-auto">

            <DrawerHeader
              title={selectedCategory.name}
              onClose={() => setSelectedCategory(null)}
            />

            <Section title="Overview">
              <Detail label="Health Score" value={`${selectedCategory.health}%`} />
              <Detail label="Priority" value={selectedCategory.priority} />
              <Detail label="Visibility" value={selectedCategory.visibility} />
            </Section>

            <Section title="Sub-Categories">
              <TagList items={selectedCategory.subCategories} />
            </Section>

            <Section title="Rules & Limits">
              <Detail label="Max Jobs" value={selectedCategory.rules.maxJobs} />
              <Detail
                label="Recruiters Allowed"
                value={selectedCategory.rules.recruitersAllowed ? "Yes" : "No"}
              />
            </Section>

            <Section title="Internal Notes">
              <p className="bg-gray-100 p-3 rounded-lg text-sm">
                {selectedCategory.notes}
              </p>
            </Section>

            <Section title="Activity Timeline">
              <ul className="list-disc ml-5 text-sm text-gray-600">
                {selectedCategory.activity.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </Section>

            <Section title="Smart Insight">
              <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm">
                🚀 This category is performing strongly. Consider increasing job
                limits.
              </div>
            </Section>

          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Small Components ===== */

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);

const DrawerHeader = ({ title, onClose }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold">{title}</h2>
    <button onClick={onClose} className="text-xl text-gray-500">✕</button>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

const Detail = ({ label, value }) => (
  <div className="mb-2">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const StatusBadge = ({ value }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      value === "Active"
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-red-600"
    }`}
  >
    {value}
  </span>
);

const TagList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <span
        key={item}
        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
      >
        {item}
      </span>
    ))}
  </div>
);
