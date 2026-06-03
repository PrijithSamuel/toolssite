"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function pad(n) { return String(n).padStart(2, "0"); }

function fmtTime(ms) {
  const cs = Math.floor(ms / 10) % 100;
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000);
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
  return `${pad(m)}:${pad(s)}.${pad(cs)}`;
}

export default function Stopwatch() {
  const [display, setDisplay] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);
  const startRef = useRef(0);
  const elapsedRef = useRef(0);
  const lapStartRef = useRef(0);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function start() {
    if (running) return;
    startRef.current = Date.now() - elapsedRef.current;
    intervalRef.current = setInterval(() => {
      const now = Date.now() - startRef.current;
      elapsedRef.current = now;
      setDisplay(now);
    }, 10);
    setRunning(true);
  }

  function stop() {
    clearInterval(intervalRef.current);
    setRunning(false);
  }

  function reset() {
    clearInterval(intervalRef.current);
    setRunning(false);
    elapsedRef.current = 0;
    lapStartRef.current = 0;
    setDisplay(0);
    setLaps([]);
  }

  function lap() {
    if (!running) return;
    const now = elapsedRef.current;
    const lapTime = now - lapStartRef.current;
    lapStartRef.current = now;
    setLaps((prev) => [{ total: now, lap: lapTime }, ...prev]);
  }

  const btnBase = { padding: "12px 28px", borderRadius: "10px", border: "none", fontSize: "14px", cursor: "pointer", fontWeight: "600", minWidth: "90px" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Timer Tools", href: "/timer-tools" }, { label: "Stopwatch" }]} />
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Stopwatch</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Precise stopwatch with lap times.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "32px 24px", textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontFamily: "monospace", fontSize: "64px", fontWeight: "300", color: "#1E1B4B", letterSpacing: "-2px", lineHeight: "1", marginBottom: "8px" }}>
            {fmtTime(display)}
          </div>
          {laps.length > 0 && (
            <div style={{ fontSize: "13px", color: "#9CA3AF" }}>
              Lap {laps.length + 1}: {fmtTime(elapsedRef.current - lapStartRef.current)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "16px" }}>
          {!running ? (
            <button onClick={start} style={{ ...btnBase, background: "#4F46E5", color: "white" }}>
              {display > 0 ? "Resume" : "Start"}
            </button>
          ) : (
            <button onClick={stop} style={{ ...btnBase, background: "#EF4444", color: "white" }}>
              Stop
            </button>
          )}
          <button
            onClick={lap}
            disabled={!running}
            style={{ ...btnBase, background: running ? "#EEF2FF" : "#F9FAFB", color: running ? "#4F46E5" : "#D1D5DB", border: "0.5px solid #C7D2FE" }}
          >
            Lap
          </button>
          <button
            onClick={reset}
            style={{ ...btnBase, background: "white", color: "#374151", border: "0.5px solid #E0E7FF" }}
          >
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "500", color: "#6B7280" }}>
              <span>Lap</span>
              <span>Lap Time</span>
              <span>Total Time</span>
            </div>
            <div style={{ maxHeight: "260px", overflowY: "auto" }}>
              {laps.map((l, i) => (
                <div key={i} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                  <span style={{ color: "#4F46E5", fontWeight: "500" }}>#{laps.length - i}</span>
                  <span style={{ fontFamily: "monospace", color: i === 0 ? "#10B981" : "#374151" }}>{fmtTime(l.lap)}</span>
                  <span style={{ fontFamily: "monospace", color: "#9CA3AF" }}>{fmtTime(l.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
