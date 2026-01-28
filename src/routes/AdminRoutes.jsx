import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import axiosSecure from "../hooks/useAxiosSecure";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then(res => {
          setDbUser(res.data);
          setDbLoading(false);
        })
        .catch(() => setDbLoading(false));
    }
  }, [user]);

  if (loading || dbLoading) return <p>Loading...</p>;

  if (!dbUser || dbUser.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
