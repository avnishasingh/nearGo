// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AnimatedBackground from "../components/AnimatedBackground";
// import { setUserName } from "../utils/userProfile";
// import { setOnboarded } from "../utils/onboarding";
// import { BrandBadge, BrandWordmark } from "../components/BrandLogo";

// const PinIcon = ({ size = 34, color = "#b0c2f0" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
//     <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" />
//   </svg>
// );

// const BackArrow = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a89fb5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
// );

// const ProgressBar = ({ step, total = 3 }) => (
//   <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "14px" }}>
//     {Array.from({ length: total }).map((_, i) => (
//       <div key={i} style={{ width: i < step ? "22px" : "6px", height: "4px", borderRadius: "999px", background: i < step ? "#e0bd7d" : "rgba(255,255,255,0.2)", transition: "width 0.25s ease" }} />
//     ))}
//   </div>
// );

// const Onboarding = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [name, setName] = useState("");

//   const finish = () => { setOnboarded(); navigate("/"); };
//   const handleAllowLocation = () => navigator.geolocation.getCurrentPosition(finish, finish);
//   const handleContinueName = () => {
//     if (!name.trim()) return;
//     setUserName(name.trim());
//     setStep(3);
//   };

//   return (
//     <div className="onboard-wrap">
//       <style>{`
//         .onboard-wrap { position: relative; min-height: 100vh; background: #14101f; display: flex; flex-direction: column; color: #faf6ec; font-family: system-ui, sans-serif; overflow: hidden; }
//         .onboard-back-row { padding: 26px 22px 0; position: relative; z-index: 1; }
//         .onboard-back-btn { background: none; border: none; padding: 0; display: flex; }
//         .onboard-middle { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px 26px; position: relative; z-index: 1; }
//         .onboard-bottom { padding: 0 22px 28px; position: relative; z-index: 1; }
//         .onboard-heading { font-size: 20px; font-weight: 600; margin: 0 0 10px; color: #faf6ec; }
//         .onboard-sub { font-size: 12.5px; color: #a89fb5; margin: 0; max-width: 210px; line-height: 1.5; }
//         .onboard-input { width: 100%; padding: 15px 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.11); background: rgba(255,255,255,0.05); color: #faf6ec; font-size: 15px; text-align: center; margin-bottom: 6px; }
//         .onboard-btn { width: 100%; padding: 15px; border-radius: 14px; border: none; background: #e0bd7d; color: #2a2010; font-weight: 600; font-size: 13.5px; margin-bottom: 10px; }
//         .onboard-skip { display: block; width: 100%; text-align: center; background: none; border: none; color: #6b6478; font-size: 11px; }
//         .location-icon-badge { width: 88px; height: 88px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(140,166,230,0.3), rgba(140,166,230,0.06)); border: 1px solid rgba(140,166,230,0.35); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
//         .glow-tl { position: absolute; top: -60px; left: -40px; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(140,166,230,0.24), transparent 70%); pointer-events: none; }
//         .glow-br { position: absolute; bottom: 60px; right: -50px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(201,168,106,0.2), transparent 70%); pointer-events: none; }
//       `}</style>

//       <AnimatedBackground />

//       <div className="onboard-back-row">
//         {step > 1 && (
//           <button className="onboard-back-btn press-feedback" onClick={() => setStep(step - 1)}>
//             <BackArrow />
//           </button>
//         )}
//       </div>

//       {step === 1 && (
//         <>
//           <div className="onboard-middle">
//             <BrandBadge size={84} radius={26} glow />
//             <h1 style={{ margin: "22px 0 8px" }}><BrandWordmark size={26} /></h1>
//             <p className="onboard-sub" style={{ maxWidth: "260px" }}>Tell it your mood — it finds the spot.<br />Powered by AI, tuned to you.</p>
//           </div>
//           <div className="onboard-bottom">
//             <button className="onboard-btn press-feedback" style={{ width: "78%", margin: "0 auto 10px", display: "block" }} onClick={() => setStep(2)}>Get Started</button>
//             <ProgressBar step={1} />
//           </div>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <div className="onboard-middle">
//             <h1 className="onboard-heading">What should we call you?</h1>
//             <input autoFocus className="onboard-input" style={{ maxWidth: "280px", marginTop: "18px" }} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleContinueName()} />
//           </div>
//           <div className="onboard-bottom">
//             <button className="onboard-btn press-feedback" style={{ width: "78%", margin: "0 auto 10px", display: "block" }} onClick={handleContinueName}>Continue</button>
//             <ProgressBar step={2} />
//           </div>
//         </>
//       )}

//       {step === 3 && (
//         <>
//           <div className="glow-tl" />
//           <div className="glow-br" />
//           <div className="onboard-middle">
//             <div className="location-icon-badge"><PinIcon /></div>
//             <h1 className="onboard-heading">Find what's actually near you</h1>
//             <p className="onboard-sub">Let us know, so we can find your kind of spot nearby.</p>
//           </div>
//           <div className="onboard-bottom">
//             <button className="onboard-btn press-feedback" onClick={handleAllowLocation}>Allow Location Access</button>
//             <button className="onboard-skip press-feedback" onClick={finish}>Maybe later</button>
//             <ProgressBar step={3} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Onboarding;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import { setUserName } from "../utils/userProfile";
import { setOnboarded } from "../utils/onboarding";
import { BrandBadge, BrandWordmark } from "../components/BrandLogo";

