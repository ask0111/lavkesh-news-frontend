import { setEditorSettingToggle } from "@/common-component/redux-config/slices/toggleSlice";
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import { useState } from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import PublishButton from "./PublishButton";
import Select from "react-select";

export function SettingsSidebar({ handleChange }: { handleChange: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, emptyPosts, loading, error } = useSelector(
    (state: RootState) => state.blogPosts
  );

  // const [categories, setCategories] = useState([
  //   "Technology",
  //   "Health",
  //   "Business",
  //   "Entertainment",
  //   "Sports",
  // ]);
  const [categoriesOptions] = useState([
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Business", label: "Business" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Sports", label: "Sports" },
    { value: "Cricket", label: "Cricket" },
    { value: "Archey", label: "Archey" },
    { value: "Hockey", label: "Hockey" },
    { value: "Footwall", label: "Footwall" },
    { value: "Boxing", label: "Boxing" },
  ]);
  const [newTag, setNewTag] = useState("");
  
  const handleCategoryChange = (selectedOptions: any) => {
    const selectedCategories = selectedOptions.map((option: any) => option.value);
    handleChange("categories", selectedCategories);
  };

  const addTag = () => {
    if (newTag.trim() && !posts.tags.includes(newTag)) {
      handleChange("tags", [...posts.tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: any) => {
    handleChange(
      "tags",
      posts.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="min-h-screen relative  text-gray-700 px-1 py-6">
      <RxCross1
        onClick={() => dispatch(setEditorSettingToggle(false))}
        className="w-7 h-6 cursor-pointer absolute top-0 left-0"
      />
      <PublishButton />

      <h2 className="text-xl font-semibold my-4">Blog Settings</h2>

      {/* Category Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <Select
          isMulti
          value={categoriesOptions.filter((option) =>
            posts.categories.includes(option.value)
          )}
          onChange={handleCategoryChange}
          options={categoriesOptions}
          placeholder="Select Categories"
          className={`${
            emptyPosts?.categories ? "border border-red-500" : "border"
          }`}
        />
        {emptyPosts?.categories && (
          <p className="text-red-500 text-sm">{emptyPosts?.categories}</p>
        )}
      </div>

      {/* <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={posts.categories}
          onChange={(e) => handleChange("categories", e.target.value)}
          className={`w-full px-3 py-2 ${
            !emptyPosts?.categories ? "border" : "border border-red-500"
          } rounded text-gray-700`}
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
        {emptyPosts?.categories && (
          <p className="text-red-500 text-sm">{emptyPosts?.categories}</p>
        )}
      </div> */}

      {/* URL */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">URL Slug</label>
        <input
          type="text"
          value={posts.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          className={`w-full px-3 py-2 ${
            !emptyPosts?.slug ? "border" : "border border-red-500"
          } rounded`}
          placeholder="Enter URL slug"
        />
        {emptyPosts?.slug && <p className="text-red-500">{emptyPosts?.slug}</p>}
      </div>
      <div className="my-6">
        <div className="flex items-center gap-2 font-semibold justify-start ">
          <input
            type="checkbox"
            checked={posts.headline}
            onChange={(e) => handleChange("headline", !posts.headline)}
            // className="w-full px-3 py-2 rounded border"
            placeholder="Enter URL slug"
          />
          <span>Add to breakings news</span>
        </div>
      </div>

      {/* Meta Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Meta Title</label>
        <input
          type="text"
          value={posts.meta.title}
          onChange={(e) =>
            handleChange("meta", {
              description: posts.meta.description,
              title: e.target.value,
            })
          }
          className="w-full px-3 py-2 rounded border"
          placeholder="Enter Meta Title"
        />
      </div>

      {/* Meta Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Meta Description
        </label>
        <textarea
          value={posts.meta.description}
          onChange={(e) =>
            handleChange("meta", {
              title: posts.meta.title,
              description: e.target.value,
            })
          }
          className="w-full px-3 py-2 rounded border "
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
          {posts.tags.map((tag, index) => (
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
    </div>
  );
}
