"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function pad(n) { return String(n).padStart(2, "0"); }

const MESSAGES = [
  "Great focus! Take a well-deserved break. ☕",
  "Another session done! You're doing amazing! 💪",
  "Excellent work! Rest your brain too. 🧠",
  "Consistency is the key to success. 🔑 Break time!",
  "You're on fire! 🔥 Rest, then keep going.",
  "Outstanding effort! Every session counts. ⭐",
];

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.4].forEach((t) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.frequency.value = t === 0 ? 784 : 1047; osc.type = "sine";
      g.gain.setValueAtTime(0.4, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.5);
      osc.start(ctx.currentTime + t); osc.stop(ctx.currentTime + t + 0.55);
    });
  } catch {}
}

export default function StudyTimer() {
  const [workMins, setWorkMins] = useState("25");
  const [breakMins, setBreakMins] = useState("5");
  const [mode, setMode] = useState("work");
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessionLog, setSessionLog] = useState([]);
  const [message, setMessage] = useState("");

  const intervalRef = useRef(null);
  const remainingRef = useRef(25 * 60);
  const modeRef = useRef("work");

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const totalWork = sessionLog.filter((s) => s.type === "work").reduce((sum, s) => sum + s.duration, 0);
  const workCount = sessionLog.filter((s) => s.type === "work").length;

  const workSecs = (parseInt(workMins) || 25) * 60;
  const breakSecs = (parseInt(breakMins) || 5) * 60;
  const totalSecs = mode === "work" ? workSecs : breakSecs;
  const progress = totalSecs > 0 ? ((totalSecs - remaining) / totalSecs) * 100 : 0;

  const r = 90;
  const circ = 2 * Math.PI * r;

  function tick() {
    remainingRef.current -= 1;
    if (remainingRef.current <= 0) {
      clearInterval(intervalRef.current);
      setRunning(false);
      playChime();
      const finishedMode = modeRef.current;
      const dur = finishedMode === "work" ? parseInt(workMins) || 25 : parseInt(breakMins) || 5;
      setSessionLog((prev) => [{ type: finishedMode, duration: dur, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }, ...prev]);
      if (finishedMode === "work") {
        setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        modeRef.current = "break";
        setMode("break");
        remainingRef.current = (parseInt(breakMins) || 5) * 60;
        setRemaining(remainingRef.current);
      } else {
        setMessage("");
        modeRef.current = "work";
        setMode("work");
        remainingRef.current = (parseInt(workMins) || 25) * 60;
        setRemaining(remainingRef.current);
      }
    } else {
      setRemaining(remainingRef.current);
    }
  }

  function startPause() {
    if (running) { clearInterval(intervalRef.current); setRunning(false); }
    else { intervalRef.current = setInterval(tick, 1000); setRunning(true); setMessage(""); }
  }

  function reset() {
    clearInterval(intervalRef.current); setRunning(false); setMessage("");
    modeRef.current = "work"; setMode("work");
    remainingRef.current = (parseInt(workMins) || 25) * 60;
    setRemaining(remainingRef.current);
  }

  function applySettings() {
    reset();
  }

  const modeColor = mode === "work" ? "#4F46E5" : "#10B981";

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Student Tools", href: "/student-tools" }, { label: "Study Timer" }]} />
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Study Timer</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Customisable study/break timer with session tracking.</p>
        </div>

        {/* Settings */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <label style={{ fontSize: "12px", color: "#374151", fontWeight: "500" }}>Study</label>
              <input type="number" value={workMins} onChange={(e) => setWorkMins(e.target.value)} min="1" max="120" style={{ width: "56px", border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "6px 8px", outline: "none", fontSize: "14px", textAlign: "center" }} />
              <span style={{ fontSize: "12px", color: "#6B7280" }}>min</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <label style={{ fontSize: "12px", color: "#374151", fontWeight: "500" }}>Break</label>
              <input type="number" value={breakMins} onChange={(e) => setBreakMins(e.target.value)} min="1" max="60" style={{ width: "56px", border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "6px 8px", outline: "none", fontSize: "14px", textAlign: "center" }} />
              <span style={{ fontSize: "12px", color: "#6B7280" }}>min</span>
            </div>
            <button onClick={applySettings} style={{ padding: "7px 14px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Apply</button>
          </div>
        </div>

        {/* Timer ring */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "28px", textAlign: "center", marginBottom: "16px" }}>
          <div style={{ display: "inline-block", position: "relative" }}>
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r={r} fill="none" stroke="#E0E7FF" strokeWidth="12" />
              <circle cx="110" cy="110" r={r} fill="none" stroke={modeColor} strokeWidth="12"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - progress / 100)}
                strokeLinecap="round" transform="rotate(-90 110 110)"
                style={{ transition: "stroke-dashoffset 1s linear" }} />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: "42px", fontWeight: "300", color: "#1E1B4B", lineHeight: "1" }}>
                {pad(Math.floor(remaining / 60))}:{pad(remaining % 60)}
              </div>
              <div style={{ fontSize: "12px", fontWeight: "500", color: modeColor, marginTop: "4px" }}>
                {mode === "work" ? "📖 Study" : "☕ Break"}
              </div>
            </div>
          </div>

          {message && (
            <div style={{ marginTop: "12px", padding: "10px 16px", background: "#ECFDF5", borderRadius: "8px", fontSize: "13px", color: "#065F46", fontWeight: "500" }}>
              {message}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
          <button onClick={startPause} style={{ padding: "12px 36px", borderRadius: "10px", border: "none", background: modeColor, color: "white", fontSize: "15px", cursor: "pointer", fontWeight: "600" }}>
            {running ? "Pause" : "Start"}
          </button>
          <button onClick={reset} style={{ padding: "12px 24px", borderRadius: "10px", border: "0.5px solid #E0E7FF", background: "white", color: "#374151", fontSize: "14px", cursor: "pointer" }}>
            Reset
          </button>
        </div>

        {/* Session stats */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "500", color: "#4F46E5" }}>{workCount}</div>
              <div style={{ fontSize: "11px", color: "#6B7280" }}>Sessions today</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "500", color: "#4F46E5" }}>{Math.floor(totalWork / 60)}h {totalWork % 60}m</div>
              <div style={{ fontSize: "11px", color: "#6B7280" }}>Total study time</div>
            </div>
          </div>
        </div>

        {/* Session log */}
        {sessionLog.length > 0 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "500", color: "#374151" }}>Session Log</div>
            <div style={{ maxHeight: "180px", overflowY: "auto" }}>
              {sessionLog.map((s, i) => (
                <div key={i} style={{ padding: "8px 16px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <span style={{ color: s.type === "work" ? "#4F46E5" : "#10B981" }}>{s.type === "work" ? "📖 Study" : "☕ Break"} — {s.duration} min</span>
                  <span style={{ color: "#9CA3AF" }}>{s.time}</span>
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
