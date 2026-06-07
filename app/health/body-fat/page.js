"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CATEGORIES = {
  male: [
    { label: "Essential Fat", min: 0, max: 5, color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
    { label: "Athletes", min: 6, max: 13, color: "#10B981", bg: "#ECFDF5", border: "#6EE7B7" },
    { label: "Fitness", min: 14, max: 17, color: "#10B981", bg: "#ECFDF5", border: "#6EE7B7" },
    { label: "Average", min: 18, max: 24, color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
    { label: "Obese", min: 25, max: Infinity, color: "#EF4444", bg: "#FFF5F5", border: "#FCA5A5" },
  ],
  female: [
    { label: "Essential Fat", min: 0, max: 13, color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
    { label: "Athletes", min: 14, max: 20, color: "#10B981", bg: "#ECFDF5", border: "#6EE7B7" },
    { label: "Fitness", min: 21, max: 24, color: "#10B981", bg: "#ECFDF5", border: "#6EE7B7" },
    { label: "Average", min: 25, max: 31, color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
    { label: "Obese", min: 32, max: Infinity, color: "#EF4444", bg: "#FFF5F5", border: "#FCA5A5" },
  ],
};

function getCategory(bf, gender) {
  return CATEGORIES[gender].find((c) => bf >= c.min && bf <= c.max) ?? CATEGORIES[gender].at(-1);
}

function calcBodyFat(gender, height, neck, waist, hip) {
  if (!height || !neck || !waist) return null;
  if (gender === "female" && !hip) return null;
  if (gender === "male") {
    const bf = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    return bf;
  }
  const bf = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  return bf;
}

export default function BodyFat() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("178");
  const [neck, setNeck] = useState("38");
  const [waist, setWaist] = useState("85");
  const [hip, setHip] = useState("95");

  const h = parseFloat(height);
  const n = parseFloat(neck);
  const w = parseFloat(waist);
  const hp = parseFloat(hip);

  const bf = calcBodyFat(gender, h, n, w, gender === "female" ? hp : 1);
  const bfRounded = bf !== null && !isNaN(bf) && bf > 0 ? Math.round(bf * 10) / 10 : null;
  const category = bfRounded !== null ? getCategory(bfRounded, gender) : null;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  const gaugeWidth = bfRounded !== null ? Math.min(Math.max(bfRounded / (gender === "male" ? 40 : 50) * 100, 2), 100) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health", href: "/health" }, { label: "Body Fat Calculator" }]} />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Body Fat Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Uses the US Navy method — measures neck, waist and hip circumferences for an accurate estimate.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Gender toggle */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Gender</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {["male", "female"].map((g) => (
                <button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: gender === g ? "#4F46E5" : "white", color: gender === g ? "white" : "#374151", fontSize: "14px", cursor: "pointer", fontWeight: "500", textTransform: "capitalize" }}>
                  {g === "male" ? "♂ Male" : "♀ Female"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Height (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="178" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Neck circumference (cm)</label>
              <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="38" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Waist circumference (cm)</label>
              <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="85" style={inp} />
            </div>
            {gender === "female" && (
              <div>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Hip circumference (cm)</label>
                <input type="number" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="95" style={inp} />
              </div>
            )}
          </div>

          <div style={{ marginTop: "14px", padding: "12px 14px", background: "#EEF2FF", borderRadius: "8px", fontSize: "12px", color: "#4F46E5" }}>
            <strong>Measuring tip:</strong> Waist = narrowest point (naval for men) · Neck = just below larynx · Hip = widest point (women only)
          </div>
        </div>

        {bfRounded !== null && category && (
          <>
            {/* Main result */}
            <div style={{ background: category.bg, border: `0.5px solid ${category.border}`, borderRadius: "12px", padding: "28px 24px", marginBottom: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: "500", color: category.color, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{category.label}</div>
              <div style={{ fontSize: "64px", fontWeight: "700", color: category.color, lineHeight: 1 }}>{bfRounded}<span style={{ fontSize: "28px" }}>%</span></div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "8px" }}>Body fat (US Navy method)</div>
              {/* Gauge bar */}
              <div style={{ marginTop: "16px", height: "8px", borderRadius: "4px", background: "#E5E7EB", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${gaugeWidth}%`, background: category.color, borderRadius: "4px", transition: "width 0.4s ease" }} />
              </div>
            </div>

            {/* Category table */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>
                Body Fat Categories — {gender === "male" ? "Men" : "Women"}
              </div>
              {CATEGORIES[gender].map((cat) => {
                const isActive = cat.label === category.label;
                return (
                  <div key={cat.label} style={{ padding: "12px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center", background: isActive ? cat.bg : "white" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "13px", fontWeight: isActive ? "600" : "400", color: isActive ? cat.color : "#374151" }}>{cat.label}</span>
                      {isActive && <span style={{ fontSize: "11px", background: cat.color, color: "white", borderRadius: "4px", padding: "1px 6px" }}>You</span>}
                    </div>
                    <span style={{ fontSize: "13px", color: "#6B7280", fontFamily: "monospace" }}>
                      {cat.max === Infinity ? `${cat.min}%+` : `${cat.min}–${cat.max}%`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Formula note */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 18px", marginTop: "14px", fontSize: "12px", color: "#374151" }}>
              <strong style={{ color: "#4F46E5" }}>Formula ({gender === "male" ? "men" : "women"}):</strong><br />
              {gender === "male"
                ? "86.010 × log₁₀(waist − neck) − 70.041 × log₁₀(height) + 36.76"
                : "163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387"}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
