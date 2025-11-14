import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function WinnerForm() {
  const { name } = useParams();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
    theaterName: "",
    comment: "",
  });

  const [action, setAction] = useState(""); // "confirm" or "reject"
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!action) {
      setError("Please select either Confirm or Reject.");
      return;
    }

    if (action === "reject" && !formData.comment.trim()) {
      setError("Please add a comment when rejecting.");
      return;
    }

    console.log("Form submitted:", { ...formData, action });
    alert(`Winner ${action === "confirm" ? "confirmed" : "rejected"} successfully!`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-amber-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-700">
          🎉 Winner Details
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <input
            type="text"
            name="theaterName"
            placeholder="Theater Name"
            value={formData.theaterName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Confirm / Reject Checkboxes */}
          <div className="flex items-center justify-around mt-2 mb-2">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={action === "confirm"}
                onChange={() => setAction(action === "confirm" ? "" : "confirm")}
                className="w-5 h-5 accent-green-500"
              />
              Confirm
            </label>

            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={action === "reject"}
                onChange={() => setAction(action === "reject" ? "" : "reject")}
                className="w-5 h-5 accent-red-500"
              />
              Reject
            </label>
          </div>

          <textarea
            name="comment"
            placeholder="Comment (required only if rejecting)"
            value={formData.comment}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[100px]"
          />

          {error && (
            <p className="text-red-500 text-sm font-medium mt-1">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-md shadow-lg hover:shadow-indigo-300 transition-all"
          >
            🚀 Submit
          </button>
        </form>
      </div>
    </div>
  );
}
