"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function cleanText(t) {
  return t.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isPalindrome(t) {
  const c = cleanText(t);
  return c.length > 0 && c === c.split("").reverse().join("");
}

const EXAMPLES = ["racecar", "A man a plan a canal Panama", "hello", "Was it a car or a cat I saw", "level", "Never odd or even"];

export default function PalindromePage() {
  const [text, setText] = useState("A man a plan a canal Panama");

  const cleaned = cleanText(text);
  const reversed = cleaned.split("").reverse().join("");
  const result = text.trim().length > 0 ? isPalindrome(text) : null;

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordResults = words.map((w) => ({ word: w, is: isPalindrome(w) }));

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Palindrome Checker" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Palindrome Checker</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Check if text reads the same forwards and backwards (ignores spaces and punctuation).</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>Enter text to check</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here…"
            rows={4}
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
          />

          <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
            {EXAMPLES.map((e) => (
              <button key={e} onClick={() => setText(e)} style={{ padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "11px", cursor: "pointer" }}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {result !== null && (
          <>
            {/* Main result */}
            <div style={{ background: result ? "#ECFDF5" : "#FEF2F2", border: `0.5px solid ${result ? "#6EE7B7" : "#FCA5A5"}`, borderRadius: "12px", padding: "28px 24px", marginBottom: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "56px", marginBottom: "8px" }}>{result ? "✅" : "❌"}</div>
              <div style={{ fontSize: "24px", fontWeight: "700", color: result ? "#065F46" : "#B91C1C" }}>
                {result ? "Yes, it's a palindrome!" : "No, not a palindrome"}
              </div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "6px" }}>
                Cleaned: <span style={{ fontFamily: "monospace", fontWeight: "600", color: "#374151" }}>{cleaned || "(empty)"}</span>
              </div>
            </div>

            {/* Reversed comparison */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Forward vs Reversed</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { label: "→ Forward", val: cleaned, color: "#4F46E5" },
                  { label: "← Reversed", val: reversed, color: result ? "#10B981" : "#EF4444" },
                ].map((r) => (
                  <div key={r.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "12px" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>{r.label}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "14px", color: r.color, wordBreak: "break-all" }}>{r.val || "(empty)"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Word-by-word results */}
            {wordResults.length > 1 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Word-by-word check</div>
                {wordResults.map((r, i) => (
                  <div key={i} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                    <span style={{ fontFamily: "monospace", color: "#374151" }}>{r.word}</span>
                    <span style={{ fontWeight: "600", color: r.is ? "#10B981" : "#9CA3AF" }}>{r.is ? "✓ Palindrome" : "—"}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
