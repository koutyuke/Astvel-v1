import { ComponentPropsWithoutRef, FC, forwardRef } from "react";

type Props = {
  children: string;
} & ComponentPropsWithoutRef<"button">;

const BaseButton: FC<Props> = forwardRef<HTMLButtonElement, Props>(({ className, children, ...other }, ref) => (
  <button type="button" ref={ref} className={`h-10 w-20 rounded-lg text-center ${className}`} {...other}>
    {children}
  </button>
));

BaseButton.displayName = "BaseButton";

export default BaseButton;
