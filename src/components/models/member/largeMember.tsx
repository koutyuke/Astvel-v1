import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  imageUrl: string;
  name: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

const LargeMemberModel = forwardRef<HTMLDivElement, Props>(({ imageUrl, name, className, style, ...other }, ref) => (
  <div className={`${className} h-24 w-20 rounded-xl`} ref={ref} style={style} {...other}>
    <Avatar.Root className="flex h-24 w-20 flex-col items-center justify-center space-y-1 p-[2px]">
      <Avatar.Image src={imageUrl} className="h-14 w-14 rounded-full" />
      <p className="h-4 w-[4.5rem] overflow-hidden text-ellipsis text-center">
        <span className="text-xs">{name}</span>
      </p>
    </Avatar.Root>
  </div>
));

LargeMemberModel.displayName = "LargeMemberModel";

export default LargeMemberModel;
