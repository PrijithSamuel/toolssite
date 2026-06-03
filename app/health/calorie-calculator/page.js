"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const activityLevels = [
  { label: "Sedentary", desc: "Little or no exercise", multiplier: 1.2 },
  { label: "Lightly Active", desc: "1–3 days/week", multiplier: 1.375 },
  { label: "Moderately Active", desc: "3–5 days/week", multiplier: 1.55 },
  { label: "Very Active", desc: "6–7 days/week", multiplier: 1.725 },
  { label: "Super Active", desc: "Twice daily / hard labour", multiplier: 1.9 },
];

export default function CalorieCalculator() {
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("male");
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("70");
  const [activity, setActivity] = useState(1.55);
  const [unit, setUnit] = useState("metric");

  // Convert if imperial
  const w = unit === "metric" ? parseFloat(weightKg) : parseFloat(weightKg) / 2.20462;
  const h = unit === "metric" ? parseFloat(heightCm) : parseFloat(heightCm) * 2.54;
  const a = parseInt(age) || 0;

  let bmr = 0;
  if (w > 0 && h > 0 && a > 0) {
    bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
  }
  const maintenance = bmr * activity;
  const loseWeight = maintenance - 500;
  const gainWeight = maintenance + 500;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", width: "100%", boxSizing: "border-box" };

  const results = [
    { label: "BMR (Base Metabolic Rate)", value: Math.round(bmr), color: "#6366F1", desc: "Calories burned at complete rest" },
    { label: "Maintenance", value: Math.round(maintenance), color: "#4F46E5", desc: "To maintain current weight" },
    { label: "Mild Weight Loss", value: Math.round(loseWeight), color: "#10B981", desc: "Lose ~0.5 kg/week (−500 cal)" },
    { label: "Weight Gain", value: Math.round(gainWeight), color: "#F59E0B", desc: "Gain ~0.5 kg/week (+500 cal)" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health", href: "/health" }, { label: "Calorie Calculator" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Calorie Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Uses the Mifflin-St Jeor formula — the most accurate BMR calculation method.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Unit toggle */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            {["metric", "imperial"].map((u) => (
              <button key={u} onClick={() => setUnit(u)} style={{ padding: "7px 18px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: unit === u ? "#4F46E5" : "white", color: unit === u ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500", textTransform: "capitalize" }}>
                {u === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/in)"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" min="1" max="120" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Gender</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["male", "female"].map((g) => (
                  <button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: gender === g ? "#4F46E5" : "white", color: gender === g ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500", textTransform: "capitalize" }}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Height ({unit === "metric" ? "cm" : "inches"})</label>
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder={unit === "metric" ? "170" : "67"} style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Weight ({unit === "metric" ? "kg" : "lbs"})</label>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} style={inp} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Activity Level</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {activityLevels.map((lvl) => (
                <button key={lvl.multiplier} onClick={() => setActivity(lvl.multiplier)} style={{ padding: "10px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: activity === lvl.multiplier ? "#EEF2FF" : "white", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: "500", color: activity === lvl.multiplier ? "#4F46E5" : "#374151" }}>{lvl.label}</span>
                    <span style={{ fontSize: "12px", color: "#9CA3AF", marginLeft: "8px" }}>{lvl.desc}</span>
                  </div>
                  {activity === lvl.multiplier && <span style={{ color: "#4F46E5", fontSize: "14px" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {bmr > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {results.map((r) => (
              <div key={r.label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B" }}>{r.label}</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>{r.desc}</div>
                </div>
                <div style={{ fontSize: "28px", fontWeight: "500", color: r.color }}>{r.value} <span style={{ fontSize: "12px", color: "#9CA3AF" }}>kcal</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
