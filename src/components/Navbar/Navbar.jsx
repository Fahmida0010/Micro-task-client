import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Logo from "../Logo/Logo";
import { useEffect, useState, useRef } from "react";
import axios from "../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [coin, setCoin] = useState(0);
  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      const res = await axios.get(`/user/info?email=${user.email}`);
      setCoin(res.data.coin);
      setRole(res.data.role);
    };

    fetchUser();
  }, [user]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-purple-600 text-white">
      <Logo />

      <div className="flex items-center gap-4 relative">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <a
              href="https://github.com/Fahmida0010/Micro-task-client.git"
              target="_blank"
              rel="noreferrer"
              className="border px-3 py-1 rounded hover:bg-white hover:text-blue-600"
            >
              Join as Developer
            </a>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span>💰 {coin} Coins</span>

            {/* Profile Picture with Dropdown for Name & Email */}
            <div ref={dropdownRef} className="relative">
              <img
                src={user.photoURL}
                className="w-8 h-8 rounded-full  cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute bg-pink-300 right-0 
                mt-2 w-48  text-black rounded shadow-lg p-3 z-50">
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-sm text-green-900">{user.email}</p>
                </div>
              )}
            </div>

            <span className="ml-2">👤 {role}</span>

            {/* Logout button stays outside dropdown */}
            <button
              className="bg-red-500 rounded-lg p-3 hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
