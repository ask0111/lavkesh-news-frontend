"use client";
import { LineBlog } from "@/admin-components/blog-formates/LineBlog";
import { SquareBlog } from "@/admin-components/blog-formates/SquareBlog";
import { useState } from "react";
import { FaThList } from "react-icons/fa";
import { PiSquaresFourBold } from "react-icons/pi";

const blogDatas = [
  {
    id: 1,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    title: "Understanding React Basics",
    subTitle: "A beginner's guide to getting started with React.js",
    isRecycleBin: false,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "Mastering JavaScript",
    subTitle: "Learn advanced JavaScript concepts to level up your skills",
    isRecycleBin: true,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "CSS Grid Layout",
    subTitle: "How to design modern and responsive layouts using CSS Grid",
    isRecycleBin: false,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    title: "Next.js for Beginners",
    subTitle: "Understand the basics of building SSR applications with Next.js",
    isRecycleBin: false,
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150",
    title: "Understanding TypeScript",
    subTitle: "Why TypeScript is essential for modern web development",
    isRecycleBin: true,
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    title: "Node.js Performance Tuning",
    subTitle:
      "Tips and tricks to improve your Node.js application's performance",
    isRecycleBin: false,
  },
  {
    id: 7,
    image: "https://via.placeholder.com/150",
    title: "React Hooks Deep Dive",
    subTitle: "A comprehensive guide to React Hooks and their use cases",
    isRecycleBin: true,
  },
  {
    id: 8,
    image: "https://via.placeholder.com/150",
    title: "Introduction to MongoDB",
    subTitle: "Getting started with MongoDB for database management",
    isRecycleBin: false,
  },
  {
    id: 9,
    image: "https://via.placeholder.com/150",
    title: "Improving UX with Tailwind CSS",
    subTitle: "Tips for creating better user experiences with Tailwind CSS",
    isRecycleBin: false,
  },
  {
    id: 10,
    image: "https://via.placeholder.com/150",
    title: "Deploying to AWS",
    subTitle: "Learn how to deploy your web apps on AWS services",
    isRecycleBin: true,
  },
];

export default function ManageBlogs() {
  const [formate, setFormate] = useState<string>("Line");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {formate === "Line" ? (
          <FaThList
            size={16}
            className="cursor-pointer"
            onClick={() => setFormate("Square")}
          />
        ) : (
          <PiSquaresFourBold
            className="cursor-pointer"
            onClick={() => setFormate("Line")}
          />
        )}
        <br />
        <div className="flex flex-wrap gap-2">
          {formate !== "Line"
            ? blogDatas.map((blogData) => <LineBlog blog={blogData} />)
            : blogDatas.map((blogData) => <SquareBlog blog={blogData} />)}
        </div>
      </div>
    </div>
  );
}
