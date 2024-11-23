// components/Layout.tsx

import AddBlogButton from "@/admin-components/common/StickyButton";
import EditorSidebar from "@/admin-components/navigation-bars/EditorSideBar";
import Sidebar from "@/admin-components/navigation-bars/SideNavigationBar";
import TopBar from "@/admin-components/navigation-bars/TopNavigationBar";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-[100vh] overflow-hidden relative">
      <div className="flex relative h-[100vh]">
        <Sidebar />
        <EditorSidebar />
      </div>
      <div className="relative w-full overflow-y-scroll flex flex-col ">
        <div className="sticky top-0 right-0 w-full">

        <TopBar />
        </div>
        <main className="flex-grow bg-gray-100 p-4">{children}</main>
      </div>

      <div title="Create Blog" className="fixed bottom-0 right-12 h-20 ">
        <AddBlogButton />
      </div>
    </div>
  );
};

export default Layout;
