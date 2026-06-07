"use client";
import { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MAX_ATTEMPTS = 5;

function getRating(ms) {
  if (ms < 150) return { label: "Superhuman", color: "#7C3AED", emoji: "🚀" };
  if (ms < 200) return { label: "Excellent",  color: "#059669", emoji: "⚡" };
  if (ms < 250) return { label: "Good",        color: "#10B981", emoji: "✅" };
  if (ms < 300) return { label: "Average",     color: "#F59E0B", emoji: "👍" };
  if (ms < 400) return { label: "Below avg",   color: "#F97316", emoji: "🙂" };
  return               { label: "Slow",         color: "#EF4444", emoji: "🐢" };
}

export default function ReactionTime() {
  const [state, setState] = useState("idle"); // idle | waiting | go | result | tooEarly | done
  const [reactionMs, setReactionMs] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [copied, setCopied] = useState(false);
  const startRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function startWaiting() {
    setState("waiting");
    const delay = 1000 + Math.random() * 4000;
    timerRef.current = setTimeout(() => {
      startRef.current = Date.now();
      setState("go");
    }, delay);
  }

  function handleClick() {
    if (state === "idle" || state === "result" || state === "tooEarly") {
      startWaiting();
      return;
    }
    if (state === "waiting") {
      clearTimeout(timerRef.current);
      setState("tooEarly");
      return;
    }
    if (state === "go") {
      const ms = Date.now() - startRef.current;
      const newAttempts = [...attempts, ms];
      setReactionMs(ms);
      setAttempts(newAttempts);
      if (newAttempts.length >= MAX_ATTEMPTS) {
        setState("done");
      } else {
        setState("result");
      }
      return;
    }
    if (state === "done") {
      setAttempts([]);
      setReactionMs(null);
      startWaiting();
    }
  }

  const avg = attempts.length ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) : null;
  const best = attempts.length ? Math.min(...attempts) : null;

  const boxConfig = {
    idle:     { bg: "#1E1B4B", text: "Click to Start", sub: "Test your reaction speed",  cursor: "pointer" },
    waiting:  { bg: "#DC2626", text: "Wait for green…", sub: "Don't click yet!",          cursor: "default" },
    go:       { bg: "#16A34A", text: "CLICK NOW!",      sub: "Click as fast as you can!", cursor: "pointer" },
    result:   { bg: "#4F46E5", text: reactionMs ? `${reactionMs} ms` : "", sub: reactionMs ? `${getRating(reactionMs).emoji} ${getRating(reactionMs).label} — click to try again` : "", cursor: "pointer" },
    tooEarly: { bg: "#DC2626", text: "Too Early! 😬",  sub: "Click to try again",         cursor: "pointer" },
    done:     { bg: "#1E1B4B", text: "",                sub: "",                           cursor: "pointer" },
  };

  const cfg = boxConfig[state] || boxConfig.idle;

  async function copyScore() {
    const lines = [`Reaction Time Results — QuikToolkit`, ``, ...attempts.map((ms, i) => `Try ${i + 1}: ${ms}ms (${getRating(ms).label})`), ``, `Average: ${avg}ms`, `Best: ${best}ms`];
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Games", href: "/games" }, { label: "Reaction Time Test" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>⚡ Reaction Time Test</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Click the green box as fast as possible. 5 attempts — can you beat 200ms?</p>
        </div>

        {/* Attempt dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
          {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
            <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: i < attempts.length ? "#4F46E5" : "#E5E7EB", border: "2px solid", borderColor: i < attempts.length ? "#4F46E5" : "#D1D5DB" }} />
          ))}
        </div>

        {/* Main click box */}
        {state !== "done" && (
          <div
            onClick={handleClick}
            style={{
              background: cfg.bg,
              borderRadius: "16px",
              padding: "80px 40px",
              textAlign: "center",
              cursor: cfg.cursor,
              userSelect: "none",
              transition: "background 0.15s ease",
              marginBottom: "20px",
              boxShadow: state === "go" ? "0 0 40px rgba(22,163,74,0.5)" : "none",
            }}
          >
            <div style={{ fontSize: state === "result" ? "56px" : "36px", fontWeight: "800", color: "white", marginBottom: "8px" }}>
              {cfg.text}
            </div>
            <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)" }}>{cfg.sub}</div>
          </div>
        )}

        {/* Results after each attempt */}
        {state === "result" && reactionMs && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Attempt {attempts.length} of {MAX_ATTEMPTS}</span>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              {attempts.map((ms, i) => {
                const r = getRating(ms);
                return (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: r.color }}>{ms}</div>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>ms</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Final results */}
        {state === "done" && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ background: "#4F46E5", padding: "20px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "4px" }}>🏆</div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "white" }}>Results</div>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "#EEF2FF", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Average</div>
                  <div style={{ fontSize: "36px", fontWeight: "800", color: "#4F46E5" }}>{avg}<span style={{ fontSize: "16px" }}>ms</span></div>
                  <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>{getRating(avg).emoji} {getRating(avg).label}</div>
                </div>
                <div style={{ background: "#ECFDF5", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#059669", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Best</div>
                  <div style={{ fontSize: "36px", fontWeight: "800", color: "#059669" }}>{best}<span style={{ fontSize: "16px" }}>ms</span></div>
                  <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>{getRating(best).emoji} {getRating(best).label}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                {attempts.map((ms, i) => {
                  const r = getRating(ms);
                  const pct = Math.min(100, (ms / 600) * 100);
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "12px", color: "#9CA3AF", minWidth: "44px" }}>Try {i + 1}</span>
                      <div style={{ flex: 1, height: "8px", borderRadius: "4px", background: "#F3F4F6", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: r.color, borderRadius: "4px" }} />
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: r.color, minWidth: "64px", textAlign: "right" }}>{ms}ms</span>
                      <span style={{ fontSize: "12px", color: "#9CA3AF", minWidth: "68px" }}>{r.emoji} {r.label}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleClick} style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "#4F46E5", color: "white", border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                  Play Again
                </button>
                <button onClick={copyScore} style={{ padding: "12px 18px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: copied ? "#DCFCE7" : "#EEF2FF", color: copied ? "#15803D" : "#4F46E5", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
                  {copied ? "Copied!" : "Copy Score"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rating guide */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>Rating Guide</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}>
            {[
              { range: "< 150ms", rating: "Superhuman 🚀", color: "#7C3AED" },
              { range: "150–200ms", rating: "Excellent ⚡", color: "#059669" },
              { range: "200–250ms", rating: "Good ✅", color: "#10B981" },
              { range: "250–300ms", rating: "Average 👍", color: "#F59E0B" },
              { range: "300–400ms", rating: "Below avg 🙂", color: "#F97316" },
              { range: "400ms+", rating: "Slow 🐢", color: "#EF4444" },
            ].map(({ range, rating, color }) => (
              <div key={range} style={{ padding: "10px 14px", borderRight: "0.5px solid #F3F4F6", borderBottom: "0.5px solid #F3F4F6" }}>
                <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#6B7280" }}>{range}</div>
                <div style={{ fontSize: "12px", fontWeight: "600", color, marginTop: "2px" }}>{rating}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
