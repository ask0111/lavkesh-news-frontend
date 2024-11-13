// components/TopBar.tsx
"use client"
import { useState } from 'react';
import { FaSearch, FaUserCircle, FaCog } from 'react-icons/fa';
import SearchBar from '../common/SearchBar';
import { GoSidebarExpand } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/common-component/redux-config/store';
import { setToggle, setEditorSidebarToggle } from '@/common-component/redux-config/slices/toggleSlice';
import { FaBars } from "react-icons/fa";

const TopBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {toggleValue, editorSidebarToggleValue} = useSelector((state: RootState) => state.toggle);

  const OnChangeHandler = ()=>{}
  const OnClickHandler = ()=>{}

  return (
    <div className="w-full px-4 h-16 bg-blue-600 flex items-center justify-between pl-10 shadow-md">
      {/* Search Bar */}
      <div className='w-96 flex items-center gap-4'>
      <GoSidebarExpand
          onClick={() => dispatch(setToggle(!toggleValue))}
          size={26}
          className=" z-20 left-[500px] top-2 cursor-pointer text-red-500"
        />
        <FaBars onClick={() => dispatch(setEditorSidebarToggle(!editorSidebarToggleValue))}
           size={22} className=" z-20 left-[500px] top-2 cursor-pointer" />
      </div>
      <div className='w-96 flex items-center gap-4'>
      <SearchBar placeholder='Search...' onClick={OnClickHandler} onChange={OnChangeHandler} />
      </div>

      {/* User Profile and Settings */}
      <div className="flex gap-4 items-center justify-between text-black">
        <FaCog title='Setting' size={20} className="text- cursor-pointer" />
        <FaUserCircle title='Profile' size={24} className="text- cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;
