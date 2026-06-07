"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UNITS = [
  { id: "mm",    label: "mm",    sym: "mm" },
  { id: "cm",    label: "cm",    sym: "cm" },
  { id: "m",     label: "m",     sym: "m"  },
  { id: "km",    label: "km",    sym: "km" },
  { id: "in",    label: "inches",sym: "in" },
  { id: "ft",    label: "feet",  sym: "ft" },
  { id: "yd",    label: "yards", sym: "yd" },
];

// Convert area to m² for cross-unit display
const TO_M2 = { mm: 1e-6, cm: 1e-4, m: 1, km: 1e6, in: 0.00064516, ft: 0.092903, yd: 0.836127 };

const SHAPES = [
  { id: "square",      label: "Square",      icon: "⬛", formula: "side²",                  fields: [{ id: "side", label: "Side" }] },
  { id: "rectangle",   label: "Rectangle",   icon: "▬",  formula: "length × width",          fields: [{ id: "length", label: "Length" }, { id: "width", label: "Width" }] },
  { id: "triangle",    label: "Triangle",    icon: "▲",  formula: "base × height ÷ 2",       fields: [{ id: "base", label: "Base" }, { id: "height", label: "Height" }, { id: "a", label: "Side a (Heron)" }, { id: "b", label: "Side b (Heron)" }, { id: "c", label: "Side c (Heron)" }] },
  { id: "circle",      label: "Circle",      icon: "⭕", formula: "π × radius²",             fields: [{ id: "radius", label: "Radius" }] },
  { id: "trapezoid",   label: "Trapezoid",   icon: "⏢",  formula: "(a + b) ÷ 2 × height",   fields: [{ id: "a", label: "Side a (parallel)" }, { id: "b", label: "Side b (parallel)" }, { id: "height", label: "Height" }] },
  { id: "parallelogram",label:"Parallelogram",icon: "▱", formula: "base × height",           fields: [{ id: "base", label: "Base" }, { id: "height", label: "Height" }] },
  { id: "rhombus",     label: "Rhombus",     icon: "◆",  formula: "d₁ × d₂ ÷ 2",           fields: [{ id: "d1", label: "Diagonal 1" }, { id: "d2", label: "Diagonal 2" }] },
  { id: "ellipse",     label: "Ellipse",     icon: "⬭",  formula: "π × a × b",              fields: [{ id: "a", label: "Semi-axis a" }, { id: "b", label: "Semi-axis b" }] },
];

function calcArea(shape, vals) {
  const n = (k) => parseFloat(vals[k] || "0");
  switch (shape) {
    case "square":       return n("side") ** 2;
    case "rectangle":    return n("length") * n("width");
    case "triangle": {
      const bh = n("base") * n("height") / 2;
      if (bh > 0) return bh;
      // Heron's
      const [a, b, c] = [n("a"), n("b"), n("c")];
      if (a > 0 && b > 0 && c > 0) {
        const s = (a + b + c) / 2;
        const area2 = s * (s - a) * (s - b) * (s - c);
        return area2 > 0 ? Math.sqrt(area2) : NaN;
      }
      return NaN;
    }
    case "circle":       return Math.PI * n("radius") ** 2;
    case "trapezoid":    return (n("a") + n("b")) / 2 * n("height");
    case "parallelogram":return n("base") * n("height");
    case "rhombus":      return n("d1") * n("d2") / 2;
    case "ellipse":      return Math.PI * n("a") * n("b");
    default: return NaN;
  }
}

function fmtNum(n) {
  if (!isFinite(n) || isNaN(n) || n <= 0) return null;
  if (n >= 1e9)  return n.toExponential(4);
  if (n >= 1000) return n.toFixed(2);
  if (n >= 1)    return n.toFixed(4);
  return n.toFixed(6);
}

