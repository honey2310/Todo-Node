import React from "react";
import { X, User, Phone, MapPin, Droplet, Calendar, ShieldCheck } from "lucide-react";

const DonorModal = ({ isOpen, onClose, initialData = null }) => {
  if (!isOpen) return null;

  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. BACKDROP WITH BLUR */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* 2. MODAL CONTAINER */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? "Update Donor Records" : "Register New Donor"}
            </h2>
            <p className="text-sm text-gray-500">
              {isEdit ? "Modify existing donor information." : "Add a life-saver to our network directory."}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition border border-transparent hover:border-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM CONTENT */}
        <form className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="md:col-span-2">
              <ModalInput label="Full Name" icon={<User size={18}/>} placeholder="e.g. Rahul Hegde" defaultValue={initialData?.name} />
            </div>

            {/* Blood Group Selector */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Blood Group</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
                  <Droplet size={18} fill="currentColor" />
                </div>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none">
                  <option>Select Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                    <option key={type} selected={initialData?.bloodGroup === type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <ModalInput label="Phone Number" icon={<Phone size={18}/>} placeholder="+91 00000 00000" defaultValue={initialData?.phone} />

            {/* Location */}
            <ModalInput label="City / Location" icon={<MapPin size={18}/>} placeholder="e.g. Davanagere" defaultValue={initialData?.location} />

            {/* Last Donation Date */}
            <ModalInput label="Last Donation Date" icon={<Calendar size={18}/>} type="date" defaultValue={initialData?.lastDonated} />

          </div>

          {/* EMERGENCY STATUS TOGGLE (Real-life detail) */}
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div className="flex gap-3">
              <ShieldCheck className="text-blue-600" />
              <div>
                <p className="text-sm font-bold text-blue-900">Verified Donor</p>
                <p className="text-xs text-blue-700">Has the donor completed the physical screening?</p>
              </div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="mt-10 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
            >
              Discard
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95"
            >
              {isEdit ? "Update Records" : "Confirm Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// INPUT HELPER FOR MODAL
const ModalInput = ({ label, icon, type = "text", placeholder, defaultValue }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
      />
    </div>
  </div>
);

export default DonorModal;