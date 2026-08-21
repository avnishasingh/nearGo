
// import { CATEGORY_META } from "../utils/placeMeta";

// const API_KEY = "3464fc35a5f24352a59b81f378a46e5d";

// export const MOOD_CATEGORIES = {
//   work: ["catering.cafe", "education.library", "office.coworking", "activity.hackerspace", "commercial.books"],
//   date: ["catering.restaurant", "catering.cafe", "catering.ice_cream", "catering.bar"],
//   food: ["catering.fast_food", "catering.food_court", "commercial.food_and_drink.bakery"],
//   budget: ["catering.fast_food", "catering.restaurant", "catering.food_court"],
//   gym: ["sport.fitness"],
//   chill: ["leisure.park", "leisure.park.garden"],
//   hospital: ["healthcare.hospital", "healthcare.pharmacy"],
//   nightlife: ["catering.bar", "catering.pub"],
//   shopping: ["commercial.supermarket", "commercial.shopping_mall"],
//   atm: ["service.financial.atm", "service.financial.bank"],
// };
// const DEFAULT_CATEGORIES = ["catering.restaurant", "catering.cafe"];

// export async function fetchNearbyPlaces(mood, lat, lng, radius, limit = 30) {
//   const categories = (MOOD_CATEGORIES[mood] || DEFAULT_CATEGORIES).join(",");
//   const url =
//     `https://api.geoapify.com/v2/places?categories=${categories}` +
//     `&filter=circle:${lng},${lat},${radius}` +
//     `&bias=proximity:${lng},${lat}` +
//     `&limit=${limit}&apiKey=${API_KEY}`;

//   const res = await fetch(url);
//   if (!res.ok) {
//     const body = await res.text().catch(() => "");
//     throw new Error(`Places request failed (${res.status}): ${body.slice(0, 150)}`);
//   }
//   const data = await res.json();

//   return (data.features || []).map((f) => {
//     const category = (f.properties.categories || []).find((c) => CATEGORY_META[c]) || "place";
//     return {
//       id: f.properties.place_id,
//       name: f.properties.name || f.properties.address_line1 || "Unnamed Place",
//       category,
//       lat: f.properties.lat,
//       lon: f.properties.lon,
//       distanceKm: (f.properties.distance || 0) / 1000,
//       rawOpeningHours: f.properties.datasource?.raw?.opening_hours || null,
//     };
//   });
// }
import { CATEGORY_META } from "../utils/placeMeta";

const API_KEY = "3464fc35a5f24352a59b81f378a46e5d";

export const MOOD_CATEGORIES = {
  work: ["catering.cafe", "education.library", "office.coworking", "activity.hackerspace", "commercial.books"],
  date: ["catering.restaurant", "catering.cafe", "catering.ice_cream", "catering.bar"],
  food: ["catering.fast_food", "catering.food_court", "commercial.food_and_drink.bakery"],
  gym: ["sport.fitness"],
  hospital: ["healthcare.hospital", "healthcare.pharmacy"],
  nightlife: ["catering.bar", "catering.pub"],
  shopping: ["commercial.supermarket", "commercial.shopping_mall"],
  atm: ["service.financial.atm", "service.financial.bank"],
  games: ["entertainment.bowling_alley", "entertainment.amusement_arcade", "entertainment.escape_game"],
  chill: ["leisure.park", "leisure.park.garden", "leisure.picnic"],
  sports: ["sport.sports_centre", "sport.pitch", "sport.swimming_pool", "sport.fitness"],
  shows: ["entertainment.cinema", "entertainment.culture.theatre"],
};
const DEFAULT_CATEGORIES = ["catering.restaurant", "catering.cafe"];

export async function fetchNearbyPlaces(mood, lat, lng, radius, limit = 30) {
  const categories = (MOOD_CATEGORIES[mood] || DEFAULT_CATEGORIES).join(",");
  const url =
    `https://api.geoapify.com/v2/places?categories=${categories}` +
    `&filter=circle:${lng},${lat},${radius}` +
    `&bias=proximity:${lng},${lat}` +
    `&limit=${limit}&apiKey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Places request failed (${res.status}): ${body.slice(0, 150)}`);
  }
  const data = await res.json();

  return (data.features || []).map((f) => {
    const category = (f.properties.categories || []).find((c) => CATEGORY_META[c]) || "place";
    return {
      id: f.properties.place_id,
      name: f.properties.name || f.properties.address_line1 || "Unnamed Place",
      category,
      lat: f.properties.lat,
      lon: f.properties.lon,
      distanceKm: (f.properties.distance || 0) / 1000,
      rawOpeningHours: f.properties.datasource?.raw?.opening_hours || null,
    };
  });
}