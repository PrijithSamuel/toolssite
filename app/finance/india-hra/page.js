"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(Math.abs(n)).toLocaleString("en-IN"); }

const introStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"20px", marginBottom:"20px", fontSize:"14px", color:"#4B5563", lineHeight:"1.85" };

export default function IndiaHRA() {
  const [basic, setBasic] = useState("50000");
  const [hraReceived, setHraReceived] = useState("25000");
  const [rentPaid, setRentPaid] = useState("20000");
  const [isMetro, setIsMetro] = useState(true);
  const [taxSlab, setTaxSlab] = useState(30);

  const basicVal = parseFloat(basic) || 0;
  const hraVal = parseFloat(hraReceived) || 0;
  const rentVal = parseFloat(rentPaid) || 0;

  // Annual figures
  const annualBasic = basicVal * 12;
  const annualHRA = hraVal * 12;
  const annualRent = rentVal * 12;

  const limit1 = annualHRA;
  const limit2 = annualBasic * (isMetro ? 0.50 : 0.40);
  const limit3 = Math.max(0, annualRent - annualBasic * 0.10);

  const exemption = Math.max(0, Math.min(limit1, limit2, limit3));
  const taxableHRA = annualHRA - exemption;
  const taxSaving = exemption * (taxSlab / 100);

  const minLabel = [
    { val: limit1, label: "Actual HRA received" },
    { val: limit2, label: `${isMetro ? "50%" : "40%"} of Basic (${isMetro ? "Metro" : "Non-Metro"})` },
    { val: limit3, label: "Rent paid − 10% of Basic" },
  ].find((l) => Math.abs(l.val - exemption) < 1);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "HRA Calculator India" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>HRA Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your HRA exemption — the minimum of 3 conditions under Section 10(13A).</p>
        </div>

        <div style={introStyle}>
          House Rent Allowance (HRA) is a component of salary provided by employers to employees living in rented accommodation. Under the Indian Income Tax Act, a portion of HRA received from an employer is exempt from income tax — but the exempt amount is not simply the full HRA. It is the minimum of three separately calculated values: the actual HRA received, a percentage of basic salary (50% for metro cities, 40% for non-metro), and actual rent paid minus 10% of basic salary. This three-way minimum calculation means many salaried employees claim less HRA exemption than they are entitled to, or incorrectly calculate their taxable HRA. This calculator automates all three calculations simultaneously and shows which of the three limits applies in your specific situation, along with the resulting annual tax saving at each applicable tax slab rate.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            {[
              { label: "Basic Salary (monthly ₹)", val: basic, set: setBasic },
              { label: "HRA Received (monthly ₹)", val: hraReceived, set: setHraReceived },
              { label: "Actual Rent Paid (monthly ₹)", val: rentPaid, set: setRentPaid },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>{f.label}</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280", fontSize: "14px" }}>₹</span>
                  <input type="number" value={f.val} onChange={(e) => f.set(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 26px", outline: "none", background: "white", fontSize: "16px", fontWeight: "500", boxSizing: "border-box" }} />
                </div>
              </div>
            ))}
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Tax Slab</label>
              <div style={{ display: "flex", gap: "6px" }}>
                {[10, 20, 30].map((s) => <button key={s} onClick={() => setTaxSlab(s)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: taxSlab === s ? "#4F46E5" : "white", color: taxSlab === s ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>{s}%</button>)}
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>City Type</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setIsMetro(true)} style={{ flex: 1, padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: isMetro ? "#4F46E5" : "white", color: isMetro ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                Metro (50%) — Mumbai, Delhi, Chennai, Kolkata
              </button>
              <button onClick={() => setIsMetro(false)} style={{ flex: 1, padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !isMetro ? "#4F46E5" : "white", color: !isMetro ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                Non-Metro (40%) — All other cities
              </button>
            </div>
          </div>
        </div>

        {basicVal > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>HRA Exemption</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#10B981" }}>₹{fmt(exemption)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Annual tax-free</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Taxable HRA</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#EF4444" }}>₹{fmt(taxableHRA)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Added to income</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#4F46E5", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Tax Saved</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5" }}>₹{fmt(taxSaving)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>@ {taxSlab}% + cess</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                HRA Exemption = Minimum of 3 Conditions (Annual)
              </div>
              {[
                { label: "① Actual HRA received", val: limit1, isMin: Math.abs(limit1 - exemption) < 1 },
                { label: `② ${isMetro ? "50%" : "40%"} of annual Basic Salary`, val: limit2, isMin: Math.abs(limit2 - exemption) < 1 },
                { label: "③ Annual Rent − 10% of annual Basic", val: limit3, isMin: Math.abs(limit3 - exemption) < 1 },
              ].map((r) => (
                <div key={r.label} style={{ padding: "12px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center", background: r.isMin ? "#F5F3FF" : "white" }}>
                  <span style={{ fontSize: "13px", color: "#374151" }}>{r.label} {r.isMin && <span style={{ fontSize: "10px", background: "#EEF2FF", color: "#4F46E5", padding: "1px 6px", borderRadius: "4px", marginLeft: "6px" }}>MINIMUM → EXEMPTION</span>}</span>
                  <span style={{ fontSize: "14px", fontWeight: r.isMin ? "700" : "500", color: r.isMin ? "#4F46E5" : "#374151" }}>₹{fmt(r.val)}</span>
                </div>
              ))}
              <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", background: "#EEF2FF", fontSize: "13px" }}>
                <span style={{ fontWeight: "700", color: "#4F46E5" }}>✓ HRA Exemption (annual)</span>
                <span style={{ fontWeight: "700", color: "#10B981", fontSize: "16px" }}>₹{fmt(exemption)}</span>
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ HRA exemption is available only for salaried individuals under the Old Tax Regime. Rent receipts must be preserved. PAN of landlord is required if monthly rent exceeds ₹1,00,000. Claim via Form 16 or ITR filing.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
