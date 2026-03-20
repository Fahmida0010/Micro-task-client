import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import axios from "../hooks/useAxiosSecure";
import { auth } from "../firebase/firebase.config";
import axiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(); 
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
   const [coin, setCoin] = useState(0); 

     useEffect(() => {
    if (!user?.email) return;

    const fetchCoin = async () => {
      const res = await axios.get(`/user/info?email=${user.email}`);
      setCoin(res.data.coin);
    };

    fetchCoin();
  }, [user]);
    const value = { user, setUser, coin, setCoin };

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, provider);

  const logout = () => signOut(auth);

  
  const refetchUser = async () => {
    try {
      if (!user?.email) return;

      // call backend just to refresh token/user related state
      await axios.post("/jwt", { email: user.email });

      // 🔁 force firebase user refresh
      setUser({ ...auth.currentUser });
    } catch (err) {
      console.error("Refetch failed", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const res = await axiosSecure.post("/jwt", {
          email: currentUser.email,
        });
        localStorage.setItem("access-token", res.data.token);
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        register, 
        login, 
        googleLogin, 
        logout,
        refetchUser,
        coin,
        setCoin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
