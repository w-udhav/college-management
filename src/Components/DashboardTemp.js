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
        <div className="w-[16rem] lg:w-[17rem] h-full p-2 flex flex-col z-20 gap-9">
          <h3 className="font-medium px-4 text-sky-500 text-lg"> EduDesk </h3>
          {/* Links */}
          <div className="flex flex-col">
            {mainLinks.map((link) => {
              return (
                <Link
                  to={link.route}
                  key={link.id}
                  className="px-4 py-2 rounded-md hover:bg-sky-500 hover:text-white"
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
          <div className="h-[92vh] p-2 overflow-y-auto">
            <div className="w-full h-full rounded-2xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
