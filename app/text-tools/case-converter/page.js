"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "What is title case?", a: "Title case capitalises the first letter of each word. For example 'the quick brown fox' becomes 'The Quick Brown Fox'." },
  { q: "What is sentence case?", a: "Sentence case capitalises only the first letter of each sentence. The rest of the text is lowercase." },
  { q: "What is alternating case?", a: "Alternating case switches between lowercase and uppercase for each character: 'hElLo WoRlD'." },
  { q: "Is there a text length limit?", a: "No limit. You can paste any amount of text and convert it instantly." },
  { q: "Does conversion work for non-English languages?", a: "The converter works best with English and Latin-based languages. Accented characters are preserved during conversion." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  function toUpper() { setText(t => t.toUpperCase()); }
  function toLower() { setText(t => t.toLowerCase()); }
  function toTitle() { setText(t => t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())); }
  function toSentence() { setText(t => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())); }
  function toAlternating() { setText(t => t.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("")); }
  function removeSpaces() { setText(t => t.split(" ").join("")); }

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const buttons = [
    { label: "UPPER CASE", fn: toUpper, bg: "#FEE2E2", color: "#991B1B" },
    { label: "lower case", fn: toLower, bg: "#DBEAFE", color: "#1E40AF" },
    { label: "Title Case", fn: toTitle, bg: "#D1FAE5", color: "#065F46" },
    { label: "Sentence case", fn: toSentence, bg: "#EDE9FE", color: "#4C1D95" },
    { label: "aLtErNaTiNg", fn: toAlternating, bg: "#FEF9C3", color: "#713F12" },
    { label: "RemoveSpaces", fn: removeSpaces, bg: "#F1F5F9", color: "#1E293B" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Case Converter" }]} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Case Converter — UPPER lower Title Case Online</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert text to uppercase, lowercase, title case and more. Free, instant, no signup.</p>
        </div>

        <div style={introStyle}>
          Text case conversion is a frequent need for developers, writers, and content creators. Pasting content from different sources often results in inconsistent capitalisation. UPPER CASE is used for headings, acronyms, and emphasis. lower case is used for email addresses, URLs, and code. Title Case capitalises the first letter of each word and is standard for article headings, book titles, and professional documents. Sentence case capitalises only the first letter of each sentence — the default for most prose writing. This tool converts any text between all major case formats instantly with a single click.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
          {buttons.map((btn) => (
            <button key={btn.label} type="button" onClick={btn.fn}
              style={{ background: btn.bg, color: btn.color, border: "none", borderRadius: "10px", padding: "12px", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
              {btn.label}
            </button>
          ))}
        </div>

        <div style={{ position: "relative" }}>
          <textarea
            style={{ width: "100%", height: "280px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", fontSize: "14px", color: "#374151", lineHeight: "1.6", resize: "none", outline: "none", background: "white", fontFamily: "inherit" }}
            placeholder="Type or paste your text here, then click a button above..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "6px" }}>
              <button type="button" onClick={handleCopy}
                style={{ fontSize: "12px", color: "#6B7280", background: "white", border: "0.5px solid #E0E7FF", padding: "4px 12px", borderRadius: "6px", cursor: "pointer" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
              <button type="button" onClick={() => setText("")}
                style={{ fontSize: "12px", color: "#6B7280", background: "white", border: "0.5px solid #E0E7FF", padding: "4px 12px", borderRadius: "6px", cursor: "pointer" }}>
                Clear
              </button>
            </div>
          )}
        </div>

        {text && (
          <div style={{ marginTop: "8px", display: "flex", gap: "16px" }}>
            <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{text.trim() === "" ? 0 : text.trim().split(/\s+/).length} words</span>
            <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{text.length} characters</span>
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Paste your text in the box below</li>
            <li>• Click any button above to convert instantly</li>
            <li>• Use Copy to copy the result to clipboard</li>
          </ul>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}