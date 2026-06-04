"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function textToBinary(t) {
  return t.split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}

function binaryToText(b) {
  try {
    return b.trim().split(/\s+/).map((bin) => {
      const code = parseInt(bin, 2);
      if (isNaN(code)) throw new Error();
      return String.fromCharCode(code);
    }).join("");
  } catch {
    return null;
  }
}

export default function TextToBinaryPage() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("Hello World");
  const [copied, setCopied] = useState(false);

  const output = mode === "encode" ? textToBinary(input) : (binaryToText(input) ?? "⚠️ Invalid binary input");
  const isError = mode === "decode" && binaryToText(input) === null;

  const charRows = mode === "encode" && input
    ? input.split("").slice(0, 40).map((c) => ({ char: c === " " ? "SPACE" : c, bin: c.charCodeAt(0).toString(2).padStart(8, "0"), code: c.charCodeAt(0) }))
    : [];

  function copy() {
    if (!isError) { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Text to Binary" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Text to Binary Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert text to binary (ASCII 8-bit) or decode binary back to text.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
            {[{ val: "encode", label: "Text → Binary" }, { val: "decode", label: "Binary → Text" }].map(({ val, label }) => (
              <button key={val} onClick={() => { setMode(val); setInput(""); }} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === val ? "#4F46E5" : "white", color: mode === val ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
                {label}
              </button>
            ))}
          </div>

          <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
            {mode === "encode" ? "Enter text" : "Enter binary (space-separated 8-bit groups)"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Hello World" : "01001000 01100101 01101100 01101100 01101111"}
            rows={4}
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", fontFamily: mode === "decode" ? "monospace" : "inherit", resize: "vertical", boxSizing: "border-box" }}
          />
        </div>

        {input.trim() && (
          <>
            <div style={{ background: "white", border: `0.5px solid ${isError ? "#FCA5A5" : "#E0E7FF"}`, borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#374151" }}>Output</span>
                <button onClick={copy} disabled={isError} style={{ padding: "5px 14px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: copied ? "#10B981" : "white", color: copied ? "white" : "#374151", fontSize: "12px", cursor: isError ? "not-allowed" : "pointer" }}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "13px", color: isError ? "#EF4444" : "#1E1B4B", background: "#F8F9FF", borderRadius: "8px", padding: "12px", wordBreak: "break-all", lineHeight: "1.8" }}>
                {output || "(empty)"}
              </div>
            </div>

            {charRows.length > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#374151" }}>
                  Character breakdown {input.length > 40 && <span style={{ color: "#9CA3AF", fontWeight: "400" }}>(first 40 chars)</span>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "8px 12px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                  <span>Char</span><span>ASCII</span><span style={{ gridColumn: "3 / 5" }}>Binary</span>
                </div>
                {charRows.map((r, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "7px 12px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                    <span style={{ fontWeight: "600", color: "#4F46E5" }}>{r.char}</span>
                    <span style={{ color: "#6B7280" }}>{r.code}</span>
                    <span style={{ fontFamily: "monospace", color: "#374151", gridColumn: "3 / 5" }}>{r.bin}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
