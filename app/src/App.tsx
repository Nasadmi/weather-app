import { useEffect } from "react";
import { getWeatherFromActualPos } from "./services/api";
import { useGeolocation } from "./hooks/useGeolocation";
import { useWeather } from "./hooks/useWeather";
import { useUnits } from "./hooks/useUnits";
import { Header } from "./components/Header";

function App() {
  const { weather, setWeather } = useWeather();
  const { position, error } = useGeolocation();
  const { state } = useUnits();

  useEffect(() => {
    (async () => {
      if (position) {
        const weather = await getWeatherFromActualPos(
          position.lat,
          position.long,
        );
        setWeather(weather);
      }
    })();
  }, [position]);

  return (
    <main className="">
      <Header />
      {error && <p>{error}</p>}
      {weather &&
        weather.map((data, i) => (
          <p key={i}>
            {`${data.time.getDate()} ${data.time.toLocaleDateString(undefined, { weekday: "long" })}`}
            <br />
            {state.temperature === "Celsius"
              ? data.temperature.toFixed(1)
              : (data.temperature * (9 / 5) + 32).toFixed(1)}{" "}
            {state.temperature}
            <br />
            {state.temperature === "Celsius"
              ? data.apparent_temperature.toFixed(1)
              : (data.apparent_temperature * (9 / 5) + 32).toFixed(1)}{" "}
            {state.temperature}
            <br />
            {state.windSpeed === "km/h"
              ? data.wind_speed.toFixed(1)
              : (data.wind_speed * 0.621371).toFixed(1)}{" "}
            {state.windSpeed}
            <br />
            {state.precipitation === "mm"
              ? data.precipitation.toFixed(1)
              : (data.precipitation / 25.4).toFixed(1)}{" "}
            {state.precipitation}
          </p>
        ))}
    </main>
  );
}

export default App;
