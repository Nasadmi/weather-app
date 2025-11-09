import { createContext, type Dispatch, type SetStateAction } from "react";
import { type WeatherData } from "../services/api";

type WeatherContextProps = {
  weather: WeatherData[] | null;
  setWeather: Dispatch<SetStateAction<WeatherData[] | null>>;
};

export const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined,
);
