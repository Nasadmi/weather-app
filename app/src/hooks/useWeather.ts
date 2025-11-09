import { useContext } from "react";
import { WeatherContext } from "../context/weather.context";

export const useWeather = () => {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("This component is not under Weather Context");
  return ctx;
};
