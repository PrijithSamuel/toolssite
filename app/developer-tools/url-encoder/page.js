"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function URLEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function handleEncode() {
    setMode("encode");
    setError("");
    try {
      setOutput(encodeURIComponent(input));
    } catch {
      setError("Could not encode input.");
      setOutput("");
    }
  }

  function handleDecode() {
    setMode("decode");
    setError("");
    try {
      setOutput(decodeURIComponent(input));
    } catch {
      setError("Invalid URL-encoded string.");
      setOutput("");
    }
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "URL Encoder/Decoder" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>URL Encoder / Decoder</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Encode special characters for use in URLs, or decode URL-encoded strings.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Input</label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setOutput(""); setMode(""); setError(""); }}
              placeholder="Paste text or URL here..."
              rows={10}
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", fontFamily: "monospace", resize: "none", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <button
                onClick={handleEncode}
                style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#4F46E5", color: "white", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}
              >
                Encode URL
              </button>
              <button
                onClick={handleDecode}
                style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}
              >
                Decode URL
              </button>
            </div>
          </div>

          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                {mode === "encode" ? "Encoded Output" : mode === "decode" ? "Decoded Output" : "Output"}
              </label>
              <button
                onClick={copyOutput}
                disabled={!output}
                style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied ? "#10B981" : "white", color: copied ? "white" : "#374151", fontSize: "12px", cursor: output ? "pointer" : "default", fontWeight: "500" }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            {error ? (
              <div style={{ background: "#FFF5F5", border: "0.5px solid #FCA5A5", borderRadius: "8px", padding: "12px", fontSize: "13px", color: "#EF4444" }}>
                {error}
              </div>
            ) : (
              <textarea
                value={output}
                readOnly
                rows={10}
                placeholder="Result will appear here..."
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "#F8F9FF", fontSize: "13px", fontFamily: "monospace", resize: "none", boxSizing: "border-box", color: "#1E1B4B" }}
              />
            )}
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>How to use</div>
          <ul style={{ fontSize: "13px", color: "#6B7280", paddingLeft: "16px", margin: 0 }}>
            <li style={{ marginBottom: "4px" }}>Paste text or a URL in the input box on the left</li>
            <li style={{ marginBottom: "4px" }}>Click <strong>Encode URL</strong> to convert special characters (spaces, &amp;, = etc.) to percent-encoded form</li>
            <li>Click <strong>Decode URL</strong> to convert percent-encoded text back to readable form</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
