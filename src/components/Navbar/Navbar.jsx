"use client";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Logo from "../Logo/Logo";
import { useEffect, useState, useRef } from "react";
import axios from "../../hooks/useAxiosSecure";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [coin, setCoin] = useState(0);
  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //  notification states
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

  //  fetch notifications + user info
  useEffect(() => {
    if (user?.email) {
      axios.get(`/user/info?email=${user.email}`).then((res) => {
        setCoin(res.data.coin);
        setRole(res.data.role);
      });

      axios
        .get(`/notifications/${user.email}`)
        .then((res) => setNotifications(res.data));
    }
  }, [user]);
  

  return (
    <nav className="bg-purple-600 text-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-indigo-300">Login</Link>
              <Link to="/register" className="hover:text-indigo-300">Register</Link>
              <a
                href="https://github.com/Fahmida0010/Micro-task-client.git"
                target="_blank"
                rel="noreferrer"
                className="border px-3 py-1 rounded hover:bg-white hover:text-blue-600 transition"
              >
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-indigo-300">Dashboard</Link>
              <span>💰{coin} Coins</span>

              {/* 🔔 Notification */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenNotif(!openNotif);
                  }}
                  className="text-xl"
                >
                  🔔
                  {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 
                    bg-red-500 text-xs px-1 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {openNotif && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-2 w-80 bg-white text-black rounded shadow-lg p-3 z-50 max-h-80 overflow-y-auto"
                  >
                    {notifications.length > 0 ? (
                      notifications.map((n, i) => (
                        <div key={i} className="border-b py-2 text-sm">
                          <p>{n.message}</p>
                          <small className="text-gray-400">
                            {new Date(n.createdAt).toLocaleString()}
                          </small>
                        </div>
                      ))
                    ) : (
                      <p>No notifications</p>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div ref={dropdownRef} className="relative">
                <img
                  src={user.photoURL}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute bg-pink-300 right-0 mt-2 w-48 text-black rounded shadow-lg p-3 z-50">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-green-900">{user.email}</p>
                  </div>
                )}
              </div>

              <span className="ml-2">👤 {role}</span>

              <button
                className="bg-red-500 rounded-lg px-3 py-1 hover:bg-red-600"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">

          {/* 🔔 Mobile Notification */}
          {user && (
            <div ref={notifRef} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenNotif(!openNotif);
                }}
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {openNotif && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-72 bg-white text-black rounded shadow-lg p-3 z-50"
                >
                  {notifications.length > 0 ? (
                    notifications.map((n, i) => (
                      <div key={i} className="border-b py-2 text-sm">
                        <p>{n.message}</p>
                        <small className="text-gray-400">
                          {new Date(n.createdAt).toLocaleString()}
                        </small>
                      </div>
                    ))
                  ) : (
                    <p>No notifications</p>
                  )}
                </div>
              )}
            </div>
          )}

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-600 px-4 pt-4 pb-6 flex flex-col gap-4">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-indigo-300">Login</Link>
              <Link to="/register" className="hover:text-indigo-300">Register</Link>
              <a
                href="https://github.com/Fahmida0010/Micro-task-client.git"
                target="_blank"
                rel="noreferrer"
                className="border px-3 py-1 rounded hover:bg-white hover:text-blue-600 transition"
              >
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-indigo-300">Dashboard</Link>
              <span>💰 {coin} Coins</span>
              <span>👤 {role}</span>

              <button
                className="bg-red-500 rounded-lg px-3 py-1 hover:bg-red-600 mt-2"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;