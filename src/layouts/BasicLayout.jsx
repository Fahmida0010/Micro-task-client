import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loader/Loading";
import { useAuth } from "../context/AuthProvider";

const BasicLayout = () => {
    const { loading } = useAuth();
  return (
    <>
     {loading && <Loading/>}
      <Navbar />
      <main className="min-h-[80vh] px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default BasicLayout;
