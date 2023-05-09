import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";

type Props = {
  description: string;
} & ComponentPropsWithoutRef<"button">;

const AdditionalButton: FC<Props> = forwardRef<ElementRef<"button">, Props>(
  ({ className, description, ...other }, ref) => (
    <button
      type="button"
      className={`${className} flex h-10 w-10 items-center justify-center rounded-full bg-white drop-shadow-xl duration-300 hover:scale-110`}
      ref={ref}
      {...other}
    >
      <HiOutlinePlusSm color="black" size={20} />
    </button>
  ),
);

AdditionalButton.displayName = "AdditionalButton";

export default AdditionalButton;
