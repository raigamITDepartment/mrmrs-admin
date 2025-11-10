import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const Card = ({ title, value, color }) => {
  const colorClasses = {
    rose: "bg-rose-500",
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex-1 ${colorClasses[color]} text-white rounded-2xl p-6 shadow-lg transition-all duration-300`}
    >
      <h3 className="text-lg font-medium opacity-90">{title}</h3>
      <p className="text-4xl font-extrabold mt-2">{value}</p>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Pending Comments" value="12" color="rose" />
            <Card title="Total Raffles" value="8" color="indigo" />
            <Card title="Winners Today" value="3" color="emerald" />
            <Card title="Users" value="523" color="amber" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
