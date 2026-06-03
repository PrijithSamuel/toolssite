"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const STOP_WORDS = new Set([
  "the","is","at","which","on","a","an","and","or","but","in","it","its","to","of",
  "for","are","was","were","be","been","being","have","has","had","do","does","did",
  "will","would","could","should","may","might","shall","can","this","that","these",
  "those","i","you","he","she","we","they","me","him","her","us","them","my","your",
  "his","our","their","what","with","not","from","by","as","up","if","so","no","out",
  "all","more","also","into","than","then","about","over","after","back","just",
  "because","come","how","when","there","who","get","like","some","through","between",
  "been","where","while","before","since","against","without","during","under","again",
  "any","both","each","few","other","own","same","such","too","very","s","t","re","ve",
  "ll","d","didn","isn","wasn","won","can","don","doesn",
]);

function analyze(text) {
  if (!text.trim()) return [];
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w.replace(/['-]/g, "")));

  const freq = {};
  for (const w of words) { freq[w] = (freq[w] || 0) + 1; }
  const total = words.length;

  return Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .map(([word, count]) => ({ word, count, pct: ((count / total) * 100).toFixed(1) }));
}

export default function WordDensity() {
  const [text, setText] = useState("");

  const results = analyze(text);
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const maxCount = results[0]?.count || 1;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "SEO Tools", href: "/seo-tools" }, { label: "Word Density Analyzer" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Word Density Analyzer</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Paste content to find the most used keywords. Common stop words are automatically filtered.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Paste Your Content</span>
                {text && <span style={{ fontSize: "12px", color: "#6B7280" }}>{wordCount} words</span>}
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your article, blog post, or page content here..."
                rows={20}
                style={{ width: "100%", border: "none", padding: "16px", outline: "none", background: "white", fontSize: "13px", lineHeight: "1.6", resize: "none", boxSizing: "border-box" }}
              />
            </div>
            {text && (
              <button onClick={() => setText("")} style={{ marginTop: "8px", fontSize: "12px", color: "#6B7280", background: "none", border: "none", cursor: "pointer" }}>
                Clear text
              </button>
            )}
          </div>

          <div>
            {results.length > 0 ? (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                  Top Keywords
                </div>
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {results.map(({ word, count, pct }, idx) => (
                    <div key={word}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "11px", color: "#9CA3AF", width: "16px" }}>#{idx + 1}</span>
                          <span style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B" }}>{word}</span>
                        </div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", color: "#6B7280" }}>{count}×</span>
                          <span style={{ fontSize: "12px", fontWeight: "500", color: "#4F46E5", minWidth: "38px", textAlign: "right" }}>{pct}%</span>
                        </div>
                      </div>
                      <div style={{ height: "6px", background: "#EEF2FF", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(count / maxCount) * 100}%`, background: idx < 3 ? "#4F46E5" : "#A5B4FC", borderRadius: "3px", transition: "width 0.4s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "48px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>📊</div>
                <div style={{ fontSize: "14px", color: "#6B7280" }}>Paste content on the left to see keyword density analysis</div>
              </div>
            )}

            {results.length > 0 && (
              <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", marginTop: "12px" }}>
                <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>What this means for SEO</div>
                <p style={{ fontSize: "12px", color: "#6B7280", margin: 0, lineHeight: "1.6" }}>
                  Aim for your primary keyword at 1–3% density. Top word: <strong style={{ color: "#4F46E5" }}>{results[0]?.word}</strong> at {results[0]?.pct}%.
                  {parseFloat(results[0]?.pct) > 3 ? " Consider reducing repetition to avoid keyword stuffing." : " Good balance."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
