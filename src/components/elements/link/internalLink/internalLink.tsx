/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  path: string;
  children: ReactNode;
} & Pick<ComponentPropsWithoutRef<"div">, "className">;

const InternalLink: FC<Props> = ({ path, children, className }) => {
  const router = useRouter();
  if (router.pathname === path) {
    return (
      <div className={twMerge("underline decoration-white decoration-1 underline-offset-[3px]", className)}>
        {children}
      </div>
    );
  }

  return (
    <Link href={path}>
      <a className={twMerge("text-white transition hover:text-green-500", className)}>{children}</a>
    </Link>
  );
};

export { InternalLink };
