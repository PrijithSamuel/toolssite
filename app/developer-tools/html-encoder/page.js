"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ENTITIES = [
  { char: "&", entity: "&amp;" },
  { char: "<", entity: "&lt;" },
  { char: ">", entity: "&gt;" },
  { char: '"', entity: "&quot;" },
  { char: "'", entity: "&#39;" },
  { char: "©", entity: "&copy;" },
  { char: "®", entity: "&reg;" },
  { char: "™", entity: "&trade;" },
  { char: "€", entity: "&euro;" },
  { char: "£", entity: "&pound;" },
  { char: "¥", entity: "&yen;" },
  { char: "°", entity: "&deg;" },
  { char: "±", entity: "&plusmn;" },
  { char: "×", entity: "&times;" },
  { char: "÷", entity: "&divide;" },
  { char: "…", entity: "&hellip;" },
  { char: "—", entity: "&mdash;" },
  { char: "–", entity: "&ndash;" },
  { char: " ", entity: "&nbsp;" },
];

function encode(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decode(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&copy;/g, "©")
    .replace(/&reg;/g, "®")
    .replace(/&trade;/g, "™")
    .replace(/&euro;/g, "€")
    .replace(/&pound;/g, "£")
    .replace(/&yen;/g, "¥")
    .replace(/&deg;/g, "°")
    .replace(/&plusmn;/g, "±")
    .replace(/&times;/g, "×")
    .replace(/&divide;/g, "÷")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ");
}

export default function HtmlEncoder() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState('<h1 class="title">Hello & "World"</h1>');
  const [copied, setCopied] = useState(false);

  const output = mode === "encode" ? encode(input) : decode(input);

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const btnActive = { padding: "9px 22px", borderRadius: "8px", border: "none", background: "#4F46E5", color: "white", fontSize: "14px", fontWeight: "500", cursor: "pointer" };
  const btnInactive = { padding: "9px 22px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "14px", fontWeight: "500", cursor: "pointer" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "HTML Encoder / Decoder" }]} />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>HTML Encoder / Decoder</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Encode special characters to HTML entities or decode entities back to readable text.</p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button onClick={() => { setMode("encode"); setInput('<h1 class="title">Hello & "World"</h1>'); }} style={mode === "encode" ? btnActive : btnInactive}>Encode</button>
          <button onClick={() => { setMode("decode"); setInput("&lt;h1 class=&quot;title&quot;&gt;Hello &amp; &quot;World&quot;&lt;/h1&gt;"); }} style={mode === "decode" ? btnActive : btnInactive}>Decode</button>
        </div>

        {/* Side-by-side textareas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF" }}>
              {mode === "encode" ? "Plain text / HTML" : "Encoded HTML"}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              placeholder={mode === "encode" ? "Paste HTML or text to encode…" : "Paste encoded HTML to decode…"}
              style={{ width: "100%", border: "none", padding: "14px", outline: "none", background: "white", fontSize: "13px", fontFamily: "monospace", resize: "none", boxSizing: "border-box", lineHeight: "1.6" }}
            />
          </div>

          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{mode === "encode" ? "Encoded output" : "Decoded output"}</span>
              <button onClick={copy} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied ? "#DCFCE7" : "#EEF2FF", color: copied ? "#15803D" : "#4F46E5", cursor: "pointer" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div style={{ padding: "14px", fontFamily: "monospace", fontSize: "13px", lineHeight: "1.6", color: "#1E1B4B", whiteSpace: "pre-wrap", wordBreak: "break-all", minHeight: "220px" }}>
              {output || <span style={{ color: "#9CA3AF" }}>Output will appear here…</span>}
            </div>
          </div>
        </div>

        {/* Reference table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>
            Common HTML Entities Reference
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {ENTITIES.map(({ char, entity }) => (
              <div key={entity} style={{ padding: "10px 16px", borderBottom: "0.5px solid #F3F4F6", borderRight: "0.5px solid #F3F4F6", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px", fontWeight: "600", color: "#4F46E5", minWidth: "24px", textAlign: "center" }}>{char === " " ? "⎵" : char}</span>
                <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#374151" }}>{entity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
