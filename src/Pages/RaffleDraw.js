import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RaffleDraw() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [displayedWinners, setDisplayedWinners] = useState([]);
  const confettiRef = useRef(null);
  const confettiIntervalRef = useRef(null);

  // Simulated backend winners with coupon numbers and dates
  const dummyNames = [
    { name: "Alice", coupon: "A123" },
    { name: "Bob", coupon: "B456" },
    { name: "Charlie", coupon: "C789" },
    { name: "David", coupon: "D321" },
    { name: "Eva", coupon: "E654" },
    { name: "Frank", coupon: "F987" },
  ];

  // ---------- Confetti ----------
  const startConfetti = () => {
    if (confettiIntervalRef.current) return;
    const host = confettiRef.current;
    if (!host) return;

    const colors = ["#fde047", "#fb7185", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];

    confettiIntervalRef.current = setInterval(() => {
      const count = 5 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        const size = 5 + Math.random() * 7;
        el.style.position = "absolute";
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = "0";
        el.style.width = `${size}px`;
        el.style.height = `${size * (0.6 + Math.random())}px`;
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.opacity = "0.95";
        el.style.borderRadius = Math.random() > 0.5 ? "50%" : "4px";
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
        host.appendChild(el);

        const x = (Math.random() - 0.5) * 280;
        el.animate(
          [
            { transform: `translate(0,-20px)`, opacity: 1 },
            { transform: `translate(${x}px,280px)`, opacity: 0 },
          ],
          {
            duration: 2000 + Math.random() * 1200,
            easing: "cubic-bezier(0.22,1,0.36,1)",
          }
        ).finished.then(() => el.remove());
      }
    }, 200);
  };

  const stopConfetti = () => {
    if (confettiIntervalRef.current) {
      clearInterval(confettiIntervalRef.current);
      confettiIntervalRef.current = null;
    }
  };

  // ---------- Start Draw ----------
  const startDraw = () => {
    if (isDrawing) return;
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates!");
      return;
    }

    setIsDrawing(true);
    setDisplayedWinners([]);
    stopConfetti();

    setCountdown(15);
    let counter = 15;

    const interval = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter <= 0) {
        clearInterval(interval);
        showWinners();
      }
    }, 1000);
  };

  const showWinners = () => {
    // simulate fetching winners slowly
    let idx = 0;
    const shuffled = [...dummyNames].sort(() => Math.random() - 0.5);

    const interval = setInterval(() => {
      const dateStr = new Date().toLocaleDateString();
      setDisplayedWinners((prev) => [
        ...prev,
        { ...shuffled[idx], date: dateStr },
      ]);
      idx++;
      if (idx >= shuffled.length) {
        clearInterval(interval);
        setIsDrawing(false);
        startConfetti();
      }
    }, 800); // 0.8s per winner
  };

  useEffect(() => {
    return () => stopConfetti();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-12 relative overflow-hidden">
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none"></div>

      <h1 className="text-5xl font-extrabold text-center mb-8 text-purple-600">
        🎉 Lucky Draw
      </h1>

      {/* Date Selection */}
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-700">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-700">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={startDraw}
        disabled={isDrawing}
        className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold rounded-full shadow-lg hover:scale-105 transition-transform mb-6 disabled:opacity-50"
      >
        {isDrawing ? "Drawing…" : "Draw"}
      </button>

      {countdown !== null && countdown > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-6xl font-extrabold text-yellow-500 drop-shadow-lg"
        >
          ⏱ {countdown}
        </motion.div>
      )}

      {/* Display Winners */}
      <div className="mt-8 w-full max-w-md flex flex-col items-center gap-4">
        <AnimatePresence>
          {displayedWinners.map((winner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/80 backdrop-blur-md p-4 rounded-xl w-full text-center shadow-lg"
            >
              <h2 className="text-2xl font-bold text-purple-600">
                {winner.name}
              </h2>
              <p className="text-gray-700 font-semibold">Coupon: {winner.coupon}</p>
              <p className="text-gray-500 italic">Date: {winner.date}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
