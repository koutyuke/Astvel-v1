import { ComponentPropsWithoutRef, FC } from "react";
import Image from "next/image";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className"> &
  Pick<ComponentPropsWithoutRef<typeof Image>, "alt"> & {
    imageUrl: string;
    title: string;
  };

const ContentsTitle: FC<Props> = ({ className, imageUrl, title, alt }) => (
  <div className={`flex items-center space-x-1 pb-1 ${className}`}>
    <Image src={imageUrl} alt={alt ?? ""} width={20} height={20} />
    <span className="text-2xl underline decoration-1 underline-offset-2">{title}</span>
  </div>
);

export default ContentsTitle;
