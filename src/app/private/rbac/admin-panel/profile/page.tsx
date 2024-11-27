"use client";
import { handleError } from "@/admin-components/utils/error.handler";
import { useToast } from "@/common-component/custom-toast/ToastContext";
import { RootState } from "@/common-component/redux-config/store";
import { apiService } from "@/services/axios.service";
import { removeCookies } from "@/services/cookies.service";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const imageRef: any = useRef();
  const profileId = useSelector(
    (state: RootState) => state.checkAuth?.user?._id
  );
  const [imageFile, setImageFile] = useState<any>(null);
  const [user, setUser] = useState({
    _id: "",
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Editor",
    bio: "Passionate about writing impactful stories and exploring the world of news.",
    avtaar: "https://via.placeholder.com/150",
    blogPosts: 25,
    drafts: 5,
    published: 20,
    assignedCategories: ["Technology", "Health", "Business"],
  });
  const [isEditing, setIsEditing] = useState({
    avtaar: "",
    name: false,
    email: false,
    bio: false,
    assignedCategories: false,
  });
  const [updateFileds, setUpdateFileds] = useState<{
    [key: string]: string | string[] | number;
  }>();
  const { showToast } = useToast();

  useEffect(() => {
    const getProfile = async (profileId: string) => {
      try {
        const res = await apiService.get(`/auth/profile/${profileId}`);
        const response = res.data;
        if (response.status) {
          setUser({ ...user, ...response.data });
        }
      } catch (error) {
        handleError(error, showToast);
      }
    };
    getProfile(profileId);
  }, [profileId]);

  if (!profileId && !user._id) {
    return (
      <div className="w-full bg-white h-[100%] p-6 font-extrabold text-h1 text-red-600">
        Profile data not found!
      </div>
    );
  } else {
    const handleEdit = (field: string) => {
      setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleInputChange = (field: string, value: string | string[]) => {
      setUser((prev) => ({ ...prev, [field]: value }));
      setUpdateFileds((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = (field: string) => {
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    };

    const handleLogout = () => {
      removeCookies('token');
      window.location.href = '/private/rbac/login'
      showToast("You have been logged out.", 'success');
    };

    const changesSubmit = async (userId: string) => {
      if (!userId) {
        showToast("user id not found!", "error");
      }
      const formData = new FormData();
      if (Object.keys(updateFileds || {}).length > 0) {
        formData.append("updateFields", JSON.stringify(updateFileds));
      }
      if (imageFile) {
        formData.append("profilePicture", imageFile);
      }
      try {
        const res = await apiService.put(
          `/auth/edit-profile/${userId}`,
          formData,
          {
            "Content-Type": "multipart/form-data",
          }
        );
        const response = res.data;
        if (response.status) {
          showToast(response.message, "success");
        } else {
          showToast(response.message, "error");
        }
      } catch (error) {
        handleError(error, showToast);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          // Set the profile picture to the base64 image data
          setUser((prev) => ({
            ...prev,
            avtaar: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={imageRef}
                className="hidden border border-gray-300 rounded px-2 py-1 w-full"
              />
              <img
                src={user.avtaar}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              {isEditing.avtaar ? (
                <div className="">
                  <button
                    onClick={() => handleSave("avtaar")}
                    className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full text-xs hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      imageRef.current?.click(); // Ensure `imageRef` exists before calling `click()`
                      handleEdit("avtaar");
                    }}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full text-xs hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {isEditing.name ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.name
                )}
                {isEditing.name ? (
                  <button
                    onClick={() => handleSave("name")}
                    className="ml-2 text-sm text-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit("name")}
                    className="ml-2 text-sm text-blue-600"
                  >
                    Edit
                  </button>
                )}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
                {user.role}
              </span>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">About</h3>
            {isEditing.bio ? (
              <div>
                <textarea
                  value={user.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="border border-gray-300 rounded w-full mt-2 px-2 py-1"
                />
                <button
                  onClick={() => handleSave("bio")}
                  className="mt-2 text-sm text-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-gray-600 mt-2">
                {user.bio}{" "}
                <button
                  onClick={() => handleEdit("bio")}
                  className="ml-2 text-sm text-blue-600"
                >
                  Edit
                </button>
              </p>
            )}
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
            {isEditing.assignedCategories ? (
              <div>
                <textarea
                  value={user.assignedCategories.join(", ")}
                  onChange={(e) =>
                    handleInputChange(
                      "assignedCategories",
                      e.target.value.split(",").map((cat) => cat.trim())
                    )
                  }
                  className="border border-gray-300 rounded w-full mt-2 px-2 py-1"
                />
                <button
                  onClick={() => handleSave("assignedCategories")}
                  className="mt-2 text-sm text-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <ul className="list-disc list-inside mt-2 text-gray-600">
                {user.assignedCategories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
                <button
                  onClick={() => handleEdit("assignedCategories")}
                  className="ml-2 text-sm text-blue-600"
                >
                  Edit
                </button>
              </ul>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => changesSubmit(user._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Changes
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
}
