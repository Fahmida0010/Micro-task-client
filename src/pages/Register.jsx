import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthProvider";
import axios from "../hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const role = form.role.value;

    // 🔎 Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError("Please enter a valid email address");
    }

    // 🔐 Password validation
    if (password.length < 6 || !/\d/.test(password)) {
      return setError("Password must be at least 6 characters and contain a number");
    }

    try {
      // Firebase register
      const result = await register(email, password);

      // Update profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      // Coin logic
      const coin = role === "Worker" ? 10 : 50;

      // Save user to database
      await axios.post("/users", {
        name,
        email,
        photo,
        role,
        coin,
      });

      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered");
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const res = await googleLogin();

      await axios.post("/users", {
        name: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
        role: "Buyer",
        coin: 50,
      });

      navigate("/dashboard");
    } catch {
      setError("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold">Create an Account</h2>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <input name="name" placeholder="Full Name" required className="w-full p-3 border rounded" />
          <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded" />
          <input name="photo" type="url" placeholder="Profile Picture URL" required className="w-full p-3 border rounded" />
          
          <div className="relative">
            <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
              className="w-full p-3 border rounded" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <select name="role" required className="w-full p-3 border rounded">
            <option value="">Select Role</option>
            <option value="Worker">Worker</option>
            <option value="Buyer">Buyer</option>
          </select>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button className="w-full bg-indigo-600 text-white py-3 rounded">Register</button>
        </form>

        <button onClick={handleGoogleSignup} className="mt-4 w-full flex justify-center border py-2 rounded">
          <FcGoogle className="mr-2" /> Sign up with Google
        </button>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
