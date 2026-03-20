import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axiosSecure from "../hooks/useAxiosSecure"; // খেয়াল করুন নাম axiosSecure দিয়েছি
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

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
    const email = res.user.email;


    const { data } = await axiosSecure.post("/jwt", { email });
    const token = data.token;

    if (token) {
      localStorage.setItem("access-token", token);

      
      let userRes;
      try {
        userRes = await axiosSecure.get(`/users/${email}`, {
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="w-full max-w-md bg-white p-8 mt-12 rounded-xl shadow-xl">
        <h2 className="text-center text-2xl font-bold text-indigo-500">Welcome Back</h2>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded" />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 border rounded"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
              {showPassword ? <AiOutlineEyeInvisible size={23} /> : <AiOutlineEye size={23} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button className="w-full bg-indigo-700 hover:bg-indigo-500 text-white py-3 rounded">Login</button>
        </form>

        <button onClick={handleGoogleLogin} className="mt-4 w-full flex justify-center hover:bg-pink-300 gap-2 border py-2 rounded">
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="mt-4 text-center">
          New here? <Link to="/register" className="text-indigo-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;