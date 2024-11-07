"use client";
import { FaPlus } from 'react-icons/fa'; // Import the plus icon from react-icons
import { useRouter } from 'next/navigation';

const AddBlogButton: React.FC = () => {
  const router = useRouter();

  // Function to navigate to the "Add Blog" page
  const navigateToAddBlog = () => {
    router.push('/private/rbac/admin-panel/create-blog'); // Adjust path to where your "Add Blog" page is
  };

  return (
    <div
      className=" bg-blue-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-600"
    >
        <span className="text-lg opacity-0 font-extrabold group-hover:opacity-100 transition-opacity duration-300">
          {/* Create Blog */}
        </span>
      <button
        onClick={navigateToAddBlog}
        title="Create Blog"
        className="flex items-center space-x-2"
      >
        <FaPlus size={24} />
        {/* Hidden text that shows up on hover */}
      </button>
    </div>
  );
};

export default AddBlogButton;
