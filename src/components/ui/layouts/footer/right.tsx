import { FC } from "react";
import {
  SiExpress,
  SiNextdotjs,
  SiPrisma,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiReacthookform,
  SiAxios,
} from "react-icons/si";
import { TbBrandRadixUi } from "react-icons/tb";
import { IoLibrarySharp } from "react-icons/io5";
import ContentsTitle from "./ContentsTitle";

const FooterRightContents: FC = () => (
  <div className="flex flex-col space-y-4">
    <div className="flex h-full w-full  flex-col items-center justify-start space-y-2">
      <ContentsTitle title="Framework" Icon={IoLibrarySharp} />
      <div className="flex space-x-4">
        <SiNextdotjs size={24} />
        <SiExpress size={24} />
      </div>
    </div>
    <div className="flex h-full w-full flex-col items-center justify-start space-y-2">
      <ContentsTitle title="Library" Icon={IoLibrarySharp} />
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
  </div>
);

export default FooterRightContents;
