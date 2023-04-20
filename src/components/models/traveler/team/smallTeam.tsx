import { ComponentPropsWithRef, FC } from "react";

type Props = {
  emoji: string;
  name: string;
} & Omit<ComponentPropsWithRef<"div">, "children">;

const SmallTeamModel: FC<Props> = ({ emoji, name, className, ...props }) => (
  <div className={`${className} flex h-[30px] items-center justify-start space-x-2 pl-1`} {...props}>
    <div className="w-6 text-center text-2xl">{emoji === "" ? name[0] : emoji}</div>
    <p className="truncate">
      <span className="text-sm">{name}</span>
    </p>
  </div>
);

export default SmallTeamModel;
