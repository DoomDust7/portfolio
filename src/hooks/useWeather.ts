"use client";
import { useEffect, useState } from "react";

export type WeatherData = {
  temp: number;
  icon: string;
  condition: string;
  isDay: boolean;
} | null;

function wmoToDisplay(code: number, isDay: boolean): { icon: string; condition: string } {
  if (code === 0) return { icon: isDay ? "☀️" : "🌙", condition: "Clear" };
  if (code <= 3)
    return {
      icon: isDay ? (code === 1 ? "🌤️" : "⛅") : "🌙",
      condition: code === 1 ? "Mainly Clear" : code === 2 ? "Partly Cloudy" : "Overcast",
    };
  if (code <= 48) return { icon: "🌫️", condition: "Foggy" };
  if (code <= 57) return { icon: "🌦️", condition: "Drizzle" };
  if (code <= 67) return { icon: "🌧️", condition: "Rain" };
  if (code <= 77) return { icon: "❄️", condition: "Snow" };
  if (code <= 82) return { icon: "🌦️", condition: "Showers" };
  return { icon: "⛈️", condition: "Thunderstorm" };
}

export function useWeather(): WeatherData {
  const [weather, setWeather] = useState<WeatherData>(null);

  useEffect(() => {
    const fetchWeather = () => {
      fetch(
        "https://api.open-meteo.com/v1/forecast" +
          "?latitude=33.4255&longitude=-111.9400" +
          "&current=temperature_2m,weather_code,is_day" +
          "&temperature_unit=fahrenheit" +
          "&timezone=America%2FPhoenix"
      )
        .then((r) => r.json())
        .then((data) => {
          const temp = Math.round(data.current.temperature_2m as number);
          const code = data.current.weather_code as number;
          const isDay = (data.current.is_day as number) === 1;
          const { icon, condition } = wmoToDisplay(code, isDay);
          setWeather({ temp, icon, condition, isDay });
        })
        .catch(() => {
          // Silently fail — display nothing until next attempt
        });
    };

    fetchWeather();
    // Refresh every 10 minutes
    const id = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return weather;
}
