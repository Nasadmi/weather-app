import { useContext } from "react";
import { UnitsContext } from "../context/units.context";

export const useUnits = () => {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error("This component is not under provider");
  return ctx;
};
