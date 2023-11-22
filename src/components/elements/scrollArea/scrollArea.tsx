import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
} & Pick<ComponentPropsWithoutRef<typeof RadixScrollArea.Root>, "className" | "type">;

const ScrollArea: FC<Props> = ({ children, className, type }) => {
  return (
    <RadixScrollArea.Root className={twMerge("overflow-hidden", className)} type={type}>
      <RadixScrollArea.Viewport className="h-full w-full">{children}</RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        orientation="vertical"
        className="z-[9999] box-border flex touch-none select-none rounded-full border border-transparent p-0.5 transition-all duration-100 ease-in-out hover:m-0.5 hover:border-gray-500 hover:bg-white/10 data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:hover:w-4"
      >
        <RadixScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-500 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar
        orientation="horizontal"
        className="z-[9999] box-border flex touch-none select-none rounded-full border border-transparent p-0.5 transition-all duration-100 ease-in-out hover:m-0.5 hover:border-gray-500 hover:bg-white/10 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:hover:h-4"
      >
        <RadixScrollArea.Thumb className="relative flex-1 rounded-full  bg-gray-500 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner className="bg-transparent" />
    </RadixScrollArea.Root>
  );
};

export { ScrollArea };
