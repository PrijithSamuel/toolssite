"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DIGIT_COLORS = [
  { name: "Black",  digit: 0, hex: "#1a1a1a", textColor: "#ffffff" },
  { name: "Brown",  digit: 1, hex: "#8B4513", textColor: "#ffffff" },
  { name: "Red",    digit: 2, hex: "#EF4444", textColor: "#ffffff" },
  { name: "Orange", digit: 3, hex: "#F97316", textColor: "#ffffff" },
  { name: "Yellow", digit: 4, hex: "#EAB308", textColor: "#1a1a1a" },
  { name: "Green",  digit: 5, hex: "#22C55E", textColor: "#ffffff" },
  { name: "Blue",   digit: 6, hex: "#3B82F6", textColor: "#ffffff" },
  { name: "Violet", digit: 7, hex: "#8B5CF6", textColor: "#ffffff" },
  { name: "Grey",   digit: 8, hex: "#6B7280", textColor: "#ffffff" },
  { name: "White",  digit: 9, hex: "#F9FAFB", textColor: "#1a1a1a" },
];

const MULTIPLIER_COLORS = [
  { name: "Black",  mult: 1,      label: "×1",       hex: "#1a1a1a", textColor: "#ffffff" },
  { name: "Brown",  mult: 10,     label: "×10",      hex: "#8B4513", textColor: "#ffffff" },
  { name: "Red",    mult: 100,    label: "×100",     hex: "#EF4444", textColor: "#ffffff" },
  { name: "Orange", mult: 1000,   label: "×1k",      hex: "#F97316", textColor: "#ffffff" },
  { name: "Yellow", mult: 10000,  label: "×10k",     hex: "#EAB308", textColor: "#1a1a1a" },
  { name: "Gold",   mult: 0.1,    label: "×0.1",     hex: "#D4AF37", textColor: "#1a1a1a" },
  { name: "Silver", mult: 0.01,   label: "×0.01",    hex: "#C0C0C0", textColor: "#1a1a1a" },
];

const TOLERANCE_COLORS = [
  { name: "Gold",   tol: "±5%",  hex: "#D4AF37", textColor: "#1a1a1a" },
  { name: "Silver", tol: "±10%", hex: "#C0C0C0", textColor: "#1a1a1a" },
  { name: "Brown",  tol: "±1%",  hex: "#8B4513", textColor: "#ffffff" },
  { name: "Red",    tol: "±2%",  hex: "#EF4444", textColor: "#ffffff" },
];

function fmtResistance(ohms) {
  if (ohms >= 1e6)  return `${parseFloat((ohms / 1e6).toPrecision(3))} MΩ`;
  if (ohms >= 1e3)  return `${parseFloat((ohms / 1e3).toPrecision(3))} kΩ`;
  return `${parseFloat(ohms.toPrecision(3))} Ω`;
}

function colorSwatch(hex, size = 20) {
  return <span style={{ display: "inline-block", width: size, height: size, borderRadius: "3px", background: hex, border: "0.5px solid rgba(0,0,0,0.15)", verticalAlign: "middle", marginRight: "6px", flexShrink: 0 }} />;
}

