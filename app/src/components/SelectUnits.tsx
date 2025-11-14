import { useUnits } from "../hooks/useUnits";
import type { Units } from "../reducers/units.reducer";
import { CheckIcon } from "@heroicons/react/16/solid";

const ChangeOneUnit = ({
  name,
  type,
  options,
}: {
  name: string;
  type: keyof Units;
  options: { name: string; value: string }[];
}) => {
  const { state, dispatch } = useUnits();

  const handleClick = () => {
    const current = state[type];
    const next = options.find((o) => o.value !== current)!.value;

    dispatch({ type: "SET_UNIT", payload: { key: type, value: next } });
  };

  return (
    <div>
      <h4 className="text-sm text-neutral-400">{name}</h4>
      {options.map((o, i) => (
        <button
          key={i}
          onClick={handleClick}
          className={`flex w-full justify-between text-white ${state[type] === o.value && "bg-neutral-300/10"} px-1.5 py-0.5 items-center my-0.5 rounded-md cursor-pointer`}
        >
          {o.name} {state[type] === o.value && <CheckIcon className="size-4" />}
        </button>
      ))}
    </div>
  );
};

export const SelectUnits = ({ visible }: { visible: boolean }) => {
  const { state, dispatch } = useUnits();

  return (
    <div
      className={`w-[180px] not-[hr]:ml-1 rounded-xl **:font-dm bg-slate-900 px-2 py-1.5 absolute top-15 right-2 origin-top ${visible && "animate-fade-in"}`}
    >
      <button
        onClick={() => dispatch({ type: "SWITCH_SYSTEM" })}
        className="text-white hover:bg-neutral-400/10 p-1 w-full text-left rounded-sm mb-1 cursor-pointer ease duration-200"
      >
        Switch to {state.system === "metric" ? "Imperial" : "Metric"}
      </button>
      <ul className="[&>hr]:my-2 [&>hr]:text-neutral-500/20">
        <li>
          <ChangeOneUnit
            name="Temperature"
            type="temperature"
            options={[
              { name: "Celsius (°C)", value: "Celsius" },
              { name: "Fahrenheit (°F)", value: "Fahrenheit" },
            ]}
          />
        </li>
        <hr />
        <li>
          <ChangeOneUnit
            name="Wind Speed"
            type="windSpeed"
            options={[
              { name: "km/h", value: "km/h" },
              { name: "mph", value: "mph" },
            ]}
          />
        </li>
        <hr />
        <li>
          <ChangeOneUnit
            name="Precipitation"
            type="precipitation"
            options={[
              { name: "Milimeters (mm)", value: "mm" },
              { name: "Inches (in)", value: "in" },
            ]}
          />
        </li>
      </ul>
    </div>
  );
};
