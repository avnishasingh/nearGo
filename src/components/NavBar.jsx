import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserName } from "../utils/userProfile";
import { isOnboarded } from "../utils/onboarding";

const NavBar = () => {
  const location = useLocation();
  if (!isOnboarded() || location.pathname === "/onboarding") return null;
  const name = getUserName();
  const initial = name ? name.trim()[0].toUpperCase() : "?";
  return (
    <Link to="/profile" className="press-feedback" style={styles.avatar}>
      <span style={styles.initial}>{initial}</span>
    </Link>
  );
};

const styles = {
  avatar: { position: "fixed", top: "16px", right: "20px", zIndex: 70, width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.09)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.13)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" },
  initial: { color: "#f3ead6", fontSize: "11px", fontWeight: 700 },
};

export default NavBar;