

// // export const TIER_RANK = { Free: 0, "₹": 1, "₹₹": 2, "₹₹₹": 3, "₹₹₹₹": 4 };
// export const CATEGORY_META = {
//   "catering.cafe": { icon: "☕", color: "#38bdf8", label: "Cafe", tier: "₹₹", priceHint: "~₹150–400 for two" },
//   "education.library": { icon: "📚", color: "#a78bfa", label: "Library", tier: "Free", priceHint: "Usually free entry" },
//   "office.coworking": { icon: "🧑‍💻", color: "#34d399", label: "Coworking", tier: "₹₹", priceHint: "~₹200–500/day pass" },
//   "activity.hackerspace": { icon: "🛠️", color: "#34d399", label: "Hackerspace", tier: "₹", priceHint: "Often free/low-cost" },
//   "commercial.books": { icon: "📖", color: "#a78bfa", label: "Bookstore", tier: "₹", priceHint: "Free to browse" },
//   "catering.restaurant": { icon: "🍽️", color: "#fb923c", label: "Restaurant", tier: "₹₹₹", priceHint: "~₹300–900 for two" },
//   "catering.bar": { icon: "🍸", color: "#f87171", label: "Bar", tier: "₹₹₹", priceHint: "~₹400–1200 for two" },
//   "catering.ice_cream": { icon: "🍦", color: "#f472b6", label: "Ice Cream", tier: "₹", priceHint: "~₹50–200" },
//   "catering.fast_food": { icon: "🍔", color: "#facc15", label: "Fast Food", tier: "₹", priceHint: "~₹100–300" },
//   "catering.food_court": { icon: "🍜", color: "#fb923c", label: "Food Court", tier: "₹", priceHint: "~₹150–350" },
//   "commercial.food_and_drink.bakery": { icon: "🥐", color: "#fbbf24", label: "Bakery", tier: "₹", priceHint: "~₹50–250" },
//   "sport.fitness": { icon: "🏋️", color: "#22d3ee", label: "Fitness", tier: "₹₹", priceHint: "Membership-based" },
//   "sport.fitness.gym": { icon: "🏋️", color: "#22d3ee", label: "Gym", tier: "₹₹", priceHint: "Membership-based" },
//   "sport.fitness.fitness_centre": { icon: "🏋️", color: "#22d3ee", label: "Fitness Centre", tier: "₹₹", priceHint: "Membership-based" },
//   "leisure.park": { icon: "🌳", color: "#4ade80", label: "Park", tier: "Free", priceHint: "Free to enter" },
//   "leisure.park.garden": { icon: "🌳", color: "#4ade80", label: "Garden", tier: "Free", priceHint: "Free to enter" },
//   "healthcare.hospital": { icon: "🏥", color: "#f87171", label: "Hospital", tier: "₹₹�be", priceHint: "OPD/emergency charges vary" },
// "healthcare.pharmacy": { icon: "💊", color: "#f87171", label: "Pharmacy", tier: "₹", priceHint: "Medicine cost varies" },
// "catering.pub": { icon: "🍻", color: "#f87171", label: "Pub", tier: "₹₹₹", priceHint: "~₹400–1200 for two" },
// "commercial.supermarket": { icon: "🛒", color: "#facc15", label: "Supermarket", tier: "₹₹", priceHint: "Varies by basket" },
// "commercial.shopping_mall": { icon: "🛍️", color: "#facc15", label: "Mall", tier: "₹₹₹", priceHint: "Varies by store" },
// "service.financial.atm": { icon: "🏧", color: "#34d399", label: "ATM", tier: "Free", priceHint: "No fee to withdraw (bank charges may apply)" },
// "service.financial.bank": { icon: "🏦", color: "#34d399", label: "Bank", tier: "Free", priceHint: "" },
// };

// export const TIER_RANK = { Free: 0, "₹": 1, "₹₹": 2, "₹₹₹": 3, "₹₹₹₹": 4 };

