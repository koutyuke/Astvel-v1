import { ComponentPropsWithoutRef, FC, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type Props = {
  children: string | ReactNode;
  theme?: "safety" | "danger" | "nomal";
  disabled?: boolean;
} & ComponentPropsWithoutRef<"button">;

const variant = tv({
  variants: {
    theme: {
      safety: "box-border border border-green-500 bg-black-1 text-green-500 hover:bg-green-500 hover:text-black-1",
      danger: "box-border border border-red-700 bg-black-1 text-red-500 hover:bg-red-700 hover:text-black-1",
      nomal: "box-border border border-gray-500 hover:bg-black-3",
      disalbe: "box-border border border-gray-500 text-gray-500",
    },
  },
});

const BaseButton: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, theme, disabled, ...other }, ref) => (
    <button
      type="button"
      ref={ref}
      disabled={disabled}
      className={twMerge(
        "h-10 w-20 rounded-lg text-center transition",
        variant({ theme: disabled ? "disalbe" : theme }),
        className,
      )}
      {...other}
    >
      {children}
    </button>
  ),
);

BaseButton.displayName = "BaseButton";
BaseButton.defaultProps = {
  theme: undefined,
  disabled: false,
};

export { BaseButton };
