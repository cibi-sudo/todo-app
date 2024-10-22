import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-blue-400 to-purple-600">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-6 text-2xl">
        Oops! The page you are looking for does not exist.
      </p>

      <Link to="/">
        <button className="px-6 py-3 text-blue-600 transition duration-300 bg-white rounded-lg shadow-lg hover:bg-gray-200">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
