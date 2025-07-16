import React from "react";
import { Outlet } from "react-router-dom";
import { Footers, Navbars, Sidebar } from "../../Components";

const Educator = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbars />
      <div className="flex ">
        <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footers />
    </div>
  );
};

export default Educator;
