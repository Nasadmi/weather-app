export interface Units {
  system: "metric" | "imperial";
  temperature: "Fahrenheit" | "Celsius";
  windSpeed: "mph" | "km/h";
  precipitation: "mm" | "in";
}

export interface UnitsAction {
  type: "SWITCH_SYSTEM" | "SET_UNIT";
  payload?: {
    key: keyof Units;
    value: string;
  };
}

export const unitReducer = (state: Units, action: UnitsAction): Units => {
  switch (action.type) {
    case "SWITCH_SYSTEM":
      return state.system === "metric"
        ? {
            system: "imperial",
            temperature: "Fahrenheit",
            windSpeed: "mph",
            precipitation: "in",
          }
        : {
            system: "metric",
            temperature: "Celsius",
            windSpeed: "km/h",
            precipitation: "mm",
          };
    case "SET_UNIT":
      if (!action.payload) return state;
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};
