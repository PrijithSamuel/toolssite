"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-SG"); }

const OO_BANDS = [
  { from: 0, to: 8000, rate: 0 },
  { from: 8000, to: 30000, rate: 0.04 },
  { from: 30000, to: 40000, rate: 0.06 },
  { from: 40000, to: 55000, rate: 0.10 },
  { from: 55000, to: 70000, rate: 0.14 },
  { from: 70000, to: 85000, rate: 0.20 },
  { from: 85000, to: 100000, rate: 0.26 },
  { from: 100000, to: Infinity, rate: 0.32 },
];

const NOO_BANDS = [
  { from: 0, to: 30000, rate: 0.12 },
  { from: 30000, to: 60000, rate: 0.20 },
  { from: 60000, to: 90000, rate: 0.28 },
  { from: 90000, to: Infinity, rate: 0.36 },
];

function calcTax(av, bands) {
  let tax = 0;
  const rows = [];
  for (const b of bands) {
    if (av <= b.from) break;
    const taxable = Math.min(av, b.to === Infinity ? av : b.to) - b.from;
    const t = taxable * b.rate;
    tax += t;
    if (taxable > 0) rows.push({ label: `S$${fmt(b.from + 1)} – ${b.to === Infinity ? "above" : "S$" + fmt(b.to)} @ ${(b.rate * 100).toFixed(0)}%`, taxable, tax: t });
  }
  return { tax: Math.round(tax), rows };
}

const AV_EXAMPLES = [
  { type: "HDB 3-room (typical)", av: 10000 },
  { type: "HDB 4-room (typical)", av: 14000 },
  { type: "HDB 5-room (typical)", av: 20000 },
  { type: "Condo (typical)", av: 40000 },
  { type: "Landed house (typical)", av: 70000 },
];

export default function SingaporePropertyTax() {
  const [avInput, setAvInput] = useState("20000");
  const [occupancy, setOccupancy] = useState("owner");

  const av = parseFloat(avInput) || 0;
  const bands = occupancy === "owner" ? OO_BANDS : NOO_BANDS;
  const { tax, rows } = av > 0 ? calcTax(av, bands) : { tax: 0, rows: [] };
  const monthlyTax = tax / 12;
  const effectiveRate = av > 0 ? (tax / av) * 100 : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Property Tax Singapore" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Property Tax Calculator Singapore 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate annual property tax based on Annual Value — owner-occupied and non-owner-occupied rates.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "12px", color: "#374151" }}>
          💡 <strong>Annual Value (AV)</strong> is the estimated annual rental value of your property if it were rented out, as determined by IRAS. Find your AV at <strong>mytax.iras.gov.sg</strong> → View Property Tax Balance.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Annual Value (AV) of Property (S$)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
              <input type="number" value={avInput} onChange={(e) => setAvInput(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 36px", outline: "none", background: "white", fontSize: "22px", fontWeight: "700", boxSizing: "border-box" }} />
            </div>
            <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "5px" }}>Typical Annual Values (click to use):</div>
            <div style={{ display: "flex", gap: "5px", marginTop: "5px", flexWrap: "wrap" }}>
              {AV_EXAMPLES.map((e) => (
                <button key={e.type} onClick={() => setAvInput(String(e.av))} style={{ padding: "4px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "10px", cursor: "pointer" }}>
                  {e.type} (S${fmt(e.av)})
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Property Occupancy</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { val: "owner", label: "Owner-Occupied (lower rates)" },
                { val: "non-owner", label: "Non-Owner-Occupied / Investment" },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => setOccupancy(val)} style={{ flex: 1, padding: "10px 12px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: occupancy === val ? "#4F46E5" : "white", color: occupancy === val ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {av > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Annual Property Tax", val: `S$${fmt(tax)}`, color: "#EF4444" },
                  { label: "Monthly Equivalent", val: `S$${fmt(monthlyTax)}`, color: "#374151" },
                  { label: "Effective Rate", val: `${effectiveRate.toFixed(2)}%`, color: "#4F46E5" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{i.label}</div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: i.color }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {rows.length > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "10px 20px", display: "grid", gridTemplateColumns: "1fr 100px 100px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                  <span>AV Band</span><span style={{ textAlign: "right" }}>Taxable AV</span><span style={{ textAlign: "right" }}>Tax</span>
                </div>
                {rows.map((r) => (
                  <div key={r.label} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 100px 100px", fontSize: "12px" }}>
                    <span style={{ color: "#374151" }}>{r.label}</span>
                    <span style={{ textAlign: "right", color: "#6B7280" }}>S${fmt(r.taxable)}</span>
                    <span style={{ textAlign: "right", color: "#EF4444", fontWeight: "500" }}>S${fmt(r.tax)}</span>
                  </div>
                ))}
                <div style={{ padding: "10px 20px", display: "grid", gridTemplateColumns: "1fr 100px 100px", fontSize: "13px", background: "#EEF2FF" }}>
                  <span style={{ fontWeight: "700", color: "#4F46E5" }}>Total Property Tax</span>
                  <span style={{ textAlign: "right", color: "#374151", fontWeight: "600" }}>S${fmt(av)}</span>
                  <span style={{ textAlign: "right", fontWeight: "700", color: "#EF4444" }}>S${fmt(tax)}</span>
                </div>
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Property tax is payable annually by 31 January. IRAS sends tax bills by December. Owner-occupied rates apply only to the dwelling unit you live in — apply for owner-occupier status at IRAS.gov.sg if eligible. HDB flat owners who live in their flats automatically enjoy owner-occupier rates.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
