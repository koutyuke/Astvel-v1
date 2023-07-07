import { useRouter } from "next/router";
import { ComponentPropsWithoutRef, FC } from "react";

type Props = {
  url: string;
  children: string;
} & ComponentPropsWithoutRef<"button">;

const InternalLink: FC<Props> = ({ url, children: text, className, onClick, ...other }) => {
  const router = useRouter();
  if (router.pathname === url) {
    return <div className={`underline decoration-white underline-offset-2 ${className}`}>{text}</div>;
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
      className={`${className} rounded-md outline-offset-4 outline-orange-500 hover:outline`}
      {...other}
    >
      {text}
    </button>
  );
};

export default InternalLink;
