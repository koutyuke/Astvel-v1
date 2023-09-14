import { useRouter } from "next/router";
import { ComponentPropsWithoutRef, FC } from "react";

type Props = {
  url: string;
  children: string;
} & ComponentPropsWithoutRef<"button">;

const PageLink: FC<Props> = ({ url, children: text, className, onClick, ...other }) => {
  const router = useRouter();
  if (router.pathname === url) {
    return (
      <div className={`text-white underline decoration-white decoration-1 underline-offset-2 ${className}`}>{text}</div>
    );
  }

  return (
    <button
      type="button"
      onClick={e => {
        router.push(url);
        if (onClick) {
          onClick(e);
        }
      }}
      className={`${className} rounded-md text-white hover:text-green-500`}
      {...other}
    >
      {text}
    </button>
  );
};

export { PageLink };
