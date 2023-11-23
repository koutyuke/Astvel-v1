import { ComponentPropsWithRef, forwardRef, memo } from "react";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

type Props = {
  image: string;
  name: string;
  size: "small" | "regular" | "large";
} & Pick<ComponentPropsWithRef<"div">, "className">;

const variants = tv({
  variants: {
    image: {
      small: "h-8 w-8",
      regular: "h-8 w-8",
      large: "h-14 w-14",
    }, // satisfies Record<Props["size"], string>,
    name: {
      small: "hidden",
      regular: "block flex-1 text-start",
      large: "block w-16 text-center",
    }, // satisfies Record<Props["size"], string>,
    body: {
      small: "h-10 w-10 items-center justify-center",
      regular: "h-10 w-32 items-center justify-start space-x-2 p-1",
      large: "h-24 w-20 flex-col  justify-between p-2",
    }, // satisfies Record<Props["size"], string>,
  },
});

const NoMemoMember = forwardRef<HTMLDivElement, Props>(({ image, name, size, className }, ref) => {
  return (
    <div className={twMerge("flex rounded-lg", variants({ body: size }), className)} ref={ref}>
      <div
        className={twMerge(
          "m-auto box-border overflow-hidden rounded-full border border-gray-400",
          variants({ image: size }),
        )}
      >
        <Image src={image} alt="Member Image" width={64} height={64} />
      </div>
      <p className={twMerge("truncate text-xs", variants({ name: size }))}>{name}</p>
    </div>
  );
});

NoMemoMember.displayName = "Member";

const Member = memo(NoMemoMember);

export { Member };
