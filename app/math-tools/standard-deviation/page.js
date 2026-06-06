"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function mode(sorted) {
  const freq = {};
  sorted.forEach((n) => { freq[n] = (freq[n] || 0) + 1; });
  const max = Math.max(...Object.values(freq));
  if (max === 1) return null;
  return Object.keys(freq).filter((k) => freq[k] === max).map(Number);
}

function median(sorted) {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function fmt(n) {
  if (Math.abs(n) < 1e-10) return "0";
  return parseFloat(n.toFixed(6)).toString();
}

function analyze(nums) {
  const n = nums.length;
  const sorted = [...nums].sort((a, b) => a - b);
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const med = median(sorted);
  const modeVals = mode(sorted);
  const range = sorted[n - 1] - sorted[0];

  const squaredDiffs = nums.map((x) => ({ x, diff: x - mean, sq: (x - mean) ** 2 }));
  const sumSqDiff = squaredDiffs.reduce((a, b) => a + b.sq, 0);
  const varPop = sumSqDiff / n;
  const varSample = n > 1 ? sumSqDiff / (n - 1) : 0;
  const stdPop = Math.sqrt(varPop);
  const stdSample = Math.sqrt(varSample);

  return { n, sorted, sum, mean, med, modeVals, range, squaredDiffs, sumSqDiff, varPop, varSample, stdPop, stdSample };
}

export default function StandardDeviation() {
  const [input, setInput] = useState("4, 7, 13, 2, 1, 9");

  const nums = input.split(/[,\s]+/).map(Number).filter((n) => !isNaN(n));
  const canCalc = nums.length >= 2;
  const result = canCalc ? analyze(nums) : null;

  const statBoxStyle = { background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "14px 16px", textAlign: "center" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Standard Deviation" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Standard Deviation Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Enter comma-separated numbers to calculate mean, median, mode, variance and standard deviation.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Enter numbers (comma or space separated)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            placeholder="e.g. 4, 7, 13, 2, 1, 9"
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", resize: "vertical", boxSizing: "border-box", fontFamily: "monospace" }}
          />
          <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "6px" }}>
            {nums.length > 0 ? `${nums.length} number${nums.length !== 1 ? "s" : ""} detected` : "No valid numbers yet"}
            {nums.length === 1 && " — need at least 2"}
          </div>
        </div>

        {result && (
          <>
            {/* Sorted data */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "14px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Sorted Dataset ({result.n} values)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {result.sorted.map((n, i) => (
                  <span key={i} style={{ padding: "4px 10px", borderRadius: "6px", background: "#EEF2FF", color: "#4F46E5", fontSize: "13px", fontFamily: "monospace", fontWeight: "500" }}>{n}</span>
                ))}
              </div>
            </div>

            {/* Main stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "14px" }}>
              {[
                { label: "Count (n)", value: result.n },
                { label: "Sum", value: fmt(result.sum) },
                { label: "Range", value: fmt(result.range) },
                { label: "Mean (μ)", value: fmt(result.mean) },
                { label: "Median", value: fmt(result.med) },
                { label: "Mode", value: result.modeVals ? result.modeVals.join(", ") : "None" },
              ].map(({ label, value }) => (
                <div key={label} style={statBoxStyle}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: "#1E1B4B" }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Variance & Std Dev */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              {[
                { label: "Population Variance (σ²)", value: fmt(result.varPop), sub: "Divides by n" },
                { label: "Sample Variance (s²)", value: fmt(result.varSample), sub: "Divides by n−1 (Bessel's correction)" },
                { label: "Population Std Dev (σ)", value: fmt(result.stdPop), sub: "√(variance / n)" },
                { label: "Sample Std Dev (s)", value: fmt(result.stdSample), sub: "√(variance / n−1)" },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontSize: "26px", fontWeight: "700", color: "#4F46E5" }}>{value}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Step-by-step */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>
                Step-by-step: Variance calculation
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: "13px", color: "#374151", marginBottom: "10px", fontFamily: "monospace" }}>
                  Mean (μ) = ({result.sorted.join(" + ")}) / {result.n} = <strong>{fmt(result.mean)}</strong>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ background: "#F8F9FF" }}>
                        {["x", "x − μ", "(x − μ)²"].map((h) => (
                          <th key={h} style={{ padding: "8px 12px", textAlign: "right", color: "#6B7280", fontWeight: "600", borderBottom: "0.5px solid #E0E7FF" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.squaredDiffs.map(({ x, diff, sq }, i) => (
                        <tr key={i} style={{ borderBottom: "0.5px solid #F0F4FF" }}>
                          <td style={{ padding: "6px 12px", textAlign: "right", fontFamily: "monospace", color: "#374151" }}>{x}</td>
                          <td style={{ padding: "6px 12px", textAlign: "right", fontFamily: "monospace", color: diff >= 0 ? "#10B981" : "#EF4444" }}>{fmt(diff)}</td>
                          <td style={{ padding: "6px 12px", textAlign: "right", fontFamily: "monospace", color: "#4F46E5" }}>{fmt(sq)}</td>
                        </tr>
                      ))}
                      <tr style={{ background: "#F8F9FF", fontWeight: "600" }}>
                        <td colSpan={2} style={{ padding: "8px 12px", textAlign: "right", color: "#374151", fontSize: "12px" }}>Sum of squared differences:</td>
                        <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", color: "#4F46E5" }}>{fmt(result.sumSqDiff)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div style={{ background: "#EEF2FF", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#374151", fontFamily: "monospace" }}>
                    σ² = {fmt(result.sumSqDiff)} / {result.n} = <strong>{fmt(result.varPop)}</strong>
                  </div>
                  <div style={{ background: "#EEF2FF", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#374151", fontFamily: "monospace" }}>
                    s² = {fmt(result.sumSqDiff)} / {result.n - 1} = <strong>{fmt(result.varSample)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