const PinIcon = ({ size = 34, color = "#b0c2f0" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.6"
  >
    <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const BackArrow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a89fb5"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/* Single smooth progress bar */
const ProgressBar = ({ step, total = 3 }) => {
  const progress = (step / total) * 100;

  return (
    <div
      style={{
        width: "58px",
        height: "4px",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.16)",
        overflow: "hidden",
        margin: "0 auto 10px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          borderRadius: "999px",
          background: "#e0bd7d",
          transition: "width 0.35s ease",
        }}
      />
    </div>
  );
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  const finish = () => {
    setOnboarded();
    navigate("/");
  };
const handleAllowLocation = () => {
  navigator.geolocation.getCurrentPosition(finish, finish);
};
  const handleContinueName = () => {
  if (!name.trim()) return;

  setUserName(name.trim());

  fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim() }),
  }).catch(() => {});

  setStep(3);
};

  return (
    <div className="onboard-wrap">
      <style>{`
        .onboard-wrap {
          position: relative;
          min-height: 100vh;
          background: #14101f;
          display: flex;
          flex-direction: column;
          color: #faf6ec;
          font-family: system-ui, sans-serif;
          overflow: hidden;
        }

        .onboard-back-row {
          padding: 26px 22px 0;
          position: relative;
          z-index: 1;
        }

        .onboard-back-btn {
          background: none;
          border: none;
          padding: 0;
          display: flex;
          cursor: pointer;
        }

        .onboard-middle {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px 26px;
          position: relative;
          z-index: 1;
        }

        .onboard-bottom {
          padding: 0 22px 65px;
          position: relative;
          z-index: 1;
        }

        .onboard-heading {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 10px;
          color: #faf6ec;
        }

        .onboard-sub {
          font-size: 12.5px;
          color: #a89fb5;
          margin: 0;
          max-width: 210px;
          line-height: 1.5;
        }

        .onboard-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.11);
          background: rgba(255,255,255,0.05);
          color: #faf6ec;
          font-size: 15px;
          text-align: center;
          margin-bottom: 6px;
        }
.onboard-input:focus {
  outline: none;
  border-color: #e0bd7d;
  box-shadow: 0 0 0 1px #e0bd7d;
}
        .onboard-btn {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          border: none;
          background: #e0bd7d;
          color: #2a2010;
          font-weight: 600;
          font-size: 13.5px;
          margin-bottom: 0;
          cursor: pointer;
        }

        .onboard-skip {
          display: block;
          width: 100%;
          text-align: center;
          background: none;
          border: none;
          color: #6b6478;
          font-size: 11px;
          margin-top: 8px;
          cursor: pointer;
        }

        .location-icon-badge {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(140,166,230,0.3),
            rgba(140,166,230,0.06)
          );
          border: 1px solid rgba(140,166,230,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .glow-tl {
          position: absolute;
          top: -60px;
          left: -40px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(140,166,230,0.24),
            transparent 70%
          );
          pointer-events: none;
        }

        .glow-br {
          position: absolute;
          bottom: 60px;
          right: -50px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(201,168,106,0.2),
            transparent 70%
          );
          pointer-events: none;
        }
      `}</style>

      <AnimatedBackground />

      {/* Back Arrow */}
      <div className="onboard-back-row">
        {step > 1 && (
          <button
            className="onboard-back-btn press-feedback"
            onClick={() => setStep(step - 1)}
          >
            <BackArrow />
          </button>
        )}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <div className="onboard-middle">
            <BrandBadge size={84} radius={26} glow />

            <h1 style={{ margin: "22px 0 8px" }}>
              <BrandWordmark size={26} />
            </h1>

            <p
              className="onboard-sub"
              style={{ maxWidth: "260px" }}
            >
              Tell it your mood — it finds the spot.
              <br />
              Powered by AI, tuned to you.
            </p>
          </div>

          <div className="onboard-bottom">
            {/* Progress ABOVE button */}
            <ProgressBar step={1} />

            <button
              className="onboard-btn press-feedback"
              style={{
                width: "78%",
                margin: "0 auto",
                display: "block",
              }}
              onClick={() => setStep(2)}
            >
              Get Started
            </button>
          </div>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <div className="onboard-middle">
            <h1 className="onboard-heading">
              What should we call you?
            </h1>

            <input
              autoFocus
              className="onboard-input"
              style={{
                maxWidth: "240px",
                marginTop: "18px",
              }}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleContinueName()
              }
            />
          </div>

          <div className="onboard-bottom">
            {/* Progress ABOVE button */}
            <ProgressBar step={2} />

            <button
              className="onboard-btn press-feedback"
              style={{
                width: "78%",
                margin: "0 auto",
                display: "block",
              }}
              onClick={handleContinueName}
            >
              Continue
            </button>
          </div>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <div className="glow-tl" />
          <div className="glow-br" />

          <div className="onboard-middle">
            <div className="location-icon-badge">
              <PinIcon />
            </div>

            <h1 className="onboard-heading">
              Find what's actually near you
            </h1>

            <p className="onboard-sub">
              Let us know, so we can find your kind of spot nearby.
            </p>
          </div>

          <div className="onboard-bottom">
            {/* Progress ABOVE button */}
            <ProgressBar step={3} />

            <button
  className="onboard-btn press-feedback"
  style={{
    width: "78%",
    margin: "0 auto",
    display: "block",
  }}
  onClick={handleAllowLocation}
>
  Allow Location Access
</button>

            <button
              className="onboard-skip press-feedback"
              onClick={finish}
            >
              Maybe later
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Onboarding;