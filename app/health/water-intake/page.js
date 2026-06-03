"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const activityLevels = [
  { label: "Sedentary", desc: "Desk job, little exercise", extra: 0 },
  { label: "Lightly Active", desc: "Light exercise 1–3 days/week", extra: 350 },
  { label: "Moderately Active", desc: "Moderate exercise 3–5 days", extra: 700 },
  { label: "Very Active", desc: "Hard exercise 6–7 days", extra: 1050 },
];

const climates = [
  { label: "Cool / Indoors", extra: 0 },
  { label: "Moderate", extra: 250 },
  { label: "Hot / Humid", extra: 500 },
];

export default function WaterIntake() {
  const [weight, setWeight] = useState("70");
  const [unit, setUnit] = useState("kg");
  const [activity, setActivity] = useState(0);
  const [climate, setClimate] = useState(0);

  const weightNum = parseFloat(weight) || 0;
  const weightKg = unit === "kg" ? weightNum : weightNum / 2.20462;

  // Base: 33 ml per kg
  const baseMl = weightKg * 33;
  const totalMl = Math.round(baseMl + activity + climate);
  const totalL = (totalMl / 1000).toFixed(1);
  const glasses = Math.round(totalMl / 240); // 240ml per glass

  const pct = Math.min(100, Math.round((baseMl / totalMl) * 100));

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health", href: "/health" }, { label: "Water Intake Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Water Intake Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Find your recommended daily water intake based on weight, activity, and climate.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Body Weight</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                style={{ flex: 1, border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px" }}
              />
              <div style={{ display: "flex", gap: "6px" }}>
                {["kg", "lbs"].map((u) => (
                  <button key={u} onClick={() => setUnit(u)} style={{ padding: "10px 16px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: unit === u ? "#4F46E5" : "white", color: unit === u ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Activity Level</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {activityLevels.map((lvl) => (
                <button key={lvl.extra} onClick={() => setActivity(lvl.extra)} style={{ padding: "10px 14px", borderRadius: "8px", border: `0.5px solid ${activity === lvl.extra ? "#A5B4FC" : "#C7D2FE"}`, background: activity === lvl.extra ? "#EEF2FF" : "white", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>
                    <span style={{ fontSize: "13px", fontWeight: "500", color: activity === lvl.extra ? "#4F46E5" : "#374151" }}>{lvl.label}</span>
                    <span style={{ fontSize: "12px", color: "#9CA3AF", marginLeft: "8px" }}>{lvl.desc}</span>
                  </span>
                  {activity === lvl.extra && <span style={{ color: "#4F46E5" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Climate</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {climates.map((c) => (
                <button key={c.extra} onClick={() => setClimate(c.extra)} style={{ flex: 1, padding: "9px 8px", borderRadius: "8px", border: `0.5px solid ${climate === c.extra ? "#A5B4FC" : "#C7D2FE"}`, background: climate === c.extra ? "#4F46E5" : "white", color: climate === c.extra ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {weightKg > 0 && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Daily Recommended Intake</div>
              <div style={{ fontSize: "52px", fontWeight: "500", color: "#4F46E5", lineHeight: "1" }}>{totalMl.toLocaleString()}</div>
              <div style={{ fontSize: "16px", color: "#6366F1", marginTop: "4px" }}>millilitres</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              <div style={{ background: "white", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "32px", fontWeight: "500", color: "#4F46E5" }}>{totalL}L</div>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>Litres</div>
              </div>
              <div style={{ background: "white", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "32px", fontWeight: "500", color: "#4F46E5" }}>{glasses}</div>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>Glasses (240ml each)</div>
              </div>
            </div>

            {/* Visual glass indicator */}
            <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
              {Array.from({ length: Math.min(glasses, 16) }, (_, i) => (
                <div key={i} style={{ width: "28px", height: "36px", borderRadius: "0 0 6px 6px", background: "#4F46E5", border: "2px solid #818CF8", opacity: 0.8 + i * 0.01 }} title={`Glass ${i + 1}`} />
              ))}
              {glasses > 16 && <div style={{ fontSize: "14px", color: "#6366F1", alignSelf: "center" }}>+{glasses - 16} more</div>}
            </div>
          </div>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>Formula Used</div>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 4px", lineHeight: "1.6" }}>
            Base: 33ml × body weight (kg) + activity adjustment + climate adjustment.
          </p>
          <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>Individual needs vary. Consult a healthcare professional for personalised advice.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
