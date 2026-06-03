"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PROVINCES = [
  { code: "ON", name: "Ontario", gst: 0, hst: 0.13, pst: 0, label: "13% HST" },
  { code: "BC", name: "British Columbia", gst: 0.05, hst: 0, pst: 0.07, label: "5% GST + 7% PST" },
  { code: "AB", name: "Alberta", gst: 0.05, hst: 0, pst: 0, label: "5% GST only" },
  { code: "QC", name: "Quebec", gst: 0.05, hst: 0, pst: 0.09975, pstLabel: "QST", label: "5% GST + 9.975% QST" },
  { code: "NS", name: "Nova Scotia", gst: 0, hst: 0.15, pst: 0, label: "15% HST" },
  { code: "NB", name: "New Brunswick", gst: 0, hst: 0.15, pst: 0, label: "15% HST" },
  { code: "PE", name: "Prince Edward Island", gst: 0, hst: 0.15, pst: 0, label: "15% HST" },
  { code: "NL", name: "Newfoundland & Labrador", gst: 0, hst: 0.15, pst: 0, label: "15% HST" },
  { code: "MB", name: "Manitoba", gst: 0.05, hst: 0, pst: 0.07, label: "5% GST + 7% PST" },
  { code: "SK", name: "Saskatchewan", gst: 0.05, hst: 0, pst: 0.06, label: "5% GST + 6% PST" },
  { code: "YT", name: "Yukon", gst: 0.05, hst: 0, pst: 0, label: "5% GST only" },
  { code: "NT", name: "Northwest Territories", gst: 0.05, hst: 0, pst: 0, label: "5% GST only" },
  { code: "NU", name: "Nunavut", gst: 0.05, hst: 0, pst: 0, label: "5% GST only" },
];

const QUICK = [10, 25, 50, 100, 250, 500, 1000];

export default function CanadaHSTReverse() {
  const [totalInput, setTotalInput] = useState("113");
  const [provinceCode, setProvinceCode] = useState("ON");

  const total = parseFloat(totalInput) || 0;
  const prov = PROVINCES.find((p) => p.code === provinceCode);
  const totalRate = prov ? prov.hst || (prov.gst + prov.pst) : 0;

  const preTax = totalRate > 0 ? total / (1 + totalRate) : total;
  const taxAmount = total - preTax;

  const gstAmount = prov?.hst ? 0 : preTax * (prov?.gst || 0);
  const pstAmount = prov?.pst ? preTax * prov.pst : 0;
  const hstAmount = prov?.hst ? taxAmount : 0;

  function fmt(n) { return n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "HST Reverse Calculator" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>HST Reverse Calculator Canada</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Remove tax from a total price — find the pre-tax amount and exact HST/GST/PST for any province.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "12px", color: "#374151" }}>
          Perfect for <strong>expense reports</strong>, <strong>bookkeeping</strong>, and <strong>CRA input tax credits (ITCs)</strong> — enter the total on your receipt and get the exact tax amount.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Total Amount (tax included) $</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "22px", color: "#6B7280" }}>$</span>
              <input
                type="number"
                value={totalInput}
                onChange={(e) => setTotalInput(e.target.value)}
                placeholder="113.00"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "14px 14px 14px 42px", outline: "none", background: "white", fontSize: "28px", fontWeight: "700", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setTotalInput(String(q))} style={{ padding: "5px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "11px", cursor: "pointer" }}>
                  ${q}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "7px" }}>Province / Territory</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
              {PROVINCES.map((p) => (
                <button key={p.code} onClick={() => setProvinceCode(p.code)} style={{ padding: "9px 12px", borderRadius: "8px", border: `0.5px solid ${provinceCode === p.code ? "#A5B4FC" : "#C7D2FE"}`, background: provinceCode === p.code ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: provinceCode === p.code ? "#4F46E5" : "#1E1B4B" }}>{p.name}</span>
                  <span style={{ fontSize: "11px", color: "#9CA3AF", marginLeft: "6px" }}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {total > 0 && prov && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr" }}>
                {[
                  { label: "Pre-tax amount", value: `$${fmt(preTax)}`, color: "#4F46E5", sub: "Before tax" },
                  null,
                  { label: `Tax (${(totalRate * 100).toFixed(3).replace(/\.?0+$/, "")}%)`, value: `$${fmt(taxAmount)}`, color: "#EF4444", sub: prov.hst ? "HST" : "GST + PST" },
                  null,
                  { label: "Total paid", value: `$${fmt(total)}`, color: "#374151", sub: "Your receipt" },
                ].map((item, i) =>
                  item === null ? <div key={i} style={{ background: "#C7D2FE" }} /> : (
                    <div key={item.label} style={{ textAlign: "center", padding: "0 8px" }}>
                      <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>{item.label}</div>
                      <div style={{ fontSize: "26px", fontWeight: "700", color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{item.sub}</div>
                    </div>
                  )
                )}
              </div>

              {prov.gst > 0 && prov.pst > 0 && (
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>GST (5%) — claim as ITC</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#EF4444" }}>${fmt(gstAmount)}</div>
                  </div>
                  <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{prov.pstLabel || "PST"} ({(prov.pst * 100).toFixed(3).replace(/\.?0+$/, "")}%) — not claimable</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#F97316" }}>${fmt(pstAmount)}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Same receipt in every province</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                {[0.05, 0.12, 0.13, 0.14975, 0.15].map((r) => {
                  const pt = total / (1 + r);
                  const ta = total - pt;
                  return (
                    <div key={r} style={{ background: Math.abs(r - totalRate) < 0.0001 ? "#EEF2FF" : "#F8F9FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{(r * 100).toFixed(3).replace(/\.?0+$/, "")}% rate</div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#EF4444" }}>Tax: ${fmt(ta)}</div>
                      <div style={{ fontSize: "12px", color: "#4F46E5" }}>Pre-tax: ${fmt(pt)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
