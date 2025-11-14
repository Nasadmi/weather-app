import { useReducer, type ReactNode } from "react";
import { UnitsContext } from "../context/units.context";
import { unitReducer, type Units } from "../reducers/units.reducer";

const initialState: Units = {
  system: "metric",
  temperature: "Celsius",
  windSpeed: "km/h",
  precipitation: "mm",
};

export const UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(unitReducer, initialState);

  return (
    <UnitsContext.Provider value={{ state, dispatch }}>
      {children}
    </UnitsContext.Provider>
  );
};
