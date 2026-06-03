"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = undefined;

const TABS = ["Clothing Sizes", "Shoe Sizes", "Ring Sizes", "Paper Sizes"];

// EU clothing sizes → UK → US
const SHIRT_SIZES = [
  { eu: "XS / 44", uk: "XS / 14", us: "XS / 34" },
  { eu: "S / 46-48", uk: "S / 14.5-15", us: "S / 35-36" },
  { eu: "M / 50-52", uk: "M / 15.5-16", us: "M / 38-40" },
  { eu: "L / 54-56", uk: "L / 16.5-17", us: "L / 42-44" },
  { eu: "XL / 58-60", uk: "XL / 17.5-18", us: "XL / 46-48" },
  { eu: "XXL / 62", uk: "XXL / 18.5-19", us: "XXL / 50" },
];

const WOMENS_SIZES = [
  { eu: "34", uk: "6", us: "2" },
  { eu: "36", uk: "8", us: "4" },
  { eu: "38", uk: "10", us: "6" },
  { eu: "40", uk: "12", us: "8" },
  { eu: "42", uk: "14", us: "10" },
  { eu: "44", uk: "16", us: "12" },
  { eu: "46", uk: "18", us: "14" },
  { eu: "48", uk: "20", us: "16" },
];

// Shoe sizes EU → UK → US Men → US Women
const SHOE_SIZES = [
  { eu: 36, uk: 3.5, usM: 4.5, usW: 5.5 },
  { eu: 37, uk: 4, usM: 5, usW: 6 },
  { eu: 38, uk: 5, usM: 6, usW: 7 },
  { eu: 39, uk: 6, usM: 7, usW: 8 },
  { eu: 40, uk: 6.5, usM: 7.5, usW: 8.5 },
  { eu: 41, uk: 7.5, usM: 8.5, usW: 9.5 },
  { eu: 42, uk: 8, usM: 9, usW: 10 },
  { eu: 43, uk: 9, usM: 10, usW: 11 },
  { eu: 44, uk: 9.5, usM: 10.5, usW: 11.5 },
  { eu: 45, uk: 10.5, usM: 11.5, usW: 12.5 },
  { eu: 46, uk: 11, usM: 12, usW: 13 },
  { eu: 47, uk: 12, usM: 13, usW: 14 },
  { eu: 48, uk: 13, usM: 14, usW: 15 },
];

// Ring sizes: EU diameter mm → EU number → US → UK
const RING_SIZES = [
  { mm: 14.9, eu: 47, us: "4", uk: "H" },
  { mm: 15.3, eu: 48, us: "4.5", uk: "I" },
  { mm: 15.7, eu: 49, us: "5", uk: "J" },
  { mm: 16.1, eu: 51, us: "5.5", uk: "K" },
  { mm: 16.5, eu: 52, us: "6", uk: "L" },
  { mm: 16.9, eu: 53, us: "6.5", uk: "M" },
  { mm: 17.3, eu: 54, us: "7", uk: "N" },
  { mm: 17.7, eu: 56, us: "7.5", uk: "O" },
  { mm: 18.2, eu: 57, us: "8", uk: "P" },
  { mm: 18.6, eu: 58, us: "8.5", uk: "Q" },
  { mm: 19.0, eu: 60, us: "9", uk: "R" },
  { mm: 19.4, eu: 61, us: "9.5", uk: "S" },
  { mm: 19.8, eu: 62, us: "10", uk: "T" },
  { mm: 20.6, eu: 65, us: "11", uk: "V" },
  { mm: 21.4, eu: 67, us: "12", uk: "X" },
];

// Paper sizes mm → inches
const PAPER_SIZES = [
  { name: "A3", mm: "297 × 420", inches: "11.7 × 16.5", use: "Posters, technical drawings" },
  { name: "A4", mm: "210 × 297", inches: "8.3 × 11.7", use: "Standard documents, letters" },
  { name: "A5", mm: "148 × 210", inches: "5.8 × 8.3", use: "Notebooks, flyers" },
  { name: "A6", mm: "105 × 148", inches: "4.1 × 5.8", use: "Postcards, invitations" },
  { name: "Letter (US)", mm: "216 × 279", inches: "8.5 × 11", use: "US standard — not common in Germany" },
  { name: "Legal (US)", mm: "216 × 356", inches: "8.5 × 14", use: "US legal documents" },
  { name: "DL Envelope", mm: "110 × 220", inches: "4.3 × 8.7", use: "Fits A4 folded in thirds" },
];

