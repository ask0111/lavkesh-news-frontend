import { setEditorSettingToggle } from "@/common-component/redux-config/slices/toggleSlice";
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";

export function SettingsSidebar({handleChange}: {handleChange: any}) {
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
    const { posts, loading, error } = useSelector((state: RootState) => state.blogPosts);
  
    const addTag = () => {
      if (newTag.trim() && !tags.includes(newTag)) {
        handleChange('tags', [...tags, newTag])
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
            value={posts.categories}
            onChange={(e) => handleChange("categories" ,e.target.value)}
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
            value={posts.url}
            onChange={(e) => handleChange('url' ,e.target.value)}
            className="w-full px-3 py-2 rounded border"
            placeholder="Enter URL slug"
          />
        </div>
        <div className="my-6">
          <div className="flex items-center gap-2 font-semibold justify-start ">
          <input
            type="checkbox"
            checked={posts.headline}
            onChange={(e) => handleChange('headline' , !posts.headline)}
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
            onChange={(e) => handleChange('meta',{'description': posts.meta.description, 'title':e.target.value})}
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
            onChange={(e) => handleChange('meta',{'title': posts.meta.title, 'description':e.target.value})}
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