import { InternalLink } from "components/elements/link";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const EndMessage: FC<Props> = ({ className }) => {
  return (
    <div className={twMerge("grid w-full grid-cols-12 items-center justify-items-center gap-6", className)}>
      <div className="col-[2_/_12] w-full border-t border-gray-700 pt-12">
        <h2 className="text-center text-4xl font-bold">Better Discord Life for You!</h2>
      </div>
      <div className="col-[2_/_12]">
        <InternalLink
          path="./guilds"
          className="flex h-10 w-40 max-w-full items-center justify-center rounded-lg border border-green-500 text-center transition hover:bg-green-500/30 hover:text-white"
        >
          <span>Get Started</span>
        </InternalLink>
      </div>
    </div>
  );
};

export { EndMessage };
