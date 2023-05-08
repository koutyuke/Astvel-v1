import type { ComponentPropsWithoutRef, FC } from "react";
import {HiOutlinePlusSm} from "react-icons/hi"
import * as Tooltip from '@radix-ui/react-tooltip';

type Props = {
  description:string
} &ComponentPropsWithoutRef<"button">

const AdditionalButton:FC<Props> = ({className,description, ...other}) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button type="button" className={`${className} flex h-10 w-10 items-center justify-center rounded-full bg-white drop-shadow-xl duration-300 hover:scale-110`} {...other}>
          <HiOutlinePlusSm color="black" size={20}/>
          {/* <PlusIcon /> */}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          sideOffset={8}
          className="rounded-lg bg-white px-4 py-2 text-black drop-shadow-xl"
        >
          <p>
            {description}
          </p>
          <Tooltip.Arrow className="fill-white"/>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>


)

export default AdditionalButton