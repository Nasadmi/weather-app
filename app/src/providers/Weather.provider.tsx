import { useState, type ReactNode } from "react";
import { WeatherContext } from "../context/weather.context";
import type { WeatherData } from "../services/api";

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData[] | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
