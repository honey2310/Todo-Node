import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  User, Phone, MapPin, Droplet, Calendar, 
  ArrowRight, CheckCircle2, ChevronLeft, Activity, Heart
} from "lucide-react";
import { base_url } from "../../utils/global_var";

const DonorRegistration = () => {
  // We increase steps to give that "one question at a time" Typeform feel
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    city: "",
    address: "",
    bloodGroup: "",
    bp: "",
    hemoglobin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Keyboard "Enter" to go next
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && step < totalSteps && step !== 5) {
        nextStep();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}/donor/register-donor`, formData);
      if (res.data.status) setStep(6);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration Error: Please check your connection.");
    }
  };

  const progressWidth = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-500">
      
      {/* TOP PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-900">
        <div 
          className="h-full bg-[#B354A6] transition-all duration-700 ease-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <div className="max-w-xl w-full">
        {/* NAVIGATION CONTROLS */}
        {step > 1 && step < 6 && (
          <button 
            onClick={prevStep}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#B354A6] mb-8 transition-colors"
          >
            <ChevronLeft size={14} /> Back
          </button>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="relative min-h-[400px]">
          
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <StepWrapper title="What is your name?" sub="Protocol: Identity Verification">
              <TypeInput 
                icon={<User />} 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Type your full name here..." 
                autoFocus
              />
              <NextButton onClick={nextStep} />
            </StepWrapper>
          )}

          {/* STEP 2: CONTACT & DOB */}
          {step === 2 && (
            <StepWrapper title="How can we reach you?" sub="Protocol: Communication">
              <div className="space-y-8">
                <TypeInput 
                  icon={<Phone />} 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="Mobile Number" 
                />
                <TypeInput 
                  icon={<Calendar />} 
                  type="date"
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleChange} 
                />
              </div>
              <NextButton onClick={nextStep} />
            </StepWrapper>
          )}

          {/* STEP 3: BLOOD GROUP */}
          {step === 3 && (
            <StepWrapper title="Select your blood group" sub="Clinical: Biological Type">
              <div className="grid grid-cols-4 gap-3 mt-4">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => {
                      setFormData({...formData, bloodGroup: group});
                      setTimeout(nextStep, 400); // Slight delay for visual feedback
                    }}
                    className={`py-6 rounded-2xl text-sm font-black transition-all border-2 ${
                      formData.bloodGroup === group 
                      ? "bg-[#B354A6] border-[#B354A6] text-white scale-95" 
                      : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-[#B354A6]/50"
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* STEP 4: VITAL SIGNS (BP & HEMO) */}
          {step === 4 && (
            <StepWrapper title="Vital Stats" sub="Clinical: Current Health Metrics">
              <div className="space-y-8">
                <TypeInput 
                  label="Blood Pressure (systolic/diastolic)"
                  icon={<Activity />} 
                  name="bp" 
                  value={formData.bp} 
                  onChange={handleChange} 
                  placeholder="e.g. 120/80" 
                />
                <TypeInput 
                  label="Hemoglobin Level"
                  icon={<Droplet />} 
                  name="hemoglobin" 
                  value={formData.hemoglobin} 
                  onChange={handleChange} 
                  placeholder="e.g. 14.2 g/dL" 
                />
              </div>
              <NextButton onClick={nextStep} />
            </StepWrapper>
          )}

          {/* STEP 5: LOCATION */}
          {step === 5 && (
            <StepWrapper title="Where are you located?" sub="Logistics: Regional Node">
              <div className="space-y-8">
                <TypeInput 
                  icon={<MapPin />} 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="City Name" 
                />
                <TypeInput 
                  icon={<MapPin />} 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Street / Locality" 
                />
              </div>
              <button 
                onClick={handleSubmit}
                className="mt-10 group flex items-center gap-4 bg-[#B354A6] text-white px-8 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-[#B354A6]/20"
              >
                Submit to Registry <CheckCircle2 size={18} />
              </button>
            </StepWrapper>
          )}

          {/* STEP 6: SUCCESS */}
          {step === 6 && (
            <div className="text-center py-10 animate-in zoom-in-95 duration-700">
              <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter mb-4">Registration Locked.</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-10 max-w-[280px] mx-auto leading-loose">
                Your biological data is currently being synced with local blood banks.
              </p>
              <button 
                onClick={() => window.location.href = "/dashboard"}
                className="px-12 py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#B354A6] transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const StepWrapper = ({ children, title, sub }) => (
  <div className="animate-in slide-in-from-bottom-12 fade-in duration-700 ease-out">
    <div className="mb-10">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B354A6]">{sub}</span>
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight italic">{title}</h2>
    </div>
    {children}
  </div>
);

const TypeInput = ({ icon, label, ...props }) => (
  <div className="w-full">
    {label && <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">{label}</label>}
    <div className="relative group border-b-2 border-slate-100 dark:border-slate-800 focus-within:border-[#B354A6] transition-all">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B354A6] transition-colors">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <input 
        className="w-full pl-10 py-5 bg-transparent text-xl md:text-2xl font-bold outline-none dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800"
        {...props}
      />
    </div>
  </div>
);

const NextButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="mt-10 group flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#B354A6] dark:hover:bg-[#B354A6] dark:hover:text-white transition-all shadow-xl"
  >
    Press Enter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
  </button>
);

export default DonorRegistration;