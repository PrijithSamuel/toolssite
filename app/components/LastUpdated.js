export default function LastUpdated({ date, source, sourceUrl }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: "#D1FAE5", border: "0.5px solid #A7F3D0",
      borderRadius: "6px", padding: "4px 10px", marginBottom: "16px"
    }}>
      <span style={{ fontSize: "12px" }}>✓</span>
      <span style={{ fontSize: "12px", color: "#065F46", fontWeight: "500" }}>
        Rates updated: {date}
      </span>
      {source && sourceUrl && (
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: "11px", color: "#059669", textDecoration: "underline" }}>
          Source: {source}
        </a>
      )}
    </div>
  );
}
