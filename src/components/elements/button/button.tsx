import { ComponentPropsWithoutRef, FC, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type Props = {
  children: string | ReactNode;
  theme?: "safety" | "danger" | "normal";
  disabled?: boolean;
} & ComponentPropsWithoutRef<"button">;

const variant = tv({
  variants: {
    theme: {
      safety: "box-border border border-green-500 bg-black-1 text-green-500 hover:bg-green-500/30 ",
      danger: "box-border border border-red-700 bg-black-1 text-red-500 hover:bg-red-700/30 ",
      normal: "box-border border border-gray-400 text-gray-400 hover:bg-white/10",
      disabled: "box-border border border-gray-600 text-gray-600",
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
        variant({ theme: disabled ? "disabled" : theme }),
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
