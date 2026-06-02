"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const timezones = [
  { label: "UTC", value: "UTC" },
  { label: "US Eastern (ET)", value: "America/New_York" },
  { label: "US Central (CT)", value: "America/Chicago" },
  { label: "US Mountain (MT)", value: "America/Denver" },
  { label: "US Pacific (PT)", value: "America/Los_Angeles" },
  { label: "London (GMT/BST)", value: "Europe/London" },
  { label: "Paris (CET/CEST)", value: "Europe/Paris" },
  { label: "Dubai (GST)", value: "Asia/Dubai" },
  { label: "India (IST)", value: "Asia/Kolkata" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "Sydney (AEST/AEDT)", value: "Australia/Sydney" },
];

function getUTCOffsetMinutes(timezone, date) {
  const utcStr = date.toLocaleString("en-US", { timeZone: "UTC", hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const tzStr = date.toLocaleString("en-US", { timeZone: timezone, hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const utcDate = new Date(utcStr.replace(/(\d+)\/(\d+)\/(\d+),/, "$3-$1-$2"));
  const tzDate = new Date(tzStr.replace(/(\d+)\/(\d+)\/(\d+),/, "$3-$1-$2"));
  return (tzDate - utcDate) / 60000;
}

function convertTime(datetimeLocal, fromTZ, toTZ) {
  if (!datetimeLocal) return null;
  try {
    const inputAsUTC = new Date(datetimeLocal + ":00Z");
    const fromOffset = getUTCOffsetMinutes(fromTZ, inputAsUTC);
    const trueUTC = new Date(inputAsUTC.getTime() - fromOffset * 60000);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: toTZ,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(trueUTC);
  } catch {
    return null;
  }
}

function getOffsetLabel(tz) {
  try {
    const now = new Date();
    const offset = getUTCOffsetMinutes(tz, now);
    const sign = offset >= 0 ? "+" : "-";
    const abs = Math.abs(offset);
    const h = Math.floor(abs / 60).toString().padStart(2, "0");
    const m = (abs % 60).toString().padStart(2, "0");
    return `UTC${sign}${h}:${m}`;
  } catch {
    return "";
  }
}

export default function TimezoneConverter() {
  const now = new Date();
  const defaultDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const [datetime, setDatetime] = useState(defaultDateTime);
  const [fromTZ, setFromTZ] = useState("UTC");
  const [toTZ, setToTZ] = useState("America/New_York");

  const result = convertTime(datetime, fromTZ, toTZ);

  function swapTimezones() {
    setFromTZ(toTZ);
    setToTZ(fromTZ);
  }

  const selectStyle = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "Time Zone Converter" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Time Zone Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert a date and time between any two time zones instantly.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Date & Time</label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "end" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                From — <span style={{ fontWeight: "400", color: "#6366F1" }}>{getOffsetLabel(fromTZ)}</span>
              </label>
              <select value={fromTZ} onChange={(e) => setFromTZ(e.target.value)} style={selectStyle}>
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={swapTimezones}
              title="Swap timezones"
              style={{ width: "40px", height: "40px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              ⇄
            </button>

            <div>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                To — <span style={{ fontWeight: "400", color: "#6366F1" }}>{getOffsetLabel(toTZ)}</span>
              </label>
              <select value={toTZ} onChange={(e) => setToTZ(e.target.value)} style={selectStyle}>
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Converted Time</div>
            <div style={{ fontSize: "28px", fontWeight: "500", color: "#4F46E5", marginBottom: "4px" }}>{result}</div>
            <div style={{ fontSize: "13px", color: "#6B7280" }}>
              {timezones.find((t) => t.value === toTZ)?.label}
            </div>
          </div>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>How to use</div>
          <ul style={{ fontSize: "13px", color: "#6B7280", paddingLeft: "16px", margin: 0 }}>
            <li style={{ marginBottom: "4px" }}>Select a date and time in the input field</li>
            <li style={{ marginBottom: "4px" }}>Choose the source timezone in the From dropdown</li>
            <li style={{ marginBottom: "4px" }}>Choose the target timezone in the To dropdown</li>
            <li>Use the ⇄ button to quickly swap the two timezones</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
