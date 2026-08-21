import React from "react";

export const BookmarkIcon = ({ filled, color = "#38bdf8", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
export const HomeIcon = ({ active, size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={active ? "#38bdf8" : "rgba(255,255,255,0.6)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5 12 3l9 6.5" /><path d="M5 10v10h14V10" />
  </svg>
);

export const UserIcon = ({ active, size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={active ? "#38bdf8" : "rgba(255,255,255,0.6)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

export const ChevronDownIcon = ({ size = 14, color = "rgba(255,255,255,0.6)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);