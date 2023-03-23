import { ComponentPropsWithoutRef, FC } from "react";

type Props = {
  emoji: string;
  name: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

const LargeTeamModel: FC<Props> = ({ emoji, name, className, ...other }) => (
  <div
    className={`${className} flex h-24 w-20 flex-col items-center justify-center space-y-1 rounded-xl p-[2px]`}
    {...other}
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white">
      <p className="text-5xl text-black">{emoji === "" ? name[0] : emoji}</p>
    </div>
    <p className="h-4 w-[4.5rem] overflow-hidden text-ellipsis text-center">
      <span className="text-xs">{name}</span>
    </p>
  </div>
);

export default LargeTeamModel;
