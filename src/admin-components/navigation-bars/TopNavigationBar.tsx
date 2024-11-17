// components/TopBar.tsx
"use client";
import { useState } from "react";
import { FaSearch, FaUserCircle, FaCog } from "react-icons/fa";
import SearchBar from "../common/SearchBar";
import { GoSidebarExpand } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import {
  setToggle,
  setEditorSidebarToggle,
} from "@/common-component/redux-config/slices/toggleSlice";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation"; // If you're using Next.js


const TopBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toggleValue, editorSidebarToggleValue } = useSelector(
    (state: RootState) => state.toggle
  );

  const OnChangeHandler = () => {};
  const OnClickHandler = () => {};

  return (
    <div className="w-full px-4 h-16 bg-blue-600 text-white flex items-center justify-between pl-10 shadow-md">
      {/* Search Bar */}
      <div className=" flex items-center gap-4">
        <GoSidebarExpand
          onClick={() => dispatch(setToggle(!toggleValue))}
          size={26}
          className=" z-20 left-[500px] top-2 cursor-pointer"
        />
        <FaBars
          onClick={() =>
            dispatch(setEditorSidebarToggle(!editorSidebarToggleValue))
          }
          size={22}
          className=" z-20 left-[500px] top-2 cursor-pointer"
        />
      </div>
      <div className="w-auto flex items-center gap-4">
        <SearchBar
          placeholder="Search..."
          onClick={OnClickHandler}
          onChange={OnChangeHandler}
        />
      </div>

      {/* User Profile and Settings */}
      <div className="flex gap-4 items-center justify-between">
        <FaCog title="Setting" size={20} className="text- cursor-pointer" />
        {/* <FaUserCircle
          title="Profile"
          size={24}
          className="text- cursor-pointer"
        /> */}
        <UserProfile />
      </div>
    </div>
  );
};


const UserProfile = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter(); // For navigation in Next.js

  const handleNavigate = () => {
    router.push("/private/rbac/admin-panel//profile"); // Navigate to the profile page
  };

  return (
    <div className="relative inline-block">
      {/* User Icon */}
      <FaUserCircle
        title="Profile"
        size={24}
        className="text-white cursor-pointer"
        onMouseEnter={() => setShowPopup(true)} // Show popup on hover
        onMouseLeave={() => setShowPopup(false)} // Hide popup when not hovering
        onClick={handleNavigate} // Navigate on click
      />

      {/* Popup */}
      {showPopup && (
        <div
          className="absolute right-0 mt-2 w-48 p-4 bg-white border rounded-lg shadow-lg"
          onMouseEnter={() => setShowPopup(true)} // Keep popup open while hovering over it
          onMouseLeave={() => setShowPopup(false)} // Hide popup when not hovering
        >
          <p className="text-sm font-medium text-gray-800">John Doe</p>
          <p className="text-xs text-gray-600">johndoe@example.com</p>
          <p className="text-xs text-gray-500">Member since 2021</p>
        </div>
      )}
    </div>
  );
};



export default TopBar;
