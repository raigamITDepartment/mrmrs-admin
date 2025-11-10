import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RaffleDraw() {
  // ---------- State ----------
  const [rawEntries, setRawEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("raffle_entries") || "[]");
    } catch {
      return [];
    }
  });
  const [winners, setWinners] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("raffle_winners") || "[]");
    } catch {
      return [];
    }
  });
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("raffle_history") || "[]");
    } catch {
      return [];
    }
  });
  const [spotlight, setSpotlight] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [fileName, setFileName] = useState("");

  const tickerRef = useRef(null);
  const confettiRef = useRef(null);
  const confettiIntervalRef = useRef(null);

  // ---------- Derived ----------
  const entries = useMemo(
    () =>
      Array.from(
        new Set(
          (rawEntries || []).map((s) => String(s).trim()).filter(Boolean)
        )
      ),
    [rawEntries]
  );

  // ---------- LocalStorage ----------
  useEffect(() => {
    localStorage.setItem("raffle_entries", JSON.stringify(rawEntries));
  }, [rawEntries]);
  useEffect(() => {
    localStorage.setItem("raffle_winners", JSON.stringify(winners));
  }, [winners]);
  useEffect(() => {
    localStorage.setItem("raffle_history", JSON.stringify(history));
  }, [history]);

  // ---------- Keyboard Shortcut ----------
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space" && !isDrawing) {
        e.preventDefault();
        startDraw();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isDrawing, entries]);

  // ---------- CSV Upload (Get all data) ----------
  const parseCSV = (text) =>
    String(text)
      .split(/\r?\n/)
      .map((r) => r.trim())
      .filter(Boolean)
      .map((r) => r.split(",").map((v) => v.replace(/^"|"$/g, "")).join(" - "))
      .filter(Boolean);

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setRawEntries(parseCSV(ev.target.result));
    };
    reader.readAsText(file);
  };

  // ---------- Continuous Confetti ----------
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

  // ---------- Draw (Fixed 30s) ----------
  const startDraw = () => {
    if (isDrawing || entries.length === 0) return;
    setIsDrawing(true);

    stopConfetti(); // stop previous confetti before new draw

    const pool = [...entries];
    const target = pool[Math.floor(Math.random() * pool.length)];

    const totalDuration = 30000; // fixed 30 seconds
    const totalTicks = 200;
    const interval = totalDuration / totalTicks;

    let idx = Math.floor(Math.random() * pool.length);
    let t = 0;

    const tick = () => {
      idx = (idx + 1) % pool.length;
      setSpotlight(pool[idx]);
      t++;

      if (t >= totalTicks && pool[idx] === target) {
        setTimeout(() => finalize(target), interval);
        return;
      }

      tickerRef.current = setTimeout(tick, interval);
    };

    if (tickerRef.current) clearTimeout(tickerRef.current);
    tick();
  };

  const finalize = (name) => {
    const stamp = new Date().toLocaleString();
    startConfetti(); // start continuous confetti after draw
    setWinners((prev) => [{ value: name, time: stamp }, ...prev]);
    setHistory((prev) => [{ value: name, time: stamp }, ...prev]);
    setIsDrawing(false);
  };

  useEffect(() => {
    return () => {
      if (tickerRef.current) clearTimeout(tickerRef.current);
      stopConfetti();
    };
  }, []);

  // ---------- CSV Export ----------
  const exportCSV = (rows, filename) => {
    const csv =
      "value,time\n" +
      rows.map((r) => `${escapeCSV(r.value)},${escapeCSV(r.time)}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const escapeCSV = (s) => {
    if (s.includes(",") || s.includes("\n") || s.includes('"')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-500 via-orange-500 to-yellow-300 p-6 relative overflow-hidden">
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none"></div>

      <h1 className="text-4xl font-extrabold text-yellow-100 mb-6 text-shadow">
        Lucky Draw
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-md text-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={spotlight ?? "-"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-3xl font-bold"
          >
            {spotlight ?? "—"}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={startDraw}
        disabled={isDrawing || entries.length === 0}
        className="px-8 py-3 bg-yellow-400 font-bold rounded-lg shadow-md disabled:opacity-60 mb-4"
      >
        {isDrawing ? "Drawing…" : "Draw"}
      </button>

      <div className="mb-4">
        <button
          onClick={() => setShowTools(!showTools)}
          className="underline mr-4"
        >
          {showTools ? "Hide Tools" : "Show Tools"}
        </button>
        <label className="cursor-pointer underline">
          Upload CSV
          <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
        </label>
        {fileName && <span className="ml-2">{fileName}</span>}
      </div>

      {showTools && (
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 w-full max-w-md">
          <h3 className="font-bold mb-2">Winners</h3>
          {winners.length === 0 ? (
            <p>No winners yet.</p>
          ) : (
            <ul className="list-disc pl-5 max-h-40 overflow-auto">
              {winners.map((w, i) => (
                <li key={i}>
                  <strong>{w.value}</strong> — {w.time}
                </li>
              ))}
            </ul>
          )}
          {history.length > 0 && (
            <button
              onClick={() => exportCSV(history, "raffle_history.csv")}
              className="mt-3 px-3 py-1 bg-white/80 rounded-md font-semibold"
            >
              Export History CSV
            </button>
          )}
        </div>
      )}
    </div>
  );
}
