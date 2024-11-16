'use client'
import React, { useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Editor",
    bio: "Passionate about writing impactful stories and exploring the world of news.",
    profilePicture: "https://via.placeholder.com/150",
    blogPosts: 25,
    drafts: 5,
    published: 20,
    assignedCategories: ["Technology", "Health", "Business"],
  });

  const handleEditProfile = () => {
    alert("Edit profile feature is under construction!");
  };

  const handleLogout = () => {
    alert("You have been logged out.");
    // Add your logout logic here.
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button
              onClick={handleEditProfile}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full text-xs hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
              {user.role}
            </span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-600 mt-2">{user.bio}</p>
        </div>

        {/* Blog/News Stats */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Blog/News Stats</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold">{user.blogPosts}</h4>
              <p className="text-gray-500">Total Posts</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold">{user.drafts}</h4>
              <p className="text-gray-500">Drafts</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold">{user.published}</h4>
              <p className="text-gray-500">Published</p>
            </div>
          </div>
        </div>

        {/* Assigned Categories */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Assigned Categories</h3>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            {user.assignedCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

