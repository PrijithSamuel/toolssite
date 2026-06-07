"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "How accurate is the age calculator?", a: "Very accurate. It calculates the exact difference between your birth date and today including leap years, accounting for months with different day counts." },
  { q: "What format should I enter my date of birth?", a: "Use the date picker to select your date of birth. The format depends on your browser locale but the picker handles this automatically." },
  { q: "Can I calculate age for a future date?", a: "No. The calculator only works for past dates. Future dates will return no result." },
  { q: "Why does my age in months sometimes seem off?", a: "Month calculations account for the varying number of days in each month, which can cause the month count to differ by one depending on the specific dates." },
  { q: "Does the calculator show my next birthday?", a: "Yes. The calculator shows how many days until your next birthday." },
];

export default function AgeCalculator() {
  const [dob, setDob] = useState("");

  function calcAge() {
    if (!dob) return null;
    const birth = new Date(dob);
    const today = new Date();
    if (birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNext = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext };
  }

  const age = calcAge();

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "Age Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Age Calculator — Calculate Exact Age Online</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your exact age in years, months, days and more.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "8px" }}>Date of Birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={new Date().toISOString().split("T")[0]}
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" }} />
        </div>

        {age && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#D1FAE5", border: "0.5px solid #A7F3D0", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>Your age</div>
              <div style={{ fontSize: "40px", fontWeight: "500", color: "#059669" }}>{age.years} <span style={{ fontSize: "24px" }}>years</span></div>
              <div style={{ fontSize: "16px", color: "#065F46", marginTop: "4px" }}>{age.months} months and {age.days} days</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {[["Total Days", age.totalDays.toLocaleString()], ["Total Weeks", age.totalWeeks.toLocaleString()], ["Total Months", age.totalMonths.toLocaleString()], ["Total Hours", age.totalHours.toLocaleString()]].map(([label, value]) => (
                <div key={label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: "500", color: "#4F46E5" }}>{value}</div>
                  <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#FEF9C3", border: "0.5px solid #FDE68A", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
              <span style={{ fontSize: "14px", color: "#713F12" }}>
                {age.daysToNext === 0 ? "🎂 Happy Birthday!" : `🎂 Next birthday in ${age.daysToNext} days`}
              </span>
            </div>
          </div>
        )}
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}