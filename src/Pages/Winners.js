import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Winners() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const dummyWinners = [
    { value: "Alice", time: "2025-11-12 10:30 AM" },
    { value: "Bob", time: "2025-11-12 10:35 AM" },
    { value: "Charlie", time: "2025-11-13 09:20 AM" },
    { value: "David", time: "2025-11-14 03:45 PM" },
  ];

  const handleWinnerClick = (winner) => {
    navigate(`/winner/${encodeURIComponent(winner.value)}`, { state: winner });
  };

  const handleExport = () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates before exporting.");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const filtered = dummyWinners.filter((w) => {
      const winnerDate = new Date(w.time);
      return winnerDate >= from && winnerDate <= to;
    });

    if (filtered.length === 0) {
      alert("No winners found in the selected date range.");
      return;
    }

    // Format date-time as YYYY-MM-DD HH:MM
    const formatDateTime = (dateString) => {
      const d = new Date(dateString);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // Create CSV content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Time", ...filtered.map((w) => `${w.value},${formatDateTime(w.time)}`)].join("\n");

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `winners_${fromDate}_to_${toDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        {/* Title */}
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">
          🏆 Winners List
        </h2>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Date selectors */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 text-sm font-medium">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <label className="text-gray-700 text-sm font-medium">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Export Button */}
          <motion.button
            onClick={handleExport}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Export History CSV
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-md border border-gray-100 p-8"
      >
        <ul className="divide-y divide-gray-200">
          {dummyWinners.map((w, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleWinnerClick(w)}
              className="py-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-all duration-300 rounded-xl px-5 cursor-pointer"
            >
              <p className="text-gray-800 font-semibold text-xl hover:text-indigo-600 transition-colors duration-300">
                {w.value}
              </p>
              <span className="text-base text-gray-500 italic">{w.time}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
