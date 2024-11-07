// components/Sidebar.js
"use client";
import { useState } from "react";
import { FiUpload, FiImage, FiVideo, FiMusic, FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/common-component/redux-config/store";

export default function EditorSidebar() {
  const [activeTab, setActiveTab] = useState("Images");
  const toggle = useSelector((state: RootState) => state.toggle.editorSidebarToggleValue);

  return (
    <div
      style={{ width: "280px", display: toggle ? "block" : "none" }}
      className="w-20  bg-white h-screen p-4 shadow-lg"
    >
      {/* Search and Upload Section */}
      <div className="flex items-center border px-2 mb-4">
        <FiSearch className="text-gray-500 mr-2 cursor-pointer" />
        <input
          style={{ outline: "none" }}
          type="text"
          placeholder="Search images by keyword, tags, colour..."
          className="bg-gray-200  p-2 rounded-full flex-1 text-sm outline-none"
        />
      </div>

      {/* Tab Section */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveTab("Images")}
          className={`${
            activeTab === "Images"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
          } font-semibold text-sm pb-1`}
        >
          Images
        </button>
        <button
          onClick={() => setActiveTab("Videos")}
          className={`${
            activeTab === "Videos"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
          } font-semibold text-sm pb-1`}
        >
          Videos
        </button>
        <button
          onClick={() => setActiveTab("Audio")}
          className={`${
            activeTab === "Audio"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
          } font-semibold text-sm pb-1`}
        >
          Audio
        </button>
      </div>

      <button className="w-full bg-purple-600 border text-gray-400 py-2 px-4 rounded-full flex items-center justify-center mb-6">
        <FiUpload className="mr-2" />
        Upload files
      </button>

      {/* Cloud Storage Icons */}
      <div className="bg-gray-50 p-4 rounded-lg text-center mb-6">
        <p className="text-sm text-gray-700 font-semibold mb-2">
          Faster media uploads
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Easily access and upload all your media files by connecting your Canva
          account to Dropbox, Google Drive and Box.
        </p>
      </div>

      {/* Media Thumbnails */}
      {/* <div className="grid grid-cols-2 gap-2">
        <img src="/path-to-image1.jpg" alt="Media 1" className="w-full h-24 object-cover rounded-md" />
        <img src="/path-to-image2.jpg" alt="Media 2" className="w-full h-24 object-cover rounded-md" />
        <img src="/path-to-image3.jpg" alt="Media 3" className="w-full h-24 object-cover rounded-md" />
        <img src="/path-to-image4.jpg" alt="Media 4" className="w-full h-24 object-cover rounded-md" />
      </div> */}
    </div>
  );
}
