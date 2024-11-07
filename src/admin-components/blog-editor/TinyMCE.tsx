"use client";
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import EditorSidebar from "../navigation-bars/EditorSideBar";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
        style={{outline: 'none'}}
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
                style={{outline: 'none'}}

          type="text"
          placeholder="Enter the subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full p-2 border-bottom border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Upload Cover Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Content
        </label>
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

      <button
        onClick={togglePreview}
        className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
      >
        {preview ? "Edit" : "Preview"}
      </button>

      {preview && (
        <div className="border border-gray-300 p-4 mt-6 rounded-md bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview</h2>
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
      )}
    </div>
  );
}
