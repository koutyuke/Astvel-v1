import { FC } from "react";
import { TbTool } from "react-icons/tb";
import { LuMinusCircle } from "react-icons/lu";

const ToolTitle: FC = () => (
  <div className="relative flex h-12 w-full items-center justify-start rounded-md  bg-[rgba(255,255,255,0.6)] duration-200 group-hover:w-full">
    <span className="absolute left-[2px] top-[2px] -rotate-45">
      <LuMinusCircle size={10} />
    </span>
    <span className="absolute right-[2px] top-[2px] rotate-45">
      <LuMinusCircle size={10} />
    </span>
    <span className="absolute bottom-[2px] left-[2px] rotate-45">
      <LuMinusCircle size={10} />
    </span>
    <span className="absolute bottom-[2px] right-[2px] -rotate-45">
      <LuMinusCircle size={10} />
    </span>
    <div className="flex h-12 w-full max-w-[3rem] items-center justify-center">
      <TbTool size={24} color="#115e59" />
    </div>
    <div className="hidden h-full w-[calc(100%_-_3rem)] items-center justify-start group-hover:flex ">
      <p className="text-start text-xl ">Tools</p>
    </div>
  </div>
);

export default ToolTitle;
