"use client";
import { TinyMCEEditor } from "@/admin-components/blog-editor/TinyMCE";
import React, { useState } from "react";

const page = () => {
    const [preview, setPreview] = useState(false)
    const [pageContent, setPageContent] = useState("")
  const handleEditorChange = (content: any) => {
    setPageContent(content);
  };

  return (
    <div className="bg-white p-6">
        <PageCreator />
        <button className="w-full flex justify-center">
        <span
          onClick={() => setPreview(false)}
          className={`${
            !preview ? "bg-red-500 text-white font-extrabold" : ""
          } border px-6 py-1`}
        >
          Edit
        </span>{" "}
        <span
          onClick={() => setPreview(true)}
          className={`${
            preview ? "bg-red-500 text-white font-extrabold" : ""
          } border px-6 py-1`}
        >
          Preview
        </span>
      </button>
      <br />
      {preview ? (
        <div className="border border-gray-300 p-4 mt-6 rounded-md bg-gray-50">
          <h2 className="text-2xl text-center font-bold text-red-500 mb-4">
            Preview
          </h2>
          <div
            className="mt-4 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>
      ) : 
      <TinyMCEEditor label="Page" handleEditorChange={handleEditorChange} />}
    </div>
  );
};


 function PageCreator() {
  const [pageName, setPageName] = useState("");
  const [pages, setPages] = useState(["Home", "About", "Contact"]); // Default pages
  const [selectedPage, setSelectedPage] = useState("");

  // Handle creating a new page
  const handleCreatePage = () => {
    if (pageName.trim() && !pages.includes(pageName)) {
      setPages([...pages, pageName]);
      setPageName(""); // Clear input
    } else {
      alert("Page already exists or is invalid!");
    }
  };

  // Handle selecting a page
  const handleSelectPage = (event:any) => {
    setSelectedPage(event.target.value);
  };

  return (
      <div className=" p-6 w-full mx-auto max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Page Creator</h2>

        {/* Create Page Form */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Create New Page
          </label>
          <input
            type="text"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter page name"
          />
          <button
            onClick={handleCreatePage}
            className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Create Page
          </button>
        </div>

        {/* Select Form */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Page
          </label>
          <select
            value={selectedPage}
            onChange={handleSelectPage}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a page
            </option>
            {pages.map((page, index) => (
              <option key={index} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Page Display */}
        {selectedPage && (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-700">
              Selected Page: <span className="text-blue-500">{selectedPage}</span>
            </h3>
          </div>
        )}
      </div>
  );
}


export default page;
