"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function computeDiff(aLines, bLines) {
  // LCS-based diff — cap at 300 lines per side to keep it snappy
  const a = aLines.slice(0, 300);
  const b = bLines.slice(0, 300);
  const m = a.length, n = b.length;

  // Build LCS table
  const dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // Backtrack
  const result = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.unshift({ type: "same", text: a[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "added", text: b[j - 1] });
      j--;
    } else {
      result.unshift({ type: "removed", text: a[i - 1] });
      i--;
    }
  }
  return result;
}

function stats(diff) {
  return {
    added: diff.filter((d) => d.type === "added").length,
    removed: diff.filter((d) => d.type === "removed").length,
    same: diff.filter((d) => d.type === "same").length,
  };
}

const defaultA = `Hello World
This is line two
This line will be removed
Common line here
Another shared line`;

const defaultB = `Hello World
This is line two
Common line here
This line was added
Another shared line`;

export default function TextCompare() {
  const [textA, setTextA] = useState(defaultA);
  const [textB, setTextB] = useState(defaultB);

  const linesA = textA.split("\n");
  const linesB = textB.split("\n");
  const diff = computeDiff(linesA, linesB);
  const s = stats(diff);

  const rowColor = { added: "#DCFCE7", removed: "#FEE2E2", same: "transparent" };
  const textColor = { added: "#15803D", removed: "#DC2626", same: "#374151" };
  const prefix = { added: "+ ", removed: "− ", same: "  " };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Text Compare" }]} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Text Compare</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Paste two texts to see added, removed, and unchanged lines highlighted.</p>
        </div>

        {/* Stats bar */}
        {(s.added > 0 || s.removed > 0) && (
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <div style={{ padding: "6px 14px", borderRadius: "8px", background: "#DCFCE7", border: "0.5px solid #86EFAC", fontSize: "13px", color: "#15803D", fontWeight: "500" }}>
              +{s.added} added
            </div>
            <div style={{ padding: "6px 14px", borderRadius: "8px", background: "#FEE2E2", border: "0.5px solid #FCA5A5", fontSize: "13px", color: "#DC2626", fontWeight: "500" }}>
              −{s.removed} removed
            </div>
            <div style={{ padding: "6px 14px", borderRadius: "8px", background: "#F3F4F6", border: "0.5px solid #E5E7EB", fontSize: "13px", color: "#6B7280", fontWeight: "500" }}>
              {s.same} unchanged
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          {[{ label: "Original Text (A)", value: textA, setter: setTextA }, { label: "Modified Text (B)", value: textB, setter: setTextB }].map(({ label, value, setter }) => (
            <div key={label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF" }}>{label}</div>
              <textarea
                value={value}
                onChange={(e) => setter(e.target.value)}
                rows={10}
                style={{ width: "100%", border: "none", padding: "14px", outline: "none", background: "white", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", boxSizing: "border-box" }}
              />
            </div>
          ))}
        </div>

        {/* Diff output */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", gap: "16px" }}>
            <span>Diff Output</span>
            <span style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: "400" }}>
              <span style={{ color: "#15803D" }}>■</span> Added &nbsp;
              <span style={{ color: "#DC2626" }}>■</span> Removed &nbsp;
              <span style={{ color: "#9CA3AF" }}>■</span> Unchanged
            </span>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "13px", lineHeight: "1.7", maxHeight: "480px", overflowY: "auto" }}>
            {diff.map((line, idx) => (
              <div
                key={idx}
                style={{ padding: "2px 16px", background: rowColor[line.type], color: textColor[line.type], borderBottom: line.type !== "same" ? `0.5px solid ${line.type === "added" ? "#BBF7D0" : "#FCA5A5"}` : "none", display: "flex", gap: "8px" }}
              >
                <span style={{ userSelect: "none", opacity: 0.5, minWidth: "20px" }}>{prefix[line.type]}</span>
                <span style={{ flex: 1, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{line.text || " "}</span>
              </div>
            ))}
            {diff.length === 0 && (
              <div style={{ padding: "24px", textAlign: "center", color: "#9CA3AF", fontSize: "13px" }}>Paste text in both boxes above to compare</div>
            )}
          </div>
        </div>

        {linesA.length > 300 || linesB.length > 300 ? (
          <div style={{ marginTop: "8px", fontSize: "12px", color: "#F59E0B" }}>⚠ Diff limited to first 300 lines per input for performance.</div>
        ) : null}
      </div>
      <Footer />
    </main>
  );
}
