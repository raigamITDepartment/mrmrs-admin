import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const Comments = () => {
  const [comments, setComments] = useState([
    { id: 1, user: "John", text: "Great post!", status: "pending" },
    { id: 2, user: "Sara", text: "Love this idea!", status: "pending" },
  ]);

  const handleAction = (id, action) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: action } : c))
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Comment Section */}
        <div className="p-6 mt-4 ml-4">
          <h2 className="text-2xl font-semibold mb-6">Comments Management</h2>
          <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Comment</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-2 px-4">{c.user}</td>
                  <td className="py-2 px-4">{c.text}</td>
                  <td className="py-2 px-4 capitalize">{c.status}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleAction(c.id, "approved")}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(c.id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comments;
