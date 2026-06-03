"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function calcIdealWeight(heightCm, gender) {
  const h = heightCm / 2.54; // inches
  const excess = h - 60;
  if (h < 60) return null; // formulas unreliable below 5ft

  const male = gender === "male";

  const devine = male ? 50 + 2.3 * excess : 45.5 + 2.3 * excess;
  const robinson = male ? 52 + 1.9 * excess : 49 + 1.7 * excess;
  const miller = male ? 56.2 + 1.41 * excess : 53.1 + 1.36 * excess;
  const hamwi = (male ? 106 + 6 * excess : 100 + 5 * excess) / 2.20462;

  return { devine, robinson, miller, hamwi };
}

function bmiRange(heightCm) {
  const hm = heightCm / 100;
  return { min: 18.5 * hm * hm, max: 24.9 * hm * hm };
}

function fmt(n) { return n.toFixed(1); }

const formulas = [
  { key: "devine", name: "Devine Formula", year: "1974", desc: "Most widely used in clinical settings" },
  { key: "robinson", name: "Robinson Formula", year: "1983", desc: "Updated adjustment per inch" },
  { key: "miller", name: "Miller Formula", year: "1983", desc: "Lower increment, smaller frame assumption" },
  { key: "hamwi", name: "Hamwi Formula", year: "1964", desc: "Older formula still used by some dietitians" },
];

export default function IdealWeight() {
  const [heightCm, setHeightCm] = useState("170");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");

  const hVal = parseFloat(heightCm) || 0;
  const hCm = unit === "metric" ? hVal : hVal * 2.54;
  const results = hCm > 0 ? calcIdealWeight(hCm, gender) : null;
  const bmi = hCm > 0 ? bmiRange(hCm) : null;

  const toDisplay = (kg) => unit === "metric" ? `${fmt(kg)} kg` : `${fmt(kg * 2.20462)} lbs`;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health", href: "/health" }, { label: "Ideal Weight Calculator" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Ideal Weight Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your ideal weight using 4 established medical formulas.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {["metric", "imperial"].map((u) => (
              <button key={u} onClick={() => setUnit(u)} style={{ padding: "7px 16px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: unit === u ? "#4F46E5" : "white", color: unit === u ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500", textTransform: "capitalize" }}>
                {u === "metric" ? "Metric (cm)" : "Imperial (inches)"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>
                Height ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder={unit === "metric" ? "170" : "67"}
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }}
              />
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
          </div>
        </div>

        {results && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              {formulas.map((f) => (
                <div key={f.key} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>{f.name}</div>
                    <span style={{ fontSize: "10px", background: "#EEF2FF", color: "#6366F1", padding: "2px 6px", borderRadius: "4px" }}>{f.year}</span>
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: "500", color: "#4F46E5", marginBottom: "4px" }}>{toDisplay(results[f.key])}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{f.desc}</div>
                </div>
              ))}
            </div>

            {bmi && (
              <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>Healthy BMI Range (18.5–24.9)</div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#6B7280" }}>Minimum</div>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: "#10B981" }}>{toDisplay(bmi.min)}</div>
                  </div>
                  <div style={{ borderLeft: "1px solid #C7D2FE", margin: "0 8px" }} />
                  <div>
                    <div style={{ fontSize: "11px", color: "#6B7280" }}>Maximum</div>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: "#F59E0B" }}>{toDisplay(bmi.max)}</div>
                  </div>
                </div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "10px" }}>Based on BMI 18.5–24.9 for your height. These are general guidelines only.</div>
              </div>
            )}
          </>
        )}

        {results === null && hCm > 0 && hCm < 152 && (
          <div style={{ background: "#FFF5F5", border: "0.5px solid #FCA5A5", borderRadius: "12px", padding: "16px", fontSize: "13px", color: "#EF4444" }}>
            These formulas are designed for heights of 5ft (152cm) and above.
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
