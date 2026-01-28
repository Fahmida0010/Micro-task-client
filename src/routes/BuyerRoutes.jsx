import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import axiosSecure from "../hooks/useAxiosSecure";



const BuyerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setDbLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setDbLoading(false);
        });
    }
  }, [user]);

  if (loading || dbLoading) return <p>Loading...</p>;

  // Role from MongoDB
  if (!dbUser || dbUser.role !== "buyer") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default BuyerRoute;
