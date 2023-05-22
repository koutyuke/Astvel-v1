import { FC, ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AdditionalButton from "../button/additional";

type Props = {
  children: ReactNode;
};

const CreateDialog: FC<Props> = ({ children }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <AdditionalButton />
    </Dialog.Trigger>
    <Dialog.Portal className="">
      <Dialog.Overlay className="fixed inset-0 z-[51] bg-[rgba(0,0,0,0.5)]" />
      <Dialog.Content className="fixed top-[50%] left-[50%] z-[52] translate-x-[-50%] translate-y-[-50%]">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default CreateDialog;
