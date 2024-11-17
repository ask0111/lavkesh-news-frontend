"use client";
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import EditorSidebar from "../navigation-bars/EditorSideBar";
import { VscLayoutSidebarRight } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import { setEditorSettingToggle } from "@/common-component/redux-config/slices/toggleSlice";
export default function NewPost() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { editorSettingToggle } = useSelector(
    (state: RootState) => state.toggle
  );

  const handleEditorChange = (content: any) => {
    setContent(content);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const togglePreview = () => {
    setPreview(!preview);
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
          onClick={()=> dispatch(setEditorSettingToggle(true))}
            color="black"
            style={{ width: "24px", height: "24px" }}
            className=" cursor-pointer"
          />
        </div>
      </div>
      <br />
      {preview ? (
        <div className="  border-gray-300 p-1 mt-6 rounded-md bg-gray-50">
          <h2 className="text-2xl text-center font-bold mb-4">
            Preview
          </h2>
        <div className=" min-h-[100vh] border-gray-300 p-4 rounded-md bg-white">
          <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
          <h4 className="text-lg font-medium text-gray-600">{subtitle}</h4>
          {image && (
            <img
              src={image}
              alt="Cover"
              className="w-full h-64 object-cover rounded-md mt-4"
            />
          )}
          <div
            className="mt-4 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border-bottom border-focus border-gray-300"
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
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2 border-bottom border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Image Link
            </label>
            <input
              type="text"
              // accept="image/*
              style={{ outline: "none" }}
              placeholder="Image link"
              onChange={handleImageUpload}
              className="w-full p-2 border-bottom border-gray-300 rounded-md"
            />
          </div>
          <TinyMCEEditor
            label="Content"
            handleEditorChange={handleEditorChange}
          />
        </>
      )}
      <br />
      {editorSettingToggle && (
        <div
          style={{ width: "350px", zIndex: "99", overflowY: "scroll" }}
          className="fixed top-0 right-0 p-4 shadow-md h-[100vh] bg-white w-96"
        >
          <NewsSettingsSidebar />
        </div>
      )}
    </div>
  );
}

export function NewsSettingsSidebar() {
  const [categories, setCategories] = useState([
    "Technology",
    "Health",
    "Business",
    "Entertainment",
    "Sports",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [newTag, setNewTag] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { editorSettingToggle } = useSelector(
    (state: RootState) => state.toggle
  );

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: any) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const saveSettings = () => {
    // Add your save logic here
    console.log({
      selectedCategory,
      metaTitle,
      metaDescription,
      tags,
      url,
    });
    alert("Settings Saved!");
  };

  return (
    <div className="min-h-screen relative  text-gray-700 px-1 py-6">
      <RxCross1
        onClick={() => dispatch(setEditorSettingToggle(false))}
        className="w-7 h-6 cursor-pointer absolute top-0 left-0"
      />
      <h2 className="text-xl font-semibold mb-4">Blog Settings</h2>

      {/* Category Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded text-gray-700"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* URL */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 rounded border text-white"
          placeholder="Enter URL slug"
        />
      </div>

      {/* Meta Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Meta Title</label>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="w-full px-3 py-2 rounded border text-white"
          placeholder="Enter Meta Title"
        />
      </div>

      {/* Meta Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Meta Description
        </label>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="w-full px-3 py-2 rounded border text-white"
          placeholder="Enter Meta Description"
          rows={4}
        ></textarea>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow px-3 py-2 border rounded "
            placeholder="Add Tag"
          />
          <button
            onClick={addTag}
            className="px-3 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded border text-sm flex items-center gap-2"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-red-400 hover:text-red-600"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={saveSettings}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export const TinyMCEEditor = ({
  label,
  handleEditorChange,
}: {
  label: string;
  handleEditorChange: any;
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <Editor
        //   apiKey={process.env.YOUR_TINYMCE_API_KEY}
        init={{
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            "checklist",
            "mediaembed",
            "export",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "advtemplate",
            "inlinecss",
            "markdown",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | removeformat",
          tinycomments_mode: "embedded",
        }}
        initialValue="Write your content here..."
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};
