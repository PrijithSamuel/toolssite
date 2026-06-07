"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PARAGRAPHS = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.",
  "Typing fast is a skill that takes practice and patience. The more you type, the better your fingers learn the keyboard layout and your speed naturally improves over time.",
  "Technology has changed the way we communicate. From handwritten letters to instant messages, the speed of communication has increased dramatically over the last century.",
  "A good programmer writes code that humans can understand. Clean code is simple, direct, and free of unnecessary complexity. Always aim for clarity over cleverness.",
  "The ocean covers more than seventy percent of the Earth's surface. It regulates climate, produces oxygen, and supports an enormous variety of life forms beneath its waves.",
];

function getRating(wpm) {
  if (wpm < 30)  return { label: "Beginner",  color: "#EF4444",  emoji: "🐣" };
  if (wpm < 50)  return { label: "Average",   color: "#F59E0B",  emoji: "📝" };
  if (wpm < 70)  return { label: "Good",      color: "#10B981",  emoji: "👍" };
  if (wpm < 100) return { label: "Fast",      color: "#3B82F6",  emoji: "⚡" };
  return          { label: "Expert",   color: "#7C3AED",  emoji: "🚀" };
}

export default function TypingSpeed() {
  const [target] = useState(() => PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)]);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);
  const textareaRef = useRef(null);

  const clearTimer = () => { if (intervalRef.current) clearInterval(intervalRef.current); };

  useEffect(() => {
    if (started && !finished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearTimer(); setFinished(true); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [started, finished]);

  function handleChange(e) {
    if (finished) return;
    const val = e.target.value;
    if (!started && val.length > 0) setStarted(true);
    setTyped(val);
  }

  // Stats
  const words = typed.trim().split(/\s+/).filter(Boolean).length;
  const elapsed = 60 - timeLeft;
  const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;

  let correctChars = 0, errors = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correctChars++;
    else errors++;
  }
  const accuracy = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
  const cpm = elapsed > 0 ? Math.round((typed.length / elapsed) * 60) : 0;

  function reset() {
    clearTimer();
    setTyped("");
    setTimeLeft(60);
    setStarted(false);
    setFinished(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  const timerColor = timeLeft <= 10 ? "#EF4444" : timeLeft <= 20 ? "#F59E0B" : "#4F46E5";
  const rating = getRating(wpm);

  // Build highlighted target spans
  const renderTarget = () => {
    return target.split("").map((char, i) => {
      let bg = "transparent", color = "#6B7280";
      if (i < typed.length) {
        if (typed[i] === char) { bg = "#DCFCE7"; color = "#166534"; }
        else { bg = "#FEE2E2"; color = "#991B1B"; }
      } else if (i === typed.length) {
        bg = "#EEF2FF"; color = "#1E1B4B";
      }
      return (
        <span key={i} style={{ background: bg, color, borderRadius: "2px", whiteSpace: "pre-wrap" }}>
          {char}
        </span>
      );
    });
  };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Games", href: "/games" }, { label: "Typing Speed Test" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>⌨️ Typing Speed Test</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Type the paragraph below. Timer starts on first keypress. 60 seconds.</p>
        </div>

        {!finished ? (
          <>
            {/* Timer + live stats bar */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "14px 20px", marginBottom: "16px", display: "flex", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "36px", fontWeight: "800", color: timerColor, fontFamily: "monospace", lineHeight: 1 }}>{timeLeft}</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF" }}>seconds</div>
              </div>
              {[
                { label: "WPM", value: started ? wpm : "—" },
                { label: "Accuracy", value: started ? `${accuracy}%` : "—" },
                { label: "Errors", value: started ? errors : "—" },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "26px", fontWeight: "700", color: "#4F46E5" }}>{value}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Target text */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "14px", fontSize: "17px", lineHeight: "1.8", fontFamily: "monospace", userSelect: "none" }}>
              {renderTarget()}
            </div>

            {/* Typing area */}
            <textarea
              ref={textareaRef}
              value={typed}
              onChange={handleChange}
              disabled={finished}
              placeholder={started ? "" : "Start typing here to begin the test…"}
              rows={4}
              autoFocus
              style={{ width: "100%", border: `2px solid ${started ? "#4F46E5" : "#C7D2FE"}`, borderRadius: "12px", padding: "14px 16px", outline: "none", background: "white", fontSize: "16px", resize: "none", boxSizing: "border-box", fontFamily: "monospace", lineHeight: "1.6" }}
            />
          </>
        ) : (
          /* Results screen */
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ background: "#4F46E5", padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "6px" }}>{rating.emoji}</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginBottom: "4px" }}>Your typing speed</div>
              <div style={{ fontSize: "64px", fontWeight: "800", color: "white", lineHeight: 1 }}>{wpm}</div>
              <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>WPM</div>
              <div style={{ display: "inline-block", padding: "4px 16px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", fontSize: "14px", fontWeight: "600", color: "white" }}>
                {rating.emoji} {rating.label}
              </div>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                {[
                  { label: "Accuracy", value: `${accuracy}%`, color: accuracy >= 90 ? "#10B981" : accuracy >= 70 ? "#F59E0B" : "#EF4444" },
                  { label: "Errors",   value: errors, color: errors === 0 ? "#10B981" : errors < 5 ? "#F59E0B" : "#EF4444" },
                  { label: "CPM",      value: cpm, color: "#4F46E5" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background: "#F8F9FF", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "28px", fontWeight: "700", color }}>{value}</div>
                    <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>{label}</div>
                  </div>
                ))}
              </div>
              <button onClick={reset} style={{ width: "100%", padding: "14px", borderRadius: "10px", background: "#4F46E5", color: "white", border: "none", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Rating guide */}
        {!finished && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "14px 20px", marginTop: "16px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { range: "< 30", label: "Beginner 🐣" },
              { range: "30–50", label: "Average 📝" },
              { range: "50–70", label: "Good 👍" },
              { range: "70–100", label: "Fast ⚡" },
              { range: "100+", label: "Expert 🚀" },
            ].map(({ range, label }) => (
              <span key={range} style={{ fontSize: "12px", color: "#6B7280" }}><strong>{range}</strong> WPM = {label}</span>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
