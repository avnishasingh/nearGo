import React from "react";
import { SparklesIcon, ChevronRightIcon } from "./uiIcons";

const SuggestionCard = ({ title, subtitle, onClick, Icon = SparklesIcon }) => (
  <button className="press-feedback" onClick={onClick} style={styles.container}>
    <div style={styles.badge}><Icon size={16} color="#e8c98a" /></div>
    <div style={styles.textBlock}>
      <p style={styles.title}>{title}</p>
      <p style={styles.subtitle}>{subtitle}</p>
    </div>
    <ChevronRightIcon />
  </button>
);

const styles = {
  container: { width: "100%",background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "16px", padding: "13px 14px", display: "flex", alignItems: "center", gap: "12px", textAlign: "left" },
  badge: { width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(150deg, rgba(224,189,125,0.35), rgba(224,189,125,0.1))", border: "1px solid rgba(224,189,125,0.4)", display: "flex", alignItems: "center", justifyContent: "center" },
  textBlock: { flex: 1, minWidth: 0 },
  title: { margin: 0, fontSize: "12px", fontWeight: 500, color: "#f6eedb" },
  subtitle: { margin: "2px 0 0", fontSize: "10.5px", color: "#a89fb5" },
};

export default SuggestionCard;