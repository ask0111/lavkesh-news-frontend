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

export default function NewPost({editId}:{editId: string | string[] | undefined}) {
  const [preview, setPreview] = useState(false);
  const {showToast} = useToast()
  const dispatch = useDispatch<AppDispatch>();
  const { posts, emptyPosts, loading, error } = useSelector(
    (state: RootState) => state.blogPosts
  );

  const { editorSettingToggle } = useSelector(
    (state: RootState) => state.toggle
  );

  useEffect(()=>{
    const getEditPost = async(editId: string | string[] | undefined)=>{
        try {
          const res = await apiService.get(`blogs/${editId}`);
          console.log(res)
          if(res.data.status){
            dispatch(setPosts(res.data.data));
          }
        } catch (error) {
          handleError(error, showToast)
        }
    }
    getEditPost(editId)
  }, [editId])

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
          }
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
        <div className="  border-gray-300 p-1 mt-6 rounded-md bg-gray-50">
          <h2 className="text-2xl text-center font-bold mb-4">Preview</h2>
          <div className=" min-h-[100vh] border-gray-300 p-4 rounded-md bg-white">
            <h3 className="text-xl font-semibold text-gray-700">
              {posts.title}
            </h3>
            <h4 className="text-lg font-medium text-gray-600">
              {posts.subTitle}
            </h4>
            {posts.image && (
              <img
                src={posts.image}
                alt={"Image"}
                className="w-full h-64 object-cover border rounded-md mt-4"
              />
            )}
            <div
              className="mt-4 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: posts.content }}
            />
          </div>
        </div>
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
          style={{ width: "350px" }}        >
          <SettingsSidebar handleChange={handleChange} />
        </div>
      {/* )} */}
    </div>
  );
}
