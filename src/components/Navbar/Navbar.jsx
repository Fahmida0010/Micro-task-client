"use client";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Logo from "../Logo/Logo";
import { useEffect, useState, useRef } from "react";
import axios from "../../hooks/useAxiosSecure";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const location = useLocation();

  // Check if current page is inside dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdown + notification if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user from MongoDB using useQuery to keep data synced without reload
  const { data: dbUser } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Listen to custom profileUpdated event for instant coin/profile sync
  useEffect(() => {
    const handleProfileUpdate = () => {
      if (user?.email) {
        queryClient.invalidateQueries(["dbUser", user?.email]);
      }
    };
    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, [user?.email, queryClient]);

  // Fetch notifications
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/notifications/${user.email}`)
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const currentCoin = dbUser?.coin ?? 0;
  const currentRole = dbUser?.role || "";

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md fixed w-full z-50 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 relative">
        
        {/* 1. Logo (Ekbare Bame) */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* 2. Center Menu Links (Only visible if NOT in Dashboard) */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-8 font-medium text-sm absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition whitespace-nowrap">
              Home
            </Link>
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition whitespace-nowrap">
              About Us
            </Link>
            <Link to="/tasks" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition whitespace-nowrap">
              All Tasks
            </Link>
               
          {/* Dashboard Link (Only visible if logged in AND NOT already in dashboard) */}
          {user && !isDashboard && (
            <Link to="/dashboard" className="text-sm font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition mr-1">
              Dashboard
            </Link>
          )}
          </div>
        )}

        {/* 3. Right Side Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
       

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer font-semibold text-sm flex items-center justify-center mr-1"
            title="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {!user ? (
            <div className="flex items-center gap-3 text-sm font-medium">
              <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                Login
              </Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition shadow-sm">
                Register
              </Link>
              <a
                href="https://github.com/Fahmida0010/Micro-task-client.git"
                target="_blank"
                rel="noreferrer"
                className="border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition text-xs font-semibold whitespace-nowrap"
              >
                Join as Developer
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              
              {/* Live Auto-Updated Coins */}
              <div className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-800 flex items-center gap-1 whitespace-nowrap">
                <span>💰</span> {currentCoin} Coins
              </div>

              {/* Notification */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenNotif(!openNotif);
                  }}
                  className="text-xl relative p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                >
                  🔔
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {openNotif && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-xl p-4 z-50 max-h-80 overflow-y-auto border border-gray-100 dark:border-gray-700"
                  >
                    <p className="font-bold text-sm mb-2 border-b dark:border-gray-700 pb-1">Notifications</p>
                    {notifications.length > 0 ? (
                      notifications.map((n, i) => (
                        <div key={i} className="border-b dark:border-gray-700 py-2.5 text-xs">
                          <p className="font-medium">{n.message}</p>
                          <small className="text-gray-400 mt-0.5 block">
                            {new Date(n.createdAt).toLocaleString()}
                          </small>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-4">No notifications</p>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Dropdown (Desktop) */}
              <div ref={dropdownRef} className="relative flex items-center">
                <img
                  src={dbUser?.photo || user?.photoURL || "https://i.ibb.co/m9YyZ2G/user.png"} 
                  className="w-9 h-9 rounded-full object-cover cursor-pointer ring-2 ring-indigo-500/30"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  alt="Profile"
                />
                
                {dropdownOpen && (
                  <div className="absolute bg-white dark:bg-gray-800 right-0 top-12 w-60 text-gray-800 dark:text-gray-200 rounded-2xl shadow-2xl p-4 z-50 border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
                    <div className="border-b dark:border-gray-700 pb-3">
                      <p className="font-bold text-sm truncate">{dbUser?.name || user?.displayName}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Role:</span>
                        <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">
                          👤 {currentRole || "User"}
                        </span>
                      </div>
                    </div>

                    {/* Profile Page Link */}
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full bg-gray-200 hover:bg-indigo-100 dark:bg-gray-700/60 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl py-2 px-3 text-xs font-semibold transition flex items-center justify-between"
                    >
                      <span>View Profile</span>
                      <span className="text-indigo-600 dark:text-indigo-400">→</span>
                    </Link>

                    <button
                      className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-2 text-xs font-semibold transition cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user && (
            <div ref={notifRef} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenNotif(!openNotif);
                }}
                className="text-lg relative p-1"
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>

              {openNotif && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg p-3 z-50 border dark:border-gray-700 max-h-72 overflow-y-auto text-xs"
                >
                  <p className="font-bold mb-2 border-b pb-1 dark:border-gray-700">Notifications</p>
                  {notifications.length > 0 ? (
                    notifications.map((n, i) => (
                      <div key={i} className="border-b dark:border-gray-700 py-2">
                        <p>{n.message}</p>
                        <small className="text-gray-400 text-[10px]">
                          {new Date(n.createdAt).toLocaleString()}
                        </small>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-2">No notifications</p>
                  )}
                </div>
              )}
            </div>
          )}

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-6 py-5 flex flex-col gap-3 shadow-xl">
          
          {/* User Profile Info on Mobile Drawer */}
          {user && (
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border dark:border-gray-700 mb-1">
              <img
                src={dbUser?.photo || user?.photoURL || "https://i.ibb.co/m9YyZ2G/user.png"} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                alt="Profile"
              />
              <div className="overflow-hidden flex-grow">
                <p className="font-bold text-sm truncate">{dbUser?.name || user?.displayName}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {!isDashboard && (
            <>
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium py-1.5 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium py-1.5 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                About Us
              </Link>
              <Link 
                to="/tasks" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium py-1.5 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                All Tasks
              </Link>
              <hr className="dark:border-gray-800 my-1" />
            </>
          )}

          {!user ? (
            <div className="flex flex-col gap-2 pt-1">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 font-medium border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border dark:border-gray-700">
                <span className="text-sm font-semibold">🪙 {currentCoin} Coins</span>
                <span className="text-xs uppercase bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold px-2.5 py-1 rounded-md">
                  {currentRole || "User"}
                </span>
              </div>
              
              {/* View Profile Link */}
              <Link 
                to="/dashboard/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 font-semibold bg-gray-200 hover:bg-indigo-100 dark:bg-gray-700/60 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
              >
                <span>View Profile</span>
                <span className="text-indigo-600 dark:text-indigo-400">→</span>
              </Link>

              {!isDashboard && (
                <Link 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 font-semibold bg-indigo-600 text-white rounded-xl shadow-sm"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-semibold shadow-sm transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;