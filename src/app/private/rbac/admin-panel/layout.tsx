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
import { useRouter } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, status } = useSelector(
    (state: RootState) => state.checkAuth
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  // console.log(status, isAuthenticated, user)
  // useEffect(() => {
  //   if (status === "succeeded" && isAuthenticated) {
  //     router.push(user.redirect);
  //   }
  // }, [isAuthenticated, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  if (status === "succeeded" && isAuthenticated)
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
  //  return <p>404</p>;
};

export default Layout;
