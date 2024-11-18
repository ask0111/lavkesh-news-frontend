
"use client"
// Define the shape of a user's permissions
interface UserPermission {
    canUploadMedia: boolean;
    canCreatePost: boolean;
    canEditPost: boolean;
    canDeletePost: boolean;
    allowedCategories: string[]; // List of categories the user is allowed to manage
  }
  
  // Define the permissions state structure
  type PermissionsState = Record<string, UserPermission>;
  
  // Example User structure
  interface User {
    id: string; // Unique identifier for the user
    name: string; // Name of the user
  }

  
  import React, { useState } from "react";

const users = [
  { id: "user1", name: "Editor 1" },
  { id: "user2", name: "Editor 2" },
]; // Example user data
const categories = ["Technology", "News", "Lifestyle", "Health"]; // Example categories

const ControlPage = () => {
  const [permissions, setPermissions] = useState(
    users.reduce((acc, user) => {
      acc[user.id] = {
        canUploadMedia: false,
        canCreatePost: false,
        canEditPost: false,
        canDeletePost: false,
        allowedCategories: [],
      };
      return acc;
    }, {})
  );

  const handlePermissionChange = (userId, permission) => (e) => {
    const { checked } = e.target;
    setPermissions((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [permission]: checked,
      },
    }));
  };

  const handleCategoryChange = (userId, category) => (e) => {
    const { checked } = e.target;
    setPermissions((prev) => {
      const allowedCategories = prev[userId].allowedCategories;
      return {
        ...prev,
        [userId]: {
          ...prev[userId],
          allowedCategories: checked
            ? [...allowedCategories, category]
            : allowedCategories.filter((cat) => cat !== category),
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Permissions:", permissions);
    // Save permissions via API
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Admin Control Panel</h1>
      <p className="text-gray-600 mb-6">
        Assign permissions for specific users to manage blogs, upload media, and control categories.
      </p>

      <form onSubmit={handleSubmit}>
        {users.map((user) => (
          <div key={user.id} className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Upload Media Permission */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={permissions[user.id].canUploadMedia}
                  onChange={handlePermissionChange(user.id, "canUploadMedia")}
                />
                <span className="ml-2">Allow Upload Media</span>
              </label>

              {/* Create Post Permission */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={permissions[user.id].canCreatePost}
                  onChange={handlePermissionChange(user.id, "canCreatePost")}
                />
                <span className="ml-2">Allow Create Post</span>
              </label>

              {/* Edit Post Permission */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={permissions[user.id].canEditPost}
                  onChange={handlePermissionChange(user.id, "canEditPost")}
                />
                <span className="ml-2">Allow Edit Post</span>
              </label>

              {/* Delete Post Permission */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={permissions[user.id].canDeletePost}
                  onChange={handlePermissionChange(user.id, "canDeletePost")}
                />
                <span className="ml-2">Allow Delete Post</span>
              </label>
            </div>

            {/* Category-Specific Permissions */}
            <div className="mt-4">
              <h3 className="text-md font-medium">Allowed Categories:</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600"
                      checked={permissions[user.id].allowedCategories.includes(
                        category
                      )}
                      onChange={handleCategoryChange(user.id, category)}
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Save Permissions
        </button>
      </form>
    </div>
  );
};

export default ControlPage;


