"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const bases = [
  { label: "Binary", short: "BIN", value: 2, prefix: "0b", placeholder: "e.g. 1010" },
  { label: "Octal", short: "OCT", value: 8, prefix: "0o", placeholder: "e.g. 755" },
  { label: "Decimal", short: "DEC", value: 10, prefix: "", placeholder: "e.g. 255" },
  { label: "Hexadecimal", short: "HEX", value: 16, prefix: "0x", placeholder: "e.g. FF" },
];

const validPatterns = {
  2: /^[01]+$/,
  8: /^[0-7]+$/,
  10: /^[0-9]+$/,
  16: /^[0-9a-fA-F]+$/,
};

function convert(input, fromBase) {
  if (!input.trim()) return null;
  const n = parseInt(input.trim(), fromBase);
  if (isNaN(n) || n < 0) return null;
  return {
    2: n.toString(2),
    8: n.toString(8),
    10: n.toString(10),
    16: n.toString(16).toUpperCase(),
    decimal: n,
  };
}

export default function NumberBaseConverter() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);

  const isValid = !input.trim() || validPatterns[fromBase].test(input.trim());
  const result = isValid ? convert(input, fromBase) : null;
  const inputBase = bases.find((b) => b.value === fromBase);

  const [copiedBase, setCopiedBase] = useState(null);
  function copyValue(val, baseVal) {
    navigator.clipboard.writeText(val).then(() => {
      setCopiedBase(baseVal);
      setTimeout(() => setCopiedBase(null), 2000);
    });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "Number Base Converter" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Number Base Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert numbers between Binary, Octal, Decimal, and Hexadecimal.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Input Base</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {bases.map((b) => (
                <button
                  key={b.value}
                  onClick={() => { setFromBase(b.value); setInput(""); }}
                  style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: fromBase === b.value ? "#4F46E5" : "white", color: fromBase === b.value ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}
                >
                  {b.short}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
              {inputBase?.label} Number
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder={inputBase?.placeholder}
              style={{ width: "100%", border: `0.5px solid ${!isValid && input ? "#FCA5A5" : "#C7D2FE"}`, borderRadius: "8px", padding: "12px 14px", outline: "none", background: "white", fontSize: "18px", fontFamily: "monospace", fontWeight: "500", boxSizing: "border-box" }}
            />
            {!isValid && input && (
              <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>
                Invalid {inputBase?.label.toLowerCase()} number. Only use: {fromBase === 2 ? "0, 1" : fromBase === 8 ? "0–7" : fromBase === 10 ? "0–9" : "0–9, A–F"}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {bases.map((b) => {
            const val = result ? result[b.value] : "";
            const isFrom = b.value === fromBase;
            return (
              <div key={b.value} style={{ background: isFrom ? "#EEF2FF" : "white", border: `0.5px solid ${isFrom ? "#A5B4FC" : "#E0E7FF"}`, borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: isFrom ? "#4F46E5" : "#6B7280" }}>{b.label} (Base {b.value})</span>
                  {val && (
                    <button
                      onClick={() => copyValue(val, b.value)}
                      style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "5px", border: "0.5px solid #C7D2FE", background: copiedBase === b.value ? "#10B981" : "white", color: copiedBase === b.value ? "white" : "#374151", cursor: "pointer" }}
                    >
                      {copiedBase === b.value ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
                <div style={{ fontSize: "20px", fontWeight: "500", color: isFrom ? "#4F46E5" : "#1E1B4B", fontFamily: "monospace", wordBreak: "break-all" }}>
                  {val || <span style={{ color: "#D1D5DB", fontSize: "16px" }}>—</span>}
                </div>
                {val && b.prefix && (
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px", fontFamily: "monospace" }}>{b.prefix}{val}</div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", marginTop: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>How to use</div>
          <ul style={{ fontSize: "13px", color: "#6B7280", paddingLeft: "16px", margin: 0 }}>
            <li style={{ marginBottom: "4px" }}>Select the base of your input number (BIN, OCT, DEC, or HEX)</li>
            <li style={{ marginBottom: "4px" }}>Type the number in the input field</li>
            <li>All four base representations are shown instantly — click Copy on any result</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
