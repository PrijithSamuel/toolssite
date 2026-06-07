const BADGES = [
  { icon: "🔒", text: "No data uploaded — files stay in your browser" },
  { icon: "⚡", text: "Instant processing — no waiting" },
  { icon: "🚫", text: "No signup required — use immediately" },
  { icon: "💯", text: "Completely free — no hidden costs" },
];

export default function TrustBadges() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
      {BADGES.map(({ icon, text }) => (
        <div
          key={text}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "#F0FDF4",
            border: "0.5px solid #BBF7D0",
            borderRadius: "20px",
            padding: "4px 12px",
            fontSize: "12px",
            color: "#166534",
            whiteSpace: "nowrap",
          }}
        >
          <span>{icon}</span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
