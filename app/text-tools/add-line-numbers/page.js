"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const SEPARATORS = [
  { id: "period", label: "Period ( 1. )", sep: ". " },
  { id: "colon", label: "Colon ( 1: )", sep: ": " },
  { id: "paren", label: "Parenthesis ( 1) )", sep: ") " },
  { id: "pipe", label: "Pipe ( 1 | )", sep: " | " },
];

function addLineNumbers(text, start, sepChar) {
  const lines = text.split("\n");
  const padWidth = String(start + lines.length - 1).length;
  return lines
    .map((line, i) => String(start + i).padStart(padWidth, " ") + sepChar + line)
    .join("\n");
}

export default function AddLineNumbers() {
  const [input, setInput] = useState("First line\nSecond line\nThird line\nFourth line");
  const [start, setStart] = useState(1);
  const [sepId, setSepId] = useState("period");
  const [copied, setCopied] = useState(false);

  const sep = SEPARATORS.find((s) => s.id === sepId)?.sep ?? ". ";
  const startNum = Math.max(0, parseInt(start) || 0);
  const output = input ? addLineNumbers(input, startNum, sep) : "";

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Add Line Numbers" }]} />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Add Line Numbers</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Prefix each line with a line number. Choose your separator style and starting number.</p>
        </div>

        {/* Controls */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px", display: "flex", gap: "24px", alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Starting number</label>
            <input
              type="number"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              min="0"
              style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100px", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Separator</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {SEPARATORS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSepId(id)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: sepId === id ? "none" : "0.5px solid #C7D2FE",
                    background: sepId === id ? "#4F46E5" : "white",
                    color: sepId === id ? "white" : "#4F46E5",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side-by-side layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Input */}
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between" }}>
              <span>Input</span>
              <span style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: "400" }}>
                {input.split("\n").length} line{input.split("\n").length !== 1 ? "s" : ""}
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={14}
              placeholder="Paste your text here…"
              style={{ width: "100%", border: "none", padding: "14px", outline: "none", background: "white", fontSize: "13px", resize: "none", boxSizing: "border-box", fontFamily: "monospace", lineHeight: "1.6" }}
            />
          </div>

          {/* Output */}
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Output</span>
              <button
                onClick={copy}
                style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied ? "#DCFCE7" : "#EEF2FF", color: copied ? "#15803D" : "#4F46E5", cursor: "pointer" }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div style={{ padding: "14px", fontFamily: "monospace", fontSize: "13px", lineHeight: "1.6", color: "#1E1B4B", whiteSpace: "pre-wrap", wordBreak: "break-all", minHeight: "200px" }}>
              {output || <span style={{ color: "#9CA3AF" }}>Output will appear here…</span>}
            </div>
          </div>
        </div>

        {/* Preview note */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 20px", marginTop: "16px", fontSize: "13px", color: "#374151" }}>
          <strong style={{ color: "#4F46E5" }}>Preview:</strong> &nbsp;
          <span style={{ fontFamily: "monospace" }}>
            {startNum}{sep}First line &nbsp;·&nbsp; {startNum + 1}{sep}Second line &nbsp;·&nbsp; {startNum + 2}{sep}Third line
          </span>
        </div>
      </div>
      <Footer />
    </main>
  );
}
