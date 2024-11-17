
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import { TiEyeOutline } from "react-icons/ti";

export const SquareBlog = ({
  blog
}: any) => {

  return (
    <div style={{minWidth: '200px' }} className="bg-white roundedv-lg shadow-md flex flex-1 flex-col justify-between  mr-4 py-2 mb-4">
    {/* <div style={{minWidth: '200px', flexBasis: 1, flexGrow: 1 }} className="bg-white roundedv-lg shadow-md flex flex-1 flex-col justify-between  mr-4 py-2 mb-4"> */}
      {/* <div className="flex flex-col flex-grow"> */}
        <div className="border w-full h-auto ">
          <div className="w-full h-[200px]">
            <img
              src={blog.image}
              className="w-full h-full object-cover aspect-square"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="p-2 flex flex-col gap-2  flex-grow">
          <h2 className="text-xl font-semibold line-clamp-2">
            {blog.title}
          </h2>
          <span className="flex gap-1 justify-end items-center text-gray-400 text-xs"><TiEyeOutline size={16} /> {blog?.visitorCount}</span>
          <p className="text-gray-600 line-clamp-3">{blog.subTitle}</p>
        </div>
      {/* </div> */}
      <div className="flex gap-2 mt-4 justify-around">
        <span
          title="Edit"
          className="p-1 border-2 rounded-full border-green-500"
        >
          <FaRegEdit
            className="cursor-pointer text-green-500"
            size={16}
          />
        </span>
        <span
          title="Archive"
          className="p-1 border-2 rounded-full border-yellow-500"
        >
          {!blog?.isRecycleBin ? (
            <MdOutlineArchive
              size={16}
              className="text-yellow-500 cursor-pointer"
            />
          ) : (
            <MdOutlineUnarchive
              size={16}
              className="text-yellow-500 cursor-pointer"
            />
          )}
        </span>
        <span
          title="Delete"
          className="p-1 border-2 rounded-full border-red-500"
        >
          <MdDelete
            size={16}
            className="text-red-500 cursor-pointer"
          />
        </span>
      </div>
    </div>
  );
};
