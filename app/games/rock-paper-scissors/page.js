"use client";
import { useState, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CHOICES = [
  { id: "rock",     emoji: "🪨", label: "Rock" },
  { id: "paper",    emoji: "📄", label: "Paper" },
  { id: "scissors", emoji: "✂️", label: "Scissors" },
];

const BEATS = { rock: "scissors", paper: "rock", scissors: "paper" };

function getResult(user, computer) {
  if (user === computer) return "draw";
  if (BEATS[user] === computer) return "win";
  return "lose";
}

const RESULT_CFG = {
  win:  { label: "You Win! 🎉", bg: "#ECFDF5", border: "#6EE7B7", color: "#065F46" },
  lose: { label: "You Lose 😢", bg: "#FFF5F5", border: "#FCA5A5", color: "#991B1B" },
  draw: { label: "It's a Draw! 🤝", bg: "#EEF2FF", border: "#A5B4FC", color: "#4F46E5" },
};

const BO5_MAX = 5;

export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState(null);
  const [compChoice, setCompChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });
  const [streak, setStreak] = useState({ type: null, count: 0 });
  const [revealing, setRevealing] = useState(false);
  const [bo5, setBo5] = useState({ wins: 0, losses: 0, active: false });
  const timeoutRef = useRef(null);

  function play(choice) {
    if (revealing) return;
    setRevealing(true);
    setUserChoice(choice);
    setCompChoice(null);
    setResult(null);

    timeoutRef.current = setTimeout(() => {
      const comp = CHOICES[Math.floor(Math.random() * 3)].id;
      const res = getResult(choice, comp);
      setCompChoice(comp);
      setResult(res);
      setScore((s) => ({ ...s, [res]: s[res] + 1 }));
      setStreak((s) => {
        if (s.type === res) return { type: res, count: s.count + 1 };
        return { type: res, count: 1 };
      });
      if (bo5.active) {
        setBo5((b) => {
          const wins  = res === "win"  ? b.wins + 1  : b.wins;
          const losses = res === "lose" ? b.losses + 1 : b.losses;
          return { ...b, wins, losses };
        });
      }
      setRevealing(false);
    }, 500);
  }

  function resetBo5() {
    setBo5({ wins: 0, losses: 0, active: true });
    setUserChoice(null);
    setCompChoice(null);
    setResult(null);
  }

  const compDisplay = revealing
    ? CHOICES[Math.floor(Math.random() * 3)]
    : CHOICES.find((c) => c.id === compChoice);
  const userDisplay = CHOICES.find((c) => c.id === userChoice);

  const bo5Done = bo5.active && (bo5.wins >= 3 || bo5.losses >= 3);
  const bo5Winner = bo5.wins >= 3 ? "You won Best of 5! 🏆" : "Computer won Best of 5 😢";

  const resultCfg = result ? RESULT_CFG[result] : null;
  const streakEmoji = streak.type === "win" ? "🔥" : streak.type === "lose" ? "💀" : "🤝";

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Games", href: "/games" }, { label: "Rock Paper Scissors" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>🪨 Rock Paper Scissors</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Play against the computer — try Best of 5 mode!</p>
        </div>

        {/* Scoreboard */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 24px", marginBottom: "16px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {[
            { label: "Wins", value: score.win, color: "#10B981" },
            { label: "Draws", value: score.draw, color: "#6366F1" },
            { label: "Losses", value: score.lose, color: "#EF4444" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color }}>{value}</div>
              <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{label}</div>
            </div>
          ))}
          {streak.count >= 2 && (
            <div style={{ textAlign: "center", padding: "8px 14px", borderRadius: "10px", background: "#EEF2FF", border: "0.5px solid #C7D2FE" }}>
              <div style={{ fontSize: "20px" }}>{streakEmoji}</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#4F46E5" }}>{streak.count}x</div>
              <div style={{ fontSize: "11px", color: "#6B7280" }}>streak</div>
            </div>
          )}
        </div>

        {/* Best of 5 */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "14px 20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: bo5.active ? "12px" : "0" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Best of 5</div>
            <button onClick={resetBo5} style={{ fontSize: "12px", padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "#EEF2FF", color: "#4F46E5", cursor: "pointer", fontWeight: "500" }}>
              {bo5.active ? "Reset" : "Start"}
            </button>
          </div>
          {bo5.active && (
            <>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#6B7280", minWidth: "40px" }}>You:</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {Array.from({ length: BO5_MAX }).map((_, i) => (
                    <div key={i} style={{ width: "18px", height: "18px", borderRadius: "50%", background: i < bo5.wins ? "#10B981" : "#E5E7EB" }} />
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "6px" }}>
                <span style={{ fontSize: "12px", color: "#6B7280", minWidth: "40px" }}>CPU:</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {Array.from({ length: BO5_MAX }).map((_, i) => (
                    <div key={i} style={{ width: "18px", height: "18px", borderRadius: "50%", background: i < bo5.losses ? "#EF4444" : "#E5E7EB" }} />
                  ))}
                </div>
              </div>
              {bo5Done && (
                <div style={{ marginTop: "10px", padding: "8px 12px", borderRadius: "8px", background: bo5.wins >= 3 ? "#ECFDF5" : "#FFF5F5", fontSize: "13px", fontWeight: "600", color: bo5.wins >= 3 ? "#065F46" : "#991B1B", textAlign: "center" }}>
                  {bo5Winner}
                </div>
              )}
            </>
          )}
        </div>

        {/* Battle arena */}
        {(userChoice || compChoice) && (
          <div style={{ background: resultCfg?.bg ?? "#F8F9FF", border: `0.5px solid ${resultCfg?.border ?? "#E0E7FF"}`, borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>You</div>
                <div style={{ fontSize: "72px", filter: revealing ? "grayscale(1)" : "none", transition: "filter 0.3s" }}>
                  {userDisplay?.emoji ?? "❓"}
                </div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginTop: "4px" }}>{userDisplay?.label}</div>
              </div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#9CA3AF" }}>VS</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Computer</div>
                <div style={{ fontSize: "72px" }}>{revealing ? "❓" : compDisplay?.emoji ?? "❓"}</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginTop: "4px" }}>{revealing ? "…" : compDisplay?.label}</div>
              </div>
            </div>
            {result && resultCfg && (
              <div style={{ textAlign: "center", fontSize: "22px", fontWeight: "700", color: resultCfg.color }}>{resultCfg.label}</div>
            )}
          </div>
        )}

        {/* Choice buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {CHOICES.map(({ id, emoji, label }) => (
            <button
              key={id}
              onClick={() => play(id)}
              disabled={revealing}
              style={{
                padding: "20px 12px",
                borderRadius: "16px",
                border: userChoice === id ? "3px solid #4F46E5" : "2px solid #E0E7FF",
                background: userChoice === id ? "#EEF2FF" : "white",
                cursor: revealing ? "not-allowed" : "pointer",
                opacity: revealing ? 0.6 : 1,
                transition: "all 0.15s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "48px" }}>{emoji}</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
