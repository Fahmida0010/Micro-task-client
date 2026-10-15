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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white p-8 mt-12 rounded-xl shadow-xl">
        <h2 className="text-center text-2xl font-bold text-indigo-500">Welcome Back</h2>

        {/* Demo Login Quick Buttons */}
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-700 mb-2 text-center">Demo Login Credentials (Click to Fill):</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillDemoCredentials("tahmid@gmail.com", "Tahmid26@#")}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-1.5 px-2 rounded font-medium transition"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials("buyer@gmail.com", "Buyer123@")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 px-2 rounded font-medium transition"
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials("worker@gmail.com", "Worker123@")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-1.5 px-2 rounded font-medium transition"
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
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-500">
              {showPassword ? <AiOutlineEyeInvisible size={23} /> : <AiOutlineEye size={23} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <button className="w-full bg-indigo-700 hover:bg-indigo-500 text-white py-3 rounded transition font-medium">Login</button>
        </form>

        <button onClick={handleGoogleLogin} className="mt-4 w-full flex items-center justify-center hover:bg-gray-50 gap-2 border py-2.5 rounded transition">
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          New here? <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;