"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const VALUES = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

const REFERENCE = [
  { sym: "I", val: 1 }, { sym: "V", val: 5 }, { sym: "X", val: 10 },
  { sym: "L", val: 50 }, { sym: "C", val: 100 }, { sym: "D", val: 500 },
  { sym: "M", val: 1000 },
];

const RULES = [
  "Symbols I, X, C and M can be repeated up to 3 times in a row.",
  "V, L and D can never be repeated.",
  "A smaller symbol before a larger one means subtraction (e.g. IV = 4, IX = 9).",
  "A smaller symbol after a larger one means addition (e.g. VI = 6, XI = 11).",
  "Only I, X and C can be used as subtractive numerals.",
];

function toRoman(n) {
  if (n < 1 || n > 3999) return null;
  let result = "";
  const steps = [];
  for (const [val, sym] of VALUES) {
    while (n >= val) {
      result += sym;
      steps.push({ sym, val, n });
      n -= val;
    }
  }
  return { result, steps };
}

function fromRoman(str) {
  const s = str.toUpperCase().trim();
  if (!s) return null;
  const symMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  const steps = [];
  for (let i = 0; i < s.length; i++) {
    const cur = symMap[s[i]];
    const next = symMap[s[i + 1]];
    if (cur === undefined) return { error: `"${s[i]}" is not a valid Roman numeral symbol` };
    if (next && cur < next) {
      steps.push({ sym: s[i] + s[i + 1], val: next - cur, op: "subtract" });
      total += next - cur;
      i++;
    } else {
      steps.push({ sym: s[i], val: cur, op: "add" });
      total += cur;
    }
  }
  if (total < 1 || total > 3999) return { error: "Value out of range (1–3999)" };
  return { result: total, steps };
}

export default function RomanNumerals() {
  const [mode, setMode] = useState("toRoman");
  const [input, setInput] = useState("2024");
  const [copied, setCopied] = useState(false);

  const numResult = mode === "toRoman" ? toRoman(parseInt(input)) : null;
  const romResult = mode === "fromRoman" ? fromRoman(input) : null;

  const outputText = mode === "toRoman"
    ? (numResult?.result ?? "")
    : (romResult?.result != null ? String(romResult.result) : "");

  function copy() {
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const btnActive = { padding: "9px 22px", borderRadius: "8px", border: "none", background: "#4F46E5", color: "white", fontSize: "14px", fontWeight: "500", cursor: "pointer" };
  const btnInactive = { padding: "9px 22px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "14px", fontWeight: "500", cursor: "pointer" };

  const error = mode === "toRoman"
    ? (input && (isNaN(parseInt(input)) || parseInt(input) < 1 || parseInt(input) > 3999) ? "Enter a number from 1 to 3999" : null)
    : (romResult?.error ?? null);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Roman Numerals" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Roman Numeral Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert numbers to Roman numerals (1–3999) or decode Roman numerals back to numbers.</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button onClick={() => { setMode("toRoman"); setInput("2024"); }} style={mode === "toRoman" ? btnActive : btnInactive}>Number → Roman</button>
          <button onClick={() => { setMode("fromRoman"); setInput("MMXXIV"); }} style={mode === "fromRoman" ? btnActive : btnInactive}>Roman → Number</button>
        </div>

        {/* Input */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>
            {mode === "toRoman" ? "Enter a number (1–3999)" : "Enter Roman numerals"}
          </label>
          <input
            type={mode === "toRoman" ? "number" : "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "toRoman" ? "e.g. 2024" : "e.g. MMXXIV"}
            min={mode === "toRoman" ? "1" : undefined}
            max={mode === "toRoman" ? "3999" : undefined}
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "20px", boxSizing: "border-box", fontFamily: mode === "fromRoman" ? "monospace" : "inherit", textTransform: mode === "fromRoman" ? "uppercase" : "none" }}
          />
          {error && <div style={{ fontSize: "13px", color: "#EF4444", marginTop: "8px" }}>⚠ {error}</div>}
        </div>

        {/* Output */}
        {outputText && !error && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{mode === "toRoman" ? "Roman numeral" : "Number"}</span>
              <button onClick={copy} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied ? "#DCFCE7" : "#EEF2FF", color: copied ? "#15803D" : "#4F46E5", cursor: "pointer" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div style={{ padding: "24px", textAlign: "center", fontSize: mode === "toRoman" ? "52px" : "48px", fontWeight: "700", color: "#4F46E5", fontFamily: mode === "toRoman" ? "Georgia, serif" : "inherit", letterSpacing: "0.05em" }}>
              {outputText}
            </div>
          </div>
        )}

        {/* Steps */}
        {!error && (mode === "toRoman" ? numResult?.steps : romResult?.steps) && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>Conversion steps</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {mode === "toRoman"
                ? numResult.steps.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px" }}>
                      <span style={{ background: "#EEF2FF", color: "#4F46E5", borderRadius: "4px", padding: "2px 8px", fontWeight: "600", fontFamily: "monospace", minWidth: "36px", textAlign: "center" }}>{s.sym}</span>
                      <span style={{ color: "#9CA3AF" }}>= {s.val}</span>
                      <span style={{ color: "#374151" }}>→ remaining: {s.n - s.val}</span>
                    </div>
                  ))
                : romResult.steps.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px" }}>
                      <span style={{ background: "#EEF2FF", color: "#4F46E5", borderRadius: "4px", padding: "2px 8px", fontWeight: "600", fontFamily: "monospace", minWidth: "36px", textAlign: "center" }}>{s.sym}</span>
                      <span style={{ color: s.op === "subtract" ? "#EF4444" : "#10B981" }}>{s.op === "subtract" ? "−" : "+"} {s.val}</span>
                    </div>
                  ))}
            </div>
          </div>
        )}

        {/* Reference table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>
            Symbol Reference
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {REFERENCE.map(({ sym, val }) => (
              <div key={sym} style={{ padding: "14px 8px", textAlign: "center", borderRight: "0.5px solid #F0F4FF" }}>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#4F46E5", fontFamily: "Georgia, serif" }}>{sym}</div>
                <div style={{ fontSize: "13px", color: "#374151", marginTop: "2px" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", marginBottom: "10px" }}>Conversion Rules</div>
          <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {RULES.map((r, i) => (
              <li key={i} style={{ fontSize: "13px", color: "#374151", lineHeight: "1.5" }}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
