"use client"
import Link from "next/link";
import {
  FaHome,
  FaBook,
  FaEnvelope,
  FaUserAlt,
  FaChartLine,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { labelPath } from "../helper/object.function";
import { MdOutlineDataset } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { GoSidebarExpand } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "@/common-component/redux-config/store";

interface NavItem {
  icon: React.ElementType;
  label: string;
}

const commonpath = "/private/rbac/admin-panel/";
const navItems: NavItem[] = [
  { icon: FaHome, label: "Dashboard" },
  { icon: MdAddCircleOutline, label: "Create Blog" },
  { icon: MdOutlineDataset, label: "Blogs" },
  { icon: RiStickyNoteAddFill, label: "Create Pages" },
  { icon: FaBook, label: "Courses" },
  { icon: FaEnvelope, label: "Messages" },
  { icon: FaUserAlt, label: "Profile" },
  { icon: FaChartLine, label: "Reports" },
  { icon: FaSignOutAlt, label: "Sign Out" },
];

const Sidebar: React.FC = () => {
  const toggle = useSelector((state: RootState) => state.toggle.toggleValue);

  return (
    
      <div
      style={{display: toggle ? "block": "none"}}
      className={`h-screen relative p-6 flex flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-center">
          <FaUserShield
            size={40}
            className="text-blue-600 wave-text animate-pulse hover:animate-spin cursor-pointer transition-transform duration-300 ease-in-out"
          />
        </div>
        <h2 className="text-center text-xl font-bold py-4 bg-gradient-to-r from-yellow-500 to-green-500 text-transparent bg-clip-text rotate-x">
          Admin Dashboard
        </h2>
        <br />
       <div className="flex-grow text-gray-700">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="p-4 hover:text-red-600 hover:font-extrabold"
            >
              <Link
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 transition"
                href={`${commonpath + labelPath(item.label)}`}
              >
                <item.icon size={20} className="mr-3" />
                <span className="text-sm group-hover:text-black group-hover:font-extrabold group-hover:text-h5 transition-all duration-300 ease-in-out">
                  {item.label}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Sidebar;
