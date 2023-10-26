import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const Separator: FC<Props> = ({ className }) => {
  return <div className={twMerge("mx-2 h-full w-[1px] rounded-full bg-gray-500", className)} />;
};

export { Separator };
