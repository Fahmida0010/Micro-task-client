import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../context/ThemeContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [statusMessage, setStatusMessage] = useState('');
  
  const axiosSecure = useAxiosSecure();

  // Backend-e auto-save korar helper function
  const savePreferencesToBackend = async (newTheme, newLang) => {
    try {
      setStatusMessage('Saving...');
      
      const requester = typeof axiosSecure === 'function' ? axiosSecure() : axiosSecure;
      
      if (requester && typeof requester.put === 'function') {
        await requester.put('/api/users/preferences', {
          theme: newTheme,
          language: newLang,
        });
        setStatusMessage('Updated successfully!');
        setTimeout(() => setStatusMessage(''), 2000);
      }
    } catch (error) {
      console.error('Failed to auto-save preferences:', error);
      setStatusMessage('Failed to save');
      setTimeout(() => setStatusMessage(''), 2000);
    }
  };

  // Theme Toggle Handler
  const handleThemeToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(); 
    savePreferencesToBackend(nextTheme, i18n?.language || 'en');
  };

  // Language Change Handler (Standard i18n approach - No Stack Overflow loop)
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(selectedLang);
    }

    savePreferencesToBackend(theme, selectedLang);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold">Settings</h1>
          {statusMessage && (
            <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 rounded-full animate-pulse">
              {statusMessage}
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* Theme Section */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div>
              <h2 className="text-lg font-semibold">Appearance</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Switch between light and dark themes
              </p>
            </div>
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all shadow-md active:scale-95"
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>

          {/* Language Section */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div>
              <h2 className="text-lg font-semibold">Language</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select your preferred language
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={i18n?.language || 'en'}
                onChange={handleLanguageChange}
                className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="en">English 🇺🇸</option>
                <option value="bn">বাংলা 🇧🇩</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
