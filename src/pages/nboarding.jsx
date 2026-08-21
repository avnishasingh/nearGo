import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import { setUserName } from "../utils/userProfile";
import { setOnboarded } from "../utils/onboarding";

const NearGoLogo = ({ size = 84 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.28, background: "linear-gradient(160deg, #fdf6e8, #f0dcae)", boxShadow: "0 8px 30px rgba(224,189,125,0.25)" }} />
);

const PinIcon = ({ size = 34, color = "#e0bd7d" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
    <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  const finish = () => { setOnboarded(); navigate("/"); };
  const handleAllowLocation = () => navigator.geolocation.getCurrentPosition(finish, finish);
  const handleContinueName = () => {
    if (!name.trim()) return;
    setUserName(name.trim());
    setStep(3);
  };

  return (
    <div className="onboard-wrap">
      <style>{`
        .onboard-wrap { position: relative; min-height: 100vh; background: #14101f; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 24px; color: #faf6ec; text-align: center; font-family: system-ui, sans-serif; overflow: hidden; }
        .onboard-content { position: relative; z-index: 1; width: 100%; max-width: 380px; display: flex; flex-direction: column; align-items: center; }
        .onboard-heading { font-size: 24px; font-weight: 800; margin: 22px 0 8px; }
        .onboard-sub { font-size: 13.5px; color: #a89fb5; margin: 0 0 34px; line-height: 1.5; }
        .onboard-input { width: 100%; padding: 15px 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.11); background: rgba(255,255,255,0.05); color: #faf6ec; font-size: 15px; margin-bottom: 26px; text-align: center; }
        .onboard-btn { width: 100%; padding: 15px; border-radius: 14px; border: none; background: #e0bd7d; color: #14101f; font-weight: 700; font-size: 15px; }
        .onboard-skip { margin-top: 16px; background: none; border: none; color: #a89fb5; font-size: 13px; }
        .onboard-back { position: fixed; top: 24px; left: 20px; z-index: 10; background: none; border: none; color: #faf6ec; font-size: 20px; }
      `}</style>

      <AnimatedBackground />
      {step > 1 && <button className="onboard-back press-feedback" onClick={() => setStep(step - 1)}>←</button>}

      <div className="onboard-content">
        {step === 1 && (
          <>
            <NearGoLogo />
            <h1 className="onboard-heading">nearGo</h1>
            <p className="onboard-sub">Tell it your mood — it finds the spot.</p>
            <button className="onboard-btn press-feedback" onClick={() => setStep(2)}>Get Started</button>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ height: "84px" }} />
            <h1 className="onboard-heading">What should we call you?</h1>
            <input autoFocus className="onboard-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleContinueName()} />
            <button className="onboard-btn press-feedback" onClick={handleContinueName}>Continue</button>
          </>
        )}
        {step === 3 && (
          <>
            <PinIcon />
            <h1 className="onboard-heading">Find what's actually near you</h1>
            <p className="onboard-sub">Let us know, so we can find your kind of spot nearby.</p>
            <button className="onboard-btn press-feedback" onClick={handleAllowLocation}>Allow Location Access</button>
            <button className="onboard-skip press-feedback" onClick={finish}>Maybe later</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;