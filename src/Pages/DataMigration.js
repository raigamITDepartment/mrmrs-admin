import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function DataMigration() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [winners, setWinners] = useState([]);
  const [filteredWinners, setFilteredWinners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("raffle_winners")) || [];
      setWinners(data);
    } catch {
      setWinners([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      alert("Please select both dates");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = winners.filter((w) => {
      const time = new Date(w.time);
      return time >= from && time <= to;
    });

    setFilteredWinners(filtered);
  };

  const handleWinnerClick = (winner) => {
    navigate(`/winner/${encodeURIComponent(winner.value)}`, { state: winner });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-indigo-100 via-white to-pink-100 text-gray-800 relative overflow-hidden">
      {/* soft glowing background circles */}
      <div className="absolute w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
      >
      Select Your Lucky Range
      </motion.h2>

      {/* Date Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-xl text-gray-800 bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block font-semibold mb-2 text-gray-700">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-2 text-gray-700">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Get Winners
        </motion.button>
      </motion.form>

      {/* Winners List */}
      {filteredWinners.length > 0 && (
        <motion.div
          className="w-full max-w-xl mt-12 bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold mb-6 text-center  bg-clip-text pink-500">
            🏆 Lucky Winners
          </h3>
          <ul className="divide-y divide-gray-200">
            {filteredWinners.map((w, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.02, x: 5 }}
                className="py-3 px-3 rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-50 to-pink-50 transition-all"
                onClick={() => handleWinnerClick(w)}
              >
                <div className="font-semibold text-lg text-gray-800">{w.value}</div>
                <div className="text-sm text-gray-500">{w.time}</div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* No results message */}
      {filteredWinners.length === 0 && fromDate && toDate && (
        <motion.p
          className="mt-12 text-lg font-medium text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No winners found in this range!
        </motion.p>
      )}
    </div>
  );
}
 