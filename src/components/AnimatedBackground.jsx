import React from "react";

const BUBBLES = Array.from({ length: 8 }, (_, i) => ({
  left: `${(i * 41) % 100}%`,
  size: 9 + (i % 3) * 6,
  delay: `${i * 1.6}s`,
  duration: `${16 + (i % 4) * 3}s`,
}));

const AnimatedBackground = () => (
  <div style={styles.wrap}>
    <style>{`@keyframes rise { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 0.55; } 50% { transform: translateY(-45vh); opacity: 0.3; } 60% { transform: translateY(-55vh); opacity: 0; } 100% { transform: translateY(-55vh); opacity: 0; } }`}</style>
    <div style={styles.blobTL} />
    <div style={styles.blobTR} />
    <div style={styles.blobBottom} />
    {BUBBLES.map((b, i) => (
      <div key={i} style={{ position: "absolute", bottom: "-20px", left: b.left, width: b.size, height: b.size, borderRadius: "50%", background: "rgba(255,255,255,0.15 )", animation: `rise ${b.duration} linear infinite`, animationDelay: b.delay }} />
    ))}
  </div>
);

const styles = {
  wrap: { position: "fixed", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" },
  blobTL: { position: "absolute", top: "-60px", left: "-30px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(90,120,180,0.28), transparent 70%)" },
  blobTR: { position: "absolute", top: "60px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,106,0.22), transparent 70%)" },
  blobBottom: { position: "absolute", bottom: "0", left: "20%", width: "220px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(180,90,110,0.14), transparent 70%)" },
};

export default AnimatedBackground;