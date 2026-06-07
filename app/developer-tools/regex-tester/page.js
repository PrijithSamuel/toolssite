"use client";

import { useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "What regex syntax does this tester support?", a: "JavaScript regex syntax is used. This supports most standard regex patterns including character classes, quantifiers, groups, lookaheads and lookbehinds." },
  { q: "What do the flags mean?", a: "g means global (find all matches), i means case-insensitive, m means multiline (^ and $ match line starts/ends), s means dot matches newlines." },
  { q: "Why are my matches highlighted in yellow?", a: "Yellow highlighting shows each match found in the test string. This makes it easy to visually verify your pattern is matching the right text." },
  { q: "Can I test common patterns like email or URL?", a: "Yes. Use the preset buttons at the top to load common patterns for email, URL, phone number, IP address, date and hex colour." },
  { q: "Why does my regex show an error?", a: "An error means the regex syntax is invalid. Check for unclosed brackets, invalid escape sequences or unsupported features." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");

  const { matches, highlighted } = useMemo(() => {
    if (!pattern || !testString) return { matches: [], highlighted: [] };
    try {
      setError("");
      const parts = [];
      const matchList = [];
      let lastIndex = 0;
      const execRegex = new RegExp(pattern, "g" + flags.replace("g", ""));
      let match;
      while ((match = execRegex.exec(testString)) !== null) {
        if (match.index > lastIndex) parts.push({ text: testString.slice(lastIndex, match.index), highlight: false });
        parts.push({ text: match[0], highlight: true });
        matchList.push({ value: match[0], index: match.index, groups: match.slice(1) });
        lastIndex = match.index + match[0].length;
        if (match[0] === "") execRegex.lastIndex++;
      }
      if (lastIndex < testString.length) parts.push({ text: testString.slice(lastIndex), highlight: false });
      return { matches: matchList, highlighted: parts };
    } catch (e) { setError(e.message); return { matches: [], highlighted: [] }; }
  }, [pattern, flags, testString]);

  const flagOptions = [
    { id: "g", label: "g", desc: "Global" },
    { id: "i", label: "i", desc: "Case insensitive" },
    { id: "m", label: "m", desc: "Multiline" },
    { id: "s", label: "s", desc: "Dot all" },
  ];

  function toggleFlag(f) { setFlags(prev => prev.includes(f) ? prev.replace(f, "") : prev + f); }

  const commonPatterns = [
    { label: "Email", pattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}" },
    { label: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}" },
    { label: "Phone", pattern: "[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}" },
    { label: "IP Address", pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b" },
    { label: "Date", pattern: "\\d{1,2}[\\/\\-]\\d{1,2}[\\/\\-]\\d{2,4}" },
    { label: "Hex Color", pattern: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "Regex Tester" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Regex Tester</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Test and debug regular expressions instantly. Free, no signup required.</p>
        </div>

        <div style={introStyle}>
          Regular expressions (regex) are patterns used to match, search, and manipulate text in programming. They are used in form validation (checking if an email address is correctly formatted), log file analysis (extracting specific entries), data cleaning (removing unwanted characters), and search and replace operations in text editors and code. Writing a regex that works exactly as intended often requires iteration — this tester lets you write a pattern and immediately see which parts of your test string it matches, highlighted in yellow. Common pre-built patterns for email, URL, phone, IP address, and date are available as quick-start options.
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "8px" }}>COMMON PATTERNS</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {commonPatterns.map((p) => (
              <button key={p.label} type="button" onClick={() => setPattern(p.pattern)}
                style={{ fontSize: "12px", padding: "5px 12px", border: "0.5px solid #C7D2FE", borderRadius: "6px", background: "white", color: "#4338CA", cursor: "pointer", fontWeight: "500" }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", marginBottom: "14px" }}>
          <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>PATTERN</label>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 14px", marginBottom: "14px" }}>
            <span style={{ fontFamily: "monospace", color: "#9CA3AF" }}>/</span>
            <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Enter regex pattern..." spellCheck={false}
              style={{ flex: 1, border: "none", outline: "none", fontSize: "14px", fontFamily: "monospace", background: "transparent", color: "#374151" }} />
            <span style={{ fontFamily: "monospace", color: "#9CA3AF" }}>/</span>
            <span style={{ fontFamily: "monospace", color: "#4F46E5", fontWeight: "500" }}>{flags}</span>
          </div>
          {error && <p style={{ fontSize: "12px", color: "#DC2626", marginBottom: "10px" }}>{error}</p>}

          <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "8px" }}>FLAGS</label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {flagOptions.map((f) => (
              <button key={f.id} type="button" onClick={() => toggleFlag(f.id)}
                style={{ padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: "monospace", fontWeight: "500", cursor: "pointer", border: "none", background: flags.includes(f.id) ? "#4F46E5" : "white", color: flags.includes(f.id) ? "white" : "#4B5563" }}>
                {f.label} <span style={{ fontFamily: "sans-serif", opacity: 0.7, fontSize: "11px" }}>{f.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500" }}>TEST STRING</label>
            {matches.length > 0 && <span style={{ fontSize: "12px", background: "#D1FAE5", color: "#065F46", padding: "2px 10px", borderRadius: "4px", fontWeight: "500" }}>{matches.length} match{matches.length > 1 ? "es" : ""}</span>}
            {pattern && !error && matches.length === 0 && testString && <span style={{ fontSize: "12px", background: "#FEE2E2", color: "#DC2626", padding: "2px 10px", borderRadius: "4px", fontWeight: "500" }}>No matches</span>}
          </div>
          <textarea value={testString} onChange={(e) => setTestString(e.target.value)} spellCheck={false}
            placeholder="Enter test string here..."
            style={{ width: "100%", height: "140px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", fontSize: "14px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", outline: "none", background: "white", color: "#374151" }} />
        </div>

        {testString && pattern && !error && highlighted.length > 0 && (
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>HIGHLIGHTED MATCHES</label>
            <div style={{ border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", background: "white", fontSize: "14px", fontFamily: "monospace", lineHeight: "1.8", wordBreak: "break-all" }}>
              {highlighted.map((part, i) =>
                part.highlight ? (
                  <mark key={i} style={{ background: "#FEF08A", color: "#713F12", borderRadius: "3px", padding: "0 2px" }}>{part.text}</mark>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </div>
          </div>
        )}

        {matches.length > 0 && (
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "8px" }}>MATCH DETAILS</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {matches.map((m, i) => (
                <div key={i} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "11px", color: "#9CA3AF" }}>#{i + 1}</span>
                  <code style={{ fontSize: "13px", background: "#FEF9C3", color: "#713F12", padding: "2px 8px", borderRadius: "4px" }}>{m.value}</code>
                  <span style={{ fontSize: "12px", color: "#9CA3AF" }}>index: {m.index}</span>
                  {m.groups.length > 0 && <span style={{ fontSize: "12px", color: "#9CA3AF" }}>groups: {m.groups.join(", ")}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Enter a regex pattern or pick a common one above</li>
            <li>• Toggle flags as needed (g = global, i = case insensitive)</li>
            <li>• Paste your test string — matches highlight instantly</li>
          </ul>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}