"use client";
import { useEffect, useRef, useState } from "react";
import { FiUpload, FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import StorageSlider from "../common/StorageSlider";
import { IoCloseOutline } from "react-icons/io5";
import { useToast } from "@/common-component/custom-toast/ToastContext";
import { apiService } from "@/services/axios.service";
import { AiFillDelete, AiOutlineCopy } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { setEditorSidebarToggle } from "@/common-component/redux-config/slices/toggleSlice";
import { useDispatch } from "react-redux";

const usedStorage = 35; // GB used
const totalStorage = 100; // GB total

export default function EditorSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<"Image" | "Video" | "Audio">(
    "Image"
  );
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Image preview URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Selected file to upload
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [closeStorageSlider, setCloseStorageSlider] = useState(true);
  const [closeMediaPopop, setCloseMediaPopop] = useState(true);
  const [searchFileText, setSearchFileTest] = useState<string>("");

  const ActiveTabHandler = (value: "Image" | "Video" | "Audio") => {
    setActiveTab(value);
    setPreviewImage(null);
    setUploadedImages([]);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeAndAddFile = (fileId: any, newFileData: any) => {
    setUploadedImages((prevUploadedFiles) => {
      if (fileId) {
        const filteredImages = prevUploadedFiles.filter(
          (item) => item._id !== fileId
        );
        return [...filteredImages];
      } else {
        return [newFileData, ...prevUploadedFiles];
      }
    });
  };

  const getAllUploadedData = async (searchText: string) => {
    try {
      const res = await apiService.get(
        `/s3/get-s3-urls?fileType=${activeTab.toLowerCase()}&search=${searchText}`
      );
      const data = res.data;
      if (data.status) {
        setUploadedImages(data.data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
    }
  };

  useEffect(() => {
    getAllUploadedData(searchFileText);
  }, [activeTab]);

  const handleUpload = async () => {
    if (!selectedFile) {
      showToast("Please select a file first!", "warning");
      return;
    }
    const fileData = {
      folderPath: activeTab.toLowerCase(),
      fileName: selectedFile.name,
      fileType: selectedFile.type,
      sizeInBytes: selectedFile.size,
      metadata: {
        resolution: "1920x1080", // Example metadata
        format: selectedFile.type,
      },
    };
    try {
      const res = await apiService.post("/s3/generate-presigned-url", fileData);
      const response = res.data;

      if (response.status) {
        const { presignedUrl, fileData } = response.data;
        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });
        if (!uploadResponse.ok) throw new Error("Failed to upload file to S3");
        removeAndAddFile(null, fileData);
        setPreviewImage(null);
        setSelectedFile(null);
        showToast("File uploaded successfully!", "success");
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast("Error uploading file. Please try again.", "error");
    }
  };

  const handleDeleteImage = async (type: string, fileId: number) => {
    if (!fileId) {
      showToast(`${type} is not found!`, "error");
    }
    try {
      const res = await apiService.delete(`/s3/delete-s3-url/${fileId}`);
      const response = res.data;
      if (response.status) {
        removeAndAddFile(response.data._id, null);
        showToast(response.message, "success");
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      showToast("Error deleting file.", "error");
    }
  };

  // const handleImageClick = (imageUrl: string) => {
  //   // copy(imageUrl);
  //   showToast("This is a success message!", "success");
  //   // alert("Image URL copied to clipboard!");
  // };

  // const handleImageClick = (url: string) => {
  //   navigator.clipboard.writeText(url) // Copies the URL to the clipboard
  //     .then(() => {
  //       showToast("Image URL copied to clipboard!", 'info'); // Feedback to the user
  //     })
  //     .catch((err) => {
  //       showToast("Failed to copy URL", 'error'); // Feedback to the user
  //       console.error("Failed to copy URL: ", err);
  //     });
  // };

  const [showCopyIcon, setShowCopyIcon] = useState<string | null>(null);
  const handleImageClick = (url: string, id: string) => {
    navigator.clipboard
      .writeText(url) // Copy the URL
      .then(() => {
        setShowCopyIcon(id); // Show copy icon for the clicked image
        setTimeout(() => setShowCopyIcon(null), 2000); // Hide the icon after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <>
      <RxCross1
        onClick={() => dispatch(setEditorSidebarToggle(false))}
        className="w-7 h-6 p-1 shadow-sm rounded-full bg-transparent cursor-pointer absolute top-0 right-0"
      />
      {/* Search and Upload Section */}
      <div className="flex items-center border px-2 mb-4">
        <FiSearch
          onClick={() => getAllUploadedData(searchFileText)}
          className=" mr-2 cursor-pointer"
        />
        <input
          style={{ outline: "none" }}
          type="text"
          onChange={(e) => setSearchFileTest(e.target.value)}
          placeholder="Search images by keyword, tags, colour..."
          className="p-2 rounded-full flex-1 text-sm outline-none"
        />
      </div>

      {/* Tab Section */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => ActiveTabHandler("Image")}
          className={`${
            activeTab === "Image"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
          } font-semibold text-sm pb-1`}
        >
          Images
        </button>
        <button
          onClick={() => ActiveTabHandler("Video")}
          className={`${
            activeTab === "Video"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
          } font-semibold text-sm pb-1`}
        >
          Videos
        </button>
        <button
          onClick={() => ActiveTabHandler("Audio")}
          className={`${
            activeTab === "Audio"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
          } font-semibold text-sm pb-1`}
        >
          Audio
        </button>
      </div>

      {/* {closeStorageSlider && ( */}
        <div className={`relative flex items-center justify-center bg-gray-100 p-6  ${!closeStorageSlider ? ' hide-animate' : ''}`}>
          <IoCloseOutline
            onClick={() => setCloseStorageSlider(false)}
            className="absolute top-2 right-2 cursor-pointer "
          />
          <StorageSlider
            usedStorage={usedStorage}
            totalStorage={totalStorage}
          />
        </div>
      {/* )} */}
      <br />
      {/* Upload Button */}

      <button
        onClick={handleButtonClick}
        className="w-full bg-purple-600 border text-white py-2 px-4 rounded-full flex items-center justify-center mb-6"
      >
        <FiUpload className="mr-2" />
        Upload files
      </button>
      <input
        type="file"
        accept={
          activeTab === "Image"
            ? "image/*"
            : activeTab === "Video"
            ? "video/*"
            : "audio/*"
        }
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {/* Preview Section */}

      {previewImage ? (
        <div className="mb-6 p-4 ">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Preview:</h4>
          <div className="border rounded-lg overflow-hidden mb-2">
            {activeTab === "Image" ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-24 object-contain"
              />
            ) : activeTab === "Video" ? (
              <video
                src={previewImage}
                controls
                width="100%"
                className="w-full h-24 object-contain"
              />
            ) : (
              <audio
                src={previewImage}
                controls
                className="w-full h-24 object-contain"
              />
            )}
          </div>
          <button
            onClick={handleUpload}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-full mt-2"
          >
            Upload {activeTab}
          </button>
        </div>
      ) : (
        // closeMediaPopop && (
          <div className={`relative bg-gray-50 p-4 rounded-lg text-center mb-6  ${!closeMediaPopop ? ' hide-animate' : ''}`}>
            <IoCloseOutline
              onClick={() => setCloseMediaPopop(false)}
              className="absolute top-2 right-2 cursor-pointer "
            />
            <p className="text-sm text-gray-700 font-semibold mb-2">
              Faster media uploads
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Easily access and upload all your media files by connecting your
              Canva account to Dropbox, Google Drive and Box.
            </p>
          </div>
        // )
      )}
      <br />
      {/* Display Uploaded Images */}
      <div className="flex overflow-y-scroll custom-scrollbar flex-wrap gap-3 bg-gray-100 border h-[400px] p-2 mb-6">
        {uploadedImages.map((file, index) => (
          <div
            key={index}
            style={{
              width: activeTab !== "Audio" ? "100px" : "100%",
              height: activeTab !== "Audio" ? "120px" : "120px",
            }}
            className="relative cursor-pointer p-1 rounded-md text-xs overflow-hidden bg-white border"
          >
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the `handleImageClick`
                handleDeleteImage(file.fileType, file._id);
              }}
              className="absolute top-1 z-20 right-1 text-red-500 bg-white rounded-full p-1 shadow hover:text-red-700"
            >
              <AiFillDelete size={16} />
            </button>

            {/* Conditional Rendering for Image/Video/Audio */}
            {activeTab === "Image" ? (
              <div
                className="relative"
                onClick={() => handleImageClick(file.fileUrl, file._id)}
              >
                <img
                  src={file.fileUrl}
                  alt={file.fileName}
                  className="w-full h-20 object-cover scale-100 hover:scale-125"
                />
                {showCopyIcon === file._id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <AiOutlineCopy className="text-white text-2xl animate-fade-in" />
                  </div>
                )}
              </div>
            ) : (
              <audio
                src={file.fileUrl}
                controls
                className="w-full h-full object-contain"
              />
            )}
            <p className="text-center h-10  text-gray-600 mt-1 line-clamp-1">
              {file.fileName}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
