import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md">
      {/* Logo */}
     <Logo></Logo>

      {/* Menu */}
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="font-semibold">
              💰 {user.coin} Coins
            </span>

            <div className="flex items-center gap-2">
              <img
                src={user.photo}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <button onClick={logout}>Logout</button>
            </div>
          </>
        )}

        {/* Join as Developer */}
        <a
          href="https://github.com/your-client-repo"
          target="_blank"
          rel="noreferrer"
          className="border px-3 py-1 rounded"
        >
          Join as Developer
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
