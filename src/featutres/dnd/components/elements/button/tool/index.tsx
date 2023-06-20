import { ComponentPropsWithoutRef, FC, forwardRef } from "react";
import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  title: string;
} & ComponentPropsWithoutRef<"button">;

const BaseToolButton: FC<Props> = forwardRef<HTMLButtonElement, Props>(({ Icon, title, ...other }, ref) => (
  <button
    type="button"
    ref={ref}
    className="flex h-12 w-full items-center justify-start rounded-md bg-[rgba(255,255,255,0.6)] shadow-lg duration-200 hover:scale-105 group-hover:w-full"
    {...other}
  >
    <div className="flex h-12 w-full max-w-[3rem] items-center justify-center">
      <Icon size={24} color="#115e59" />
    </div>
    <div className="hidden h-full w-[calc(100%_-_3rem)] items-center justify-start group-hover:flex ">
      <p className="text-start text-xl ">{title}</p>
    </div>
  </button>
));

BaseToolButton.displayName = "toolButton";

export default BaseToolButton;