export default function ResistorColor() {
  const [b1, setB1] = useState("Brown");
  const [b2, setB2] = useState("Black");
  const [b3, setB3] = useState("Red");
  const [b4, setB4] = useState("Gold");

  const band1 = DIGIT_COLORS.find((c) => c.name === b1);
  const band2 = DIGIT_COLORS.find((c) => c.name === b2);
  const band3 = MULTIPLIER_COLORS.find((c) => c.name === b3);
  const band4 = TOLERANCE_COLORS.find((c) => c.name === b4);

  const ohms = band1 && band2 && band3 ? (band1.digit * 10 + band2.digit) * band3.mult : null;
  const selStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer", width: "100%" };

  const bands = [
    { color: band1?.hex ?? "#ccc", label: b1 },
    { color: band2?.hex ?? "#ccc", label: b2 },
    { color: band3?.hex ?? "#ccc", label: b3 },
    { color: band4?.hex ?? "#ccc", label: b4 },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Engineering", href: "/engineering" }, { label: "Resistor Color Code" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Resistor Color Code Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Decode 4-band resistor color codes to find resistance and tolerance.</p>
        </div>

        {/* Visual resistor */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "28px 24px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Lead left */}
          <div style={{ width: "50px", height: "3px", background: "#9CA3AF" }} />
          {/* Body */}
          <div style={{ position: "relative", display: "flex", alignItems: "stretch", height: "48px", borderRadius: "10px", overflow: "hidden", background: "#D4B896", border: "0.5px solid #B8956A", minWidth: "200px" }}>
            {bands.map(({ color }, i) => (
              <div key={i} style={{ width: "16%", background: color, flexShrink: 0, margin: i === 3 ? "0 0 0 auto" : "0 8% 0 0" }} />
            ))}
          </div>
          {/* Lead right */}
          <div style={{ width: "50px", height: "3px", background: "#9CA3AF" }} />
        </div>

        {/* Band labels */}
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "16px", flexWrap: "wrap" }}>
          {bands.map(({ color, label }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "6px", background: "white", border: "0.5px solid #E0E7FF", fontSize: "12px" }}>
              <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "2px", background: color, border: "0.5px solid rgba(0,0,0,0.15)", flexShrink: 0 }} />
              <span style={{ color: "#374151" }}>Band {i + 1}: {label}</span>
            </div>
          ))}
        </div>

        {/* Selectors */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {/* Band 1 */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Band 1 — 1st Digit</label>
              <select value={b1} onChange={(e) => setB1(e.target.value)} style={selStyle}>
                {DIGIT_COLORS.map((c) => <option key={c.name} value={c.name}>{c.name} — {c.digit}</option>)}
              </select>
            </div>
            {/* Band 2 */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Band 2 — 2nd Digit</label>
              <select value={b2} onChange={(e) => setB2(e.target.value)} style={selStyle}>
                {DIGIT_COLORS.map((c) => <option key={c.name} value={c.name}>{c.name} — {c.digit}</option>)}
              </select>
            </div>
            {/* Band 3 */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Band 3 — Multiplier</label>
              <select value={b3} onChange={(e) => setB3(e.target.value)} style={selStyle}>
                {MULTIPLIER_COLORS.map((c) => <option key={c.name} value={c.name}>{c.name} — {c.label}</option>)}
              </select>
            </div>
            {/* Band 4 */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Band 4 — Tolerance</label>
              <select value={b4} onChange={(e) => setB4(e.target.value)} style={selStyle}>
                {TOLERANCE_COLORS.map((c) => <option key={c.name} value={c.name}>{c.name} — {c.tol}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Result */}
        {ohms !== null && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Resistance</div>
            <div style={{ fontSize: "48px", fontWeight: "700", color: "#4F46E5", lineHeight: 1 }}>{fmtResistance(ohms)}</div>
            <div style={{ fontSize: "18px", color: "#6B7280", marginTop: "8px" }}>{band4?.tol ?? ""}</div>
            <div style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "4px" }}>
              {(() => {
                const tolPct = parseFloat((band4?.tol ?? "±0%").replace(/[^0-9.]/g, "")) || 0;
                return `${fmtResistance(ohms * (1 - tolPct / 100))} – ${fmtResistance(ohms * (1 + tolPct / 100))}`;
              })()}
            </div>
          </div>
        )}

        {/* Color reference table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>
            Color Code Reference
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#F8F9FF" }}>
                {["Color", "Digit", "Multiplier", "Tolerance"].map((h) => (
                  <th key={h} style={{ padding: "8px 14px", textAlign: "left", color: "#6B7280", fontWeight: "600", borderBottom: "0.5px solid #E0E7FF" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIGIT_COLORS.map((dc) => {
                const mc = MULTIPLIER_COLORS.find((m) => m.name === dc.name);
                const tc = TOLERANCE_COLORS.find((t) => t.name === dc.name);
                return (
                  <tr key={dc.name} style={{ borderBottom: "0.5px solid #F3F4F6" }}>
                    <td style={{ padding: "7px 14px", display: "flex", alignItems: "center" }}>
                      {colorSwatch(dc.hex)}
                      <span style={{ color: "#374151", fontWeight: "500" }}>{dc.name}</span>
                    </td>
                    <td style={{ padding: "7px 14px", color: "#374151" }}>{dc.digit}</td>
                    <td style={{ padding: "7px 14px", color: "#374151" }}>{mc?.label ?? "—"}</td>
                    <td style={{ padding: "7px 14px", color: "#374151" }}>{tc?.tol ?? "—"}</td>
                  </tr>
                );
              })}
              {/* Gold and Silver rows */}
              {[
                { name: "Gold",   hex: "#D4AF37", mult: "×0.1",  tol: "±5%"  },
                { name: "Silver", hex: "#C0C0C0", mult: "×0.01", tol: "±10%" },
              ].map((r) => (
                <tr key={r.name} style={{ borderBottom: "0.5px solid #F3F4F6" }}>
                  <td style={{ padding: "7px 14px", display: "flex", alignItems: "center" }}>
                    {colorSwatch(r.hex)}
                    <span style={{ color: "#374151", fontWeight: "500" }}>{r.name}</span>
                  </td>
                  <td style={{ padding: "7px 14px", color: "#9CA3AF" }}>—</td>
                  <td style={{ padding: "7px 14px", color: "#374151" }}>{r.mult}</td>
                  <td style={{ padding: "7px 14px", color: "#374151" }}>{r.tol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
}
