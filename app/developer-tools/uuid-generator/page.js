"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const COUNTS = [1, 5, 10, 25, 50];

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState([generateUUID()]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  function generate(count) {
    setUuids(Array.from({ length: count }, generateUUID));
    setCopiedIndex(null);
    setCopiedAll(false);
  }

  function copyOne(uuid, idx) {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "UUID Generator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>UUID Generator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Generate cryptographically random UUID v4 values instantly.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Generate</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {COUNTS.map((n) => (
              <button
                key={n}
                onClick={() => generate(n)}
                style={{ padding: "8px 18px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: uuids.length === n ? "#4F46E5" : "white", color: uuids.length === n ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}
              >
                {n === 1 ? "1 UUID" : `${n} UUIDs`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>
              {uuids.length} UUID{uuids.length !== 1 ? "s" : ""} generated
            </div>
            {uuids.length > 1 && (
              <button
                onClick={copyAll}
                style={{ padding: "6px 14px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copiedAll ? "#10B981" : "white", color: copiedAll ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}
              >
                {copiedAll ? "Copied all!" : "Copy all"}
              </button>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {uuids.map((uuid, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F8F9FF", border: "0.5px solid #E0E7FF", borderRadius: "8px", padding: "10px 14px" }}>
                <code style={{ flex: 1, fontSize: "13px", color: "#1E1B4B", fontFamily: "monospace", letterSpacing: "0.3px" }}>{uuid}</code>
                <button
                  onClick={() => copyOne(uuid, idx)}
                  style={{ padding: "4px 10px", borderRadius: "5px", border: "0.5px solid #C7D2FE", background: copiedIndex === idx ? "#10B981" : "white", color: copiedIndex === idx ? "white" : "#374151", fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {copiedIndex === idx ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>About UUID v4</div>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: "1.6" }}>
            UUID v4 uses random (or pseudo-random) data to ensure uniqueness. Generated with <code style={{ background: "white", padding: "1px 5px", borderRadius: "4px", fontSize: "12px" }}>crypto.randomUUID()</code> for cryptographic quality.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
