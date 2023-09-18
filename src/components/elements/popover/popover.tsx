import * as radixPopover from "@radix-ui/react-popover";
import { ComponentProps, Dispatch, FC, ReactNode, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentProps<typeof radixPopover.Content>;

const createPopover: (TriggerButton: ReactNode) => FC<Props> = TriggerButton => {
  const Popover: FC<Props> = ({ children, open, setOpen, className, ...contentProps }) => (
    <radixPopover.Root open={open} onOpenChange={setOpen}>
      <radixPopover.Trigger asChild>{TriggerButton}</radixPopover.Trigger>
      <radixPopover.Portal>
        <radixPopover.Content
          className={twMerge("rounded-lg p-3 outline outline-1 outline-white", className)}
          {...contentProps}
        >
          {children}
          <radixPopover.Arrow className="fill-white" />
        </radixPopover.Content>
      </radixPopover.Portal>
    </radixPopover.Root>
  );
  return Popover;
};

export { createPopover };
