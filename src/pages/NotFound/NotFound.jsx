import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      
      {/* Navbar */}
      <Navbar />

      {/* Main 404 Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
        <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-7xl mb-6 animate-bounce" />

        <h1 className="text-6xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-4">404</h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-red-800 dark:text-red-400 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition shadow-lg font-medium cursor-pointer"
        >
          Go Back Home
        </Link>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default NotFound;