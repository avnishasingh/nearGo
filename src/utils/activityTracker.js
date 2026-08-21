export function trackSearch(mood) {
  const now = new Date();
  const monthKey = `smart_places_searches_${now.getFullYear()}_${now.getMonth()}`;
  localStorage.setItem(monthKey, (parseInt(localStorage.getItem(monthKey) || "0", 10) + 1).toString());
  if (mood) {
    const counts = JSON.parse(localStorage.getItem("smart_places_mood_counts") || "{}");
    counts[mood] = (counts[mood] || 0) + 1;
    localStorage.setItem("smart_places_mood_counts", JSON.stringify(counts));
  }
}
export function getSearchCountThisMonth() {
  const now = new Date();
  return parseInt(localStorage.getItem(`smart_places_searches_${now.getFullYear()}_${now.getMonth()}`) || "0", 10);
}
export function getMoodCounts() {
  return JSON.parse(localStorage.getItem("smart_places_mood_counts") || "{}");
}