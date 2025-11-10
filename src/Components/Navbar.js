import React from "react";

const Navbar = ({ username }) => {
  return (
    <div className="bg-white shadow flex justify-between items-center px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        {username && (
          <p className="text-sm text-gray-600 mt-1">
            Welcome back, <span className="font-medium text-gray-800">{username}</span> 👋
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="text-gray-600 hover:text-gray-800 border px-3 py-1 rounded">
          Logout
        </button>
        <img
          src="/assets/admin-avatar.png"
          alt="Admin"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </div>
  );
};

export default Navbar;
