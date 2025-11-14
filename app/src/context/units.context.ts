import { createContext, type Dispatch } from "react";
import type { Units, UnitsAction } from "../reducers/units.reducer";

interface UnitsProps {
  state: Units;
  dispatch: Dispatch<UnitsAction>;
}

export const UnitsContext = createContext<UnitsProps | undefined>(undefined);
