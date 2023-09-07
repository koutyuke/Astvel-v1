import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = {
  emoji: string;
  name: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

const LargeTeamModel = forwardRef<HTMLDivElement, Props>(({ emoji, name, className, ...other }, ref) => (
  <div
    className={`${className} flex h-24 w-20 flex-col items-center justify-center space-y-1 rounded-xl p-[2px]`}
    ref={ref}
    {...other}
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white">
      <p className="text-5xl">{emoji === "" ? name[0] : emoji}</p>
    </div>
    <p className="h-6 w-[4.5rem] overflow-hidden text-ellipsis text-center">
      <span className="text-xs">{name}</span>
    </p>
  </div>
));

LargeTeamModel.displayName = "LargeTeamModel";

export { LargeTeamModel };
