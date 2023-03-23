import { ComponentPropsWithoutRef, FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  imageUrl: string;
  name: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

const LargeMemberModel: FC<Props> = ({ imageUrl, name, className, ...other }) => (
  <Avatar.Root
    className={`${className} flex h-24 w-20 flex-col items-center justify-center space-y-1 rounded-xl p-[2px]`}
    {...other}
  >
    <Avatar.Image src={imageUrl} className="h-14 w-14 rounded-full" />
    <p className="h-4 w-[4.5rem] overflow-hidden text-ellipsis text-center">
      <span className="text-xs">{name}</span>
    </p>
  </Avatar.Root>
);

export default LargeMemberModel;
