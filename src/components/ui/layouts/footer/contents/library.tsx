import { ComponentPropsWithoutRef, FC } from "react";
import { SiPrisma, SiReact, SiSocketdotio, SiTailwindcss, SiReacthookform, SiAxios } from "react-icons/si";
import { TbBrandRadixUi } from "react-icons/tb";
import { IoLibrarySharp } from "react-icons/io5";
import Title from "./title";

type Props = ComponentPropsWithoutRef<"div">;

const Framework: FC<Props> = ({ className, ...other }) => (
  <div className={`flex h-full w-full flex-col items-center justify-start space-y-2 ${className}`} {...other}>
    <Title title="Library" Icon={IoLibrarySharp} />
    <div className="grid w-[10rem] grid-cols-4 grid-rows-[repeat(auto-fit,2rem)] place-content-center place-items-center gap-2">
      <SiReact size={24} />
      <SiTailwindcss size={24} />
      <SiSocketdotio size={24} />
      <TbBrandRadixUi size={24} />
      <SiPrisma size={24} />
      <SiReacthookform size={24} />
      <SiAxios size={24} />
    </div>
  </div>
);

export default Framework;
