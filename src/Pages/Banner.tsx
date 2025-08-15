import { Link } from "react-router-dom"; // react-router-dom use করতে হবে
import bg from "../assets/visaBanner.jpg";

interface BannerProps {
  title: string;
}

const Banner = ({ title }: BannerProps) => {
  return (
    <div
      className="relative w-screen h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] xl:h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 md:px-10 lg:px-16 text-center">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight drop-shadow-lg">
          {title}
        </h1>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl drop-shadow">
          Explore a variety of visa services, get clear process guidance and track your application easily from one place.
        </p>

        {/* Apply Now Button */}
        <Link to="/application">
          <button className="mt-6 sm:mt-8 md:mt-10 px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 ease-in-out">
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
