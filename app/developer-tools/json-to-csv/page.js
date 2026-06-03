"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function flattenObject(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj || {})) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else if (Array.isArray(value)) {
      result[newKey] = value.map((v) => (typeof v === "object" ? JSON.stringify(v) : v)).join("; ");
    } else {
      result[newKey] = value === null ? "" : value;
    }
  }
  return result;
}

function escapeCSV(val) {
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function jsonToCSV(jsonStr) {
  const data = JSON.parse(jsonStr);
  if (!Array.isArray(data)) throw new Error("Input must be a JSON array [ ... ]");
  if (data.length === 0) throw new Error("Array is empty.");
  const flattened = data.map((item) => flattenObject(typeof item === "object" ? item : { value: item }));
  const headers = [...new Set(flattened.flatMap((row) => Object.keys(row)))];
  const rows = [
    headers.join(","),
    ...flattened.map((row) => headers.map((h) => escapeCSV(row[h] ?? "")).join(",")),
  ];
  return rows.join("\n");
}

const SAMPLE = JSON.stringify([
  { name: "Alice", age: 28, city: "Paris", active: true },
  { name: "Bob", age: 34, city: "Lyon", active: false },
  { name: "Claire", age: 22, city: "Marseille", active: true },
], null, 2);

export default function JSONToCSV() {
  const [input, setInput] = useState(SAMPLE);
  const [csv, setCsv] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function convert() {
    try {
      const result = jsonToCSV(input);
      setCsv(result);
      setError("");
    } catch (e) {
      setError(e.message);
      setCsv("");
    }
  }

  function download() {
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "data.csv";
    a.click(); URL.revokeObjectURL(url);
  }

  function copyCSV() {
    if (!csv) return;
    navigator.clipboard.writeText(csv).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const rowCount = csv ? csv.split("\n").length - 1 : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "JSON to CSV" }]} />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>JSON to CSV Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Paste a JSON array, convert to CSV, and download. Nested objects are flattened automatically.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
              JSON Input (array)
            </div>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setCsv(""); setError(""); }}
              rows={16}
              placeholder='[{"name": "Alice", "age": 28}, ...]'
              style={{ width: "100%", border: "none", padding: "14px", outline: "none", fontSize: "12px", fontFamily: "monospace", lineHeight: "1.5", resize: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ background: "white", border: `0.5px solid ${error ? "#FCA5A5" : "#E0E7FF"}`, borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `0.5px solid ${error ? "#FCA5A5" : "#E0E7FF"}`, background: error ? "#FFF5F5" : "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: "500", color: error ? "#EF4444" : "#374151" }}>
                {error ? "Error" : csv ? `CSV Output (${rowCount} rows)` : "CSV Output"}
              </span>
              {csv && (
                <div style={{ display: "flex", gap: "6px" }}>
                  <button onClick={copyCSV} style={{ padding: "4px 10px", borderRadius: "5px", border: "0.5px solid #C7D2FE", background: copied ? "#10B981" : "white", color: copied ? "white" : "#374151", fontSize: "11px", cursor: "pointer" }}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button onClick={download} style={{ padding: "4px 10px", borderRadius: "5px", border: "none", background: "#4F46E5", color: "white", fontSize: "11px", cursor: "pointer" }}>
                    ⬇ .csv
                  </button>
                </div>
              )}
            </div>
            {error ? (
              <div style={{ padding: "16px", fontSize: "13px", color: "#EF4444" }}>{error}</div>
            ) : (
              <textarea readOnly value={csv} placeholder="Click Convert to see CSV here..." rows={16} style={{ width: "100%", border: "none", padding: "14px", outline: "none", fontSize: "12px", fontFamily: "monospace", lineHeight: "1.5", resize: "none", boxSizing: "border-box", background: "#F8F9FF", color: "#1E1B4B" }} />
            )}
          </div>
        </div>

        <button onClick={convert} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", background: "#4F46E5", color: "white", fontSize: "15px", cursor: "pointer", fontWeight: "600" }}>
          Convert JSON → CSV
        </button>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "12px 16px", marginTop: "12px", fontSize: "12px", color: "#6B7280" }}>
          💡 Nested objects are flattened using dot notation (e.g. <code style={{ fontFamily: "monospace" }}>address.city</code>). Arrays are joined with semicolons.
        </div>
      </div>
      <Footer />
    </main>
  );
}
