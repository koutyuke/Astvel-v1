import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  image: string;
  main: string;
  sub: string;
};

const SmallSignInUser: FC<Props> = ({ image, main, sub }) => (
  <Avatar.Root className="relative h-14 min-w-[10rem] max-w-full">
    <div className="absolute left-0 top-0 z-[1] h-14 w-14 rounded-full bg-white p-[3px]">
      <Avatar.Image src={image} className="h-[50px] w-[50px] rounded-full" />
    </div>
    <div className="my-1 ml-8 h-12 min-w-[8rem] max-w-full rounded-r-xl bg-white py-1 pl-6 pr-1">
      <div className="flex h-10 min-w-[6rem] flex-col items-center justify-center rounded-lg bg-gray-600 px-2 py-1 text-white">
        <span className="max-w-full overflow-hidden text-ellipsis">{main}</span>
        <span className="max-w-full overflow-hidden text-ellipsis text-[6px]">{sub}</span>
      </div>
    </div>
  </Avatar.Root>
);

export { SmallSignInUser };