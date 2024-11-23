"use client";
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import React from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { validate } from "../validations/BlogForm.validation";
import { apiService } from "@/services/axios.service";
import { useToast } from "@/common-component/custom-toast/ToastContext";
import { useDispatch } from "react-redux";
import { clearPosts, setEmptyPosts, setLoading } from "@/common-component/redux-config/slices/blogPostSlice";
import { handleError } from "../utils/error.handler";

const PublishButton = () => {
    const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.blogPosts
  );
  const { showToast } = useToast();

  const handlePublish = async (e: React.FormEvent, postId: string | undefined) => {
    e.preventDefault();
    dispatch(setLoading(true))
    const validationErrors: object = validate(posts);
    if (Object.keys(validationErrors).length > 0) {
        dispatch(setEmptyPosts(validationErrors));
        showToast('Fill required fields!', 'warning');
        dispatch(setLoading(false))
    } else {
      try {

          const res = !postId ? await apiService.post("/blogs/", posts) : await apiService.put(`/blogs/${postId}`, posts);
          const response = res.data;
          if (response.status) {
            showToast(response.message, "success");
            dispatch(setLoading(false))
            !postId && dispatch(clearPosts({}))

        } else {
            showToast(response.message, "error");
            dispatch(setLoading(false))
          }
      } catch (error) {
        handleError(error, showToast);
        dispatch(setLoading(false))
        console.log('Post Error: ', error);
      }
      dispatch(setEmptyPosts({}));
    }
  };
  return (
    <button
      onClick={(e)=>handlePublish(e, posts?._id)}
      className={`absolute top-0 right-2 flex items-center gap-2 px-4 py-1 text-white rounded-md shadow-sm ${
        loading ? "bg-gray-400" : posts._id ? "bg-red-600" :  "bg-blue-600"
      } hover:opacity-90 transition`}
      disabled={loading}
    >
      {!loading ? <BsFillSendArrowUpFill /> : 'lodding....'}
      {posts._id ? "Update":"Publish"}
    </button>
  );
};

export default PublishButton;
