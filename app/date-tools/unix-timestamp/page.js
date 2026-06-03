"use client";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function formatDate(ts) {
  try {
    const d = new Date(parseInt(ts) * 1000);
    if (isNaN(d.getTime())) return null;
    return {
      utc: d.toUTCString(),
      local: d.toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      iso: d.toISOString(),
    };
  } catch { return null; }
}

function dateToTs(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return Math.floor(d.getTime() / 1000);
  } catch { return null; }
}

function toLocalInputValue(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function UnixTimestamp() {
  const [currentTs, setCurrentTs] = useState(0);
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    setCurrentTs(Math.floor(Date.now() / 1000));
    setDateInput(toLocalInputValue(new Date()));
    const interval = setInterval(() => setCurrentTs(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const tsResult = tsInput ? formatDate(tsInput) : null;
  const dateTs = dateInput ? dateToTs(dateInput) : null;

  function copyText(text, key) {
    navigator.clipboard.writeText(String(text)).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function CopyBtn({ value, id }) {
    return (
      <button onClick={() => copyText(value, id)} style={{ padding: "4px 10px", borderRadius: "5px", border: "0.5px solid #C7D2FE", background: copied === id ? "#10B981" : "white", color: copied === id ? "white" : "#374151", fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap" }}>
        {copied === id ? "Copied" : "Copy"}
      </button>
    );
  }

  const inp = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box", fontFamily: "monospace" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Date Tools", href: "/date-tools" }, { label: "Unix Timestamp" }]} />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Unix Timestamp Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert between Unix timestamps and human-readable dates.</p>
        </div>

        {/* Current timestamp */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Current Unix Timestamp</span>
            <CopyBtn value={currentTs} id="current" />
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "36px", fontWeight: "300", color: "#4F46E5" }}>{currentTs}</div>
          <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>Updates every second · seconds since Jan 1, 1970 UTC</div>
        </div>

        {/* Timestamp → Date */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Unix Timestamp → Human Date</div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <input type="number" value={tsInput} onChange={(e) => setTsInput(e.target.value)} placeholder="e.g. 1700000000" style={{ ...inp, flex: 1 }} />
            <button onClick={() => setTsInput(String(currentTs))} style={{ padding: "10px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", fontSize: "12px", cursor: "pointer", color: "#374151", whiteSpace: "nowrap" }}>Use Now</button>
          </div>
          {tsResult && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[["Local", tsResult.local, "local"], ["UTC", tsResult.utc, "utc"], ["ISO 8601", tsResult.iso, "iso"]].map(([label, value, id]) => (
                <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#F8F9FF", borderRadius: "8px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" }}>{label}</div>
                    <div style={{ fontSize: "13px", color: "#1E1B4B", fontFamily: "monospace" }}>{value}</div>
                  </div>
                  <CopyBtn value={value} id={id} />
                </div>
              ))}
            </div>
          )}
          {tsInput && !tsResult && <div style={{ fontSize: "12px", color: "#EF4444" }}>Invalid timestamp</div>}
        </div>

        {/* Date → Timestamp */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Date & Time → Unix Timestamp</div>
          <input type="datetime-local" value={dateInput} onChange={(e) => setDateInput(e.target.value)} style={inp} />
          {dateTs !== null && (
            <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#EEF2FF", borderRadius: "8px" }}>
              <div>
                <div style={{ fontSize: "11px", color: "#6366F1", marginBottom: "2px" }}>Unix Timestamp</div>
                <div style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: "500", color: "#4F46E5" }}>{dateTs}</div>
              </div>
              <CopyBtn value={dateTs} id="dateTs" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
