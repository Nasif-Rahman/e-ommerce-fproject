import React from "react";
import { Link } from "react-router-dom";
import FuzzyText from "../components/FuzzyText";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <FuzzyText
        fontSize="clamp(3rem, 10vw, 8rem)"
        color="#ff0066"
        baseIntensity={0.2}
        hoverIntensity={0.6}
      >
        404 Not Found
      </FuzzyText>

      <p className="mt-6 text-gray-300 text-lg">
        Oops! The page you're looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
