"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCards() {
  return shuffle([...EMOJIS, ...EMOJIS]).map((emoji, i) => ({
    id: i,
    emoji,
    flipped: false,
    matched: false,
  }));
}

function starRating(moves) {
  if (moves <= 15) return 3;
  if (moves <= 25) return 2;
  return 1;
}

export default function MemoryGame() {
  const [cards, setCards] = useState(makeCards);
  const [flipped, setFlipped] = useState([]); // ids of currently face-up unmatched cards
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
  }, []);

  useEffect(() => {
    if (won && timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [won]);

  function flipCard(id) {
    if (locked || won) return;
    if (flipped.includes(id)) return;
    const card = cards.find((c) => c.id === id);
    if (card.matched) return;

    if (!gameStarted) { setGameStarted(true); startTimer(); }

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, flipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = newFlipped.map((fid) => cards.find((c) => c.id === fid));
      if (a.emoji === b.emoji) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => newFlipped.includes(c.id) ? { ...c, matched: true } : c));
          const newMatched = matched + 1;
          setMatched(newMatched);
          setFlipped([]);
          setLocked(false);
          if (newMatched === EMOJIS.length) setWon(true);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
          setLocked(false);
        }, 1000);
      }
    }
  }

  function reset() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setCards(makeCards());
    setFlipped([]);
    setMoves(0);
    setMatched(0);
    setElapsed(0);
    setGameStarted(false);
    setWon(false);
    setLocked(false);
  }

  const stars = starRating(moves);
  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Games", href: "/games" }, { label: "Memory Game" }]} />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>🧠 Memory Game</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Find all 8 matching emoji pairs. Try to do it in under 15 moves!</p>
        </div>

        {/* Stats bar */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "12px 20px", marginBottom: "16px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {[
            { label: "Moves", value: moves },
            { label: "Pairs", value: `${matched}/8` },
            { label: "Time", value: fmtTime(elapsed) },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#4F46E5" }}>{value}</div>
              <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{label}</div>
            </div>
          ))}
          <button onClick={reset} style={{ padding: "7px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "#EEF2FF", color: "#4F46E5", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
            New Game
          </button>
        </div>

        {/* Card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
          {cards.map((card) => {
            const isUp = card.flipped || card.matched;
            return (
              <div
                key={card.id}
                onClick={() => flipCard(card.id)}
                style={{
                  height: "80px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isUp ? "36px" : "28px",
                  cursor: card.matched ? "default" : "pointer",
                  background: card.matched ? "#ECFDF5" : isUp ? "white" : "#4F46E5",
                  border: card.matched ? "2px solid #6EE7B7" : isUp ? "2px solid #C7D2FE" : "2px solid #3730A3",
                  boxShadow: card.matched ? "0 0 12px rgba(16,185,129,0.3)" : isUp ? "none" : "0 2px 8px rgba(79,70,229,0.3)",
                  transition: "all 0.2s ease",
                  userSelect: "none",
                }}
              >
                {isUp ? card.emoji : "❓"}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "8px", overflow: "hidden", height: "8px", marginBottom: "16px" }}>
          <div style={{ height: "100%", width: `${(matched / 8) * 100}%`, background: "linear-gradient(90deg, #4F46E5, #10B981)", borderRadius: "8px", transition: "width 0.4s ease" }} />
        </div>

        {/* Victory screen */}
        {won && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)", padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>🎉</div>
              <div style={{ fontSize: "26px", fontWeight: "800", color: "white", marginBottom: "4px" }}>Congratulations!</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>You matched all 8 pairs!</div>
            </div>
            <div style={{ padding: "24px" }}>
              {/* Stars */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "48px", letterSpacing: "4px" }}>
                  {["⭐", "⭐", "⭐"].map((s, i) => (
                    <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>{s}</span>
                  ))}
                </div>
                <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
                  {stars === 3 ? "Perfect! Under 15 moves!" : stars === 2 ? "Great! Under 25 moves!" : "Completed! Keep practising!"}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "#EEF2FF", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#4F46E5" }}>{moves}</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>moves taken</div>
                </div>
                <div style={{ background: "#ECFDF5", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#10B981" }}>{fmtTime(elapsed)}</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>time taken</div>
                </div>
              </div>
              <button onClick={reset} style={{ width: "100%", padding: "14px", borderRadius: "10px", background: "#4F46E5", color: "white", border: "none", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                Play Again 🔄
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
