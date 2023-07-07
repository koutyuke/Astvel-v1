import { ComponentPropsWithoutRef, FC } from "react";
import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  title: string;
} & ComponentPropsWithoutRef<"div">;

const ContentsTitle: FC<Props> = ({Icon,title, className, ...other}) => (
  <div className={`flex items-center space-x-1 pb-1 ${className}`} {...other}>
    <Icon size={20} color="#ffffff"/>
    <span className="text-2xl underline decoration-1 underline-offset-2">{title}</span>
  </div>
);

export default ContentsTitle;
