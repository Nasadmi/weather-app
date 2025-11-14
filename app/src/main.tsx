import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WeatherProvider } from "./providers/Weather.provider.tsx";
import { UnitsProvider } from "./providers/Units.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherProvider>
      <UnitsProvider>
        <App />
      </UnitsProvider>
    </WeatherProvider>
  </StrictMode>,
);
