import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import * as radixDialog from "@radix-ui/react-dialog";

type Props = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const createDialog: (TriggerButton: ReactNode) => FC<Props> = TriggerButton => {
  const Dialog: FC<Props> = ({ children, open, setOpen }) => (
    <radixDialog.Root open={open} onOpenChange={setOpen}>
      <radixDialog.Trigger asChild>{TriggerButton}</radixDialog.Trigger>
      <radixDialog.Portal>
        <radixDialog.Overlay className="fixed inset-0 z-[999] bg-[rgba(0,0,0,0.5)]" />
        <radixDialog.Content className="fixed left-[50%] top-[50%] z-[1000] translate-x-[-50%] translate-y-[-50%]">
          {children}
        </radixDialog.Content>
      </radixDialog.Portal>
    </radixDialog.Root>
  );
  return Dialog;
};

export { createDialog };
