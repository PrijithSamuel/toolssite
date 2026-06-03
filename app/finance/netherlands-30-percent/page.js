"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("nl-NL"); }
function fmtDec(n, d = 2) { return n.toLocaleString("nl-NL", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcBox1Tax(taxable) {
  if (taxable <= 75518) return taxable * 0.3582;
  return 75518 * 0.3582 + (taxable - 75518) * 0.495;
}

function calcAHK(income) {
  if (income <= 24813) return 3362;
  if (income >= 75518) return 0;
  return Math.max(0, 3362 - (income - 24813) * (3362 / (75518 - 24813)));
}

function calcArbeidskorting(income) {
  if (income <= 0) return 0;
  let ak = Math.min(income, 43000) * (5052 / 43000);
  if (income > 43000) ak = Math.max(0, 5052 - (income - 43000) * (5052 / (120000 - 43000)));
  return Math.max(0, ak);
}

function calcNet(gross, use30) {
  const taxable = use30 ? gross * 0.70 : gross;
  const tax = Math.max(0, calcBox1Tax(taxable) - calcAHK(taxable) - calcArbeidskorting(taxable));
  return { net: gross - tax, tax, taxable };
}

export default function Netherlands30Percent() {
  const [salaryInput, setSalaryInput] = useState("80000");
  const [isYoungMaster, setIsYoungMaster] = useState(false);

  const salary = parseFloat(salaryInput) || 0;
  const threshold = isYoungMaster ? 35048 : 46107;
  const eligible = salary >= threshold;

  const without = salary > 0 ? calcNet(salary, false) : null;
  const withRuling = salary > 0 ? calcNet(salary, true) : null;

  const freeAllowance = salary * 0.30;
  const annualSaving = without && withRuling ? withRuling.net - without.net : 0;
  const monthlySaving = annualSaving / 12;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "30% Ruling Netherlands" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>30% Ruling Calculator Netherlands 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your tax saving under the Dutch 30%-regeling for highly skilled migrants.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px", fontSize: "13px", color: "#374151" }}>
          <strong>What is the 30% ruling?</strong> Qualifying expats can receive 30% of their gross salary as a tax-free allowance for up to 5 years. The remaining 70% is taxed as normal Box 1 income.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Gross Annual Salary (€)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6B7280" }}>€</span>
              <input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                placeholder="80000"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 38px", outline: "none", background: "white", fontSize: "24px", fontWeight: "600", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Are you a young master&apos;s graduate (under 30)?</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setIsYoungMaster(false)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !isYoungMaster ? "#4F46E5" : "white", color: !isYoungMaster ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                No — threshold €46,107
              </button>
              <button onClick={() => setIsYoungMaster(true)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: isYoungMaster ? "#4F46E5" : "white", color: isYoungMaster ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                Yes — threshold €35,048
              </button>
            </div>
          </div>
        </div>

        {salary > 0 && (
          <>
            {/* Eligibility */}
            <div style={{ background: eligible ? "#ECFDF5" : "#FEF2F2", border: `0.5px solid ${eligible ? "#6EE7B7" : "#FCA5A5"}`, borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: eligible ? "#065F46" : "#B91C1C", marginBottom: "4px" }}>
                {eligible ? "✓ Likely eligible for 30% ruling" : "✗ Salary below minimum threshold"}
              </div>
              <div style={{ fontSize: "13px", color: eligible ? "#065F46" : "#B91C1C" }}>
                {eligible
                  ? `Your salary €${fmt(salary)} exceeds the ${isYoungMaster ? "young masters" : "standard"} minimum of €${fmt(threshold)}.`
                  : `Minimum salary required: €${fmt(threshold)}. You need €${fmt(threshold - salary)} more to qualify.`}
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "6px" }}>
                Additional requirements: you must be recruited from abroad, live more than 150km from the Dutch border before employment.
              </div>
            </div>

            {/* Comparison */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "16px" }}>Annual Tax Comparison</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                {[
                  { label: "Without 30% ruling", tax: without?.tax, net: without?.net, taxable: without?.taxable, highlight: false },
                  { label: "With 30% ruling", tax: withRuling?.tax, net: withRuling?.net, taxable: withRuling?.taxable, highlight: true },
                ].map((col) => (
                  <div key={col.label} style={{ background: col.highlight ? "white" : "#F0F0FF", borderRadius: "10px", padding: "16px", border: col.highlight ? "0.5px solid #A5B4FC" : "none" }}>
                    <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "10px" }}>{col.label}</div>
                    <div style={{ fontSize: "11px", color: "#6B7280" }}>Belastbaar inkomen</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>€{fmt(col.taxable)}</div>
                    <div style={{ fontSize: "11px", color: "#6B7280" }}>Income tax</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EF4444", marginBottom: "8px" }}>€{fmt(col.tax)}</div>
                    <div style={{ fontSize: "11px", color: "#6B7280" }}>Netto salaris</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: col.highlight ? "#4F46E5" : "#374151" }}>€{fmt(col.net)}</div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>€{fmt(col.net / 12)}/maand</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", borderRadius: "10px", padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {[
                  { label: "Tax-free allowance (30%)", val: `€${fmt(freeAllowance)}` },
                  { label: "Annual saving", val: `€${fmt(annualSaving)}` },
                  { label: "Monthly saving", val: `€${fmt(monthlySaving)}` },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#10B981" }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Key facts about the 30% ruling</div>
              {[
                "Maximum duration: 5 years (reduced from 8 in 2023)",
                "Applied via your employer — they pay you the 30% as a net allowance",
                "Also exempts from Box 2/3 on foreign assets during the period",
                "Can choose to be taxed as a non-resident (partial non-resident taxpayer)",
                "Apply within 4 months of starting your new Dutch job",
                "Salary check is done annually — must remain above threshold each year",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "8px", padding: "7px 0", borderBottom: "0.5px solid #F3F4F6", fontSize: "13px" }}>
                  <span style={{ color: "#4F46E5", flexShrink: 0 }}>→</span>
                  <span style={{ color: "#374151" }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Estimate based on 2025 Belastingdienst rates. The 30% ruling requires employer cooperation and formal approval from the Belastingdienst. Consult an expatriate tax specialist for your personal situation.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
