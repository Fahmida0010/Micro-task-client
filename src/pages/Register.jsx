// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { updateProfile } from "firebase/auth";
// import { useAuth } from "../context/AuthProvider";
// import axios from "../hooks/useAxiosSecure";
// import { FcGoogle } from "react-icons/fc";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Register = () => {

//   const navigate = useNavigate();
//   const { register, googleLogin } = useAuth();

//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const redirectByRole = (role) => {
//     if (role === "worker") navigate("/dashboard/worker-home");
//     else if (role === "admin") navigate("/dashboard/admin-home");
//     else navigate("/dashboard");
//   };

//   const handleRegister = async (e) => {

//     e.preventDefault();
//     setError("");

//     const form = e.target;

//     const name = form.name.value;
//     const email = form.email.value;
//     const photo = form.photo.value;
//     const password = form.password.value;
//     const role = form.role.value.toLowerCase();

//     try {

//       const result = await register(email, password);

//       await updateProfile(result.user, {
//         displayName: name,
//         photoURL: photo,
//       });

//       const coin = role === "worker" ? 10 : 50;

//       await axios.post("/users", {
//         name,
//         email,
//         photo,
//         role,
//         coin,
//       });

//       // 🔑 jwt
//       const tokenRes = await axios.post("/jwt", { email });
//       localStorage.setItem("access-token", tokenRes.data.token);

//       redirectByRole(role);

//     } catch {
//       setError("Registration failed");
//     }
//   };

//   const handleGoogleSignup = async () => {

//     try {

//       const res = await googleLogin();

//       await axios.post("/users", {
//         name: res.user.displayName,
//         email: res.user.email,
//         photo: res.user.photoURL,
//         role: "buyer",
//         coin: 50,
//       });

//       const tokenRes = await axios.post("/jwt", { email: res.user.email });
//       localStorage.setItem("access-token", tokenRes.data.token);

//       redirectByRole("buyer");

//     } catch {
//       setError("Google signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">

//       <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl">

//         <h2 className="text-center text-3xl font-bold text-indigo-600">
//           Create Account
//         </h2>

//         <form onSubmit={handleRegister} className="mt-6 space-y-4">

//           <input name="name" placeholder="Full Name" required className="w-full p-3 border rounded"/>

//           <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded"/>

//           <input name="photo" placeholder="Photo URL" required className="w-full p-3 border rounded"/>

//           <div className="relative">
//             <input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               required
//               className="w-full p-3 border rounded"
//             />
//             <button type="button" onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3">

//               {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//             </button>
//           </div>

//           <select name="role" required className="w-full p-3 border rounded">
//             <option value="">Select Role</option>
//             <option value="Worker">Worker</option>
//             <option value="Buyer">Buyer</option>
//           </select>

//           {error && <p className="text-red-500 text-center">{error}</p>}

//           <button className="w-full bg-indigo-600 text-white py-3 rounded">
//             Register
//           </button>

//         </form>

//         <button onClick={handleGoogleSignup}
//           className="mt-4 w-full flex justify-center gap-2 border py-2 rounded">

//           <FcGoogle /> Sign up with Google
//         </button>

//         <p className="mt-4 text-center">
//           Already have account? <Link to="/login" className="text-indigo-600">Login</Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Register;

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
  
        const tokenRes = await axios.post("/jwt", { email: res.user.email });
  
        const token = tokenRes.data.token;
        localStorage.setItem("access-token", token);
  
        const userRes = await axios.get(`/users/${res.user.email}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
  
        redirectByRole(userRes.data.role);
  
      } catch {
        setError("Google login failed");
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">

      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl">

        <h2 className="text-center text-3xl font-bold text-indigo-600">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">

          <input name="name" placeholder="Full Name" required className="w-full p-3 border rounded"/>

          <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded"/>

          {/* 📸 Image upload */}
          <input 
            name="image" 
            type="file" 
            accept="image/*" 
            required 
            className="w-full p-3 border rounded"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 border rounded"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3">

              {showPassword ? <AiOutlineEyeInvisible  size={23} /> : 
              <AiOutlineEye  size={23}/>}
            </button>
          </div>

          <select name="role" required className="w-full p-3 border rounded">
            <option value="">Select Role</option>
            <option value="Worker">Worker</option>
            <option value="Buyer">Buyer</option>
          </select>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button className="w-full bg-indigo-700 
          hover:bg-indigo-500 text-white py-3 rounded">
            {loading ? "Uploading..." : "Register"}
          </button>

   <button onClick={handleGoogleLogin}
          className="mt-4 w-full flex justify-center
          hover:bg-pink-300 gap-2 border py-2 rounded">

          <FcGoogle /> Continue with Google
        </button>
        </form>

        <p className="mt-4 text-center">
          Already have account? <Link to="/login" className="text-indigo-600">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
