import { fetchWeatherApi } from "openmeteo";

const url = "https://api.open-meteo.com/v1/forecast";

export interface WeatherParams {
  latitude: number;
  longitude: number;
  hourly: string[];
  timezone: string;
}

export interface WeatherResponse {
  hourly: {
    time: Date[];
    temperature_2m: Float32Array | null;
    relative_humidity_2m: Float32Array | null;
    wind_speed_180m: Float32Array | null;
    precipitation_probability: Float32Array | null;
    apparent_temperature: Float32Array | null;
  };
}

export interface WeatherData {
  time: Date;
  temperature: number;
  humidity: number;
  wind_speed: number;
  precipitation_probability: number;
  apparent_temperature: number;
}

export const getWeatherFromActualPos = async (lat: number, long: number) => {
  const params: WeatherParams = {
    latitude: lat,
    longitude: long,
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_180m",
      "precipitation_probability",
      "apparent_temperature",
    ],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  const responses = await fetchWeatherApi(url, params);
  const res = responses[0];
  const utcOffsetSeconds = res.utcOffsetSeconds();

  const hourly = res.hourly()!;
  const weatherResponse: WeatherResponse = {
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      relative_humidity_2m: hourly.variables(1)!.valuesArray(),
      wind_speed_180m: hourly.variables(2)!.valuesArray(),
      precipitation_probability: hourly.variables(3)!.valuesArray(),
      apparent_temperature: hourly.variables(4)!.valuesArray(),
    },
  };

  const weatherData = weatherResponse.hourly.time
    .filter((t) => Date.now() > t.getMilliseconds())
    .map<WeatherData>((t, i) => ({
      time: t,
      temperature: weatherResponse.hourly.temperature_2m![i],
      humidity: weatherResponse.hourly.relative_humidity_2m![i],
      wind_speed: weatherResponse.hourly.wind_speed_180m![i],
      apparent_temperature: weatherResponse.hourly.apparent_temperature![i],
      precipitation_probability:
        weatherResponse.hourly.precipitation_probability![i],
    }));

  return weatherData;
};
