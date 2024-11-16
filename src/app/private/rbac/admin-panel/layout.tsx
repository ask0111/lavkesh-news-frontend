// components/Layout.tsx

import AddBlogButton from '@/admin-components/common/StickyButton';
import EditorSidebar from '@/admin-components/navigation-bars/EditorSideBar';
import Sidebar from '@/admin-components/navigation-bars/SideNavigationBar';
import TopBar from '@/admin-components/navigation-bars/TopNavigationBar';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex relative">
      <div className='flex'>
      <Sidebar />
      <EditorSidebar />
      </div>
      <div className="flex flex-col flex-grow">
        <TopBar />
        <main className="flex-grow bg-gray-100 p-4">{children}</main>
      </div>

      <div title='Create Blog' className='fixed bottom-0 right-12 h-20 '>
      <AddBlogButton />
      </div>
    </div>
  );
};

export default Layout;
