export async function fetchWeather(lat, lon) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code`);
    const data = await res.json();
    const code = data.current?.weather_code;
    return { isRainy: [51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(code), isSunny: [0,1].includes(code) };
  } catch { return null; }
}