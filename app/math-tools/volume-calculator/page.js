"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UNITS = [
  { id: "mm",  label: "mm",    sym: "mm" },
  { id: "cm",  label: "cm",    sym: "cm" },
  { id: "m",   label: "m",     sym: "m"  },
  { id: "in",  label: "inches",sym: "in" },
  { id: "ft",  label: "feet",  sym: "ft" },
];

// 1 cubic unit → cubic cm (for litre conversion)
const TO_CM3 = { mm: 0.001, cm: 1, m: 1_000_000, in: 16.3871, ft: 28316.8 };

const SHAPES = [
  {
    id: "cube",
    label: "Cube",
    icon: "🧊",
    formula: "side³",
    fields: [{ id: "side", label: "Side" }],
  },
  {
    id: "box",
    label: "Rect. Box",
    icon: "📦",
    formula: "l × w × h",
    fields: [{ id: "length", label: "Length" }, { id: "width", label: "Width" }, { id: "height", label: "Height" }],
  },
  {
    id: "sphere",
    label: "Sphere",
    icon: "🔵",
    formula: "⁴⁄₃ × π × r³",
    fields: [{ id: "radius", label: "Radius" }],
  },
  {
    id: "cylinder",
    label: "Cylinder",
    icon: "🥫",
    formula: "π × r² × h",
    fields: [{ id: "radius", label: "Radius" }, { id: "height", label: "Height" }],
  },
  {
    id: "cone",
    label: "Cone",
    icon: "🍦",
    formula: "¹⁄₃ × π × r² × h",
    fields: [{ id: "radius", label: "Base Radius" }, { id: "height", label: "Height" }],
  },
  {
    id: "pyramid",
    label: "Sq. Pyramid",
    icon: "🔺",
    formula: "¹⁄₃ × base² × h",
    fields: [{ id: "base", label: "Base Side" }, { id: "height", label: "Height" }],
  },
  {
    id: "triprism",
    label: "Tri. Prism",
    icon: "📐",
    formula: "½ × b × h × l",
    fields: [{ id: "base", label: "Base" }, { id: "height", label: "Triangle Height" }, { id: "length", label: "Prism Length" }],
  },
];

function calcVolume(shapeId, vals) {
  const n = (k) => parseFloat(vals[k] || "0");
  switch (shapeId) {
    case "cube":     return n("side") ** 3;
    case "box":      return n("length") * n("width") * n("height");
    case "sphere":   return (4 / 3) * Math.PI * n("radius") ** 3;
    case "cylinder": return Math.PI * n("radius") ** 2 * n("height");
    case "cone":     return (1 / 3) * Math.PI * n("radius") ** 2 * n("height");
    case "pyramid":  return (1 / 3) * n("base") ** 2 * n("height");
    case "triprism": return 0.5 * n("base") * n("height") * n("length");
    default: return NaN;
  }
}

function fmtNum(n, precision = 4) {
  if (!isFinite(n) || isNaN(n) || n <= 0) return null;
  if (n >= 1e9)  return n.toExponential(4);
  if (n >= 1000) return n.toFixed(2);
  if (n >= 1)    return n.toFixed(precision);
  return n.toFixed(6);
}

