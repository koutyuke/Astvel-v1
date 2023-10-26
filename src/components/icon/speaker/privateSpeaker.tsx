import { IconBaseProps } from "react-icons";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { BiSolidLockAlt } from "react-icons/bi";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  backgroundColor?: string;
};

const PrivateSpeakerIcon: FC<IconBaseProps & Props> = ({ backgroundColor, className, ...props }) => (
  <span className="relative">
    <HiMiniSpeakerWave className={twMerge(className, backgroundColor)} {...props} />
    <BiSolidLockAlt className={twMerge("absolute left-[60%] top-0 h-1/2 w-1/2", backgroundColor)} />
  </span>
);

PrivateSpeakerIcon.defaultProps = {
  backgroundColor: "bg-black-1",
};

export { PrivateSpeakerIcon };
