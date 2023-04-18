import { ComponentPropsWithRef, FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  imageUrl: string;
  name: string;
} & Omit<ComponentPropsWithRef<"div">, "children">;

const SmallMemberModel: FC<Props> = ({ imageUrl, name, className, ...props }) => (
  <Avatar.Root
    className={`${className} flex h-[30px] items-center justify-start space-x-1 bg-gray-300 pl-1`}
    {...props}
  >
    <Avatar.Image src={imageUrl} className="h-6 w-6 rounded-full" />
    <p className="truncate">
      <span className="text-sm">{name}</span>
    </p>
  </Avatar.Root>
);

export default SmallMemberModel;
