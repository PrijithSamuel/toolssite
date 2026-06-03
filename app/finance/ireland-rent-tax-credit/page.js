"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IE"); }
function fmtDec(n) { return n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

export default function IrelandRentTaxCredit() {
  const [rentInput, setRentInput] = useState("15000");
  const [taxStatus, setTaxStatus] = useState("single");

  const annualRent = parseFloat(rentInput) || 0;
  const maxCredit = taxStatus === "jointly" ? 2000 : 1000;
  const rawCredit = annualRent * 0.20;
  const credit = Math.min(maxCredit, rawCredit);
  const monthlyImprovement = credit / 12;
  const cappedByMax = rawCredit > maxCredit;
  const rentForFullCredit = maxCredit / 0.20;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Rent Tax Credit Ireland" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Rent Tax Credit Calculator Ireland 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Introduced in Budget 2023 — claim 20% of your rent as a tax credit via Revenue myAccount.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Annual Rent Paid (€)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6B7280" }}>€</span>
              <input
                type="number"
                value={rentInput}
                onChange={(e) => setRentInput(e.target.value)}
                placeholder="15000"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 38px", outline: "none", background: "white", fontSize: "24px", fontWeight: "600", boxSizing: "border-box" }}
              />
            </div>
            {annualRent > 0 && <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>= €{fmt(annualRent / 12)}/month</div>}
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Tax Assessment Status</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { val: "single", label: "Single / Separately Assessed", sub: "Max credit: €1,000" },
                { val: "jointly", label: "Jointly Assessed (couple)", sub: "Max credit: €2,000" },
              ].map(({ val, label, sub }) => (
                <button key={val} onClick={() => setTaxStatus(val)} style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: `0.5px solid ${taxStatus === val ? "#A5B4FC" : "#C7D2FE"}`, background: taxStatus === val ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: taxStatus === val ? "#4F46E5" : "#1E1B4B" }}>{label}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {annualRent > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Your Rent Tax Credit</div>
                  <div style={{ fontSize: "48px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(credit)}</div>
                  <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>per year</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ background: "white", borderRadius: "8px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Monthly tax saving</div>
                    <div style={{ fontSize: "22px", fontWeight: "700", color: "#10B981" }}>€{fmtDec(monthlyImprovement)}</div>
                  </div>
                  <div style={{ background: "white", borderRadius: "8px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Credit rate</div>
                    <div style={{ fontSize: "22px", fontWeight: "700", color: "#374151" }}>20%</div>
                  </div>
                </div>
              </div>

              {cappedByMax && (
                <div style={{ background: "white", borderRadius: "8px", padding: "12px 16px", fontSize: "12px", color: "#374151" }}>
                  <strong>Capped at maximum:</strong> Your 20% of €{fmt(annualRent)} = €{fmt(rawCredit)}, but the limit for {taxStatus === "jointly" ? "jointly assessed couples" : "single/separate assessment"} is €{fmt(maxCredit)}.
                  {" "}The full credit is reached at €{fmt(rentForFullCredit)}/year rent.
                </div>
              )}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "14px" }}>How to Claim</div>
              {[
                { step: "1", text: "Log in to Revenue myAccount at myaccount.revenue.ie" },
                { step: "2", text: "Go to 'Manage Your Tax 2025' → Add a tax credit" },
                { step: "3", text: "Select 'Rent Tax Credit' and enter your annual rent and landlord details" },
                { step: "4", text: "Revenue will adjust your tax credits and refund any overpaid tax" },
                { step: "5", text: "You can claim for 2022, 2023, 2024 and 2025 in your annual tax return" },
              ].map(({ step, text }) => (
                <div key={step} style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#4F46E5", color: "white", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step}</div>
                  <div style={{ fontSize: "13px", color: "#374151", paddingTop: "3px" }}>{text}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Eligibility Requirements</div>
              {[
                "You must be a tenant paying rent to a private landlord",
                "The property must be your principal private residence",
                "You cannot claim if renting from a parent or relative",
                "Student renters: you can claim if you rent off-campus",
                "Rent-a-room scheme: tenants (not landlords) can claim",
                "Available for years 2022 onwards — backdated claims allowed",
              ].map((item) => (
                <div key={item} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "13px", color: "#374151", display: "flex", gap: "8px" }}>
                  <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span> {item}
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Based on Budget 2025 rates. The credit was introduced in Budget 2023 and extended annually. Always verify current eligibility at revenue.ie.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
