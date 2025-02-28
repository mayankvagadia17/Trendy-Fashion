import React from "react";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 custom-bg-lightbrown" />
      </div>
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex-grow h-screen overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
