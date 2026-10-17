"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axiosSecure from "../hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Controlled inputs for demo login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);

      const { data } = await axiosSecure.post("/jwt", { email });
      
      if (data.token) {
        localStorage.setItem("access-token", data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      const googleEmail = res.user.email;

      const { data } = await axiosSecure.post("/jwt", { email: googleEmail });
      const token = data.token;

      if (token) {
        localStorage.setItem("access-token", token);
        
        let userRes;
        try {
          userRes = await axiosSecure.get(`/users/${googleEmail}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
        } catch {
          userRes = null;
        }
    
        if (!userRes || !userRes.data) {
          const newUser = {
            name: res.user.displayName,
            email: res.user.email,
            photo: res.user.photoURL,
            role: "buyer",
            coin: 50,    
          };

          await axiosSecure.post("/users", newUser);
        }

        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Google login failed");
    }
  };

  // Demo credentials fill helper
  const fillDemoCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-950 dark:to-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 mt-12 rounded-xl shadow-xl transition-colors duration-300">
        <h2 className="text-center text-2xl font-bold text-indigo-500 dark:text-indigo-400">Welcome Back</h2>

        {/* Demo Login Quick Buttons */}
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-gray-800/80 rounded-lg border border-indigo-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-2 text-center">
            Demo Login Credentials (Click to Fill):
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillDemoCredentials("tahmid@gmail.com", "Tahmid26@#")}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white text-xs py-1.5 px-2 rounded font-medium transition cursor-pointer"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials("buyer@gmail.com", "Buyer123@")}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs py-1.5 px-2 rounded font-medium transition cursor-pointer"
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials("worker@gmail.com", "Worker123@")}
              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs py-1.5 px-2 rounded font-medium transition cursor-pointer"
            >
              Worker
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <input 
            name="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
            required 
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors" 
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible size={23} /> : <AiOutlineEye size={23} />}
            </button>
          </div>

          {error && <p className="text-red-500 dark:text-red-400 text-center text-sm">{error}</p>}

          <button className="w-full bg-indigo-700 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-3 rounded transition font-medium cursor-pointer">
            Login
          </button>
        </form>

        <button 
          onClick={handleGoogleLogin} 
          className="mt-4 w-full flex items-center justify-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-200 gap-2 border border-gray-200 dark:border-gray-700 py-2.5 rounded transition cursor-pointer"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          New here? <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;