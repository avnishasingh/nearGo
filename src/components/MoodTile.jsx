import React from "react";

const MoodTile = ({ label, Icon, rgb, iconColor, size = 34, padding = "16px 6px", onClick }) => (
  <button className="press-feedback" onClick={onClick} style={{ ...styles.card, padding }}>
    <div style={{ ...styles.badge, width: size, height: size, background: `linear-gradient(135deg, rgba(${rgb},0.35), rgba(${rgb},0.1))`, border: `1px solid rgba(${rgb},0.4)` }}>
      <Icon size={size >= 34 ? 15 : 13} color={iconColor} />
    </div>
    <div style={styles.label}>{label}</div>
  </button>
);

const styles = {
  card: { background: "rgba(255,255,255,0.11)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "#faf6ec" },
  badge: { borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  label: { fontSize: "12px", fontWeight: 600 },
};

export default MoodTile;