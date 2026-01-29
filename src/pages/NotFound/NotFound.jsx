import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 text-center px-4">

      <FaExclamationTriangle className="text-red-500 text-7xl mb-6 animate-bounce" />

      <h1 className="text-6xl font-extrabold text-indigo-700 mb-4">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold 
      text-red-800 mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-600 max-w-md mb-8">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition shadow-lg"
      >
        Go Back Home
      </Link>

    </div>
  );
};

export default NotFound;
