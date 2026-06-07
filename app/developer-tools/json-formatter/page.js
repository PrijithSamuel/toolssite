"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "What does JSON formatting do?", a: "Formatting adds proper indentation and line breaks to make compressed JSON readable. Minifying removes all whitespace to make JSON compact for transmission." },
  { q: "How do I validate my JSON?", a: "Click the Validate button. If your JSON is valid you will see a green confirmation. If invalid, the error message shows the exact location of the syntax error." },
  { q: "Is there a size limit for JSON input?", a: "No hard limit. Very large JSON files over 1MB may be slightly slow to format but will work correctly." },
  { q: "Can I format JSON with comments?", a: "Standard JSON does not support comments. If your JSON contains comments it is not valid JSON and the formatter will show an error." },
  { q: "Is my JSON data sent to a server?", a: "No. All formatting and validation happens in your browser. Your JSON data is never transmitted anywhere." },
];

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function format() { try { const parsed = JSON.parse(input); setOutput(JSON.stringify(parsed, null, 2)); setError(""); } catch (e) { setError(e.message); setOutput(""); } }
  function minify() { try { const parsed = JSON.parse(input); setOutput(JSON.stringify(parsed)); setError(""); } catch (e) { setError(e.message); setOutput(""); } }
  function validate() { try { JSON.parse(input); setError("✓ Valid JSON"); setOutput(""); } catch (e) { setError(e.message); setOutput(""); } }
  function handleCopy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  function handleClear() { setInput(""); setOutput(""); setError(""); }

  const isValid = error.startsWith("✓");
  const btnStyle = (variant) => ({
    padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", border: "none",
    background: variant === "primary" ? "#4F46E5" : variant === "danger" ? "#FEE2E2" : "white",
    color: variant === "primary" ? "white" : variant === "danger" ? "#DC2626" : "#4B5563",
    ...(variant === "secondary" ? { border: "0.5px solid #C7D2FE" } : {}),
  });

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "JSON Formatter" }]} />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>JSON Formatter — Beautify &amp; Validate JSON Online</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Format, minify and validate JSON instantly. Free, no signup required.</p>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
          <button type="button" onClick={format} style={btnStyle("primary")}>Format / Beautify</button>
          <button type="button" onClick={minify} style={btnStyle("secondary")}>Minify</button>
          <button type="button" onClick={validate} style={btnStyle("secondary")}>Validate</button>
          <button type="button" onClick={handleClear} style={btnStyle("danger")}>Clear</button>
        </div>

        {error && (
          <div style={{ marginBottom: "14px", padding: "12px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", background: isValid ? "#D1FAE5" : "#FEE2E2", color: isValid ? "#065F46" : "#DC2626", border: `0.5px solid ${isValid ? "#A7F3D0" : "#FECACA"}` }}>
            {error}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#6366F1" }}>Input JSON</label>
              <span style={{ fontSize: "11px", color: "#9CA3AF" }}>{input.length} chars</span>
            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false}
              placeholder={'Paste your JSON here e.g. {"name":"John","age":30}'}
              style={{ width: "100%", height: "380px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", outline: "none", background: "white", color: "#374151" }} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#6366F1" }}>Output</label>
              {output && (
                <button type="button" onClick={handleCopy}
                  style={{ fontSize: "11px", color: "#6B7280", background: "#EEF2FF", border: "0.5px solid #C7D2FE", padding: "2px 10px", borderRadius: "5px", cursor: "pointer" }}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea readOnly value={output} spellCheck={false} placeholder="Formatted JSON will appear here..."
              style={{ width: "100%", height: "380px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", outline: "none", background: "#F9FAFB", color: "#374151" }} />
          </div>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}