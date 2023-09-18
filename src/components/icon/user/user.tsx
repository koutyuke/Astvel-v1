import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

type Props = {
  image: string;
} & ComponentPropsWithoutRef<"div">;

const UserIcon: FC<Props> = ({ image, className, ...other }) => (
  <div
    className={twMerge("h-9 w-9 overflow-hidden rounded-full outline outline-2 outline-white", className)}
    {...other}
  >
    <Image src={image} alt="user icon" width={100} height={100} />
  </div>
);

export { UserIcon };
