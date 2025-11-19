import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Gift,
  Trophy,
  History,
  CloudDownloadIcon,
  CloudUpload,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Comments", path: "/comments", icon: <MessageSquare size={20} /> },
    { name: "Data Migration", path: "/datamigration", icon: <CloudUpload size={20} /> },
    { name: "Raffle Draw", path: "/raffle", icon: <Gift size={20} /> },
    { name: "Winners", path: "/winners", icon: <Trophy size={20} /> },
    { name: "History", path: "/history", icon: <History size={20} /> },
  ];
//
  return (
    <div className="w-64 bg-white shadow-lg flex flex-col p-5">
      <div className="flex items-center gap-2 mb-10"> 
        <img src="/assets/logo.png" alt="Logo" className="w-15 h-12 mx-auto" />
      </div>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition ${
            location.pathname === link.path
              ? "bg-indigo-600 text-white"
              : "text-gray-700 hover:bg-indigo-100"

          }`}
        >
          {link.icon}
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
