"use client";
import AddBlogButton from "@/admin-components/common/StickyButton";
import EditorSidebar from "@/admin-components/navigation-bars/EditorSideBar";
import Sidebar from "@/admin-components/navigation-bars/SideNavigationBar";
import TopBar from "@/admin-components/navigation-bars/TopNavigationBar";
import { verifyAuth } from "@/common-component/redux-config/slices/authSlice";
import { AppDispatch, RootState } from "@/common-component/redux-config/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, status } = useSelector(
    (state: RootState) => state.checkAuth
  );
  const { toggleValue, editorSidebarToggleValue } = useSelector(
    (state: RootState) => state.toggle
  );

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;

  if (status === "succeeded" && isAuthenticated)
    return (
      <div className="flex h-[100vh] overflow-hidden relative">
        <div className="flex absolute h-[100vh]">
          <div
            // style={{display: toggle ? "block": "none", position: window.innerWidth < 500 ? "absolute": "relative" }}
            className={`w-56 p-4 border-l border-gray-300 bg-white shadow-sm custom-scrollbar overflow-y-scroll z-20 top-0 ${
              window.innerWidth < 1100 ? "absolute" : ""
            } transition-all duration-200 ease-linear ${
              toggleValue
                ? "translate-x-0"
                : "-ms-56 -translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
          <div
            className={`w-72 p-4 ${
              editorSidebarToggleValue ? "" : ""
            } border-l border-gray-300 bg-white shadow-sm custom-scrollbar overflow-y-scroll z-20 top-0 ${
              window.innerWidth < 1100 ? "absolute" : ""
            } transition-all duration-200 ease-linear ${
              editorSidebarToggleValue
                ? "translate-x-0"
                : "ms-0 opacity-0 -z-10 -translate-x-full"
            }`}
          >
            <EditorSidebar />
          </div>
        </div>
        <div className="relative w-full overflow-y-scroll flex flex-col ">
          <div className="sticky top-0 right-0 w-full">
            <div
              className={`w-auto px-4 h-16 bg-blue-600 text-white flex items-center justify-between pl-10 shadow-md transition-all duration-200 ease-linear ${
                editorSidebarToggleValue
                  ? toggleValue
                    ? "ms-[32rem]"
                    : "ms-[18rem]"
                  : toggleValue
                  ? "ms-52"
                  : "ms-0"
              } `}
            >
              <TopBar />
            </div>
          </div>
          <main className={`w-auto flex-grow bg-gray-100 p-4 transition-all duration-200 ease-linear ${editorSidebarToggleValue
                  ? toggleValue
                    ? "ms-[32rem]"
                    : "ms-[18rem]"
                  : toggleValue
                  ? "ms-52"
                  : "ms-0"
              }`}>{children}</main>
        </div>

        <div title="Create Blog" className="fixed bottom-0 right-12 h-20 ">
          <AddBlogButton />
        </div>
      </div>
    );
  //  return <p>404</p>;
};

export default Layout;
