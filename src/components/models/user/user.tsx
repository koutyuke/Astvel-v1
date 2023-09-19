import { FC, ReactNode, useState } from "react";
import { createPopover } from "components/elements/popover";
import { UserIcon } from "components/icon/user";

type Props = {
  name: string;
  id: string;
  image: string;
  contentAlignment?: "start" | "center" | "end";
  children?: ReactNode;
};

const User: FC<Props> = ({ id, name, image, children, contentAlignment }) => {
  const [open, setOpen] = useState(false);
  const Popover = createPopover(
    <button type="button">
      <UserIcon image={image} id={id} className="transition hover:border-green-500" />
    </button>,
  );

  return (
    <Popover open={open} setOpen={setOpen} sideOffset={10} align={contentAlignment} className="z-[60] bg-black px-6">
      <p className="text-center text-xl">{name}</p>
      <p className="text-center text-sm">{id}</p>
      {children}
    </Popover>
  );
};

User.defaultProps = {
  children: undefined,
  contentAlignment: "center",
};

export { User };
