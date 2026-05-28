"use client";

import { useState } from "react";
import Link from "next/link";

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
    if (months < 0) {
      years--;
      months += 12;
    }

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
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/calculators" className="text-gray-400 hover:text-gray-600 text-sm">Calculators</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Age Calculator</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Age Calculator</h1>
          <p className="text-gray-500">Calculate your exact age in years, months, days and more. Free, no signup required.</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          />
        </div>

        {age && (
          <div className="space-y-4">
            {/* Main result */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-xs text-gray-400 mb-2">Your age</div>
              <div className="text-4xl font-bold text-green-600 mb-1">
                {age.years} <span className="text-2xl">years</span>
              </div>
              <div className="text-lg text-green-700">
                {age.months} months and {age.days} days
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Days", value: age.totalDays.toLocaleString() },
                { label: "Total Weeks", value: age.totalWeeks.toLocaleString() },
                { label: "Total Months", value: age.totalMonths.toLocaleString() },
                { label: "Total Hours", value: age.totalHours.toLocaleString() },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Next birthday */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <div className="text-sm text-yellow-700">
                {age.daysToNext === 0
                  ? "🎂 Happy Birthday!"
                  : `🎂 Next birthday in ${age.daysToNext} days`}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">How to use</h2>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Select your date of birth from the picker above</li>
            <li>• Your exact age appears instantly</li>
            <li>• See total days, weeks, months and hours lived</li>
          </ul>
        </div>
      </div>
    </main>
  );
}