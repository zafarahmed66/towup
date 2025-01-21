import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 w-screen">
      <h1 className="text-4xl font-bold text-[#2B4380] mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-lg text-[#2B4380] hover:underline">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
