import { useRouter } from "next/router";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  path: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const InternalLink: FC<Props> = ({ path, children, className, onClick, ...other }) => {
  const router = useRouter();
  if (router.pathname === path) {
    return (
      <div className={`underline decoration-white decoration-1 underline-offset-[3px] ${className}`}>{children}</div>
    );
  }

  return (
    <button
      type="button"
      onClick={e => {
        router.push(path);
        if (onClick) {
          onClick(e);
        }
      }}
      className={twMerge("rounded-md text-white transition hover:text-green-500", className)}
      {...other}
    >
      {children}
    </button>
  );
};

export { InternalLink };
