import React, { useState, useEffect } from "react";
import {
  Send,
  User,
  Droplets,
  FileText,
  CheckCircle2,
  ChevronRight,
  Info,
} from "lucide-react";
import axios from "axios";
import { base_url } from "../../utils/global_var";
import { useLocation, useNavigate } from "react-router-dom";

const RequestBloodPage = ({ editCase }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const editCaseData = editCase || location.state?.caseData;
  const isEdit = !!editCaseData;

  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState(
    editCaseData?.bloodGroup || "",
  );

  const [currentHospital, setCurrentHospital] = useState(null);

  const [formData, setFormData] = useState({
    patientName: editCaseData?.patientName || "",
    caseId: editCaseData?.caseId || "",
    bloodGroup: editCaseData?.bloodGroup || "",
    units: editCaseData?.units || "",
    priority: editCaseData?.priority || "Low",
    reason: editCaseData?.reason || "",
    hospitalId: currentHospital?._id || "", // ✅ use hospitalId
  });

  // ✅ Fetch current hospital on mount
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await axios.get(`${base_url}/hospital/get-currentuser`, {
          withCredentials: true, // send cookies
        });
        if (res.data.status) {
          setCurrentHospital(res.data.hospital);
          setFormData((prev) => ({
            ...prev,
            hospitalId: res.data.hospital._id,
          }));
        } else {
          console.log("Hospital not found:", res.data.message);
        }
      } catch (err) {
        console.log("Error fetching hospital:", err);
      }
    };

    fetchHospital();
  }, []);

  // Update formData if editCase changes or hospital is loaded
  useEffect(() => {
    if (editCaseData || currentHospital) {
      setFormData({
        patientName: editCaseData?.patientName || "",
        caseId: editCaseData?.caseId || "",
        bloodGroup: editCaseData?.bloodGroup || "",
        units: editCaseData?.units || "",
        priority: editCaseData?.priority || "Low",
        reason: editCaseData?.reason || "",
        hospital: currentHospital?._id || "",
      });
      setSelectedType(editCaseData?.bloodGroup || "");
    }
  }, [editCaseData, currentHospital]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hospital) {
      alert("Hospital ID not found! Please login again.");
      return;
    }

    try {
      console.log("Submitting:", formData);

      if (isEdit) {
        // Update existing case
        const res = await axios.put(
          `${base_url}/cases/${editCaseData._id}`,
          formData,
          { withCredentials: true },
        );

        if (res.data.status) {
          alert("Blood request updated successfully");
          navigate("/hospital/my-requests");
        }
      } else {
        // Create new case
        const res = await axios.post(`${base_url}/cases/register`, formData, {
          withCredentials: true,
        });

        if (res.data.status) {
          setSubmitted(true);
          alert("Blood request submitted successfully");
        }
      }
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Failed to submit request");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center animate-in zoom-in duration-300 pb-20">
        <div className="w-24 h-24 bg-[#B354A6]/10 text-[#B354A6] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border-2 border-[#B354A6]/20">
          <CheckCircle2
            size={48}
            className="animate-in fade-in zoom-in duration-700"
          />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter italic">
          Broadcast {isEdit ? "Updated" : "Sent"}.
        </h1>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#B354A6] transition-all"
        >
          {isEdit ? "Back to Requests" : "New Requisition"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      {/* HEADER */}
      <div className="flex items-center gap-6 border-b border-slate-200 pb-8">
        <div className="w-16 h-16 bg-[#B354A6] text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-[#B354A6]/20">
          <Send size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">
            Blood{" "}
            <span className="text-[#B354A6]">
              {isEdit ? "Update" : "Requisition"}
            </span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
            Surgical & Emergency Procurement
          </p>
        </div>
      </div>

      <form
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        onSubmit={handleSubmit}
      >
        {/* PATIENT SECTION */}
        <div className="lg:col-span-12 space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            Patient Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput
              label="Full Name"
              icon={<User size={18} />}
              placeholder="Aditi Sharma"
              value={formData.patientName}
              onChange={(v) => handleChange("patientName", v)}
            />
            <FormInput
              label="MRD / Case ID"
              icon={<FileText size={18} />}
              placeholder="MRD-8820"
              value={formData.caseId}
              onChange={(v) => handleChange("caseId", v)}
            />
          </div>
        </div>

        {/* BLOOD TYPE SELECTOR */}
        <div className="lg:col-span-7 space-y-8">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            Requirements
          </h3>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Select Blood Type
            </label>
            <div className="grid grid-cols-4 gap-3">
              {["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSelectedType(type);
                      handleChange("bloodGroup", type);
                    }}
                    className={`py-4 text-xs font-black rounded-2xl border-2 transition-all italic ${
                      selectedType === type
                        ? "bg-[#B354A6] border-[#B354A6] text-white shadow-lg"
                        : "bg-white border-slate-200 text-slate-400 hover:border-[#B354A6]/40"
                    }`}
                  >
                    {type}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput
              label="Unit Quantity"
              icon={<Droplets size={18} />}
              type="number"
              placeholder="02"
              value={formData.units}
              onChange={(v) => handleChange("units", v)}
            />
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Priority
              </label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-3.5 text-xs font-black italic focus:border-[#B354A6] outline-none cursor-pointer appearance-none transition-all"
                >
                  <option value="Low">Routine</option>
                  <option value="Medium">Urgent</option>
                  <option value="Emergency">Immediate Surgery</option>
                </select>
                <ChevronRight
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-90"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CLINICAL NOTES */}
        <div className="lg:col-span-5 space-y-8">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            Review
          </h3>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Clinical Reason
            </label>
            <textarea
              rows="6"
              className="w-full bg-white border-2 border-slate-200 rounded-[2rem] px-6 py-5 text-xs font-bold focus:border-[#B354A6] outline-none transition-all placeholder:text-slate-300"
              placeholder="Clinical justification..."
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
            />
          </div>

          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 flex gap-4">
            <Info className="text-[#B354A6] shrink-0" size={20} />
            <p className="text-[9px] font-black text-slate-500 uppercase leading-relaxed tracking-wider">
              Authorization Required: Requisition must be verified by a medical
              officer.
            </p>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="lg:col-span-12 pt-10 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="group flex items-center gap-3 px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#B354A6] transition-all shadow-xl active:scale-95"
          >
            {isEdit ? "Update Request" : "Submit Broadcast"}{" "}
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

// Form Input Component
const FormInput = ({
  label,
  icon,
  type = "text",
  placeholder,
  onChange,
  value,
}) => (
  <div className="space-y-3 group">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6] transition-colors">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold focus:border-[#B354A6] focus:bg-white outline-none transition-all placeholder:text-slate-200"
      />
    </div>
  </div>
);

export default RequestBloodPage;
