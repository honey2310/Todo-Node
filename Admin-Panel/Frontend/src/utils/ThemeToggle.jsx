import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`
        relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none
        ${darkMode ? 'bg-slate-700' : 'bg-blue-100'}
      `}
      aria-label="Toggle Theme"
    >
      {/* Sliding Circle */}
      <div
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center
          ${darkMode ? 'translate-x-6' : 'translate-x-0'}
        `}
      >
        {darkMode ? (
          <Moon size={14} className="text-slate-700" />
        ) : (
          <Sun size={14} className="text-amber-500" />
        )}
      </div>

      {/* Background Icons (Optional for extra detail) */}
      <div className="flex justify-between items-center px-2 h-full w-full opacity-40">
        <Sun size={12} className={darkMode ? 'text-white' : 'text-transparent'} />
        <Moon size={12} className={darkMode ? 'text-transparent' : 'text-slate-600'} />
      </div>
    </button>
  );
};

export default ThemeToggle;