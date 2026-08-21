export function getTimeContext() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return { label: "Best for Breakfast & Work", icon: "☕", mood: "work" };
  if (hour >= 11 && hour < 16) return { label: "Best for Lunch", icon: "🍱", mood: "food" };
  if (hour >= 16 && hour < 21) return { label: "Best for Date Night", icon: "❤️", mood: "date" };
  return { label: "Late-night options", icon: "🌙", mood: "food" };
}