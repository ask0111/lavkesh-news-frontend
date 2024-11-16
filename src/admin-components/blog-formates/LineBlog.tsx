import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";

export const LineBlog = ({ blog }: any) => {

    return (
    <div
    key={blog.id}
    style={{minWidth: '500px'}}
    className="bg-white py-2 px-4 rounded-lg shadow-md flex flex-1 justify-between"
  >
    <div className="flex gap-4">
      {/* <div className="w-32">
        {" "}
        <img src={blog.image} width={100} height={100} />{" "}
      </div> */}
      <div className="border w-16 h-[60px] ">
        <div className="w-full h-full">
        <img src={blog.image} className="w-full h-full object-cover aspect-square" width={100} height={100} />
        </div>
      </div>
      <div className="w-5/6">
        <h2 className="text-lg font-semibold line-clamp-1">{blog.title}</h2>
        <p className="text-gray-600 line-clamp-2" >{blog.subTitle}</p>
      </div>
      </div>
        <div className="flex gap-2 flex-col justify-around items-center">
          <span title="Edit" className="p-1 border-2 rounded-full border-green-500">
            <FaRegEdit
              className="cursor-pointer text-green-500"
              size={16}
            />
          </span>
          <span className="p-1 border-2 rounded-full border-yellow-500">
            { !blog?.isRecycleBin ? <MdOutlineArchive
              size={16}
              className="text-yellow-500 cursor-pointer"
              title="Not Archive"
            /> :
            <MdOutlineUnarchive
              size={16}
              className="text-yellow-500 cursor-pointer"
              title="Archive"
            />}
          </span>
          <span title="Delete" className="p-1 border-2 rounded-full border-red-500">
            <MdDelete
              size={16}
              className="text-red-500 cursor-pointer"
            />
          </span>
        </div>
    </div>
  );
};
