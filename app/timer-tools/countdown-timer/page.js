"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function pad(n) { return String(n).padStart(2, "0"); }

function fmtSeconds(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(sec)}`;
  return `${pad(m)}:${pad(sec)}`;
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.5, 1.0].forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.6, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.4);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.45);
    });
  } catch {}
}

const PRESETS = [
  { label: "1 min", seconds: 60 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "🍅 25 min", seconds: 1500 },
  { label: "30 min", seconds: 1800 },
];

export default function CountdownTimer() {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("0");
  const [remaining, setRemaining] = useState(null);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const intervalRef = useRef(null);
  const remainingRef = useRef(0);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function getTotalSeconds() {
    return (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
  }

  function start() {
    const total = remaining !== null ? remaining : getTotalSeconds();
    if (total <= 0) return;
    remainingRef.current = total;
    setRemaining(total);
    setFinished(false);
    setRunning(true);
    intervalRef.current = setInterval(() => {
      remainingRef.current -= 1;
      if (remainingRef.current <= 0) {
        clearInterval(intervalRef.current);
        setRemaining(0);
        setRunning(false);
        setFinished(true);
        playBeep();
      } else {
        setRemaining(remainingRef.current);
      }
    }, 1000);
  }

  function pause() {
    clearInterval(intervalRef.current);
    setRunning(false);
  }

  function reset() {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(null);
    setFinished(false);
  }

  function setPreset(secs) {
    reset();
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    setHours(String(h));
    setMinutes(String(m));
    setSeconds(String(s));
    setRemaining(secs);
  }

  const displaySecs = remaining !== null ? remaining : getTotalSeconds();
  const totalSecs = remaining !== null ? (remaining + (running ? 0 : 0)) : getTotalSeconds();
  const initialTotal = running || remaining !== null ? (remaining !== null ? remaining + (finished ? 0 : 0) : getTotalSeconds()) : getTotalSeconds();

  // For progress bar
  const total = getTotalSeconds();
  const progressPct = total > 0 && remaining !== null ? ((total - remaining) / total) * 100 : 0;

  const inp = { width: "72px", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "18px", textAlign: "center", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Timer Tools", href: "/timer-tools" }, { label: "Countdown Timer" }]} />
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Countdown Timer</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Set a countdown — beeps when it reaches zero.</p>
        </div>

        {/* Presets */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
          {PRESETS.map((p) => (
            <button key={p.seconds} onClick={() => setPreset(p.seconds)} style={{ padding: "7px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* Time input */}
        {!running && remaining === null && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <div style={{ textAlign: "center" }}>
                <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} min="0" max="99" style={inp} />
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>HH</div>
              </div>
              <span style={{ fontSize: "32px", color: "#D1D5DB", marginBottom: "18px" }}>:</span>
              <div style={{ textAlign: "center" }}>
                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} min="0" max="59" style={inp} />
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>MM</div>
              </div>
              <span style={{ fontSize: "32px", color: "#D1D5DB", marginBottom: "18px" }}>:</span>
              <div style={{ textAlign: "center" }}>
                <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} min="0" max="59" style={inp} />
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>SS</div>
              </div>
            </div>
          </div>
        )}

        {/* Display */}
        {(running || remaining !== null) && (
          <div style={{ background: finished ? "#FFF5F5" : "white", border: `0.5px solid ${finished ? "#FCA5A5" : "#E0E7FF"}`, borderRadius: "12px", padding: "32px 24px", marginBottom: "16px", textAlign: "center" }}>
            {finished ? (
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>⏰</div>
            ) : null}
            <div style={{ fontFamily: "monospace", fontSize: "72px", fontWeight: "200", color: finished ? "#EF4444" : "#1E1B4B", letterSpacing: "-3px", lineHeight: "1" }}>
              {fmtSeconds(remaining ?? displaySecs)}
            </div>
            {finished && <div style={{ fontSize: "16px", fontWeight: "500", color: "#EF4444", marginTop: "8px" }}>Time&apos;s up!</div>}
            {/* Progress bar */}
            {!finished && (
              <div style={{ marginTop: "16px", height: "6px", background: "#E0E7FF", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progressPct}%`, background: "#4F46E5", borderRadius: "3px", transition: "width 1s linear" }} />
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {!running ? (
            <button onClick={start} disabled={displaySecs === 0} style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: displaySecs > 0 ? "#4F46E5" : "#E5E7EB", color: displaySecs > 0 ? "white" : "#9CA3AF", fontSize: "14px", cursor: displaySecs > 0 ? "pointer" : "default", fontWeight: "600" }}>
              {remaining !== null && !finished ? "Resume" : "Start"}
            </button>
          ) : (
            <button onClick={pause} style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: "#F59E0B", color: "white", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>
              Pause
            </button>
          )}
          <button onClick={reset} style={{ padding: "12px 28px", borderRadius: "10px", border: "0.5px solid #E0E7FF", background: "white", color: "#374151", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>
            Reset
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
