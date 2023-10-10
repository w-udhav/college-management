import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function DashboardTemp({ children }) {
  const mainLinks = [
    {
      id: 1,
      name: "Dashboard",
      route: "./",
    },
    {
      id: 2,
      name: "Students",
      route: "./students",
    },
    {
      id: 3,
      name: "Teachers",
      route: "./teachers",
    },
  ];
  return (
    <div className="w-full min-h-screen overflow-y-auto">
      <div className="flex flex-row w-full h-full">
        {/* Left */}
        <div className="w-[16rem] lg:w-[17rem] h-full min-h-screen sticky bg-blue-50 p-2 flex flex-col z-20 gap-9">
          <h3 className="font-medium px-2 text-zinc-800 text-2xl"> EduDesk </h3>
          {/* Links */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[14px] pb-2 px-1">Main Links</h3>
            {mainLinks.map((link) => {
              return (
                <Link
                  to={link.route}
                  key={link.id}
                  className="px-4 py-2 rounded-full hover:bg-sky-500 hover:text-white bg-white text-sky-500 font-medium"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <div className="w-full max-h-[100vh] overflow-hidden">
          <Navbar />
          <div className="p-2 overflow-y-auto">
            <div className="w-full h-full rounded-2xl p-3 border">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
