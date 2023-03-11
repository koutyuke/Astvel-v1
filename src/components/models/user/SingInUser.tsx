import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  image: string;
  name: string;
  discriminator: string;
};

const SingInUser: FC<Props> = ({ image, name, discriminator }) => (
  <Avatar.Root className="relative flex h-14 min-w-[10rem] flex-col overflow-auto py-1 pl-8">
    <Avatar.Image src={image} className="absolute top-0 left-0 h-14 w-14 rounded-full border-[3px] border-white" />
    <div className="h-12 min-w-[8rem] rounded-r-xl bg-white py-1 pr-1 pl-6">
      <div className="flex h-10 min-w-[6.25rem] max-w-[11.25rem] flex-col items-center justify-center overflow-hidden text-ellipsis rounded-lg bg-gray-600 py-1 px-2">
        <span>{name}</span>
        <span className="text-[6px]">#{discriminator}</span>
      </div>
    </div>
  </Avatar.Root>
);

export default SingInUser;
