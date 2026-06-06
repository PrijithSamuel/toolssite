"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MODES = [
  { id: "all", label: "Remove ALL spaces" },
  { id: "extra", label: "Remove EXTRA spaces" },
  { id: "trim", label: "Remove Leading & Trailing" },
];

function process(text, mode) {
  if (mode === "all") return text.replace(/ /g, "");
  if (mode === "extra") return text.replace(/ {2,}/g, " ").replace(/^ | $/gm, "");
  if (mode === "trim") return text.split("\n").map((l) => l.trim()).join("\n");
  return text;
}

export default function RemoveSpaces() {
  const [mode, setMode] = useState("all");
  const [input, setInput] = useState("  Hello   World  \n  This   has   extra   spaces  ");
  const [copied, setCopied] = useState(false);

  const output = process(input, mode);

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Remove Spaces" }]} />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Remove Spaces</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Remove all spaces, extra spaces, or only leading and trailing whitespace from your text.</p>
        </div>

        {/* Mode buttons */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {MODES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              style={{
                padding: "9px 18px",
                borderRadius: "8px",
                border: mode === id ? "none" : "0.5px solid #C7D2FE",
                background: mode === id ? "#4F46E5" : "white",
                color: mode === id ? "white" : "#4F46E5",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Side-by-side layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Input */}
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between" }}>
              <span>Input</span>
              <span style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: "400" }}>{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              placeholder="Paste your text here…"
              style={{ width: "100%", border: "none", padding: "14px", outline: "none", background: "white", fontSize: "13px", resize: "none", boxSizing: "border-box", fontFamily: "monospace", lineHeight: "1.6" }}
            />
          </div>

          {/* Output */}
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Output <span style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: "400" }}>{output.length} chars</span></span>
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

        {/* Stats */}
        {input && (
          <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
            <div style={{ padding: "8px 16px", borderRadius: "8px", background: "white", border: "0.5px solid #E0E7FF", fontSize: "13px", color: "#374151" }}>
              Before: <strong>{input.length}</strong> chars
            </div>
            <div style={{ padding: "8px 16px", borderRadius: "8px", background: "white", border: "0.5px solid #E0E7FF", fontSize: "13px", color: "#374151" }}>
              After: <strong>{output.length}</strong> chars
            </div>
            <div style={{ padding: "8px 16px", borderRadius: "8px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", fontSize: "13px", color: "#4F46E5", fontWeight: "500" }}>
              Removed: <strong>{input.length - output.length}</strong> chars
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
