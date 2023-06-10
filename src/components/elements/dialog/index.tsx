import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  children: ReactNode;
  TrigerButton: FC;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const BaseDialog: FC<Props> = ({ TrigerButton, children, open, setOpen }) => (
  <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
      <TrigerButton />
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[51] bg-[rgba(0,0,0,0.5)]" />
      <Dialog.Content className="fixed top-[50%] left-[50%] z-[52] translate-x-[-50%] translate-y-[-50%]">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default BaseDialog;
