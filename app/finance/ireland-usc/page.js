"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IE"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-IE", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const STANDARD_BANDS = [
  { from: 0, to: 12012, rate: 0.5, label: "0.5% on first €12,012" },
  { from: 12012, to: 25760, rate: 2, label: "2% on €12,013 – €25,760" },
  { from: 25760, to: 70044, rate: 4, label: "4% on €25,761 – €70,044" },
  { from: 70044, to: Infinity, rate: 8, label: "8% on balance above €70,044" },
];

const REDUCED_BANDS = [
  { from: 0, to: 12012, rate: 0.5, label: "0.5% on first €12,012" },
  { from: 12012, to: Infinity, rate: 2, label: "2% on balance (reduced rate)" },
];

function calcUSCBands(income, bands) {
  if (income <= 13000) return { total: 0, rows: [] };
  const rows = [];
  let total = 0;
  for (const b of bands) {
    if (income <= b.from) break;
    const taxable = Math.min(income, b.to) - b.from;
    const tax = taxable * (b.rate / 100);
    rows.push({ label: b.label, taxable, tax, rate: b.rate });
    total += tax;
  }
  return { total, rows };
}

export default function IrelandUSC() {
  const [incomeInput, setIncomeInput] = useState("55000");
  const [isOver70, setIsOver70] = useState(false);
  const [hasMedicalCard, setHasMedicalCard] = useState(false);

  const income = parseFloat(incomeInput) || 0;

  const useReduced = (isOver70 || hasMedicalCard) && income <= 60000;
  const bands = useReduced ? REDUCED_BANDS : STANDARD_BANDS;
  const { total: uscTotal, rows } = calcUSCBands(income, bands);

  const effectiveRate = income > 0 ? (uscTotal / income) * 100 : 0;
  const exempt = income <= 13000;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "USC Calculator Ireland" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>USC Calculator Ireland 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your Universal Social Charge with a full band-by-band breakdown.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Gross Annual Income (€)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6B7280" }}>€</span>
              <input
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                placeholder="55000"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 38px", outline: "none", background: "white", fontSize: "24px", fontWeight: "600", boxSizing: "border-box" }}
              />
            </div>
            {income <= 13000 && income > 0 && (
              <div style={{ fontSize: "12px", color: "#10B981", marginTop: "4px", fontWeight: "500" }}>✓ Exempt from USC (income under €13,000)</div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Age 70 or over?</label>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => setIsOver70(true)} style={{ flex: 1, padding: "8px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: isOver70 ? "#4F46E5" : "white", color: isOver70 ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Yes</button>
                <button onClick={() => setIsOver70(false)} style={{ flex: 1, padding: "8px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: !isOver70 ? "#4F46E5" : "white", color: !isOver70 ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>No</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Full medical card?</label>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => setHasMedicalCard(true)} style={{ flex: 1, padding: "8px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: hasMedicalCard ? "#4F46E5" : "white", color: hasMedicalCard ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Yes</button>
                <button onClick={() => setHasMedicalCard(false)} style={{ flex: 1, padding: "8px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: !hasMedicalCard ? "#4F46E5" : "white", color: !hasMedicalCard ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>No</button>
              </div>
            </div>
          </div>

          {useReduced && income <= 60000 && (
            <div style={{ marginTop: "12px", background: "#ECFDF5", border: "0.5px solid #6EE7B7", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", color: "#065F46" }}>
              ✓ Reduced USC rates apply (age 70+ or medical card holder with income ≤ €60,000)
            </div>
          )}
          {(isOver70 || hasMedicalCard) && income > 60000 && (
            <div style={{ marginTop: "12px", background: "#FEF9EC", border: "0.5px solid #FCD34D", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", color: "#92400E" }}>
              ⚠️ Income exceeds €60,000 — standard USC rates apply even with age/medical card exemption.
            </div>
          )}
        </div>

        {income > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total USC / Year</div>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: exempt ? "#10B981" : "#EF4444" }}>{exempt ? "€0" : `€${fmt(uscTotal)}`}</div>
                  {exempt && <div style={{ fontSize: "12px", color: "#10B981" }}>Exempt</div>}
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>USC / Month</div>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: "#374151" }}>€{fmt(uscTotal / 12)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Effective Rate</div>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: "#374151" }}>{fmtDec(effectiveRate, 2)}%</div>
                </div>
              </div>
            </div>

            {!exempt && rows.length > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 110px 110px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF" }}>
                  <span>USC Band</span><span style={{ textAlign: "right" }}>Taxable</span><span style={{ textAlign: "right" }}>USC</span>
                </div>
                {rows.map((r) => (
                  <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 110px 110px", fontSize: "13px" }}>
                    <span style={{ color: "#374151" }}>{r.label}</span>
                    <span style={{ textAlign: "right", color: "#6B7280" }}>€{fmt(r.taxable)}</span>
                    <span style={{ textAlign: "right", color: "#EF4444", fontWeight: "500" }}>€{fmt(r.tax)}</span>
                  </div>
                ))}
                <div style={{ padding: "11px 20px", display: "grid", gridTemplateColumns: "1fr 110px 110px", fontSize: "13px", background: "#EEF2FF" }}>
                  <span style={{ fontWeight: "700", color: "#4F46E5" }}>Total USC</span>
                  <span style={{ textAlign: "right", fontWeight: "600", color: "#374151" }}>€{fmt(income)}</span>
                  <span style={{ textAlign: "right", fontWeight: "700", color: "#EF4444" }}>€{fmt(uscTotal)}</span>
                </div>
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ USC rates for 2025 per Revenue Ireland. USC applies to all income including rental income, dividends and foreign income. For PAYE employees, USC is deducted at source by the employer.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
