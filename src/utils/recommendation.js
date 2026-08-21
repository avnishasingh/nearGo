
// // }
// import { TIER_RANK } from "./placeMeta";

// export function estimateTravelTime(distanceKm) {
//   const walkMin = Math.max(1, Math.round((distanceKm / 4.5) * 60));
//   const driveMin = Math.max(1, Math.round((distanceKm / 20) * 60));
//   return { walkMin, driveMin };
// }

// export function parseOpenStatus(rawOpeningHours) {
//   if (!rawOpeningHours) return { known: false, isOpen: null, text: "Hours not listed" };
//   if (rawOpeningHours.trim() === "24/7") return { known: true, isOpen: true, text: "Open 24/7" };

//   const match = rawOpeningHours.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
//   if (!match) return { known: false, isOpen: null, text: "Hours not listed" };

//   const startMin = parseInt(match[1]) * 60 + parseInt(match[2]);
//   const endMin = parseInt(match[3]) * 60 + parseInt(match[4]);
//   const now = new Date();
//   const nowMin = now.getHours() * 60 + now.getMinutes();
//   const isOpen = endMin < startMin ? nowMin >= startMin || nowMin < endMin : nowMin >= startMin && nowMin < endMin;

//   return { known: true, isOpen, text: isOpen ? "Open now" : "Closed now" };
// }

// // Transparent rule-based score with a real reasons breakdown — every number is explainable.
// export function computeMatchScore({ distanceKm, tier, maxBudgetTier, openStatus, moodLabel }) {
//   const reasons = [];
//   let score = 0;

//   score += Math.max(0, 40 - distanceKm * 4);
//   reasons.push(`📍 ${distanceKm.toFixed(1)} km away`);

//   score += 30;
//   reasons.push(`✅ Matches your ${moodLabel || "selected"} search`);

//   if (maxBudgetTier) {
//     const placeRank = TIER_RANK[tier] ?? 2;
//     const maxRank = TIER_RANK[maxBudgetTier] ?? 4;
//     if (placeRank <= maxRank) {
//       score += 20;
//       reasons.push(`💰 Within your budget (${tier})`);
//     } else {
//       score += 5;
//       reasons.push(`💰 A bit above your budget (${tier})`);
//     }
//   } else {
//     score += 15;
//     reasons.push(`💰 Priced around ${tier}`);
//   }

//   if (openStatus?.known) {
//     score += openStatus.isOpen ? 10 : 0;
//     reasons.push(openStatus.isOpen ? "🟢 Open now" : "🔴 Currently closed");
//   } else {
//     score += 5;
//     reasons.push("🕒 Hours not listed on OSM");
//   }

//   return { score: Math.max(0, Math.min(100, Math.round(score))), reasons };
// }
import { TIER_RANK } from "./placeMeta";

export function estimateTravelTime(distanceKm) {
  const walkMin = Math.max(1, Math.round((distanceKm / 4.5) * 60));
  const driveMin = Math.max(1, Math.round((distanceKm / 20) * 60));
  return { walkMin, driveMin };
}

export function parseOpenStatus(rawOpeningHours) {
  if (!rawOpeningHours) return { known: false, isOpen: null, text: null };
  if (rawOpeningHours.trim() === "24/7") return { known: true, isOpen: true, text: "Open 24/7" };

  const match = rawOpeningHours.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
  if (!match) return { known: false, isOpen: null, text: null };

  const startMin = parseInt(match[1]) * 60 + parseInt(match[2]);
  const endMin = parseInt(match[3]) * 60 + parseInt(match[4]);
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const isOpen = endMin < startMin ? nowMin >= startMin || nowMin < endMin : nowMin >= startMin && nowMin < endMin;

  if (isOpen) {
    const minsToClose = endMin < startMin && nowMin >= startMin ? (endMin + 1440) - nowMin : endMin - nowMin;
    if (minsToClose <= 45) {
      return { known: true, isOpen: true, text: `Closing in ${minsToClose} min` };
    }
    const closeH = String(match[3]).padStart(2, "0");
    const closeM = String(match[4]).padStart(2, "0");
    return { known: true, isOpen: true, text: `Open now · Closes at ${closeH}:${closeM}` };
  }
  return { known: true, isOpen: false, text: "Closed now" };
}

export function matchQualifier(score) {
  if (score >= 90) return "Excellent Fit";
  if (score >= 75) return "Great Fit";
  if (score >= 60) return "Good Fit";
  return "Fair Fit";
}

export function computeMatchScore({ distanceKm, tier, maxBudgetTier, openStatus, moodLabel }) {
  const reasons = [];
  let score = 0;

  score += Math.max(0, 40 - distanceKm * 4);
  reasons.push(`📍 ${distanceKm.toFixed(1)} km away`);

  score += 30;
  reasons.push(`✅ Matches your ${moodLabel || "selected"} search`);

  if (maxBudgetTier) {
    const placeRank = TIER_RANK[tier] ?? 2;
    const maxRank = TIER_RANK[maxBudgetTier] ?? 4;
    if (placeRank <= maxRank) { score += 20; reasons.push(`💰 Within your budget (${tier})`); }
    else { score += 5; reasons.push(`💰 A bit above your budget (${tier})`); }
  } else {
    score += 15;
    reasons.push(`💰 Priced around ${tier}`);
  }

  // Only add a hours-related reason when we actually know it — no "not listed" noise
  if (openStatus?.known) {
    score += openStatus.isOpen ? 10 : 0;
    reasons.push(openStatus.isOpen ? `🟢 ${openStatus.text}` : "🔴 Currently closed");
  } else {
    score += 8; // neutral, doesn't penalize for missing data
  }

  const finalScore = Math.max(0, Math.min(100, Math.round(score)));
  return { score: finalScore, reasons, qualifier: matchQualifier(finalScore) };
}