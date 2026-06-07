export default function FAQ({ faqs }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a },
            })),
          }),
        }}
      />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 32px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "500", color: "#1E1B4B", marginBottom: "16px" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {faqs.map((faq, i) => (
            <details key={i} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "16px" }}>
              <summary style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {faq.q}
                <span style={{ color: "#6366F1", fontSize: "18px", flexShrink: 0, marginLeft: "12px" }}>+</span>
              </summary>
              <p style={{ fontSize: "13px", color: "#6B7280", marginTop: "10px", lineHeight: "1.7", margin: "10px 0 0" }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
