import * as Tooltip from "@radix-ui/react-tooltip";
import { FC, ReactNode } from "react";

type Props = {
  description: string;
  children: ReactNode;
}

const BaseToolTip:FC<Props> = ({description, children}) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content sideOffset={8} className="rounded-lg bg-white px-4 py-2 text-black drop-shadow-xl">
          <p>{description}</p>
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
)

export default BaseToolTip