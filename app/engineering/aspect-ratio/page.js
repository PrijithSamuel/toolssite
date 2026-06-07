"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function simplify(w, h) {
  const d = gcd(Math.round(w), Math.round(h));
  return [Math.round(w) / d, Math.round(h) / d];
}

const PRESETS = [
  { label: "16:9",  w: 16, h: 9  },
  { label: "4:3",   w: 4,  h: 3  },
  { label: "1:1",   w: 1,  h: 1  },
  { label: "21:9",  w: 21, h: 9  },
  { label: "9:16",  w: 9,  h: 16 },
  { label: "3:2",   w: 3,  h: 2  },
  { label: "5:4",   w: 5,  h: 4  },
];

export default function AspectRatio() {
  const [mode, setMode] = useState("pixels"); // pixels | ratio
  // Mode 1 – pixels
  const [px_w, setPxW] = useState("1920");
  const [px_h, setPxH] = useState("1080");
  // Mode 2 – ratio
  const [ratioW, setRatioW] = useState("16");
  const [ratioH, setRatioH] = useState("9");
  const [knownDim, setKnownDim] = useState("width");
  const [knownVal, setKnownVal] = useState("1920");

  /* ---------- Mode 1 results ---------- */
  const pw = parseFloat(px_w), ph = parseFloat(px_h);
  const [sw, sh] = (pw > 0 && ph > 0) ? simplify(pw, ph) : [null, null];
  const decRatio1 = (pw > 0 && ph > 0) ? (pw / ph).toFixed(4) : null;

  /* ---------- Mode 2 results ---------- */
  const rw = parseFloat(ratioW), rh = parseFloat(ratioH);
  const kv = parseFloat(knownVal);
  let calcVal = null;
  if (rw > 0 && rh > 0 && kv > 0) {
    calcVal = knownDim === "width" ? Math.round(kv * rh / rw) : Math.round(kv * rw / rh);
  }
  const decRatio2 = (rw > 0 && rh > 0) ? (rw / rh).toFixed(4) : null;

  function applyPreset(w, h) {
    if (mode === "pixels") { setPxW(String(w * 120)); setPxH(String(h * 120)); }
    else { setRatioW(String(w)); setRatioH(String(h)); }
  }

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };
  const btnA = { padding: "9px 22px", borderRadius: "8px", border: "none", background: "#4F46E5", color: "white", fontSize: "14px", fontWeight: "500", cursor: "pointer" };
  const btnI = { padding: "9px 22px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "14px", fontWeight: "500", cursor: "pointer" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Engineering", href: "/engineering" }, { label: "Aspect Ratio Calculator" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Aspect Ratio Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Simplify pixel dimensions to a ratio, or calculate a missing dimension from a known ratio.</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => setMode("pixels")} style={mode === "pixels" ? btnA : btnI}>Pixels → Ratio</button>
          <button onClick={() => setMode("ratio")} style={mode === "ratio" ? btnA : btnI}>Ratio → Dimension</button>
        </div>

        {/* Presets */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {PRESETS.map(({ label, w, h }) => (
            <button key={label} onClick={() => applyPreset(w, h)} style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "#EEF2FF", color: "#4F46E5", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          {mode === "pixels" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Width (px)</label>
                <input type="number" value={px_w} onChange={(e) => setPxW(e.target.value)} placeholder="1920" min="1" style={inp} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Height (px)</label>
                <input type="number" value={px_h} onChange={(e) => setPxH(e.target.value)} placeholder="1080" min="1" style={inp} />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "8px", alignItems: "center" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Ratio W</label>
                  <input type="number" value={ratioW} onChange={(e) => setRatioW(e.target.value)} placeholder="16" min="1" style={inp} />
                </div>
                <span style={{ fontSize: "20px", color: "#9CA3AF", fontWeight: "600", marginTop: "18px" }}>:</span>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Ratio H</label>
                  <input type="number" value={ratioH} onChange={(e) => setRatioH(e.target.value)} placeholder="9" min="1" style={inp} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Known dimension</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["width", "height"].map((d) => (
                    <button key={d} onClick={() => setKnownDim(d)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: knownDim === d ? "#4F46E5" : "white", color: knownDim === d ? "white" : "#374151", fontSize: "13px", fontWeight: "500", cursor: "pointer", textTransform: "capitalize" }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                  {knownDim === "width" ? "Width" : "Height"} (px)
                </label>
                <input type="number" value={knownVal} onChange={(e) => setKnownVal(e.target.value)} placeholder="1920" min="1" style={inp} />
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {mode === "pixels" && sw && sh && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Exact</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#4F46E5" }}>{Math.round(pw)}:{Math.round(ph)}</div>
            </div>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Simplified</div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#4F46E5" }}>{sw}:{sh}</div>
            </div>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Decimal</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#4F46E5" }}>{decRatio1}</div>
            </div>
          </div>
        )}

        {mode === "ratio" && calcVal && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Width</div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#4F46E5" }}>{knownDim === "width" ? knownVal : calcVal}</div>
            </div>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Height</div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#4F46E5" }}>{knownDim === "height" ? knownVal : calcVal}</div>
            </div>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Decimal</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#4F46E5" }}>{decRatio2}</div>
            </div>
          </div>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 18px", fontSize: "13px", color: "#374151" }}>
          <strong style={{ color: "#4F46E5" }}>Common uses:</strong> Video production (16:9, 21:9), photography (3:2, 4:3), web design (1:1 for social), portrait video (9:16 for Reels/TikTok), print (5:4).
        </div>
      </div>
      <Footer />
    </main>
  );
}
