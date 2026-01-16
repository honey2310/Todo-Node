import React from 'react'
export default function ConfirmModal({
    isOpen,
    title = "Are you sure?",
    message,
    onConfirm,
    onCancel,
  }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fadeIn">
          <h2 className="text-xl font-semibold text-[#4A4947] mb-2">
            {title}
          </h2>
          <p className="text-[#4A4947] opacity-80 mb-6">
            {message}
          </p>
  
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-5 py-2 rounded-full border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 rounded-full bg-red-500 text-white hover:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
  