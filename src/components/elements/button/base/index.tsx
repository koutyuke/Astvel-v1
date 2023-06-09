import { ComponentPropsWithoutRef, FC } from "react";

type Props = {
  children: string;
} & ComponentPropsWithoutRef<"button">;

const BaseButton: FC<Props> = ({ className, children, ...other }) => (
  <button type="button" className={`h-10 w-20 rounded-lg text-center ${className}`} {...other}>
    {children}
  </button>
);

export default BaseButton;
