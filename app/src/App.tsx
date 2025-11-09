import { useEffect } from "react";
import { getWeatherFromActualPos } from "./services/api";
import { useGeolocation } from "./hooks/useGeolocation";
import { useWeather } from "./hooks/useWeather";

function App() {
  const { weather, setWeather } = useWeather();
  const { position, error } = useGeolocation();
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
      {error && <p>{error}</p>}
      {weather &&
        weather.map((data) => (
          <p>
            {data.time.toString()}
            <br />
            {data.apparent_temperature}
          </p>
        ))}
    </main>
  );
}

export default App;