// CSS shape illustrations
function ShapeIllustration({ shapeId }) {
  const base = { display: "flex", alignItems: "center", justifyContent: "center", height: "80px", marginBottom: "16px" };
  const shapes = {
    square:       <div style={{ width: "64px", height: "64px", background: "#EEF2FF", border: "2px solid #4F46E5", borderRadius: "2px" }} />,
    rectangle:    <div style={{ width: "90px", height: "50px", background: "#EEF2FF", border: "2px solid #4F46E5", borderRadius: "2px" }} />,
    triangle:     <div style={{ width: 0, height: 0, borderLeft: "38px solid transparent", borderRight: "38px solid transparent", borderBottom: "66px solid #4F46E5", opacity: 0.7 }} />,
    circle:       <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#EEF2FF", border: "2px solid #4F46E5" }} />,
    trapezoid:    <div style={{ width: "80px", height: "50px", background: "#EEF2FF", border: "2px solid #4F46E5", clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)", border: "none", outline: "2px solid #4F46E5" }} />,
    parallelogram:<div style={{ width: "80px", height: "50px", background: "#EEF2FF", transform: "skewX(-20deg)", border: "2px solid #4F46E5", borderRadius: "2px" }} />,
    rhombus:      <div style={{ width: "52px", height: "52px", background: "#EEF2FF", border: "2px solid #4F46E5", transform: "rotate(45deg)", borderRadius: "2px" }} />,
    ellipse:      <div style={{ width: "90px", height: "50px", borderRadius: "50%", background: "#EEF2FF", border: "2px solid #4F46E5" }} />,
  };
  return <div style={base}>{shapes[shapeId]}</div>;
}

export default function AreaCalculator() {
  const [shape, setShape] = useState("square");
  const [unit, setUnit] = useState("m");
  const [vals, setVals] = useState({});

  const shapeCfg = SHAPES.find((s) => s.id === shape);
  const area = calcArea(shape, vals);
  const areaStr = fmtNum(area);

  const areaM2 = areaStr ? area * TO_M2[unit] : null;

  function setVal(key, val) { setVals((v) => ({ ...v, [key]: val })); }
  function handleShapeChange(id) { setShape(id); setVals({}); }

  const inputStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  // Extra conversions for result
  const extras = [];
  if (areaM2 !== null) {
    if (unit !== "cm") extras.push({ label: "cm²", val: fmtNum(areaM2 / TO_M2["cm"]) });
    if (unit !== "m")  extras.push({ label: "m²",  val: fmtNum(areaM2) });
    if (unit !== "ft") extras.push({ label: "ft²", val: fmtNum(areaM2 / TO_M2["ft"]) });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Area Calculator" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>📐 Area Calculator — All Shapes</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate the area of any 2D shape. Select a shape, enter dimensions and choose your unit.</p>
        </div>

        {/* Shape tabs */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
          {SHAPES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleShapeChange(s.id)}
              style={{ padding: "8px 14px", borderRadius: "10px", border: shape === s.id ? "none" : "0.5px solid #C7D2FE", background: shape === s.id ? "#4F46E5" : "white", color: shape === s.id ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
            >
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Left: inputs */}
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
            <ShapeIllustration shapeId={shape} />

            {/* Formula badge */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "8px 14px", marginBottom: "16px", textAlign: "center" }}>
              <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#4F46E5", fontWeight: "600" }}>Area = {shapeCfg.formula}</span>
            </div>

            {/* Unit selector */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", display: "block", marginBottom: "5px" }}>Unit</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            </div>

            {/* Shape fields */}
            {shapeCfg.fields.map((f) => (
              <div key={f.id} style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", display: "block", marginBottom: "5px" }}>
                  {f.label} ({UNITS.find((u) => u.id === unit)?.sym})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={vals[f.id] || ""}
                  onChange={(e) => setVal(f.id, e.target.value)}
                  placeholder="0"
                  style={inputStyle}
                />
              </div>
            ))}

            {shape === "triangle" && (
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "-4px", marginBottom: "4px" }}>
                Fill base + height OR all three sides (Heron's formula)
              </div>
            )}
          </div>

          {/* Right: result */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#4F46E5", borderRadius: "12px", padding: "24px", textAlign: "center", color: "white" }}>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", marginBottom: "8px" }}>Area</div>
              <div style={{ fontSize: areaStr ? "40px" : "28px", fontWeight: "800", lineHeight: 1.1, marginBottom: "4px" }}>
                {areaStr ?? "—"}
              </div>
              {areaStr && (
                <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>
                  {UNITS.find((u) => u.id === unit)?.sym}²
                </div>
              )}
            </div>

            {/* Conversions */}
            {extras.length > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>Also equals</div>
                {extras.map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#6B7280" }}>{label}</span>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "#1E1B4B", fontFamily: "monospace" }}>{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Shape reference */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", flex: 1 }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>All formulas</div>
              {SHAPES.map((s) => (
                <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "7px", padding: shape === s.id ? "4px 8px" : "0 8px", borderRadius: "6px", background: shape === s.id ? "#EEF2FF" : "transparent" }}>
                  <span style={{ fontSize: "12px", color: shape === s.id ? "#4F46E5" : "#6B7280", fontWeight: shape === s.id ? "600" : "400" }}>{s.icon} {s.label}</span>
                  <span style={{ fontSize: "11px", fontFamily: "monospace", color: shape === s.id ? "#4F46E5" : "#9CA3AF" }}>{s.formula}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
