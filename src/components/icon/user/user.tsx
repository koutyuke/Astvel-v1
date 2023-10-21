import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

type Props = {
  image: string;
} & ComponentPropsWithoutRef<"div">;

const UserIcon: FC<Props> = ({ image, className, ...other }) => (
  <div
    className={twMerge("box-border h-10 w-10 overflow-hidden rounded-full border-2 border-gray-400", className)}
    {...other}
  >
    <Image src={image} priority loading="eager" alt="user icon" width={100} height={100} />
  </div>
);

export { UserIcon };
