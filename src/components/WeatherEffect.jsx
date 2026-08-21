import React from "react";

const RAINDROPS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 11) % 130}px`,
  delay: `${(i % 8) * 0.2}s`,
  duration: `${1 + (i % 4) * 0.2}s`,
}));

const WeatherEffect = ({ variant }) => {
  if (!variant) return null;

  if (variant === "sunny") {
    return (
      <div style={styles.sunWrap}>
        <style>{`
          @keyframes sunPulse { 0%,100% { opacity: 0.6; } 50% { opacity: 0.85; } }
        `}</style>
        <div style={{ ...styles.sunRays, animation: "sunPulse 7s ease-in-out infinite" }} />
        <div style={styles.sunCore} />
      </div>
    );
  }

  if (variant === "rainy") {
    return (
      <div style={styles.rainWrap}>
        <style>{`
          @keyframes rainFall { 0% { transform: translateY(-20px); opacity: 0; } 25% { opacity: 0.35; } 100% { transform: translateY(120px); opacity: 0; } }
        `}</style>
        {RAINDROPS.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute", top: 0, left: d.left, width: "1px", height: "16px", borderRadius: "2px",
              background: "linear-gradient(180deg, rgba(140,170,220,0), rgba(140,170,220,0.3))",
              transform: "rotate(-8deg)",
              animation: `rainFall ${d.duration} linear infinite`, animationDelay: d.delay,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

const styles = {
  sunWrap: { position: "fixed", top: 0, left: 0, width: "170px", height: "170px", zIndex: 0, pointerEvents: "none", overflow: "hidden" },
  sunRays: {
    position: "absolute",
    top: "-70px",
    left: "-70px",
    width: "220px",
    height: "220px",
    background: "repeating-conic-gradient(from 210deg at 70px 70px, rgba(224,189,125,0.16) 0deg 3deg, transparent 3deg 22deg)",
    maskImage: "radial-gradient(circle at 70px 70px, black 0%, black 20%, transparent 62%)",
    WebkitMaskImage: "radial-gradient(circle at 70px 70px, black 0%, black 20%, transparent 62%)",
  },
  sunCore: {
    position: "absolute",
    top: "-30px",
    left: "-30px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,238,210,0.4), rgba(224,189,125,0.1) 55%, transparent 75%)",
    filter: "blur(4px)",
  },
  rainWrap: { position: "fixed", top: 0, left: 0, width: "130px", height: "150px", zIndex: 0, pointerEvents: "none", overflow: "hidden" },
};

export default WeatherEffect;