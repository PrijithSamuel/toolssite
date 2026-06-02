"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function encodeBase64(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return "Error: Could not encode the input.";
  }
}

function decodeBase64(str) {
  try {
    return decodeURIComponent(escape(atob(str.trim())));
  } catch {
    return "Error: Invalid Base64 string.";
  }
}

export default function Base64Tool() {
  const [tab, setTab] = useState("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = input ? (tab === "encode" ? encodeBase64(input) : decodeBase64(input)) : "";

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const isError = output.startsWith("Error:");

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "Base64 Encoder/Decoder" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Base64 Encoder / Decoder</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Encode text to Base64 or decode Base64 back to plain text.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            {["encode", "decode"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setInput(""); }}
                style={{ padding: "8px 20px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: tab === t ? "#4F46E5" : "white", color: tab === t ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500", textTransform: "capitalize" }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
              {tab === "encode" ? "Plain Text Input" : "Base64 Input"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tab === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
              rows={5}
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", fontFamily: "monospace", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                {tab === "encode" ? "Base64 Output" : "Decoded Text"}
              </label>
              <button
                onClick={copyOutput}
                disabled={!output || isError}
                style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied ? "#10B981" : "white", color: copied ? "white" : "#374151", fontSize: "12px", cursor: output && !isError ? "pointer" : "default", fontWeight: "500" }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={5}
              placeholder="Output will appear here..."
              style={{ width: "100%", border: `0.5px solid ${isError ? "#FCA5A5" : "#C7D2FE"}`, borderRadius: "8px", padding: "10px 12px", outline: "none", background: isError ? "#FFF5F5" : "#F8F9FF", fontSize: "13px", fontFamily: "monospace", resize: "vertical", boxSizing: "border-box", color: isError ? "#EF4444" : "#1E1B4B" }}
            />
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>How to use</div>
          <ul style={{ fontSize: "13px", color: "#6B7280", paddingLeft: "16px", margin: 0 }}>
            <li style={{ marginBottom: "4px" }}>Switch between Encode and Decode tabs</li>
            <li style={{ marginBottom: "4px" }}>Paste or type your input in the top box</li>
            <li>The result appears instantly — click Copy to copy the output</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
