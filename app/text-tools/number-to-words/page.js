"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen"];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function belowThousand(n) {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + belowThousand(n % 100) : "");
}

function numberToWords(numStr) {
  const str = numStr.trim();
  if (!str) return "";
  const isNeg = str.startsWith("-");
  const abs = isNeg ? str.slice(1) : str;
  const parts = abs.split(".");
  const intPart = parts[0];
  const decPart = parts[1];

  if (!/^\d+$/.test(intPart)) return "Invalid number";
  const intNum = parseInt(intPart, 10);
  if (intNum > 999999999999) return "Number too large (max 1 trillion)";

  const scales = [
    [1000000000, "billion"],
    [1000000, "million"],
    [1000, "thousand"],
    [1, ""],
  ];

  let result = "";
  let remaining = intNum;
  for (const [scale, label] of scales) {
    if (remaining >= scale) {
      const chunk = Math.floor(remaining / scale);
      result += (result ? " " : "") + belowThousand(chunk) + (label ? " " + label : "");
      remaining %= scale;
    }
  }
  if (!result) result = "zero";

  if (decPart !== undefined) {
    const decWords = decPart.split("").map((d) => ones[parseInt(d)] || "zero").join(" ");
    result += " point " + decWords;
  }

  return (isNeg ? "negative " : "") + result;
}

const EXAMPLES = ["42", "1234", "1000000", "12.50", "999999999999", "-7"];

export default function NumberToWords() {
  const [input, setInput] = useState("1234");
  const [copied, setCopied] = useState(false);

  const result = numberToWords(input);

  function copy() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Number to Words" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Number to Words</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert any number up to 1 trillion into English words. Supports decimals and negatives.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Enter a number</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 1234 or 12.50 or -99"
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "18px", boxSizing: "border-box", fontFamily: "monospace" }}
          />
          <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "#EEF2FF", color: "#4F46E5", cursor: "pointer" }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>In words</span>
              <button
                onClick={copy}
                disabled={result === "Invalid number" || result === "Number too large (max 1 trillion)"}
                style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied ? "#DCFCE7" : "#EEF2FF", color: copied ? "#15803D" : "#4F46E5", cursor: "pointer" }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div style={{ padding: "28px 24px", textAlign: "center" }}>
              <div style={{
                fontSize: result.length > 60 ? "18px" : result.length > 30 ? "22px" : "26px",
                fontWeight: "600",
                color: result.startsWith("Invalid") || result.startsWith("Number too") ? "#DC2626" : "#4F46E5",
                lineHeight: "1.5",
                textTransform: "capitalize",
              }}>
                {result}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginTop: "16px", fontSize: "13px", color: "#374151" }}>
          <strong style={{ color: "#4F46E5" }}>Supports:</strong> integers up to 999,999,999,999 · decimals (12.50 → twelve point five zero) · negative numbers
        </div>
      </div>
      <Footer />
    </main>
  );
}
