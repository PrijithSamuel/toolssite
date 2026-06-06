"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n, decimals = 4) {
  if (Math.abs(n) < 1e-10) return "0";
  const r = parseFloat(n.toFixed(decimals));
  return String(r);
}

function solve(a, b, c) {
  const disc = b * b - 4 * a * c;
  const steps = [];

  steps.push({ label: "Equation", text: `${a}x² + ${b}x + ${c} = 0` });
  steps.push({ label: "Discriminant", text: `Δ = b² − 4ac = (${b})² − 4(${a})(${c}) = ${fmt(b * b)} − ${fmt(4 * a * c)} = ${fmt(disc)}` });

  let roots;
  if (disc > 0) {
    const r1 = (-b + Math.sqrt(disc)) / (2 * a);
    const r2 = (-b - Math.sqrt(disc)) / (2 * a);
    steps.push({ label: "Discriminant > 0", text: "Two distinct real roots" });
    steps.push({ label: "x₁", text: `x₁ = (−b + √Δ) / 2a = (${-b} + √${fmt(disc)}) / ${2 * a} = (${-b} + ${fmt(Math.sqrt(disc))}) / ${2 * a} = ${fmt(r1)}` });
    steps.push({ label: "x₂", text: `x₂ = (−b − √Δ) / 2a = (${-b} − √${fmt(disc)}) / ${2 * a} = (${-b} − ${fmt(Math.sqrt(disc))}) / ${2 * a} = ${fmt(r2)}` });
    roots = { type: "real2", x1: fmt(r1), x2: fmt(r2) };
  } else if (Math.abs(disc) < 1e-10) {
    const r = -b / (2 * a);
    steps.push({ label: "Discriminant = 0", text: "One repeated real root" });
    steps.push({ label: "x", text: `x = −b / 2a = ${-b} / ${2 * a} = ${fmt(r)}` });
    roots = { type: "real1", x1: fmt(r) };
  } else {
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-disc) / (2 * a);
    steps.push({ label: "Discriminant < 0", text: "Two complex (imaginary) roots" });
    steps.push({ label: "x₁", text: `x₁ = (−b + i√|Δ|) / 2a = ${fmt(realPart)} + ${fmt(imagPart)}i` });
    steps.push({ label: "x₂", text: `x₂ = (−b − i√|Δ|) / 2a = ${fmt(realPart)} − ${fmt(imagPart)}i` });
    roots = { type: "complex", real: fmt(realPart), imag: fmt(Math.abs(imagPart)) };
  }

  const vx = -b / (2 * a);
  const vy = c - (b * b) / (4 * a);
  steps.push({ label: "Vertex", text: `(−b/2a, c − b²/4a) = (${fmt(vx)}, ${fmt(vy)})` });

  return { disc: fmt(disc), steps, roots, vertex: { x: fmt(vx), y: fmt(vy) }, opensUp: a > 0 };
}

