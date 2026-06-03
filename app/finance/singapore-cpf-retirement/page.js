"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-SG"); }

const BRS = 106500;
const FRS = 213000;
const ERS = 426000;

const CPF_LIFE_PAYOUTS = {
  brs: { min: 900, max: 1000 },
  frs: { min: 1650, max: 1800 },
  ers: { min: 2450, max: 2650 },
};

const SA_INTEREST = 0.04;
const OA_INTEREST = 0.025;

function projectBalance(current, annualContrib, years, rate) {
  let bal = current;
  for (let y = 0; y < years; y++) bal = (bal + annualContrib) * (1 + rate);
  return bal;
}

export default function SingaporeCPFRetirement() {
  const [currentAge, setCurrentAge] = useState("35");
  const [oaBalance, setOaBalance] = useState("80000");
  const [saBalance, setSaBalance] = useState("30000");
  const [monthlySalary, setMonthlySalary] = useState("5000");

  const age = parseInt(currentAge) || 35;
  const oa = parseFloat(oaBalance) || 0;
  const sa = parseFloat(saBalance) || 0;
  const salary = parseFloat(monthlySalary) || 0;

  const yearsto55 = Math.max(0, 55 - age);
  const yearsTo65 = Math.max(0, 65 - age);

  // Monthly CPF contributions (assuming age <= 55, 20% emp + 17% empr)
  const monthlySAContrib = Math.min(salary, 7400) * 0.06; // SA allocation ~6%
  const monthlyOAContrib = Math.min(salary, 7400) * 0.23; // OA allocation ~23%
  const annualSA = monthlySAContrib * 12;
  const annualOA = monthlyOAContrib * 12;

  const projSA55 = projectBalance(sa, annualSA, yearsto55, SA_INTEREST);
  const projOA55 = projectBalance(oa, annualOA, yearsto55, OA_INTEREST);
  const totalAt55 = Math.round(projSA55 + projOA55);

  // At 55, SA is transferred to RA (Retirement Account)
  const raBalance = Math.min(totalAt55, FRS);

  // Project RA to 65 (at 4%)
  const projRA65 = projectBalance(raBalance, 0, 10, SA_INTEREST);

  const metBRS = projRA65 >= BRS;
  const metFRS = projRA65 >= FRS;
  const metERS = projRA65 >= ERS;

  const retirementTier = metERS ? "ers" : metFRS ? "frs" : metBRS ? "brs" : "below_brs";
  const payout = retirementTier !== "below_brs" ? CPF_LIFE_PAYOUTS[retirementTier] : null;

  const shortfall = !metFRS ? Math.max(0, FRS - projRA65) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "CPF Retirement Sum Singapore" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>CPF Retirement Sum Calculator Singapore 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Project your CPF balance at 55 and estimated CPF LIFE monthly payout at 65.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>2025 CPF Retirement Sums</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {[
              { label: "Basic (BRS)", val: BRS, payout: "~S$900–1,000/mo", color: "#6366F1" },
              { label: "Full (FRS)", val: FRS, payout: "~S$1,650–1,800/mo", color: "#4F46E5" },
              { label: "Enhanced (ERS)", val: ERS, payout: "~S$2,450–2,650/mo", color: "#7C3AED" },
            ].map((r) => (
              <div key={r.label} style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{r.label}</div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: r.color }}>S${fmt(r.val)}</div>
                <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{r.payout}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Current Age</label>
              <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Monthly Salary (S$)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 34px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>CPF Ordinary Account (OA) Balance (S$)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={oaBalance} onChange={(e) => setOaBalance(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 34px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>CPF Special Account (SA) Balance (S$)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={saBalance} onChange={(e) => setSaBalance(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 34px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
        </div>

        {(oa > 0 || sa > 0) && age < 65 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Projected CPF at Age 55</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5" }}>S${fmt(totalAt55)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>OA + SA after {yearsto55} years</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Projected RA at Age 65</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: metFRS ? "#10B981" : "#F97316" }}>S${fmt(projRA65)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>RA growing at 4% for 10 years</div>
                </div>
              </div>

              {/* Retirement sum status */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { label: "Basic Retirement Sum (BRS)", target: BRS, met: metBRS },
                  { label: "Full Retirement Sum (FRS)", target: FRS, met: metFRS },
                  { label: "Enhanced Retirement Sum (ERS)", target: ERS, met: metERS },
                ].map((r) => (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", borderRadius: "8px", padding: "10px 14px" }}>
                    <span style={{ fontSize: "12px", color: "#374151" }}>{r.label} — S${fmt(r.target)}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: r.met ? "#10B981" : "#EF4444" }}>{r.met ? "✓ Met" : "✗ Not met"}</span>
                  </div>
                ))}
              </div>
            </div>

            {payout && (
              <div style={{ background: "#ECFDF5", border: "0.5px solid #6EE7B7", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#065F46", marginBottom: "8px" }}>
                  ✓ CPF LIFE Estimated Monthly Payout at 65 ({retirementTier.toUpperCase()} plan)
                </div>
                <div style={{ fontSize: "36px", fontWeight: "700", color: "#10B981" }}>
                  S${fmt(payout.min)} – S${fmt(payout.max)}/month
                </div>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>For life (annuity from age 65 onwards)</div>
              </div>
            )}

            {shortfall > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Shortfall & Top-Up Strategies</div>
                <div style={{ background: "#FEF9EC", borderRadius: "8px", padding: "12px 14px", marginBottom: "10px" }}>
                  <div style={{ fontSize: "12px", color: "#92400E" }}>FRS shortfall: <strong>S${fmt(shortfall)}</strong> — additional funds needed to meet Full Retirement Sum.</div>
                </div>
                {[
                  "Top up SA via CPF top-up (RSTU) to earn 4% tax-free interest",
                  "Top up SA online at my.cpf.gov.sg — enjoy tax relief up to S$8,000/year",
                  "Encourage spouse/parents to top up RA for additional S$8,000 relief",
                  "Transfer OA to SA (one-way, before age 55) to earn higher 4% interest",
                  "Consider SRS (Supplementary Retirement Scheme) contributions for tax savings",
                ].map((tip) => (
                  <div key={tip} style={{ display: "flex", gap: "8px", padding: "6px 0", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                    <span style={{ color: "#4F46E5", flexShrink: 0 }}>→</span>
                    <span style={{ color: "#374151" }}>{tip}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Projection assumes constant salary, OW CPF rates (≤55), and CPF interest rates (OA 2.5%, SA/RA 4%). Actual balance depends on salary changes, housing withdrawals, MediSave usage, and CPF policy changes. Check actual balance at my.cpf.gov.sg.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
