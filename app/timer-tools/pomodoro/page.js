"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

function pad(n) { return String(n).padStart(2, "0"); }

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.3, 0.6, 1.0].forEach((t, i) => {
      const freq = [523, 659, 784, 1047][i];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = "sine";
      gain.gain.setValueAtTime(0.4, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.5);
      osc.start(ctx.currentTime + t); osc.stop(ctx.currentTime + t + 0.55);
    });
  } catch {}
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState("work");
  const [remaining, setRemaining] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const intervalRef = useRef(null);
  const remainingRef = useRef(WORK_TIME);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const totalTime = mode === "work" ? WORK_TIME : mode === "break" ? BREAK_TIME : LONG_BREAK_TIME;
  const elapsed = totalTime - remaining;
  const progressPct = (elapsed / totalTime) * 100;

  const r = 90;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progressPct / 100);

  function tick() {
    remainingRef.current -= 1;
    if (remainingRef.current <= 0) {
      clearInterval(intervalRef.current);
      setRunning(false);
      playChime();
      if (mode === "work") {
        const newSessions = sessions + 1;
        setSessions(newSessions);
        const nextMode = newSessions % 4 === 0 ? "longbreak" : "break";
        setMode(nextMode);
        remainingRef.current = nextMode === "longbreak" ? LONG_BREAK_TIME : BREAK_TIME;
        setRemaining(remainingRef.current);
      } else {
        setMode("work");
        remainingRef.current = WORK_TIME;
        setRemaining(WORK_TIME);
      }
    } else {
      setRemaining(remainingRef.current);
    }
  }

  function startPause() {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    } else {
      intervalRef.current = setInterval(tick, 1000);
      setRunning(true);
    }
  }

  function reset() {
    clearInterval(intervalRef.current);
    setRunning(false);
    remainingRef.current = WORK_TIME;
    setRemaining(WORK_TIME);
    setMode("work");
  }

  function skip() {
    clearInterval(intervalRef.current);
    setRunning(false);
    if (mode === "work") {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      const nextMode = newSessions % 4 === 0 ? "longbreak" : "break";
      setMode(nextMode);
      const t = nextMode === "longbreak" ? LONG_BREAK_TIME : BREAK_TIME;
      remainingRef.current = t;
      setRemaining(t);
    } else {
      setMode("work");
      remainingRef.current = WORK_TIME;
      setRemaining(WORK_TIME);
    }
  }

  const modeConfig = {
    work: { label: "Work Session", color: "#4F46E5", bg: "#EEF2FF", stroke: "#4F46E5" },
    break: { label: "Short Break", color: "#10B981", bg: "#ECFDF5", stroke: "#10B981" },
    longbreak: { label: "Long Break", color: "#0284C7", bg: "#E0F2FE", stroke: "#0284C7" },
  };
  const cfg = modeConfig[mode];

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Timer Tools", href: "/timer-tools" }, { label: "Pomodoro Timer" }]} />
      <div style={{ maxWidth: "460px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Pomodoro Timer</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>25 min work + 5 min break cycle for focused productivity.</p>
        </div>

        {/* Mode tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[["work", "🍅 Work", WORK_TIME], ["break", "☕ Break", BREAK_TIME], ["longbreak", "🛋 Long Break", LONG_BREAK_TIME]].map(([m, label, t]) => (
            <button key={m} onClick={() => { clearInterval(intervalRef.current); setRunning(false); setMode(m); remainingRef.current = t; setRemaining(t); }} style={{ flex: 1, padding: "8px 4px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: mode === m ? cfg.color : "white", color: mode === m ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Ring */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "32px 24px", textAlign: "center", marginBottom: "16px" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r={r} fill="none" stroke="#E0E7FF" strokeWidth="12" />
              <circle
                cx="110" cy="110" r={r}
                fill="none"
                stroke={cfg.stroke}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 110 110)"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: "48px", fontWeight: "300", color: "#1E1B4B", lineHeight: "1" }}>
                {pad(m)}:{pad(s)}
              </div>
              <div style={{ fontSize: "12px", color: cfg.color, fontWeight: "500", marginTop: "4px" }}>{cfg.label}</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
          <button onClick={startPause} style={{ padding: "12px 32px", borderRadius: "10px", border: "none", background: cfg.color, color: "white", fontSize: "15px", cursor: "pointer", fontWeight: "600" }}>
            {running ? "Pause" : "Start"}
          </button>
          <button onClick={skip} style={{ padding: "12px 20px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
            Skip →
          </button>
          <button onClick={reset} style={{ padding: "12px 20px", borderRadius: "10px", border: "0.5px solid #E0E7FF", background: "white", color: "#374151", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
            Reset
          </button>
        </div>

        {/* Session counter */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Sessions completed</span>
            <span style={{ fontSize: "20px", fontWeight: "600", color: "#4F46E5" }}>{sessions}</span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {Array.from({ length: Math.max(sessions, 4) }, (_, i) => (
              <div key={i} style={{ width: "28px", height: "28px", borderRadius: "6px", background: i < sessions ? "#4F46E5" : "#E0E7FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                {i < sessions ? "🍅" : ""}
              </div>
            ))}
          </div>
          {sessions >= 4 && <div style={{ fontSize: "12px", color: "#6366F1", marginTop: "8px", fontWeight: "500" }}>Time for a long break! 🎉</div>}
        </div>
      </div>
      <Footer />
    </main>
  );
}
