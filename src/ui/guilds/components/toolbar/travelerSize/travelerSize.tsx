import { GridIcon, SmallGridIcon } from "components/icon/grid";
import { ListIcon } from "components/icon/list";
import { ComponentPropsWithoutRef, FC } from "react";
import { useTravelerSizeState } from "stores/travelers";
import { twMerge } from "tailwind-merge";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const TravelerSize: FC<Props> = ({ className }) => {
  const [size, setSize] = useTravelerSizeState();

  return (
    <div className={twMerge("flex w-fit space-x-1", className)}>
      <button
        type="button"
        className={twMerge(
          "h-9 w-9 rounded-md border border-transparent bg-transparent transition hover:border-gray-500",
          size === "regular"
            ? "bg-black-2 shadow-[inset_0px_0px_8px_0px_#000] hover:border-transparent"
            : "hover:bg-black-3",
        )}
        onClick={() => {
          setSize("regular");
        }}
      >
        <ListIcon size={26} className="m-auto fill-gray-400 stroke-gray-400 stroke-[0.5]" />
      </button>
      <button
        type="button"
        className={twMerge(
          "h-9 w-9 rounded-md border border-transparent bg-transparent transition hover:border-gray-500",
          size === "large"
            ? "bg-black-2 shadow-[inset_0px_0px_8px_0px_#000] hover:border-transparent"
            : "hover:bg-black-3",
        )}
        onClick={() => {
          setSize("large");
        }}
      >
        <GridIcon size={24} className={twMerge("m-auto stroke-gray-400")} />
      </button>
      <button
        type="button"
        className={twMerge(
          "h-9 w-9 rounded-md border border-transparent bg-transparent transition hover:border-gray-500",
          size === "small"
            ? "bg-black-2 shadow-[inset_0px_0px_8px_0px_#000] hover:border-transparent"
            : "hover:bg-black-3",
        )}
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
