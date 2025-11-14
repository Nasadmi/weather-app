import { CloudIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { SelectUnits } from "./SelectUnits";
import { useState } from "react";

export const Header = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <header className="flex justify-between p-3 items-center relative">
      <div className="flex gap-2 items-center font-bricolage">
        <CloudIcon className="size-8 text-orange-600" />
        <h3 className="text-lg font-bold text-white">Weather Now</h3>
      </div>
      <button
        className="flex gap-2 items-center bg-slate-900 p-2 ease-in-out duration-200 rounded-xl text-white font-dm cursor-pointer border-transparent border-2 focus:border-white outline-0"
        onClick={() => setVisible(!visible)}
      >
        <Cog6ToothIcon className="size-5" />
        <span className="flex text-sm items-center gap-1">
          Units
          <ChevronDownIcon className="size-4" />
        </span>
      </button>
      {visible && <SelectUnits visible={visible} />}
    </header>
  );
};
