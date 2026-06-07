export default function PrivacyBanner() {
  return (
    <div style={{
      background: "#F0FDF4", border: "0.5px solid #BBF7D0",
      borderRadius: "10px", padding: "12px 16px",
      display: "flex", alignItems: "center", gap: "10px",
      marginBottom: "16px"
    }}>
      <span aria-hidden="true" style={{ fontSize: "18px" }}>🔒</span>
      <p style={{ fontSize: "13px", color: "#166534", margin: 0 }}>
        <strong>Your files never leave your device.</strong> All processing
        happens 100% in your browser using JavaScript. Nothing is uploaded
        to any server.
      </p>
    </div>
  );
}
