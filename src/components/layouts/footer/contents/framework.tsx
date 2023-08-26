import { ComponentPropsWithoutRef, FC } from "react";
import { SiExpress, SiNextdotjs } from "react-icons/si";
import { IoLibrarySharp } from "react-icons/io5";
import { Title } from "./title";

type Props = ComponentPropsWithoutRef<"div">;

const Framework: FC<Props> = ({ className, ...other }) => (
  <div className={`flex flex-col items-center justify-start space-y-2 ${className}`} {...other}>
    <Title title="Framework" Icon={IoLibrarySharp} />
    <div className="flex space-x-4">
      <SiNextdotjs size={24} />
      <SiExpress size={24} />
    </div>
  </div>
);

export { Framework };
