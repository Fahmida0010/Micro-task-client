// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthProvider";
// import Logo from "../Logo/Logo";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="flex justify-between items-center px-6 py-4 shadow-md">
//       {/* Logo */}
//      <Logo></Logo>

//       {/* Menu */}
//       <div className="flex items-center gap-4">
//         {!user ? (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <span className="font-semibold">
//               💰 {user.coin} Coins
//             </span>

//             <div className="flex items-center gap-2">
//               <img
//                 src={user.photo}
//                 alt="profile"
//                 className="w-8 h-8 rounded-full"
//               />
//               <button onClick={logout}>Logout</button>
//             </div>
//           </>
//         )}

//         {/* Join as Developer */}
//         <a
//           href="https://github.com/your-client-repo"
//           target="_blank"
//           rel="noreferrer"
//           className="border px-3 py-1 rounded"
//         >
//           Join as Developer
//         </a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Logo from "../Logo/Logo";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch latest user info from backend
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/info?email=${user.email}`
        );
        setCoin(res.data.coin || 0); // database theke coin
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <nav className="flex justify-between
     items-center px-6 py-4 shadow-md bg-purple-600 text-white">
      {/* Logo */}
      <Logo />

      {/* Menu */}
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-yellow-200">Login</Link>
            <Link to="/register" className="hover:text-yellow-200">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-yellow-200">Dashboard</Link>
            <span className="font-semibold">
              💰 {coin} Coins
            </span>

            <div className="flex items-center gap-2">
              <img
                src={user.photo}
                alt="profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <button
                onClick={logout}
                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </>
        )}

        {/* Join as Developer */}
        <a
          href="https://github.com/Fahmida0010/Micro-task-client.git"
          target="_blank"
          rel="noreferrer"
          className="border px-3 py-1 rounded hover:bg-white hover:text-blue-600"
        >
          Join as Developer
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
