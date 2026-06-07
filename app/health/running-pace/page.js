"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const QUICK_DISTANCES = [
  { label: "5K", km: 5 },
  { label: "10K", km: 10 },
  { label: "Half", km: 21.0975 },
  { label: "Marathon", km: 42.195 },
];

// Parse "MM:SS" or "HH:MM:SS" → total seconds
function parseTime(str) {
  const parts = str.trim().split(":").map(Number);
  if (parts.some(isNaN)) return null;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

// Total seconds → "H:MM:SS" or "MM:SS"
function fmtTime(secs, forceHours = false) {
  if (secs == null || isNaN(secs) || secs < 0) return "—";
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  if (h > 0 || forceHours) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function fmtDist(km, unit) {
  const val = unit === "km" ? km : km / 1.60934;
  return parseFloat(val.toFixed(3)).toString();
}

const KM_TO_MI = 1 / 1.60934;

export default function RunningPace() {
  const [tab, setTab] = useState("pace"); // pace | time | distance
  const [unit, setUnit] = useState("km");

  // Tab 1 – Pace calculator
  const [p1Dist, setP1Dist] = useState("10");
  const [p1H, setP1H] = useState("0");
  const [p1M, setP1M] = useState("50");
  const [p1S, setP1S] = useState("00");

  // Tab 2 – Finish Time
  const [p2Dist, setP2Dist] = useState("10");
  const [p2PaceM, setP2PaceM] = useState("5");
  const [p2PaceS, setP2PaceS] = useState("00");

  // Tab 3 – Distance
  const [p3H, setP3H] = useState("1");
  const [p3M, setP3M] = useState("00");
  const [p3S, setP3S] = useState("00");
  const [p3PaceM, setP3PaceM] = useState("5");
  const [p3PaceS, setP3PaceS] = useState("00");

  /* ---------- Calculations ---------- */

  // Tab 1
  const p1DistKm = unit === "km" ? parseFloat(p1Dist) : parseFloat(p1Dist) * 1.60934;
  const p1TotalSecs = (parseInt(p1H) || 0) * 3600 + (parseInt(p1M) || 0) * 60 + (parseInt(p1S) || 0);
  const p1PaceSecPerKm = p1DistKm > 0 && p1TotalSecs > 0 ? p1TotalSecs / p1DistKm : null;
  const p1PaceSecPerMi = p1PaceSecPerKm ? p1PaceSecPerKm * 1.60934 : null;

  // Tab 2
  const p2DistKm = unit === "km" ? parseFloat(p2Dist) : parseFloat(p2Dist) * 1.60934;
  const p2PaceSecs = (parseInt(p2PaceM) || 0) * 60 + (parseInt(p2PaceS) || 0);
  const p2PaceSecPerKm = unit === "km" ? p2PaceSecs : p2PaceSecs * KM_TO_MI;
  const p2FinishSecs = p2DistKm > 0 && p2PaceSecPerKm > 0 ? p2DistKm * p2PaceSecPerKm : null;

  // Tab 3
  const p3TotalSecs = (parseInt(p3H) || 0) * 3600 + (parseInt(p3M) || 0) * 60 + (parseInt(p3S) || 0);
  const p3PaceSecs = (parseInt(p3PaceM) || 0) * 60 + (parseInt(p3PaceS) || 0);
  const p3PaceSecPerKm = unit === "km" ? p3PaceSecs : p3PaceSecs * KM_TO_MI;
  const p3DistKm = p3TotalSecs > 0 && p3PaceSecPerKm > 0 ? p3TotalSecs / p3PaceSecPerKm : null;

  /* ---------- Splits table ---------- */
  function getSplits(distKm, paceSecPerKm) {
    if (!distKm || !paceSecPerKm || distKm <= 0) return [];
    const total = Math.ceil(unit === "km" ? distKm : distKm * KM_TO_MI);
    const splits = [];
    const splitDist = unit === "km" ? 1 : KM_TO_MI;
    for (let i = 1; i <= Math.min(total, 50); i++) {
      splits.push({ split: i, time: fmtTime(i * paceSecPerKm * (unit === "km" ? 1 : 1.60934), i * paceSecPerKm * (unit === "km" ? 1 : 1.60934) >= 3600) });
    }
    return splits;
  }

  const paceSecPerKm = tab === "pace" ? p1PaceSecPerKm : tab === "time" ? p2PaceSecPerKm : p3PaceSecPerKm > 0 ? p3PaceSecPerKm : null;
  const distKmForSplits = tab === "pace" ? p1DistKm : tab === "time" ? p2DistKm : p3DistKm;
  const splits = paceSecPerKm ? getSplits(distKmForSplits, paceSecPerKm) : [];

  /* ---------- Style helpers ---------- */
  const tabBase = { padding: "9px 0", flex: 1, borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "13px", fontWeight: "500", cursor: "pointer" };
  const tabActive = { ...tabBase, background: "#4F46E5", color: "white", border: "none" };
  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };
  const unitActive = { padding: "6px 16px", borderRadius: "6px", border: "none", background: "#4F46E5", color: "white", fontSize: "13px", fontWeight: "500", cursor: "pointer" };
  const unitInactive = { padding: "6px 16px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "13px", fontWeight: "500", cursor: "pointer" };

  function QuickDistBtns({ setter }) {
    return (
      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
        {QUICK_DISTANCES.map(({ label, km }) => (
          <button key={label} onClick={() => setter(unit === "km" ? String(parseFloat(km.toFixed(4))) : String(parseFloat((km * KM_TO_MI).toFixed(4))))}
            style={{ padding: "4px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "#EEF2FF", color: "#4F46E5", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>
            {label}
          </button>
        ))}
      </div>
    );
  }

  function TimeInputs({ h, setH, m, setM, s, setS, label }) {
    return (
      <div>
        <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>{label}</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", alignItems: "center" }}>
          <div>
            <input type="number" value={h} onChange={(e) => setH(e.target.value)} placeholder="0" min="0" style={inp} />
            <div style={{ fontSize: "10px", color: "#9CA3AF", textAlign: "center", marginTop: "2px" }}>hours</div>
          </div>
          <div>
            <input type="number" value={m} onChange={(e) => setM(e.target.value)} placeholder="00" min="0" max="59" style={inp} />
            <div style={{ fontSize: "10px", color: "#9CA3AF", textAlign: "center", marginTop: "2px" }}>min</div>
          </div>
          <div>
            <input type="number" value={s} onChange={(e) => setS(e.target.value)} placeholder="00" min="0" max="59" style={inp} />
            <div style={{ fontSize: "10px", color: "#9CA3AF", textAlign: "center", marginTop: "2px" }}>sec</div>
          </div>
        </div>
      </div>
    );
  }

  function PaceInputs({ m, setM, s, setS, label }) {
    return (
      <div>
        <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>{label} (min:sec / {unit})</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          <div>
            <input type="number" value={m} onChange={(e) => setM(e.target.value)} placeholder="5" min="0" style={inp} />
            <div style={{ fontSize: "10px", color: "#9CA3AF", textAlign: "center", marginTop: "2px" }}>min</div>
          </div>
          <div>
            <input type="number" value={s} onChange={(e) => setS(e.target.value)} placeholder="00" min="0" max="59" style={inp} />
            <div style={{ fontSize: "10px", color: "#9CA3AF", textAlign: "center", marginTop: "2px" }}>sec</div>
          </div>
        </div>
      </div>
    );
  }

  function ResultBox({ label, value, sub }) {
    return (
      <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "12px", fontWeight: "600", color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>{label}</div>
        <div style={{ fontSize: "44px", fontWeight: "700", color: "#4F46E5", lineHeight: 1, fontFamily: "monospace" }}>{value}</div>
        {sub && <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "6px" }}>{sub}</div>}
      </div>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health", href: "/health" }, { label: "Running Pace Calculator" }]} />
      <div style={{ maxWidth: "660px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Running Pace Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate pace, finish time or distance — with per-kilometre split table.</p>
        </div>

        {/* Unit toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "#6B7280" }}>Units:</span>
          <button onClick={() => setUnit("km")} style={unit === "km" ? unitActive : unitInactive}>km</button>
          <button onClick={() => setUnit("mi")} style={unit === "mi" ? unitActive : unitInactive}>miles</button>
        </div>

        {/* Tab selector */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {[["pace", "Calculate Pace"], ["time", "Finish Time"], ["distance", "Distance"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={tab === key ? tabActive : tabBase}>{label}</button>
          ))}
        </div>

        {/* Input card */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>

          {tab === "pace" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Distance ({unit})</label>
                <input type="number" value={p1Dist} onChange={(e) => setP1Dist(e.target.value)} placeholder="10" min="0" style={inp} />
                <QuickDistBtns setter={setP1Dist} />
              </div>
              <TimeInputs h={p1H} setH={setP1H} m={p1M} setM={setP1M} s={p1S} setS={setP1S} label="Finish time" />
            </div>
          )}

          {tab === "time" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Distance ({unit})</label>
                <input type="number" value={p2Dist} onChange={(e) => setP2Dist(e.target.value)} placeholder="10" min="0" style={inp} />
                <QuickDistBtns setter={setP2Dist} />
              </div>
              <PaceInputs m={p2PaceM} setM={setP2PaceM} s={p2PaceS} setS={setP2PaceS} label="Pace" />
            </div>
          )}

          {tab === "distance" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <TimeInputs h={p3H} setH={setP3H} m={p3M} setM={setP3M} s={p3S} setS={setP3S} label="Time available" />
              <PaceInputs m={p3PaceM} setM={setP3PaceM} s={p3PaceS} setS={setP3PaceS} label="Pace" />
            </div>
          )}
        </div>

        {/* Results */}
        {tab === "pace" && p1PaceSecPerKm && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <ResultBox label={`Pace / km`} value={fmtTime(p1PaceSecPerKm)} />
            <ResultBox label={`Pace / mile`} value={fmtTime(p1PaceSecPerMi)} />
          </div>
        )}

        {tab === "time" && p2FinishSecs && (
          <div style={{ marginBottom: "16px" }}>
            <ResultBox label="Finish Time" value={fmtTime(p2FinishSecs, true)} sub={`${fmtDist(p2DistKm, unit)} ${unit} at ${fmtTime(p2PaceSecs)} / ${unit}`} />
          </div>
        )}

        {tab === "distance" && p3DistKm && (
          <div style={{ marginBottom: "16px" }}>
            <ResultBox
              label={`Distance (${unit})`}
              value={unit === "km" ? parseFloat(p3DistKm.toFixed(2)) : parseFloat((p3DistKm * KM_TO_MI).toFixed(2))}
              sub={`in ${fmtTime(p3TotalSecs, true)} at ${fmtTime(p3PaceSecs)} / ${unit}`}
            />
          </div>
        )}

        {/* Splits table */}
        {splits.length > 0 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>
              {unit === "km" ? "Kilometre" : "Mile"} Splits
            </div>
            <div style={{ maxHeight: "320px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#F8F9FF", position: "sticky", top: 0 }}>
                    <th style={{ padding: "8px 20px", textAlign: "left", color: "#6B7280", fontWeight: "600", borderBottom: "0.5px solid #E0E7FF" }}>{unit === "km" ? "KM" : "Mile"}</th>
                    <th style={{ padding: "8px 20px", textAlign: "right", color: "#6B7280", fontWeight: "600", borderBottom: "0.5px solid #E0E7FF" }}>Split</th>
                    <th style={{ padding: "8px 20px", textAlign: "right", color: "#6B7280", fontWeight: "600", borderBottom: "0.5px solid #E0E7FF" }}>Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {splits.map(({ split, time }) => {
                    const pacePerSplit = unit === "km" ? paceSecPerKm : paceSecPerKm * 1.60934;
                    return (
                      <tr key={split} style={{ borderBottom: "0.5px solid #F3F4F6" }}>
                        <td style={{ padding: "8px 20px", color: "#374151", fontWeight: "500" }}>{split}</td>
                        <td style={{ padding: "8px 20px", textAlign: "right", fontFamily: "monospace", color: "#4F46E5" }}>{fmtTime(pacePerSplit)}</td>
                        <td style={{ padding: "8px 20px", textAlign: "right", fontFamily: "monospace", color: "#374151" }}>{fmtTime(split * pacePerSplit, split * pacePerSplit >= 3600)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
