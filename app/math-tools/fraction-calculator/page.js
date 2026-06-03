"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }
function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

function simplify(n, d) {
  if (d === 0) return null;
  const sign = d < 0 ? -1 : 1;
  n *= sign; d *= sign;
  const g = gcd(Math.abs(n), d);
  return { n: n / g, d: d / g };
}

function calcFraction(n1, d1, n2, d2, op) {
  n1 = parseInt(n1); d1 = parseInt(d1); n2 = parseInt(n2); d2 = parseInt(d2);
  if (!d1 || !d2 || isNaN(n1) || isNaN(n2)) return null;

  let rn, rd, steps;

  if (op === "+" || op === "−") {
    const l = lcm(Math.abs(d1), Math.abs(d2));
    const a1 = n1 * (l / d1);
    const a2 = n2 * (l / d2);
    rn = op === "+" ? a1 + a2 : a1 - a2;
    rd = l;
    steps = [
      `Find LCM(${d1}, ${d2}) = ${l}`,
      `Convert: ${n1}/${d1} = ${a1}/${l}`,
      `Convert: ${n2}/${d2} = ${a2}/${l}`,
      `${a1}/${l} ${op} ${a2}/${l} = (${a1} ${op} ${a2}) / ${l} = ${rn}/${rd}`,
    ];
  } else if (op === "×") {
    rn = n1 * n2;
    rd = d1 * d2;
    steps = [
      `Multiply numerators: ${n1} × ${n2} = ${rn}`,
      `Multiply denominators: ${d1} × ${d2} = ${rd}`,
      `Result: ${rn}/${rd}`,
    ];
  } else {
    if (n2 === 0) return null;
    rn = n1 * d2;
    rd = d1 * n2;
    steps = [
      `Multiply by reciprocal: ${n1}/${d1} × ${d2}/${n2}`,
      `Multiply numerators: ${n1} × ${d2} = ${rn}`,
      `Multiply denominators: ${d1} × ${n2} = ${rd}`,
      `Result: ${rn}/${rd}`,
    ];
  }

  const result = simplify(rn, rd);
  if (!result) return null;
  const simplified = (result.n !== rn || result.d !== rd);
  if (simplified) steps.push(`Simplify: ${rn}/${rd} = ${result.n}/${result.d}`);

  return { ...result, decimal: result.n / result.d, steps };
}

const OPS = ["+", "−", "×", "÷"];

export default function FractionCalculator() {
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [op, setOp] = useState("+");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");

  const result = calcFraction(n1, d1, n2, d2, op);

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px", outline: "none", background: "white", fontSize: "22px", textAlign: "center", width: "70px", boxSizing: "border-box" };

  function Fraction({ n, d, setN, setD }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <input type="number" value={n} onChange={(e) => setN(e.target.value)} style={inp} />
        <div style={{ width: "70px", height: "2px", background: "#1E1B4B" }} />
        <input type="number" value={d} onChange={(e) => setD(e.target.value)} style={inp} />
      </div>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Fraction Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Fraction Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Add, subtract, multiply, and divide fractions with step-by-step solutions.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "28px 24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Fraction n={n1} d={d1} setN={setN1} setD={setD1} />

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {OPS.map((o) => (
                <button key={o} onClick={() => setOp(o)} style={{ width: "44px", height: "36px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: op === o ? "#4F46E5" : "white", color: op === o ? "white" : "#374151", fontSize: "18px", cursor: "pointer", fontWeight: "600" }}>
                  {o}
                </button>
              ))}
            </div>

            <Fraction n={n2} d={d2} setN={setN2} setD={setD2} />

            <div style={{ fontSize: "28px", color: "#D1D5DB" }}>=</div>

            {result ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{ fontSize: "28px", fontWeight: "600", color: "#4F46E5", textAlign: "center" }}>{result.n}</div>
                <div style={{ width: "60px", height: "2px", background: "#4F46E5" }} />
                <div style={{ fontSize: "28px", fontWeight: "600", color: "#4F46E5", textAlign: "center" }}>{result.d}</div>
              </div>
            ) : (
              <div style={{ fontSize: "20px", color: "#EF4444" }}>Error</div>
            )}
          </div>

          {result && (
            <div style={{ textAlign: "center", marginTop: "16px", color: "#6B7280", fontSize: "14px" }}>
              = <strong style={{ color: "#374151" }}>{result.decimal.toFixed(6).replace(/0+$/, "").replace(/\.$/, "")}</strong> (decimal)
              {result.d === 1 ? ` = ${result.n} (whole number)` : ""}
            </div>
          )}
        </div>

        {result && result.steps && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "12px" }}>Step-by-step Solution</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#374151" }}>
                  <span style={{ background: "#4F46E5", color: "white", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0, fontWeight: "600" }}>{i + 1}</span>
                  <span style={{ paddingTop: "1px" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
