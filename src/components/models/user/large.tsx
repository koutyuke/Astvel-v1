import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  image: string;
  main: string;
  sub: string;
};

const LargeSignInUser: FC<Props> = ({ image, main, sub }) => (
  <Avatar.Root className="relative flex w-32 flex-col items-center space-y-3 opacity-100">
    <Avatar.Image src={image} className="h-32 w-32 rounded-full border-4 border-white" />
    <div className="flex w-32 flex-col items-center overflow-hidden text-ellipsis rounded-lg text-white">
      <p className="text-xl">{main}</p>
      <p className="text-sm">{sub}</p>
    </div>
  </Avatar.Root>
);

export default LargeSignInUser;
