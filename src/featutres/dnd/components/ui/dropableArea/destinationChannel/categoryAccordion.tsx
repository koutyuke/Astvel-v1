import { type FC, type ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { BiCategory } from "react-icons/bi";
import { IoLockClosed } from "react-icons/io5";

type Props = {
  children: ReactNode;
  name: string;
  value: string;
  isPrivate: boolean;
};

const CategoryAccordion: FC<Props> = ({ children, name, value, isPrivate }) => (
  <Accordion.Item value={value} className="w-full">
    <Accordion.Header>
      <Accordion.Trigger className="group flex w-full space-x-1 p-1">
        {isPrivate ? <IoLockClosed size={20} /> : <BiCategory size={20} />}
        <p className=" w-full">
          <span className="">{name}</span>
        </p>
        <ChevronDownIcon className="h-4 w-4 duration-300 group-data-[state=closed]:rotate-180" />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="flex flex-col space-y-1">{children}</Accordion.Content>
  </Accordion.Item>
);

export default CategoryAccordion;
