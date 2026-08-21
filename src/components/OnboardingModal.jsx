import React, { useState } from "react";
import { setUserName } from "../utils/userProfile";

const OnboardingModal = ({ onDone }) => {
  const [name, setName] = useState("");

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setUserName(trimmed);
    onDone(trimmed);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.sparkle}>✨</div>
        <h2 style={styles.heading}>Welcome to Smart Nearby Places</h2>
        <p style={styles.sub}>What should I call you?</p>
        <input
          autoFocus
          style={styles.input}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleContinue()}
        />
        <button style={styles.btn} onClick={handleContinue}>Continue →</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: "fixed", inset: 0, background: "rgba(3, 10, 41, 0.9)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" },
  card: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "22px", padding: "32px 26px", maxWidth: "360px", width: "100%", textAlign: "center", color: "white" },
  sparkle: { fontSize: "30px", marginBottom: "8px" },
  heading: { fontSize: "20px", margin: "0 0 6px" },
  sub: { fontSize: "14px", opacity: 0.7, marginBottom: "18px" },
  input: { width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "14px", marginBottom: "14px", textAlign: "center" },
  btn: { width: "100%", padding: "12px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#38bdf8,#a78bfa)", color: "#020617", fontWeight: 700, cursor: "pointer", fontSize: "14px" },
};

export default OnboardingModal;