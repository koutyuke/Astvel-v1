import { ComponentPropsWithRef, FC, forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type Props = {
  emoji: string;
  name: string;
  size: "small" | "regular" | "large";
} & Omit<ComponentPropsWithRef<"div">, "children">;

const variants = tv({
  variants: {
    emoji: {
      small: "text-2xl",
      regular: "text-2xl",
      large: "text-5xl",
    },
    emojiFrame: {
      small: "h-8 w-8",
      regular: "h-8 w-8",
      large: "h-14 w-14",
    },
    name: {
      small: "hidden",
      regular: "block flex-1 text-start",
      large: "block w-16 text-center",
    },
    body: {
      small: "h-10 w-10 items-center justify-center",
      regular: "h-10 w-32 items-center justify-start space-x-2 p-1",
      large: "h-24 w-20 flex-col items-center justify-between p-2",
    },
  },
});

const NoMemoTeam: FC<Props> = forwardRef<HTMLDivElement, Props>(({ emoji, name, size, className, ...props }, ref) => (
  <div className={twMerge("flex rounded-lg", variants({ body: size }), className)} {...props} ref={ref}>
    <div
      className={twMerge(
        "m-auto flex items-center justify-center rounded-lg bg-gray-300",
        variants({ emojiFrame: size }),
      )}
    >
      <p className={twMerge("", variants({ emoji: size }))}>{emoji}</p>
    </div>
    <p className={twMerge("truncate text-xs", variants({ name: size }))}>{name}</p>
  </div>
));

NoMemoTeam.displayName = "Team";

const Team = memo(NoMemoTeam);

export { Team };
