"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CoinFlip() {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState([]);

  const heads = history.filter((r) => r === "heads").length;
  const tails = history.filter((r) => r === "tails").length;
  const total = history.length;
  const headsPct = total > 0 ? ((heads / total) * 100).toFixed(1) : 50;
  const tailsPct = total > 0 ? ((tails / total) * 100).toFixed(1) : 50;

  function flip() {
    if (flipping) return;
    setFlipping(true);
    setResult(null);
    setTimeout(() => {
      const r = Math.random() < 0.5 ? "heads" : "tails";
      setResult(r);
      setHistory((h) => [r, ...h].slice(0, 20));
      setFlipping(false);
    }, 600);
  }

  function reset() {
    setResult(null);
    setHistory([]);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Random Tools", href: "/random-tools" }, { label: "Coin Flip" }]} />
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Coin Flip</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Flip a fair coin and track your results.</p>
        </div>

        {/* Coin display */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "40px 24px", textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "96px", marginBottom: "12px", transition: "transform 0.3s", transform: flipping ? "rotateY(90deg)" : "rotateY(0deg)" }}>
            {flipping ? "🪙" : result === "heads" ? "🟡" : result === "tails" ? "🔵" : "🪙"}
          </div>
          <div style={{ fontSize: "28px", fontWeight: "500", color: result ? "#1E1B4B" : "#9CA3AF", minHeight: "36px" }}>
            {flipping ? "Flipping…" : result ? result.charAt(0).toUpperCase() + result.slice(1) : "Click to flip"}
          </div>
          <button
            onClick={flip}
            disabled={flipping}
            style={{ marginTop: "20px", padding: "14px 40px", borderRadius: "10px", border: "none", background: flipping ? "#E5E7EB" : "#4F46E5", color: flipping ? "#9CA3AF" : "white", fontSize: "16px", cursor: flipping ? "default" : "pointer", fontWeight: "600" }}
          >
            {flipping ? "…" : "Flip Coin"}
          </button>
        </div>

        {/* Stats */}
        {total > 0 && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "500", color: "#F59E0B" }}>{heads}</div>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>Heads ({headsPct}%)</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "500", color: "#9CA3AF" }}>{total}</div>
                <div style={{ fontSize: "12px", color: "#9CA3AF" }}>Total</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "500", color: "#3B82F6" }}>{tails}</div>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>Tails ({tailsPct}%)</div>
              </div>
            </div>
            <div style={{ height: "8px", borderRadius: "4px", background: "#3B82F6", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${headsPct}%`, background: "#F59E0B", borderRadius: "4px 0 0 4px", transition: "width 0.4s" }} />
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Recent flips</span>
              <button onClick={reset} style={{ fontSize: "12px", color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}>Clear</button>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {history.map((r, i) => (
                <span key={i} style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "500", background: r === "heads" ? "#FEF9C3" : "#DBEAFE", color: r === "heads" ? "#92400E" : "#1D4ED8" }}>
                  {r === "heads" ? "H" : "T"}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
