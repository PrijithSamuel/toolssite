"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function encodeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHTML(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export default function HTMLEncode() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("encode");
  const [copied, setCopied] = useState(false);

  const output = input ? (mode === "encode" ? encodeHTML(input) : decodeHTML(input)) : "";

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "HTML Encoder / Decoder" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>HTML Encoder / Decoder</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Encode HTML special characters (&amp;, &lt;, &gt;, &quot;) or decode HTML entities back to text.</p>
        </div>

        {/* Mode buttons */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => { setMode("encode"); setInput(""); }} style={{ padding: "10px 24px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "encode" ? "#4F46E5" : "white", color: mode === "encode" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
            Encode HTML
          </button>
          <button onClick={() => { setMode("decode"); setInput(""); }} style={{ padding: "10px 24px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "decode" ? "#4F46E5" : "white", color: mode === "decode" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
            Decode HTML
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
              {mode === "encode" ? "Plain Text Input" : "HTML Entities Input"}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              placeholder={mode === "encode" ? 'e.g. <p class="test">Hello & "World"</p>' : "e.g. &lt;p class=&quot;test&quot;&gt;Hello &amp; &quot;World&quot;&lt;/p&gt;"}
              style={{ width: "100%", border: "none", padding: "14px", outline: "none", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                {mode === "encode" ? "Encoded Output" : "Decoded Output"}
              </span>
              <button onClick={copyOutput} disabled={!output} style={{ padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied ? "#10B981" : "white", color: copied ? "white" : "#374151", fontSize: "12px", cursor: output ? "pointer" : "default" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea readOnly value={output} rows={12} placeholder="Output appears here..." style={{ width: "100%", border: "none", padding: "14px", outline: "none", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", boxSizing: "border-box", background: "#F8F9FF", color: "#1E1B4B" }} />
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 16px", marginTop: "12px" }}>
          <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "7px" }}>Characters encoded</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ['"', "&quot;"], ["'", "&#39;"]].map(([char, entity]) => (
              <span key={char} style={{ padding: "3px 9px", background: "white", borderRadius: "5px", border: "0.5px solid #C7D2FE", fontSize: "12px", fontFamily: "monospace", color: "#374151" }}>
                {char} → {entity}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
