"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "What counts as a duplicate line?", a: "Any two lines with identical text are duplicates. The first occurrence is kept and subsequent duplicates are removed." },
  { q: "Does case matter when detecting duplicates?", a: "By default yes. 'Apple' and 'apple' are treated as different lines. Toggle case-sensitive off to treat them as duplicates." },
  { q: "What does the trim whitespace option do?", a: "Trimming removes leading and trailing spaces before comparison. Lines like '  apple  ' and 'apple' are treated as duplicates when trimming is enabled." },
  { q: "Is there a line count limit?", a: "No limit. Paste any number of lines and duplicates are removed instantly." },
  { q: "Will the output preserve the original order?", a: "Yes. Lines appear in their original order with duplicates removed. The first occurrence of each line is always kept." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

export default function RemoveDuplicates() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);

  function getResult() {
    if (!text.trim()) return "";
    let lines = text.split("\n");
    if (trimLines) lines = lines.map(l => l.trim());
    const seen = new Set();
    return lines.filter(line => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).join("\n");
  }

  const result = getResult();
  const originalCount = text.trim() ? text.split("\n").filter(l => l.trim()).length : 0;
  const resultCount = result.trim() ? result.split("\n").filter(l => l.trim()).length : 0;
  const removedCount = originalCount - resultCount;

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Remove Duplicates" }]} />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Remove Duplicate Lines</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Remove duplicate lines from any text instantly. Free, no signup required.</p>
        </div>

        <div style={introStyle}>
          Removing duplicate lines is a common data cleaning task when working with email lists, keyword lists, product catalogues, and database exports. Duplicate entries inflate list sizes, cause errors in mail merges, and skew data analysis. This tool removes every repeated line, keeping only the first occurrence of each unique line. The case-sensitive option treats "Apple" and "apple" as different entries — useful for programming where case matters. Whitespace trimming removes leading and trailing spaces before comparison, so " apple " and "apple" are treated as the same line even if they appear differently in the raw text.
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "14px" }}>
          {[["caseSensitive", "Case sensitive", caseSensitive, setCaseSensitive], ["trimLines", "Trim whitespace", trimLines, setTrimLines]].map(([id, label, val, setVal]) => (
            <label key={id} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#4B5563", cursor: "pointer" }}>
              <input type="checkbox" checked={val} onChange={(e) => setVal(e.target.checked)} />
              {label}
            </label>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", fontWeight: "500", color: "#6366F1" }}>Input</span>
              {originalCount > 0 && <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{originalCount} lines</span>}
            </div>
            <textarea
              style={{ width: "100%", height: "280px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", fontSize: "13px", color: "#374151", lineHeight: "1.6", resize: "none", outline: "none", background: "white", fontFamily: "inherit" }}
              placeholder={"apple\nbanana\napple\norange"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", fontWeight: "500", color: "#6366F1" }}>Output</span>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {removedCount > 0 && <span style={{ fontSize: "12px", color: "#DC2626" }}>{removedCount} removed</span>}
                {result && <button type="button" onClick={handleCopy}
                  style={{ fontSize: "12px", color: "#6B7280", background: "#EEF2FF", border: "0.5px solid #C7D2FE", padding: "3px 10px", borderRadius: "6px", cursor: "pointer" }}>
                  {copied ? "Copied!" : "Copy"}
                </button>}
              </div>
            </div>
            <textarea
              style={{ width: "100%", height: "280px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", fontSize: "13px", color: "#374151", lineHeight: "1.6", resize: "none", outline: "none", background: "#F9FAFB", fontFamily: "inherit" }}
              readOnly value={result}
              placeholder="Unique lines will appear here..."
            />
          </div>
        </div>

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Paste your lines of text on the left</li>
            <li>• Duplicates are removed instantly on the right</li>
            <li>• Toggle case sensitivity and whitespace trimming as needed</li>
          </ul>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}