// CSS shape illustrations
function ShapeIllustration({ shapeId }) {
  const wrap = { display: "flex", alignItems: "center", justifyContent: "center", height: "80px", marginBottom: "16px" };
  const shapes = {
    cube: (
      <div style={{ position: "relative", width: "60px", height: "60px" }}>
        <div style={{ position: "absolute", width: "44px", height: "44px", background: "#EEF2FF", border: "2px solid #4F46E5", borderRadius: "2px", bottom: 0, left: 0 }} />
        <div style={{ position: "absolute", width: "44px", height: "44px", background: "#C7D2FE", border: "2px solid #4F46E5", borderRadius: "2px", top: 0, left: "14px", opacity: 0.7 }} />
        <div style={{ position: "absolute", width: "14px", height: "44px", background: "#A5B4FC", border: "2px solid #4F46E5", borderRadius: "0 2px 0 0", top: "8px", right: 0, transform: "skewY(-45deg)", transformOrigin: "top right", opacity: 0.5 }} />
      </div>
    ),
    box: (
      <div style={{ position: "relative", width: "72px", height: "56px" }}>
        <div style={{ position: "absolute", width: "52px", height: "38px", background: "#EEF2FF", border: "2px solid #4F46E5", bottom: 0, left: 0 }} />
        <div style={{ position: "absolute", width: "52px", height: "28px", background: "#C7D2FE", border: "2px solid #4F46E5", top: 0, left: "18px", opacity: 0.7 }} />
      </div>
    ),
    sphere: <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #C7D2FE, #4F46E5)", border: "2px solid #3730A3" }} />,
    cylinder: (
      <div style={{ position: "relative", width: "54px", height: "68px" }}>
        <div style={{ width: "54px", height: "52px", background: "#EEF2FF", border: "2px solid #4F46E5", borderBottom: "none", position: "absolute", top: "8px" }} />
        <div style={{ width: "54px", height: "16px", borderRadius: "50%", background: "#C7D2FE", border: "2px solid #4F46E5", position: "absolute", top: 0 }} />
        <div style={{ width: "54px", height: "16px", borderRadius: "50%", background: "#A5B4FC", border: "2px solid #4F46E5", position: "absolute", bottom: 0 }} />
      </div>
    ),
    cone: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
        <div style={{ width: 0, height: 0, borderLeft: "30px solid transparent", borderRight: "30px solid transparent", borderBottom: "52px solid #4F46E5", opacity: 0.7 }} />
        <div style={{ width: "60px", height: "14px", borderRadius: "50%", background: "#C7D2FE", border: "2px solid #4F46E5" }} />
      </div>
    ),
    pyramid: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
        <div style={{ width: 0, height: 0, borderLeft: "32px solid transparent", borderRight: "32px solid transparent", borderBottom: "52px solid #4F46E5", opacity: 0.7 }} />
        <div style={{ width: "58px", height: "10px", background: "#C7D2FE", border: "2px solid #4F46E5", transform: "skewX(-10deg)" }} />
      </div>
    ),
    triprism: (
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px" }}>
        <div style={{ width: 0, height: 0, borderLeft: "0px solid transparent", borderRight: "42px solid transparent", borderBottom: "52px solid #4F46E5", opacity: 0.7 }} />
        <div style={{ width: "22px", height: "52px", background: "#C7D2FE", border: "2px solid #4F46E5", opacity: 0.8 }} />
      </div>
    ),
  };
  return <div style={wrap}>{shapes[shapeId]}</div>;
}

export default function VolumeCalculator() {
  const [shape, setShape] = useState("cube");
  const [unit, setUnit] = useState("cm");
  const [vals, setVals] = useState({});

  const shapeCfg = SHAPES.find((s) => s.id === shape);
  const volume = calcVolume(shape, vals);
  const volumeStr = fmtNum(volume);

  // Litre conversion only for cm and m
  const showLitres = (unit === "cm" || unit === "m") && volumeStr;
  const litres = showLitres ? volume * TO_CM3[unit] / 1000 : null;

  // Other volume unit conversions
  const extras = [];
  if (volumeStr) {
    const cm3 = volume * TO_CM3[unit];
    if (unit !== "cm") extras.push({ label: "cm³", val: fmtNum(cm3, 2) });
    if (unit !== "m")  extras.push({ label: "m³",  val: fmtNum(cm3 / TO_CM3["m"], 6) });
    if (unit !== "ft") extras.push({ label: "ft³", val: fmtNum(cm3 / TO_CM3["ft"], 4) });
    if (litres !== null) extras.push({ label: "Litres (L)", val: fmtNum(litres, 4) });
  }

  function setVal(key, val) { setVals((v) => ({ ...v, [key]: val })); }
  function handleShapeChange(id) { setShape(id); setVals({}); }

  const inputStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Volume Calculator" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>📦 Volume Calculator — All 3D Shapes</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate the volume of any 3D shape. Select a shape, enter dimensions and choose your unit.</p>
        </div>

        {/* Shape tabs */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
          {SHAPES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleShapeChange(s.id)}
              style={{ padding: "8px 13px", borderRadius: "10px", border: shape === s.id ? "none" : "0.5px solid #C7D2FE", background: shape === s.id ? "#4F46E5" : "white", color: shape === s.id ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
            >
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Left: inputs */}
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
            <ShapeIllustration shapeId={shape} />

            {/* Formula */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "8px 14px", marginBottom: "16px", textAlign: "center" }}>
              <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#4F46E5", fontWeight: "600" }}>V = {shapeCfg.formula}</span>
            </div>

            {/* Unit selector */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", display: "block", marginBottom: "5px" }}>Unit</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            </div>

            {/* Fields */}
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
          </div>

          {/* Right: result */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#4F46E5", borderRadius: "12px", padding: "24px", textAlign: "center", color: "white" }}>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", marginBottom: "8px" }}>Volume</div>
              <div style={{ fontSize: volumeStr ? "38px" : "28px", fontWeight: "800", lineHeight: 1.1, marginBottom: "4px" }}>
                {volumeStr ?? "—"}
              </div>
              {volumeStr && (
                <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>
                  {UNITS.find((u) => u.id === unit)?.sym}³
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
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#1E1B4B", fontFamily: "monospace" }}>{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* All formulas reference */}
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
