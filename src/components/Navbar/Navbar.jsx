import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Logo from "../Logo/Logo";
import { useEffect, useState } from "react";
import axios from "../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [coin, setCoin] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      const res = await axios.get(`/user/info?email=${user.email}`);
      setCoin(res.data.coin);
      setRole(res.data.role);
    };

    fetchUser();
  }, [user]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-purple-600 text-white">

      <Logo />

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
              {/* Join as Developer */}
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

            <span>👤 {role}</span>

            <span>💰 {coin} Coins</span>

            <img
              src={user.photoURL}
              className="w-8 h-8 rounded-full "
            />

            <button className="bg-red-500 rounded-lg p-3"
            
            onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