// export function budgetToTier(amount) {
//   if (amount == null) return null;
//   if (amount <= 150) return "₹";
//   if (amount <= 400) return "₹₹";
//   if (amount <= 800) return "₹₹₹";
//   return "₹₹₹₹";
// }
export const CATEGORY_META = {
  "catering.cafe": { icon: "☕", color: "#38bdf8", label: "Cafe", tier: "₹₹", priceHint: "~₹150–400 for two" },
  "education.library": { icon: "📚", color: "#a78bfa", label: "Library", tier: "Free", priceHint: "Usually free entry" },
  "office.coworking": { icon: "🧑‍💻", color: "#34d399", label: "Coworking", tier: "₹₹", priceHint: "~₹200–500/day pass" },
  "activity.hackerspace": { icon: "🛠️", color: "#34d399", label: "Hackerspace", tier: "₹", priceHint: "Often free/low-cost" },
  "commercial.books": { icon: "📖", color: "#a78bfa", label: "Bookstore", tier: "₹", priceHint: "Free to browse" },
  "catering.restaurant": { icon: "🍽️", color: "#fb923c", label: "Restaurant", tier: "₹₹₹", priceHint: "~₹300–900 for two" },
  "catering.bar": { icon: "🍸", color: "#f87171", label: "Bar", tier: "₹₹₹", priceHint: "~₹400–1200 for two" },
  "catering.pub": { icon: "🍻", color: "#f87171", label: "Pub", tier: "₹₹₹", priceHint: "~₹400–1200 for two" },
  "catering.ice_cream": { icon: "🍦", color: "#f472b6", label: "Ice Cream", tier: "₹", priceHint: "~₹50–200" },
  "catering.fast_food": { icon: "🍔", color: "#facc15", label: "Fast Food", tier: "₹", priceHint: "~₹100–300" },
  "catering.food_court": { icon: "🍜", color: "#fb923c", label: "Food Court", tier: "₹", priceHint: "~₹150–350" },
  "commercial.food_and_drink.bakery": { icon: "🥐", color: "#fbbf24", label: "Bakery", tier: "₹", priceHint: "~₹50–250" },
  "sport.fitness": { icon: "🏋️", color: "#22d3ee", label: "Fitness", tier: "₹₹", priceHint: "Membership-based" },
  "leisure.park": { icon: "🌳", color: "#4ade80", label: "Park", tier: "Free", priceHint: "Free to enter" },
  "leisure.park.garden": { icon: "🌳", color: "#4ade80", label: "Garden", tier: "Free", priceHint: "Free to enter" },
  "healthcare.hospital": { icon: "🏥", color: "#f87171", label: "Hospital", tier: "₹₹", priceHint: "OPD/emergency charges vary" },
  "healthcare.pharmacy": { icon: "💊", color: "#f87171", label: "Pharmacy", tier: "₹", priceHint: "Medicine cost varies" },
  "commercial.supermarket": { icon: "🛒", color: "#facc15", label: "Supermarket", tier: "₹₹", priceHint: "Varies by basket" },
  "commercial.shopping_mall": { icon: "🛍️", color: "#facc15", label: "Mall", tier: "₹₹₹", priceHint: "Varies by store" },
 "service.financial.atm": { icon: "🏦", color: "#34d399", label: "ATM", tier: "Free", priceHint: "No withdrawal fee (bank charges may apply)" },
  "service.financial.bank": { icon: "🏦", color: "#34d399", label: "Bank", tier: "Free", priceHint: "" },
  "entertainment.bowling_alley": { icon: "🎳", color: "#a78bfa", label: "Bowling", tier: "₹₹", priceHint: "Per-game pricing" },
  "entertainment.amusement_arcade": { icon: "🎮", color: "#a78bfa", label: "Gaming Zone", tier: "₹₹", priceHint: "Token/credit based" },
  "entertainment.escape_game": { icon: "🧩", color: "#a78bfa", label: "Escape Room", tier: "₹₹₹", priceHint: "Per-person booking" },
  "entertainment.activity_park.climbing": { icon: "🧗", color: "#a78bfa", label: "Indoor Climbing", tier: "₹₹", priceHint: "Session-based" },
  "entertainment.activity_park.trampoline": { icon: "🤸", color: "#a78bfa", label: "Trampoline Park", tier: "₹₹", priceHint: "Session-based" },
  "entertainment.miniature_golf": { icon: "⛳", color: "#a78bfa", label: "Mini Golf", tier: "₹₹", priceHint: "Per round" },
  "entertainment.cinema": { color: "#a78bfa", label: "Cinema", tier: "₹₹", priceHint: "Ticketed" },
"leisure.picnic": { color: "#4ade80", label: "Picnic Spot", tier: "Free", priceHint: "Free to use" },
"sport.pitch": { color: "#22d3ee", label: "Sports Pitch", tier: "₹", priceHint: "Slot booking" },
"sport.swimming_pool": { color: "#22d3ee", label: "Swimming Pool", tier: "₹₹", priceHint: "Entry fee varies" },
  "entertainment.culture.theatre": { icon: "🎭", color: "#a78bfa", label: "Theatre", tier: "₹₹₹", priceHint: "Ticketed" },
  "sport.sports_centre": { icon: "🏸", color: "#a78bfa", label: "Sports Arena", tier: "₹₹", priceHint: "Court/slot booking" },
};

export const TIER_RANK = { Free: 0, "₹": 1, "₹₹": 2, "₹₹₹": 3, "₹₹₹₹": 4 };

export function budgetToTier(amount) {
  if (amount == null) return null;
  if (amount <= 150) return "₹";
  if (amount <= 400) return "₹₹";
  if (amount <= 800) return "₹₹₹";
  return "₹₹₹₹";
}