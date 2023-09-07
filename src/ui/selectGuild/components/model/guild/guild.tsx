import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  id: string;
  icon: string | undefined;
  name: string;
};

const Guild: FC<Props> = ({ id, icon, name }) => {
  const image = `https://cdn.discordapp.com/icons/${id}/${icon}.png `;

  return (
    <div className="flex h-40 w-40 flex-col items-center justify-center space-y-4 rounded-lg bg-white shadow-xl duration-100 hover:scale-105">
      {icon ? (
        <Avatar.Root className="">
          <Avatar.Image src={image} className="h-20 w-20 rounded-full" />
        </Avatar.Root>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-500 ">
          <p className=" text-center text-2xl text-white">{name[0]}</p>
        </div>
      )}

      <p className="w-32 truncate px-2 text-center text-sm text-black">{name}</p>
    </div>
  );
};

export { Guild };
