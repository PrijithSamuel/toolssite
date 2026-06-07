"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmtResult(n) {
  if (!isFinite(n) || isNaN(n)) return null;
  if (Number.isInteger(n)) return n.toLocaleString();
  // Up to 4 significant decimal places, strip trailing zeros
  const s = parseFloat(n.toFixed(4)).toString();
  return parseFloat(s).toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    if (value == null) return;
    await navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={copy}
      disabled={value == null}
      style={{
        padding: "7px 16px",
        borderRadius: "8px",
        border: "0.5px solid #C7D2FE",
        background: copied ? "#DCFCE7" : "#EEF2FF",
        color: copied ? "#15803D" : "#4F46E5",
        fontSize: "12px",
        fontWeight: "600",
        cursor: value != null ? "pointer" : "not-allowed",
        opacity: value != null ? 1 : 0.4,
        transition: "all 0.15s",
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function ResultBox({ result, suffix = "", changeDir = null }) {
  const color =
    changeDir === "up" ? "#16A34A" :
    changeDir === "down" ? "#DC2626" :
    "#4F46E5";

  return (
    <div style={{
      background: changeDir === "up" ? "#F0FDF4" : changeDir === "down" ? "#FFF5F5" : "#EEF2FF",
      border: `0.5px solid ${changeDir === "up" ? "#86EFAC" : changeDir === "down" ? "#FCA5A5" : "#C7D2FE"}`,
      borderRadius: "10px",
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      minHeight: "54px",
    }}>
      <div style={{ fontSize: "32px", fontWeight: "800", color, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
        {result != null ? `${result}${suffix}` : "—"}
      </div>
      <CopyButton value={result != null ? `${result}${suffix}` : null} />
    </div>
  );
}

const cardStyle = {
  background: "white",
  border: "0.5px solid #E0E7FF",
  borderRadius: "12px",
  padding: "24px",
};

const labelStyle = { fontSize: "12px", fontWeight: "600", color: "#6B7280", display: "block", marginBottom: "5px" };

const inputStyle = {
  border: "0.5px solid #C7D2FE",
  borderRadius: "8px",
  padding: "10px 12px",
  outline: "none",
  background: "white",
  fontSize: "15px",
  width: "100%",
  boxSizing: "border-box",
};

function FormulaTag({ formula }) {
  return (
    <div style={{ marginTop: "10px", fontSize: "12px", fontFamily: "monospace", color: "#9CA3AF" }}>
      Formula: <span style={{ color: "#6366F1" }}>{formula}</span>
    </div>
  );
}

export default function PercentageCalc() {
  // Card 1: X% of Y
  const [c1x, setC1x] = useState("");
  const [c1y, setC1y] = useState("");

  // Card 2: X is what % of Y
  const [c2x, setC2x] = useState("");
  const [c2y, setC2y] = useState("");

  // Card 3: % change from X to Y
  const [c3x, setC3x] = useState("");
  const [c3y, setC3y] = useState("");

  // Results
  const r1 = (() => {
    const x = parseFloat(c1x), y = parseFloat(c1y);
    if (!isFinite(x) || !isFinite(y)) return null;
    return fmtResult(y * x / 100);
  })();

  const r2 = (() => {
    const x = parseFloat(c2x), y = parseFloat(c2y);
    if (!isFinite(x) || !isFinite(y) || y === 0) return null;
    return fmtResult((x / y) * 100);
  })();

  const r3Raw = (() => {
    const x = parseFloat(c3x), y = parseFloat(c3y);
    if (!isFinite(x) || !isFinite(y) || x === 0) return null;
    return ((y - x) / x) * 100;
  })();
  const r3 = r3Raw != null ? fmtResult(Math.abs(r3Raw)) : null;
  const r3Dir = r3Raw == null ? null : r3Raw > 0 ? "up" : r3Raw < 0 ? "down" : null;
  const r3Label = r3Dir === "up" ? "% increase" : r3Dir === "down" ? "% decrease" : "%";

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Percentage Calculator" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>% Percentage Calculator — Three Ways</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Three percentage calculations in one page. Results update as you type.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* ── Card 1: What is X% of Y? ── */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "white", fontWeight: "800", flexShrink: 0 }}>1</div>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1E1B4B", margin: 0 }}>What is X% of Y?</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              <div>
                <label style={labelStyle}>Percentage (X)</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    value={c1x}
                    onChange={(e) => setC1x(e.target.value)}
                    placeholder="e.g. 20"
                    style={{ ...inputStyle, paddingRight: "32px" }}
                  />
                  <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "#9CA3AF" }}>%</span>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Number (Y)</label>
                <input
                  type="number"
                  value={c1y}
                  onChange={(e) => setC1y(e.target.value)}
                  placeholder="e.g. 5000"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "10px" }}>
              What is <strong style={{ color: "#4F46E5" }}>{c1x || "X"}%</strong> of <strong style={{ color: "#4F46E5" }}>{c1y || "Y"}</strong>?
            </div>
            <ResultBox result={r1} />
            <FormulaTag formula={`Y × X ÷ 100  (e.g. 5000 × 20 ÷ 100 = 1000)`} />
          </div>

          {/* ── Card 2: X is what % of Y? ── */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "white", fontWeight: "800", flexShrink: 0 }}>2</div>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1E1B4B", margin: 0 }}>X is what percentage of Y?</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              <div>
                <label style={labelStyle}>Number (X)</label>
                <input
                  type="number"
                  value={c2x}
                  onChange={(e) => setC2x(e.target.value)}
                  placeholder="e.g. 300"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Total (Y)</label>
                <input
                  type="number"
                  value={c2y}
                  onChange={(e) => setC2y(e.target.value)}
                  placeholder="e.g. 1500"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "10px" }}>
              <strong style={{ color: "#4F46E5" }}>{c2x || "X"}</strong> is what % of <strong style={{ color: "#4F46E5" }}>{c2y || "Y"}</strong>?
            </div>
            <ResultBox result={r2} suffix="%" />
            <FormulaTag formula={`(X ÷ Y) × 100  (e.g. 300 ÷ 1500 × 100 = 20%)`} />
          </div>

          {/* ── Card 3: Percentage change ── */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "white", fontWeight: "800", flexShrink: 0 }}>3</div>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1E1B4B", margin: 0 }}>Percentage change from X to Y</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              <div>
                <label style={labelStyle}>Original value (X)</label>
                <input
                  type="number"
                  value={c3x}
                  onChange={(e) => setC3x(e.target.value)}
                  placeholder="e.g. 1000"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>New value (Y)</label>
                <input
                  type="number"
                  value={c3y}
                  onChange={(e) => setC3y(e.target.value)}
                  placeholder="e.g. 1200"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "10px" }}>
              Change from <strong style={{ color: "#4F46E5" }}>{c3x || "X"}</strong> to <strong style={{ color: "#4F46E5" }}>{c3y || "Y"}</strong>
              {r3Dir === "up" && <span style={{ marginLeft: "6px", color: "#16A34A", fontWeight: "600" }}>↑ increase</span>}
              {r3Dir === "down" && <span style={{ marginLeft: "6px", color: "#DC2626", fontWeight: "600" }}>↓ decrease</span>}
            </div>
            <ResultBox result={r3} suffix={r3Label} changeDir={r3Dir} />
            <FormulaTag formula={`((Y − X) ÷ X) × 100  (e.g. (1200 − 1000) ÷ 1000 × 100 = 20%)`} />
          </div>

        </div>

        {/* Quick examples */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginTop: "20px" }}>
          <div style={{ padding: "10px 16px", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "700", color: "#374151" }}>Quick Examples</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { label: "20% of 5,000", result: "1,000", card: "Card 1" },
              { label: "300 of 1,500", result: "20%",   card: "Card 2" },
              { label: "1,000 → 1,200", result: "20% ↑", card: "Card 3" },
              { label: "15% of 200",   result: "30",    card: "Card 1" },
              { label: "45 of 180",    result: "25%",   card: "Card 2" },
              { label: "500 → 400",    result: "20% ↓", card: "Card 3" },
            ].map(({ label, result, card }, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRight: (i + 1) % 3 !== 0 ? "0.5px solid #F3F4F6" : "none", borderBottom: i < 3 ? "0.5px solid #F3F4F6" : "none" }}>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" }}>{card}</div>
                <div style={{ fontSize: "12px", color: "#374151" }}>{label}</div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#4F46E5", marginTop: "2px" }}>{result}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
