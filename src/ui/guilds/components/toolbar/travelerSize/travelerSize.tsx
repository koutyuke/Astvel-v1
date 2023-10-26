import { GridIcon, SmallGridIcon } from "components/icon/grid";
import { RowsIcon } from "components/icon/rows";
import { FC } from "react";
import { useTravelerSizeState } from "stores/travelers";
import { twMerge } from "tailwind-merge";

const TravelerSize: FC = () => {
  const [size, setSize] = useTravelerSizeState();

  return (
    <div className="mx-1 flex w-[6.5rem] space-x-1">
      <button
        type="button"
        className={twMerge("group h-8 w-8 rounded-md transition", size === "regular" && "bg-black-3")}
        onClick={() => {
          setSize("regular");
        }}
      >
        <RowsIcon size={24} className="m-auto fill-gray-400 transition group-hover:fill-green-500" />
      </button>
      <button
        type="button"
        className={twMerge("group h-8 w-8 rounded-md transition", size === "large" && "bg-black-3")}
        onClick={() => {
          setSize("large");
        }}
      >
        <GridIcon size={24} className={twMerge("m-auto stroke-gray-400 transition group-hover:stroke-green-500")} />
      </button>
      <button
        type="button"
        className={twMerge("group h-8 w-8 rounded-md transition", size === "small" && "bg-black-3")}
        onClick={() => {
          setSize("small");
        }}
      >
        <SmallGridIcon size={24} className={twMerge("m-auto fill-gray-400 transition group-hover:fill-green-500")} />
      </button>
    </div>
  );
};

export { TravelerSize };