export default function Quadratic() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-5");
  const [c, setC] = useState("6");

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const cNum = parseFloat(c);
  const valid = !isNaN(aNum) && !isNaN(bNum) && !isNaN(cNum) && aNum !== 0;

  const result = valid ? solve(aNum, bNum, cNum) : null;

  const inputStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "20px", textAlign: "center", boxSizing: "border-box", width: "100%" };

  function eqLabel() {
    const aStr = a === "1" ? "" : a === "-1" ? "-" : (a || "a");
    const bAbs = Math.abs(bNum);
    const bStr = bAbs === 1 ? "" : String(bAbs);
    const bSign = bNum >= 0 ? "+" : "−";
    const cSign = cNum >= 0 ? "+" : "−";
    return `${aStr || a}x² ${bSign} ${bStr || bAbs}x ${cSign} ${Math.abs(cNum)} = 0`;
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Quadratic Equation Solver" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Quadratic Equation Solver</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Solve ax² + bx + c = 0 — find roots, discriminant, vertex, and full step-by-step working.</p>
        </div>

        {/* Equation display */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 24px", marginBottom: "16px", textAlign: "center", fontSize: "20px", fontWeight: "600", color: "#4F46E5", fontFamily: "monospace" }}>
          {valid ? eqLabel() : "ax² + bx + c = 0"}
        </div>

        {/* Inputs */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            {[
              { label: "a (x² coefficient)", val: a, set: setA },
              { label: "b (x coefficient)", val: b, set: setB },
              { label: "c (constant)", val: c, set: setC },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>{label}</label>
                <input type="number" value={val} onChange={(e) => set(e.target.value)} style={inputStyle} />
              </div>
            ))}
          </div>
          {aNum === 0 && a !== "" && (
            <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "8px" }}>⚠ a cannot be 0 (that would make it linear, not quadratic)</div>
          )}
        </div>

        {result && (
          <>
            {/* Discriminant */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Discriminant (Δ = b² − 4ac)</div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ fontSize: "36px", fontWeight: "700", color: parseFloat(result.disc) > 0 ? "#10B981" : parseFloat(result.disc) === 0 ? "#F59E0B" : "#EF4444" }}>
                  {result.disc}
                </div>
                <div style={{ fontSize: "13px", color: "#6B7280" }}>
                  {parseFloat(result.disc) > 0 ? "Δ > 0 → Two distinct real roots" : parseFloat(result.disc) === 0 ? "Δ = 0 → One repeated real root" : "Δ < 0 → Two complex roots"}
                </div>
              </div>
            </div>

            {/* Roots */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>
                Roots — {result.roots.type === "real2" ? "Two Real Roots" : result.roots.type === "real1" ? "One Repeated Root" : "Two Complex Roots"}
              </div>
              {result.roots.type === "real2" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {["x₁", "x₂"].map((label, i) => (
                    <div key={label} style={{ background: "#EEF2FF", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                      <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "600", marginBottom: "6px" }}>{label}</div>
                      <div style={{ fontSize: "28px", fontWeight: "700", color: "#4F46E5" }}>{i === 0 ? result.roots.x1 : result.roots.x2}</div>
                    </div>
                  ))}
                </div>
              )}
              {result.roots.type === "real1" && (
                <div style={{ background: "#EEF2FF", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "600", marginBottom: "6px" }}>x (repeated)</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5" }}>{result.roots.x1}</div>
                </div>
              )}
              {result.roots.type === "complex" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ background: "#FFF5F5", border: "0.5px solid #FCA5A5", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#EF4444", fontWeight: "600", marginBottom: "6px" }}>x₁</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#DC2626", fontFamily: "monospace" }}>{result.roots.real} + {result.roots.imag}i</div>
                  </div>
                  <div style={{ background: "#FFF5F5", border: "0.5px solid #FCA5A5", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#EF4444", fontWeight: "600", marginBottom: "6px" }}>x₂</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#DC2626", fontFamily: "monospace" }}>{result.roots.real} − {result.roots.imag}i</div>
                  </div>
                </div>
              )}
            </div>

            {/* Vertex & parabola */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>Parabola Info</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "#F8F9FF", borderRadius: "8px", padding: "14px" }}>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>VERTEX</div>
                  <div style={{ fontSize: "20px", fontWeight: "600", color: "#4F46E5" }}>({result.vertex.x}, {result.vertex.y})</div>
                </div>
                <div style={{ background: "#F8F9FF", borderRadius: "8px", padding: "14px" }}>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>OPENS</div>
                  <div style={{ fontSize: "20px", fontWeight: "600", color: result.opensUp ? "#10B981" : "#6366F1" }}>
                    {result.opensUp ? "⌣ Upward (a > 0)" : "⌢ Downward (a < 0)"}
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "14px" }}>Full Step-by-step Solution</div>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", background: "#EEF2FF", color: "#4F46E5", borderRadius: "4px", padding: "2px 8px", fontWeight: "600", flexShrink: 0, height: "fit-content", marginTop: "1px" }}>{step.label}</span>
                  <span style={{ fontSize: "13px", color: "#374151", fontFamily: "monospace", lineHeight: "1.6" }}>{step.text}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
