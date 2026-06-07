"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PRESETS = [
  { name: "Sunset", type: "linear", angle: 135, stops: [{ color: "#FF512F", pos: 0 }, { color: "#F09819", pos: 100 }] },
  { name: "Ocean", type: "linear", angle: 135, stops: [{ color: "#2196F3", pos: 0 }, { color: "#21CBF3", pos: 100 }] },
  { name: "Forest", type: "linear", angle: 135, stops: [{ color: "#134E5E", pos: 0 }, { color: "#71B280", pos: 100 }] },
  { name: "Fire", type: "linear", angle: 90, stops: [{ color: "#f12711", pos: 0 }, { color: "#f5af19", pos: 100 }] },
  { name: "Purple", type: "linear", angle: 135, stops: [{ color: "#667eea", pos: 0 }, { color: "#764ba2", pos: 100 }] },
  { name: "Sky", type: "radial", angle: 90, stops: [{ color: "#a1c4fd", pos: 0 }, { color: "#c2e9fb", pos: 100 }] },
];

function buildCss(type, angle, stops) {
  const stopsStr = stops.map((s) => `${s.color} ${s.pos}%`).join(", ");
  if (type === "linear") return `linear-gradient(${angle}deg, ${stopsStr})`;
  return `radial-gradient(circle, ${stopsStr})`;
}

export default function CssGradient() {
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState([
    { color: "#667eea", pos: 0 },
    { color: "#764ba2", pos: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const gradient = buildCss(type, angle, stops);
  const cssOutput = `background: ${gradient};`;

  function updateStop(idx, field, val) {
    setStops((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s));
  }

  function addStop() {
    if (stops.length >= 5) return;
    const mid = Math.round((stops[stops.length - 1].pos + (stops[stops.length - 2]?.pos ?? 0)) / 2);
    setStops((prev) => [...prev, { color: "#a78bfa", pos: Math.min(99, mid + 10) }]);
  }

  function removeStop(idx) {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== idx));
  }

  function applyPreset(p) {
    setType(p.type);
    setAngle(p.angle);
    setStops(p.stops.map((s) => ({ ...s })));
  }

  function copy() {
    navigator.clipboard.writeText(cssOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const typeBtn = (t) => ({
    padding: "9px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500",
    border: type === t ? "none" : "0.5px solid #C7D2FE",
    background: type === t ? "#4F46E5" : "white",
    color: type === t ? "white" : "#4F46E5",
  });

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "CSS Gradient Generator" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>CSS Gradient Generator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Build linear or radial gradients visually and copy the CSS output.</p>
        </div>

        {/* Live preview */}
        <div style={{ height: "160px", borderRadius: "12px", background: gradient, marginBottom: "20px", border: "0.5px solid #E0E7FF", boxShadow: "0 2px 12px rgba(79,70,229,0.12)", transition: "background 0.2s" }} />

        {/* Presets */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "14px" }}>
          <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Presets</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {PRESETS.map((p) => (
              <button key={p.name} onClick={() => applyPreset(p)} style={{
                padding: "0", borderRadius: "8px", border: "0.5px solid #E0E7FF", cursor: "pointer", overflow: "hidden", width: "64px", height: "36px",
                background: buildCss(p.type, p.angle, p.stops), position: "relative",
              }}>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: "white", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "14px" }}>
          {/* Type toggle */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
            <button onClick={() => setType("linear")} style={typeBtn("linear")}>Linear</button>
            <button onClick={() => setType("radial")} style={typeBtn("radial")}>Radial</button>
          </div>

          {/* Angle */}
          {type === "linear" && (
            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Angle</label>
                <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#4F46E5", fontWeight: "600" }}>{angle}°</span>
              </div>
              <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#4F46E5", cursor: "pointer" }} />
            </div>
          )}

          {/* Color stops */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Color Stops</label>
              <button onClick={addStop} disabled={stops.length >= 5} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: stops.length >= 5 ? "#F3F4F6" : "#EEF2FF", color: stops.length >= 5 ? "#9CA3AF" : "#4F46E5", cursor: stops.length >= 5 ? "default" : "pointer" }}>
                + Add stop
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {stops.map((stop, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input type="color" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)}
                    style={{ width: "44px", height: "36px", border: "0.5px solid #C7D2FE", borderRadius: "6px", cursor: "pointer", padding: "2px" }} />
                  <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#374151", minWidth: "72px" }}>{stop.color}</span>
                  <input type="range" min="0" max="100" value={stop.pos} onChange={(e) => updateStop(i, "pos", Number(e.target.value))}
                    style={{ flex: 1, accentColor: stop.color, cursor: "pointer" }} />
                  <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#6B7280", minWidth: "38px", textAlign: "right" }}>{stop.pos}%</span>
                  <button onClick={() => removeStop(i)} disabled={stops.length <= 2}
                    style={{ fontSize: "16px", color: stops.length <= 2 ? "#D1D5DB" : "#9CA3AF", background: "none", border: "none", cursor: stops.length <= 2 ? "default" : "pointer", padding: "0 4px", lineHeight: 1 }}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS output */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Generated CSS</span>
            <button onClick={copy} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied ? "#DCFCE7" : "#EEF2FF", color: copied ? "#15803D" : "#4F46E5", cursor: "pointer" }}>
              {copied ? "Copied!" : "Copy CSS"}
            </button>
          </div>
          <div style={{ padding: "16px 20px", fontFamily: "monospace", fontSize: "14px", color: "#1E1B4B", wordBreak: "break-all", lineHeight: "1.7" }}>
            <span style={{ color: "#6366F1" }}>background</span>
            <span style={{ color: "#374151" }}>: </span>
            <span style={{ color: "#4F46E5" }}>{gradient}</span>
            <span style={{ color: "#374151" }}>;</span>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
