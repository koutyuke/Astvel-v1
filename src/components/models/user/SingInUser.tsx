import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  image: string;
  main: string;
  sub: string;
};

const SingInUser: FC<Props> = ({ image, main, sub }) => (
  <Avatar.Root className="relative flex h-14 min-w-[10rem] flex-col overflow-auto py-1 pl-8">
    <Avatar.Image src={image} className="absolute left-0 top-0 h-14 w-14 rounded-full border-[3px] border-white" />
    <div className="h-12 min-w-[8rem] rounded-r-xl bg-white py-1 pl-6 pr-1">
      <div className="flex h-10 min-w-[6.25rem] max-w-[11.25rem] flex-col items-center justify-center overflow-hidden text-ellipsis rounded-lg bg-gray-600 px-2 py-1 text-white">
        <span>{main}</span>
        <span className="text-[6px]">{sub}</span>
      </div>
    </div>
  </Avatar.Root>
);

export default SingInUser;
