"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = undefined;

function fmt(n) { return Math.round(n).toLocaleString("de-DE"); }
function fmtDec(n) { return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function calcElterngeld(netMonthly) {
  const MIN = 300;
  const MAX = 1800;
  // 65-67% replacement rate
  let rate = 0.67;
  // Lower rate for high earners (>= 1200 net) tapers to 65%
  if (netMonthly >= 1200) rate = 0.65;
  // Higher rate for low earners (< 1000 net) rises to 100%
  if (netMonthly < 1000) rate = Math.min(1.0, 0.67 + ((1000 - netMonthly) / 1000) * 0.133);

  const raw = netMonthly * rate;
  return Math.min(MAX, Math.max(MIN, raw));
}

export default function Elterngeld() {
  const [netInput, setNetInput] = useState("2500");
  const [partnerNet, setPartnerNet] = useState("");
  const [withPartner, setWithPartner] = useState(false);

  const net = parseFloat(netInput) || 0;
  const pNet = parseFloat(partnerNet) || 0;

  const eg = net > 0 ? calcElterngeld(net) : 0;
  const egPlus = eg / 2;
  const pEg = withPartner && pNet > 0 ? calcElterngeld(pNet) : 0;
  const pEgPlus = pEg / 2;

  const total12 = eg * 12;
  const totalPlus24 = egPlus * 24;
  const partnerMonths = 2;
  const totalWithPartner = eg * 12 + pEg * partnerMonths;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Elterngeld-Rechner" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Elterngeld-Rechner</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate German parental allowance (Bundeselterngeld- und Elternzeitgesetz, BEEG 2024).</p>
        </div>

        {/* Input card */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              Your average net income — last 12 months (monthly)
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="number"
                value={netInput}
                onChange={(e) => setNetInput(e.target.value)}
                placeholder="2500"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 44px 12px 14px", outline: "none", background: "white", fontSize: "22px", fontWeight: "500", boxSizing: "border-box" }}
              />
              <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#6B7280" }}>€</span>
            </div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>Enter your average monthly net (Netto) income.</div>
          </div>

          {/* Partner toggle */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Calculate partner&apos;s Elterngeld too?</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setWithPartner(true)} style={{ padding: "8px 20px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: withPartner ? "#4F46E5" : "white", color: withPartner ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Yes</button>
              <button onClick={() => setWithPartner(false)} style={{ padding: "8px 20px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !withPartner ? "#4F46E5" : "white", color: !withPartner ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>No</button>
            </div>
          </div>

          {withPartner && (
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
                Partner&apos;s average net income (monthly)
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  value={partnerNet}
                  onChange={(e) => setPartnerNet(e.target.value)}
                  placeholder="2000"
                  style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 44px 12px 14px", outline: "none", background: "white", fontSize: "18px", fontWeight: "500", boxSizing: "border-box" }}
                />
                <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#6B7280" }}>€</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {net > 0 && (
          <>
            {/* Summary */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#6366F1", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Elterngeld</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Basis-Elterngeld / Monat</div>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: "#4F46E5" }}>{fmt(eg)} €</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>for 12 months = {fmt(total12)} €</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>ElterngeldPlus / Monat</div>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: "#6366F1" }}>{fmtDec(egPlus)} €</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>for 24 months = {fmt(totalPlus24)} €</div>
                </div>
              </div>

              {/* Rate info */}
              <div style={{ background: "white", borderRadius: "8px", padding: "12px 16px", fontSize: "12px", color: "#374151" }}>
                Replacement rate: <strong>{net < 1000 ? "67–100%" : net >= 1200 ? "65%" : "67%"}</strong> of your net income
                {eg === 300 && " (minimum Elterngeld)"}
                {eg === 1800 && " (maximum Elterngeld)"}
              </div>
            </div>

            {/* Partner section */}
            {withPartner && pNet > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "14px" }}>Partner&apos;s Elterngeld (2 Partnermonate)</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ background: "#F8F9FF", borderRadius: "8px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Basis-Elterngeld / Monat</div>
                    <div style={{ fontSize: "24px", fontWeight: "600", color: "#4F46E5" }}>{fmt(pEg)} €</div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>2 months = {fmt(pEg * 2)} €</div>
                  </div>
                  <div style={{ background: "#F8F9FF", borderRadius: "8px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>ElterngeldPlus / Monat</div>
                    <div style={{ fontSize: "24px", fontWeight: "600", color: "#6366F1" }}>{fmtDec(pEgPlus)} €</div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>4 months = {fmt(pEgPlus * 4)} €</div>
                  </div>
                </div>
                <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151", fontWeight: "600" }}>Combined family total (14 months)</span>
                  <span style={{ color: "#4F46E5", fontWeight: "700", fontSize: "16px" }}>{fmt(totalWithPartner)} €</span>
                </div>
              </div>
            )}

            {/* Comparison table */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                Basis-Elterngeld vs ElterngeldPlus Comparison
              </div>
              {[
                { label: "Monthly payment", basis: `${fmt(eg)} €`, plus: `${fmtDec(egPlus)} €` },
                { label: "Duration", basis: "12 months", plus: "24 months" },
                { label: "Total payout", basis: `${fmt(total12)} €`, plus: `${fmt(totalPlus24)} €` },
                { label: "Can work part-time?", basis: "Up to 32h/week", plus: "Up to 32h/week (favored)" },
              ].map((r) => (
                <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", fontSize: "13px" }}>
                  <span style={{ color: "#6B7280" }}>{r.label}</span>
                  <span style={{ color: "#4F46E5", fontWeight: "500", textAlign: "center" }}>{r.basis}</span>
                  <span style={{ color: "#6366F1", fontWeight: "500", textAlign: "center" }}>{r.plus}</span>
                </div>
              ))}
              <div style={{ padding: "8px 20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", fontSize: "11px", color: "#9CA3AF", background: "#F8F9FF" }}>
                <span></span>
                <span style={{ textAlign: "center", fontWeight: "600" }}>Basis-Elterngeld</span>
                <span style={{ textAlign: "center", fontWeight: "600" }}>ElterngeldPlus</span>
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Estimate based on BEEG 2024. Actual Elterngeld depends on exact income calculation by the Elterngeldstelle (12 months before birth, excluding birth month). Apply at your local Jugendamt or Elterngeldstelle.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
