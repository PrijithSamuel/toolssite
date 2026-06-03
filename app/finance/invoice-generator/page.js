"use client";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

let nextId = 1;

function newItem() {
  return { id: nextId++, description: "", qty: "1", rate: "" };
}

function fmt(n) {
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvoiceGenerator() {
  const [bizName, setBizName] = useState("Your Business Name");
  const [bizEmail, setBizEmail] = useState("hello@yourbusiness.com");
  const [clientName, setClientName] = useState("Client Name");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [taxRate, setTaxRate] = useState("0");
  const [items, setItems] = useState([newItem(), newItem()]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "invoice-print-css";
    style.innerHTML = `
      @media print {
        body > * { display: none !important; }
        #invoice-print-area { display: block !important; position: fixed; top: 0; left: 0; width: 100%; }
        #invoice-print-area * { display: revert !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.getElementById("invoice-print-css")?.remove();
  }, []);

  function addItem() { setItems([...items, newItem()]); }
  function removeItem(id) { setItems(items.filter((i) => i.id !== id)); }
  function updateItem(id, field, val) { setItems(items.map((i) => i.id === id ? { ...i, [field]: val } : i)); }

  const subtotal = items.reduce((s, i) => s + (parseFloat(i.qty) || 0) * (parseFloat(i.rate) || 0), 0);
  const taxAmt = subtotal * (parseFloat(taxRate) || 0) / 100;
  const total = subtotal + taxAmt;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "8px 10px", outline: "none", background: "white", fontSize: "13px", width: "100%", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Invoice Generator" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Invoice Generator</h1>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>Fill in the details and click Print to save as PDF.</p>
          </div>
          <button
            onClick={() => window.print()}
            style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: "#4F46E5", color: "white", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}
          >
            🖨️ Print / Save PDF
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Form */}
          <div>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: "500", color: "#6B7280", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Details</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="Business Name" style={inp} />
                <input value={bizEmail} onChange={(e) => setBizEmail(e.target.value)} placeholder="Email" style={inp} />
              </div>
            </div>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: "500", color: "#6B7280", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Invoice Info</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" style={inp} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="Invoice #" style={inp} />
                  <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="Tax %" style={inp} min="0" max="100" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Invoice Date</div>
                    <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} style={inp} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Due Date</div>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inp} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "500", color: "#6B7280", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Notes</div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Payment terms, thank you note..." rows={3} style={{ ...inp, resize: "vertical" }} />
            </div>
          </div>

          {/* Preview */}
          <div id="invoice-print-area" style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "600", color: "#1E1B4B" }}>{bizName || "Your Business"}</div>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>{bizEmail}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "20px", fontWeight: "600", color: "#4F46E5" }}>INVOICE</div>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>{invoiceNo}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px", padding: "14px", background: "#F8F9FF", borderRadius: "8px" }}>
              <div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" }}>BILL TO</div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B" }}>{clientName || "Client"}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Date: {invoiceDate}</div>
                {dueDate && <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Due: {dueDate}</div>}
              </div>
            </div>

            {/* Line items */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr auto", gap: "8px", marginBottom: "6px" }}>
                {["Description", "Qty", "Rate", "Amount", ""].map((h) => (
                  <div key={h} style={{ fontSize: "11px", fontWeight: "500", color: "#9CA3AF", textAlign: h === "Amount" ? "right" : "left" }}>{h}</div>
                ))}
              </div>
              {items.map((item) => {
                const lineTotal = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
                return (
                  <div key={item.id} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr auto", gap: "8px", marginBottom: "6px", alignItems: "center" }}>
                    <input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder="Item description" style={{ ...inp, fontSize: "12px" }} />
                    <input type="number" value={item.qty} onChange={(e) => updateItem(item.id, "qty", e.target.value)} style={{ ...inp, fontSize: "12px" }} min="0" />
                    <input type="number" value={item.rate} onChange={(e) => updateItem(item.id, "rate", e.target.value)} placeholder="0.00" style={{ ...inp, fontSize: "12px" }} min="0" />
                    <div style={{ fontSize: "12px", fontWeight: "500", color: "#1E1B4B", textAlign: "right" }}>${fmt(lineTotal)}</div>
                    <button onClick={() => removeItem(item.id)} disabled={items.length <= 1} style={{ border: "none", background: "none", color: "#FCA5A5", fontSize: "16px", cursor: items.length > 1 ? "pointer" : "default", padding: "2px" }}>×</button>
                  </div>
                );
              })}
              <button onClick={addItem} style={{ marginTop: "6px", fontSize: "12px", color: "#4F46E5", background: "none", border: "0.5px dashed #A5B4FC", borderRadius: "7px", padding: "6px 12px", cursor: "pointer", width: "100%" }}>
                + Add Line Item
              </button>
            </div>

            {/* Totals */}
            <div style={{ borderTop: "1px solid #E0E7FF", paddingTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "200px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6B7280", marginBottom: "4px" }}>
                    <span>Subtotal</span><span>${fmt(subtotal)}</span>
                  </div>
                  {parseFloat(taxRate) > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6B7280", marginBottom: "4px" }}>
                      <span>Tax ({taxRate}%)</span><span>${fmt(taxAmt)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "600", color: "#4F46E5", paddingTop: "8px", borderTop: "1px solid #E0E7FF" }}>
                    <span>Total</span><span>${fmt(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {notes && (
              <div style={{ marginTop: "16px", padding: "12px", background: "#F8F9FF", borderRadius: "8px", fontSize: "12px", color: "#6B7280" }}>
                <strong style={{ color: "#374151" }}>Notes: </strong>{notes}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
