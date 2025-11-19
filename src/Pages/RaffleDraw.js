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

  const dummyNames = [
    { name: "Alice", coupon: "A123" },
    { name: "Bob", coupon: "B456" },
    { name: "Charlie", coupon: "C789" },
    { name: "David", coupon: "D321" },
    { name: "Eva", coupon: "E654" },
    { name: "Frank", coupon: "F987" },
  ];

  const startConfetti = () => {
    if (confettiIntervalRef.current) return;
    const host = confettiRef.current;
    if (!host) return;

    const colors = ["#ffe066", "#ff6b6b", "#4dabf7", "#51cf66", "#f783ac", "#9775fa"];

    confettiIntervalRef.current = setInterval(() => {
      const count = 5 + Math.random() * 5;
      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        const size = 5 + Math.random() * 7;
        el.style.position = "absolute";
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = "0";
        el.style.width = `${size}px`;
        el.style.height = `${size * (0.6 + Math.random())}px`;
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.opacity = "0.9";
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
    }, 800);
  };

  useEffect(() => {
    return () => stopConfetti();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden p-6">
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-10 border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🎉 Lucky Draw
        </h1>

        {/* Date Selection */}
        <div className="flex items-center justify-between gap-6 mb-10">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="font-semibold text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>
        </div>

        {/* Button */}
        <div className="text-center mb-6">
          <button
            onClick={startDraw}
            disabled={isDrawing}
            className="px-12 py-3 bg-purple-600 text-white text-lg font-semibold rounded-full shadow hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isDrawing ? "Drawing…" : "Start Draw"}
          </button>
        </div>

        {/* Countdown */}
        {countdown !== null && countdown > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-5xl font-bold text-center text-purple-600 mb-6"
          >
            ⏱ {countdown}
          </motion.div>
        )}

        {/* Winners */}
        <div className="mt-6 flex flex-col gap-4">
          <AnimatePresence>
            {displayedWinners.map((winner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm"
              >
                <p className="text-lg font-semibold text-gray-900">{winner.name}</p>
                <p className="text-gray-700">Coupon: {winner.coupon}</p>
                <p className="text-gray-500 text-sm">Date: {winner.date}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
