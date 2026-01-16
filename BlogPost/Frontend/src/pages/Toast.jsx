import React from "react";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slideIn">
      <div
        className={`px-6 py-4 rounded-xl shadow-xl text-white
          ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
      >
        <div className="flex items-center gap-4">
          <span>{message}</span>
          <button onClick={onClose} className="font-bold">
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
