import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthProvider";
import axios from "../hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

const Register = () => {

  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectByRole = (role) => {
    if (role === "worker") navigate("/dashboard/worker-home");
    else if (role === "admin") navigate("/dashboard/admin-home");
    else navigate("/dashboard");
  };

  const handleRegister = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value.toLowerCase();
    const imageFile = form.image.files[0];

    try {

      // 📤 Upload image to imgBB
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        imageData
      );

      const photo = imgRes.data.data.display_url;

      // 🔐 Firebase register
      const result = await register(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      const coin = role === "worker" ? 10 : 50;

      // 💾 Save user
      await axios.post("/users", {
        name,
        email,
        photo,
        role,
        coin,
      });

      // 🔑 JWT
      const tokenRes = await axios.post("/jwt", { email });
      localStorage.setItem("access-token", tokenRes.data.token);

      redirectByRole(role);

    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();

      const email = res.user.email;

      // 🔑 JWT
      const tokenRes = await axios.post("/jwt", { email });
      const token = tokenRes.data.token;
      localStorage.setItem("access-token", token);

      // 🔍 check user exists কিনা
      let userRes;
      try {
        userRes = await axios.get(`/users/${email}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
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

        await axios.post("/users", newUser);

        // redirect buyer
        redirectByRole("buyer");
      } else {
        // existing user → redirect based on role
        redirectByRole(userRes.data.role);
      }

    } catch (err) {
      console.error(err);
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-950 dark:to-gray-900 px-4 pt-12 transition-colors duration-300">

      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-10 rounded-xl shadow-xl transition-colors duration-300">

        <h2 className="text-center text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">

          <input 
            name="name" 
            placeholder="Full Name" 
            required 
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors" 
          />

          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors" 
          />

          {/* 📸 Image upload */}
          <input 
            name="image" 
            type="file" 
            accept="image/*" 
            required 
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-950 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 transition-colors"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible size={23} /> : <AiOutlineEye size={23}/>}
            </button>
          </div>

          <select 
            name="role" 
            required 
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors"
          >
            <option value="" className="bg-white dark:bg-gray-900 text-gray-500">Select Role</option>
            <option value="Worker" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">Worker</option>
            <option value="Buyer" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">Buyer</option>
          </select>

          {error && <p className="text-red-500 dark:text-red-400 text-center text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-700 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-3 rounded transition font-medium cursor-pointer disabled:bg-indigo-300 dark:disabled:bg-indigo-900"
          >
            {loading ? "Uploading..." : "Register"}
          </button>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-200 gap-2 border border-gray-200 dark:border-gray-700 py-2.5 rounded transition cursor-pointer"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;