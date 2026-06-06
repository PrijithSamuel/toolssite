"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function primeFactors(n) {
  const factors = {};
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) { factors[d] = (factors[d] || 0) + 1; n = Math.floor(n / d); }
    d++;
  }
  if (n > 1) factors[n] = (factors[n] || 0) + 1;
  return factors;
}

function gcd2(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function lcm2(a, b) {
  return Math.abs(a * b) / gcd2(a, b);
}

function gcdAll(nums) {
  return nums.reduce((acc, n) => gcd2(acc, n));
}

function lcmAll(nums) {
  return nums.reduce((acc, n) => lcm2(acc, n));
}

function factorStr(factors) {
  return Object.entries(factors)
    .map(([p, e]) => `${p}${e > 1 ? `^${e}` : ""}`)
    .join(" × ");
}

function gcdSteps(nums) {
  const steps = [];
  let current = nums[0];
  steps.push(`Start with ${nums[0]}`);
  for (let i = 1; i < nums.length; i++) {
    const prev = current;
    current = gcd2(current, nums[i]);
    steps.push(`GCD(${prev}, ${nums[i]}) = ${current}`);
  }
  return { steps, result: current };
}

function lcmSteps(nums) {
  const steps = [];
  let current = nums[0];
  steps.push(`Start with ${nums[0]}`);
  for (let i = 1; i < nums.length; i++) {
    const prev = current;
    current = lcm2(current, nums[i]);
    steps.push(`LCM(${prev}, ${nums[i]}) = ${current}`);
  }
  return { steps, result: current };
}

export default function LcmGcd() {
  const [inputs, setInputs] = useState(["12", "18", "24", "", ""]);

  function setVal(idx, val) {
    setInputs((prev) => prev.map((v, i) => (i === idx ? val : v)));
  }

  const nums = inputs.map((v) => parseInt(v)).filter((n) => !isNaN(n) && n > 0);
  const canCalc = nums.length >= 2;

  const gcdResult = canCalc ? gcdSteps(nums) : null;
  const lcmResult = canCalc ? lcmSteps(nums) : null;
  const factorizations = canCalc ? nums.map((n) => ({ n, factors: primeFactors(n) })) : [];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "LCM & GCD Calculator" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>LCM & GCD Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Find the Least Common Multiple and Greatest Common Divisor of up to 5 numbers with step-by-step working.</p>
        </div>

        {/* Inputs */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "12px" }}>Enter up to 5 positive integers</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
            {inputs.map((val, i) => (
              <input
                key={i}
                type="number"
                value={val}
                onChange={(e) => setVal(i, e.target.value)}
                placeholder={`#${i + 1}`}
                min="1"
                style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", textAlign: "center", boxSizing: "border-box", width: "100%" }}
              />
            ))}
          </div>
          {!canCalc && <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "10px" }}>Enter at least 2 numbers to calculate.</div>}
        </div>

        {canCalc && (
          <>
            {/* Results */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              {[
                { label: "GCD", sublabel: "Greatest Common Divisor", value: gcdResult.result, desc: "Largest number that divides all inputs" },
                { label: "LCM", sublabel: "Least Common Multiple", value: lcmResult.result, desc: "Smallest number divisible by all inputs" },
              ].map(({ label, sublabel, value, desc }) => (
                <div key={label} style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "#6366F1", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "10px" }}>{sublabel}</div>
                  <div style={{ fontSize: "40px", fontWeight: "700", color: "#4F46E5", lineHeight: 1 }}>{value.toLocaleString()}</div>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "8px" }}>{desc}</div>
                </div>
              ))}
            </div>

            {/* Prime factorizations */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "14px" }}>Prime Factorizations</div>
              {factorizations.map(({ n, factors }) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", padding: "10px 14px", background: "#F8F9FF", borderRadius: "8px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#1E1B4B", minWidth: "48px" }}>{n}</span>
                  <span style={{ color: "#9CA3AF" }}>=</span>
                  <span style={{ fontSize: "15px", color: "#4F46E5", fontFamily: "monospace" }}>
                    {Object.entries(factors).map(([p, e], i, arr) => (
                      <span key={p}>
                        {p}{e > 1 ? <sup>{e}</sup> : ""}{i < arr.length - 1 ? " × " : ""}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            {/* Step by step */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "14px" }}>Step-by-step: GCD (Euclidean method)</div>
              {gcdResult.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "baseline", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", background: "#EEF2FF", color: "#4F46E5", borderRadius: "4px", padding: "2px 6px", fontWeight: "600", flexShrink: 0 }}>Step {i + 1}</span>
                  <span style={{ fontSize: "14px", color: "#374151", fontFamily: "monospace" }}>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: "12px", padding: "10px 14px", background: "#EEF2FF", borderRadius: "8px", fontSize: "14px", color: "#4F46E5", fontWeight: "600" }}>
                GCD = {gcdResult.result}
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "14px" }}>Step-by-step: LCM</div>
              {lcmResult.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "baseline", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", background: "#EEF2FF", color: "#4F46E5", borderRadius: "4px", padding: "2px 6px", fontWeight: "600", flexShrink: 0 }}>Step {i + 1}</span>
                  <span style={{ fontSize: "14px", color: "#374151", fontFamily: "monospace" }}>{step}</span>
                </div>
              ))}
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "8px" }}>Formula: LCM(a, b) = |a × b| / GCD(a, b)</div>
              <div style={{ marginTop: "8px", padding: "10px 14px", background: "#EEF2FF", borderRadius: "8px", fontSize: "14px", color: "#4F46E5", fontWeight: "600" }}>
                LCM = {lcmResult.result.toLocaleString()}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