export default function GermanUnits() {
  const [tab, setTab] = useState(0);
  const [clothingType, setClothingType] = useState("mens");

  const sizes = clothingType === "mens" ? SHIRT_SIZES : WOMENS_SIZES;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "German Unit Converter" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>German / EU Unit Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert clothing, shoe, ring and paper sizes between EU, UK and US standards.</p>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{ padding: "8px 16px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: tab === i ? "#4F46E5" : "white", color: tab === i ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Clothing */}
        {tab === 0 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: "0.5px solid #E0E7FF", display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginRight: "8px" }}>Type:</span>
              <button onClick={() => setClothingType("mens")} style={{ padding: "6px 14px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: clothingType === "mens" ? "#4F46E5" : "white", color: clothingType === "mens" ? "white" : "#374151", fontSize: "12px", cursor: "pointer" }}>Men&apos;s</button>
              <button onClick={() => setClothingType("womens")} style={{ padding: "6px 14px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: clothingType === "womens" ? "#4F46E5" : "white", color: clothingType === "womens" ? "white" : "#374151", fontSize: "12px", cursor: "pointer" }}>Women&apos;s</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: "11px", fontWeight: "600", color: "#6B7280", padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF" }}>
              <span>EU / DE</span><span>UK</span><span>US</span>
            </div>
            {sizes.map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "13px" }}>
                <span style={{ fontWeight: "600", color: "#4F46E5" }}>{r.eu}</span>
                <span style={{ color: "#374151" }}>{r.uk}</span>
                <span style={{ color: "#374151" }}>{r.us}</span>
              </div>
            ))}
          </div>
        )}

        {/* Shoes */}
        {tab === 1 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", fontSize: "11px", fontWeight: "600", color: "#6B7280", padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF" }}>
              <span>EU Size</span><span>UK</span><span>US Men</span><span>US Women</span>
            </div>
            {SHOE_SIZES.map((r) => (
              <div key={r.eu} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "13px" }}>
                <span style={{ fontWeight: "700", color: "#4F46E5", fontSize: "16px" }}>EU {r.eu}</span>
                <span style={{ color: "#374151" }}>UK {r.uk}</span>
                <span style={{ color: "#374151" }}>US {r.usM}</span>
                <span style={{ color: "#374151" }}>US {r.usW}</span>
              </div>
            ))}
          </div>
        )}

        {/* Ring sizes */}
        {tab === 2 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", fontSize: "12px", color: "#374151" }}>
              <strong>Tip:</strong> Measure the inner diameter of a ring that fits, or wrap a strip of paper around your finger and measure the circumference ÷ π.
            </div>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", fontSize: "11px", fontWeight: "600", color: "#6B7280", padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF" }}>
                <span>Diameter (mm)</span><span>EU Size</span><span>US Size</span><span>UK Size</span>
              </div>
              {RING_SIZES.map((r) => (
                <div key={r.eu} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "13px" }}>
                  <span style={{ fontWeight: "600", color: "#6B7280" }}>{r.mm} mm</span>
                  <span style={{ fontWeight: "700", color: "#4F46E5" }}>{r.eu}</span>
                  <span style={{ color: "#374151" }}>{r.us}</span>
                  <span style={{ color: "#374151" }}>{r.uk}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Paper sizes */}
        {tab === 3 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr", fontSize: "11px", fontWeight: "600", color: "#6B7280", padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF" }}>
              <span>Format</span><span>mm</span><span>Inches</span><span>Common use</span>
            </div>
            {PAPER_SIZES.map((r) => (
              <div key={r.name} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr", padding: "12px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "13px", alignItems: "start" }}>
                <span style={{ fontWeight: "700", color: "#4F46E5" }}>{r.name}</span>
                <span style={{ color: "#374151" }}>{r.mm}</span>
                <span style={{ color: "#374151" }}>{r.inches}</span>
                <span style={{ color: "#6B7280", fontSize: "12px" }}>{r.use}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
