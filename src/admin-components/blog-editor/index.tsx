"use client";
import { setEditorSettingToggle } from "@/common-component/redux-config/slices/toggleSlice";
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import { useEffect, useState } from "react";
import { VscLayoutSidebarRight } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { TinyMCEEditor } from "./TinyMCE";
import { SettingsSidebar } from "./SettingSidebar";
import { setPosts } from "@/common-component/redux-config/slices/blogPostSlice";
import { apiService } from "@/services/axios.service";
import { handleError } from "../utils/error.handler";
import { useToast } from "@/common-component/custom-toast/ToastContext";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function NewPost({
  editId,
}: {
  editId: string | string[] | undefined;
}) {
  const [preview, setPreview] = useState(false);
  const { showToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, emptyPosts, loading, error } = useSelector(
    (state: RootState) => state.blogPosts
  );

  const { editorSettingToggle } = useSelector(
    (state: RootState) => state.toggle
  );
  const { user } = useSelector(
    (state: RootState) => state.checkAuth
  );

  useEffect(() => {
    const getEditPost = async (editId: string | string[] | undefined) => {
      try {
        const res = await apiService.get(`blogs/${editId}`);
        if (res.data.status) {
          dispatch(setPosts(res.data.data));
        }
      } catch (error) {
        handleError(error, showToast);
      }
    };
    getEditPost(editId);
  }, [editId]);

  const handleChange = (field: string, value: any) => {
    if (field === "title") {
      dispatch(
        setPosts({
          ...posts,
          [field]: value,
          slug: value.trim().split(" ").join("-"),
          meta: {
            ...posts.meta,
            title: value.substring(0, 60),
          },
        })
      );
    } else {
      dispatch(
        setPosts({
          ...posts,
          [field]: value,
        })
      );
    }
  };

  const handleEditorChange = (content: any) => {
    handleChange("content", content);
  };

  return (
    <div className="w-full mx-auto px-6 py-4 bg-white shadow-md rounded-md">
      <div
        style={{ justifyContent: "end" }}
        className="w-full flex justify-end gap-4"
      >
        <button className=" text-xs flex justify-center">
          <span
            onClick={() => setPreview(false)}
            className={`${
              !preview ? "bg-blue-600 text-white font-extrabold" : ""
            } border px-6 py-1`}
          >
            Edit
          </span>{" "}
          <span
            onClick={() => setPreview(true)}
            className={`${
              preview ? "bg-blue-600 text-white font-extrabold" : ""
            } border px-6 py-1`}
          >
            Preview
          </span>
        </button>
        <div title="Setting" className="">
          <VscLayoutSidebarRight
            onClick={() => dispatch(setEditorSettingToggle(true))}
            color="black"
            style={{ width: "24px", height: "24px" }}
            className=" cursor-pointer"
          />
        </div>
      </div>
      <br />
      {preview ? (
        <>
          <div className="text-xs w-[75%] m-auto bg-white p-12">
            <div>
              <h1 className="text-h1 font-black font-serif">{posts.title} </h1>
              <br />
              <p>{posts.subTitle}</p>
            </div>
            <div className="p-4 bg-white shadow-md flex justify-between items-center rounded-lg border border-gray-200">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-m hover:shadow-lg transition-shadow duration-300">
                <img
                  src={user.avtaar}
                  alt={"name"}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600">Posts: {"100"}</p>
                </div>
              </div>
              {/* Update time */}
              <div>
                <div className="flex items-center text-gray-600 mb-4">
                  <AiOutlineClockCircle className="mr-2 text-lg" />
                  <span>
                    Published on{" "}
                    <span className="font-h2">{new Date().toDateString()}</span>{" "}
                  </span>
                </div>

                {/* Social Media Sharing Icons */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Share on:</p>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 transition duration-300"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebook size={20} />
                    </a>
                    <a
                      href="#"
                      className="text-blue-700 hover:text-blue-900 transition duration-300"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <br />
              {!posts.image ?
              <img src=""  className="w-full border h-40" alt="image" /> : <img
                src={posts.image || ""}
                width={1000}
                height={1000}
                alt="Image"
                className="w-auto h-auto border"
              />}
            </div>
            <div className="mt-2">
              <div
                className="first-letter:uppercase first-latter:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left text-xl font-sans
"
                dangerouslySetInnerHTML={{ __html: posts.content }}
              />
            </div>
          </div>
          
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Enter the title"
              value={posts.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={`w-full p-2 border-b ${
                emptyPosts.title ? "border-red-500" : "border-gray-300"
              } focus:border-focus`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Subtitle
            </label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Enter the subtitle"
              value={posts.subTitle}
              onChange={(e) => handleChange("subTitle", e.target.value)}
              className={`w-full p-2 border-b ${
                emptyPosts.subTitle ? "border-red-500" : "border-gray-300"
              } focus:border-focus`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Image Link
            </label>
            <input
              type="text"
              style={{ outline: "none" }}
              placeholder="Image link"
              value={posts.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className={`w-full p-2 border-b ${
                emptyPosts.image ? "border-red-500" : "border-gray-300"
              } focus:border-focus`}
            />
            {emptyPosts?.image && (
              <p className="text-red-500 text-sm">{emptyPosts?.image}</p>
            )}
          </div>
          <TinyMCEEditor
            label="Content"
            handleEditorChange={handleEditorChange}
            content={posts.content}
          />
          {emptyPosts?.content && (
            <p className="text-red-500 text-sm">{emptyPosts?.content}</p>
          )}
        </>
      )}
      <br />
      {/* {editorSettingToggle && ( */}
      <div
        className={`fixed top-0 right-0 z-50 h-[100vh] bg-white p-4 shadow-md overflow-y-scroll 
          transition-transform duration-500 ease-in-out ${
            editorSettingToggle ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ width: "350px" }}
      >
        <SettingsSidebar handleChange={handleChange} />
      </div>
      {/* )} */}
    </div>
  );
}
