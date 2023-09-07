import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";

type Props = ComponentPropsWithoutRef<"button">;

const TriggerButton: FC<Props> = forwardRef<ElementRef<"button">, Props>(({ className, ...other }, ref) => (
  <button
    type="button"
    className={`${className} flex h-10 w-10 items-center justify-center rounded-full bg-white drop-shadow-xl duration-300 hover:scale-110`}
    ref={ref}
    {...other}
  >
    <HiOutlinePlusSm color="black" size={20} />
  </button>
));

TriggerButton.displayName = "AdditionalButton";

export { TriggerButton };
