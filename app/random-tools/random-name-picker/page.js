"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DEFAULT_NAMES = "Alice\nBob\nCharlie\nDiana\nEve\nFrank\nGrace\nHenry";

export default function RandomNamePicker() {
  const [namesText, setNamesText] = useState(DEFAULT_NAMES);
  const [pickCount, setPickCount] = useState(1);
  const [winners, setWinners] = useState([]);
  const [animName, setAnimName] = useState(null);
  const [picking, setPicking] = useState(false);
  const [removePicked, setRemovePicked] = useState(false);
  const [remaining, setRemaining] = useState(null);

  const timerRef = useRef(null);
  const stopRef = useRef(null);

  useEffect(() => {
    return () => { clearInterval(timerRef.current); clearTimeout(stopRef.current); };
  }, []);

  function getNames() {
    const pool = remaining !== null ? remaining : namesText.split("\n").map((n) => n.trim()).filter(Boolean);
    return pool;
  }

  function pick() {
    const pool = getNames();
    if (pool.length === 0 || picking) return;
    const count = Math.min(pickCount, pool.length);

    setPicking(true);
    setWinners([]);

    let idx = 0;
    timerRef.current = setInterval(() => {
      idx = (idx + 1) % pool.length;
      setAnimName(pool[idx]);
    }, 80);

    stopRef.current = setTimeout(() => {
      clearInterval(timerRef.current);
      setAnimName(null);

      // Pick unique winners
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, count);
      setWinners(picked);

      if (removePicked) {
        const newPool = pool.filter((n) => !picked.includes(n));
        setRemaining(newPool);
      }
      setPicking(false);
    }, 1800);
  }

  function resetPool() {
    setRemaining(null);
    setWinners([]);
    setAnimName(null);
  }

  const names = getNames();

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Random Tools", href: "/random-tools" }, { label: "Random Name Picker" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Random Name Picker</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Paste a list of names, pick random winner(s) with animation.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                <span>Names List</span>
                <span style={{ color: "#6B7280" }}>{names.length} names</span>
              </div>
              <textarea
                value={remaining !== null ? remaining.join("\n") : namesText}
                onChange={(e) => { setNamesText(e.target.value); setRemaining(null); setWinners([]); }}
                readOnly={remaining !== null}
                rows={12}
                placeholder="One name per line..."
                style={{ width: "100%", border: "none", padding: "12px 16px", outline: "none", background: remaining !== null ? "#F8F9FF" : "white", fontSize: "13px", resize: "none", boxSizing: "border-box" }}
              />
            </div>

            {/* Options */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px" }}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Number of winners</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[1, 2, 3, 5].map((n) => (
                    <button key={n} onClick={() => setPickCount(n)} style={{ flex: 1, padding: "7px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: pickCount === n ? "#4F46E5" : "white", color: pickCount === n ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>{n}</button>
                  ))}
                </div>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#374151" }}>
                <input type="checkbox" checked={removePicked} onChange={(e) => setRemovePicked(e.target.checked)} style={{ accentColor: "#4F46E5" }} />
                Remove picked names
              </label>
            </div>
          </div>

          <div>
            {/* Animation display */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "12px", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {picking && animName ? (
                <>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px" }}>Picking…</div>
                  <div style={{ fontSize: "28px", fontWeight: "600", color: "#6366F1" }}>{animName}</div>
                </>
              ) : winners.length > 0 ? (
                <>
                  <div style={{ fontSize: "14px", color: "#10B981", fontWeight: "500", marginBottom: "12px" }}>🎉 {winners.length === 1 ? "Winner" : "Winners"}!</div>
                  {winners.map((w, i) => (
                    <div key={i} style={{ fontSize: "22px", fontWeight: "600", color: "#4F46E5", marginBottom: "6px" }}>🏆 {w}</div>
                  ))}
                </>
              ) : (
                <div style={{ color: "#D1D5DB", fontSize: "14px" }}>Winner appears here</div>
              )}
            </div>

            <button
              onClick={pick}
              disabled={picking || names.length === 0}
              style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", background: picking || names.length === 0 ? "#E5E7EB" : "#4F46E5", color: picking || names.length === 0 ? "#9CA3AF" : "white", fontSize: "15px", cursor: picking || names.length === 0 ? "default" : "pointer", fontWeight: "600", marginBottom: "8px" }}
            >
              {picking ? "Picking…" : `Pick ${pickCount > 1 ? pickCount + " Winners" : "a Winner"}`}
            </button>

            {remaining !== null && (
              <button onClick={resetPool} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "13px", cursor: "pointer" }}>
                Reset (restore {namesText.split("\n").filter(Boolean).length} names)
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
