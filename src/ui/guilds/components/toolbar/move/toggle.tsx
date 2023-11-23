import { CategoryIcon } from "components/icon/category";
import { PrivateSpeakerIcon, SpeakerIcon } from "components/icon/speaker";
import { TeamIcon } from "components/icon/team";
import { ComponentPropsWithoutRef, FC, ReactNode, useState } from "react";
import { IconBaseProps } from "react-icons";
import { twMerge } from "tailwind-merge";
import { PiArrowsInLineVerticalBold, PiArrowsOutLineVerticalBold } from "react-icons/pi";

type Props = {
  type: "voice" | "team" | "category" | "privateVoice";
  name: string;
  children: ReactNode;
} & Pick<ComponentPropsWithoutRef<"div">, "className">;

type IconProps = {
  type: Props["type"];
} & IconBaseProps;

const Icon: FC<IconProps> = ({ type, ...props }) => {
  switch (type) {
    case "category":
      return <CategoryIcon {...props} />;
    case "team":
      return <TeamIcon {...props} />;
    case "voice":
      return <SpeakerIcon {...props} />;
    case "privateVoice":
      return <PrivateSpeakerIcon {...props} />;
    default:
      return null;
  }
};

const Toggle: FC<Props> = ({ type, name, className, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={twMerge("w-full space-y-2", className)}>
      <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-gray-500 p-2">
        <Icon className="h-6 w-6" type={type} />
        <span className="w-1 flex-1 truncate">{name}</span>
      </div>
      <div className="grid h-fit w-full grid-cols-[2rem_,_1fr]  gap-1">
        <button
          type="button"
          className="group relative mx-1 flex h-full min-h-[2.5rem] w-6 justify-center py-1"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="relative h-full w-[1px] min-w-[1px] bg-gray-500 transition before:absolute before:left-1/2 before:top-0 before:h-1.5  before:w-1.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-500 before:content-['']  after:absolute after:bottom-0 after:left-1/2 after:h-1.5  after:w-1.5 after:-translate-x-1/2 after:translate-y-1/2 after:rounded-full after:bg-gray-500 after:content-[''] group-hover:bg-green-500 group-hover:before:bg-green-500 group-hover:after:bg-green-500" />
          <span className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-500 bg-black-1 transition hover:stroke-green-500 group-hover:border-green-500">
            {open && <PiArrowsInLineVerticalBold size={16} className="fill-gray-500 group-hover:fill-green-500" />}
            {!open && <PiArrowsOutLineVerticalBold size={16} className="fill-gray-500 group-hover:fill-green-500" />}
          </span>
        </button>
        <div className={twMerge("h-fit w-full pt-2", !open && "hidden")}>{children}</div>
      </div>
    </div>
  );
};

export { Toggle };
