import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default BasicLayout;
