"use client"
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  // Function to navigate back to the homepage
  const goToHome = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-white via-gray-300 to-white text-white p-4">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated text */}
        <h1 className="text-6xl font-extrabold animate-bounce">
          Oops!
        </h1>

        <h2 className="text-3xl font-semibold animate-pulse">
          404 - Page Not Found
        </h2>

        {/* Illustration */}
        <div className="relative">
          <img
          src='/404.png'
            alt="404 illustration"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>

        {/* Call to Action Button */}
        <button
          onClick={goToHome}
          className="bg-yellow-500 text-black flex items-center gap-2 text-lg font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
        ><BsArrowLeft />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
