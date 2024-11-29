"use client";
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
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import { useDispatch } from "react-redux";
import { setToggle } from "@/common-component/redux-config/slices/toggleSlice";
import { RxCross1 } from "react-icons/rx";
import { removeCookies } from "@/services/cookies.service";
import { useToast } from "@/common-component/custom-toast/ToastContext";

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
  { icon: FaUserAlt, label: "Profile" },
  { icon: FaChartLine, label: "Admin control" },
  { icon: FaChartLine, label: "Reports" },
  { icon: FaBook, label: "Courses" },
  { icon: FaEnvelope, label: "Messages" },
  // { icon: FaSignOutAlt, label: "Sign Out" },
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {showToast} = useToast();

  return (
    <>
      <RxCross1
        onClick={() => dispatch(setToggle(false))}
        className="w-7 h-6 p-1 shadow-sm rounded-full bg-transparent cursor-pointer absolute top-0 right-0"
      />
      <Link href={"/"} className="flex items-center justify-center">
        <FaUserShield
          size={40}
          className="text-blue-600 wave-text hover:animate-ping cursor-pointer transition-transform duration-300 ease-in-out"
        />
      </Link>
      <h2 className="text-center text-xl font-bold py-4 bg-gradient-to-r from-purple-600 whitespace-nowrap to-blue-600 text-transparent bg-clip-text rotate-x">
        Admin Dashboard
      </h2>
      <br />
      <div className="flex-grow text-gray-700">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="p-4 hover:text-blue-600 hover:font-extrabold"
          >
            <Link
              className="flex items-center gap-3 cursor-pointer transition"
              href={`${commonpath + labelPath(item.label)}`}
            >
              <item.icon size={20} className="mr-3" />
              <span className="text-sm whitespace-nowrap hover:font-extrabold ">
                {item.label}
              </span>
            </Link>
          </div>
        ))}
          <div
            className="p-4 hover:text-blue-600 hover:font-extrabold"
          >
            <span
            onClick={()=> {
              showToast('user sign-out successfully!', 'success')
              removeCookies('token');}}
              className="flex items-center gap-3 cursor-pointer transition"
            >
              <FaSignOutAlt size={20} className="mr-3" />
              <span className="text-sm whitespace-nowrap hover:font-extrabold ">
              Sign Out
              </span>
            </span>
          </div>
      </div>
    </>
  );
};

export default Sidebar;
