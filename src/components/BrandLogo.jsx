import React from "react";

export const SignalPingIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="42" cy="58" r="40" stroke="#e0bd7d" strokeWidth="2.5" opacity="0.2" />
    <circle cx="42" cy="58" r="27" stroke="#e0bd7d" strokeWidth="2.5" opacity="0.4" />
    <circle cx="42" cy="58" r="14" stroke="#e0bd7d" strokeWidth="2.5" opacity="0.65" />
    <circle cx="42" cy="58" r="6" fill="#f0dcae" />
    <path d="M50 50 L78 22 M78 22 L78 34 M78 22 L66 22" stroke="#f0dcae" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const BrandBadge = ({ size = 84, radius = 26, iconSize, glow = false }) => (
  <div style={{
    position: "relative", width: size, height: size, borderRadius: radius,
    background: "linear-gradient(160deg, #241c38, #14101f)",
    boxShadow: "0 14px 30px rgba(0,0,0,0.5)",
    border: "1px solid rgba(224,189,125,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
    overflow: "hidden", flexShrink: 0,
  }}>
    {glow && (
      <div style={{ position: "absolute", top: "-20%", right: "-20%", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, rgba(224,189,125,0.16), transparent 70%)" }} />
    )}
    <SignalPingIcon size={iconSize || size * 0.5} />
  </div>
);

export const BrandWordmark = ({ size = 22 }) => (
  <span style={{ fontSize: size, fontWeight: 700 }}>
    <span style={{ color: "#faf6ec" }}>near</span><span style={{ color: "#e8c98a" }}>Go</span>
  </span>
);