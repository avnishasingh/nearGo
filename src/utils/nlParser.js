import { budgetToTier } from "./placeMeta";

const MOOD_KEYWORDS = {
  work: [
    "work", "study", "quiet", "focus", "cowork", "coworking", "office",
    "kaam", "padhai", "padhna", "shanti", "silent", "wifi", "laptop",
    "study spot", "reading", "library",
  ],
  date: [
    "date", "romantic", "girlfriend", "boyfriend", "gf", "bf", "couple",
    "candle light", "candlelight", "propose", "anniversary", "hangout",
  ],
  food: [
    "hungry", "quick", "snack", "eat", "food", "khana", "khane", "bhookh",
    "bhookha", "bhookhi", "nashta", "chai", "thanda", "thanda peene",
    "cold", "cold drink", "drink", "juice", "beverage", "coffee", "cafe",
    "coffee shop", "lunch", "dinner", "breakfast", "restaurant",
    "dhaba", "eating", "meal", "pizza", "burger", "biryani", "chaat",
    "ice cream", "icecream", "bakery", "sweet", "mithai", "milkshake",
    "shake", "smoothie",
  ],
  gym: [
    "gym", "workout", "exercise", "fitness", "body", "muscle", "training",
    "yoga", "cardio", "crossfit", "kasrat",
  ],
  hospital: [
    "hospital", "doctor", "clinic", "medicine", "pharmacy", "medical",
    "dawai", "dawa", "chemist", "emergency", "beemar", "bimar", "sick",
    "checkup", "treatment", "ilaj",
  ],
  nightlife: [
    "bar", "pub", "nightlife", "drinks", "party", "club", "clubbing",
    "sharab", "daaru", "alcohol", "beer", "wine", "cocktail",
  ],
  shopping: [
    "shopping", "mall", "shop", "store", "market", "bazaar", "kapde",
    "clothes", "clothing", "kharidna", "kharidari", "khareedari",
    "sale", "showroom", "boutique", "footwear", "juta", "jutte",
    "electronics", "grocery", "supermarket", "kirana",
  ],
  atm: [
    "atm", "bank", "cash", "paisa", "paise", "withdraw", "nikalna",
    "money", "rupay", "rupaye",
  ],
  games: [
    "game", "games", "bowling", "arcade", "gaming", "khel", "khelna",
    "pool table", "snooker", "billiards", "video game",
  ],
  chill: [
    "chill", "relax", "park", "walk", "bored", "ghumna", "sair",
    "boring", "time pass", "timepass", "aaram", "rest", "peaceful",
    "garden", "bagh", "fresh air",
  ],
  sports: [
    "sports", "cricket", "football", "swimming", "pool", "match",
    "badminton", "tennis", "volleyball", "khel kood", "stadium",
    "ground", "practice",
  ],
  shows: [
    "movie", "cinema", "film", "theatre", "show", "picture", "multiplex",
    "watching", "dekhna",
  ],
  budget: [
    "cheap", "budget", "affordable", "sasta", "sasti", "kam paise",
    "low cost", "economical",
  ],
};
export function parseQuery(text) {
  const lower = text.toLowerCase();
  let mood = null;
  for (const [key, words] of Object.entries(MOOD_KEYWORDS)) {
    if (words.some((w) => lower.includes(w))) { mood = key; break; }
  }
  const budgetMatch = lower.match(/₹?\s*(\d{2,5})/);
  const maxBudget = budgetMatch ? parseInt(budgetMatch[1]) : null;
  const distMatch = lower.match(/(\d+(\.\d+)?)\s*km/);
  const maxDistanceKm = distMatch ? parseFloat(distMatch[1]) : null;

  return { mood, maxBudget, maxBudgetTier: budgetToTier(maxBudget), maxDistanceKm };
  
}
export { MOOD_KEYWORDS };